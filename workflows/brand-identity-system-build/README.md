# Brand Identity System Build

A staged Claude Code dynamic workflow that turns an **approved** identity direction into a usable system: contrast-checked design tokens, a living guidelines document, proof-of-concept applications built as code, and a consistency report. The creative direction itself is chosen by humans — this workflow does not pick the brand.

Full guide: https://agenticdesign.school/workflows/brand-identity-system-build

## What it produces

- `brand/tokens.json` — color (with contrast-checked pairings), type scale, spacing, radius, motion
- `brand/guidelines.md` — logo usage, clear space, color rules, type hierarchy, voice and tone
- `brand/applications/` — landing page, social templates, email header, slide template, business card as HTML
- `brand/consistency-report.md` — every application checked against the guidelines, with application errors separated from system gaps

## Prerequisites

- Claude Code installed and signed in
- The approved direction and creative director's notes written down (`brand/direction/approved-direction.md`, `brand/direction/cd-notes.md`)
- Optional: Figma MCP (if the direction lives in Figma), Playwright and axe-core (to screenshot and contrast-check the generated applications)

## Files in this folder

| File | Purpose |
|---|---|
| `workflow.md` | The full prompt to give Claude Code to run this as a dynamic workflow |
| `agents/brand-token-translator.md` | Subagent definition for the token stage |
| `agents/brand-consistency-checker.md` | Subagent definition for the consistency stage |
| `brand-tokens.example.json` | Example token file with contrast-checked pairings |
| `guidelines-outline.md` | The structure the guideline agent fills in |

## How to run it

1. Copy the files in `agents/` into your project's `.claude/agents/` folder.
2. Copy `guidelines-outline.md` (and optionally `brand-tokens.example.json` as a reference) into your project root.
3. Create `brand/direction/` and add `approved-direction.md` and `cd-notes.md`.
4. Open Claude Code in the project and paste the prompt from `workflow.md`. The word "workflow" triggers the background orchestration script.
5. Review at each gate: the token set, then the guidelines draft, then the applications and consistency report.
6. Save the working script to `.claude/workflows/` so the next identity project starts from a reusable command.

## Boundaries

Agents translate, apply, and check. Humans choose the direction, judge taste and distinctiveness, and approve legal use of typefaces, photography, and trademarks. Automated contrast and consistency checks are a floor, not a ceiling.
