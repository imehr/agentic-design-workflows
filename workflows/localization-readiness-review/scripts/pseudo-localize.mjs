// Pseudo-localization generator.
// Replaces every string in the source catalog with a longer, accented, bracketed version so
// expansion and clipping problems are visible without waiting for real translations.
// Strings that still read as plain English in the running app never went through the catalog.

import { readFile, writeFile } from "node:fs/promises"

const map = { a: "å", e: "é", i: "ï", o: "ö", u: "û", n: "ñ", s: "š", c: "ç" }
const PAD = 0.35 // approximate German/Finnish expansion

function pseudo(value) {
  // Preserve ICU/i18n placeholders like {count} or {name, plural, ...}
  const parts = value.split(/(\{[^}]*\})/g)
  const transformed = parts
    .map((part) => (part.startsWith("{") ? part : part.replace(/[a-z]/g, (ch) => map[ch] || ch)))
    .join("")
  const padding = "~".repeat(Math.ceil(value.length * PAD))
  return "[!! " + transformed + padding + " !!]"
}

const source = process.argv[2] || "locales/en.json"
const target = process.argv[3] || "locales/en-XA.json"

const catalog = JSON.parse(await readFile(source, "utf8"))
const out = Object.fromEntries(Object.entries(catalog).map(([key, value]) => [key, typeof value === "string" ? pseudo(value) : value]))

await writeFile(target, JSON.stringify(out, null, 2))
console.log("Wrote " + target + " with " + Object.keys(out).length + " pseudo-localized strings")
