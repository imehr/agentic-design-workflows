# Accessibility sweep finding format

Use this structure for `a11y/findings.md`. Keep the format identical between runs so passes are comparable.

## Summary (top of the file)

- Routes swept: {count}
- Total findings: {count}
- By severity: P0 {n} · P1 {n} · P2 {n} · P3 {n}
- Approved exceptions recorded: {n}

## Severity gate status

| Tier | Findings | Fixed | Re-verified |
|---|---|---|---|
| P0 | | | |
| P1 | | | |
| P2 | | | |
| P3 | | | |

## One block per finding, ranked by severity

```
P0 — {short title}
Route: /checkout/payment
File: src/components/PlaceOrderButton.tsx:18
Criterion: WCAG 1.4.3 Contrast (Minimum)
Source: axe rule color-contrast | judgment
Evidence: #8FB4FF on #FFFFFF measures 2.9:1; normal text requires 4.5:1.
Impact: Primary action is hard to read for low-vision users on the core purchase flow.
Fix: Use color.action.primary (#2456C4) for the button background; verify hover and disabled states.
```

## Approved exceptions

| Finding | Reason | Approved by | Review date |
|---|---|---|---|
| | | | |

## Manual checks still required

- {Screen reader walkthrough of the checkout flow with VoiceOver and NVDA}
- {Anything marked "needs manual check" by the reviewers}
