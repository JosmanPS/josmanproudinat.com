import slugify from 'slugify'
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

const PostHeader = ({ title, tags, date, content }: Props) => {
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
    <>
      <div className="max-w-4xl mx-auto">
        <PostTitle>{title}</PostTitle>
        <div className="mb-6 md:text-lg text-slate-500 flex flex-row">
          <DateFormatter dateString={date} /> <span className="mx-2">•</span>{' '}
          <ReadingTime content={content} />
        </div>
        {tagsSlugs.length > 0 && (
          <div className="mb-6 md:text-lg text-slate-500 flex flex-row">
            {tagsSlugs.map((tag) => (
              <Tag key={tag} slug={tag} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default PostHeader
