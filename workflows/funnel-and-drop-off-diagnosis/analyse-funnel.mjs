#!/usr/bin/env node
// analyse-funnel.mjs
// Step conversion and segment cuts for a flat funnel export, printed as markdown.
// Every number in the diagnosis should come from this script (or one like it),
// never from the model estimating.
//
// Expects one row per user/session. Step columns contain "1" (or a positive
// number) when the user reached the step, empty or "0" otherwise.
//
// Usage:
//   node analyse-funnel.mjs export.csv --steps signup,verify_email,create_workspace,invite,first_action --segment device
//   node analyse-funnel.mjs export.csv --steps view_cart,address,payment,confirm --segment device

import { readFile } from "node:fs/promises"

const args = process.argv.slice(2)
const csvPath = args[0]

function getArg(flag) {
  const index = args.indexOf(flag)
  return index === -1 ? null : args[index + 1]
}

const stepsArg = getArg("--steps")
const segmentCol = getArg("--segment")

if (!csvPath || !stepsArg) {
  console.error("Usage: node analyse-funnel.mjs <export.csv> --steps step1,step2,... [--segment column]")
  process.exit(1)
}

const steps = stepsArg.split(",").map((s) => s.trim())

function parseCsv(text) {
  const lines = text.replace(/\r\n/g, "\n").split("\n").filter((l) => l.trim().length > 0)
  const headers = lines[0].split(",").map((h) => h.trim())
  return lines.slice(1).map((line) => {
    const cells = line.split(",").map((c) => c.trim())
    return Object.fromEntries(headers.map((h, i) => [h, cells[i] ?? ""]))
  })
}

const rows = parseCsv(await readFile(csvPath, "utf8"))

function reached(row, step) {
  const value = row[step]
  return value === "1" || (value !== "" && Number(value) > 0)
}

function funnelFor(subset, label) {
  console.log("")
  console.log("## " + label + "  (entered: " + subset.length + ")")
  console.log("")
  console.log("| Step | Reached | Step conversion | Overall conversion |")
  console.log("|---|---|---|---|")
  let previous = subset.length
  for (const step of steps) {
    const count = subset.filter((r) => reached(r, step)).length
    const stepRate = previous ? ((count / previous) * 100).toFixed(1) : "0.0"
    const overall = subset.length ? ((count / subset.length) * 100).toFixed(1) : "0.0"
    console.log("| " + step + " | " + count + " | " + stepRate + "% | " + overall + "% |")
    previous = count
  }
}

console.log("# Funnel analysis — " + csvPath)
console.log("")
console.log("Steps: " + steps.join(" → "))
console.log("Rows: " + rows.length)

funnelFor(rows, "All users")

if (segmentCol) {
  const values = [...new Set(rows.map((r) => r[segmentCol]).filter(Boolean))].sort()
  for (const value of values) {
    funnelFor(rows.filter((r) => r[segmentCol] === value), segmentCol + " = " + value)
  }

  console.log("")
  console.log("## Largest step-level gaps by " + segmentCol)
  console.log("")
  console.log("Use this table to decide which steps get walkthrough agents.")
  console.log("")
  console.log("| Step | " + values.map((v) => v + " step conv.").join(" | ") + " | Max gap (pts) |")
  console.log("|---|" + "---|".repeat(values.length + 1))
  for (let i = 0; i < steps.length; i++) {
    const rates = values.map((value) => {
      const subset = rows.filter((r) => r[segmentCol] === value)
      const previousCount = i === 0 ? subset.length : subset.filter((r) => reached(r, steps[i - 1])).length
      const count = subset.filter((r) => reached(r, steps[i])).length
      return previousCount ? (count / previousCount) * 100 : 0
    })
    const gap = (Math.max(...rates) - Math.min(...rates)).toFixed(1)
    console.log("| " + steps[i] + " | " + rates.map((r) => r.toFixed(1) + "%").join(" | ") + " | " + gap + " |")
  }
}
