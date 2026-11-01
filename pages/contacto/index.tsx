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
        <section className="py-12 max-w-2xl mx-auto">
          <PostTitle>Contacto</PostTitle>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-10 leading-relaxed">
            Si deseas ponerte en contacto conmigo para invitaciones, preguntas
            o comentarios, completa el siguiente formulario.
          </p>
          <ContactForm />
        </section>
      </Container>
    </Layout>
  )
}
