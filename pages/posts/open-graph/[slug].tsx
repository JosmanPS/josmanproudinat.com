import matter from 'gray-matter'
import React from 'react'
import { serialize } from 'next-mdx-remote/serialize'
import NextImage from 'next/image'
import { getAllPosts, getPostBySlug } from '../../../lib/api'
import markdownToHtml from '../../../lib/markdownToHtml'
import PostType from '../../../types/post'
import PostTitle from '../../../components/post-title'
import Avatar from '../../../components/avatar'

type Props = {
  post: PostType
}

export default function PostOpenGraphImage({ post }: Props) {
  return (
    <div style={{ width: '1200px', height: '630px' }} className="bg-slate-100 flex flex-row">
      <div style={{ width: '60%', height: '100%' }} className="bg-slate-500 relative">
        <NextImage
          src={post.ogImage.url}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className='w-full p-16 flex flex-col justify-center'>
        <PostTitle>{ post.title }</PostTitle>
        <Avatar name={post.author.name} picture={post.author.picture} />
        <p className='font-medium text-lg mt-12 mb-12'>{ post.excerpt }</p>
      </div>
    </div>
  )
}

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
  const postContent = await markdownToHtml(post.content || '')
  const {
    content,
    data: { title, description, date },
  } = matter(postContent)

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
