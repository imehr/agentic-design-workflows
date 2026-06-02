# Competitive teardown workflow prompt

Edit the bracketed details, then paste into Claude Code. The word "workflow" in the first line triggers a dynamic workflow run.

---

Run this as a workflow.

Input: `./competitors.json` lists [n] competitors with their URLs and trial-account notes. `./dimensions.md` defines what evidence each competitor folder must contain. Evidence I captured behind logins is already in `./evidence/<competitor>/`; public pages may be visited and captured with Playwright, and WebSearch may be used for pricing changes and launch dates.

Stage 1 — Collection: For each competitor, launch one `competitor-collector` agent that fills `./evidence/<competitor>/` against `dimensions.md`: ordered onboarding screenshots, the pricing page, verbatim positioning claims with URLs, and the core-flow captures. It writes a `manifest.md` listing every file, what it shows, and the date collected. Anything that could not be collected is recorded with the reason, not guessed.

Stage 2 — Extraction: One agent reads all folders and extracts cross-competitor patterns: onboarding step counts and sequence patterns, pricing structures and anchors, positioning themes, and recurring UI patterns worth naming in the pattern library.

Stage 3 — Cross-check: One agent audits every extracted statement whose evidence is marketing copy rather than an observed walkthrough, and labels it supported, contradicted, or unverified, citing the walkthrough evidence either way.

Output, using `comparison-matrix-template.md` as the structure: `comparison-matrix.md` (competitors as columns, dimensions as rows, every cell citing evidence files), `pattern-library.md` (named patterns with which competitors use them), `gaps.md` (things no competitor does well, with the evidence that suggests it), and `unverified-claims.md`. Do not include any cell without evidence; write "not collected" with the reason instead.
