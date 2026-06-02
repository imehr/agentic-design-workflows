# agentic-design-workflows

Public code companion to the [Agentic Design School workflow library](https://agenticdesign.school/workflows) and *The Agentic Designer*.

Every workflow in the library has a folder here with runnable sample code: Claude Code dynamic workflow prompts, subagent definitions, capture scripts, and packet templates you can copy into your own project and run with Claude Code.

## Workflows

### Design

| Workflow | Folder | What it does |
| --- | --- | --- |
| Design system audit at scale | [`workflows/design-system-audit-at-scale`](workflows/design-system-audit-at-scale) | Fan out agents across every component to find token drift, inconsistency, and accessibility debt. |
| Visual QA regression sweep | [`workflows/visual-qa-regression-sweep`](workflows/visual-qa-regression-sweep) | Capture screenshots across viewports and states, compare against intent, and fix in passes. |
| Screenshot-to-implementation parity | [`workflows/screenshot-to-implementation-parity`](workflows/screenshot-to-implementation-parity) | Build from a reference screenshot and verify parity with evidence, not vibes. |
| Design token migration | [`workflows/design-token-migration`](workflows/design-token-migration) | Migrate hard-coded values and legacy tokens across hundreds of files with per-file agents and review gates. |
| Accessibility sweep | [`workflows/accessibility-sweep`](workflows/accessibility-sweep) | Codebase-wide accessibility audit with severity levels and fix-ready findings. |
| Multi-direction concept exploration | [`workflows/multi-direction-concept-exploration`](workflows/multi-direction-concept-exploration) | Draft several design directions in parallel, then have agents adversarially critique and score them. |
| Design QA on every PR | [`workflows/design-qa-on-every-pr`](workflows/design-qa-on-every-pr) | A saved /design-qa workflow command that checks changed screens, tokens, and accessibility on every branch. |
| Design handoff and spec generation | [`workflows/design-handoff-and-spec-generation`](workflows/design-handoff-and-spec-generation) | Generate developer-ready specs, redlines, and acceptance criteria from approved designs. |

### UX

| Workflow | Folder | What it does |
| --- | --- | --- |
| Heuristic evaluation at scale | [`workflows/heuristic-evaluation-at-scale`](workflows/heuristic-evaluation-at-scale) | Run a structured heuristic evaluation across every key flow with severity-ranked findings. |
| Usability test prep and synthesis | [`workflows/usability-test-prep-and-synthesis`](workflows/usability-test-prep-and-synthesis) | Prepare a study, then code sessions and synthesize traceable findings without invented quotes. |
| Journey mapping from product data | [`workflows/journey-mapping-from-product-data`](workflows/journey-mapping-from-product-data) | Build an evidence-based journey map from analytics, tickets, and interview themes. |

### Research

| Workflow | Folder | What it does |
| --- | --- | --- |
| Deep design research | [`workflows/deep-design-research`](workflows/deep-design-research) | Fan out searches across angles, cross-check sources, and return a cited research report. |
| User research synthesis | [`workflows/user-research-synthesis`](workflows/user-research-synthesis) | Turn interview transcripts into coded themes, insights, and an opportunity map. |
| Competitive teardown | [`workflows/competitive-teardown`](workflows/competitive-teardown) | Per-competitor walkthrough agents, pattern extraction, cross-checked claims, and a comparison matrix. |
| Content and UX writing audit | [`workflows/content-and-ux-writing-audit`](workflows/content-and-ux-writing-audit) | Sweep product copy for voice, terminology, and clarity issues against a content style guide. |

### Agency & Marketing

| Workflow | Folder | What it does |
| --- | --- | --- |
| Brand campaign concept sprint | [`workflows/brand-campaign-concept-sprint`](workflows/brand-campaign-concept-sprint) | Develop campaign territories in parallel, adversarially critique them, and shortlist for the creative director. |
| Multi-channel asset production | [`workflows/multi-channel-asset-production`](workflows/multi-channel-asset-production) | Turn one approved concept into a channel asset matrix with a brand-compliance gate on every asset. |
| Landing page and CRO audit | [`workflows/landing-page-cro-audit`](workflows/landing-page-cro-audit) | Section-by-section landing page audit producing a prioritized hypothesis backlog with A/B variants. |

## How the samples are organised

Each workflow folder contains:

- `README.md` — what the workflow does, prerequisites, and how to run it with Claude Code
- `workflow.md` — the prompt you give Claude Code to run it as a dynamic workflow (save good runs to `.claude/workflows/` to reuse them as a `/command`)
- `agents/*.md` — subagent definitions to copy into your project's `.claude/agents/`
- Scripts and templates (capture scripts, codebooks, spec matrices, report templates) referenced by the matching article

## Requirements

Most samples target [Claude Code](https://code.claude.com) v2.1.154+ with dynamic workflows enabled. Capture scripts use Node 20+ and Playwright. Research workflows need the WebSearch tool available.

## License

MIT — see [LICENSE](LICENSE).
