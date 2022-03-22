import React from 'react'
import Link from 'next/link'

export default function BrandName() {
  return (
    <h2 className="text-xl md:text-2xl font-bold tracking-tight md:tracking-tighter leading-tight">
      <Link href="/">
        <a className="hover:underline">JosmanProudinat</a>
      </Link>
      .
    </h2>
  )
}
