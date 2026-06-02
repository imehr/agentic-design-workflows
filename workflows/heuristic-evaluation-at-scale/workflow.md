# Heuristic evaluation workflow prompt

Paste the prompt below into Claude Code, edited for your product. The word "workflow" in the first line is what triggers a dynamic workflow run.

---

Run this as a workflow.

Input: `./flows.json` lists our key flows (for example: onboarding, login, send-money, pay-bill, statements, settings, support). `./heuristics.md` is the heuristics file (Nielsen NN-01 to NN-10 plus the project heuristics). `./evidence/<flow>/` holds ordered screenshots for each flow. The staging build is at https://staging.example.com and may be inspected with Playwright.

Stage 1 — Evaluation: For each flow, launch one `heuristic-evaluator` agent that walks the flow step by step using the screenshots and, where states are missing (errors, empty states, validation), the staging build. It returns findings as `{ flow, step, heuristic_id, observation, evidence, candidate_severity (1-4), suggested_fix }`. Every finding must cite a screenshot filename or a described action in the staging build. Do not report a finding without evidence. Do not assign final severity; mark all severities as candidate.

Stage 2 — Merge: The `findings-merger` agent combines all findings, dedupes problems that recur across flows into one finding with multiple locations, groups by heuristic, and ranks by candidate severity then frequency. It also lists heuristics with zero findings, so the team can see what was checked and passed.

Output: `findings.md` (the merged, ranked report), `findings.csv` (one row per finding), and `coverage.md` (which flows, steps, and heuristics were evaluated). Do not change any UI or code as part of this run.
