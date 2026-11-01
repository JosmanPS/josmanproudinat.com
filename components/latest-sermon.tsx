import Link from 'next/link'
import Sermon from '../types/sermon'
import ButtonPrimary from './ButtonPrimary'
import DateFormatter from './date-formatter'

type Props = {
  sermon: Sermon
}

const LatestSermon = ({ sermon }: Props) => {
  return (
    <section className="py-16 border-t border-neutral-200 dark:border-neutral-800">
      <h2 className="mb-8 text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
        Última predicación
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 items-center">
        <div className="w-full aspect-video relative bg-black shadow-sm">
          <iframe
            src={`https://www.youtube.com/embed/${sermon.videoId}?rel=0`}
            title={sermon.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full absolute inset-0"
          />
        </div>
        <div>
          <h3 className="mb-4 mt-8 lg:mt-0 text-3xl lg:text-4xl leading-tight">
            <Link
              as={`/predicaciones/${sermon.slug}`}
              href="/predicaciones/[slug]"
            >
              <a className="hover:underline">{sermon.title}</a>
            </Link>
          </h3>
          <div className="text-lg mb-4 dark:text-neutral-400 flex flex-wrap items-center">
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
          {sermon.excerpt && (
            <p className="text-lg leading-relaxed mb-8 dark:text-neutral-400">
              {sermon.excerpt}
            </p>
          )}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
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
