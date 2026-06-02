#!/usr/bin/env node
// analyse-survey.mjs
// Distributions and cross-tabs for a survey CSV export, printed as markdown.
// Every number in the report should come from this script (or one like it),
// never from the model estimating.
//
// Usage:
//   node analyse-survey.mjs <export.csv>
//   node analyse-survey.mjs <export.csv> --segment plan_tier=pro
//   node analyse-survey.mjs <export.csv> --crosstab q4_priority plan_tier
//
// Assumptions: first row is headers; closed-question columns contain the
// selected option as text; open-text columns are ignored here (they are
// coded against the codebook by a separate agent).

import { readFile } from "node:fs/promises"

const args = process.argv.slice(2)
const csvPath = args[0]
if (!csvPath) {
  console.error("Usage: node analyse-survey.mjs <export.csv> [--segment col=value] [--crosstab colA colB]")
  process.exit(1)
}

function parseCsv(text) {
  const lines = text.replace(/\r\n/g, "\n").split("\n").filter((l) => l.trim().length > 0)
  const headers = splitCsvLine(lines[0])
  return lines.slice(1).map((line) => {
    const cells = splitCsvLine(line)
    return Object.fromEntries(headers.map((h, i) => [h, cells[i] ?? ""]))
  })
}

function splitCsvLine(line) {
  const out = []
  let current = ""
  let inQuotes = false
  for (const char of line) {
    if (char === '"') inQuotes = !inQuotes
    else if (char === "," && !inQuotes) {
      out.push(current.trim())
      current = ""
    } else current += char
  }
  out.push(current.trim())
  return out
}

const rows = parseCsv(await readFile(csvPath, "utf8"))

let subset = rows
let segmentLabel = "all respondents"
const segmentArgIndex = args.indexOf("--segment")
if (segmentArgIndex !== -1) {
  const [col, value] = args[segmentArgIndex + 1].split("=")
  subset = rows.filter((r) => r[col] === value)
  segmentLabel = col + " = " + value
}

const headers = Object.keys(rows[0] ?? {})
const openTextColumns = headers.filter((h) => h.endsWith("_text"))
const idColumns = ["response_id", "respondent_id", "id", "submitted_at"]
const closedColumns = headers.filter((h) => !openTextColumns.includes(h) && !idColumns.includes(h))

console.log("# Survey analysis — " + segmentLabel)
console.log("")
console.log("Total rows in export: " + rows.length)
console.log("Rows in this segment: " + subset.length)

const crosstabIndex = args.indexOf("--crosstab")
if (crosstabIndex !== -1) {
  const colA = args[crosstabIndex + 1]
  const colB = args[crosstabIndex + 2]
  printCrosstab(subset, colA, colB)
} else {
  for (const column of closedColumns) {
    printDistribution(subset, column)
  }
}

function printDistribution(data, column) {
  const answered = data.filter((r) => r[column] !== "")
  const counts = new Map()
  for (const row of answered) {
    counts.set(row[column], (counts.get(row[column]) ?? 0) + 1)
  }
  console.log("")
  console.log("## " + column + "  (base n=" + answered.length + ")")
  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1])
  for (const [option, count] of sorted) {
    const pct = answered.length ? ((count / answered.length) * 100).toFixed(1) : "0.0"
    console.log("- " + option + ": " + count + " (" + pct + "%)")
  }
}

function printCrosstab(data, colA, colB) {
  const valuesB = [...new Set(data.map((r) => r[colB]).filter(Boolean))].sort()
  const valuesA = [...new Set(data.map((r) => r[colA]).filter(Boolean))].sort()
  console.log("")
  console.log("## Cross-tab: " + colA + " x " + colB)
  console.log("")
  console.log("| " + colA + " | " + valuesB.map((v) => v + " (n)").join(" | ") + " |")
  console.log("|" + "---|".repeat(valuesB.length + 1))
  for (const a of valuesA) {
    const cells = valuesB.map((b) => {
      const base = data.filter((r) => r[colB] === b && r[colA] !== "").length
      const count = data.filter((r) => r[colB] === b && r[colA] === a).length
      const pct = base ? ((count / base) * 100).toFixed(1) : "0.0"
      return pct + "% (" + count + "/" + base + ")"
    })
    console.log("| " + a + " | " + cells.join(" | ") + " |")
  }
}
