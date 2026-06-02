# Usability Test Prep and Synthesis

A two-stage workflow around a usability study. Stage one prepares the study (research questions, test plan, task scenarios, screener, discussion guide, prototype readiness check) before recruitment. Stage two synthesizes after the sessions: one agent codes each session against the research questions, a synthesis agent merges findings, and a challenge agent hunts for over-claims and disconfirming evidence. Quotes stay verbatim and traceable to participant IDs; agents never invent findings; everything is anonymized before any agent sees it.

Full guide: https://agenticdesign.school/workflows/usability-test-prep-and-synthesis

## Prerequisites

- Claude Code with dynamic workflows enabled.
- Anonymized session notes and transcripts (one folder, one file set per participant ID). Keep the ID-to-identity mapping outside the agent's working folder.
- Consent language that covers automated analysis of transcripts.
- A defined design decision the study is meant to inform.

## Files

| File | Purpose |
| --- | --- |
| `workflow.md` | The two prompts (prep and synthesis) to give Claude Code as dynamic workflows. |
| `discussion-guide-template.md` | A starter discussion guide structure the prep stage drafts into. |
| `codebook-template.md` | The per-session coding rules and output shape the coder follows. |
| `agents/session-coder.md` | Subagent definition for per-session coding. Copy into `.claude/agents/`. |
| `agents/challenge-agent.md` | Subagent definition for the over-claims/challenge pass. Copy into `.claude/agents/`. |

## How to run

1. Copy the files in `agents/` into your project's `.claude/agents/` directory.
2. A week before recruitment, paste the **prep prompt** from `workflow.md` into Claude Code, edited with your design decision, prototype, and session count. Edit the drafted package by hand and fix everything the prototype-readiness check flags.
3. Run the sessions yourself. Keep one note file per participant ID, then anonymize notes and transcripts into `./sessions/`.
4. Paste the **synthesis prompt** from `workflow.md` into Claude Code. Both prompts include the word "workflow", which triggers a dynamic workflow run; `/effort ultracode` also works.
5. Read `challenges.md` first, then spot-check five random quotes from `evidence-table.md` against the source sessions before the team readout.
6. Optionally save the prompts to `.claude/workflows/` as `/test-prep` and `/test-synthesis`.

## Notes

- The sessions themselves are human work; nothing here moderates or observes for you.
- Counts like "4 of 6" describe the sample, not the user base. Do not turn them into percentages.
