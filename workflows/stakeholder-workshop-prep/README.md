# Stakeholder Workshop Prep

A staged Claude Code workflow that prepares a design or discovery workshop from material that already exists: an evidence pre-read with sources, a stakeholder map built only from provided material, a timed agenda with facilitation notes, and ready-to-import board templates. The facilitator reviews every stage and owns the room.

Full guide: https://agenticdesign.school/workflows/stakeholder-workshop-prep

## What it does

- Evidence agent: digests prior research, analytics, and strategy docs into a pre-read pack (max 4 pages, every claim cited, open questions listed)
- Stakeholder agent: maps who is in the room, accountabilities, stated positions, and tensions — only from org charts and meeting notes the team provides; never speculative profiling
- Agenda agent: drafts the timed session plan with exercises, facilitation notes, and a plan B
- Materials agent: produces FigJam/Miro-ready CSV boards, a printable instruction sheet, and a parking-lot doc

## Prerequisites

- Claude Code with dynamic workflows enabled
- The workshop's source material gathered into one folder (research, analytics exports, strategy docs, attendee list, meeting notes)
- A short brief stating the workshop's goal and the decision it must produce

## Files

| File | Purpose |
| --- | --- |
| `workflow.md` | The full staged prompt to give Claude Code |
| `agents/workshop-evidence-writer.md` | Evidence subagent definition — copy into `.claude/agents/` |
| `templates/agenda-template.md` | The structure the agenda agent fills in |
| `templates/journey-map-board.csv` | Example FigJam/Miro-importable board skeleton produced by the materials agent |

## How to run

1. Copy `agents/workshop-evidence-writer.md` into `.claude/agents/`.
2. Create a folder per workshop (see the structure in `workflow.md`) and write `brief.md` and `attendees.md` yourself.
3. Drop all source material into `inputs/`.
4. Paste the prompt from `workflow.md` into Claude Code; the word "workflow" triggers a dynamic workflow run. The run pauses for your review after the evidence and stakeholder stages.
5. Review and correct each artifact, dry-run the CSV import into FigJam or Miro, send the pre-read to attendees days ahead, and keep the stakeholder map private to the facilitation team.
6. Save the run to `~/.claude/workflows/` as `/workshop-prep` for next time.
