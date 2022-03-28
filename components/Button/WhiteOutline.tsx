import React from 'react'
import Link from 'next/link'

type Props = {
  href: string
  children: string
}

export default function WhiteOutline({ href, children }: Props) {
  return (
    <Link as={href} href={href}>
      <a className="bg-transparent hover:bg-white hover:text-black border border-white text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0">
        { children }
      </a>
    </Link>
  )
}
