# agentic-design-workflows

Public code companion to the [Agentic Design School workflow library](https://agenticdesign.school/workflows) and *The Agentic Designer*.

Every workflow in the library has a folder here with runnable sample code: Claude Code dynamic workflow prompts, subagent definitions, capture and analysis scripts, and packet templates you can copy into your own project and run with Claude Code.

## Workflows

### Design

| Workflow | Folder |
| --- | --- |
| Design system audit at scale | [`workflows/design-system-audit-at-scale`](workflows/design-system-audit-at-scale) |
| Visual QA regression sweep | [`workflows/visual-qa-regression-sweep`](workflows/visual-qa-regression-sweep) |
| Screenshot-to-implementation parity | [`workflows/screenshot-to-implementation-parity`](workflows/screenshot-to-implementation-parity) |
| Design token migration | [`workflows/design-token-migration`](workflows/design-token-migration) |
| Accessibility sweep | [`workflows/accessibility-sweep`](workflows/accessibility-sweep) |
| Multi-direction concept exploration | [`workflows/multi-direction-concept-exploration`](workflows/multi-direction-concept-exploration) |
| Design QA on every PR | [`workflows/design-qa-on-every-pr`](workflows/design-qa-on-every-pr) |
| Design handoff and spec generation | [`workflows/design-handoff-and-spec-generation`](workflows/design-handoff-and-spec-generation) |
| Component documentation generation | [`workflows/component-documentation-generation`](workflows/component-documentation-generation) |
| Design system contribution intake | [`workflows/design-system-contribution-intake`](workflows/design-system-contribution-intake) |
| Interactive prototype sprint | [`workflows/interactive-prototype-sprint`](workflows/interactive-prototype-sprint) |
| Design ops reporting | [`workflows/design-ops-reporting`](workflows/design-ops-reporting) |
| Localization readiness review | [`workflows/localization-readiness-review`](workflows/localization-readiness-review) |

### UX

| Workflow | Folder |
| --- | --- |
| Heuristic evaluation at scale | [`workflows/heuristic-evaluation-at-scale`](workflows/heuristic-evaluation-at-scale) |
| Usability test prep and synthesis | [`workflows/usability-test-prep-and-synthesis`](workflows/usability-test-prep-and-synthesis) |
| Journey mapping from product data | [`workflows/journey-mapping-from-product-data`](workflows/journey-mapping-from-product-data) |
| Service blueprint from research data | [`workflows/service-blueprint-from-research-data`](workflows/service-blueprint-from-research-data) |
| IA audit and card sort analysis | [`workflows/ia-audit-and-card-sort-analysis`](workflows/ia-audit-and-card-sort-analysis) |
| Cognitive walkthrough at scale | [`workflows/cognitive-walkthrough-at-scale`](workflows/cognitive-walkthrough-at-scale) |
| Stakeholder workshop prep | [`workflows/stakeholder-workshop-prep`](workflows/stakeholder-workshop-prep) |

### Research

| Workflow | Folder |
| --- | --- |
| Deep design research | [`workflows/deep-design-research`](workflows/deep-design-research) |
| User research synthesis | [`workflows/user-research-synthesis`](workflows/user-research-synthesis) |
| Competitive teardown | [`workflows/competitive-teardown`](workflows/competitive-teardown) |
| Content and UX writing audit | [`workflows/content-and-ux-writing-audit`](workflows/content-and-ux-writing-audit) |
| Survey design and analysis | [`workflows/survey-design-and-analysis`](workflows/survey-design-and-analysis) |
| Experiment design and results readout | [`workflows/experiment-design-and-results-readout`](workflows/experiment-design-and-results-readout) |
| Funnel and drop-off diagnosis | [`workflows/funnel-and-drop-off-diagnosis`](workflows/funnel-and-drop-off-diagnosis) |

### Agency & Marketing

| Workflow | Folder |
| --- | --- |
| Brand campaign concept sprint | [`workflows/brand-campaign-concept-sprint`](workflows/brand-campaign-concept-sprint) |
| Multi-channel asset production | [`workflows/multi-channel-asset-production`](workflows/multi-channel-asset-production) |
| Landing page and CRO audit | [`workflows/landing-page-cro-audit`](workflows/landing-page-cro-audit) |
| Brand identity system build | [`workflows/brand-identity-system-build`](workflows/brand-identity-system-build) |
| SEO content brief research | [`workflows/seo-content-brief-research`](workflows/seo-content-brief-research) |

## How the samples are organised

Each workflow folder contains:

- `README.md` — what the workflow does, prerequisites, and how to run it with Claude Code
- `workflow.md` — the prompt you give Claude Code to run it as a dynamic workflow (save good runs to `.claude/workflows/` to reuse them as a `/command`)
- `agents/*.md` — subagent definitions to copy into your project's `.claude/agents/`
- Scripts and templates (capture scripts, codebooks, spec matrices, report templates) referenced by the matching article

## Requirements

Most samples target [Claude Code](https://code.claude.com) v2.1.154+ with dynamic workflows enabled. Capture and analysis scripts use Node 20+ and Playwright. Research workflows need the WebSearch tool available.

## License

MIT — see [LICENSE](LICENSE).
