# Design Token Migration

Migrate hard-coded values and legacy tokens to a new semantic token set across hundreds of files. A dynamic workflow script holds the file list and the approved token map, loops one migration agent per file, runs a reviewer agent on every diff, and finishes with a visual recapture so the change can be verified before it merges.

Full guide: https://agenticdesign.school/workflows/design-token-migration

## What it does

- Builds the file list with a glob and tracks progress in `migration/progress.json`, so the run is resumable.
- Runs as a Claude Code dynamic workflow: per-file migration agents (up to 16 concurrent), each restricted to the replacements in `tokens-map.json`.
- Runs a `migration-reviewer` subagent on every diff; rejected diffs get one retry, then go to a flags file for a human.
- Collects unmapped values and `ask` cases into `migration/flags.md` instead of guessing.
- Recaptures key routes with Playwright at the end and compares against before-screenshots.

## Prerequisites

- Claude Code with dynamic workflows enabled.
- A finished, approved semantic token set (Style Dictionary build or Tailwind theme).
- A token map agreed with the design team (see `tokens-map.example.json`).
- Node.js 20+ and Playwright for the recapture: `npm i -D playwright && npx playwright install chromium`.
- A branch. Never run this against main.

## Files

| File | Purpose |
|---|---|
| `workflow.md` | The prompt to give Claude Code to run the migration as a dynamic workflow |
| `tokens-map.example.json` | Example token map: legacy value → new semantic token, with notes and `ask` cases |
| `agents/migration-reviewer.md` | Subagent definition for the per-diff reviewer (copy into your repo's `.claude/agents/`) |
| `visual-recapture.mjs` | Playwright script that captures `before` or `after` screenshot sets for comparison |

## How to run

1. Hold a mapping workshop and write your real `migration/tokens-map.json`. Mark genuinely ambiguous values as `"ask"`.
2. On main, capture the baseline: `node visual-recapture.mjs before`.
3. Create a branch and copy `agents/migration-reviewer.md` into `.claude/agents/`.
4. Open Claude Code and paste the prompt from `workflow.md` (it includes the word "workflow", which triggers the dynamic workflow path; `/effort ultracode` also works).
5. Spot-check early diffs for restraint: only mapped values should change.
6. When the run finishes, capture `node visual-recapture.mjs after`, review the comparison and `migration/flags.md`, and resolve flagged cases with the design team.
7. Open the pull request with the map, flags, and comparison attached. Save the orchestration to `.claude/workflows/` for the next migration.
