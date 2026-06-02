# Experiment Design and Results Readout

A staged Claude Code workflow with adversarial review for A/B and multivariate experiments:

- **Design stage** — hypothesis written from evidence, one primary metric plus guardrails, minimum detectable effect and sample size computed by `sample-size.mjs`, and ship / kill / inconclusive criteria locked in a pre-registration a human signs before launch.
- **Readout stage** — an analysis agent runs the statistics with code against the exported results, a skeptic agent attacks the draft for peeking, HARKing, segment fishing, novelty effects, and guardrail damage, and the final readout separates what the data shows from what the team decides.

Every number comes from script output. The workflow never touches production traffic — it designs and reads out; your experiment platform runs the test.

Full guide: https://agenticdesign.school/workflows/experiment-design-and-results-readout

## Prerequisites

- Claude Code with dynamic workflows enabled
- Node.js 18+ (for `sample-size.mjs`)
- An evidence file motivating the test (research findings, ticket themes, funnel diagnosis output)
- After the run: a per-arm results export from your experiment platform

## Files

| File | Purpose |
| --- | --- |
| `workflow.md` | The full prompts to paste into Claude Code (design stage and readout stage) |
| `agents/experiment-skeptic.md` | Subagent definition for the adversarial readout review |
| `sample-size.mjs` | Two-proportion sample size script run before launch |
| `readout-template.md` | The readout structure: what the data shows, skeptic objections, what the team decides |

## How to run

1. Copy `agents/experiment-skeptic.md` into your project's `.claude/agents/` folder.
2. Put `evidence.md` and `context.md` in an `experiment/` folder, then paste the design-stage prompt from `workflow.md` into Claude Code. The word "workflow" triggers a dynamic workflow run.
3. A human signs `pre-registration.md`; the team configures and launches the test on its platform. Do not peek before the pre-registered end.
4. Export the per-arm results, then paste the readout-stage prompt. Read the skeptic's objections before the headline.
5. Hold the decision meeting with the readout's "what the team decides" section still blank, and record the decision there.
6. Once stable, save the prompts to `.claude/workflows/` as `/design-experiment` and `/readout`.
