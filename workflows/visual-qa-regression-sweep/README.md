# Visual QA Regression Sweep

Capture every key page, state, and viewport of a product, fan out one compare agent per page, merge the findings into a ranked release-readiness report, and fix in passes until a recapture comes back clean.

Full guide: https://agenticdesign.school/workflows/visual-qa-regression-sweep

## What it does

- Walks a `sweep-manifest.json` of pages, states, intents, and viewports.
- Captures baseline and current screenshots with Playwright.
- Runs as a Claude Code dynamic workflow: one `visual-compare` subagent per page, up to 16 concurrently.
- Merges findings, ranks them P0–P3, and groups repeated findings by likely shared cause.
- Drives fix passes and partial recaptures until no P0 or P1 remains.

## Prerequisites

- Claude Code with dynamic workflows enabled.
- Node.js 20+ and Playwright (`npm i -D playwright && npx playwright install chromium`).
- The app running locally (or a deployed URL set via `SWEEP_BASE_URL`).
- A baseline: screenshots of the last approved release, or design exports named to match the manifest.

## Files

| File | Purpose |
|---|---|
| `workflow.md` | The prompt to give Claude Code to run the sweep as a dynamic workflow |
| `sweep-manifest.json` | Pages, states, intents, and viewports to capture |
| `capture-screens.mjs` | Playwright script that captures `baseline` or `current` screenshot sets |
| `agents/visual-compare.md` | Subagent definition for the per-page compare agent (copy into your project's `.claude/agents/`) |

## How to run

1. Copy `agents/visual-compare.md` into your project's `.claude/agents/` folder.
2. Edit `sweep-manifest.json` to list your pages, states, and intents.
3. Capture a baseline from the approved release: `node capture-screens.mjs baseline`
4. Check out the branch under review and capture: `node capture-screens.mjs current`
5. Open Claude Code in the repo and paste the prompt from `workflow.md` (it includes the word "workflow", which triggers the dynamic workflow path).
6. Review `sweeps/report.md`, approve the fix plan, and let the agent fix in passes.
7. Recapture affected pages between passes; finish with a full recapture and re-run.
8. Save the working orchestration to `.claude/workflows/` to reuse it as a slash command before every release.
