import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import PostTitle from './post-title'
import Author from '../types/author'
import ReadingTime from './Posts/ReadingTime'

type Props = {
  title: string
  coverImage: string
  date: string
  author: Author
  content: string
}

const PostHeader = ({ title, coverImage, date, content }: Props) => {
  return (
    <>
      {/* <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div> */}
      <div className="max-w-4xl mx-auto">
        <PostTitle>{title}</PostTitle>
        <div className="mb-6 text-lg text-slate-500 flex flex-row">
          <DateFormatter dateString={date} /> <span className="mx-2">•</span>{' '}
          <ReadingTime content={content} />
        </div>
      </div>
    </>
  )
}

export default PostHeader
