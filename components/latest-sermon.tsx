import Link from 'next/link'
import Sermon from '../types/sermon'
import ButtonPrimary from './ButtonPrimary'
import DateFormatter from './date-formatter'

type Props = {
  sermon: Sermon
}

const LatestSermon = ({ sermon }: Props) => {
  return (
    <section className="py-20 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="flex items-center justify-between mb-10">
        <div>
          <span className="block text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-1.5">
            Enseñanza en Video
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
            Última predicación
          </h2>
        </div>
        <Link href="/predicaciones">
          <a className="hidden sm:inline-flex items-center text-sm font-semibold text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">
            Ver todas las predicaciones →
          </a>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7">
          <div className="w-full aspect-video relative bg-black rounded-xl overflow-hidden shadow-sm border border-neutral-200/70 dark:border-neutral-800">
            <iframe
              src={`https://www.youtube.com/embed/${sermon.videoId}?rel=0`}
              title={sermon.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full absolute inset-0"
            />
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-3 flex flex-wrap items-center">
            {sermon.date && (
              <>
                <DateFormatter dateString={sermon.date} />
                <span className="mx-2">•</span>
              </>
            )}
            <span>
              {[
                sermon.channel,
                sermon.duration && `Duración: ${sermon.duration}`,
              ]
                .filter(Boolean)
                .join(' • ')}
            </span>
          </div>

          <h3 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug">
            <Link
              as={`/predicaciones/${sermon.slug}`}
              href="/predicaciones/[slug]"
            >
              <a className="hover:underline decoration-2 underline-offset-4">
                {sermon.title}
              </a>
            </Link>
          </h3>

          {sermon.excerpt && (
            <p className="text-base md:text-lg leading-relaxed mb-8 text-neutral-600 dark:text-neutral-400">
              {sermon.excerpt}
            </p>
          )}

          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <ButtonPrimary href={`/predicaciones/${sermon.slug}`}>
              Leer notas de la predicación
            </ButtonPrimary>
            <Link href="/predicaciones">
              <a className="btn-primary-outline text-center">
                Ver todas las predicaciones
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LatestSermon
