// capture-flows.mjs
// Captures ordered, full-page screenshots for every flow listed in flows.json
// into ./evidence/<flow>/NN-<slug>.png at a fixed 1440px width.
//
// flows.json shape:
// {
//   "onboarding": [
//     { "route": "/signup", "slug": "signup" },
//     { "route": "/signup/profile", "slug": "profile" }
//   ],
//   "settings": [ { "route": "/settings", "slug": "settings-home" } ]
// }
//
// Usage: BASE_URL=https://staging.example.com node capture-flows.mjs

import { chromium } from "playwright"
import { mkdir, readFile } from "node:fs/promises"

const baseUrl = process.env.BASE_URL || "http://localhost:3000"
const flows = JSON.parse(await readFile("./flows.json", "utf8"))

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 1200 }, deviceScaleFactor: 1 })

for (const [flow, steps] of Object.entries(flows)) {
  await mkdir(`./evidence/${flow}`, { recursive: true })
  let i = 0
  for (const step of steps) {
    i += 1
    await page.goto(new URL(step.route, baseUrl).toString(), { waitUntil: "networkidle" })
    const name = `${String(i).padStart(2, "0")}-${step.slug}.png`
    await page.screenshot({ path: `./evidence/${flow}/${name}`, fullPage: true })
    console.log(`Captured ${flow}/${name}`)
  }
}

await browser.close()
console.log(`Captured evidence for ${Object.keys(flows).length} flows`)
