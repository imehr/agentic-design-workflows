import { chromium } from "playwright"
import { AxeBuilder } from "@axe-core/playwright"
import { mkdir, writeFile } from "node:fs/promises"

// Routes in scope. Start with the flows where failure is most expensive.
const routes = [
  "/checkout",
  "/checkout/payment",
  "/checkout/review",
  "/dashboard",
  "/forms/benefit-application",
]

const baseUrl = process.env.A11Y_BASE_URL || "http://localhost:3000"
const tabStops = 40

const browser = await chromium.launch()
const page = await browser.newPage()
const results = []

for (const route of routes) {
  await page.goto(baseUrl + route, { waitUntil: "networkidle" })

  const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag22aa"]).analyze()

  // Record the keyboard focus order so reviewers can compare it to the visual/task order.
  const focusOrder = []
  for (let i = 0; i < tabStops; i++) {
    await page.keyboard.press("Tab")
    focusOrder.push(
      await page.evaluate(() => {
        const el = document.activeElement
        if (!el || el === document.body) return "none"
        const name = el.getAttribute("aria-label") || el.textContent || el.getAttribute("name") || ""
        const visibleFocus = getComputedStyle(el).outlineStyle !== "none"
        return el.tagName.toLowerCase() + " | " + name.trim().slice(0, 40) + (visibleFocus ? "" : " | NO VISIBLE FOCUS")
      })
    )
  }

  results.push({
    route,
    violations: axe.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      description: v.description,
      nodes: v.nodes.map((n) => n.target.join(" ")),
    })),
    focusOrder,
  })

  console.log(route + ": " + axe.violations.length + " axe violations")
}

await browser.close()
await mkdir("a11y", { recursive: true })
await writeFile("a11y/scan-results.json", JSON.stringify(results, null, 2))
console.log("Wrote a11y/scan-results.json")
