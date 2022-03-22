import NextImage from 'next/image'
import YoutubeEmbed from '../YoutubeEmbed'
import Callout from '../Callout'

const Image = (props: any) => {
  return (
    <NextImage {...props} layout="responsive" loading="lazy" quality={100} />
  )
}

const MDXComponents = {
  img: Image,
  YoutubeEmbed,
  Callout
}

export default MDXComponents
