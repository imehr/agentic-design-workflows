// Optional helper: build the component inventory as JSON before running the workflow.
// Usage: node scripts/list-components.mjs packages/ui/src/components > docs/component-inventory.json

import { readdir, stat } from "node:fs/promises"
import { join, basename } from "node:path"

const root = process.argv[2] || "packages/ui/src/components"

async function findComponents(dir) {
  const entries = await readdir(dir)
  const components = []

  for (const entry of entries) {
    const fullPath = join(dir, entry)
    const info = await stat(fullPath)

    if (info.isDirectory()) {
      components.push(...(await findComponents(fullPath)))
      continue
    }

    // Treat PascalCase .tsx/.jsx files as component entry points; skip tests, stories, and types.
    const isComponentFile =
      /^[A-Z][A-Za-z0-9]*\.(tsx|jsx)$/.test(entry) &&
      !entry.includes(".test.") &&
      !entry.includes(".stories.") &&
      !entry.includes(".types.")

    if (isComponentFile) {
      const name = basename(entry).replace(/\.(tsx|jsx)$/, "")
      components.push({
        name,
        slug: name
          .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
          .toLowerCase(),
        path: fullPath,
      })
    }
  }

  return components
}

const inventory = await findComponents(root)
process.stdout.write(JSON.stringify(inventory, null, 2) + "\n")
console.error(`Found ${inventory.length} components under ${root}`)
