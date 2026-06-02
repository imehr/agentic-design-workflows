# Workflow prompt: brand campaign concept sprint

Paste the prompt below into Claude Code from the project root. The word "workflow" tells Claude Code to orchestrate this as a background dynamic workflow script rather than working in one context window.

---

Run a concept sprint workflow for the campaign described in sprint/campaign-brief.md.

Inputs:
- sprint/campaign-brief.md (working brief, including claims constraints and stances)
- sprint/brand-guidelines.md (voice, logo, color, typography rules)
- The agent definitions in .claude/agents/concept-author.md and .claude/agents/territory-critic.md
- sprint/scoring-rubric.md

Orchestration:
1. For each stance in the brief, run one concept-author agent in parallel and in isolation.
   Each writes its territory package to sprint/territories/<stance>.md. Authors must never
   see another territory.
2. For each territory, run territory-critic agents with three lenses: brief fit,
   brand and audience, and legal/claims. Critics never review a territory they authored.
   Save all critiques to sprint/critiques.md.
3. Run a scoring pass that applies sprint/scoring-rubric.md, marks any claims or brand
   violations as disqualifying (with the offending line quoted), and writes sprint/shortlist.md
   containing: weighted scores per territory, the strongest objection to each, disqualifications,
   blend candidates, and open questions for the creative director.
4. Return only the shortlist report to the conversation. Keep territory drafts and individual
   critiques on disk.

Rules:
- Do not pick a winning territory.
- Do not soften critiques; the critic's job is to find where a territory fails the brief.
- Flag every claims risk explicitly, quoting the line and the constraint it breaks.
- When the run is done, offer to save this orchestration script to .claude/workflows/ as a
  reusable command.
