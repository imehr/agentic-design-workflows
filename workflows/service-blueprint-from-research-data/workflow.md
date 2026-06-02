# Service blueprint workflow prompt

Paste the prompt below into Claude Code from the project root. Adjust the service name, file paths, and phase list before running.

---

Run this as a workflow.

Input: `./evidence` contains research summaries, an anonymized ticket sample (CSV), ops runbooks, process docs, and stakeholder interview notes for the [service name] journey. `./blueprint-template.yaml` defines the phases and lanes.

Stage 1 — Extraction: For each evidence file, launch one agent (use the `evidence-extractor` agent) that reads only that file. It returns moments in a shared format: `{ phase_guess, actor, action, what_customer_sees, handoff, source_file, supporting_excerpt }`. Excerpts must be copied verbatim from the source. If the file says nothing about a phase, return nothing for it.

Stage 2 — Lanes: Launch one agent per lane (customer actions, frontstage, backstage, support processes, evidence) using the `blueprint-lane-writer` agent. Each drafts its lane across all phases using only the extracted moments, citing source files per step, and marking steps as single-source where only one file supports them. Backstage steps must name the frontstage moment they support and any handoff across the line of internal interaction.

Stage 3 — Gaps: A separate agent reviews the assembled blueprint and writes `gaps.md`: lanes or phases with thin evidence, steps where sources contradict each other (quote both), and steps that appear in runbooks but never in customer-facing evidence or vice versa.

Output: `output/blueprint.yaml` following the template, `output/blueprint.html` as a rendered grid with citations and gap flags visible, and `output/gaps.md` ordered by how much workshop time each gap deserves.

Rules:
- Every step must cite at least one source file from `./evidence`.
- Do not invent steps to fill empty cells; leave them empty and list them in `gaps.md`.
- Where sources conflict, include both versions and flag the conflict instead of choosing one.
