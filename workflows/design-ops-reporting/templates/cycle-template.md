<!-- Template file: the structure the design-ops-synthesizer subagent fills in each cycle.
     This is a reusable code sample for the workflow repo, not a generated report. -->

# Design Ops Report — {cycle}

> DRAFT until signed by the design ops lead.
> This report informs prioritization conversations about systems, debt, and process.
> It contains no per-person metrics and must not be used to evaluate individual designers.

## 1. Summary (max 200 words)

What changed since {previous cycle}, in plain language. No number without a footnote.

## 2. Design system adoption

- Token coverage by repo, with previous-cycle comparison [^a1]
- Component coverage by repo, with previous-cycle comparison [^a2]
- Where the change is concentrated, and why (if known)

## 3. QA debt

- Accessibility and visual QA findings: opened, resolved, outstanding by severity [^a3]
- Trend across the last three cycles
- Findings blocked on decisions outside the design team

## 4. Design review throughput

- Time-to-close distribution for design-review PRs and issues, team level only [^a4]
- Comparison with previous cycle

## 5. Contribution backlog

- Open contribution requests with age and requesting team [^a5]
- Requests older than 90 days

## 6. Proposals for the prioritization conversation

Each proposal names the evidence it rests on and the decision it asks for.

## 7. Qualitative notes (written by the design ops lead, not generated)

## Appendix: how each figure was computed

[^a1]: scripts/count-token-usage.mjs over design-ops/repos.json — output: design-ops/output/token-usage.json
[^a2]: scripts/count-component-usage.mjs — output: design-ops/output/component-usage.json
[^a3]: agent-workflows/accessibility-sweep/*/findings.md and agent-workflows/visual-qa/*/findings.md
[^a4]: design-ops/output/design-prs.json (gh pr list export, label design-review, last 90 days)
[^a5]: design-ops/output/contribution-requests.json (gh issue list export, label contribution-request)
