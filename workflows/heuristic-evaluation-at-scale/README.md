# Heuristic Evaluation at Scale

Run a structured heuristic evaluation across every key flow of a product at once. One agent per flow evaluates against Nielsen's 10 heuristics plus a project-specific heuristics file the team maintains, working from screenshots and the live build. A merge agent dedupes and ranks the candidate findings. Agents flag candidate violations; humans confirm severity.

Full guide: https://agenticdesign.school/workflows/heuristic-evaluation-at-scale

## Prerequisites

- Claude Code with dynamic workflows enabled.
- Node.js 18+ and Playwright installed (`npm i -D playwright`) for the capture script.
- A staging or local build the agents may inspect, plus trial/test credentials if needed.
- A `flows.json` listing your key flows and the routes/steps that make them up.

## Files

| File | Purpose |
| --- | --- |
| `workflow.md` | The full prompt to give Claude Code to run the evaluation as a dynamic workflow. |
| `heuristics.md` | Nielsen's 10 plus example project heuristics — replace the project section with your own. |
| `agents/heuristic-evaluator.md` | Subagent definition for the per-flow evaluator. Copy into `.claude/agents/`. |
| `agents/merge-agent.md` | Subagent definition for the merge/dedupe agent (named `findings-merger`). Copy into `.claude/agents/`. |
| `capture-flows.mjs` | Playwright script that captures ordered screenshots per flow into `./evidence/<flow>/`. |

## How to run

1. Copy the files in `agents/` into your project's `.claude/agents/` directory.
2. Edit `heuristics.md`: keep Nielsen's 10, replace the project heuristics with your own (5–8 is plenty).
3. Create `flows.json` and run `node capture-flows.mjs` against your staging build to fill `./evidence/`.
4. Open Claude Code in the project and paste the prompt from `workflow.md` (it includes the word "workflow", which triggers a dynamic workflow; `/effort ultracode` also works).
5. When the run finishes, review `findings.md`: confirm or adjust every candidate severity by hand, and reject findings whose evidence does not hold up.
6. Optionally save the prompt to `.claude/workflows/heuristic-audit.md` so it becomes a reusable `/heuristic-audit` command.

## Notes

- Severity is always a human decision. The agents only propose candidates.
- Re-run with the same heuristics file each quarter so results stay comparable.
