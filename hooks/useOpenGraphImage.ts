import { useRouter } from 'next/router'
import { getAbsoluteUrl } from '../lib/config'

export default function useOpenGraphImage() {
  const router = useRouter()
  const searchParams = new URLSearchParams()

  // The [slug] from /posts/[slug] and /posts/open-graph/[slug]
  // should be identical.
  searchParams.set(
    'path',
    router.asPath.replace('/posts/', '/posts/open-graph/')
  )

  // Open Graph & Twitter images need a full URL including domain
  const fullImageURL = getAbsoluteUrl(`/api/open-graph-image?${searchParams}`)
  return { imageURL: fullImageURL }
}
