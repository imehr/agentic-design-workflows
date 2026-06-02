# Workflow prompt: SEO Content Brief Research

Paste the prompt below into Claude Code, replacing the example query, audience, and inputs with your own. WebSearch must be available. Copy the agent definitions from `agents/` into `.claude/agents/` first.

---

Run this as a workflow. WebSearch is required.

Target query: "crm migration checklist"
Audience: operations leads at 50-500 person companies planning a CRM switch.
Inputs: briefs/inputs/search-console-export.csv, briefs/inputs/sitemap.txt,
briefs/inputs/positioning.md.

Research stage (parallel agents):
- For the target query and 3-5 close variants, serp-researcher agents study the
  pages that currently rank: structure (headings), depth, format, freshness,
  and what they share. Keep findings observational; cite URLs. Do not guess why
  pages rank.
- An intent-classifier agent classifies the search intent and describes the
  searcher's situation and what would satisfy them, independently of any single
  ranking page.
- A coverage agent maps subtopics and questions competitors cover, skip, or
  answer badly, including People Also Ask style questions.
- A sources agent collects authoritative references the writer can verify and
  cite, with one line each on why the source is trustworthy.

Assembly stage: cross-check the SERP and intent findings, flag any disagreement
as a finding, and assemble briefs/output/crm-migration-checklist.md using
content-brief-template.md: audience, search intent, recommended structure,
questions to answer, internal link candidates taken only from the sitemap,
sources, and success measures framed as observable trends (rankings are not
guaranteed).

Do not write the article. Do not recommend keyword stuffing, doorway pages, or
any tactic aimed at search engines rather than readers.

---

## Notes

- Including the word "workflow" makes Claude Code write a background JavaScript orchestration script; per-query research stays in script variables and on disk, and only the brief returns to the conversation.
- For a batch, list the queries in `briefs/inputs/queries.txt` and ask the workflow to loop over them; up to 16 agents run concurrently.
- Save the working script to `.claude/workflows/` (project) or `~/.claude/workflows/` (personal) to reuse it as a slash command.
- `/deep-research` is the bundled general research workflow; this is the brief-shaped specialization of the same mechanics.
