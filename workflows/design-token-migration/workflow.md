# Design token migration — dynamic workflow prompt

Capture before-screenshots and create a branch first, then paste this into Claude Code from the repo root.

---

Run this as a workflow.

Migrate hard-coded values and legacy tokens to the new semantic token set.

Inputs:
- `migration/tokens-map.json` — the only source of truth for replacements
- Scope: `src/**/*.{tsx,ts,css}` excluding `src/legacy/**` and generated files

Orchestration:
- Write an orchestration script that builds the file list with a glob, loads the token map, and loops the files, dispatching one migration agent per file with up to 16 running concurrently.
- Track completed files in `migration/progress.json` so the run is resumable; skip files already marked done.
- Keep diffs, reviewer verdicts, and flags in script variables and on disk, not in the conversation.

Each per-file migration agent:
- Replaces values and legacy tokens exactly as the map specifies
- Flags any value found in the file but missing from the map, without changing it
- Flags every usage of a value the map marks as `ask`, with its judgment and reasoning, and leaves it unchanged
- Makes no other changes: no formatting, no renames, no refactors

After each file, dispatch the `migration-reviewer` subagent on the diff. If it rejects, send the file back through migration once with the reviewer's reasons; if it rejects again, leave the file unchanged and add it to the flags.

Output:
- `migration/flags.md` — unmapped values, `ask` cases, and twice-rejected files, each with file, line, and the agent's reasoning
- `migration/progress.json` — per-file status

When all files are done, run `node visual-recapture.mjs after`, then stop for human review of the flags and the before/after comparison.

Guardrails:
- Work only on the current branch; never commit to main.
- Do not resolve `ask` cases; flag them.
- Do not modify the token map or token source files in this run.

Save this orchestration to `.claude/workflows/design-token-migration.md` once the first run is approved.
