import React from 'react'
import TwEmbed from 'react-tweet-embed'
import LazyWrapper from '../LazyWrapper'

type Props = {
  tweetId: string
}

export default function TweetEmbed({ tweetId }: Props) {
  return (
    <LazyWrapper>
      <div className="max-w-sm mx-auto">
        <TwEmbed tweetId={tweetId} />
      </div>
    </LazyWrapper>
  )
}
