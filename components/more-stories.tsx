import { useEffect, useState } from 'react'
import PostPreview from './post-preview'
import Post from '../types/post'

type Props = {
  posts: Post[]
}

const MoreStories = ({ posts }: Props) => {
  const [postsShowing, setPostsShowing] = useState<Post[]>([])
  const [lastPostIndex, setLastPostIndex] = useState(0)

  useEffect(() => {
    const initialPosts = posts.slice(0, 4)
    setPostsShowing(initialPosts)
    setLastPostIndex(initialPosts.length - 1)
  }, [])

  const onShowMore = () => {
    if (posts.length === lastPostIndex - 1) {
      return
    }

    const newPosts = posts.slice(lastPostIndex + 1, lastPostIndex + 4)
    const postsToShow = [...postsShowing, ...newPosts]
    setPostsShowing(postsToShow)
    setLastPostIndex(postsToShow.length - 1)
  }

  return (
    <section className="py-8">
      <h2 className="mb-8 text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
        Más reciente
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {postsShowing.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
            ogImage={post.ogImage}
          />
        ))}
      </div>
      <div>
        {lastPostIndex + 1 < posts.length && (
          <button
            className="btn-primary-outline w-full mb-12"
            onClick={onShowMore}
          >
            Ver más posts
          </button>
        )}
      </div>
    </section>
  )
}

export default MoreStories
