# Screenshot-to-Implementation Parity

Turn a reference screenshot or Figma export into working code without losing the design: extract a spec, map it to your own tokens, build, then run a parity gate that compares captured screenshots of the build back to the reference and reports observable mismatches until parity passes.

Full guide: https://agenticdesign.school/workflows/screenshot-to-implementation-parity

## What it does

- Extracts a parity spec from the reference: layout regions, type scale, spacing rhythm, color roles, components.
- Maps every reference value to your existing design tokens; gaps become recorded human decisions.
- Builds the screen from the spec using your component library only.
- Captures the build with Playwright at the reference viewport plus standard widths.
- Runs a parity check that exits only on PASS or PASS WITH ACCEPTED DIFFERENCES.

## Prerequisites

- Claude Code.
- Node.js 20+ and Playwright (`npm i -D playwright && npx playwright install chromium`).
- The app running locally with the target route reachable.
- A reference image at full resolution in `parity/reference/` (and the viewport it was designed at).

## Files

| File | Purpose |
|---|---|
| `workflow.md` | The full prompt to give Claude Code to run the build loop with the parity gate |
| `parity-spec-template.md` | Template the spec-extraction step fills in before any code is written |
| `capture-build.mjs` | Playwright script that captures the built route at standard viewports |
| `parity-report-template.md` | Format the parity check must follow, including the PASS/FAIL verdict |

## How to run

1. Put the reference image in `parity/reference/` and note the viewport it represents.
2. Open Claude Code and paste the prompt from `workflow.md`, filling in the route, token file, and component paths.
3. Review and approve the extracted `parity-spec.md` before the build starts (this is the cheapest review you will do).
4. Let the agent build, then run `node capture-build.mjs /your-route` and the parity check.
5. Approve patches in passes (structure, then rhythm and type, then color) until the verdict is PASS or PASS WITH ACCEPTED DIFFERENCES.
6. Sign off on the accepted-differences list; it is part of the deliverable.
