import { GetServerSideProps } from 'next'
import { host } from '../lib/config'
import { getAllCategories, getAllPosts } from '../lib/api'
import { getAllSermons } from '../lib/youtube'
import Category from '../types/Category'

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if (req.method !== 'GET') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify({ error: 'method not allowed' }))
    res.end()
    return {
      props: {},
    }
  }

  const posts = await getAllPosts(['slug', 'date'])
  const sermons = getAllSermons(['slug', 'date'])
  const categories = await getAllCategories()

  // cache sitemap for up to one hour
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, max-age=3600, stale-while-revalidate=3600'
  )
  res.setHeader('Content-Type', 'text/xml; charset=utf-8')

  res.write(createSitemap(posts, sermons, categories))
  res.end()

  return {
    props: {},
  }
}

const createSitemap = (
  posts: any[],
  sermons: any[],
  categories: Category[]
) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${host}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${host}/posts</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${host}/predicaciones</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${host}/contacto</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
${sermons
  .map(
    (sermon) => `  <url>
    <loc>${host}/predicaciones/${sermon.slug}</loc>${
      sermon.date ? `\n    <lastmod>${sermon.date}</lastmod>` : ''
    }
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
${posts
  .map(
    (post) => `  <url>
    <loc>${host}/posts/${post.slug}</loc>${
      post.date ? `\n    <lastmod>${post.date}</lastmod>` : ''
    }
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
${categories
  .map(
    (category) => `  <url>
    <loc>${host}/categorias/${category.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

export default () => null
