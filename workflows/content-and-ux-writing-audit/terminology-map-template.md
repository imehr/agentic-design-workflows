# Terminology map: <product area>

The keystone artifact. One row per concept; the canonical term is the only word new copy should use.
Log agreed exceptions (e.g. legal copy) here so they are not relitigated every audit.

| Concept | Canonical term | Variants found | Locations | Status |
|---|---|---|---|---|
| Account-to-account transfer | Transfer | Send (home screen CTA), Pay (contact detail), Move money (settings) | home.cta_send, contact.action_pay, settings.move_money_title | Fix list P1 |
| The user's money account | Account | Wallet (onboarding step 2), Profile balance (email receipt) | onboarding.step2_title, email/receipt.html | Fix list P1 |
| Person receiving money | Recipient | Payee (errors), Beneficiary (legal copy) | errors.payee_invalid, legal/terms section 4 | Exception logged (legal) |
| Scheduled future transfer | Scheduled transfer | Standing order (UK strings), Auto-pay (marketing email) | uk/en-GB.json, email/lifecycle-3.html | Decision needed |

Status values: `Fix list P0–P3` · `Exception logged (owner, date)` · `Decision needed (owner)`.
