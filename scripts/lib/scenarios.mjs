// Shared pool of composite client-scenario seeds for the business story
// content (FB long-form posts + LinkedIn case-study PDFs). Each entry is a
// realistic, common pattern Raphael actually sees doing web design + SEO for
// small businesses - not a specific real client. Content generated from
// these must stay honest about that: illustrative/composite, not a named,
// verifiable individual or business.

export const SCENARIOS = [
  { businessType: "a local dental clinic", problem: "an outdated site that wasn't mobile-friendly and was quietly losing new-patient inquiries" },
  { businessType: "a small independent real estate agency", problem: "a website that didn't rank anywhere on Google, even for searches in their own city" },
  { businessType: "a family-owned restaurant", problem: "a slow-loading site that was costing them online reservations" },
  { businessType: "a boutique law firm", problem: "a site with no clear way for a visitor to actually get in touch" },
  { businessType: "a home services and HVAC contractor", problem: "not showing up at all in local \"near me\" Google Maps searches" },
  { businessType: "a local hair and beauty salon", problem: "a site that looked and felt years behind their newer competitors" },
  { businessType: "an independent insurance agent", problem: "a website with no fresh content, so their search rankings kept slipping every month" },
  { businessType: "a boutique retail shop", problem: "generic stock photos and a cookie-cutter template that didn't build any trust" },
  { businessType: "a veterinary clinic", problem: "no analytics set up at all, so the owner had no real idea what was working online" },
  { businessType: "a general contractor", problem: "a cluttered, confusing site that buried their phone number and service area" },
  { businessType: "a local roofing company", problem: "a site built years ago that had never been touched since, and Google had started ignoring it" },
  { businessType: "a small law practice", problem: "no local SEO at all, so competitors with worse work were simply easier to find" },
];

export function pickScenario(log) {
  const usedKeys = new Set(log.map((e) => e.key));
  const unused = SCENARIOS.filter((s) => !usedKeys.has(`${s.businessType}|${s.problem}`));
  const pool = unused.length ? unused : SCENARIOS; // whole pool told once - start over
  return pool[Math.floor(Math.random() * pool.length)];
}

export function scenarioKey(s) {
  return `${s.businessType}|${s.problem}`;
}
