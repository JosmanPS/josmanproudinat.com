import Link from 'next/link'
import NextImage from 'next/image'

type Props = {
  title: string
  src: string
  slug?: string
}

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    <div className="w-full aspect-video relative overflow-hidden rounded-xl border border-neutral-200/70 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 group">
      <NextImage
        src={src}
        alt={`Imagen de portada para ${title}`}
        layout="fill"
        objectFit="cover"
        quality={95}
        className="group-hover:scale-[1.03] transition-transform duration-500 ease-out"
      />
    </div>
  )
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title} className="block focus:outline-none">
            {image}
          </a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

export default CoverImage
