# Design system audit — dynamic workflow prompt

Paste this into Claude Code from the repo root. Adjust the reference paths and globs first.

---

Run this as a workflow.

Audit our design system for drift against the documented tokens and component specs.

Reference (source of truth):
- `design-tokens/tokens.json` — the built token set (colors, spacing scale, radii, typography)
- `docs/components/*.md` — documented components and their variants

Scope:
- Every folder under `src/components/`
- Every page under `apps/marketing/pages/`
- Exclude `src/components/legacy/` and generated files

Orchestration:
- Write an orchestration script that enumerates the scope with a glob and dispatches one `component-auditor` subagent per component folder or page, up to 16 concurrently.
- Keep all findings in script variables; do not stream raw findings into the conversation.
- Track completed units so the run is resumable.

Each subagent reports, with file path and line number for every finding:
- Hard-coded colors, spacing, radii, or font sizes that should be tokens (name the token they should use)
- Spacing values outside the documented 4px scale
- Variants that exist in code but not in the docs, and documented variants missing from code
- Patterns that re-implement an existing component

Severity rubric: P0 breaks brand or accessibility, P1 visible inconsistency, P2 off-spec but subtle, P3 question for the team.

Aggregation:
- Deduplicate repeated patterns and group findings by component, then by category.
- Write `audit/drift-report.md` following `drift-report-template.md`: summary and severity counts first, hotspots next, per-component detail last.

Guardrails:
- Do not change any code in this run.
- Known exceptions listed in `docs/design-system-exceptions.md` should be reported as "approved exception", not as violations.

When the report is written, stop and wait for human review. After it is approved, save this orchestration to `.claude/workflows/design-system-audit.md` so it can be rerun as a command.
