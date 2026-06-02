# Experiment readout: <experiment name>

- Pre-registration: `experiment/pre-registration.md` (signed <date>, by <name>)
- Run: <start date> to <end date> (<n> per arm reached: yes / no)
- Analysis scripts: <paths to the scripts whose output appears below>

---

## 1. What the data shows

Only numbers printed by the analysis scripts appear in this section.
Every figure carries its base and its confidence interval.

### Primary metric

| Arm | n | <primary metric> | 95% CI |
| --- | --- | --- | --- |
| Control | | | |
| Variant | | | |

Difference (variant − control): <value> (95% CI <low> to <high>)

### Guardrail metrics

| Guardrail | Control | Variant | Adverse direction? |
| --- | --- | --- | --- |
| | | | |

### Pre-registered segments only

| Segment | n (control / variant) | Difference | Note |
| --- | --- | --- | --- |
| | | | |

### Run timeline

- Assignment ratio over time:
- Weekly trend of the primary metric (novelty check):
- Anything that shipped mid-test:

---

## 2. Skeptic objections and dispositions

Published in full, whether or not they change the conclusion.

| # | Objection | Evidence | Disposition (fatal / caveat / withdrawn) |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |

---

## 3. What the team decides

This section is written by the team in the decision meeting, not by the
analysis. The data informed the call; the people below made it.

- Decision (ship / kill / iterate / rerun):
- Reasoning, including anything weighed beyond the primary metric:
- Follow-ups created (holdbacks, dedicated segment tests, instrumentation fixes):
- Decided by: <names>, <date>
