# SEO Content Brief Research

A Claude Code dynamic workflow that produces evidence-based content briefs for writers — not auto-generated articles. Per-query agents research what currently ranks and why, an intent agent classifies what searchers want, a coverage agent maps gaps, a sources agent collects citable references, and the assembled brief goes to the writer and SEO lead, who make the calls.

Full guide: https://agenticdesign.school/workflows/seo-content-brief-research

## What it produces

- `briefs/research/` — per-query SERP notes, intent classification, coverage map, sources list
- `briefs/output/<query>.md` — the brief: audience, search intent, recommended structure, questions to answer, internal links, sources, success measures

Claims about "what works in SEO" stay observational (what ranking pages share). Rankings are never guaranteed, and the workflow never recommends keyword stuffing or content produced primarily for search engines rather than readers.

## Prerequisites

- Claude Code installed and signed in, with WebSearch available (the research stage requires it)
- Optional but recommended: a Search Console export, the site's sitemap, positioning/messaging docs, editorial standards in `briefs/inputs/`

## Files in this folder

| File | Purpose |
|---|---|
| `workflow.md` | The full prompt to give Claude Code to run this as a dynamic workflow |
| `agents/serp-researcher.md` | Subagent definition for per-query SERP research |
| `agents/intent-classifier.md` | Subagent definition for search intent classification |
| `content-brief-template.md` | The brief structure the assembler fills in |
| `serp-research-checklist.md` | What the SERP agent records per ranking page |

## How to run it

1. Copy the files in `agents/` into your project's `.claude/agents/` folder.
2. Copy `content-brief-template.md` and `serp-research-checklist.md` into your project root.
3. Create `briefs/inputs/` and add the Search Console export, sitemap, and positioning docs you have.
4. Open Claude Code and paste the prompt from `workflow.md`, replacing the example query and audience with yours. The word "workflow" triggers the background orchestration script.
5. Review the first brief carefully against the research files; have the SEO lead confirm the intent call and success measures before batching multiple queries.
6. Save the working script to `.claude/workflows/` so producing a brief becomes a reusable command.

## Boundaries

The SEO lead decides which topics to pursue, the writer owns the voice and argument, and claims approval stays with whoever approves claims. Quality and originality are the durable strategy; this workflow gathers evidence, it does not promise rankings.
