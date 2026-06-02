# Workflow prompt: landing page and CRO audit

Run the capture script first (see README), then paste the prompt below into Claude Code from the project root. The word "workflow" tells Claude Code to orchestrate this as a background dynamic workflow script with one subagent per page section.

---

Run a landing page audit workflow for the page captured in audit/evidence/.

Inputs:
- audit/evidence/page-390.png and page-1440.png, dom.html, axe.json, lighthouse.json,
  ga4-page.csv (if any of these are missing, treat the missing analytics or checks as a finding)
- audit/page-context.md (who the traffic is, what the page is supposed to get them to do,
  and the offer's real constraints)
- Section reviewer definitions in .claude/agents/: hero, social-proof, pricing, form, footer,
  accessibility, analytics

Orchestration:
1. Fan out the seven reviewer agents in parallel; each reads only the evidence folder and
   its own checklist, and writes its findings to audit/sections/<name>.md.
2. Run a merge pass: deduplicate overlapping findings, keep the strongest evidence for each,
   and assemble audit/hypothesis-backlog.md using audit/hypothesis-backlog-template.md.
3. Prioritize by expected impact on the page's stated job, weighted by effort — but mark
   priority as a starting point for the human owner, not a final ranking. Measurement gaps
   (missing or broken conversion events) go first when they exist.
4. Return only the backlog to the conversation.

Rules:
- Every item must be phrased as a hypothesis ("We believe that [change] will [effect]
  because [evidence]") with a proposed variant and an effort estimate.
- Do not claim guaranteed conversion improvements.
- Do not propose changes to the offer itself; flag offer problems as questions for the owner.
- When the run is done, offer to save this orchestration script to .claude/workflows/ as a
  reusable command.
