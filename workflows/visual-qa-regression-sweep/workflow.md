# Prompt: Visual QA Regression Sweep (dynamic workflow)

Paste the prompt below into Claude Code from the repo root. The word "workflow" triggers the dynamic workflow path; you can also run `/effort ultracode` first to ask for it explicitly.

---

Run a visual QA regression sweep as a dynamic workflow.

Inputs:
- `sweep-manifest.json` lists every page, its route, intent, states, and the standard viewports.
- `sweeps/baseline/` contains approved screenshots named `<pageId>--<viewport>.png`.
- `sweeps/current/` contains screenshots of the branch under review with the same naming.

Orchestration:
1. Read the manifest. For each page, run one `visual-compare` subagent (defined in `.claude/agents/visual-compare.md`). Give it only that page's baseline and current captures plus the page intent. Run pages concurrently, up to 16 at a time. Keep each agent's raw output in the script, not in this conversation.
2. Each compare agent must report observable differences only, as JSON findings with: page, viewport, observation, user impact, likely cause, concrete fix, and severity (P0 blocks the task, P1 changes hierarchy or breaks a viewport, P2 weakens polish, P3 subjective judgment for a human).
3. Merge all findings into `sweeps/findings.json`, sorted by severity.
4. Run one final agent to write `sweeps/report.md`: lead with P0/P1 release blockers, then systemic findings that repeat across pages with their likely shared cause, then per-page P2 items, then P3 human questions, then a coverage note for anything that could not be captured.
5. Surface only `sweeps/report.md` back to me. Do not change any code yet.

After I approve the fix plan:
- Fix in passes: blockers first, systemic causes second, per-page polish third.
- After each pass, recapture only the affected pages with `node capture-screens.mjs current` and re-run the compare agents for just those pages.
- Finish with a full recapture and a final compare across every page. The sweep is done when no P0 or P1 remains and every P2/P3 has an owner or a recorded decision.

If this orchestration works, save it to `.claude/workflows/visual-qa-regression-sweep` so it can be reused as a slash command.
