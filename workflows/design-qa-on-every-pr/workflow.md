# Design QA workflow prompt

Paste the prompt below into Claude Code with the branch you want to review checked out. Run it once, then save it from `/workflows` (press `s`) into `.claude/workflows/` so it becomes the `/design-qa` command for your team.

---

Run this as a workflow.

Do a design QA review of the current branch against main, scoped to the screens this branch changes.

Steps:

1. Use `git diff main...HEAD --name-only` and `qa/routes-map.json` to list the changed routes and the states each route should be reviewed in. If a changed component appears in no route mapping, list it under "Unmapped components" in the findings instead of skipping it silently.
2. Build or start the preview for this branch and for main (two ports are fine). Record the commands and ports used.
3. For each changed route, dispatch one screen-diff agent (see `.claude/agents/screen-diff-reviewer.md`) that captures both branches at 390, 768, and 1440 px, including the listed states, saves captures under `qa/captures/`, diffs them, and reports observable differences with the capture paths as evidence.
4. Dispatch the token reviewer (see `.claude/agents/token-reviewer.md`) over the changed component files: flag hardcoded colors, spacing, radii, shadows, and font sizes that have a token equivalent, citing file and line.
5. Dispatch one accessibility reviewer that runs axe-core on the changed routes on the branch preview and performs a keyboard pass on any new or changed interactive elements.
6. Merge everything into `qa/pr-findings.md`:
   - severity P0–P3 per finding (P0 blocks the task, P1 breaks hierarchy or a key responsive state, P2 weakens consistency or polish, P3 needs human judgment),
   - the evidence each finding rests on (capture path, file and line, or axe rule),
   - user impact and a concrete fix,
   - a short summary at the top suitable for pasting as a PR comment with `gh pr comment`.

Rules:

- Report only observable differences and rule violations; separate objective findings from design judgment.
- Do not change any code in this run. Report only.
- Use the same widths and commands every run so results stay comparable.
