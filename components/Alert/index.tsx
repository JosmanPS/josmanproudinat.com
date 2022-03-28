import React from 'react'

type Props = {
  children: any
  type?: 'primary' | 'success' | 'info' | 'warning' | 'error'
}

export default function Alert({ children, type }: Props) {
  const colorsClassDict = {
    primary: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    success: 'text-green-600 bg-green-50 border-green-100',
    info: 'text-blue-600 bg-blue-50 border-blue-100',
    warning: 'text-yellow-600 bg-yellow-50 border-yellow-100',
    error: 'text-red-600 bg-red-50 border-red-100',
  }
  const colorsClass = !!type
    ? colorsClassDict[type]
    : colorsClassDict['primary']

  return (
    <div className={'w-full mb-8 border rounded py-4 px-4 ' + colorsClass}>
      {children}
    </div>
  )
}
