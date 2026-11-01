import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import Author from '../types/author'
import ButtonPrimary from './ButtonPrimary'

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: Author
  slug: string
  ogImage: { url: string }
}

const HeroPost = ({
  title,
  coverImage,
  date,
  excerpt,
  slug,
  ogImage,
}: Props) => {
  return (
    <section className="py-20">
      <div className="flex items-center justify-between mb-10">
        <div>
          <span className="block text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-1.5">
            Publicación Destacada
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
            Último post
          </h2>
        </div>
        <Link href="/posts">
          <a className="hidden sm:inline-flex items-center text-sm font-semibold text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">
            Ver todos los posts →
          </a>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7">
          <CoverImage
            title={title}
            src={ogImage?.url || coverImage}
            slug={slug}
          />
        </div>
        <div className="lg:col-span-5">
          <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-3">
            <DateFormatter dateString={date} />
          </div>
          <h3 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug">
            <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a className="hover:underline decoration-2 underline-offset-4">
                {title}
              </a>
            </Link>
          </h3>
          <p className="text-base md:text-lg leading-relaxed mb-8 text-neutral-600 dark:text-neutral-400">
            {excerpt}
          </p>
          <div>
            <ButtonPrimary href={`/posts/${slug}`}>
              Leer artículo →
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroPost
