import { mkdir, readdir, readFile, writeFile } from "node:fs/promises"

// Anonymise interview transcripts BEFORE any agent sees them.
//
// Usage:
//   1. Put raw transcripts in ./raw/ as .txt files.
//   2. Create participant-names.json mapping real names to IDs:
//        { "Sarah Chen": "P01", "Miguel Torres": "P02" }
//      Keep this file OUT of the agent workspace (e.g. outside the repo, or gitignored).
//   3. node anonymise-transcripts.mjs
//   4. Anonymised copies are written to ./transcripts/ — only this folder goes to the agents.

const replacements = [
  { pattern: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, token: "[EMAIL]" },
  { pattern: /\b(\+?\d[\d\s().-]{7,}\d)\b/g, token: "[PHONE]" },
]

const names = JSON.parse(await readFile("./participant-names.json", "utf8"))

await mkdir("./transcripts", { recursive: true })

const files = (await readdir("./raw")).filter((f) => f.endsWith(".txt"))

for (const file of files) {
  let text = await readFile(`./raw/${file}`, "utf8")

  // Replace full names first, then bare first names.
  for (const [name, id] of Object.entries(names)) {
    text = text.replaceAll(name, id)
    const firstName = name.split(" ")[0]
    if (firstName.length > 2) {
      text = text.replaceAll(firstName, id)
    }
  }

  for (const { pattern, token } of replacements) {
    text = text.replace(pattern, token)
  }

  await writeFile(`./transcripts/${file}`, text)
}

console.log(`Anonymised ${files.length} transcripts into ./transcripts`)
console.log("Reminder: spot-read at least one output file for missed names, employers, or identifying details before running the workflow.")
