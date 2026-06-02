# Funnel and Drop-off Diagnosis — workflow prompt

Adjust the step and segment column names to match your export before
pasting. The word "workflow" in the first line is what makes Claude Code
write an orchestration script and run subagents in the background; the
analytics output decides which steps get walkthrough agents.

```
Run this as a workflow.

Input: ./data/funnel-export.csv (one row per user, step columns and segment
columns documented in ./brief.md), and ./brief.md (step definitions, time
window, test environment URL and credentials, segments to cut by).

Stage 1 - Analytics: write and run analyse-funnel.mjs against the export.
Compute step conversion overall and for each segment in the brief. Report
only numbers the script printed. Identify the 2-3 steps with the largest
absolute drop-off or the largest segment gap.

Stage 2 - Walkthroughs: for each identified step, launch a
funnel-walkthrough agent against the test environment at 1440px and 390px.
Collect screenshots, verbatim copy, error-state behavior, and load notes
into ./evidence/<step>/.

Stage 3 - Merge: combine the analytics and walkthrough evidence into
hypotheses for why users leave at each step. Rank them by evidence
strength. Each hypothesis must cite at least one number and at least one
walkthrough observation, and must name a verification method: session
replays, a usability test, or an experiment. Do not state any hypothesis as
a confirmed cause.

Output: ./output/funnel-tables.md, ./output/walkthrough-notes.md, and
./output/hypotheses.md (ranked, evidence-linked, each tagged with its
verification method and an owner field left blank for the team).
```

## Notes

- Use a test environment only. Never give walkthrough agents production
  accounts with real user data or real payment instruments.
- If a step's numbers look implausible, allow the workflow to propose an
  instrumentation hypothesis — sometimes the broken thing is the tracking.
- Pair the output with the experiment workflow: a top-ranked hypothesis
  tagged "experiment" becomes the evidence-backed because clause of a
  pre-registration.
