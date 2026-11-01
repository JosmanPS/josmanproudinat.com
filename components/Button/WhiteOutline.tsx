import React from 'react'
import Link from 'next/link'

type Props = {
  href: string
  children: React.ReactNode
}

export default function WhiteOutline({ href, children }: Props) {
  return (
    <Link as={href} href={href}>
      <a className="inline-flex items-center justify-center rounded-lg bg-transparent hover:bg-white/10 border border-neutral-600 hover:border-white text-white font-semibold py-3 px-6 duration-200 transition-all">
        {children}
      </a>
    </Link>
  )
}
