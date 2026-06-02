# Hypothesis backlog — [page] — [date]

Every entry uses the format below. An item that cannot name its evidence or its proposed variant is not ready for the backlog. Priority order is a starting point for the page owner, not a verdict; measurement gaps come first when they exist.

---

## H-NN — [Section]: [short title]

- Section: [Hero | Social proof | Pricing | Form | Footer | Accessibility | Analytics]
- Observation: [What the evidence shows.] Evidence: [file(s) and element/line it rests on]
- Why it matters: [Connection to the page's stated job from page-context.md]
- Hypothesis: We believe that [change] will [expected effect] because [evidence].
- Proposed variant: [Concrete enough to brief a test from this line]
- Effort: [S | M | L]
- Status: hypothesis — to be validated by an A/B test, not by this audit.

---

## Example

## H-03 — Form: reduce required fields

- Section: Form
- Observation: The trial signup form requires 11 fields including phone and company size.
  Evidence: page-1440.png, dom.html (form#trial-signup), ga4-page.csv shows 68% of form
  starters do not submit.
- Why it matters: The page's job is trial starts; every unjustified field adds friction at
  the moment of highest intent.
- Hypothesis: We believe that reducing required fields to email, name, and password will
  increase completed signups, because the dropped fields are not used in onboarding and the
  abandonment data shows starters quitting mid-form.
- Proposed variant: 3 required fields; move phone and company size to an optional
  post-signup step.
- Effort: S (form config + one analytics event)
- Status: hypothesis — to be validated by an A/B test, not by this audit.
