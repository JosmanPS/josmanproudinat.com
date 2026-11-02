import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import {
  HOME_OG_IMAGE_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
} from '../lib/constants'
import { host } from '../lib/config'
import '../styles/index.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <DefaultSeo
        defaultTitle={SITE_TITLE}
        description={SITE_DESCRIPTION}
        openGraph={{
          type: 'website',
          locale: 'es_ES',
          url: host,
          site_name: SITE_NAME,
          images: [
            {
              url: HOME_OG_IMAGE_URL,
              width: 1200,
              height: 630,
              alt: SITE_NAME,
            },
          ],
        }}
        twitter={{
          handle: '@josmanproudinat',
          site: '@josmanproudinat',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'author',
            content: SITE_NAME,
          },
        ]}
      />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
