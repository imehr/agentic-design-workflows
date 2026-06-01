import { chromium } from "playwright"
import { mkdir } from "node:fs/promises"

// Usage: node visual-recapture.mjs before|after
const set = process.argv[2]
if (set !== "before" && set !== "after") {
  console.error("Usage: node visual-recapture.mjs before|after")
  process.exit(1)
}

const baseUrl = process.env.MIGRATION_BASE_URL || "http://localhost:3000"

// Key routes to verify the migration did not change the UI where it was not supposed to.
const routes = ["/", "/dashboard", "/reports", "/settings", "/checkout", "/checkout/payment"]

const viewports = [
  { name: "mobile", width: 390, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
]

const browser = await chromium.launch()
const page = await browser.newPage()

for (const route of routes) {
  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await page.goto(baseUrl + route, { waitUntil: "networkidle" })

    const safeRoute = route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "__")
    const dir = "migration/captures/" + set
    await mkdir(dir, { recursive: true })
    await page.screenshot({
      path: dir + "/" + safeRoute + "--" + viewport.name + ".png",
      fullPage: true,
    })
    console.log(set + ": " + route + " @ " + viewport.name)
  }
}

await browser.close()
console.log("Captured " + routes.length * viewports.length + " screenshots into migration/captures/" + set)
