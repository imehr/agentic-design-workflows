# Multi-Channel Asset Production

From one approved master concept to a matrix of channel assets — web hero, email module, paid social sizes, display banners, in-app banner — built as HTML/code templates and copy variants by per-asset agents working from a channel spec matrix. Every asset passes a brand-compliance gate that checks it against the brand guidelines (logo use, color tokens, type scale, tone, mandatory legal lines) before it reaches the human review board. Failures loop back to the producer with the violation named.

Full guide: https://agenticdesign.school/workflows/multi-channel-asset-production

## Prerequisites

- Claude Code with dynamic workflows enabled (include the word "workflow" in your prompt, or use `/effort ultracode`)
- An approved master concept and approved claims list — this workflow adapts, it does not invent
- Brand guidelines, design tokens (`tokens.json` or equivalent), and verbatim legal lines
- A filled-in channel spec matrix (see `channel-spec-matrix.json`)

## Files

| File | Purpose |
|---|---|
| `workflow.md` | The full prompt to give Claude Code to run production as a dynamic workflow |
| `channel-spec-matrix.json` | One row per asset: channel, format, output type, copy limits, mandatories, legal lines |
| `brand-check-rules.md` | The checkable rules the brand-compliance gate enforces |
| `agents/asset-producer.md` | Subagent that builds one asset from the concept, the guidelines, and one matrix row |
| `agents/brand-compliance.md` | Read-only subagent that gates every asset and names violations |

## How to run

1. Copy `agents/*.md` into your project's `.claude/agents/` directory.
2. Put the master concept at `concept/master-concept.md`, the brand files under `brand/`, and your filled-in matrix at `campaign/channel-spec-matrix.json`. Adapt `brand-check-rules.md` to your brand once; reuse it every campaign.
3. Paste the prompt from `workflow.md` into Claude Code.
4. Read `campaign/review-board.md`. The human review board judges craft and idea on the assets that passed; escalate the unresolved cases (claims that don't fit a format, needs-human-check items) rather than working around them.
5. Save the working script to `.claude/workflows/` so the next campaign starts from the matrix file.

## What this does not do

The gate enforces written rules over inspectable files. It does not art-direct, does not verify rendered visuals it cannot see, and does not replace client legal approval of claims.
