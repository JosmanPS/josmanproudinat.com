import type { NextApiRequest, NextApiResponse } from 'next'
import chromium from 'chrome-aws-lambda'
import { chromium as playwrightChromium } from 'playwright-core'
import { getAbsoluteUrl } from '../../lib/config'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Start the browser with the AWS Lambda wrapper (chrome-aws-lambda)
  const browser = await playwrightChromium.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  })

  // Create a page with the Open Graph image size best practise
  // 1200x630 is a good size for most social media sites
  const page = await browser.newPage({
    viewport: {
      width: 1440,
      height: 810
    }
  });

  // Generate the full URL out of the given path (GET parameter)
  const relativeUrl = (req.query["path"] as string) || "";
  const url = getAbsoluteUrl(relativeUrl)

  await page.goto(url, {
    timeout: 15 * 1000,
    // waitUntil option will make sure everything is loaded on the page
    waitUntil: "networkidle"
  })
  const data = await page.screenshot({
    type: "png"
  })
  await browser.close()

  // Set the s-maxage property which caches the images then on the Vercel edge
  res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate")
  res.setHeader('Content-Type', 'image/png')
  // write the image to the response with the specified Content-Type
  res.end(data)
}
