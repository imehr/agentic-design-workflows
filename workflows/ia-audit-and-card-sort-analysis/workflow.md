# IA audit and card sort analysis — workflow prompts

Two prompts, one per loop. Paste each into Claude Code from the project root when you reach that stage.

## Loop one: IA audit

---

Run this as a workflow.

Input: `./inventory.csv` (url, title, nav_path, depth, excerpt) and `./current-nav.md` describing the navigation as users see it.

Stage 1 — Section audit: Split the inventory by top-level section. For each section, launch one agent (use the `ia-section-auditor` agent) that reviews only that section's rows and reports, with URLs cited for every finding: (a) labels that do not describe the page content beneath them, (b) pages deeper than 4 levels and how they are reached, (c) near-duplicate pages covering the same task or topic, (d) orphan pages with no navigation path, (e) inconsistent naming for the same concept across the section.

Stage 2 — Merge: Combine the per-section findings into `ia-audit.md`, grouped by issue type, with counts per section and a table of the 20 highest-depth or most duplicated problem pages. Separate observations (what is true of the inventory) from recommendations (what might change), and keep recommendations to one short closing section.

Rules: every finding cites at least one URL from the inventory; do not assess pages that are not in the inventory; do not propose a new sitemap in this loop.

## Loop two: card sort analysis

Run `node analyse-card-sort.mjs` first so the computed files exist.

---

Run this as a workflow.

Input: `./output/co-occurrence.json`, `./output/group-labels.json`, the raw export at `./card-sort-export.csv`, and `./ia-audit.md` from the audit loop. The sort was an open card sort with the participant count stated in the export.

Stage 1 — Describe: One agent summarizes what the numbers show: card pairs with co-occurrence above 70 percent, cards with no strong partners (highest co-occurrence below 40 percent), participant group labels that recur, and labels applied to very different card sets by different participants (label confusion). Every claim names the figure it rests on.

Stage 2 — Propose: A second agent proposes 2–3 candidate top-level structures. Each candidate lists: its sections with suggested labels drawn from participant language where possible, which co-occurrence clusters support each section, which cards remain ambiguous, and which audit findings it would and would not resolve.

Stage 3 — Caveats: A third agent lists what this data cannot support: claims about findability (that needs a tree test), anything resting on fewer than 5 participants agreeing, and differences between candidates that the data does not distinguish.

Output: `sort-analysis.md`, `candidate-structures.md`, `caveats.md`. Do not recommend a single winner; present the candidates and tradeoffs for the IA designer to evaluate.
