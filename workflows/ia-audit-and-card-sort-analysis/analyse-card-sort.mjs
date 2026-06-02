import { mkdir, readFile, writeFile } from "node:fs/promises"

// Computes co-occurrence and group-label frequencies from an OptimalSort-style export.
// Expected CSV columns: participant, card, group_label (header row required).
// Run: node analyse-card-sort.mjs

const INPUT = "./card-sort-export.csv"

const lines = (await readFile(INPUT, "utf8")).split("\n").slice(1).filter(Boolean)
const rows = lines.map((line) => {
  const [participant, card, group] = line.split(",").map((s) => s.trim().replace(/^"|"$/g, ""))
  return { participant, card, group }
})

const participants = [...new Set(rows.map((r) => r.participant))]
const cards = [...new Set(rows.map((r) => r.card))]

// Index placements for fast lookup: participant -> card -> group
const placement = {}
for (const r of rows) {
  placement[r.participant] ??= {}
  placement[r.participant][r.card] = r.group
}

// Co-occurrence: % of participants who placed each pair of cards in the same group.
const matrix = {}
for (const a of cards) {
  matrix[a] = {}
  for (const b of cards) {
    if (a === b) continue
    let together = 0
    let both = 0
    for (const p of participants) {
      const ga = placement[p]?.[a]
      const gb = placement[p]?.[b]
      if (ga && gb) {
        both++
        if (ga === gb) together++
      }
    }
    matrix[a][b] = both === 0 ? null : Math.round((together / both) * 100)
  }
}

// Group label frequency: what participants actually called their groups.
const labels = {}
for (const r of rows) labels[r.group] = (labels[r.group] || 0) + 1

// Per-card best partners, useful for spotting cards with no strong home.
const bestPartners = {}
for (const a of cards) {
  const ranked = Object.entries(matrix[a])
    .filter(([, v]) => v !== null)
    .sort((x, y) => y[1] - x[1])
    .slice(0, 5)
  bestPartners[a] = ranked.map(([card, pct]) => ({ card, pct }))
}

await mkdir("./output", { recursive: true })
await writeFile("./output/co-occurrence.json", JSON.stringify(matrix, null, 2))
await writeFile("./output/group-labels.json", JSON.stringify(labels, null, 2))
await writeFile("./output/best-partners.json", JSON.stringify(bestPartners, null, 2))

console.log(participants.length + " participants, " + cards.length + " cards analyzed")
console.log("Wrote output/co-occurrence.json, output/group-labels.json, output/best-partners.json")
