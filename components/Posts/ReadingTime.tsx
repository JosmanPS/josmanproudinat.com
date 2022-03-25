import React from 'react'

type Props = {
  content: string
}

export default function ReadingTime({ content }: Props) {

  const wordsPerMinute = 225
  const words = content.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return (
    <div>Lectura de { time } mins</div>
  )
}
