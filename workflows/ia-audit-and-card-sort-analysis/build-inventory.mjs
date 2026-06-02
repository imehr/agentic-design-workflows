import { mkdir, writeFile } from "node:fs/promises"

// Builds inventory.csv from a sitemap: url, title, nav_path, depth, excerpt.
// For large sites, prefer a Screaming Frog or CMS export and skip the crawl.
// Edit SITEMAP_URL before running: node build-inventory.mjs

const SITEMAP_URL = "https://www.example.edu/sitemap.xml"
const MAX_PAGES = 5000
const EXCERPT_LENGTH = 400

const csvCell = (value) => '"' + String(value).replaceAll('"', '""') + '"'

const sitemap = await fetch(SITEMAP_URL).then((r) => r.text())
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]).slice(0, MAX_PAGES)

const rows = [["url", "title", "nav_path", "depth", "excerpt"]]
let failed = 0

for (const url of urls) {
  try {
    const html = await fetch(url).then((r) => r.text())
    const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [, ""])[1].trim()
    const text = html
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
    const depth = new URL(url).pathname.split("/").filter(Boolean).length
    // nav_path is left blank here; fill it from your navigation export or let the
    // audit agents reconstruct it from breadcrumbs in the excerpt where present.
    rows.push([url, title, "", String(depth), text.slice(0, EXCERPT_LENGTH)])
  } catch {
    failed++
  }
}

await mkdir("./output", { recursive: true })
await writeFile("./inventory.csv", rows.map((r) => r.map(csvCell).join(",")).join("\n"))
console.log("Inventoried " + (rows.length - 1) + " pages (" + failed + " failed) into ./inventory.csv")
