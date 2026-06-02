# Brand Campaign Concept Sprint

From one client brief to 3–5 campaign territories developed in parallel by separate concept agents, each committed to a different creative stance. Critique agents then adversarially review every territory against the brief, brand guidelines, audience insight, and legal/claims constraints, and a scoring pass produces a shortlist for the creative director — who decides.

The structural point: critique is baked into the workflow script, not left to chance.

Full guide: https://agenticdesign.school/workflows/brand-campaign-concept-sprint

## Prerequisites

- Claude Code with dynamic workflows enabled (include the word "workflow" in your prompt, or use `/effort ultracode`)
- A working brief written from the client's brief (see `brief-template.md`)
- The brand guidelines as a file the agents can read (`brand-guidelines.md` or similar)
- Approved and forbidden claims written down — this is what makes the legal critique lens useful

## Files

| File | Purpose |
|---|---|
| `workflow.md` | The full prompt to give Claude Code to run the sprint as a dynamic workflow |
| `brief-template.md` | Working brief template, including the claims/legal section and creative stances |
| `scoring-rubric.md` | Weighted critique rubric the scoring pass applies |
| `agents/concept-author.md` | Subagent that develops one territory from the brief and a stance |
| `agents/territory-critic.md` | Subagent that adversarially critiques one territory through one lens |

## How to run

1. Copy `agents/*.md` into your project's `.claude/agents/` directory.
2. Fill in `brief-template.md` as `sprint/campaign-brief.md`, including 3–5 stances and the claims constraints. Put your brand guidelines at `sprint/brand-guidelines.md` and the rubric at `sprint/scoring-rubric.md`.
3. Paste the prompt from `workflow.md` into Claude Code.
4. Read `sprint/shortlist.md`. The creative director picks, blends, or sends a territory back for one revision pass.
5. Once a run works, ask Claude Code to save the orchestration script to `.claude/workflows/` so the next sprint is one command.

## What this does not do

It does not pick a winner, predict in-market performance, or replace legal sign-off. Scores measure fit to the brief and brand as written; testing and the creative director decide the rest.
