# Journey Mapping from Product Data

A dynamic workflow that builds an evidence-based journey map from analytics exports, support tickets, session recording notes, and interview themes. Per-source evidence agents extract moments and signals with citations, a synthesis agent assembles stages, actions, emotions, and pain points with every claim linked to its evidence, and a challenge agent flags stages where the evidence is too thin to trust.

Full guide: https://agenticdesign.school/workflows/journey-mapping-from-product-data

## What it does

1. Reads a manifest describing the journey, the staged data exports, and known gaps.
2. Fans out per-source evidence agents (batched for large ticket or note sets) that extract cited evidence items into a shared schema.
3. Merges everything into an evidence ledger with stable IDs.
4. Synthesizes a journey map where every cell cites its evidence IDs.
5. Runs a challenge pass that marks thin, single-source, or contradicted claims as UNVERIFIED and lists the gaps.

## Prerequisites

- Claude Code installed and authenticated.
- Exported, anonymized data staged locally: an analytics funnel or event export (for example from Amplitude), a support ticket export, session recording notes, and interview themes if research exists. Remove identities before anything reaches the workflow.
- A one-paragraph definition of where the journey starts and ends.

## Files

| File | Purpose |
| --- | --- |
| `workflow.md` | The full prompt to run this as a Claude Code dynamic workflow |
| `agents/evidence-extractor.md` | Subagent that extracts cited evidence items from one source batch |
| `agents/journey-synthesizer.md` | Subagent that assembles the map with evidence IDs on every cell |
| `agents/challenge-reviewer.md` | Subagent that flags thin or contradicted claims as UNVERIFIED |
| `templates/evidence-item.json` | The shared evidence schema every extractor writes into |
| `examples/manifest.json` | Example journey manifest you adapt to your data |

## How to run with Claude Code

1. Copy `agents/*.md` into `.claude/agents/` in your project (dot-prefixed folders are not included in this repo, so copy them yourself).
2. Stage your anonymized exports and adapt `examples/manifest.json` into `journey/<name>/manifest.json`.
3. Paste the contents of `workflow.md` into Claude Code. The word "workflow" makes Claude run it as a dynamic workflow (or use `/effort ultracode`).
4. After a successful run, open `/workflows`, select the run, and press `s` to save it into `.claude/workflows/` as `/journey-map`, then re-run it on fresh exports each quarter.
5. Hold the review session: walk the stages, decide what to do about each UNVERIFIED cell, and assign owners to the top pain points.
