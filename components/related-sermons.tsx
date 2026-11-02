import React from 'react'
import Link from 'next/link'
import NextImage from 'next/image'
import Sermon from '../types/sermon'
import DateFormatter from './date-formatter'

type Props = {
  sermons: Sermon[]
}

export default function RelatedSermons({ sermons }: Props) {
  if (!sermons || sermons.length === 0) {
    return null
  }

  return (
    <section className="mt-16 pt-12 border-t border-neutral-200 dark:border-neutral-800">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Continúa aprendiendo
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1">
            Predicaciones recomendadas
          </h2>
        </div>
        <Link href="/predicaciones">
          <a className="text-sm font-semibold text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white mt-2 sm:mt-0 inline-flex items-center group">
            Ver todas las predicaciones
            <span className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
          </a>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {sermons.map((sermon) => (
          <article
            key={sermon.slug}
            className="flex flex-col justify-between group rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 p-4 border border-neutral-200/80 dark:border-neutral-800 transition-all duration-300 hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700"
          >
            <div>
              <Link
                as={`/predicaciones/${sermon.slug}`}
                href="/predicaciones/[slug]"
              >
                <a className="block focus:outline-none">
                  <div className="w-full aspect-video relative mb-3 rounded-xl overflow-hidden bg-black">
                    <NextImage
                      src={sermon.thumbnail}
                      alt={sermon.title}
                      layout="fill"
                      objectFit="cover"
                      quality={85}
                      className="group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-black/80 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                        <svg
                          className="w-5 h-5 ml-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </div>
                    {sermon.duration && (
                      <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[11px] font-semibold px-2 py-0.5 rounded backdrop-blur-sm">
                        {sermon.duration}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold mb-2 leading-snug line-clamp-2 group-hover:underline">
                    {sermon.title}
                  </h3>
                </a>
              </Link>

              {sermon.date && (
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                  <DateFormatter dateString={sermon.date} />
                </div>
              )}

              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 line-clamp-3 mb-4">
                {sermon.excerpt}
              </p>
            </div>

            <div>
              <Link
                as={`/predicaciones/${sermon.slug}`}
                href="/predicaciones/[slug]"
              >
                <a className="inline-flex items-center text-xs font-bold text-neutral-900 dark:text-neutral-100 hover:underline">
                  Ver predicación
                  <svg
                    className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
