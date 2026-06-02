# Competitive Teardown

A product-walkthrough teardown (not a literature search). Per-competitor agents collect screenshots, flows, pricing, positioning, and onboarding steps into evidence folders; an extraction agent pulls cross-competitor patterns; claims that came from marketing copy get cross-checked against what the walkthrough actually showed. Output: a comparison matrix, a pattern library, and a list of opportunity gaps — every cell traceable to evidence.

Full guide: https://agenticdesign.school/workflows/competitive-teardown
Literature-search counterpart: https://agenticdesign.school/workflows/deep-design-research

## Prerequisites

- Claude Code with dynamic workflows enabled (WebSearch available for pricing news and launch dates).
- Node.js 18+ and Playwright installed for the capture script.
- Trial accounts for anything behind a login — capture those flows yourself first; agents handle public pages.
- A design decision the teardown serves (onboarding redesign, pricing page, positioning, pitch research).

## Files

| File | Purpose |
| --- | --- |
| `workflow.md` | The full prompt to give Claude Code to run the teardown as a dynamic workflow. |
| `dimensions.md` | The evidence each competitor folder must contain — edit per teardown. |
| `comparison-matrix-template.md` | The matrix, pattern library, and gaps templates the run fills in. |
| `agents/competitor-collector.md` | Subagent definition for per-competitor evidence collection. Copy into `.claude/agents/`. |
| `capture-onboarding.mjs` | Playwright script for capturing logged-in flows yourself before the run. |

## How to run

1. Copy `agents/competitor-collector.md` into your project's `.claude/agents/` directory.
2. Edit `dimensions.md` for the decision at hand and create `competitors.json` (name, slug, url, trial notes per competitor).
3. Capture anything behind a login with `capture-onboarding.mjs` into `./evidence/<competitor>/`.
4. Paste the prompt from `workflow.md` into Claude Code (it includes the word "workflow", which triggers a dynamic workflow; `/effort ultracode` also works).
5. Read `unverified-claims.md` and `gaps.md` first, then verify a sample of matrix cells against their evidence files by hand.
6. Optionally save the prompt to `.claude/workflows/teardown.md` so it becomes a reusable `/teardown` command; re-run quarterly and diff against the archived evidence.

## Notes

- Stay within terms of service: trial accounts and public pages only; never misrepresent who you are.
- Keep competitor screenshots as internal evidence; do not republish them.
- Empty cells say "not collected" with a reason — never an estimate.
