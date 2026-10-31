import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import ErrorPage from 'next/error'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import { getPostBySlug, getAllPosts } from '../../lib/api'
import PostTitle from '../../components/post-title'
import PostType from '../../types/post'
import PostImageHeader from '../../components/PostImageHeader'
import SubstackCustomForm from '../../components/SubstackCustomForm'


type Props = {
  post: PostType
  morePosts?: PostType[]
  preview?: boolean
  source?: MDXRemoteSerializeResult
}

const Post = ({ post, preview, source }: Props) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      <div className="pb-8">
        {post && <PostImageHeader post={post} />}
        <Container>
          {router.isFallback ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <>
              <article className="mb-12 pt-12">
                <NextSeo
                  title={`${post.title} | Josman Proudinat`}
                  description={post.excerpt}
                  openGraph={{
                    type: 'website',
                    locale: 'es',
                    site_name: 'Josman Proudinat',
                    images: [{ url: post.ogImage.url }]
                  }}
                  twitter={{
                    cardType: 'summary_large_image'
                  }}
                />
                <PostHeader
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  author={post.author}
                  content={post.content}
                  tags={post.tags}
                />
                <PostBody content={post.content} source={source} />
              </article>
            </>
          )}
          <div className="max-w-4xl mx-auto">
            <SubstackCustomForm />
          </div>
        </Container>
      </div>
    </Layout>
  )
}

export default Post

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = await getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
    'excerpt',
    'tags',
  ])

  if (!post || !post.slug) {
    return {
      notFound: true,
      revalidate: 60,
    }
  }

  return {
    props: {
      post,
    },
    revalidate: 3600,
  }
}

export async function getStaticPaths() {
  const posts = await getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: 'blocking',
  }
}
