# Landing Page and CRO Audit

Audits a landing page section by section — hero, social proof, pricing, form, footer — plus accessibility and analytics passes, working from screenshots and the DOM. Section agents fan out in parallel and the results merge into a prioritized hypothesis backlog with proposed A/B variants. Every item is framed as a hypothesis to test, never a guaranteed conversion win.

Full guide: https://agenticdesign.school/workflows/landing-page-cro-audit

## Prerequisites

- Claude Code with dynamic workflows enabled (include the word "workflow" in your prompt, or use `/effort ultracode`)
- Node.js with Playwright installed (`npm i -D playwright && npx playwright install chromium`) for the capture script
- Optional but recommended: an axe-core run, a Lighthouse run, and a GA4 export for the page

## Files

| File | Purpose |
|---|---|
| `workflow.md` | The full prompt to give Claude Code to run the audit as a dynamic workflow |
| `capture-page.mjs` | Playwright script that captures screenshots at 390/1440 and saves the rendered DOM |
| `hypothesis-backlog-template.md` | The output format every finding must use |
| `agents/form-section-reviewer.md` | Example section reviewer (form/signup section) — duplicate and adapt for hero, social proof, pricing, footer, accessibility, analytics |

## How to run

1. Copy `agents/*.md` into your project's `.claude/agents/` directory, then duplicate the form reviewer into one reviewer per section (hero, social-proof, pricing, footer) plus accessibility and analytics reviewers, adjusting each checklist.
2. Write `audit/page-context.md`: who the traffic is, what the page must get them to do, and the offer's real constraints.
3. Capture evidence: `node capture-page.mjs https://example.com/landing`, then optionally `npx @axe-core/cli <url> --save audit/evidence/axe.json`, a Lighthouse JSON run, and a GA4 export into `audit/evidence/`.
4. Paste the prompt from `workflow.md` into Claude Code.
5. Read `audit/hypothesis-backlog.md`, reprioritize as the page owner, and pick the first tests. After changes ship, recapture with the same commands and re-run.

## What this does not do

It cannot prove what will convert — only a test against real traffic can — and it cannot fix an offer the audience does not want. Measurement gaps go to the top of the backlog because nothing else is testable until they are fixed.
