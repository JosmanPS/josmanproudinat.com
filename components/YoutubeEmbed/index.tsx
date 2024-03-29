import LazyWrapper from "../LazyWrapper"

type Props = {
  videoId: string
}

export default function YoutubeEmbed({ videoId }: Props) {
  return (
    <div style={{ padding: '56.25% 0 0 0', position: 'relative', marginBottom: '2rem' }}>
      <LazyWrapper>
        <iframe
          src={`https://youtube.com/embed/${videoId}`}
          allow="autoplay; fullscreen; picture-in-picture"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        ></iframe>
      </LazyWrapper>
    </div>
  )
}
