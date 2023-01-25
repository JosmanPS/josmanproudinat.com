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
  author,
  slug,
  ogImage,
}: Props) => {
  return (
    <section className="py-16">
      <h2 className="mb-8 text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
        Último post
      </h2>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8">
          <CoverImage title={title} src={ogImage?.url || coverImage} slug={slug} />
          <div>
            <h3 className="mb-4 mt-8 lg:mt-0 text-4xl lg:text-5xl leading-tight">
              <Link as={`/posts/${slug}`} href="/posts/[slug]">
                <a className="hover:underline">{title}</a>
              </Link>
            </h3>
            <div className="text-lg mb-4">
              <DateFormatter dateString={date} />
            </div>
            <p className="text-lg leading-relaxed mb-8 dark:text-neutral-400">{excerpt}</p>
            <ButtonPrimary href={`/posts/${slug}`}>
              Leer post
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroPost
