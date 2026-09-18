/* One entry per service, each with its own page. A single combined /services
   page was trying to rank for three unrelated buyer intents at once (someone
   searching "website designer" and someone searching "GoHighLevel developer"
   are not the same visitor), and gave neither enough room to answer real
   questions. /services now acts as the index. */

export type Service = {
  slug: string;
  nav: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  intro: string;
  who: string[];
  scope: string[];
  process: { h: string; p: string }[];
  honesty: string;
  related: { label: string; href: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: "website-design",
    nav: "Website design",
    title: "Website design & development",
    metaTitle: "Website Design & Development — Raphael Martinez",
    metaDescription:
      "Responsive website design and development for service businesses. Clear services, explorable work, accessible and fast by default, with an easy next step for the visitor.",
    eyebrow: "Service / Website design",
    heading: "Make your work clear.",
    intro:
      "Most service businesses do not lose enquiries because their website is ugly. They lose them because a visitor cannot tell what is offered, cannot find proof it was done well before, or cannot see an obvious next step. The build starts there, not with a template.",
    who: [
      "Your current site was built years ago and nobody has touched it since",
      "The work you do is better than the way the site presents it",
      "Visitors arrive, look around, and leave without contacting you",
      "You are launching something new and there is nothing to show yet",
    ],
    scope: [
      "Page structure, content hierarchy and visual design",
      "Responsive development, project galleries and image handling",
      "Accessible markup, keyboard navigation and reduced-motion support",
      "Forms and agreed integrations",
      "Technical SEO foundations — metadata, structured data, sitemap, canonical URLs",
      "Handover, including how to edit and who owns what",
    ],
    process: [
      {
        h: "Understand",
        p: "What the business actually sells, who is buying, and what the site needs to do that it currently is not doing.",
      },
      {
        h: "Define",
        p: "Pages, content responsibilities, integrations and what 'finished' means — agreed in writing before any design work starts.",
      },
      {
        h: "Design & build",
        p: "You review the direction before it is built out. Then the responsive build, with the agreed workflows connected.",
      },
      {
        h: "Test & hand over",
        p: "Devices, links and enquiry flows are checked, then we walk through managing it yourself.",
      },
    ],
    honesty:
      "A new website does not by itself produce enquiries, and I will not promise that it will. What it can do is stop losing the ones you are already earning — by being clear, fast, and easy to act on.",
    related: [
      { label: "SEO & competitor research", href: "/services/seo-competitor-research" },
      { label: "GHL systems & automation", href: "/services/gohighlevel-development" },
      { label: "See the work", href: "/portfolio" },
    ],
  },
  {
    slug: "seo-competitor-research",
    nav: "SEO research",
    title: "SEO & competitor research",
    metaTitle: "SEO & Competitor Research — Raphael Martinez",
    metaDescription:
      "Research-led SEO: what customers actually search, where competitors answer better, which pages deserve attention first, and the technical foundations underneath.",
    eyebrow: "Service / SEO research",
    heading: "Help people find answers.",
    intro:
      "SEO work goes wrong when it starts with keywords instead of questions. The useful version starts by finding what your customers actually type, which of those questions nobody in your market answers properly, and which pages on your site are closest to deserving the traffic.",
    who: [
      "You rank for your business name and almost nothing else",
      "Competitors with worse work are easier to find than you are",
      "You publish content but cannot tell whether any of it works",
      "You want to know what is worth fixing before spending on it",
    ],
    scope: [
      "Technical audit — indexing, metadata, structured data, headings, internal links, page speed",
      "Competitor content review and gap analysis",
      "The real questions customers ask, mapped to pages that could answer them",
      "A prioritised list: what to fix first, what can wait, what is not worth doing",
      "Implementation of the technical fixes, by agreement",
      "Ongoing content and review, scoped separately",
    ],
    process: [
      {
        h: "Audit",
        p: "What the site currently does well technically, and what is quietly holding it back.",
      },
      {
        h: "Research",
        p: "Search questions, competitor coverage, and where the genuine gaps are for your market.",
      },
      {
        h: "Prioritise",
        p: "A short list ordered by effort against likely impact, rather than a hundred-item report nobody reads.",
      },
      {
        h: "Implement",
        p: "Fix the technical issues, then build or improve the pages that were identified as worth it.",
      },
    ],
    honesty:
      "Rankings cannot be guaranteed by anyone, and I will not quote a position or a traffic number. Research tells you where the opportunities are and what is currently broken. It does not promise that Google will agree.",
    related: [
      { label: "Website design & development", href: "/services/website-design" },
      { label: "Articles on SEO and conversion", href: "/blog" },
      { label: "GHL systems & automation", href: "/services/gohighlevel-development" },
    ],
  },
  {
    slug: "gohighlevel-development",
    nav: "GHL systems",
    title: "GHL systems & automation",
    metaTitle: "GoHighLevel Development & Automation — Raphael Martinez",
    metaDescription:
      "GoHighLevel implementation for service businesses: enquiry forms, booking, pipelines and follow-up connected to your website, with custom development where the workflow needs it.",
    eyebrow: "Service / GHL systems",
    heading: "Keep the conversation going.",
    intro:
      "Automation fails when it is added on top of a process nobody has written down. The first job is describing what actually happens when an enquiry arrives — who responds, how fast, what happens if nobody does. Then GoHighLevel has something real to automate.",
    who: [
      "Enquiries arrive but follow-up depends on someone remembering",
      "Your website and your CRM do not talk to each other",
      "You have GHL already and are using a fraction of it",
      "Leads go cold in the gap between the form and the first reply",
    ],
    scope: [
      "Mapping the current enquiry-to-client process as it really runs",
      "Enquiry forms and booking connected to the website",
      "Pipeline structure, contact organisation and tagging",
      "Follow-up workflows, agreed before they are built",
      "Custom development where GHL's built-in tools do not reach",
      "Testing, documentation and handover so you can run it without me",
    ],
    process: [
      {
        h: "Map",
        p: "Write down the process that exists today, including the parts that only work because someone is paying attention.",
      },
      {
        h: "Design the flow",
        p: "Decide what should be automatic, what should stay human, and what should simply be deleted.",
      },
      {
        h: "Build & connect",
        p: "Forms, pipelines and workflows built and wired to the site, using custom code where the native tools fall short.",
      },
      {
        h: "Test & document",
        p: "Run real enquiries through the whole path, then document it so the system is yours, not a black box.",
      },
    ],
    honesty:
      "Automation makes a good process faster and a bad process fail faster. If the underlying process is unclear, I will say so and we will fix that first — which sometimes means a smaller build than you expected.",
    related: [
      { label: "Website design & development", href: "/services/website-design" },
      { label: "SEO & competitor research", href: "/services/seo-competitor-research" },
      { label: "How a project runs", href: "/testimonials" },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
