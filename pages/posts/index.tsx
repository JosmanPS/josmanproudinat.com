import React from 'react'
import { NextSeo } from 'next-seo'
import Container from '../../components/container'
import Layout from '../../components/layout'
import { getAllPosts } from '../../lib/api'
import { host } from '../../lib/config'
import PostTitle from '../../components/post-title'
import PostType from '../../types/post'
import MoreStories from '../../components/more-stories'
import HeroPost from '../../components/hero-post'

type Props = {
  posts: PostType[]
}

export default function Posts({ posts }: Props) {
  const heroPost = posts[0]
  const morePosts = posts.slice(1)
  const pageUrl = `${host}/posts`
  const pageTitle = 'Artículos y Enseñanzas | Josman Proudinat'
  const pageDescription =
    'Artículos, ensayos y reflexiones sobre teología pentecostal, estudios bíblicos, liderazgo saludable y la misión de la iglesia por Josman Proudinat.'

  return (
    <Layout>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={pageUrl}
        openGraph={{
          type: 'website',
          url: pageUrl,
          title: pageTitle,
          description: pageDescription,
        }}
      />
      <Container>
        <section className="pt-10 pb-8">
          <PostTitle>Artículos y Enseñanzas</PostTitle>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mb-4">
            Reflexiones sobre teología pentecostal, liderazgo saludable y la
            misión de la iglesia.
          </p>
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
              ogImage={heroPost.ogImage}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </section>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = await getAllPosts([
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
    revalidate: 3600,
  }
}
