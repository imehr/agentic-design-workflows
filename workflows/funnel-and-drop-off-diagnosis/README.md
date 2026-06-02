# Funnel and Drop-off Diagnosis

A dynamic Claude Code workflow that connects funnel numbers to the screens behind them:

1. **Analytics stage** — agents compute step conversion and segment differences by running `analyse-funnel.mjs` against a flat export (GA4, Amplitude, Mixpanel, or your warehouse). Every number comes from the script, never from the model estimating.
2. **Walkthrough stage** — for the two or three worst steps, walkthrough agents drive the actual product in a browser (Playwright / Playwright MCP) at desktop and phone widths, capturing screenshots, verbatim copy, error states, and load behavior.
3. **Merge stage** — the evidence streams combine into ranked hypotheses for why users leave, each citing at least one number and one screen-level observation, and each tagged with how to verify it (session replays, usability test, experiment). The workflow never claims causation from correlational data.

Full guide: https://agenticdesign.school/workflows/funnel-and-drop-off-diagnosis

## Prerequisites

- Claude Code with dynamic workflows enabled
- Node.js 18+ (for `analyse-funnel.mjs`)
- A flat funnel export (one row per user/session, one column per step, plus segment columns)
- A safe test environment the walkthrough agents may use — never production accounts with real user data
- Playwright or a Playwright MCP connection for the walkthrough agents

## Files

| File | Purpose |
| --- | --- |
| `workflow.md` | The full prompt to paste into Claude Code |
| `agents/funnel-walkthrough.md` | Subagent definition for the screen-level walkthroughs |
| `analyse-funnel.mjs` | Step conversion and segment cut script the analytics stage runs |
| `example-funnel-export.csv` | A small fake export so you can dry-run the analytics stage |

## How to run

1. Copy `agents/funnel-walkthrough.md` into your project's `.claude/agents/` folder.
2. Write `brief.md`: step definitions, time window, segments, and the test environment URL and credentials.
3. Drop your export into `data/funnel-export.csv` and adjust the step and segment column names in the prompt.
4. Paste the prompt from `workflow.md` into Claude Code. The word "workflow" triggers a dynamic workflow run; the analytics output decides which steps get walkthroughs.
5. Read `hypotheses.md` with the funnel tables beside it, walk the worst step yourself once, then assign each hypothesis to session replays, a usability test, or an experiment.
6. Once stable, save the prompt to `.claude/workflows/` as `/diagnose-funnel` and rerun it each quarter against the same step definitions.
