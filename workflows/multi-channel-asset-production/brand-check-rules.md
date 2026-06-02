# Brand compliance rules — checked on every asset

Adapt this file to your brand once (an afternoon with the brand guidelines open), then reuse it on every campaign. Write rules as checks the gate can evaluate from files, not as aspirations.

## Logo and lockup
- Only the SVG lockups in /brand/logos/ may be used; no recreations or rasterized copies.
- Clear space: minimum 0.5x logo height on all sides. Reject if any element intrudes.
- Never place the logo over photography without the approved scrim treatment.

## Color
- Backgrounds and CTAs must use named tokens from brand/tokens.json (e.g. --brand-primary,
  --surface-warm). Reject any hard-coded hex value not present in the token file.
- Text over imagery must meet WCAG 2.2 AA contrast (4.5:1 body, 3:1 large text).

## Typography
- Only the type scale steps defined in brand/tokens.json. Reject ad-hoc font sizes.
- Headlines in the display family; body and legal lines in the text family.

## Tone
- Reject exclamation marks in headlines, all-caps body copy, and unapproved superlatives
  ("best", "#1", "guaranteed") unless quoted from the approved claims list.

## Legal lines
- legal-line-A (verbatim): "[exact approved sentence]" — required on web, email, display.
- legal-line-B (verbatim): "[exact approved sentence]" — required on display formats only.
- Reject any paraphrase, truncation, or font size below the minimum legible size for the format.

## Per-asset mandatories
- Check every item in the asset's matrix row: mandatories, copy length limits, dimensions or
  breakpoints, and output format.

## Output of a check
For each rule: pass or fail, the evidence (file, line, or element), and — on failure —
one sentence naming exactly what to change. If a rule cannot be checked from the files
(e.g. rendered contrast over imagery), report it as needs-human-check rather than guessing.
Never fix the asset.
