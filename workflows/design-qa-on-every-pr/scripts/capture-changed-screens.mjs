// Optional capture script the workflow can call instead of driving the browser ad hoc.
// Usage: node scripts/capture-changed-screens.mjs <baseUrl> <outDir> <route> [route...]
// Example: node scripts/capture-changed-screens.mjs http://localhost:3000 qa/captures/branch /checkout/payment /dashboard

import { chromium } from "playwright"
import { mkdir } from "node:fs/promises"
import { join } from "node:path"

const [baseUrl, outDir, ...routes] = process.argv.slice(2)

if (!baseUrl || !outDir || routes.length === 0) {
  console.error("Usage: node capture-changed-screens.mjs <baseUrl> <outDir> <route> [route...]")
  process.exit(1)
}

const widths = [390, 768, 1440]

await mkdir(outDir, { recursive: true })
const browser = await chromium.launch()

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 1200 }, deviceScaleFactor: 1 })
  await page.emulateMedia({ reducedMotion: "reduce" })

  for (const route of routes) {
    const slug = route.replaceAll("/", "-").replace(/^-/, "") || "home"
    await page.goto(new URL(route, baseUrl).toString(), { waitUntil: "networkidle" })
    await page.screenshot({ path: join(outDir, `${slug}-${width}.png`), fullPage: true })
    console.log(`Captured ${route} at ${width}px`)
  }

  await page.close()
}

await browser.close()
