# Design QA on Every PR

A saved Claude Code workflow command that runs design QA on every branch that touches UI: it builds the preview, captures only the changed screens, diffs them against main, checks token usage and accessibility on the changed components, and produces a findings comment ready to paste into the pull request.

Full guide: https://agenticdesign.school/workflows/design-qa-on-every-pr

## What it does

1. Maps the branch diff to changed routes using `qa/routes-map.json`.
2. Captures the branch and main at 390, 768, and 1440 px for each changed screen.
3. Diffs the captures and reports observable differences with evidence paths.
4. Reviews changed components for hardcoded values that should be design tokens.
5. Runs axe-core and a keyboard pass on the changed routes.
6. Writes `qa/pr-findings.md`, ranked P0–P3, ready for `gh pr comment`.

## Prerequisites

- Claude Code installed and authenticated.
- A runnable preview of your app (dev server or build command) for the branch and for main.
- Playwright available in the repository (`npm i -D playwright @axe-core/playwright`).
- GitHub CLI (`gh`) if you want to post the findings comment automatically.
- A `qa/routes-map.json` mapping components to routes (see `examples/routes-map.json`).

## Files

| File | Purpose |
| --- | --- |
| `workflow.md` | The full prompt to run this as a Claude Code dynamic workflow |
| `agents/token-reviewer.md` | Subagent definition for the token discipline review |
| `agents/screen-diff-reviewer.md` | Subagent definition for the per-screen capture-and-diff review |
| `examples/routes-map.json` | Example routes map you adapt to your repository |
| `scripts/capture-changed-screens.mjs` | Optional Playwright capture script the workflow can call |

## How to run with Claude Code

1. Copy `agents/*.md` into `.claude/agents/` in your repository (dot-prefixed folders are not included in this repo, so copy them yourself).
2. Adapt `examples/routes-map.json` and save it as `qa/routes-map.json`.
3. Check out the branch you want to review and paste the contents of `workflow.md` into Claude Code. The word "workflow" in the prompt makes Claude run it as a dynamic workflow (or use `/effort ultracode`).
4. After a successful run, open `/workflows`, select the run, and press `s` to save it into `.claude/workflows/` as `/design-qa`. Commit the saved workflow so the whole team can run it.
5. Post the findings: `gh pr comment --body-file qa/pr-findings.md`.
