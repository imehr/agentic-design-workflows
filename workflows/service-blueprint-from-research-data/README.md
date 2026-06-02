# Service Blueprint from Research Data

Assemble a draft service blueprint — customer actions, frontstage, backstage, support processes, and physical/digital evidence — from material the organization already has: research repository exports, support tickets, ops runbooks, internal process docs, and stakeholder interview notes. Per-source agents extract moments and handoffs, lane agents draft each blueprint layer with citations, and a gap agent flags lanes where the evidence is thin or contradictory so the validation workshop focuses there instead of starting from a blank wall.

Full guide: https://agenticdesign.school/workflows/service-blueprint-from-research-data

## What it produces

- `output/blueprint.yaml` — the structured blueprint, every step citing its source files
- `output/blueprint.html` — a rendered grid view for the validation workshop
- `output/gaps.md` — thin, single-source, or contradictory evidence, ordered by workshop priority

## Prerequisites

- Claude Code with dynamic workflows enabled
- An evidence folder of plain-text/CSV exports: research summaries, an anonymized ticket sample, runbooks, process docs, stakeholder notes
- Anonymization done before any agent reads the data
- Half a day per service, including citation spot-checks

## Files

| File | Purpose |
| --- | --- |
| `workflow.md` | The full prompt to give Claude Code to run this as a dynamic workflow |
| `blueprint-template.yaml` | The phases-and-lanes structure the lane agents fill |
| `agents/blueprint-lane-writer.md` | Subagent definition for drafting one lane with citations |
| `agents/evidence-extractor.md` | Subagent definition for extracting moments from one source file |

## How to run

1. Stage and anonymize your evidence into `evidence/` (see the folder structure in the guide).
2. Copy the files in `agents/` into your project's `.claude/agents/` directory.
3. Edit `blueprint-template.yaml` so the phases match your service (5–8 phases).
4. Open Claude Code in the project and paste the contents of `workflow.md` (the word "workflow" in the prompt triggers a dynamic workflow run; `/effort ultracode` also works).
5. Spot-check at least 6 citations across lanes before sharing the draft.
6. Run the validation workshop around `gaps.md`, then correct and re-render the YAML.

To reuse it, save the prompt to `.claude/workflows/blueprint.md` in the project (or `~/.claude/workflows/` for personal use) and run it as `/blueprint`.
