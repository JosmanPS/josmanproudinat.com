import React from 'react'
import Link from 'next/link'

type Props = {
  white?: boolean
}

export default function BrandName({ white }: Props) {
  const colorClass = !!white
    ? 'text-white hover:text-white'
    : 'hover:text-black dark:text-white'

  return (
    <h2 className={'text-xl md:text-2xl font-bold tracking-tight md:tracking-tighter leading-tight ' + colorClass}>
      <Link href="/">
        <a className={'no-underline hover:underline'}>Josman</a>
      </Link>
      .
    </h2>
  )
}
