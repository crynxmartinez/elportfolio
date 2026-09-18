/* Project studies.
   `stack` and `performance` are measured from the live deployments, so they
   can be stated as fact. `role`, `duration`, `whatWorked`, `whatIdChange` and
   `results` are left undefined until Raphael fills them in from what actually
   happened - each renders only when present, so an empty field shows nothing
   rather than a plausible-sounding guess. Concepts have no client results by
   definition and should stay that way. */

export type CaseStudy = {
  challenge: string;
  approach: string;
  details: string[];
  constraints?: string[];
  decisions?: { h: string; p: string }[];
  stack?: string[];
  performance?: string;
  role?: string;
  duration?: string;
  whatWorked?: string;
  whatIdChange?: string;
  results?: string;
};

export const CASE_STUDIES: Record<string, CaseStudy> = {
  marea: {
    challenge:
      "Explore how a coastal resort could be introduced as a place to experience, with atmosphere and a clear sense of location.",
    approach:
      "The concept uses an image sequence tied to scrolling, restrained typography and a destination-led visual narrative. The visitor controls the pace of the reveal.",
    details: [
      "Cinematic resort imagery",
      "Scroll-driven visual sequence",
      "Editorial hospitality presentation",
    ],
    constraints: [
      "A scroll-driven image sequence is heavy by nature — the experience had to stay watchable without shipping a video-sized payload",
      "Hospitality imagery carries the emotional weight, so compression could not visibly degrade it",
      "The reveal needed to remain usable for visitors who prefer reduced motion",
    ],
    decisions: [
      {
        h: "Let the visitor control the pace",
        p: "Tying the reveal to scroll position rather than autoplay means nobody waits through an animation they did not ask for, and the sequence can be skimmed or savoured.",
      },
      {
        h: "Typography carries the brand, not effects",
        p: "Editorial type and generous spacing do the positioning work. The motion supports the imagery instead of competing with it.",
      },
    ],
    stack: ["Next.js", "Deployed on Vercel", "WebP imagery"],
    performance:
      "Measured on the live deployment: 14KB of HTML, first response in roughly 1.4s, both images in WebP and lazy-loaded, only 2 scripts on the page.",
  },
  kingvet: {
    challenge:
      "Explore a warmer, more memorable way to introduce a veterinary service without losing the practical information a pet owner needs.",
    approach:
      "An illustrated visual direction establishes the personality. Service information and an appointment-request concept bring the experience back to a useful next step.",
    details: [
      "Illustrated clinic concept",
      "Service-led content structure",
      "Appointment enquiry direction",
    ],
    constraints: [
      "Warmth cannot come at the cost of clarity — a worried pet owner needs hours, services and a way to book, fast",
      "Illustration had to feel friendly without reading as childish for a medical service",
    ],
    decisions: [
      {
        h: "Personality first, then logistics",
        p: "The illustrated direction sets tone in the first screen, but every section resolves to something practical: what is offered, and how to ask for an appointment.",
      },
    ],
    stack: ["Next.js", "Deployed on Vercel"],
  },
  opervia: {
    challenge:
      "Present technical services to agency owners who need to understand what can be built and how it fits their operations.",
    approach:
      "The website organizes the service offering around technical implementation and GHL-related work. Clear sections help visitors move from the offer to a conversation.",
    details: [
      "Agency-focused messaging",
      "Structured service presentation",
      "GHL and custom development positioning",
    ],
    constraints: [
      "The audience is technical buyers, so vague capability language would have actively hurt credibility",
      "The offering spans implementation, portals and automation — it had to be structured without becoming a wall of features",
    ],
    decisions: [
      {
        h: "Structure over persuasion",
        p: "Agency owners are evaluating whether the work can actually be delivered. Sections are organised so a visitor can find the specific capability they came for rather than being walked through a pitch.",
      },
    ],
    stack: ["Next.js", "Deployed on Vercel"],
    performance:
      "Measured on the live deployment: first response in roughly 0.6s. Images are not yet served as WebP and are not lazy-loaded — the clearest available improvement on this build.",
  },
};
