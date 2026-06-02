# Cognitive Walkthrough at Scale

Run structured cognitive walkthroughs across many tasks and personas at once. Each walkthrough agent steps through one task with one persona's knowledge level, answering the four classic walkthrough questions at every step (will the user try the right action, notice it, connect it to their goal, understand the feedback) with screenshots as evidence. A merge agent groups failure points by screen and step so a screen that breaks six tasks shows up as one heavily flagged screen.

Important framing: the agents simulate an evaluator applying an inspection method, not real users. Findings are hypotheses to verify with actual usability testing — see the companion guide at https://agenticdesign.school/workflows/usability-test-prep-and-synthesis.

Full guide: https://agenticdesign.school/workflows/cognitive-walkthrough-at-scale

## What it produces

- Per-step walkthrough records (the four questions answered, with screenshot references)
- `output/screens/` — a screenshot captured at every step
- `output/walkthrough-report.md` — failure points merged by screen, ordered by how many task-persona combinations each screen breaks

## Prerequisites

- Claude Code with dynamic workflows enabled and a browser connection (Playwright MCP or Chrome DevTools MCP)
- A running build of the product or prototype the agent can drive, with test accounts
- A task list with the correct action sequence per task, and 2–3 persona files written as knowledge profiles
- 1–2 hours per product area

## Files

| File | Purpose |
| --- | --- |
| `workflow.md` | The full prompt to give Claude Code to run this as a dynamic workflow |
| `walkthrough-questions.md` | The per-step four-question template every walkthrough agent follows |
| `personas/novice-example.md` | Example persona written as a knowledge profile — copy and adapt |
| `agents/walkthrough-evaluator.md` | Subagent definition for one task-persona walkthrough |

## How to run

1. Write `tasks.md`: each task with its starting point and correct action sequence (this is the answer key).
2. Write 2–3 persona files in `personas/`, modeled on the example.
3. Copy `agents/walkthrough-evaluator.md` into your project's `.claude/agents/` directory.
4. Start the product or prototype locally and confirm the browser MCP connection works.
5. Open Claude Code and paste the contents of `workflow.md` (the word "workflow" triggers a dynamic workflow run; `/effort ultracode` also works).
6. Verify the top 2–3 failure points yourself against the screenshots, then sort findings into fix now, test with users, or accept.

To reuse, save the prompt to `.claude/workflows/walkthrough.md` (project) or `~/.claude/workflows/` (personal) and run it as `/walkthrough` after each significant release.
