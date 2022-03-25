import React from 'react'
import NextLink from 'next/link'

type Props = {
  slug: string
}

export default function Tag({ slug }: Props) {
  return (
    <NextLink href='/categorias/[slug]' as={`/categorias/${slug}`}>
      <a className="mr-2 hover:underline">#{ slug }</a>
    </NextLink>
  )
}
