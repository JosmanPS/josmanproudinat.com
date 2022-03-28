import React from 'react'
import { getAllPosts } from '../../lib/api'

export default function ultimo() {
  return (
    <div></div>
  )
}


export async function getServerSideProps() {
  const allPosts = getAllPosts([
    'slug',
  ])
  const lastPost = allPosts[0]
  return {
    redirect: {
      destination: `/posts/${lastPost.slug}`
    }
  }
}
