import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import Author from '../types/author'

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: Author
  slug: string
}

const HeroPost = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <section className="py-16">
      <h2 className="mb-8 text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
        Último post
      </h2>
      <div>
        <CoverImage title={title} src={coverImage} slug={slug} />
        <h3 className="mb-4 mt-4 text-4xl lg:text-5xl leading-tight">
          <Link as={`/blog/${slug}`} href="/blog/[slug]">
            <a className="hover:underline">{title}</a>
          </Link>
        </h3>
        <div className="text-lg mb-4">
          <DateFormatter dateString={date} />
        </div>
        <p className="text-lg leading-relaxed mb-8">{excerpt}</p>
        <Link as={`/blog/${slug}`} href="/blog/[slug]">
          <a className="bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0">
            Leer Post
          </a>
        </Link>
      </div>
    </section>
  )
}

export default HeroPost
