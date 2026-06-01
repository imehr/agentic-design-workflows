# User research synthesis workflow

Save this file to `.claude/workflows/user-research-synthesis.md` to run it as `/synthesize`, or paste it into Claude Code. Only run it on anonymized transcripts.

---

Run this as a workflow.

## Inputs

- `./transcripts/` contains anonymized transcripts named by participant ID (e.g. `P01.txt` … `P12.txt`).
- `./codebook.md` is the shared codebook.
- Use the `transcript-coder` subagent definition (copied from `agents/transcript-coder.md` into `.claude/agents/`) for Stage 1.

## Stage 1 — Coding (one agent per transcript)

For each transcript, launch one coding agent that reads only that transcript and the codebook. It returns coded excerpts as JSON:

```
[{ "participant": "P04", "code": "ONB-CONFUSION", "verbatim_quote": "...", "line": 211 }]
```

Rules:
- Quotes must be copied exactly from the transcript. If a quote cannot be found verbatim in the file, it must not be reported.
- A quote may carry multiple codes.
- Propose `NEW-` codes with a one-line definition where nothing in the codebook fits.

## Stage 2 — Synthesis

Merge the coded excerpts into themes. Each theme needs:
- A one-sentence claim.
- The codes it draws on.
- Supporting participants by ID and a coverage count (e.g. 8 of 12).
- 2–4 verbatim quotes with participant ID and line reference.

## Stage 3 — Challenge

A separate agent reviews the themes against all coded excerpts and flags:
- Themes supported by fewer than 3 participants.
- Quotes that do not appear verbatim in the source transcripts.
- Claims that generalize beyond the sample (e.g. percentages about all users).
- Disconfirming evidence the synthesis ignored.

## Output

Write to `./output/`:
- `themes.md` — themes with claims, coverage counts, and quotes.
- `evidence-table.md` — every coded quote with participant ID, code, and line.
- `challenges.md` — everything flagged in Stage 3.
- `opportunities.md` — candidate product opportunities, each linked to at least one supported theme. Do not include any opportunity without a linked theme.
