import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import slugify from 'slugify'
import Category from '../types/Category'
import PostType from '../types/post'

export const SUBSTACK_FEED_URL = 'https://josmanproudinat.substack.com/feed'

const DEFAULT_COVER_IMAGE = '/img/josman-bg-01.jpg'
const DEFAULT_AUTHOR = {
  name: 'Josman Proudinat',
  picture: '/assets/blog/authors/josman.png',
}

let cachedPosts: PostType[] | null = null
let cacheTimestamp = 0
const CACHE_TTL_MS = 60 * 1000 // 1 minute in-memory cache for build/dev

function decodeHtmlEntities(str = ''): string {
  return str
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    )
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
}

function normalizeSubstackImageUrl(url = ''): string {
  let clean = decodeHtmlEntities(url.trim())
  const encodedMatch = clean.match(
    /https:\/\/substackcdn\.com\/image\/fetch\/[^/]+\/(https%3A%2F%2F.+)$/
  )
  if (encodedMatch) {
    try {
      clean = decodeURIComponent(encodedMatch[1])
    } catch {
      // keep original clean URL if decode fails
    }
  }
  return clean
}

function cleanSubstackContent(html = ''): string {
  return (
    html
      // Remove Substack's floating expand/restack button overlay inside images
      .replace(
        /<div class="image-link-expand">[\s\S]*?<\/button><\/div><\/div><\/div>/g,
        ''
      )
      // Remove non-functional inline static form widget (SubstackCustomForm is rendered at the bottom)
      .replace(
        /<div class="subscription-widget-wrap-editor"[\s\S]*?<\/form><\/div><\/div>/g,
        ''
      )
  )
}

function getLocalFallbackPosts(): PostType[] {
  const postsDirectory = join(process.cwd(), '_posts')
  if (!fs.existsSync(postsDirectory)) return []
  const files = fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith('.mdx'))
  return files
    .map((file) => {
      const realSlug = file.replace(/\.mdx$/, '')
      const fullPath = join(postsDirectory, file)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      return {
        slug: realSlug,
        title: data.title || '',
        date: data.date || '',
        coverImage: data.coverImage || DEFAULT_COVER_IMAGE,
        author: data.author || DEFAULT_AUTHOR,
        excerpt: data.excerpt || '',
        tags: data.tags || '',
        ogImage: data.ogImage || {
          url: data.coverImage || DEFAULT_COVER_IMAGE,
        },
        content,
      }
    })
    .sort((p1, p2) => (p1.date > p2.date ? -1 : 1))
}

async function fetchFeedPosts(): Promise<PostType[]> {
  const now = Date.now()
  if (cachedPosts && now - cacheTimestamp < CACHE_TTL_MS) {
    return cachedPosts
  }

  let xml = ''
  try {
    const response = await fetch(SUBSTACK_FEED_URL)
    if (!response.ok) {
      throw new Error(
        `Failed to fetch Substack RSS feed (${response.status} ${response.statusText})`
      )
    }
    xml = await response.text()
    if (!xml.includes('<rss')) {
      throw new Error('Invalid RSS feed response')
    }
  } catch {
    return getLocalFallbackPosts()
  }

  const items = xml.split('<item>').slice(1)

  const posts: PostType[] = items
    .map((item) => {
      const titleMatch =
        item.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/) ||
        item.match(/<title>([\s\S]*?)<\/title>/)
      const descMatch =
        item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/) ||
        item.match(/<description>([\s\S]*?)<\/description>/)
      const linkMatch = item.match(/<link>([\s\S]*?)<\/link>/)
      const pubDateMatch = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)
      const enclosureMatch = item.match(/<enclosure[^>]+url="([^"]+)"/)
      const contentMatch =
        item.match(
          /<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/
        ) || item.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/)

      const link = linkMatch ? linkMatch[1].trim() : ''
      const slug =
        link.split('/p/')[1]?.replace(/\/$/, '').split('?')[0] || ''

      const title = decodeHtmlEntities(titleMatch ? titleMatch[1].trim() : '')
      const rawDesc = descMatch ? descMatch[1].trim() : ''
      const excerpt = decodeHtmlEntities(rawDesc.replace(/<[^>]*>/g, ''))
      const date = pubDateMatch
        ? new Date(pubDateMatch[1].trim()).toISOString()
        : new Date().toISOString()

      const rawContent = contentMatch ? contentMatch[1].trim() : ''
      const content = cleanSubstackContent(rawContent)

      const firstContentImg = (rawContent.match(/<img[^>]+src="([^"]+)"/) ||
        [])[1]
      const rawImage = enclosureMatch
        ? enclosureMatch[1]
        : firstContentImg || DEFAULT_COVER_IMAGE
      const coverImage = rawImage.startsWith('http')
        ? normalizeSubstackImageUrl(rawImage)
        : rawImage

      const categories = Array.from(
        item.matchAll(
          /<category>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/category>/g
        )
      ).map((m) => decodeHtmlEntities(m[1].trim()))

      return {
        slug,
        title,
        date,
        coverImage,
        author: DEFAULT_AUTHOR,
        excerpt,
        tags: categories.join(', '),
        ogImage: {
          url: coverImage,
        },
        content,
      }
    })
    .filter((post) => Boolean(post.slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))

  cachedPosts = posts
  cacheTimestamp = now
  return posts
}

function pickFields(post: PostType, fields: string[]): any {
  if (!fields || fields.length === 0) {
    return post
  }
  const items: { [key: string]: any } = {}
  fields.forEach((field) => {
    if (typeof (post as any)[field] !== 'undefined') {
      items[field] = (post as any)[field]
    }
  })
  return items
}

export async function getPostSlugs(): Promise<string[]> {
  const posts = await fetchFeedPosts()
  return posts.map((post) => post.slug)
}

export async function getPostBySlug(
  slug: string,
  fields: string[] = []
): Promise<any> {
  const realSlug = slug.replace(/\.mdx$/, '')
  const posts = await fetchFeedPosts()
  const post = posts.find((p) => p.slug === realSlug)
  if (!post) {
    return null
  }
  return pickFields(post, fields)
}

export async function getAllPosts(fields: string[] = []): Promise<any[]> {
  const posts = await fetchFeedPosts()
  return posts.map((post) => pickFields(post, fields))
}

export async function getAllCategories(): Promise<Category[]> {
  const posts = await getAllPosts(['tags'])

  const tagsList: string[] = []
  posts.forEach((post) => {
    if (!post.tags) return
    const tags = post.tags
      .trim()
      .split(',')
      .map((t: string) => t.trim())
      .filter(Boolean)
    tagsList.push(...tags)
  })

  const tagsDict: { [key: string]: number } = {}
  tagsList.forEach((tag) => {
    if (!Object.keys(tagsDict).includes(tag)) {
      tagsDict[tag] = 1
    } else {
      tagsDict[tag] += 1
    }
  })

  const categories: Category[] = Object.entries(tagsDict)
    .map(([key, value]) => {
      const slug = slugify(key, { trim: true, lower: true })
      return { name: key, slug, nPosts: value }
    })
    .sort((a, b) => b.nPosts - a.nPosts)

  return categories
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | undefined> {
  const categories = await getAllCategories()
  return categories.find((category) => category.slug === slug)
}

export async function getPostsByCategory(category: string): Promise<any[]> {
  const posts = await getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'tags',
    'ogImage',
  ])
  return posts.filter((post) => post.tags && post.tags.includes(category))
}
