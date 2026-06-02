# Contribution intake workflow prompt

Paste the prompt below into Claude Code after adjusting the paths for your repository and the proposal being processed. Including the word "workflow" triggers a dynamic workflow; alternatively run with `/effort ultracode`.

---

Run this as a workflow.

Process the contribution proposal at `intake/proposals/<proposal-file>.md` through the intake pipeline.

Stage 1 — overlap: dispatch the overlap agent against `packages/ui/src` and the pattern docs in `docs/patterns/`. Report whether the need is fully covered, partially covered, or not covered, with the components or compositions that cover it and a worked example if composition is the answer. If fully covered, skip stages 2 and 3 and assemble the packet with a "redirect to composition" recommendation.

Stage 2 — impact: dispatch the impact agent across `apps/` to find surfaces showing this need today (custom implementations, repeated compositions, or workarounds). Report counts per product area and a conservative adoption estimate.

Stage 3 — spec: dispatch the spec agent to draft the component API (props, slots, variants), the semantic tokens it would consume, the interaction states, and the accessibility requirements, informed by stages 1 and 2.

Assemble `intake/packets/<proposal-file>.md` using `intake/council-packet-template.md`: proposal summary, overlap report, impact report, draft spec, and a recommendation (accept, accept narrowed, redirect to composition, decline) with confidence and the evidence behind it.

Do not modify any source code. The design system council makes the decision, not this workflow.

---

## Notes

- The stages run in sequence because each can end the pipeline early; within the impact stage the agent may fan out across product areas (up to 16 concurrent subagents, 1,000 per run, resumable).
- Save the working run to `.claude/workflows/` (project) or `~/.claude/workflows/` (personal) so every proposal is investigated by the same standard.
- The three subagent definitions live in `agents/`; copy them to `.claude/agents/` first.
