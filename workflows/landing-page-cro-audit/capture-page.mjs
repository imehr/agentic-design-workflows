// Capture evidence for the landing page audit.
// Usage: node capture-page.mjs https://example.com/landing
//
// Then, separately:
//   npx @axe-core/cli <url> --save audit/evidence/axe.json
//   npx lighthouse <url> --output=json --output-path=audit/evidence/lighthouse.json
//   Export GA4 page data to audit/evidence/ga4-page.csv (or note that it is missing)

import { chromium } from "playwright"
import { mkdir, writeFile } from "node:fs/promises"

const url = process.argv[2]
if (!url) {
  console.error("Usage: node capture-page.mjs <url>")
  process.exit(1)
}

const outDir = "audit/evidence"
await mkdir(outDir, { recursive: true })

const browser = await chromium.launch()
for (const width of [390, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } })
  await page.goto(url, { waitUntil: "networkidle" })
  await page.screenshot({ path: `${outDir}/page-${width}.png`, fullPage: true })
  if (width === 1440) {
    await writeFile(`${outDir}/dom.html`, await page.content())
  }
  await page.close()
}
await browser.close()

console.log(`Captured screenshots and DOM into ${outDir}`)
