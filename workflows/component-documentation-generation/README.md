# Component Documentation Generation

Generate and refresh design system documentation from the source of truth — component code, tokens, and real usages across the product. One agent documents each component (props, variants, states, do/don't guidance mined from real usages, accessibility notes, known drift), and a consistency agent enforces a shared template and voice. Output is MDX/markdown drafts the design system team reviews before publishing.

Full guide: https://agenticdesign.school/workflows/component-documentation-generation

## Prerequisites

- Claude Code installed and authenticated
- A component library with readable source (and ideally type definitions) in your repo
- Product code in the same repo or workspace so usages can be mined
- A docs output directory (e.g. `docs/generated/`) the agents can write to

## Files

| File | Purpose |
| --- | --- |
| `workflow.md` | The full prompt to give Claude Code to run the documentation pass as a dynamic workflow |
| `agents/component-documenter.md` | Subagent definition — copy into `.claude/agents/` |
| `templates/component-doc-template.md` | The shared doc template every generated page follows |
| `scripts/list-components.mjs` | Optional helper that builds the component inventory as JSON |

## How to run

1. Copy `agents/component-documenter.md` into your project's `.claude/agents/` directory.
2. Copy `templates/component-doc-template.md` into your repo (e.g. `docs/component-doc-template.md`) and adjust the sections to your system.
3. Update the paths in `workflow.md` (component source directory, usage directories, output directory).
4. Paste the contents of `workflow.md` into Claude Code. The word "workflow" in the prompt triggers a dynamic workflow; you can also run with `/effort ultracode`.
5. Review the drafts in your generated-docs directory before publishing anything. Triage the "known drift" entries: fix the docs, fix the code, or record an intentional exception.
6. Save the working orchestration to `.claude/workflows/` so the next refresh is a single command.

Expect roughly 2–4 hours for a 50-component system, plus human review time.
