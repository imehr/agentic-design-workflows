# Experiment Design and Results Readout — workflow prompts

Two prompts: the design stage runs before launch and ends with a signed
pre-registration; the readout stage runs after the pre-registered end of the
test. The word "workflow" in the first line is what makes Claude Code write
an orchestration script and run subagents in the background.

---

## Design stage

```
Run this as a workflow.

Input: ./experiment/evidence.md (the research, ticket themes, or funnel
findings motivating this test) and ./experiment/context.md (traffic,
baseline rates, constraints).

Stage 1 - Hypothesis: draft the hypothesis in the form: because [evidence],
we believe [change] will move [primary metric] for [population]. Flag it if
the because clause does not point at a specific piece of evidence in
evidence.md.

Stage 2 - Metrics: propose one primary metric and 2-4 guardrail metrics
with the direction that counts as harm. Justify each in one sentence.

Stage 3 - Power: write and run sample-size.mjs with the baseline rate from
context.md and the smallest lift worth shipping for. Report n per arm and
run length at current traffic. Never estimate these numbers without running
the script.

Stage 4 - Pre-registration: assemble ./experiment/pre-registration.md with
hypothesis, metrics, MDE, sample size, run length, the segments that will
be reported, and the ship / kill / inconclusive decision rules. Stop there.
A human signs this document before anything launches, and the experiment
platform configuration is done by the team, not by this workflow.
```

---

## Readout stage

```
Run this as a workflow.

Input: ./experiment/pre-registration.md (signed before launch),
./data/results.csv (per-arm results export), ./data/assignment-log.csv
(assignment counts over time, if available), and ./experiment/changelog.md
(anything that shipped during the run).

Stage 1 - Analysis: write and run a Node script against ./data/results.csv.
Compute per-arm conversion with 95% confidence intervals, the difference
and its uncertainty, every guardrail metric, and the pre-registered
segments only. Report only what the script printed.

Stage 2 - Timeline: from the assignment log and the changelog, reconstruct
the run: start and end dates, whether the assignment ratio held, the weekly
trend of the primary metric, and anything that shipped mid-test.

Stage 3 - Skeptic: launch the experiment-skeptic agent with the
pre-registration, the analysis, and the timeline. It assumes the conclusion
is wrong and checks for early stopping, HARKing, segment fishing, novelty
effects, guardrail damage, and effects too small to matter. Its objections
are published whether or not they change the conclusion.

Stage 4 - Readout: assemble ./output/readout.md using
./readout-template.md. Section 1: what the data shows (script outputs
only). Section 2: skeptic objections and their dispositions. Section 3:
what the team decides — leave this section as questions for the humans, do
not answer them.
```
