import React from 'react'
import Link from 'next/link'

type Props = {
  href: string
  children: React.ReactNode
}

export default function White({ href, children }: Props) {
  return (
    <Link as={href} href={href}>
      <a className="inline-flex items-center justify-center rounded-lg bg-white hover:bg-neutral-200 text-black border border-white font-semibold py-3 px-6 duration-200 transition-all shadow-sm">
        {children}
      </a>
    </Link>
  )
}
