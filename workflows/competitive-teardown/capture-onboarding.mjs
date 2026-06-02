// capture-onboarding.mjs
// Use this to capture flows behind a login YOURSELF before the workflow runs.
// It opens a headed browser, lets you sign in and walk the flow, and saves a
// numbered screenshot every time you press Enter in the terminal.
//
// Usage: COMPETITOR=competitor-a START_URL=https://app.competitor-a.com node capture-onboarding.mjs

import { chromium } from "playwright"
import { mkdir } from "node:fs/promises"
import readline from "node:readline/promises"

const competitor = process.env.COMPETITOR || "competitor"
const startUrl = process.env.START_URL || "https://example.com"
const outDir = `./evidence/${competitor}`
await mkdir(outDir, { recursive: true })

const browser = await chromium.launch({ headless: false })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto(startUrl)

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
console.log("Walk the flow in the browser. Press Enter to capture a step; type 'done' to finish.")

let step = 0
// eslint-disable-next-line no-constant-condition
while (true) {
  const answer = await rl.question(`Step ${step + 1} — label (or 'done'): `)
  if (answer.trim().toLowerCase() === "done") break
  step += 1
  const slug = answer.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-") || "step"
  const name = `onboarding-${String(step).padStart(2, "0")}-${slug}.png`
  await page.screenshot({ path: `${outDir}/${name}`, fullPage: true })
  console.log(`Saved ${outDir}/${name}`)
}

rl.close()
await browser.close()
console.log(`Captured ${step} steps for ${competitor}. Add notes to ${outDir}/manifest.md or let the collector agent write it.`)
