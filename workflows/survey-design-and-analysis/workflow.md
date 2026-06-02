# Survey Design and Analysis — workflow prompts

Two prompts: run stage one before launch, stage two after responses close.
The word "workflow" in the first line is what makes Claude Code write an
orchestration script and run subagents in the background.

---

## Stage one: design critique loop

```
Run this as a workflow.

Input: ./survey/brief.md (research questions and constructs) and
./survey/draft-v1.md (the question draft).

Stage 1 - Construct check: verify every question maps to a construct in the
brief and every construct has at least one question. List gaps and orphans.

Stage 2 - Critique loop: launch the survey-critic agent against the current
draft. For each finding it reports, propose a revised wording in
./survey/draft-v2.md, then run the critic again on the revision. Repeat up
to 3 rounds or until the critic reports only judgment calls.

Stage 3 - Pilot read-aloud: launch an agent that answers the final draft as
4 personas (rushed mobile respondent, non-native English speaker, power
user, recently churned user) and reports where each hesitates, misreads, or
has no honest answer option.

Output: ./survey/critique-report.md (all findings by round, with verbatim
wording and named biases), ./survey/draft-final.md, and
./survey/open-questions.md listing the judgment calls a human must decide.
Do not launch or send the survey; the researcher owns the launch decision.
```

---

## Stage two: analysis fan-out

```
Run this as a workflow.

Input: ./data/responses.csv (the survey export), ./analysis/codebook.md
(codes for the open-text questions), and ./survey/brief.md (the segments to
cut by — adjust the segment column names below to match your export).

Stage 1 - Per-segment analysis: for each segment value in plan_tier
(free, pro, enterprise) plus an "all" cut, launch one agent that runs
analyse-survey.mjs against the export with that filter and returns the
computed tables: n, completion rate, answer distributions per closed
question, and cross-tabs named in the brief. Never report a number the
script did not print.

Stage 2 - Open-text coding: launch an agent that codes the free-text
columns against the codebook. It returns { response_id, code,
verbatim_excerpt } plus counts per code. Excerpts must be copied exactly
from the export; if an excerpt cannot be found verbatim, it must not be
reported.

Stage 3 - Challenge: launch the claim-challenger agent against the draft
findings. It flags any claim resting on a cell under n=50, any percentage
quoted without its base, any generalization beyond who actually answered,
and any place stated preference is being treated as predicted behavior.

Output: ./output/findings.md (tables with bases and segments named),
./output/open-text-themes.md (codes, counts, verbatim excerpts with
response IDs), ./output/challenges.md, and ./output/report-notes.md
listing what a human still has to decide. Do not write the recommendation;
the researcher writes the report.
```
