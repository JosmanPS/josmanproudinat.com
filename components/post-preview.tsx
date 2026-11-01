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
  ogImage: { url: string }
}

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  slug,
  ogImage,
}: Props) => {
  return (
    <article className="flex flex-col justify-between h-full group">
      <div>
        <div className="mb-5">
          <CoverImage
            slug={slug}
            title={title}
            src={ogImage?.url || coverImage}
          />
        </div>
        <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2.5">
          <DateFormatter dateString={date} />
        </div>
        <h3 className="text-2xl font-bold tracking-tight mb-3 leading-snug">
          <Link as={`/posts/${slug}`} href="/posts/[slug]">
            <a className="hover:underline decoration-2 underline-offset-4">
              {title}
            </a>
          </Link>
        </h3>
        <p className="text-base leading-relaxed mb-6 text-neutral-600 dark:text-neutral-400">
          {excerpt}
        </p>
      </div>
      <div>
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="inline-flex items-center text-sm font-bold text-neutral-900 dark:text-white group-hover:translate-x-0.5 transition-transform">
            Leer artículo <span className="ml-1.5">→</span>
          </a>
        </Link>
      </div>
    </article>
  )
}

export default PostPreview
