# Design Ops Reporting — workflow prompt

Run the cycle exports first:

```bash
node scripts/count-token-usage.mjs
node scripts/count-component-usage.mjs   # same pattern as the token counter, if you have one

gh pr list --repo org/product-web --label "design-review" --state all --limit 500 \
  --json number,title,createdAt,closedAt,labels > design-ops/output/design-prs.json

gh issue list --repo org/design-system --label "contribution-request" --state all --limit 200 \
  --json number,title,createdAt,closedAt,state,labels > design-ops/output/contribution-requests.json
```

Then give Claude Code this prompt:

```
Run this as a workflow.

Produce the design ops report for this cycle and write it to design-ops/reports/<cycle>.md.

Inputs:
- design-ops/output/token-usage.json and component-usage.json (from scripts/count-token-usage.mjs and count-component-usage.mjs)
- design-ops/output/design-prs.json and contribution-requests.json (gh exports)
- agent-workflows/accessibility-sweep/*/findings.md and agent-workflows/visual-qa/*/findings.md
- design-ops/reports/<previous cycle>.md (for trends)

Dispatch one agent per source: adoption, QA debt, review throughput, contribution backlog. Each agent
computes its numbers only from its named inputs, compares with the previous cycle, and returns figures
plus a one-line note on how each figure was computed.

Then dispatch a synthesis agent (design-ops-synthesizer) to write the report using
design-ops/report-template.md. Every number must link to its computation in the appendix.
Report throughput as distributions across the team, never per person. Do not rank or name
individual designers. Flag anything that needs a prioritization decision.

Do not modify any source files. The report is a draft until the design ops lead signs it.
```

When the run produces a report you trust, save it to `.claude/workflows/` as `/design-ops-report`.
