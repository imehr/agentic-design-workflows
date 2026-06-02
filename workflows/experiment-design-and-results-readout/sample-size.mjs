#!/usr/bin/env node
// sample-size.mjs
// Two-proportion sample size per arm, normal approximation.
// Run this BEFORE launch and put the output in pre-registration.md.
// The model never estimates these numbers; it runs this script.
//
// Usage:
//   node sample-size.mjs <baselineRate> <minDetectableRelativeLift> [alpha] [power] [weeklyEligibleVisitors]
//   node sample-size.mjs 0.034 0.10
//   node sample-size.mjs 0.034 0.10 0.05 0.8 40000

const [, , baseArg, liftArg, alphaArg, powerArg, weeklyArg] = process.argv

if (!baseArg || !liftArg) {
  console.error("Usage: node sample-size.mjs <baselineRate> <minDetectableRelativeLift> [alpha] [power] [weeklyEligibleVisitors]")
  console.error("Example: node sample-size.mjs 0.034 0.10   (3.4% baseline, +10% relative lift)")
  process.exit(1)
}

const p1 = Number(baseArg)
const relativeLift = Number(liftArg)
const p2 = p1 * (1 + relativeLift)
const alpha = Number(alphaArg ?? 0.05)
const power = Number(powerArg ?? 0.8)
const weekly = weeklyArg ? Number(weeklyArg) : null

// Inverse standard normal CDF (Acklam's approximation).
function inverseNormal(p) {
  if (p <= 0 || p >= 1) throw new Error("p must be in (0,1)")
  const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716, 2.506628277459239]
  const b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572]
  const c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783]
  const d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416]
  const pLow = 0.02425
  const pHigh = 1 - pLow
  let q, r
  if (p < pLow) {
    q = Math.sqrt(-2 * Math.log(p))
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
  }
  if (p <= pHigh) {
    q = p - 0.5
    r = q * q
    return ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) /
      (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1)
  }
  q = Math.sqrt(-2 * Math.log(1 - p))
  return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
}

const zAlpha = inverseNormal(1 - alpha / 2)
const zBeta = inverseNormal(power)
const pBar = (p1 + p2) / 2

const numerator = (zAlpha * Math.sqrt(2 * pBar * (1 - pBar)) + zBeta * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2))) ** 2
const nPerArm = Math.ceil(numerator / (p2 - p1) ** 2)

console.log("# Sample size (two-proportion, normal approximation)")
console.log("")
console.log("Baseline rate:          " + p1)
console.log("Relative MDE:           +" + (relativeLift * 100).toFixed(1) + "%")
console.log("Target rate:            " + p2.toFixed(5))
console.log("Alpha (two-sided):      " + alpha)
console.log("Power:                  " + power)
console.log("")
console.log("Required n per arm:     " + nPerArm.toLocaleString("en-US"))
console.log("Required total (2 arms):" + " " + (nPerArm * 2).toLocaleString("en-US"))

if (weekly) {
  const weeks = Math.ceil((nPerArm * 2) / weekly)
  console.log("")
  console.log("At " + weekly.toLocaleString("en-US") + " eligible visitors/week split 50/50:")
  console.log("Estimated run length:   " + weeks + " week(s)")
  console.log("")
  console.log("Decide feasibility before launch. If the run length does not fit,")
  console.log("test a bolder change, accept a larger MDE, or do not run the test.")
}
