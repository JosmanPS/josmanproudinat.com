import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import LatestSermon from '../components/latest-sermon'
import Intro from '../components/Intro'
import Layout from '../components/layout'
import SubstackCustomForm from '../components/SubstackCustomForm'
import { getAllPosts } from '../lib/api'
import { getPlaylistSermons } from '../lib/youtube'
import Head from 'next/head'
import { NextSeo } from 'next-seo'
import {
  AUTHOR_SOCIAL_LINKS,
  HOME_OG_IMAGE_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
} from '../lib/constants'
import { host } from '../lib/config'
import Post from '../types/post'
import Sermon from '../types/sermon'
import MisionPosibleBanner from '../components/Books/MisionPosible/Banner'

type Props = {
  allPosts: Post[]
  latestSermon: Sermon | null
}

const Index = ({ allPosts, latestSermon }: Props) => {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)

  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${host}/#website`,
        url: host,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: 'es',
        publisher: {
          '@id': `${host}/#person`,
        },
      },
      {
        '@type': 'Person',
        '@id': `${host}/#person`,
        name: 'Josman Proudinat',
        url: host,
        image: `${host}/assets/blog/authors/josman.png`,
        jobTitle: 'Pastor, Autor y Maestro Bíblico',
        worksFor: {
          '@type': 'Organization',
          name: 'Iglesia Rompiendo Fronteras',
        },
        sameAs: AUTHOR_SOCIAL_LINKS,
      },
      {
        '@type': 'Book',
        name: 'Misión Posible',
        author: {
          '@id': `${host}/#person`,
        },
        inLanguage: 'es',
        url: 'https://mybook.to/mision-posible',
      },
    ],
  }

  return (
    <>
      <Layout>
        <NextSeo
          title={SITE_TITLE}
          description={SITE_DESCRIPTION}
          canonical={host}
          openGraph={{
            type: 'website',
            url: host,
            title: SITE_TITLE,
            description: SITE_DESCRIPTION,
            images: [
              {
                url: HOME_OG_IMAGE_URL,
                width: 1200,
                height: 630,
                alt: SITE_NAME,
              },
            ],
          }}
        />
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
          />
        </Head>
        <Intro />

        <MisionPosibleBanner />

        <Container>
          <div id="ultimo-post"></div>
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
          {latestSermon && <LatestSermon sermon={latestSermon} />}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}

          <div className="max-w-4xl mx-auto pb-8">
            <SubstackCustomForm />
          </div>
        </Container>
      </Layout>
    </>
  )
}

export default Index

export const getStaticProps = async () => {
  const [allPosts, sermons] = await Promise.all([
    getAllPosts([
      'title',
      'date',
      'slug',
      'author',
      'coverImage',
      'excerpt',
      'ogImage',
    ]),
    getPlaylistSermons(),
  ])

  return {
    props: {
      allPosts,
      latestSermon: sermons[0] || null,
    },
    revalidate: 3600,
  }
}
