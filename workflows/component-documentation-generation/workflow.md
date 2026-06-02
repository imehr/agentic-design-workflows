# Component documentation workflow prompt

Paste the prompt below into Claude Code after adjusting the paths for your repository. Including the word "workflow" triggers a dynamic workflow; alternatively run with `/effort ultracode`.

---

Run this as a workflow.

Generate documentation for every component in `packages/ui/src/components` against `docs/component-doc-template.md`.

For each component, dispatch one agent that:

- Reads the component source, types, styles, tests, and Storybook stories if present
- Finds real usages under `apps/` and `packages/` (excluding `packages/ui` itself) and groups them into patterns
- Drafts a doc page following the template exactly, citing the files it read
- Marks any template section it cannot support with evidence as "Gap: needs design system team input"
- Records known drift: props or behavior that differ from the existing docs in `docs/components/`

Then run one consistency agent that checks every draft for template compliance, consistent voice, and consistent prop-table format, and writes a summary of inconsistencies it fixed.

Output drafts to `docs/generated/<component>.mdx`. Do not overwrite `docs/components/` and do not publish; the design system team reviews the drafts first.

---

## Notes

- The orchestration script Claude writes keeps the inventory and every draft in its own variables, so a 50-component system fits in one run (up to 16 concurrent agents, 1,000 per run, resumable).
- Save the working run to `.claude/workflows/` (project) or `~/.claude/workflows/` (personal) to reuse it as a command on the next refresh.
- The per-component agent definition lives in `agents/component-documenter.md`; copy it to `.claude/agents/` first.
