# Prompt: Multi-Direction Concept Exploration (dynamic workflow)

Paste the prompt below into Claude Code from the repo root. The word "workflow" triggers the dynamic workflow path; you can also run `/effort ultracode` first to ask for it explicitly.

---

Run a multi-direction concept exploration as a dynamic workflow.

Inputs:
- `exploration/brief.md` contains the brief and a list of 3–5 design stances.
- `scoring-rubric.md` contains the weighted criteria for critique.
- Subagents `direction-author` and `direction-critic` are defined in `.claude/agents/`.

Orchestration:
1. Read the brief and the stance list.
2. Drafting stage: for each stance, run one `direction-author` agent in parallel. Each agent gets the full brief and exactly one stance, and writes its direction package to `exploration/directions/<stance>.md`. Direction agents must never see other directions; keep their outputs in the script and on disk, not in this conversation.
3. Critique stage: for every direction, run `direction-critic` agents from the perspective of each other stance (every direction is reviewed only by non-authors). Each critique argues against the direction it reviews, scores every rubric criterion 1–5 with evidence from the brief or the package, and flags any constraint violation as disqualifying rather than a low score. Write all critiques to `exploration/critiques.md`.
4. Comparison stage: run one final agent to produce `exploration/comparison.md` containing: the weighted score table, the single strongest objection per direction, constraint violations, named blend candidates worth carrying across directions, and the open questions a human must decide. Do not pick a winner.
5. Surface only `exploration/comparison.md` back to me.

After I decide:
- Record my decision and reasoning in `exploration/decision.md`, including which directions were rejected and why, so the rejected options stay on file.

If this orchestration works, save it to `.claude/workflows/multi-direction-concept-exploration` so it can be reused as a slash command.
