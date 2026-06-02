# Journey mapping workflow prompt

Stage your data first and write `journey/<name>/manifest.json` (see `examples/manifest.json`). Anonymize everything before it reaches the workflow. Then paste the prompt below into Claude Code. Run it once, then save it from `/workflows` (press `s`) into `.claude/workflows/` so it becomes the `/journey-map` command.

---

Run this as a workflow.

Build an evidence-based journey map for the journey defined in `journey/<name>/manifest.json`.

Steps:

1. For each source in the manifest, dispatch evidence-extractor agents (see `.claude/agents/evidence-extractor.md`), batching ticket and session-note files as needed. Each agent extracts moments and signals into `journey/<name>/evidence/<source>-<batch>.json` using the schema in `templates/evidence-item.json`: stage_guess, observation, signal_type (behavior, pain, emotion, workaround, expectation), strength, and a citation back to the file plus row, ticket ID, or note ID.
2. Merge all evidence files into an evidence ledger with stable IDs at `journey/<name>/evidence-ledger.json`.
3. Dispatch the journey-synthesizer agent (see `.claude/agents/journey-synthesizer.md`) to assemble `journey/<name>/journey-map.md`: stages, user actions, thoughts, emotions, pain points, and opportunities, where every cell lists the evidence IDs that support it. Quantify wherever the analytics allows it.
4. Dispatch the challenge-reviewer agent (see `.claude/agents/challenge-reviewer.md`) to audit the draft: flag every claim supported by a single source type, fewer than three evidence items, or contradicted by another source; mark affected cells UNVERIFIED in the map and list them in `journey/<name>/journey-map-gaps.md` along with the manifest's known gaps.

Rules:

- Do not infer emotions from analytics alone; emotion claims need interview or verbatim support.
- Do not fill empty cells for symmetry; an empty cell is information.
- Quotes must be verbatim from the source, with their citation.
- Work only from the staged files; do not contact any external system in this run.
