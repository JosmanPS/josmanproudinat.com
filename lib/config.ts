export const isDev =
  process.env.NODE_ENV === 'development' || !process.env.NODE_ENV

export const port = '3000'
export const domain = 'www.josmanproudinat.com'


export const host = isDev ? `http://localhost:${port}` : `https://${domain}`

export function getAbsoluteUrl(path: string) {
  return host + path
}
