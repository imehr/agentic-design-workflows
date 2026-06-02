# Usability test prep and synthesis — workflow prompts

Two prompts, one for each stage. Edit the bracketed details for your study, then paste into Claude Code. The word "workflow" triggers a dynamic workflow run.

---

## Stage one: study prep

Run this as a workflow.

Context: We are testing [the design / prototype] for [product]. The design decision in question: [what the team will do differently depending on the answer]. Prototype: [link or path]. Sessions: [n] [moderated/unmoderated] sessions, [length] each.

Stage 1 — Draft: A planning agent drafts: `research-questions.md` (3–5 questions, each tied to a decision the team will make differently depending on the answer), `test-plan.md` (method, participants, schedule, roles, recording and consent notes), `tasks.md` (one task per research question, written as a goal in the participant's words with no interface vocabulary, plus success criteria), `screener.md` (questions with accept/reject logic), and `discussion-guide.md` (intro script, warm-up, task order, follow-up probes, wrap-up), using `discussion-guide-template.md` as the structure.

Stage 2 — Critique: A critique agent checks the package: every task maps to a research question, no task names a UI element or leads the participant, the screener excludes people who could not plausibly use the product, the guide's probes are open questions, and the timing fits the session length. The planning agent revises until the critique passes.

Stage 3 — Prototype check: A prototype-readiness agent walks each task against the prototype and flags any screen, state, or interaction a task requires that the prototype does not support, into `prototype-gaps.md`.

Output the five study files plus `prototype-gaps.md`. Do not invent participant quotas or accessibility requirements; flag them as decisions for the researcher.

---

## Stage two: synthesis

Run this as a workflow.

Input: `./sessions` contains anonymized notes and transcripts for P01–P[nn]. `./study/research-questions.md` lists the research questions. `./study/tasks.md` defines the tasks and success criteria. Follow the rules in `codebook-template.md`.

Stage 1 — Coding: For each session, launch one `session-coder` agent that reads only that session's files. It returns: per-task outcome (success, partial, fail, not attempted) with the moment that decided it, observations coded against the research questions, and verbatim quotes with participant ID and timestamp or line reference. Quotes must appear word for word in the source. If a quote cannot be found verbatim, do not report it.

Stage 2 — Synthesis: Merge the coded sessions into findings per research question. Each finding states: a one-sentence claim, which participants support it (by ID), task outcomes that relate to it, 2–3 verbatim quotes, and an explicit count (e.g. 4 of 6). Also produce a task-outcome table across all participants.

Stage 3 — Challenge: The `challenge-agent` reviews the findings against all coded sessions and flags: claims supported by fewer than half the participants, quotes that do not appear verbatim in the sources, language that generalizes beyond this sample, and disconfirming evidence the synthesis did not mention.

Output: `findings.md`, `task-outcomes.md`, `evidence-table.md` (every quote with participant and location), and `challenges.md`. Do not propose design changes; list open questions instead.
