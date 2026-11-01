#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const PLAYLIST_ID =
  process.env.YOUTUBE_PLAYLIST_ID || 'PLP-6xYOMaKCvhuE4QVTuhU0pWEYotCgQr'
const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash'
const SERMONS_DIR = path.join(process.cwd(), '_predicaciones')

function slugifyTitle(str = '') {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/pastor josman proudinat|ps\.?\s*josman proudinat|pastor josman/gi, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function cleanDisplayTitle(rawTitle = '') {
  return rawTitle
    .replace(/\u00a0/g, ' ')
    .replace(/\s*-\s*(Pastor|Ps\.?)\s*Josman(\s+Proudinat)?$/i, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function getExistingVideoIds() {
  if (!fs.existsSync(SERMONS_DIR)) {
    fs.mkdirSync(SERMONS_DIR, { recursive: true })
    return new Set()
  }
  const files = fs.readdirSync(SERMONS_DIR).filter((f) => f.endsWith('.mdx'))
  const ids = new Set()
  for (const file of files) {
    const content = fs.readFileSync(path.join(SERMONS_DIR, file), 'utf8')
    const match = content.match(/^videoId:\s*['"]?([^'"\n]+)['"]?/m)
    if (match) {
      ids.add(match[1].trim())
    }
  }
  return ids
}

async function fetchPlaylistVideos(playlistId) {
  const res = await fetch(
    `https://www.youtube.com/playlist?list=${playlistId}`,
    {
      headers: {
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    }
  )

  if (!res.ok) {
    throw new Error(`Error al obtener playlist de YouTube: ${res.status}`)
  }

  const html = await res.text()
  const match = html.match(/var ytInitialData = (\{[\s\S]*?\});<\/script>/)
  if (!match) {
    throw new Error('No se encontró ytInitialData en la página de la playlist.')
  }

  const data = JSON.parse(match[1])
  const sectionContents =
    data?.contents?.twoColumnBrowseResultsRenderer?.tabs?.[0]?.tabRenderer
      ?.content?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer
      ?.contents || []

  const videos = []

  for (const item of sectionContents) {
    if (item.lockupViewModel) {
      const lvm = item.lockupViewModel
      const videoId = lvm.contentId
      if (!videoId) continue
      const rawTitle =
        lvm.metadata?.lockupMetadataViewModel?.title?.content || ''
      const duration =
        lvm.contentImage?.thumbnailViewModel?.overlays?.[0]
          ?.thumbnailBottomOverlayViewModel?.badges?.[0]
          ?.thumbnailBadgeViewModel?.text || ''
      const metaRows =
        lvm.metadata?.lockupMetadataViewModel?.metadata
          ?.contentMetadataViewModel?.metadataRows || []
      const channel =
        metaRows[0]?.metadataParts?.[0]?.text?.content || 'Rompiendo Fronteras'
      const publishedInfo = (metaRows[1]?.metadataParts || [])
        .map((p) => p?.text?.content)
        .filter(Boolean)
        .join(' • ')

      videos.push({
        videoId,
        rawTitle,
        title: cleanDisplayTitle(rawTitle),
        duration,
        channel,
        publishedInfo,
      })
    }

    if (item.playlistVideoListRenderer?.contents) {
      for (const entry of item.playlistVideoListRenderer.contents) {
        const pvr = entry.playlistVideoRenderer
        if (!pvr?.videoId) continue
        const rawTitle =
          pvr.title?.runs?.map((r) => r.text).join('') ||
          pvr.title?.simpleText ||
          ''
        videos.push({
          videoId: pvr.videoId,
          rawTitle,
          title: cleanDisplayTitle(rawTitle),
          duration: pvr.lengthText?.simpleText || '',
          channel:
            pvr.shortBylineText?.runs?.[0]?.text || 'Rompiendo Fronteras',
          publishedInfo: (pvr.videoInfo?.runs || [])
            .map((r) => r.text)
            .join('')
            .trim(),
        })
      }
    }
  }

  return videos
}

async function fetchVideoMetadataAndTranscript(videoId) {
  const res = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
    headers: {
      'Accept-Language': 'es-ES,es;q=0.9',
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
  })
  const html = await res.text()
  const prMatch = html.match(
    /var ytInitialPlayerResponse = (\{[\s\S]*?\});<\/script>/
  )

  let publishDate = new Date().toISOString().slice(0, 10)
  let shortDescription = ''
  let transcript = ''

  if (prMatch) {
    try {
      const pr = JSON.parse(prMatch[1])
      shortDescription = pr.videoDetails?.shortDescription || ''
      const rawDate =
        pr.microformat?.playerMicroformatRenderer?.publishDate ||
        pr.microformat?.playerMicroformatRenderer?.uploadDate
      if (rawDate) {
        publishDate = rawDate.slice(0, 10)
      }

      const tracks =
        pr.captions?.playerCaptionsTracklistRenderer?.captionTracks || []
      const esTrack = tracks.find((t) => t.languageCode === 'es') || tracks[0]
      if (esTrack?.baseUrl) {
        const capRes = await fetch(esTrack.baseUrl)
        const capXml = await capRes.text()
        const lines = Array.from(
          capXml.matchAll(/<text[^>]*>([\s\S]*?)<\/text>/g)
        ).map((m) =>
          m[1]
            .replace(/&amp;/g, '&')
            .replace(/&#39;/g, "'")
            .replace(/&quot;/g, '"')
            .replace(/\n/g, ' ')
            .trim()
        )
        transcript = lines.join(' ')
      }
    } catch {
      // Fallback if player response parsing fails
    }
  }

  return { publishDate, shortDescription, transcript }
}

async function generateBlogPostWithGemini(video, details) {
  if (!GEMINI_API_KEY) {
    throw new Error(
      'Falta la variable de entorno GEMINI_API_KEY para generar el artículo.'
    )
  }

  const videoUrl = `https://www.youtube.com/watch?v=${video.videoId}`
  const systemInstruction = `Eres Josman Proudinat, pastor, autor y maestro bíblico.
Tu tarea es redactar un artículo de blog y notas de estudio en formato MDX basado en tu predicación titulada "${video.title}".
Escribe en español con un tono pastoral, bíblico, claro e inspirador.

Devuelve ÚNICAMENTE un objeto JSON válido con tres propiedades:
1. "excerpt": Un resumen atractivo de 1 a 2 oraciones (máximo 220 caracteres) sin comillas dobles problemáticas.
2. "tags": Un arreglo de 1 a 3 etiquetas temáticas cortas en español (por ejemplo: ["Fe", "Espíritu Santo", "Obediencia"], ["Adoración", "Trabajo", "Propósito"], ["Oración", "Perseverancia"], ["Discipulado", "Vida Cristiana"]).
3. "markdown": El cuerpo del artículo en Markdown/MDX (sin el bloque frontmatter YAML y sin repetir el título H1).
   - Usa subtítulos "##" y "###".
   - Incluye entre 1 y 2 bloques "<Callout>\\n📖\\n\\n**Cita bíblica** ...\\n</Callout>" con los pasajes bíblicos centrales de la enseñanza.
   - Cierra con una sección "## Aplicación práctica" o "## Reflexión final" con puntos accionables para el lector.`

  const promptText = `Título de la predicación: ${video.title}
Canal: ${video.channel}
Duración: ${video.duration}
Descripción del video: ${details.shortDescription || 'No disponible'}
${
  details.transcript
    ? `Transcripción de la predicación:\n${details.transcript.slice(0, 25000)}`
    : 'Analiza el video de YouTube adjunto para extraer los puntos principales, pasajes bíblicos y enseñanza central.'
}`

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`

  // Try passing the YouTube video URL directly via fileData first (supported natively by Gemini),
  // or fall back to text prompt if transcript is already present.
  const parts = details.transcript
    ? [{ text: promptText }]
    : [
        {
          fileData: {
            mimeType: 'video/*',
            fileUri: videoUrl,
          },
        },
        { text: promptText },
      ]

  let res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemInstruction }] },
      contents: [{ role: 'user', parts }],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.4,
      },
    }),
  })

  if (!res.ok && !details.transcript) {
    // Fallback without fileData if video URI could not be fetched directly
    res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents: [{ role: 'user', parts: [{ text: promptText }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.4,
        },
      }),
    })
  }

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Error en Gemini API (${res.status}): ${errText}`)
  }

  const json = await res.json()
  const rawOutput =
    json?.candidates?.[0]?.content?.parts?.[0]?.text || '{}'
  return JSON.parse(rawOutput)
}

function buildMdxFile(video, details, generated) {
  const safeTitle = video.title.replace(/'/g, "''")
  const safeExcerpt = (generated.excerpt || '').replace(/'/g, "''")
  const rawTags = Array.isArray(generated.tags)
    ? generated.tags
    : typeof generated.tags === 'string'
    ? generated.tags.split(',')
    : ['Predicación']
  const cleanTags = rawTags
    .map((t) => String(t).trim())
    .filter(Boolean)
    .slice(0, 3)
  if (cleanTags.length === 0) {
    cleanTags.push('Predicación')
  }
  const safeTags = cleanTags.join(', ').replace(/'/g, "''")

  return `---
title: '${safeTitle}'
excerpt: '${safeExcerpt}'
date: '${details.publishDate}'
tags: '${safeTags}'
videoId: '${video.videoId}'
duration: '${video.duration}'
channel: '${video.channel}'
publishedInfo: '${video.publishedInfo}'
thumbnail: 'https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg'
url: 'https://www.youtube.com/watch?v=${video.videoId}&list=${PLAYLIST_ID}'
---

${(generated.markdown || '').trim()}
`
}

async function main() {
  console.log(`Consultando playlist de YouTube: ${PLAYLIST_ID}...`)
  const videos = await fetchPlaylistVideos(PLAYLIST_ID)
  const existingVideoIds = getExistingVideoIds()

  const newVideos = videos.filter((v) => !existingVideoIds.has(v.videoId))
  if (newVideos.length === 0) {
    console.log('No hay videos nuevos por sincronizar.')
    return
  }

  console.log(`Se encontraron ${newVideos.length} video(s) nuevo(s).`)

  for (const video of newVideos) {
    console.log(`Procesando: "${video.title}" (${video.videoId})...`)
    const details = await fetchVideoMetadataAndTranscript(video.videoId)
    const generated = await generateBlogPostWithGemini(video, details)
    const slug = slugifyTitle(video.title) || video.videoId.toLowerCase()
    const filePath = path.join(SERMONS_DIR, `${slug}.mdx`)
    const mdxContent = buildMdxFile(video, details, generated)
    fs.writeFileSync(filePath, mdxContent, 'utf8')
    console.log(`✓ Creado: _predicaciones/${slug}.mdx`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
