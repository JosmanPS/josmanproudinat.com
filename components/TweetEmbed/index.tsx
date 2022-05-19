import React from 'react'
import TwEmbed from 'react-tweet-embed'

type Props = {
  tweetId: string
}

export default function TweetEmbed({ tweetId }: Props) {
  return (
    <div className='max-w-sm mx-auto'>
      <TwEmbed tweetId={tweetId} />
    </div>
  )
}
