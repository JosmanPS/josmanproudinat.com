import React from 'react'

type Props = {
  children: React.ReactNode
  href: string
  title?: string
  marginRight?: boolean
}

export default function CircleIcon({
  children,
  href,
  title,
  marginRight,
}: Props) {
  return (
    <a
      className={`inline-flex items-center justify-center w-10 h-10 text-neutral-600 bg-white border border-neutral-200 rounded-full hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors focus:outline-none dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-800 dark:hover:bg-white dark:hover:text-black dark:hover:border-white ${
        marginRight ? 'mr-2.5' : ''
      }`}
      href={href}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}
