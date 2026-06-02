# Survey Design and Analysis

A two-stage Claude Code workflow for survey projects:

1. **Design critique loop** — a critique agent hunts for leading questions, double-barreled items, missing answer options, scale problems, and ordering bias in the draft, looping with revisions until only judgment calls remain, finishing with a persona read-aloud pass.
2. **Analysis fan-out** — after the responses are exported, per-segment agents compute distributions and cross-tabs by writing and running a script, an open-text agent codes free-text answers against a codebook, and a challenge agent checks every claim against sample size and selection bias before it reaches the report.

Every number in the output is computed by code the agents run against the export — never estimated by the model.

Full guide: https://agenticdesign.school/workflows/survey-design-and-analysis

## Prerequisites

- Claude Code with dynamic workflows enabled
- Node.js 18+ (for `analyse-survey.mjs`)
- A survey draft and brief (stage one), or a CSV export of responses (stage two)

## Files

| File | Purpose |
| --- | --- |
| `workflow.md` | The full prompts to paste into Claude Code (stage one and stage two) |
| `agents/survey-critic.md` | Subagent definition for the design critique loop |
| `agents/claim-challenger.md` | Subagent definition for the post-analysis challenge pass |
| `survey-critique-checklist.md` | The bias checklist the critic works from — also useful for human review |
| `analyse-survey.mjs` | Distribution and cross-tab script the analysis agents run per segment |
| `example-responses.csv` | A small fake export so you can dry-run the analysis stage |

## How to run

1. Copy the files in `agents/` into your project's `.claude/agents/` folder.
2. For stage one, put your `brief.md` and `draft-v1.md` in a `survey/` folder, then paste the stage-one prompt from `workflow.md` into Claude Code. The word "workflow" in the prompt triggers a dynamic workflow run.
3. For stage two, drop your CSV export into `data/responses.csv`, adjust the segment column names in the prompt, and paste the stage-two prompt.
4. Read `challenges.md` before `findings.md`, and spot-check three numbers by running `analyse-survey.mjs` yourself.
5. Once the prompts are stable, save them to `.claude/workflows/` as `/survey-critique` and `/survey-analyze`.
