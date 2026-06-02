# Workflow prompt: multi-channel asset production

Paste the prompt below into Claude Code from the project root. The word "workflow" tells Claude Code to orchestrate this as a background dynamic workflow script (per-asset agents in concurrent waves, intermediate results kept out of the conversation).

---

Run an asset production workflow for the campaign defined in campaign/channel-spec-matrix.json.

Inputs:
- campaign/channel-spec-matrix.json (one row per asset: channel, format, output type, copy limits, mandatories)
- concept/master-concept.md (the approved concept: message, visual direction, approved claims)
- brand/brand-guidelines.md, brand/brand-check-rules.md, brand/tokens.json
- Agent definitions in .claude/agents/asset-producer.md and .claude/agents/brand-compliance.md

Orchestration:
1. For every row in the matrix, run an asset-producer agent (in concurrent waves) that builds
   the asset in the row's output format — HTML template, email module, HTML5 banner, or
   copy-and-spec package — into campaign/assets/<id>/.
2. Pass every asset through the brand-compliance agent. On failure, send the asset back to
   its producer with the violations attached. Maximum two retries per asset; after that,
   mark it for human attention with the outstanding violations listed.
3. Write campaign/review-board.md summarizing every asset's status, attempts, and any
   outstanding violations or needs-human-check items.
4. Return only the review-board summary to the conversation. Keep assets and individual
   check reports on disk.

Rules:
- The compliance agent never edits assets; it only reports pass/fail with named violations.
- Do not relax copy limits or legal-line rules to make an asset pass; escalate instead.
- A missing or altered legal line is always a failure, never a warning.
- When the run is done, offer to save this orchestration script to .claude/workflows/ as a
  reusable command.
