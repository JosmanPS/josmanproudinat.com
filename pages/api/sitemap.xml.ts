import { NextApiRequest, NextApiResponse } from 'next'
import { host } from '../../lib/config'
import { getAllCategories, getAllPosts } from '../../lib/api'
import Category from '../../@types/Category'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method !== 'GET') {
    return res.status(405).send({ error: 'method not allowed' })
  }

  const posts = getAllPosts(['slug'])

  const categories = getAllCategories()

  // cache sitemap for up to one hour
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, max-age=3600, stale-while-revalidate=3600'
  )
  res.setHeader('Content-Type', 'text/xml')

  res.write(createSitemap(posts, categories))
  res.end()
}

const createSitemap = (
  posts: any[],
  categories: Category[]
) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${host}</loc>
      </url>

      <url>
        <loc>${host}/</loc>
      </url>

      <url>
        <loc>${host}/categorias</loc>
      </url>

      ${categories.map(
        (category) =>
          `
            <url>
              <loc>${host}/categorias/${category.slug}</loc>
            </url>
          `.trim()
      ).join('')}

      ${posts
        .map((post) =>
          `
            <url>
              <loc>${host}/posts/${post.slug}</loc>
            </url>
          `.trim()
        )
        .join('')}
    </urlset>
    `
