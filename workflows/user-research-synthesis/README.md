# User Research Synthesis

Turn a folder of interview transcripts, support tickets, or survey answers into coded themes, evidence-linked insights, and an opportunity map. One agent codes each transcript against a shared codebook, a synthesis agent merges themes, and a challenge agent hunts for thin evidence, over-claims, and disconfirming data. Every quote stays traceable to a participant ID and line.

Full guide: https://agenticdesign.school/workflows/user-research-synthesis

## Prerequisites

- Claude Code with workflow mode (include the word `workflow` in the prompt or use `/effort ultracode`).
- Anonymized transcripts. **Run `anonymise-transcripts.mjs` before any agent sees the data**, and confirm participant consent covers automated analysis.
- A codebook (start from `codebook-template.md`); the lead researcher should read at least 3 transcripts before drafting it.
- Node.js 18+ for the anonymization script.

## Files

| File | Purpose |
|---|---|
| `workflow.md` | The full prompt to run the synthesis as a dynamic workflow. Save to `.claude/workflows/` as `/synthesize`. |
| `anonymise-transcripts.mjs` | Replaces names, emails, and phone numbers with participant IDs before agents see the data. |
| `codebook-template.md` | Starting codebook structure with example codes from a B2B churn study. |
| `agents/transcript-coder.md` | Subagent definition for the per-transcript coding pass (verbatim quotes only). Copy it into your project's `.claude/agents/` before running. |

## How to run

1. Put raw transcripts in `./raw/` and the name-to-ID mapping in `participant-names.json` (kept out of the agent workspace).
2. `node anonymise-transcripts.mjs` → anonymized copies land in `./transcripts/`.
3. Adapt `codebook-template.md` into `./codebook.md` for your study.
4. Copy `agents/transcript-coder.md` into your project's `.claude/agents/`.
5. Paste `workflow.md` into Claude Code (or run it as a saved workflow).
6. Review `output/challenges.md` first, spot-check 5 random quotes against the source transcripts, then review themes and build the opportunity map with the team.

## What it cannot do

It cannot turn 12 interviews into statistics, detect sample bias on its own, or make consent and roadmap decisions. Those stay with humans.
