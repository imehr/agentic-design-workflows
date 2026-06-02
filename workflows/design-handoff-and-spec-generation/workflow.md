# Handoff spec workflow prompt

Stage your inputs first:

```
handoff/<feature>/
  feature-brief.md            # what the feature is for, who builds it, target stack
  tokens.json                 # or a pointer to the token package
  component-inventory.md      # existing components the build should reuse
  screens/
    01-<screen>/
      design.png              # or a Figma frame link resolved via the Figma MCP server
      notes.md                # designer notes, prototype links, copy doc
  specs/                      # written by the screen agents
  packet/                     # written by the consolidation agent
```

Then paste the prompt below into Claude Code. Run it once, then save it from `/workflows` (press `s`) into `.claude/workflows/` so it becomes the `/handoff-spec` command.

---

Run this as a workflow.

Generate a developer handoff packet for the feature in `handoff/<feature>/`.

Steps:

1. For each folder under `handoff/<feature>/screens/`, dispatch one screen-spec agent (see `.claude/agents/screen-spec-writer.md`). Each agent gets its screen folder, `tokens.json`, `component-inventory.md`, and `feature-brief.md`, and writes `specs/<screen>.md` using the template in `templates/screen-spec.md`: layout redlines per breakpoint, token mapping, interaction states, accessibility annotations, edge cases, and acceptance criteria.
2. Dispatch a consolidation agent that merges the screen specs into `packet/handoff-packet.md` following `templates/handoff-packet.md`: feature overview, shared components table, per-screen specs, and `packet/open-questions.md` collecting every unresolved question.
3. Dispatch the developer-perspective reviewer (see `.claude/agents/dev-perspective-reviewer.md`) to read the packet as if it had to build it without access to the designer, and add an Ambiguities section listing anything it would have to guess: missing states, unmapped values, untestable acceptance criteria, conflicts between screens.

Rules:

- Map values to tokens wherever a token exists, and flag values that have none.
- Never invent behavior the design does not show — record it as an open question instead.
- Write acceptance criteria as testable statements that need no access to the designer to verify.
- Do not modify any source code in this run.
