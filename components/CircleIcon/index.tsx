import React from 'react'

type Props = {
  children: any
  href: string
  title?: string
  marginRight?: boolean
}

export default function CircleIcon({ children, href, title, marginRight }: Props) {
  return (
    <a
      className={`inline-block p-3 text-center text-white bg-black transition rounded-full ripple hover:bg-transparent hover:text-black hover:border-black border focus:outline-none dark:bg-neutral-100 dark:text-black dark:border-white dark:hover:bg-transparent dark:hover:text-white ${marginRight ? 'mr-2': ''}`}
      href={href}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
    >
      { children }
    </a>
  )
}
