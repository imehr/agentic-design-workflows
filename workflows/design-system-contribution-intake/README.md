# Design System Contribution Intake

A repeatable intake pipeline for new component and pattern proposals. An overlap agent checks whether the need is already covered by existing components or compositions, an impact agent estimates how many product surfaces would adopt it, and a spec agent drafts the API, tokens, states, and accessibility requirements. The output is a review packet for the design system council, who make the decision and record the reasoning.

Full guide: https://agenticdesign.school/workflows/design-system-contribution-intake

## Prerequisites

- Claude Code installed and authenticated
- The design system source and pattern documentation in the repo (or workspace)
- Product code the impact agent may search for current usages and workarounds
- A design system council (or equivalent decision owner) who reviews the packets

## Files

| File | Purpose |
| --- | --- |
| `workflow.md` | The full prompt to give Claude Code to run the intake as a dynamic workflow |
| `agents/overlap-analyst.md` | Subagent that checks coverage by existing components or compositions — copy into `.claude/agents/` |
| `agents/impact-analyst.md` | Subagent that estimates adoption from real product code — copy into `.claude/agents/` |
| `agents/spec-drafter.md` | Subagent that drafts the component API, tokens, states, and accessibility requirements — copy into `.claude/agents/` |
| `templates/intake-proposal-template.md` | The proposal form contributors fill in |
| `templates/council-packet-template.md` | The packet skeleton the workflow assembles for the council |

## How to run

1. Copy the three files in `agents/` into your project's `.claude/agents/` directory.
2. Copy the templates into your repo (e.g. `intake/`), and have the proposing team fill in the proposal template.
3. Update the paths in `workflow.md` (proposal file, system source, pattern docs, product directories, packet output).
4. Paste the contents of `workflow.md` into Claude Code. The word "workflow" triggers a dynamic workflow; you can also run with `/effort ultracode`.
5. The workflow assembles the council packet. The council decides — accept, accept narrowed, redirect to composition, or decline — and records the reasoning in the packet.
6. Save the working orchestration to `.claude/workflows/` so every future proposal runs through the identical pipeline.

Expect roughly 1–2 hours of agent time per proposal, plus council review.
