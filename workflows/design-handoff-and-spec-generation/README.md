# Design Handoff and Spec Generation

A subagent fan-out that turns approved designs into developer-ready specs: layout redlines, token mapping, interaction states, accessibility annotations, edge cases, and acceptance criteria. One agent per screen drafts a spec, a consolidation agent assembles the handoff packet, and a developer-perspective agent reviews the packet for ambiguity before it ships.

Full guide: https://agenticdesign.school/workflows/design-handoff-and-spec-generation

## What it does

1. Reads the per-screen inputs (approved design, designer notes, tokens, component inventory).
2. Fans out one screen-spec agent per screen, all using the same spec template.
3. Consolidates the screen specs into one handoff packet plus an open-questions list.
4. Runs a developer-perspective review that flags everything a builder would have to guess.
5. Leaves design decisions to the designer: ambiguities go to an answer session, not into invented spec text.

## Prerequisites

- Claude Code installed and authenticated.
- Approved designs per screen (Figma frames via the Figma Dev Mode MCP server, or exported images plus notes).
- A token source of truth (`tokens.json` or your token package).
- A short feature brief and a component inventory of what already exists.

## Files

| File | Purpose |
| --- | --- |
| `workflow.md` | The full prompt to run this as a Claude Code dynamic workflow |
| `agents/screen-spec-writer.md` | Subagent that specs one screen from its design and the shared inputs |
| `agents/dev-perspective-reviewer.md` | Subagent that reviews the packet as if it had to build it |
| `templates/screen-spec.md` | The spec template every screen agent fills in |
| `templates/handoff-packet.md` | Skeleton of the consolidated packet |

## How to run with Claude Code

1. Copy `agents/*.md` into `.claude/agents/` in your repository (dot-prefixed folders are not included in this repo, so copy them yourself).
2. Stage the inputs in a `handoff/<feature>/` folder following the structure described in `workflow.md`.
3. Paste the contents of `workflow.md` into Claude Code. The word "workflow" makes Claude run it as a dynamic workflow (or use `/effort ultracode`).
4. After a successful run, open `/workflows`, select the run, and press `s` to save it into `.claude/workflows/` as `/handoff-spec`.
5. Hold the answer session for `open-questions.md`, then deliver the packet with the design files.
