import Sermon from '../types/sermon'

export const YOUTUBE_PLAYLIST_ID = 'PLP-6xYOMaKCvhuE4QVTuhU0pWEYotCgQr'
export const YOUTUBE_PLAYLIST_URL = `https://www.youtube.com/playlist?list=${YOUTUBE_PLAYLIST_ID}`

let cachedSermons: Sermon[] | null = null
let cacheTimestamp = 0
const CACHE_TTL_MS = 60 * 1000 // 1 minute in-memory cache

function cleanSermonTitle(rawTitle = ''): string {
  return rawTitle
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export async function getPlaylistSermons(
  playlistId: string = YOUTUBE_PLAYLIST_ID
): Promise<Sermon[]> {
  const now = Date.now()
  if (
    playlistId === YOUTUBE_PLAYLIST_ID &&
    cachedSermons &&
    now - cacheTimestamp < CACHE_TTL_MS
  ) {
    return cachedSermons
  }

  const response = await fetch(
    `https://www.youtube.com/playlist?list=${playlistId}`,
    {
      headers: {
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    }
  )

  if (!response.ok) {
    throw new Error(
      `Failed to fetch YouTube playlist (${response.status} ${response.statusText})`
    )
  }

  const html = await response.text()
  const match = html.match(/var ytInitialData = (\{[\s\S]*?\});<\/script>/)
  if (!match) {
    return []
  }

  const data = JSON.parse(match[1])
  const sectionContents =
    data?.contents?.twoColumnBrowseResultsRenderer?.tabs?.[0]?.tabRenderer
      ?.content?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer
      ?.contents || []

  const sermons: Sermon[] = []

  for (const item of sectionContents) {
    // Format 1: Newer YouTube lockupViewModel
    if (item.lockupViewModel) {
      const lvm = item.lockupViewModel
      const videoId: string = lvm.contentId || ''
      if (!videoId) continue

      const rawTitle: string =
        lvm.metadata?.lockupMetadataViewModel?.title?.content || ''
      const title = cleanSermonTitle(rawTitle)

      const duration: string =
        lvm.contentImage?.thumbnailViewModel?.overlays?.[0]
          ?.thumbnailBottomOverlayViewModel?.badges?.[0]
          ?.thumbnailBadgeViewModel?.text || ''

      const metaRows =
        lvm.metadata?.lockupMetadataViewModel?.metadata
          ?.contentMetadataViewModel?.metadataRows || []
      const channel: string =
        metaRows[0]?.metadataParts?.[0]?.text?.content || ''
      const publishedInfo: string = (metaRows[1]?.metadataParts || [])
        .map((part: any) => part?.text?.content)
        .filter(Boolean)
        .join(' • ')

      sermons.push({
        videoId,
        title,
        duration,
        channel,
        publishedInfo,
        thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        url: `https://www.youtube.com/watch?v=${videoId}&list=${playlistId}`,
      })
    }

    // Format 2: Classic YouTube playlistVideoListRenderer
    if (item.playlistVideoListRenderer?.contents) {
      for (const entry of item.playlistVideoListRenderer.contents) {
        const pvr = entry.playlistVideoRenderer
        if (!pvr || !pvr.videoId) continue

        const videoId: string = pvr.videoId
        const rawTitle: string =
          pvr.title?.runs?.map((r: any) => r.text).join('') ||
          pvr.title?.simpleText ||
          ''
        const title = cleanSermonTitle(rawTitle)
        const duration: string = pvr.lengthText?.simpleText || ''
        const channel: string =
          pvr.shortBylineText?.runs?.[0]?.text || ''
        const publishedInfo: string = (pvr.videoInfo?.runs || [])
          .map((r: any) => r.text)
          .join('')
          .trim()

        sermons.push({
          videoId,
          title,
          duration,
          channel,
          publishedInfo,
          thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
          url: `https://www.youtube.com/watch?v=${videoId}&list=${playlistId}`,
        })
      }
    }
  }

  if (playlistId === YOUTUBE_PLAYLIST_ID) {
    cachedSermons = sermons
    cacheTimestamp = now
  }

  return sermons
}
