# Stakeholder Workshop Prep — workflow prompt

Folder structure per workshop:

```
workshop-prep/<session-name>/
├── brief.md          # goal, the decision the session must produce, constraints, date, duration
├── attendees.md      # names, roles, departments — provided by you, not researched by the agent
├── inputs/           # research, analytics exports, strategy docs, meeting notes
├── output/           # written by the workflow
└── review-notes.md   # what you corrected at each stage
```

Then give Claude Code this prompt (adjust the folder, duration, and attendee count):

```
Run this as a workflow.

Prepare the workshop described in workshop-prep/<session-name>/brief.md.

Stage 1 — Evidence: read everything in inputs/ and write output/pre-read.md: what we already
know, organized to suit the session, with a source citation (file and page or row range) for
every claim, plus an explicit list of open questions the workshop should answer. Maximum 4 pages.
Use the workshop-evidence-writer agent definition.

Stage 2 — Stakeholders: from attendees.md and the meeting notes only, write
output/stakeholder-map.md: who is in the room, what each person or department is accountable
for, what they are likely to want from this session, and where the notes show disagreement or
tension. Use only the provided material; if the material does not say, write "unknown".
Do not infer personality, motives, or anything not evidenced in the inputs.

Pause for my review of stages 1 and 2 before continuing.

Stage 3 — Agenda: draft output/agenda.md for the stated duration and attendee count: timed
blocks, exercises, who speaks when, facilitation notes, and a plan B if the main exercise
overruns. Use templates/agenda-template.md as the structure.

Stage 4 — Materials: produce output/boards/ as FigJam-ready CSVs (one row per sticky: text,
section, color) for each exercise, a printable one-page exercise instruction sheet, and
output/parking-lot.md.

Do not contact anyone, do not look up attendees online, and do not present any of this as
final — I review and own every artifact.
```

Save the run to `~/.claude/workflows/` as `/workshop-prep` (or to the project's
`.claude/workflows/` if the whole team preps the same way).
