// Screenshot-to-Implementation Parity: capture the built route
// Usage: node capture-build.mjs /pricing
// Set PARITY_BASE_URL to point at a deployed environment instead of localhost.

import { chromium } from "playwright"
import { mkdir } from "node:fs/promises"

const route = process.argv[2] ?? "/pricing"
const baseUrl = process.env.PARITY_BASE_URL ?? "http://localhost:3000"

const viewports = [
  { name: "reference-1440", width: 1440, height: 1000 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "mobile-390", width: 390, height: 900 },
]

await mkdir("parity/build", { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage()

for (const viewport of viewports) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height })
  await page.goto(baseUrl + route, { waitUntil: "networkidle" })
  await page.screenshot({ path: `parity/build/${viewport.name}.png`, fullPage: true })
  console.log(`captured ${route} @ ${viewport.name}`)
}

await browser.close()
