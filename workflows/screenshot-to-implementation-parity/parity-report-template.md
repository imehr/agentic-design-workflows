# Parity report: <screen name> — iteration <n>

## Verdict
PASS | PASS WITH ACCEPTED DIFFERENCES | FAIL

## Mismatches (observable only)

| # | Region | Severity | What differs (with values) | Smallest patch |
|---|---|---|---|---|
| 1 | Pricing cards | P1 | Internal padding 24px; spec requires 32px | Set card padding to space-8 token |
| 2 | FAQ section | P2 | Body renders 18/28; spec maps body to 16/24 token | Use text-body token on FAQ copy |

Severity scale: P0 task-breaking, P1 hierarchy or rhythm, P2 polish, P3 judgment for a human.

## Accepted differences (deliberate token mapping)

| # | Region | Reference value | Our token | Why accepted |
|---|---|---|---|---|
| 1 | Card shadow | Custom 0 8px 30px | elevation.2 | Nearest elevation token; no new shadow values allowed |

## Open decisions for a human
- <anything the reference never showed and the build had to assume>

## Next pass scope
- <which mismatches the next patch pass will address, in order>
