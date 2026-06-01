# Design System Audit at Scale

Fan out one read-only agent per component or page to find token drift, off-scale spacing, undocumented variants, and duplicated patterns, then aggregate everything into a prioritized drift report.

Full guide: https://agenticdesign.school/workflows/design-system-audit-at-scale

## What it does

- Enumerates audit units (component folders or pages) with a glob, so the audit stays accurate as the system grows.
- Runs as a Claude Code dynamic workflow: one `component-auditor` subagent per unit, up to 16 concurrently, findings held in script variables instead of chat context.
- Compares every unit against a single source of truth: your token build and component docs.
- Deduplicates and ranks findings P0–P3, then writes `audit/drift-report.md` with a two-minute summary on top.
- Never changes code; the audit run is read-only by design.

## Prerequisites

- Claude Code with dynamic workflows enabled.
- A token reference the agents can read: `design-tokens/tokens.json` (Style Dictionary build output works well) or exported Figma styles.
- Component documentation (even partial) so undocumented variants can be detected.
- Node.js 20+ if you use the optional inventory script.

## Files

| File | Purpose |
|---|---|
| `workflow.md` | The prompt to give Claude Code to run the audit as a dynamic workflow |
| `agents/component-auditor.md` | Subagent definition for the per-component auditor (copy into your repo's `.claude/agents/`) |
| `drift-report-template.md` | The structure the aggregated report should follow |
| `tokens.example.json` | Example token reference showing the expected shape |

## How to run

1. Point `workflow.md` at your real token reference, docs, and source globs.
2. Copy `agents/component-auditor.md` into your repo's `.claude/agents/` folder.
3. Open Claude Code in the repo and paste the prompt from `workflow.md` (it includes the word "workflow", which triggers the dynamic workflow path; `/effort ultracode` also works).
4. Review a sample of early findings; tighten the auditor instructions if they read like opinions instead of evidence.
5. Read `audit/drift-report.md`, hold a triage review, and turn the hotspots into a cleanup backlog.
6. Save the working orchestration to `.claude/workflows/` and rerun it after each cleanup pass to track the trend.
