# Prompt: Screenshot-to-Implementation Parity (single-agent build loop with parity gate)

Paste the prompt below into Claude Code from the repo root. Fill in the route, token file, and component paths first. For a batch of many screens, ask for it as a workflow (or run `/effort ultracode`) so Claude orchestrates one build loop per screen in the background.

---

Implement the screen in `parity/reference/desktop.png` (designed at 1440px) at route `/pricing`, and do not call it done until the parity gate passes.

Step 1 — Extract a spec.
Fill in `parity-spec-template.md` as `parity-spec.md` from the reference image: layout regions with measurements, grid, type scale, spacing rhythm, color roles, and the components you can identify. Map every color and type value to existing tokens in `tokens.css` and existing components in `src/components`. Where the reference cannot be expressed in the current system, record it under "decisions needed" instead of inventing a value. Stop and show me the spec for approval before writing any code.

Step 2 — Build from the approved spec.
Use only existing components and tokens. Use the real content from `content/pricing.json`. Follow the layout regions, type scale, and spacing rhythm exactly. For open decisions, choose the most conservative option and note it in `build-notes.md`. Do not invent new tokens, components, or colors.

Step 3 — Capture the build.
Run `node capture-build.mjs /pricing` to capture the route at 1440, 768, and 390 widths into `parity/build/`.

Step 4 — Parity gate.
Compare `parity/reference/desktop.png` with `parity/build/reference-1440.png` against `parity-spec.md`. Report observable mismatches only, in the format of `parity-report-template.md`: region, what differs, measured or estimated values, severity (P0 task-breaking, P1 hierarchy or rhythm, P2 polish, P3 judgment), and the smallest patch. List expected token-mapping differences separately as accepted. End with a verdict: PASS, PASS WITH ACCEPTED DIFFERENCES, or FAIL.

Step 5 — Patch in passes.
On FAIL, patch in this order: layout and responsive structure, then type scale and spacing rhythm, then color and polish. Recapture and re-run the gate after each pass. Exit the loop only on PASS or PASS WITH ACCEPTED DIFFERENCES, and wait for my sign-off on the accepted-differences list.
