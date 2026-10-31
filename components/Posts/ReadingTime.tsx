import React from 'react'

type Props = {
  content: string
}

export default function ReadingTime({ content }: Props) {
  const wordsPerMinute = 225
  const plainText = content.replace(/<[^>]*>/g, ' ')
  const words = plainText.trim().split(/\s+/).filter(Boolean).length
  const time = Math.max(1, Math.ceil(words / wordsPerMinute))
  return <div>Lectura de {time} mins</div>
}
