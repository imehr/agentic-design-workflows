# Interactive Prototype Sprint

Go from a brief plus a design harness (tokens, components, sample data) to a working coded prototype designers can put in front of users — in roughly half a day. Scope to the riskiest assumption, build a focused happy-path prototype, fan out 2–3 variants only where the design question genuinely differs, run a blocker-only visual QA pass on each, and package them behind a simple index page for testing sessions.

Prototypes built with this workflow are throwaway evidence, not production code. They are archived after the session readout.

Full guide: https://agenticdesign.school/workflows/interactive-prototype-sprint

## Prerequisites

- Claude Code installed and authenticated
- A prototype harness: a small app (Vite, Next.js, or similar) with your design tokens, a usable subset of your components, realistic sample data, and a one-command dev server
- A capture script (Playwright or similar) for the visual QA pass — a starter is included
- A real session on the calendar: usability tests, customer interviews, or a stakeholder review

## Files

| File | Purpose |
| --- | --- |
| `workflow.md` | The full prompt to give Claude Code to run the sprint as a dynamic workflow |
| `agents/prototype-builder.md` | Subagent definition for the build loop — copy into `.claude/agents/` |
| `templates/prototype-brief-template.md` | The brief: the question, the riskiest assumption, the happy path, variants, out of scope |
| `scripts/proto-capture.mjs` | Starter Playwright capture script for the build loop and QA pass |

## How to run

1. Copy `agents/prototype-builder.md` into your project's `.claude/agents/` directory.
2. Fill in `templates/prototype-brief-template.md` and save it into your harness repo (e.g. `prototypes/briefs/<name>.md`).
3. Add `scripts/proto-capture.mjs` to the harness and wire it to an `npm run proto:capture` script; adjust routes and widths.
4. Update the paths in `workflow.md` (brief file, harness path) and paste it into Claude Code. The word "workflow" triggers a dynamic workflow; you can also run with `/effort ultracode`.
5. Walk the happy path yourself in each variant before the session, at the device width the session will use.
6. Run the session, write the readout against the riskiest assumption, then archive the prototype. Save the orchestration to `.claude/workflows/` for the next sprint.
