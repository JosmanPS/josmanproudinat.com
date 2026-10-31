import React, { useState } from 'react'
import Head from 'next/head'
import NextImage from 'next/image'
import Container from '../../components/container'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'
import Sermon from '../../types/sermon'
import { getPlaylistSermons, YOUTUBE_PLAYLIST_URL } from '../../lib/youtube'

type Props = {
  sermons: Sermon[]
}

export default function Predicaciones({ sermons }: Props) {
  const [activeSermon, setActiveSermon] = useState<Sermon | null>(
    sermons[0] || null
  )
  const [autoPlay, setAutoPlay] = useState(false)

  const handleSelectSermon = (sermon: Sermon) => {
    setActiveSermon(sermon)
    setAutoPlay(true)
    const playerEl = document.getElementById('reproductor-predicacion')
    if (playerEl) {
      playerEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <Layout>
      <Head>
        <title>Predicaciones | Josman Proudinat</title>
        <meta
          name="description"
          content="Predicaciones y enseñanzas en video de Josman Proudinat."
        />
      </Head>
      <Container>
        <section className="py-8">
          <PostTitle>Predicaciones</PostTitle>
          <p className="text-lg mt-2 mb-8 leading-relaxed dark:text-neutral-400">
            Explora y escucha las predicaciones más recientes directamente aquí
            o en{' '}
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

          {activeSermon && (
            <div
              id="reproductor-predicacion"
              className="mb-16 scroll-mt-28 bg-neutral-50 border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700 p-4 md:p-8"
            >
              <div className="w-full aspect-video relative bg-black mb-6">
                <iframe
                  key={`${activeSermon.videoId}-${autoPlay ? 'play' : 'init'}`}
                  src={`https://www.youtube.com/embed/${activeSermon.videoId}?rel=0${
                    autoPlay ? '&autoplay=1' : ''
                  }`}
                  title={activeSermon.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full absolute inset-0"
                />
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <span className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-1 mb-2 bg-black text-white dark:bg-white dark:text-black">
                    Reproduciendo
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold leading-snug">
                    {activeSermon.title}
                  </h2>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                    {[
                      activeSermon.channel,
                      activeSermon.duration &&
                        `Duración: ${activeSermon.duration}`,
                    ]
                      .filter(Boolean)
                      .join(' • ')}
                  </p>
                </div>
                <div className="shrink-0">
                  <a
                    href={activeSermon.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary-outline inline-block text-sm py-2.5 px-6"
                  >
                    Ver en YouTube ↗
                  </a>
                </div>
              </div>
            </div>
          )}

          <h2 className="mb-8 text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
            Todas las predicaciones ({sermons.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 mb-24">
            {sermons.map((sermon) => {
              const isSelected = activeSermon?.videoId === sermon.videoId
              return (
                <div
                  key={sermon.videoId}
                  className="flex flex-col justify-between group"
                >
                  <div>
                    <button
                      type="button"
                      onClick={() => handleSelectSermon(sermon)}
                      className="w-full text-left focus:outline-none"
                    >
                      <div
                        className={`w-full aspect-video relative mb-4 overflow-hidden transition-shadow duration-200 group-hover:shadow-lg ${
                          isSelected
                            ? 'ring-4 ring-black dark:ring-white'
                            : ''
                        }`}
                      >
                        <NextImage
                          src={sermon.thumbnail}
                          alt={sermon.title}
                          layout="fill"
                          objectFit="cover"
                          quality={90}
                        />
                        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors flex items-center justify-center">
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
                          <span className="absolute bottom-2 right-2 bg-black/85 text-white text-xs font-semibold px-2 py-0.5 rounded">
                            {sermon.duration}
                          </span>
                        )}
                        {isSelected && (
                          <span className="absolute top-2 left-2 bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase px-2.5 py-1">
                            En reproducción
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold mb-2 leading-snug group-hover:underline">
                        {sermon.title}
                      </h3>
                    </button>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                      {[sermon.channel, sermon.publishedInfo]
                        .filter(Boolean)
                        .join(' • ')}
                    </p>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => handleSelectSermon(sermon)}
                      className={
                        isSelected
                          ? 'btn-primary-outline w-full text-sm py-2.5 px-6'
                          : 'btn-primary w-full text-sm py-2.5 px-6'
                      }
                    >
                      {isSelected ? 'Reproduciendo ahora' : 'Ver predicación'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const sermons = await getPlaylistSermons()

  return {
    props: {
      sermons,
    },
    revalidate: 3600,
  }
}
