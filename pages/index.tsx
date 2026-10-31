import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import LatestSermon from '../components/latest-sermon'
import Intro from '../components/Intro'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import { getPlaylistSermons } from '../lib/youtube'
import Head from 'next/head'
import { CMS_NAME, HOME_OG_IMAGE_URL } from '../lib/constants'
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
  return (
    <>
      <Layout headerDark>
        <Head>
          <title>Josman Proudinat</title>
          <meta property="og:image" content={HOME_OG_IMAGE_URL} />
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
