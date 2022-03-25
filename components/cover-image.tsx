import Link from 'next/link'
import NextImage from 'next/image'

type Props = {
  title: string
  src: string
  slug?: string
}

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    <div className="w-full aspect-video relative hover:shadow-lg transition-shadow duration-200">
      <NextImage
        src={src}
        alt={`Cover Image for ${title}`}
        layout="fill"
        objectFit="cover"
        quality={100}
      />
    </div>
  )
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

export default CoverImage
