import React, { useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import NextImage from 'next/image'
import { NextSeo } from 'next-seo'
import Container from '../../components/container'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'
import DateFormatter from '../../components/date-formatter'
import ButtonPrimary from '../../components/ButtonPrimary'
import Sermon from '../../types/sermon'
import { getAllSermons } from '../../lib/youtube'
import { host } from '../../lib/config'
import { YOUTUBE_PLAYLIST_URL } from '../../lib/constants'

type Props = {
  sermons: Sermon[]
}

function parseTags(tagsStr = ''): string[] {
  return tagsStr
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
}

export default function Predicaciones({ sermons }: Props) {
  const router = useRouter()
  const activeTag =
    typeof router.query.tag === 'string' ? router.query.tag : ''

  const allTags = useMemo(() => {
    const counts: { [key: string]: number } = {}
    sermons.forEach((s) => {
      parseTags(s.tags).forEach((t) => {
        counts[t] = (counts[t] || 0) + 1
      })
    })
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([name]) => name)
  }, [sermons])

  const filteredSermons = useMemo(() => {
    if (!activeTag) return sermons
    return sermons.filter((s) =>
      parseTags(s.tags).some(
        (t) => t.toLowerCase() === activeTag.toLowerCase()
      )
    )
  }, [sermons, activeTag])

  const featuredSermon = !activeTag ? sermons[0] || null : null
  const gridSermons = !activeTag ? sermons.slice(1) : filteredSermons
  const pageUrl = `${host}/predicaciones`
  const pageTitle = activeTag
    ? `Predicaciones sobre ${activeTag} | Josman Proudinat`
    : 'Predicaciones y Estudios Bíblicos | Josman Proudinat'
  const pageDescription =
    'Predicaciones cristianas en video, estudios bíblicos y notas de enseñanza del pastor Josman Proudinat en Iglesia Rompiendo Fronteras.'

  return (
    <Layout>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={pageUrl}
        openGraph={{
          type: 'website',
          url: pageUrl,
          title: pageTitle,
          description: pageDescription,
          images: sermons[0]?.thumbnail
            ? [{ url: sermons[0].thumbnail, alt: sermons[0].title }]
            : undefined,
        }}
      />
      <Container>
        <section className="py-8">
          <PostTitle>Predicaciones</PostTitle>
          <p className="text-lg mt-2 mb-6 leading-relaxed dark:text-neutral-400">
            Mira cada predicación junto con su resumen y notas de estudio, o
            explora la lista completa en{' '}
            <a
              href={YOUTUBE_PLAYLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium hover:text-neutral-600 dark:hover:text-neutral-200"
            >
              YouTube
            </a>
            .
          </p>

          {allTags.length > 0 && (
            <div className="mb-10 flex flex-wrap items-center gap-2">
              <Link href="/predicaciones" scroll={false}>
                <a
                  className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-colors ${
                    !activeTag
                      ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                      : 'bg-transparent text-neutral-600 border-neutral-300 hover:border-black dark:text-neutral-300 dark:border-neutral-700 dark:hover:border-white'
                  }`}
                >
                  Todas ({sermons.length})
                </a>
              </Link>
              {allTags.map((tag) => {
                const isSelected =
                  activeTag.toLowerCase() === tag.toLowerCase()
                return (
                  <Link
                    key={tag}
                    href={
                      isSelected
                        ? '/predicaciones'
                        : `/predicaciones?tag=${encodeURIComponent(tag)}`
                    }
                    scroll={false}
                  >
                    <a
                      className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-colors ${
                        isSelected
                          ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                          : 'bg-transparent text-neutral-600 border-neutral-300 hover:border-black dark:text-neutral-300 dark:border-neutral-700 dark:hover:border-white'
                      }`}
                    >
                      #{tag}
                    </a>
                  </Link>
                )
              })}
            </div>
          )}

          {featuredSermon && (
            <div className="mb-16 rounded-2xl bg-neutral-50 border border-neutral-200/80 dark:bg-neutral-900 dark:border-neutral-800 p-5 md:p-8 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 items-center">
                <div className="w-full aspect-video relative bg-black rounded-xl overflow-hidden mb-6 lg:mb-0">
                  <iframe
                    src={`https://www.youtube.com/embed/${featuredSermon.videoId}?rel=0`}
                    title={featuredSermon.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full absolute inset-0"
                  />
                </div>
                <div>
                  <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 bg-black text-white dark:bg-white dark:text-black">
                    Predicación más reciente
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold leading-snug mb-3">
                    <Link
                      as={`/predicaciones/${featuredSermon.slug}`}
                      href="/predicaciones/[slug]"
                    >
                      <a className="hover:underline">{featuredSermon.title}</a>
                    </Link>
                  </h2>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-3 flex flex-wrap items-center">
                    {featuredSermon.date && (
                      <>
                        <DateFormatter dateString={featuredSermon.date} />
                        <span className="mx-2">•</span>
                      </>
                    )}
                    <span>
                      {[
                        featuredSermon.channel,
                        featuredSermon.duration &&
                          `Duración: ${featuredSermon.duration}`,
                      ]
                        .filter(Boolean)
                        .join(' • ')}
                    </span>
                  </div>
                  {featuredSermon.tags && (
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {parseTags(featuredSermon.tags).map((tag) => (
                        <Link
                          key={tag}
                          href={`/predicaciones?tag=${encodeURIComponent(tag)}`}
                          scroll={false}
                        >
                          <a className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-neutral-200/80 text-neutral-700 hover:bg-black hover:text-white dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-white dark:hover:text-black transition-colors">
                            #{tag}
                          </a>
                        </Link>
                      ))}
                    </div>
                  )}
                  <p className="text-base leading-relaxed mb-6 dark:text-neutral-300">
                    {featuredSermon.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <ButtonPrimary
                      href={`/predicaciones/${featuredSermon.slug}`}
                    >
                      Leer artículo y ver predicación
                    </ButtonPrimary>
                  </div>
                </div>
              </div>
            </div>
          )}

          {gridSermons.length > 0 && (
            <>
              <h2 className="mb-8 text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
                {activeTag
                  ? `Predicaciones sobre #${activeTag} (${gridSermons.length})`
                  : 'Más predicaciones'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 mb-24">
                {gridSermons.map((sermon) => (
                  <div
                    key={sermon.slug}
                    className="flex flex-col justify-between group"
                  >
                    <div>
                      <Link
                        as={`/predicaciones/${sermon.slug}`}
                        href="/predicaciones/[slug]"
                      >
                        <a className="block focus:outline-none">
                          <div className="w-full aspect-video relative mb-4 rounded-xl overflow-hidden border border-neutral-200/70 dark:border-neutral-800 transition-shadow duration-200 group-hover:shadow-md">
                            <NextImage
                              src={sermon.thumbnail}
                              alt={sermon.title}
                              layout="fill"
                              objectFit="cover"
                              quality={90}
                              className="group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                              <div className="w-14 h-14 rounded-full bg-black/80 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                                <svg
                                  className="w-6 h-6 ml-0.5"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                </svg>
                              </div>
                            </div>
                            {sermon.duration && (
                              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-semibold px-2 py-0.5 rounded">
                                {sermon.duration}
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-bold mb-2 leading-snug group-hover:underline">
                            {sermon.title}
                          </h3>
                        </a>
                      </Link>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-2 flex flex-wrap items-center">
                        {sermon.date && (
                          <>
                            <DateFormatter dateString={sermon.date} />
                            <span className="mx-2">•</span>
                          </>
                        )}
                        <span>{sermon.channel}</span>
                      </div>
                      {sermon.tags && (
                        <div className="mb-3 flex flex-wrap gap-1.5">
                          {parseTags(sermon.tags).map((tag) => (
                            <Link
                              key={tag}
                              href={`/predicaciones?tag=${encodeURIComponent(
                                tag
                              )}`}
                              scroll={false}
                            >
                              <a className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 hover:bg-black hover:text-white dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-white dark:hover:text-black transition-colors">
                                #{tag}
                              </a>
                            </Link>
                          ))}
                        </div>
                      )}
                      <p className="text-base leading-relaxed mb-6 dark:text-neutral-400">
                        {sermon.excerpt}
                      </p>
                    </div>
                    <div>
                      <ButtonPrimary href={`/predicaciones/${sermon.slug}`}>
                        Ver predicación y notas
                      </ButtonPrimary>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const sermons = getAllSermons([
    'slug',
    'videoId',
    'title',
    'date',
    'duration',
    'channel',
    'publishedInfo',
    'excerpt',
    'tags',
    'thumbnail',
    'url',
  ])

  return {
    props: {
      sermons,
    },
  }
}
