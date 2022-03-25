import React from 'react'

type Props = {
  children: string
}

export default function PageTitle({ children }: Props) {
  return (
    <h1 className="text-2xl md:text-4xl font-bold tracking-tighter leading-tight md:pr-8">
      { children }
    </h1>
  )
}
