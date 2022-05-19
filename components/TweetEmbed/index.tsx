import React from 'react'

type Props = {
  tweetId: string
}

export default function TweetEmbed({ tweetId }: Props) {
  return (
    <div className='w-full flex justify-center'>
      <blockquote className="twitter-tweet">
        <a href={`https://twitter.com/JosmanProudinat/status/${tweetId}?ref_src=twsrc%5Etfw`}></a>
      </blockquote>
      <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
    </div>
  )
}
