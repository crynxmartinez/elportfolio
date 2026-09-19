// Content modes shared by the blog writer and both social posters.
//
// Everything used to come out as a case study, which made the whole feed one
// shape. These five rotate instead. The most valuable of them is `reasoning` -
// how a decision actually got made is the one thing a competitor cannot copy
// and a model cannot generate convincingly from nothing.
//
// Note on `exposure`: it means showing concrete, checkable mechanics - real
// markup, real public data, what a broken thing actually looks like. It does
// NOT mean claiming private findings, client data or audits that did not
// happen. Anything presented as observed has to be genuinely verifiable or
// genuinely generic.

import { METHOD, VOICE_GUARDRAILS } from "./voice.mjs";

export const MODES = [
  {
    id: "education",
    label: "Education",
    social: `Teach ONE concept properly, so the reader finishes actually understanding something they did not before.
- Pick a single idea, not a list of tips. Depth over coverage.
- Define it in plain language first, before any jargon.
- Explain the mechanism - WHY it works this way, not just that it does.
- Assume an intelligent reader who simply has not worked in this area.
- Do not hedge into vagueness. Commit to a clear explanation.`,
    blog: `This article TEACHES one concept thoroughly. Structure it as an explainer: what the thing is, how it actually works underneath, where people get it wrong, and how to tell whether yours is right. Depth on one idea, not a survey of ten.`,
  },
  {
    id: "exposure",
    label: "Exposure",
    social: `Show what is normally hidden - the concrete mechanics behind something people only see the surface of.
- Show the actual thing: the markup, the setting, the number, the specific mechanism.
- Concrete beats abstract every time. "Your canonical tag points at the staging URL" beats "technical SEO issues".
- Only present something as observed if it is genuinely verifiable or genuinely general. Never invent a private finding, a client audit, or data you do not have.
- The reader should feel they were shown something, not told something.`,
    blog: `This article SHOWS what is normally hidden - the actual mechanics beneath a surface-level topic. Use concrete examples: real markup, real settings, real public data you verified. Never invent private findings or client data. The reader should come away having seen how the thing actually works, not having been told it matters.`,
  },
  {
    id: "analysis",
    label: "Analysis",
    social: `Take something real apart and explain what is actually going on underneath.
- Start from a real, checkable thing: a public dataset, a documented change, a measurable pattern.
- Do the work of interpretation. What does this actually mean, and what does it NOT mean?
- Name the limits of the conclusion. Where could this reading be wrong?
- Analysis without a clear conclusion is just description. Land somewhere.`,
    blog: `This article ANALYSES something real - a documented change, a public dataset, a measurable industry pattern. Interpret it rather than summarise it: what it means, what it does not mean, where the common reading is wrong, and where your own conclusion could be wrong.`,
  },
  {
    id: "reasoning",
    label: "How I think",
    social: `Show the reasoning itself - how a decision actually got made, not just what was decided.
- Walk through the real trade-off: what the options were, what pulled each way.
- Say what was REJECTED and why. The discarded option is usually the interesting part.
- Include the uncertainty honestly. What was a judgment call rather than a clear answer?
- This is the least copyable content there is. A competitor can restate your advice; they cannot reconstruct how you weigh things.
- First person throughout. This is a mind working, not a framework being presented.`,
    blog: `This article shows REASONING - how a real decision or judgment gets made in this area. Lay out the actual trade-offs, what you would reject and why, where the honest uncertainty sits, and what would change your mind. Not a framework handed down; a mind working through something.`,
  },
  {
    id: "case-study",
    label: "Case study",
    social: `Tell it as a situation: what was happening, what was actually wrong underneath, what resolved it.
- The business is a COMPOSITE - a realistic pattern, not a named real client. Do not invent a company name, a person, or a specific result figure.
- Give it one concrete, slightly odd, plausible detail so it reads as a real situation rather than a template.
- The diagnosis is the interesting part, not the outcome.`,
    blog: `This article works through a situation in depth: what was happening, what was wrong underneath, what resolved it, and what generalises from it. Any business described is a composite pattern, not a named real client - no invented company names, people, or specific result figures.`,
  },
];

export function getMode(id) {
  return MODES.find((m) => m.id === id);
}

/* Rotates by least-recently-used across the supplied history, so the feed does
   not sit in one mode for weeks. Falls back to the first unused mode. */
export function pickMode(log, key = "mode") {
  const recent = log
    .map((entry) => entry[key])
    .filter(Boolean)
    .reverse();

  const unused = MODES.filter((m) => !recent.includes(m.id));
  if (unused.length) return unused[Math.floor(Math.random() * unused.length)];

  let oldest = MODES[0];
  let oldestIndex = -1;
  for (const mode of MODES) {
    const idx = recent.indexOf(mode.id);
    if (idx > oldestIndex) {
      oldestIndex = idx;
      oldest = mode;
    }
  }
  return oldest;
}

/* Reasoning mode gets his real, stated method injected, because invented
   reasoning is the one thing this mode cannot survive. The guardrails apply
   to every mode - they record two things he does NOT have, learned by asking
   rather than guessing. */
export function modeContext(mode) {
  const parts = [];
  if (mode.id === "reasoning") parts.push(METHOD);
  parts.push(VOICE_GUARDRAILS);
  return parts.join(`

`);
}
