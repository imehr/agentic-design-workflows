# Accessibility sweep — dynamic workflow prompt

Run `node a11y-scan.mjs` first so `a11y/scan-results.json` exists, then paste this into Claude Code from the repo root.

---

Run this as a workflow.

Do an accessibility sweep of the app against WCAG 2.2 AA.

Inputs:
- `a11y/scan-results.json` — axe-core violations and recorded keyboard focus order for each route in scope
- The application source under `src/`

Orchestration:
- Write an orchestration script that reads the scan results and dispatches one `a11y-reviewer` subagent per route, up to 16 concurrently.
- Pass each subagent only its route's scan results plus access to the source; keep all findings in script variables.
- Track completed routes so the run is resumable.

Each subagent:
- Confirms each axe violation in the source and locates the responsible component
- Reviews the recorded focus order against the visual and task order
- Checks accessible names, error messages, and instructions for meaning, not just presence
- Flags color-only status signals and missing visible focus indicators
- Separates tool-proven findings (cite the axe rule) from judgment-based findings (say so explicitly)

Severity rubric: P0 blocks task completion or fails AA on a core flow, P1 serious barrier with a workaround, P2 friction, P3 advisory.

Output:
- Merge findings into `a11y/findings.md` following `finding-format.md`, ranked by severity, each with route, file, WCAG criterion, evidence, and a concrete fix.

Guardrails:
- Do not change any code in this run.
- After the report is written, stop for the severity gate review.
- When fixes are approved, apply them one severity tier at a time on a branch, re-run `node a11y-scan.mjs` after each tier, and do not start the next tier until the previous one re-verifies clean.

Save this orchestration to `.claude/workflows/accessibility-sweep.md` once the first run is approved.
