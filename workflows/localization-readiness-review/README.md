# Localization Readiness Review

A Claude Code workflow that reviews UI and code for internationalization risk before a localization push: hard-coded strings, concatenated sentences, text-expansion breakage, truncation, date/number/currency formatting, RTL readiness, and items that need in-market or legal review.

Full guide: https://agenticdesign.school/workflows/localization-readiness-review

## What it does

- Fans out one inspector subagent per product surface plus cross-cutting formatting and RTL agents
- Generates a pseudo-localized string catalog (~35% longer, accented, bracketed) and re-renders key screens with Playwright to catch expansion and truncation breakage visually
- Ranks findings by user impact and cost to fix late
- Flags iconography, color-meaning, and legal-copy questions for in-market and legal review instead of deciding them

The workflow flags risk; translators and in-market reviewers make the language and cultural calls.

## Prerequisites

- Claude Code with dynamic workflows enabled
- Node.js 20+ and Playwright installed in the target project
- A string catalog (e.g. `locales/en.json`) — the review also finds what is missing from it
- A way to run the app locally with a swapped locale (most i18n libraries support an `en-XA` pseudo-locale)

## Files

| File | Purpose |
| --- | --- |
| `workflow.md` | The full prompt to give Claude Code to run this as a dynamic workflow |
| `agents/l10n-surface-inspector.md` | Read-only surface inspector subagent — copy into `.claude/agents/` |
| `scripts/pseudo-localize.mjs` | Generates `locales/en-XA.json` from your source catalog |
| `screens.example.json` | Example screen inventory the expansion agent renders |

## How to run

1. Copy `agents/l10n-surface-inspector.md` into your repo's `.claude/agents/` folder.
2. Run `node scripts/pseudo-localize.mjs` to generate the pseudo-locale.
3. Copy `screens.example.json` to `l10n/screens.json` and list your key screens, routes, and states.
4. Add `l10n/locale-notes.md` with the markets in scope (expansion factors, RTL, legal lines).
5. Paste the prompt from `workflow.md` into Claude Code; the word "workflow" triggers a dynamic workflow run.
6. Review the ranked findings with localization, design, and engineering; fix in passes; rerun.
7. Save the working run to `.claude/workflows/` as `/l10n-readiness`.
