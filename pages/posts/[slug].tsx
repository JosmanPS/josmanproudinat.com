import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import ErrorPage from 'next/error'
import matter from 'gray-matter'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import { getPostBySlug, getAllPosts } from '../../lib/api'
import PostTitle from '../../components/post-title'
import PostType from '../../types/post'
import GetRevueForm from '../../components/GetRevueForm'
import PostImageHeader from '../../components/PostImageHeader'
import SubstackCustomForm from '../../components/SubstackCustomForm'


type Props = {
  post: PostType
  morePosts: PostType[]
  preview?: boolean
  source: MDXRemoteSerializeResult
}

const Post = ({ post, morePosts, preview, source }: Props) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  // const { imageURL } = useOpenGraphImage()

  return (
    <Layout preview={preview}>
      <div className="pb-8">
        <PostImageHeader post={post} />
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
            {/* <GetRevueForm /> */}
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
  const post = getPostBySlug(params.slug, [
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
  const {
    content,
    data: { title, description, date },
  } = matter(post.content)

  const source = await serialize(content)

  return {
    props: {
      post: {
        ...post,
        content,
      },
      source,
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
