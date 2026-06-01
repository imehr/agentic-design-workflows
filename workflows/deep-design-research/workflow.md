# Deep design research workflow

Save this file to `.claude/workflows/deep-design-research.md` to use it as a reusable command, or paste it directly into Claude Code. Requires the WebSearch tool.

---

Run this as a deep research workflow.

## Question

<!-- Paste the filled-in research-question-template.md here. Example: -->

How do Linear, Asana, Monday.com, ClickUp, and Notion handle empty states in their dashboard and project views?

## Angles to research in parallel

<!-- 5-8 angles. One per competitor/platform, one for the primary standard, one for criticism, one for recency. -->

1. Linear empty states and first-run experience
2. Asana empty states and onboarding checklists
3. Monday.com empty states and template galleries
4. ClickUp empty states and sample data
5. Notion empty states and template pickers
6. Published UX teardowns or pattern-library entries about empty states in project tools
7. Evidence about empty-state effectiveness: case studies, A/B results, NN/g articles

## Procedure

For each angle:
- Search the web and fetch the strongest 3–5 sources.
- Extract concrete claims, each with the exact source URL and a short supporting quote.
- Prefer primary sources (official docs, changelogs, standards text) over commentary.

Cross-check:
- A claim about what a product does must be supported by at least two independent sources, or one primary source.
- Drop claims that fail this test and list them in a separate "dropped claims" appendix with the reason.
- List contradictions between sources explicitly instead of resolving them silently.

## Output

Write the report to `./research/<topic>-report.md` with:

1. One section per product or angle, verified claims only, every claim cited.
2. A comparison table of the patterns found.
3. A verified-claims list with citations.
4. A dropped-claims appendix (claim, where it appears, why it was dropped).
5. Open questions we should answer with our own usability testing or analytics.

Do not include any claim in sections 1–3 that is not in the verified list.
