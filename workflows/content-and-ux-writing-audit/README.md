# Content and UX Writing Audit

Sweep product copy — buttons, empty states, errors, onboarding, emails — against a content style guide. One agent audits each surface; findings are merged into a terminology map, a severity-ranked fix list, and a localization risk log. The style guide itself becomes the agent instruction file, so the rules used to audit are the same rules used to review new copy later.

Full guide: https://agenticdesign.school/workflows/content-and-ux-writing-audit

## Prerequisites

- Claude Code. For a single product area, plain subagent fan-out is enough; for a whole-product sweep, run it as a dynamic workflow (include the word `workflow` in the prompt or use `/effort ultracode`).
- Exported strings: locale files (`en.json`, `strings.xml`), email templates, and Figma text exports, grouped by surface.
- A content style guide, or willingness to adapt the rules in `agents/copy-auditor.md` to your product.

## Files

| File | Purpose |
|---|---|
| `workflow.md` | The full prompt to run the audit as a dynamic workflow. Save to `.claude/workflows/` as `/copy-audit`. |
| `agents/copy-auditor.md` | The style guide rewritten as a checkable subagent definition. Copy into your project's `.claude/agents/` and replace the example fintech rules with your own. |
| `terminology-map-template.md` | The keystone artifact: canonical term per concept, variants found, locations, status. |
| `fix-list-template.md` | Severity-ranked fix list format the merge stage should fill in. |

## How to run

1. Adapt `agents/copy-auditor.md` to your style guide and get the content owner to sign off on the rules. Copy it into `.claude/agents/`.
2. Export strings into `./copy-audit/strings/`, grouped into `buttons-and-actions/`, `empty-states/`, `errors/`, `onboarding/`, `emails/`.
3. Paste `workflow.md` into Claude Code (or run the saved `/copy-audit` workflow).
4. Review the terminology map first, then P0/P1 findings, then localization risks. Decide contested terms with their owners and log exceptions.
5. Fix in passes (terminology, then errors, then tone), and re-run the audit on changed surfaces.

## What it cannot do

It measures consistency against your standard; it cannot prove the standard is right, certify legal or accessibility compliance, or test whether users understand the copy.
