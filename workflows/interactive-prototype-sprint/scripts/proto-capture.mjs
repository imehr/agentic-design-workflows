// Starter capture script for the prototype build loop and the pre-session QA pass.
// Usage: node scripts/proto-capture.mjs   (or wire it to: npm run proto:capture)
// Adjust the routes to your prototype's base flow and variants, and the widths
// to the device the testing session will actually use.

import { chromium } from "playwright"
import { mkdir } from "node:fs/promises"
import { join } from "node:path"

const baseUrl = process.env.PROTO_BASE_URL || "http://localhost:5173"
const outputDir = "prototypes/captures"

const routes = [
  ["/", "index"],
  ["/base/step-1", "base-step-1"],
  ["/base/step-2", "base-step-2"],
  ["/base/confirm", "base-confirm"],
  // ["/variants/breakdown-on-demand/step-2", "variant-b-step-2"],
]

const widths = [
  { name: "session", width: 1280, height: 900 },
  { name: "phone", width: 390, height: 844 },
]

await mkdir(outputDir, { recursive: true })
const browser = await chromium.launch()

for (const viewport of widths) {
  const page = await browser.newPage({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
  })

  for (const [path, slug] of routes) {
    await page.goto(new URL(path, baseUrl).toString(), { waitUntil: "networkidle" })
    const file = join(outputDir, `${slug}-${viewport.name}-${viewport.width}.png`)
    await page.screenshot({ path: file, fullPage: true })
    console.log(`captured ${file}`)
  }

  await page.close()
}

await browser.close()
console.log(`Done. Captures in ${outputDir}`)
