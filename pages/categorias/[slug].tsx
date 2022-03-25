import React from 'react'
import Head from 'next/head'
import Category from '../../@types/Category'
import Layout from '../../components/layout'
import {
  getAllCategories,
  getCategoryBySlug,
  getPostsByCategory,
} from '../../lib/api'
import Container from '../../components/container'
import MoreStories from '../../components/more-stories'
import PostTitle from '../../components/post-title'

type Props = {
  category: Category
  posts: any[]
}

export default function CategoryPosts({ category, posts }: Props) {
  console.log(posts)
  return (
    <Layout>
      <Head>
        <title>
          Enseñanzas y predicaciones sobre {category.name.toLowerCase()} |
          Josman Proudinat
        </title>
      </Head>
      <Container>
        <section className="py-8">
          <PostTitle>{category.name}</PostTitle>

          <MoreStories posts={posts} />
        </section>
      </Container>
    </Layout>
  )
}

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const category = getCategoryBySlug(params.slug)
  const posts = getPostsByCategory((category as Category).name)
  return {
    props: { posts, category },
  }
}

export async function getStaticPaths() {
  const categories = getAllCategories()
  return {
    paths: categories.map((category) => ({
      params: {
        slug: category.slug,
      },
    })),
    fallback: false,
  }
}
