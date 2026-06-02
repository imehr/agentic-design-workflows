// Token coverage counter for the design ops report.
// Counts design-token references vs hard-coded values across the repos listed in design-ops/repos.json.
// Deliberately simple: a regex counter that is traceable beats a precise-looking number nobody can audit.
// Document its blind spots (computed styles, file coverage vs surface coverage) in the report appendix.

import { readFile, writeFile, mkdir } from "node:fs/promises"
import { globby } from "globby"

const repos = JSON.parse(await readFile("design-ops/repos.json", "utf8"))
const summary = []

for (const repo of repos) {
  const files = await globby(["**/*.{css,scss,tsx,ts}", "!**/node_modules/**"], { cwd: repo.path })
  let tokenRefs = 0
  let hardCoded = 0

  for (const file of files) {
    const text = await readFile(repo.path + "/" + file, "utf8")
    tokenRefs += (text.match(/var\(--(color|space|font|radius)-[a-z0-9-]+\)/g) || []).length
    hardCoded += (text.match(/#[0-9a-fA-F]{3,8}\b|\b\d+px\b/g) || []).length
  }

  summary.push({
    repo: repo.name,
    files: files.length,
    tokenRefs,
    hardCoded,
    coverage: tokenRefs / Math.max(1, tokenRefs + hardCoded),
  })
}

await mkdir("design-ops/output", { recursive: true })
await writeFile("design-ops/output/token-usage.json", JSON.stringify(summary, null, 2))
console.log("Wrote design-ops/output/token-usage.json for " + summary.length + " repos")

/* design-ops/repos.json example:
[
  { "name": "product-web", "path": "../product-web" },
  { "name": "checkout-web", "path": "../checkout-web" },
  { "name": "admin-app", "path": "../admin-app" }
]
*/
