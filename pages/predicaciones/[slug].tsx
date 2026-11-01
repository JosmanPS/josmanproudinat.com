import React from 'react'
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
import { getAllSermons, getSermonBySlug } from '../../lib/youtube'

type Props = {
  sermon: Sermon
  source: MDXRemoteSerializeResult
}

export default function PredicacionPage({ sermon, source }: Props) {
  const router = useRouter()

  if (!router.isFallback && !sermon?.slug) {
    return <ErrorPage statusCode={404} />
  }

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
                  openGraph={{
                    type: 'article',
                    locale: 'es',
                    site_name: 'Josman Proudinat',
                    images: [{ url: sermon.thumbnail }],
                  }}
                  twitter={{
                    cardType: 'summary_large_image',
                  }}
                />

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

                  {sermon.tags && (
                    <div className="mb-6 flex flex-wrap gap-2">
                      {sermon.tags
                        .split(',')
                        .map((t) => t.trim())
                        .filter(Boolean)
                        .map((tag) => (
                          <Link
                            key={tag}
                            href={`/predicaciones?tag=${encodeURIComponent(
                              tag
                            )}`}
                          >
                            <a className="text-xs font-medium px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 hover:bg-black hover:text-white dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-white dark:hover:text-black transition-colors">
                              #{tag}
                            </a>
                          </Link>
                        ))}
                    </div>
                  )}

                  <div className="w-full aspect-video relative bg-black mb-10 shadow-md">
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
