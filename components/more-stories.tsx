import { useEffect, useState } from 'react'
import PostPreview from './post-preview'
import Post from '../types/post'

type Props = {
  posts: Post[]
}

const MoreStories = ({ posts }: Props) => {
  const [postsShowing, setPostsShowing] = useState<Post[]>(posts.slice(0, 4))
  const [lastPostIndex, setLastPostIndex] = useState(
    Math.min(3, posts.length - 1)
  )

  useEffect(() => {
    const initialPosts = posts.slice(0, 4)
    setPostsShowing(initialPosts)
    setLastPostIndex(initialPosts.length - 1)
  }, [posts])

  const onShowMore = () => {
    if (lastPostIndex + 1 >= posts.length) {
      return
    }

    const newPosts = posts.slice(lastPostIndex + 1, lastPostIndex + 5)
    const postsToShow = [...postsShowing, ...newPosts]
    setPostsShowing(postsToShow)
    setLastPostIndex(postsToShow.length - 1)
  }

  return (
    <section className="py-20 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="mb-12">
        <span className="block text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-1.5">
          Archivo del Blog
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
          Artículos más recientes
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 mb-16">
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

      {lastPostIndex + 1 < posts.length && (
        <div className="text-center">
          <button
            className="btn-primary-outline px-10"
            onClick={onShowMore}
          >
            Cargar más artículos
          </button>
        </div>
      )}
    </section>
  )
}

export default MoreStories
