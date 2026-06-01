# Multi-Direction Concept Exploration

Draft three to five genuinely distinct design directions in parallel from one brief, then run an adversarial critique stage where agents review each other's directions against an explicit rubric. A human picks. The critique is baked into the orchestration script, not hoped for.

Full guide: https://agenticdesign.school/workflows/multi-direction-concept-exploration

## What it does

- Fans out one `direction-author` agent per design stance; each gets the same brief, none sees the others.
- Cross-assigns `direction-critic` agents so every direction is reviewed only by non-authors, arguing against it.
- Scores every direction against `scoring-rubric.md` with evidence required for each score.
- Produces `exploration/comparison.md`: scores, the strongest objection per direction, blend candidates, and open questions — without picking a winner.
- Runs as a Claude Code dynamic workflow, so drafts and critiques stay out of the main conversation.

## Prerequisites

- Claude Code with dynamic workflows enabled.
- A written brief: user, job, constraints, brand rules, anti-patterns (see `brief-template.md`).
- 3–5 named design stances a reasonable designer could defend.
- A design lead with 30–60 minutes to read the comparison report and decide.

## Files

| File | Purpose |
|---|---|
| `workflow.md` | The prompt to give Claude Code to run the exploration as a dynamic workflow |
| `brief-template.md` | Brief structure including the stance list |
| `scoring-rubric.md` | Weighted criteria the critique agents must score against, with evidence |
| `agents/direction-author.md` | Subagent definition for drafting one direction (copy into your project's `.claude/agents/`) |
| `agents/direction-critic.md` | Subagent definition for adversarial critique (copy into your project's `.claude/agents/`) |

## How to run

1. Copy the two agent definitions from `agents/` into your project's `.claude/agents/` folder.
2. Fill in `brief-template.md` as `exploration/brief.md`, including 3–5 stances.
3. Adjust `scoring-rubric.md` weights to match what this decision actually depends on.
4. Open Claude Code and paste the prompt from `workflow.md` (the word "workflow" triggers the dynamic workflow path).
5. Read `exploration/comparison.md`, decide, and record the decision and the rejected directions next to the packages.
6. Save the working orchestration to `.claude/workflows/` to reuse it as a slash command for future explorations.
