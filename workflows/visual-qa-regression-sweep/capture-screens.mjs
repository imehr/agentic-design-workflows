// Visual QA Regression Sweep: capture script
// Usage:
//   node capture-screens.mjs baseline   # capture the approved release
//   node capture-screens.mjs current    # capture the branch under review
// Set SWEEP_BASE_URL to point at a deployed environment instead of localhost.

import { chromium } from "playwright"
import { readFile, mkdir } from "node:fs/promises"

const manifest = JSON.parse(await readFile("sweep-manifest.json", "utf8"))
const target = process.argv[2] ?? "current" // "baseline" or "current"
const baseUrl = process.env.SWEEP_BASE_URL ?? "http://localhost:3000"

await mkdir(`sweeps/${target}`, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage()

for (const entry of manifest.pages) {
  for (const viewport of manifest.viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await page.goto(baseUrl + entry.route, { waitUntil: "networkidle" })
    await page.screenshot({
      path: `sweeps/${target}/${entry.id}--${viewport.name}.png`,
      fullPage: true,
    })
    console.log(`captured ${target}: ${entry.id} @ ${viewport.name}`)
  }
}

await browser.close()
