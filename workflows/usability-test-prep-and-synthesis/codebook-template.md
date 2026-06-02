# Session coding rules (codebook template)

These rules apply to every session-coder run. Keep them with the study files so synthesis is consistent across studies.

## Output shape per session

```json
{
  "participant": "P03",
  "task_outcomes": [
    { "task": "T1", "outcome": "success | partial | fail | not_attempted", "deciding_moment": "…", "moderator_prompted": false }
  ],
  "observations": [
    { "rq": "RQ2", "note": "…", "verbatim_quote": "…", "location": "18:32 or line 211" }
  ]
}
```

## Rules

1. Code only against the research question IDs in `research-questions.md`; never invent new questions.
2. Quotes are copied verbatim with participant ID and a timestamp or line reference. If the exact words cannot be found, report the observation without a quote.
3. Score each task outcome and name the moment in the session that decided it.
4. Distinguish what the participant did from what the participant said they would do.
5. Record moderator prompts that may have helped, so synthesis can weigh the outcome.
6. Never infer emotion or intent the participant did not express.
7. Anything notable that fits no research question goes into a separate "out of scope" list, not into a finding.
