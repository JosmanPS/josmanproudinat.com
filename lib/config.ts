export const isDev =
  process.env.NODE_ENV === 'development' || !process.env.NODE_ENV

export const port = '3000'
export const domain = 'www.josmanproudinat.com'

export function getAbsoluteUrl(path: string) {
  const baseURL = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'
  return baseURL + path
}

export const host = isDev ? `http://localhost:${port}` : `https://${domain}`
