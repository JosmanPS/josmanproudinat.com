import React from 'react'
import Link from 'next/link'

type Props = {
  href: string
  children: string
}

export default function ButtonPrimary({ href, children }: Props) {
  return (
    <Link as={href} href={href}>
      <a className="bg-black hover:bg-white hover:text-black border border-black text-white dark:text-black dark:bg-neutral-100 dark:border-white dark:hover:bg-transparent dark:hover:text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0">
        { children }
      </a>
    </Link>
  )
}
