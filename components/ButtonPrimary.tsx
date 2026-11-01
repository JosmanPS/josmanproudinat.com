import React from 'react'
import Link from 'next/link'

type Props = {
  href: string
  children: React.ReactNode
}

export default function ButtonPrimary({ href, children }: Props) {
  return (
    <Link as={href} href={href}>
      <a className="btn-primary">{children}</a>
    </Link>
  )
}
