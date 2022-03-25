import React from 'react'
import Head from 'next/head'
import slugify from 'slugify'
import Container from '../../components/container'
import Layout from '../../components/layout'
import { getAllPosts } from '../../lib/api'
import Category from '../../@types/Category'
import CategoryListItem from '../../components/Categories/CategoryListItem'

type Props = {
  categories: Category[]
}

export default function categorias({ categories }: Props) {
  return (
    <Layout>
      <Head>
        <title>Categorias | Josman Proudinat</title>
      </Head>
      <Container>
        <section className="py-8">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tighter leading-tight md:pr-8">
            Categorías
          </h1>
          <p className="text-lg mt-2 mb-12 leading-10">
            Encuentra diferentes posts de eneseñanzas de acuerdo a su categoría.
          </p>

          {categories.map((category) => (
            <CategoryListItem category={category} key={category.name} />
          ))}
        </section>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts(['tags'])

  const tagsList: string[] = []
  posts.forEach((post) => {
    const tags = post.tags.trim().split(',')
    tagsList.push(...tags)
  })

  const tagsDict: { [key: string]: number } = {}
  tagsList.forEach((tag) => {
    if (!Object.keys(tagsDict).includes(tag)) {
      tagsDict[tag] = 1
    }
    tagsDict[tag] += 1
  })

  const categories: Category[] = Object.entries(tagsDict)
    .map(([key, value]) => {
      const slug = slugify(key, { trim: true, lower: true })
      return { name: key, slug, nPosts: value }
    })
    .sort((a, b) => b.nPosts - a.nPosts)

  return {
    props: {
      categories,
    },
  }
}
