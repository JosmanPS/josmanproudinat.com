import React from 'react'

type Props = {
  children: any
  type?: string
}

export default function Callout({ children, type }: Props) {
  const bgColors: { [key: string]: string } = {
    default: 'bg-gray-100 dark:bg-gray-800',
    idea: 'bg-amber-50 dark:bg-yellow-800',
    info: 'bg-blue-50 dark:bg-slate-800',
  }

  const bgColor = !!type
    ? bgColors[type] || bgColors['default']
    : bgColors['default']

  return <div className={`rounded-md px-8 py-4 mb-4 ${bgColor}`}>{children}</div>
}
