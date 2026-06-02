# Localization Readiness Review — workflow prompt

Generate the pseudo-locale first:

```bash
node scripts/pseudo-localize.mjs
```

Then give Claude Code this prompt (adjust surfaces, locales, and paths to your project):

```
Run this as a workflow.

Review the checkout, account, and onboarding areas for localization readiness ahead of the
German, Japanese, and Arabic launches.

Inputs:
- Source under src/, string catalog at locales/en.json, pseudo-locale at locales/en-XA.json
  (from scripts/pseudo-localize.mjs)
- Key screens listed in l10n/screens.json with their routes and states
- Locale risk notes in l10n/locale-notes.md (expansion factors, RTL, legal lines per market)

Dispatch one agent per surface (use the l10n-surface-inspector definition) to find: hard-coded
strings, concatenated or fragment-assembled sentences, embedded variables without ICU
MessageFormat, fixed widths and single-line truncation on translatable text, and any text
rendered inside images.

Dispatch a formatting agent to find manual date, number, and currency formatting that should
use locale-aware APIs.

Dispatch an RTL agent to find physical CSS properties, direction-dependent icons, and layouts
that will not mirror.

Dispatch an expansion agent to start the app with the en-XA locale, render each screen in
l10n/screens.json with Playwright at 1440 and 390 px, save screenshots to l10n/output/pseudo/,
and report every layout that clips, overflows, or pushes a control out of view.

Each finding needs: surface, file or screen, risk class, affected locales, user impact,
estimated cost to fix after translation has started, and a concrete fix. Merge into
l10n/findings.md ranked by impact and cost-to-fix-late.

Flag iconography, color meaning, and legal copy questions for in-market review — do not
resolve them. Do not change any code or copy in this run.
```

After fixes, rerun the same prompt and compare the findings counts. Save the run to
`.claude/workflows/` as `/l10n-readiness` once the format works for your team.
