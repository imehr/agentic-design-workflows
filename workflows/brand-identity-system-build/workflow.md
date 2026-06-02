# Workflow prompt: Brand Identity System Build

Paste the prompt below into Claude Code at the project root. Place the approved direction and the creative director's notes in `brand/direction/` first, and copy the agent definitions from `agents/` into `.claude/agents/`.

---

Run this as a workflow.

Inputs: brand/direction/approved-direction.md and brand/direction/cd-notes.md.
Do not change the creative direction; it is approved and human-owned.

Stage 1 — tokens: a token agent (brand-token-translator) translates the direction
into brand/tokens.json: color with contrast-checked pairings against WCAG 2.2 AA,
type scale, spacing, radius, and motion. Flag any pairing that fails AA instead
of silently fixing it. Pause for my review before stage 2.

Stage 2 — guidelines: a guideline agent drafts brand/guidelines.md from the
direction, the CD notes, and the approved tokens, following guidelines-outline.md.
Quote the creative director's own language for voice and tone, and mark every
rule that was inferred rather than stated. Pause for my review.

Stage 3 — applications: in parallel, application agents generate
brand/applications/ as code, using only token values and approved pairings:
- landing-page.html
- social-1x1.html and social-9x16.html
- email-header.html
- slide-template.html
- business-card.html

Stage 4 — consistency: run the brand-consistency-checker agent over every file
in brand/applications/ and write brand/consistency-report.md, separating
APPLICATION ERRORS (the surface should change) from SYSTEM GAPS (the tokens or
guidelines are missing something the surface legitimately needs).

Finish by listing the open decisions that need the creative director.

---

## Notes

- Including the word "workflow" makes Claude Code write a background JavaScript orchestration script; intermediate outputs stay in script variables and on disk, not in the conversation.
- Use `/effort ultracode` if you want to request the orchestration depth explicitly.
- Save the working script to `.claude/workflows/` (project) or `~/.claude/workflows/` (personal) to reuse it as a slash command on the next identity project.
- If you need market or competitor research before the build, run `/deep-research` (requires WebSearch) first, not inside this pipeline.
