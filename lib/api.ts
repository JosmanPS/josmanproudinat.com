import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import slugify from 'slugify'
import Category from '../@types/Category'

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}

export function getAllCategories(): Category[] {
  const posts = getAllPosts(['tags'])

  const tagsList: string[] = []
  posts.forEach((post) => {
    const tags = post.tags.trim().split(',')
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

export function getCategoryBySlug(slug: string) {
  const categories = getAllCategories()
  return categories.find((category) => (
    category.slug === slug
  ))
}

export function getPostsByCategory(category: string) {
  const posts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'tags',
  ])
  return posts.filter((post) => (
    post.tags.includes(category)
  ))
}
