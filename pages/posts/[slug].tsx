import Head from 'next/head'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import ErrorPage from 'next/error'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import { getPostBySlug, getAllPosts } from '../../lib/api'
import { host } from '../../lib/config'
import PostTitle from '../../components/post-title'
import PostType from '../../types/post'
import SubstackCustomForm from '../../components/SubstackCustomForm'

type Props = {
  post: PostType
  morePosts?: PostType[]
  preview?: boolean
  source?: MDXRemoteSerializeResult
}

const Post = ({ post, preview, source }: Props) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const postUrl = post?.slug ? `${host}/posts/${post.slug}` : host
  const ogImageUrl = post?.ogImage?.url
    ? post.ogImage.url.startsWith('http')
      ? post.ogImage.url
      : `${host}${post.ogImage.url}`
    : `${host}/img/josman-bg-01.jpg`

  const articleJsonLd = post?.slug
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': postUrl,
        },
        headline: post.title,
        description: post.excerpt,
        image: [ogImageUrl],
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: 'es',
        author: {
          '@type': 'Person',
          name: post.author?.name || 'Josman Proudinat',
          url: host,
        },
        publisher: {
          '@type': 'Person',
          name: 'Josman Proudinat',
          url: host,
        },
      }
    : null

  return (
    <Layout preview={preview}>
      <div className="pb-12">
        <Container>
          {router.isFallback ? (
            <PostTitle>Cargando…</PostTitle>
          ) : (
            <>
              <article className="mb-12 pt-10">
                <NextSeo
                  title={`${post.title} | Josman Proudinat`}
                  description={post.excerpt}
                  canonical={postUrl}
                  openGraph={{
                    type: 'article',
                    url: postUrl,
                    title: `${post.title} | Josman Proudinat`,
                    description: post.excerpt,
                    locale: 'es_ES',
                    site_name: 'Josman Proudinat',
                    article: {
                      publishedTime: post.date,
                      authors: [post.author?.name || 'Josman Proudinat'],
                      tags: post.tags
                        ? post.tags
                            .split(',')
                            .map((t) => t.trim())
                            .filter(Boolean)
                        : undefined,
                    },
                    images: [{ url: ogImageUrl, alt: post.title }],
                  }}
                  twitter={{
                    cardType: 'summary_large_image',
                  }}
                />
                {articleJsonLd && (
                  <Head>
                    <script
                      type="application/ld+json"
                      dangerouslySetInnerHTML={{
                        __html: JSON.stringify(articleJsonLd),
                      }}
                    />
                  </Head>
                )}
                <PostHeader
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  author={post.author}
                  content={post.content}
                  tags={post.tags}
                />
                <PostBody content={post.content} source={source} />
              </article>
            </>
          )}
          <div className="max-w-4xl mx-auto">
            <SubstackCustomForm />
          </div>
        </Container>
      </div>
    </Layout>
  )
}

export default Post

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = await getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
    'excerpt',
    'tags',
  ])

  if (!post || !post.slug) {
    return {
      notFound: true,
      revalidate: 60,
    }
  }

  return {
    props: {
      post,
    },
    revalidate: 3600,
  }
}

export async function getStaticPaths() {
  const posts = await getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: 'blocking',
  }
}
