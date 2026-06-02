# IA Audit and Card Sort Analysis

Two connected loops for information architecture work. Loop one is an audit: build a content inventory (crawl, sitemap, or CMS export), then fan out one agent per section to assess labels, depth, duplication, orphan pages, and label-content mismatches, with every finding citing URLs. Loop two is analysis: a script computes co-occurrence, agreement, and label confusion from a card sort or tree test export, then agents describe the numbers and propose 2–3 candidate structures for a human IA designer to evaluate. Agents compute and describe; humans judge significance and tradeoffs.

Full guide: https://agenticdesign.school/workflows/ia-audit-and-card-sort-analysis

## What it produces

- `ia-audit.md` — merged audit findings grouped by issue type, every finding citing URLs
- `output/co-occurrence.json`, `output/group-labels.json` — computed card sort numbers
- `sort-analysis.md`, `candidate-structures.md`, `caveats.md` — analysis, candidates, and what the data cannot support

## Prerequisites

- Claude Code with dynamic workflows enabled
- Node.js 18+ for the inventory and analysis scripts
- A URL list or CMS export for the audit loop; an OptimalSort-style CSV export for the analysis loop
- 2–3 hours per site or app area, excluding the time the human card sort or tree test itself takes

## Files

| File | Purpose |
| --- | --- |
| `workflow.md` | The full prompts for both loops, to give Claude Code as dynamic workflows |
| `build-inventory.mjs` | Builds `inventory.csv` from a sitemap (prefer a Screaming Frog/CMS export for large sites) |
| `analyse-card-sort.mjs` | Computes co-occurrence and group-label frequencies from a card sort CSV export |
| `agents/ia-section-auditor.md` | Subagent definition for auditing one section of the inventory |

## How to run

1. Build or import the inventory: `node build-inventory.mjs` (edit the sitemap URL first), or export from your crawler/CMS into `inventory.csv` with columns `url, title, nav_path, depth, excerpt`.
2. Copy `agents/ia-section-auditor.md` into your project's `.claude/agents/` directory.
3. Open Claude Code and paste the audit prompt from `workflow.md` (the word "workflow" triggers a dynamic workflow run; `/effort ultracode` also works).
4. Run your card sort or tree test with real participants and place the export at `card-sort-export.csv`.
5. Run `node analyse-card-sort.mjs`, then paste the analysis prompt from `workflow.md`.
6. Evaluate the candidate structures yourself; tree test close calls instead of arguing.

To reuse, save the prompts to `.claude/workflows/ia-audit.md` (project) or `~/.claude/workflows/` (personal) and run them as `/ia-audit`.
