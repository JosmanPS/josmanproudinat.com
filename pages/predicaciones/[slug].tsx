import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import ErrorPage from 'next/error'
import { NextSeo } from 'next-seo'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Container from '../../components/container'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'
import PostBody from '../../components/post-body'
import DateFormatter from '../../components/date-formatter'
import ReadingTime from '../../components/Posts/ReadingTime'
import SubstackCustomForm from '../../components/SubstackCustomForm'
import Sermon from '../../types/sermon'
import { host } from '../../lib/config'
import { getAllSermons, getSermonBySlug } from '../../lib/youtube'

type Props = {
  sermon: Sermon
  source: MDXRemoteSerializeResult
}

function toIsoDuration(durationStr = ''): string | undefined {
  if (!durationStr) return undefined
  const parts = durationStr.split(':').map((p) => parseInt(p.trim(), 10))
  if (parts.some((n) => isNaN(n))) return undefined
  if (parts.length === 3) {
    return `PT${parts[0]}H${parts[1]}M${parts[2]}S`
  }
  if (parts.length === 2) {
    return `PT${parts[0]}M${parts[1]}S`
  }
  return undefined
}

export default function PredicacionPage({ sermon, source }: Props) {
  const router = useRouter()

  if (!router.isFallback && !sermon?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const sermonUrl = sermon?.slug
    ? `${host}/predicaciones/${sermon.slug}`
    : `${host}/predicaciones`
  const isoDuration = toIsoDuration(sermon?.duration)
  const tagList = sermon?.tags
    ? sermon.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    : []

  const sermonJsonLd = sermon?.slug
    ? {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'VideoObject',
            name: sermon.title,
            description: sermon.excerpt,
            thumbnailUrl: [
              sermon.thumbnail,
              `https://i.ytimg.com/vi/${sermon.videoId}/maxresdefault.jpg`,
            ],
            uploadDate: sermon.date ? `${sermon.date}T00:00:00Z` : undefined,
            duration: isoDuration,
            embedUrl: `https://www.youtube.com/embed/${sermon.videoId}`,
            contentUrl: `https://www.youtube.com/watch?v=${sermon.videoId}`,
            inLanguage: 'es',
            author: {
              '@type': 'Person',
              name: 'Josman Proudinat',
              url: host,
            },
          },
          {
            '@type': 'Article',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': sermonUrl,
            },
            headline: sermon.title,
            description: sermon.excerpt,
            image: [sermon.thumbnail],
            datePublished: sermon.date,
            dateModified: sermon.date,
            inLanguage: 'es',
            keywords: tagList.join(', '),
            author: {
              '@type': 'Person',
              name: 'Josman Proudinat',
              url: host,
            },
            publisher: {
              '@type': 'Person',
              name: 'Josman Proudinat',
              url: host,
            },
          },
        ],
      }
    : null

  return (
    <Layout>
      <div className="pb-12">
        <Container>
          {router.isFallback ? (
            <PostTitle>Cargando…</PostTitle>
          ) : (
            <>
              <article className="mb-12 pt-8">
                <NextSeo
                  title={`${sermon.title} | Predicaciones | Josman Proudinat`}
                  description={sermon.excerpt}
                  canonical={sermonUrl}
                  openGraph={{
                    type: 'article',
                    url: sermonUrl,
                    title: `${sermon.title} | Josman Proudinat`,
                    description: sermon.excerpt,
                    locale: 'es_ES',
                    site_name: 'Josman Proudinat',
                    article: {
                      publishedTime: sermon.date,
                      authors: ['Josman Proudinat'],
                      tags: tagList.length > 0 ? tagList : undefined,
                    },
                    images: [{ url: sermon.thumbnail, alt: sermon.title }],
                  }}
                  twitter={{
                    cardType: 'summary_large_image',
                  }}
                />
                {sermonJsonLd && (
                  <Head>
                    <script
                      type="application/ld+json"
                      dangerouslySetInnerHTML={{
                        __html: JSON.stringify(sermonJsonLd),
                      }}
                    />
                  </Head>
                )}

                <div className="max-w-4xl mx-auto">
                  <div className="mb-6">
                    <Link href="/predicaciones">
                      <a className="text-sm font-medium text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white hover:underline">
                        ← Volver a todas las predicaciones
                      </a>
                    </Link>
                  </div>

                  <PostTitle>{sermon.title}</PostTitle>

                  <div className="mb-4 md:text-lg text-slate-500 flex flex-wrap items-center gap-y-2">
                    {sermon.date && (
                      <>
                        <DateFormatter dateString={sermon.date} />
                        <span className="mx-2">•</span>
                      </>
                    )}
                    {sermon.duration && (
                      <>
                        <span>Duración: {sermon.duration}</span>
                        <span className="mx-2">•</span>
                      </>
                    )}
                    <ReadingTime content={sermon.content} />
                    <span className="mx-2">•</span>
                    <a
                      href={sermon.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-black dark:hover:text-white"
                    >
                      Ver en YouTube ↗
                    </a>
                  </div>

                  {tagList.length > 0 && (
                    <div className="mb-6 flex flex-wrap gap-2">
                      {tagList.map((tag) => (
                        <Link
                          key={tag}
                          href={`/predicaciones?tag=${encodeURIComponent(tag)}`}
                        >
                          <a className="text-xs font-medium px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 hover:bg-black hover:text-white dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-white dark:hover:text-black transition-colors">
                            #{tag}
                          </a>
                        </Link>
                      ))}
                    </div>
                  )}

                  <div className="w-full aspect-video relative bg-black mb-10 rounded-2xl overflow-hidden shadow-md border border-neutral-200/70 dark:border-neutral-800">
                    <iframe
                      src={`https://www.youtube.com/embed/${sermon.videoId}?rel=0`}
                      title={sermon.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full absolute inset-0"
                    />
                  </div>
                </div>

                <PostBody content={sermon.content} source={source} />
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

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const sermon = getSermonBySlug(params.slug)

  if (!sermon || !sermon.slug) {
    return {
      notFound: true,
    }
  }

  const source = await serialize(sermon.content)

  return {
    props: {
      sermon,
      source,
    },
  }
}

export async function getStaticPaths() {
  const sermons = getAllSermons(['slug'])

  return {
    paths: sermons.map((sermon) => ({
      params: {
        slug: sermon.slug,
      },
    })),
    fallback: 'blocking',
  }
}
