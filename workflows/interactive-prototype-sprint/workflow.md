# Prototype sprint workflow prompt

Paste the prompt below into Claude Code after adjusting the brief and harness paths. Including the word "workflow" triggers a dynamic workflow; alternatively run with `/effort ultracode`.

---

Run this as a workflow.

Build the prototype described in `prototypes/briefs/<brief-name>.md` inside the harness at `prototypes/harness/`.

Phase 1 — happy path: build the single flow in the brief using only the harness components, tokens, and sample data. After each build pass, run the capture script (`npm run proto:capture`) and compare the screenshots against the brief. Loop until the flow matches the brief and a participant could complete it without hitting a dead end. Do not build anything listed as out of scope.

Phase 2 — variants: from the working base, build the variants listed in the brief. Each variant changes only what its question requires; everything else stays identical to the base.

Phase 3 — QA and packaging: run a visual QA pass on the base and each variant at the session's device width. Fix anything that blocks the happy path; log polish issues without fixing them. Update `prototypes/index.html` so each variant is linked with the question it exists to answer.

This is a throwaway prototype for a testing session, not production code: no tests, no auth, no error handling beyond what the flow needs, and no refactoring of the harness.

---

## Notes

- Most of the run is a single build agent in a capture-compare-fix loop; the variant fan-out happens only after the happy path holds (well within the 16-concurrent / 1,000-per-run limits, and the run is resumable).
- Save the working run to `.claude/workflows/` (project) or `~/.claude/workflows/` (personal) so the next sprint starts from a known-good command.
- The builder subagent definition lives in `agents/prototype-builder.md`; copy it to `.claude/agents/` first.
