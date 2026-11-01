import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import Sermon from '../types/sermon'

export const YOUTUBE_PLAYLIST_ID = 'PLP-6xYOMaKCvhuE4QVTuhU0pWEYotCgQr'
export const YOUTUBE_PLAYLIST_URL = `https://www.youtube.com/playlist?list=${YOUTUBE_PLAYLIST_ID}`

const sermonsDirectory = join(process.cwd(), '_predicaciones')

export function getSermonSlugs(): string[] {
  if (!fs.existsSync(sermonsDirectory)) {
    return []
  }
  return fs
    .readdirSync(sermonsDirectory)
    .filter((file) => file.endsWith('.mdx'))
}

export function getSermonBySlug(
  slug: string,
  fields: string[] = []
): Sermon | any {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = join(sermonsDirectory, `${realSlug}.mdx`)
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const videoId = data.videoId || ''
  const fullSermon: Sermon = {
    slug: realSlug,
    videoId,
    title: data.title || '',
    date: data.date || '',
    duration: data.duration || '',
    channel: data.channel || 'Rompiendo Fronteras',
    publishedInfo: data.publishedInfo || '',
    excerpt: data.excerpt || '',
    tags: data.tags || '',
    thumbnail:
      data.thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    url:
      data.url ||
      `https://www.youtube.com/watch?v=${videoId}&list=${YOUTUBE_PLAYLIST_ID}`,
    content,
  }

  if (!fields || fields.length === 0) {
    return fullSermon
  }

  const items: { [key: string]: any } = {}
  fields.forEach((field) => {
    if (typeof (fullSermon as any)[field] !== 'undefined') {
      items[field] = (fullSermon as any)[field]
    }
  })

  return items
}

export function getAllSermons(fields: string[] = []): Sermon[] {
  const slugs = getSermonSlugs()
  const sermons = slugs
    .map((slug) => getSermonBySlug(slug, []))
    .filter(Boolean)
    .sort((a: Sermon, b: Sermon) => (a.date > b.date ? -1 : 1))

  if (!fields || fields.length === 0) {
    return sermons
  }

  return sermons.map((sermon) => {
    const items: { [key: string]: any } = {}
    fields.forEach((field) => {
      if (typeof (sermon as any)[field] !== 'undefined') {
        items[field] = (sermon as any)[field]
      }
    })
    return items as Sermon
  })
}

export async function getPlaylistSermons(): Promise<Sermon[]> {
  return getAllSermons()
}
