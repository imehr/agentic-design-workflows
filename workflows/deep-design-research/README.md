# Deep Design Research

Use Claude Code's `/deep-research` dynamic workflow (or the custom variant in this folder) to answer design questions with cross-checked, cited evidence: competitive teardowns, pattern research, accessibility standards, and platform conventions.

The workflow fans out web searches across angles you choose, fetches the sources, cross-checks claims against each other, filters out claims that do not survive, and returns a cited report you can turn into a research packet.

Full guide: https://agenticdesign.school/workflows/deep-design-research

## Prerequisites

- Claude Code with the **WebSearch** tool enabled (`/deep-research` requires it).
- Workflow mode: include the word `workflow` in your prompt, run `/deep-research`, or use `/effort ultracode`.
- A research question worth 20–45 minutes of run time (decisions that will be repeated to stakeholders, standards questions, competitive teardowns).

## Files

| File | Purpose |
|---|---|
| `workflow.md` | The full prompt to give Claude Code to run this as a dynamic workflow. Save it to `.claude/workflows/` to get a reusable command. |
| `research-question-template.md` | Template for framing the question, the decision it informs, evidence rules, and what would change your mind. |
| `research-packet-template.md` | Template for turning the report into a packet the design team can brief from. |

## How to run

1. Copy `research-question-template.md` and fill it in for your question.
2. Open `workflow.md`, paste your question and angles into the marked sections.
3. Paste the whole thing into Claude Code (or save it as `.claude/workflows/deep-design-research.md` and run it as a slash command).
4. When the report returns: read the dropped-claims appendix first, spot-check 3–5 citations, then build the packet from `research-packet-template.md`.

## What it cannot do

It researches the public web, not your users. Treat quantitative claims as context, not forecasts, and validate anything load-bearing with your own testing.
