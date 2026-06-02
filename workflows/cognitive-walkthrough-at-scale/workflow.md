# Cognitive walkthrough workflow prompt

Paste the prompt below into Claude Code from the project root. Adjust the task count, URL, and file paths before running.

---

Run this as a workflow.

Input: `./tasks.md` lists the tasks, each with a starting point and the correct action sequence. `./personas/` contains the persona files describing knowledge levels. `./walkthrough-questions.md` is the per-step template. The product runs at http://localhost:3000 with the test accounts listed in tasks.md.

Stage 1 — Walkthroughs: For each task and persona combination, launch one agent (use the `walkthrough-evaluator` agent). It steps through the task in the browser, captures a screenshot at every step into `./output/screens/`, and fills in the four-question template per step from that persona's knowledge level. Answers must reference what is visible in the captured screenshot. Any "no" answer makes the step a failure point with a severity guess (blocks the task / causes hesitation or error / minor friction).

Stage 2 — Merge: A merge agent groups all failure points by screen and step across tasks and personas. For each screen it lists: which tasks and personas fail there, which of the four questions fail most often, the severity guesses, and the screenshot references.

Stage 3 — Report: Write `output/walkthrough-report.md` with the merged failure points ordered by how many task-persona combinations each screen breaks, plus a short list of steps that passed for expert personas but failed for novice personas.

Rules:
- These are evaluator predictions, not user behavior; say so in the report header.
- Do not propose redesigns; describe the failure and the question it fails.
- Every failure cites a screenshot file in `./output/screens/`.
- If a persona cannot complete a step at all, record where it got stuck and stop that task there; an abandoned task is a finding.
