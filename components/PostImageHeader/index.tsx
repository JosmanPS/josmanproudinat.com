import React from 'react'
import PostType from '../../types/post'
import Image from 'next/image'

type Props = {
  post: PostType
}

export default function PostImageHeader({ post }: Props) {
  return (
    <div className="w-full h-40 md:h-80 aspect-video relative mb-8">
      <Image
        priority
        src={post.coverImage}
        alt={`Cover Image for ${post.title}`}
        layout="fill"
        objectFit="cover"
        quality={75}
      />
    </div>
  )
}
