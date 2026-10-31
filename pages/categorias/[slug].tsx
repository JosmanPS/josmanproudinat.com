import React from 'react'
import Head from 'next/head'
import Category from '../../types/Category'
import Layout from '../../components/layout'
import {
  getAllCategories,
  getCategoryBySlug,
  getPostsByCategory,
} from '../../lib/api'
import Container from '../../components/container'
import MoreStories from '../../components/more-stories'
import PostTitle from '../../components/post-title'
import PostImageHeader from '../../components/PostImageHeader'

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
      <section>
        <PostImageHeader post={posts[0]} />
        <Container>
          <div className='py-8'>
            <PostTitle>{category.name}</PostTitle>
            <MoreStories posts={posts} />
          </div>
        </Container>
      </section>
    </Layout>
  )
}

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const category = await getCategoryBySlug(params.slug)
  if (!category) {
    return {
      notFound: true,
      revalidate: 60,
    }
  }
  const posts = await getPostsByCategory(category.name)
  return {
    props: { posts, category },
    revalidate: 3600,
  }
}

export async function getStaticPaths() {
  const categories = await getAllCategories()
  return {
    paths: categories.map((category) => ({
      params: {
        slug: category.slug,
      },
    })),
    fallback: 'blocking',
  }
}
