import slugify from 'slugify'
import NextImage from 'next/image'
import DateFormatter from './date-formatter'
import PostTitle from './post-title'
import Author from '../types/author'
import ReadingTime from './Posts/ReadingTime'
import Tag from './Categories/Tag'

type Props = {
  title: string
  coverImage: string
  date: string
  author: Author
  content: string
  tags: string
}

const PostHeader = ({ title, coverImage, tags, date, content }: Props) => {
  const tagsList = tags
    ? tags
        .trim()
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    : []
  const tagsSlugs = tagsList.map((tag) =>
    slugify(tag, { trim: true, lower: true })
  )

  return (
    <div className="max-w-4xl mx-auto mb-10">
      <PostTitle>{title}</PostTitle>
      <div className="mb-6 text-sm md:text-base text-neutral-500 dark:text-neutral-400 flex flex-wrap items-center">
        <DateFormatter dateString={date} /> <span className="mx-2">•</span>{' '}
        <ReadingTime content={content} />
      </div>
      {tagsSlugs.length > 0 && (
        <div className="mb-6 text-sm text-neutral-500 flex flex-row flex-wrap">
          {tagsSlugs.map((tag) => (
            <Tag key={tag} slug={tag} />
          ))}
        </div>
      )}
      {coverImage && (
        <div className="w-full aspect-video relative rounded-2xl overflow-hidden border border-neutral-200/70 dark:border-neutral-800 shadow-sm mt-6">
          <NextImage
            priority
            src={coverImage}
            alt={title}
            layout="fill"
            objectFit="cover"
            quality={95}
          />
        </div>
      )}
    </div>
  )
}

export default PostHeader
