# Accessibility Sweep

Codebase-wide accessibility audit against WCAG 2.2 AA: static checks (axe-core + Playwright) give the evidence, per-route agents add judgment about names, focus order, and keyboard paths, findings are ranked by severity, and fixes are applied in gated passes that are re-verified.

Full guide: https://agenticdesign.school/workflows/accessibility-sweep

## What it does

- Runs `a11y-scan.mjs` to collect axe-core violations and a recorded keyboard focus order per route.
- Runs as a Claude Code dynamic workflow: one `a11y-reviewer` subagent per route, up to 16 concurrently, results merged in the orchestration script.
- Combines tool-proven findings with agent judgment, clearly separated, each with WCAG criterion, severity, evidence, and a concrete fix.
- Holds a severity gate: nothing below the gate is fixed until everything above it is fixed and re-verified by re-running the scan.

## Prerequisites

- Claude Code with dynamic workflows enabled.
- Node.js 20+, Playwright, and axe-core: `npm i -D playwright @axe-core/playwright && npx playwright install chromium`.
- The app running locally (or set `A11Y_BASE_URL` to a deployed environment).
- A list of routes in scope, starting with the flows where failure is most expensive.

## Files

| File | Purpose |
|---|---|
| `workflow.md` | The prompt to give Claude Code to run the sweep as a dynamic workflow |
| `a11y-scan.mjs` | Playwright + axe-core script: violations and keyboard focus order per route |
| `agents/a11y-reviewer.md` | Subagent definition for the per-route reviewer (copy into your repo's `.claude/agents/`) |
| `finding-format.md` | Format every finding and the merged report should follow |

## How to run

1. Edit the `routes` list in `a11y-scan.mjs` and run `node a11y-scan.mjs` to produce `a11y/scan-results.json`.
2. Copy `agents/a11y-reviewer.md` into your repo's `.claude/agents/` folder.
3. Open Claude Code in the repo and paste the prompt from `workflow.md` (it includes the word "workflow", which triggers the dynamic workflow path; `/effort ultracode` also works).
4. Review `a11y/findings.md` at the severity gate: confirm P0s, record approved exceptions, approve the first fix pass.
5. Let the agent fix one severity tier at a time; re-run `node a11y-scan.mjs` after every pass.
6. Save the working orchestration to `.claude/workflows/` and rerun the sweep before each release.
