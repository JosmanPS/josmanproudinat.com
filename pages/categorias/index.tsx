import React from 'react'
import Head from 'next/head'
import Container from '../../components/container'
import Layout from '../../components/layout'
import { getAllCategories, getAllPosts } from '../../lib/api'
import Category from '../../types/Category'
import CategoryListItem from '../../components/Categories/CategoryListItem'
import PageTitle from '../../components/PageTitle'
import PostTitle from '../../components/post-title'

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
          <PostTitle>Categorías</PostTitle>
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
  const categories = getAllCategories()

  return {
    props: {
      categories,
    },
  }
}
