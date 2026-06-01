# Fix list: <product area>

Ranked P0 → P3. Every entry must quote the string exactly and name where it lives.
Work the list in passes: terminology first, errors second, tone and readability third.

| Severity | Location | Current string | Rule broken | Suggested rewrite | Owner | Status |
|---|---|---|---|---|---|---|
| P1 | errors.payee_invalid | "Error 4012: transaction declined by issuer" | Error anatomy: no next step | "We couldn't complete this transfer. Check the recipient's details and try again." |  | Open |
| P1 | home.cta_send | "Send" | Terminology: transfer is canonical | "Transfer" |  | Open |
| P2 | onboarding.welcome_body | (grade 11 paragraph) | Readability above grade 9 | (rewrite at grade 6, keep both required disclosures) |  | Open |
| P2 | onboarding.step3_body | (3 concatenated fragments + variable) | Localization: concatenation | Restructure as one string with a named placeholder |  | Open |

Severity definitions:
- **P0** — misleads or blocks the user.
- **P1** — inconsistent terminology or rule break on a primary flow.
- **P2** — tone, readability, or localization drift.
- **P3** — polish.
