import React from 'react'
import NextLink from 'next/link'
import Category from '../../types/Category'

type Props = {
  category: Category
}

export default function CategoryListItem({ category }: Props) {
  return (
    <NextLink href='/categorias/[category]' as={`/categorias/${category.slug}`}>
      <div className='p-4 rounded bg-neutral-100 hover:bg-indigo-50 border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-600 mb-4 cursor-pointer hover:scale-105 transition'>
        <h3 className='font-medium text-2xl hover:underline'>{category.name}</h3>
        <p className='dark:text-neutral-400'>{category.nPosts} posts</p>
      </div>
    </NextLink>
  )
}
