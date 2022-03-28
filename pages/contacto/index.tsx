import React from 'react'
import Head from 'next/head'
import Container from '../../components/container'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'
import ContactForm from '../../components/ContactForm'

export default function contacto() {
  return (
    <Layout>
      <Head>
        <title>Contacto | Josman Proudinat</title>
      </Head>
      <Container>
        <section className="py-8">
          <PostTitle>Contacto</PostTitle>
          <div className="max-w-4xl mx-auto mt-24">
            <ContactForm />
          </div>
        </section>
      </Container>
    </Layout>
  )
}
