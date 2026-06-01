# Content and UX writing audit workflow

Save this file to `.claude/workflows/copy-audit.md` to run it as `/copy-audit`, or paste it into Claude Code. Make sure `copy-auditor.md` is in `.claude/agents/` and reflects your style guide.

---

Run this as a workflow.

## Goal

Audit all user-facing copy in the <product area> against the rules in `.claude/agents/copy-auditor.md`.

## Inputs

`./copy-audit/strings/` contains the exported locale files, email templates, and Figma text exports, grouped into:

- `buttons-and-actions/`
- `empty-states/`
- `errors/`
- `onboarding/`
- `emails/`

## Stage 1 — Per-surface audit

Launch one `copy-auditor` agent per folder. Each agent reads only its folder plus the style rules and returns:

- Findings: `{ string, location, rule, severity, suggested_rewrite }`
- A list of every term it saw used for the core concepts named in the style rules (e.g. transfers, accounts, recipients).
- Localization risks: concatenated strings, embedded variables that change word order, idioms, humor, length-sensitive strings.

## Stage 2 — Merge

Combine the per-surface results into `./copy-audit/output/`:

- `terminology-map.md` — one row per concept: canonical term, every variant found, locations of each variant, status (fix / exception / decision needed). Use `terminology-map-template.md`.
- `fix-list.md` — findings ranked P0 to P3, deduplicated across surfaces, with locations and suggested rewrites. Use `fix-list-template.md`.
- `localisation-risks.md` — flagged strings with the reason and a suggested restructure.
- `style-guide-deltas.md` — places where the style rules were ambiguous, contradictory, or wrong in practice.

## Rules

- Do not edit any strings.
- Do not invent strings that are not in the inputs; quote every audited string exactly.
- If a rule and an established product pattern conflict, report the conflict instead of choosing.
- Severity: P0 misleads or blocks the user; P1 inconsistent terminology or rule break on a primary flow; P2 tone or readability drift; P3 polish.
