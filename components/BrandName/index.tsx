import React from 'react'
import Link from 'next/link'

type Props = {
  white?: boolean
}

export default function BrandName({ white }: Props) {
  const colorClass = white
    ? 'text-white hover:text-neutral-200'
    : 'text-neutral-900 hover:text-neutral-700 dark:text-white dark:hover:text-neutral-200'

  return (
    <h2
      className={
        'text-xl md:text-2xl font-extrabold tracking-tight leading-none ' +
        colorClass
      }
    >
      <Link href="/">
        <a className="no-underline transition-opacity hover:opacity-80">
          Josman Proudinat<span className="text-neutral-400">.</span>
        </a>
      </Link>
    </h2>
  )
}
