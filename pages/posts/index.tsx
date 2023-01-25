import React from 'react'
import Head from 'next/head'
import Container from '../../components/container'
import Layout from '../../components/layout'
import { getAllCategories, getAllPosts } from '../../lib/api'
import Category from '../../types/Category'
import CategoryListItem from '../../components/Categories/CategoryListItem'
import PageTitle from '../../components/PageTitle'
import PostTitle from '../../components/post-title'
import PostType from '../../types/post'
import MoreStories from '../../components/more-stories'
import PostImageHeader from '../../components/PostImageHeader'

type Props = {
  posts: PostType[]
}

export default function Posts({ posts }: Props) {
  return (
    <Layout>
      <Head>
        <title>Categorias | Josman Proudinat</title>
      </Head>
      <section>
        <PostImageHeader post={posts[0]} />
        <Container>
          <div className='py-8'>
            <PostTitle>Posts</PostTitle>
            <MoreStories posts={posts} />
          </div>
        </Container>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'ogImage',
  ])

  return {
    props: {
      posts,
    },
  }
}
