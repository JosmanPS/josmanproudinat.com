import React from 'react'
import { NextSeo } from 'next-seo'
import Container from '../../components/container'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'
import ContactForm from '../../components/ContactForm'
import { host } from '../../lib/config'

export default function Contacto() {
  const pageUrl = `${host}/contacto`
  const pageTitle = 'Contacto | Josman Proudinat'
  const pageDescription =
    'Ponte en contacto con el pastor y autor Josman Proudinat para invitaciones a predicar, conferencias, entrevistas, preguntas o comentarios.'

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
