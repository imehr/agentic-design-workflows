# Design Ops Reporting

A recurring Claude Code workflow that assembles the design ops evidence teams currently gather by hand — design system adoption, QA debt trends, design review throughput, and contribution backlog — into one report where every number links to how it was computed.

Full guide: https://agenticdesign.school/workflows/design-ops-reporting

## What it does

- Counts token and component usage across product repos with scripts (not estimates)
- Trends accessibility and visual QA debt from previous workflow runs
- Summarizes design-review PR/issue throughput from GitHub CLI exports, as team-level distributions
- Ages the design system contribution backlog
- Has a synthesis agent write the narrative, with a footnote per figure pointing at the computation

The report informs prioritization conversations. It is not a designer-productivity surveillance tool: no per-person metrics, no rankings. The synthesis agent is instructed to refuse them.

## Prerequisites

- Claude Code with dynamic workflows enabled
- Node.js 20+ (for the counting script)
- GitHub CLI (`gh`) authenticated against your org
- Outputs of previous accessibility-sweep / visual-qa runs, if you want QA debt trends

## Files

| File | Purpose |
| --- | --- |
| `workflow.md` | The full prompt to give Claude Code to run this as a dynamic workflow |
| `agents/design-ops-synthesizer.md` | Subagent definition for the report writer — copy into `.claude/agents/` |
| `scripts/count-token-usage.mjs` | Token coverage counter that writes `design-ops/output/token-usage.json` |
| `templates/cycle-template.md` | The report structure the synthesis agent fills in (copy or point to it as `design-ops/report-template.md` in your repo) |

## How to run

1. Copy `agents/design-ops-synthesizer.md` into your repo's `.claude/agents/` folder.
2. Create `design-ops/repos.json` listing the repositories to count, then run `node scripts/count-token-usage.mjs`.
3. Export PR/issue data with the `gh` commands shown in `workflow.md`.
4. Paste the prompt from `workflow.md` into Claude Code. The word "workflow" in the prompt triggers a dynamic workflow run.
5. Review the draft report, spot-check the numbers, rewrite the recommendations in your own voice, and sign it.
6. Save the working run to `.claude/workflows/` as `/design-ops-report` and rerun it next cycle.
