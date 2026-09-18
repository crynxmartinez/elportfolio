---
title: The Accessibility Problem Nobody Budgets For (Until a Letter Arrives)
excerpt: >-
  A look at what web accessibility actually costs businesses when they ignore it
  — in lost customers, lawsuits, and search visibility — and what fixing it
  really requires.
date: '2026-09-11'
readTime: 16 min read
faqs:
  - q: Does my small business website actually need to be ADA compliant?
    a: >-
      There's no small-business exemption written into the ADA itself, and
      lawsuits increasingly target companies far smaller than the national
      retailers that used to be the main targets. The safer framing isn't 'am I
      exempt' but 'am I actually excluding real visitors,' because that's the
      thing both the lawsuits and the lost customers have in common.
  - q: >-
      Will installing an accessibility overlay widget protect my site from
      lawsuits?
    a: >-
      The data on this is fairly direct: a large share of sites sued in 2025
      already had an overlay installed at the time they were sued. Overlays
      patch some surface issues but don't fix underlying markup, and plaintiffs'
      firms know exactly what an overlay badge looks like. Real compliance means
      fixing the actual code, not layering a script on top of it.
  - q: >-
      Isn't accessibility just a legal compliance issue, not a design or
      marketing one?
    a: >-
      It started as a legal and ethical issue, but the business case now stands
      on its own. Accessible sites tend to have cleaner semantic structure,
      better contrast, clearer navigation, and faster performance — all things
      that separately affect conversion and search visibility, independent of
      any legal risk at all.
  - q: >-
      How much does it actually cost to fix accessibility issues on an existing
      site?
    a: >-
      It depends entirely on how the site was built. Sites built on semantic
      HTML with a component library that already handles focus states and ARIA
      roles correctly need targeted fixes — contrast, alt text, form labels.
      Sites built from scratch with custom interactive elements and no
      accessibility consideration at all usually need a more structural pass.
      Either way, it's cheaper before launch than after a demand letter.
  - q: Does fixing accessibility issues help SEO at all?
    a: >-
      Indirectly, yes, and mostly because good accessibility practice and good
      technical SEO practice are frequently the exact same work: descriptive alt
      text, a logical heading hierarchy, meaningful link text, and fast load
      times. Neither one causes the other, but a site that gets one right
      usually gets a meaningful chunk of the other right by default.
coverImage: >-
  https://images.pexels.com/photos/9644689/pexels-photo-9644689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940
coverImageAlt: 'Tattooed hands typing on a laptop keyboard, focused and working.'
coverCredit:
  name: Liudmyla Shalimova
  url: 'https://www.pexels.com/@ludakavun'
---

Every business that owns a website has, at some point, had a version of the same conversation about it: how does it look, does it load fast, does the copy convert. Almost none of them have had the conversation this piece is actually about — can a screen reader user navigate the main menu, does a form field have a label a keyboard user can actually reach, is the contrast between the body text and the background high enough for someone with low vision to read it without straining.

That's not a niche concern held by a small number of edge-case visitors. It's a gap sitting in the middle of most premium websites, including plenty of genuinely well-designed ones, because accessibility rarely comes up in a design review unless someone on the team already has a personal reason to raise it. This piece is about what that gap actually costs — in lost customers, in legal exposure, and in the parts of technical SEO that quietly depend on the same underlying markup — and what actually closing it requires, as opposed to what a lot of businesses are currently being sold instead.

## The scale of the problem, in one number

Start with how common this actually is, because "some websites have accessibility issues" undersells it badly. The [2026 WebAIM Million report](https://webaim.org/projects/million/), which analyzes the home pages of the one million most-visited websites on the internet, found that the average home page has climbed back up to 56.1 detected accessibility errors, reversing several years of slow improvement, and that 95.9% of pages had at least one detectable WCAG failure. These aren't obscure or abandoned sites. As the report's authors note, these are among the most influential, highest-traffic pages on the entire web, and nearly all of them fail a basic automated accessibility scan.

That figure only counts what an automated tool can catch — things like missing alt text, low contrast, and unlabeled form fields. It doesn't catch every real barrier a human using a screen reader or a keyboard would hit. In other words, the true rate of inaccessible design is very likely higher than the number the report is even able to measure. If nearly every major website has this problem, it's not a sign that businesses are unusually careless. It's a sign that accessibility simply isn't part of the normal design and build process most agencies and DIY builders follow — which means the businesses that do get it right are working from a real, measurable position of difference, not just a compliance checkbox.

## Who's actually affected, and how many people that is

It's worth being concrete about who's on the other side of that 95.9% figure, because "accessibility" gets treated in a lot of marketing conversations as a small, specific audience — wheelchair users, mostly, in people's mental shorthand — when the real population is both larger and more varied than that.

According to [the CDC's most recent Disability and Health Data System update](https://www.cdc.gov/disability-and-health/articles-documents/disability-and-health-data-now.html), more than a quarter of adults in the United States — 28.7%, or roughly 70 million people — report having a functional disability affecting hearing, vision, mobility, cognition, self-care, or independent living. Cognitive disability, which covers serious difficulty concentrating, remembering, or making decisions, is now the single most common category, and disability prevalence rises sharply with age, reaching nearly 44% of adults 65 and older. That last detail matters more than it might seem for a lot of the businesses this site is built for: a custom home builder, a private wealth advisor, or a luxury real estate developer is disproportionately marketing to an older, more affluent audience — exactly the demographic where age-related vision and mobility changes are most common. A site that's hard to use for someone with low vision or reduced fine motor control isn't excluding a marginal group. For a lot of premium businesses, it may be excluding a meaningful share of the exact clientele the site was built to attract.

## What actually happens when a visitor hits a barrier

The abandonment data on this is older but strikingly consistent, and it comes from a source built specifically to measure it. The [Click-Away Pound Survey](https://www.clickawaypound.com/cap16finalreport.html), a UK research project focused specifically on the online shopping behavior of disabled consumers, found that 71% of disabled customers with access needs will click away from a website they find difficult to use, and that those customers represented an estimated £11.75 billion in UK online spending power going to competitors instead — roughly 10% of total UK online spend at the time. The same research found that 82% of customers with access needs said they'd spend more if websites were more accessible, and identified the specific reasons people leave: pages crowded with too much content, poor navigation and link information, badly designed forms, distracting motion, and poor contrast or legibility.

Read that list again next to a typical premium design brief. Crowded pages, unclear navigation, distracting motion, low-contrast typography for aesthetic effect — these aren't obscure accessibility failures. They're common outcomes of design decisions made purely for visual effect, without anyone in the room asking whether the choice holds up for a visitor with low vision or a cognitive processing difference. A more recent industry survey cited by [Level Access's research on the curb-cut effect](https://www.levelaccess.com/uncategorized/the-curb-cut-effect-how-digital-accessibility-elevates-ux-for-everyone/) found that a large majority of accessibility professionals report clear links between digital accessibility and improved customer satisfaction, stronger brand reputation, and higher customer retention — which is the same conclusion the older UK research reached from a completely different angle: accessible design isn't a tax on the experience. It's part of what makes the experience work at all.

## The part almost nobody talks about until it happens to them: lawsuits

Separate from the customer-experience argument, there's a legal one, and it's grown fast enough recently that it deserves its own section rather than a footnote. According to [Seyfarth Shaw's litigation tracking](https://www.adatitleiii.com/2026/03/federal-court-website-accessibility-lawsuit-filings-bounce-back-in-2025/), website accessibility lawsuits accounted for 36% of all ADA Title III lawsuits filed in federal court in 2025 — 3,117 cases out of 8,667 total — up from 28% the year before, a 27% year-over-year jump that reversed two prior years of decline. Once state court filings are included, total digital accessibility litigation for the year topped 5,000 cases, and this litigation has more than tripled since 2017.

A few details from that data are worth sitting with specifically. First, per [Level Access's analysis](https://www.levelaccess.com/blog/2024-u-s-web-accessibility-litigation-key-trends-and-strategies-for-mitigating-risk/), no industry is exempt — recent filings span online retail, food service, hospitality, and home goods, categories that include plenty of small and mid-sized owner-run businesses, not just national chains. Second, this is disproportionately driven by a small number of repeat plaintiffs and firms rather than a broad wave of individual complaints; industry reporting on 2025 filings found that a concentrated group of law firms was responsible for the overwhelming majority of cases filed, which means these are, in practical terms, run as a systematic search-and-file operation rather than organic individual grievances. That doesn't make the underlying barriers less real for the people who hit them, but it does explain why any business with an inaccessible site is a plausible target regardless of size or intent.

Third — and this is the detail that should reshape how a lot of businesses think about "fixing" this — a meaningful share of sites sued in 2025 already had an accessibility overlay widget installed at the time of the lawsuit. Widgets that promise instant compliance through an injected script are a real, heavily marketed product category, and the litigation data suggests they don't reliably prevent the exact outcome they're sold to prevent, because they patch surface symptoms without touching the underlying markup that both screen readers and plaintiffs' own automated scanning tools actually evaluate.

## Why overlays are the wrong fix, and what the right one looks like instead

It's worth explaining why overlays underperform, because the logic matters more than the conclusion. A screen reader doesn't read a page the way a sighted visitor sees it — it reads the underlying HTML structure: heading tags in order, form labels tied to their inputs, image alt attributes, ARIA roles applied correctly to custom components. An overlay script runs on top of that structure after the page loads, attempting to patch gaps in real time using pattern recognition and automated guesses. It can sometimes catch a genuinely missing alt attribute. It generally cannot fix a heading hierarchy that skips from an H1 straight to an H4 for visual reasons, or a custom dropdown built without keyboard support, or a modal that traps focus incorrectly — because those are structural problems, not surface ones, and structural problems live in the code itself, not in a layer sitting on top of it.

This is also, not coincidentally, why overlays and genuine accessibility work overlap so heavily with genuine technical SEO work. A logical heading hierarchy helps both a screen reader user understand page structure and a search engine crawler understand what the page is actually about. Descriptive alt text helps both a blind visitor understand an image and an image search crawler index it correctly. Fast, lean pages help both a visitor on an assistive device — many of whom are on older hardware or slower connections — and a visitor being measured for Core Web Vitals. None of this means accessibility work is secretly an SEO tactic; the goals are genuinely different. But the actual technical labor of doing accessibility properly and doing technical SEO properly draws from the same well: clean, honest, semantic markup, built rather than bolted on.

## The curb-cut effect, applied to a website instead of a sidewalk

There's a useful piece of framing that comes from outside web design entirely, worth borrowing here because it reframes the whole conversation away from "compliance" and toward "better design, full stop." In the 1970s, disability activists in Berkeley, California pushed the city to install small ramps at street corners so wheelchair users could cross without being stranded at the curb. Once installed, [those ramps turned out to benefit far more people than the group they were built for](https://uxdesign.cc/the-curb-cut-effect-universal-design-b4e3d7da73f5) — parents with strollers, delivery workers with hand trucks, travelers with rolling luggage, cyclists. The pattern got a name: the curb-cut effect, the observation that features built to remove a barrier for one group often end up improving the experience for nearly everyone.

The same pattern shows up constantly in accessible web design, and it's worth naming a few concrete examples because they make the argument better than the abstraction does. Captions built for deaf users get used constantly by people watching video with the sound off in a public place. High contrast text built for low-vision users is also easier to read on a phone screen in direct sunlight. Clear, simple navigation built for a visitor with a cognitive disability is also just easier and faster navigation for a rushed visitor on a slow connection, or a first-time visitor who's never seen the site before and doesn't want to think hard to find the contact page. Fast, lightweight pages built to work well with assistive technology load faster for literally everyone, on every device, on every connection speed. None of this is a coincidence — it's the same underlying pattern the Berkeley ramps demonstrated fifty years earlier, applied to a browser instead of a sidewalk.

## What this actually looks like built into a real site, not bolted on after

Given all of that, it's worth being specific about what building this in from the start actually involves, because it's a meaningfully different process than remediating a finished site after a complaint arrives.

**Semantic structure first.** A page built with proper heading hierarchy — one H1, logically nested H2s and H3s beneath it, no skipped levels chosen purely because a smaller heading looked better visually — does double duty. It's the backbone a screen reader uses to let a visitor jump directly to the section they care about, and it's the same backbone a search crawler uses to understand what the page is actually structured to say. This has to be a decision made at the template level, not something patched in during a final QA pass.

**Contrast treated as a design constraint, not a suggestion.** Per the [WebAIM Million data](https://medium.com/@andrea_codes/webaim-million-report-common-web-accessibility-issues-and-how-to-fix-them-55fb0672b9bb), low-contrast text remains the single most common accessibility failure across the entire web, present on the large majority of homepages tested. Low-contrast type often gets chosen deliberately for aesthetic restraint — soft gray text on a white background reads as elegant in a mockup. The fix isn't abandoning restraint; it's checking every text-and-background pairing against the actual WCAG contrast ratio requirements before a design gets approved, not after a scan flags it.

**Every interactive element reachable by keyboard alone.** Custom dropdowns, modal overlays, scroll-triggered navigation, image carousels — all of it has to be operable by someone tabbing through the page with a keyboard, no mouse involved. This is one of the areas where visually ambitious, animation-heavy sites most often fail, because a custom-built interactive component frequently ships without the keyboard and focus-state handling a native HTML element gets for free.

**Forms with real, programmatically-tied labels.** Per the [Click-Away Pound research](https://www.clickawaypound.com/cap16finalreport.html), poorly designed forms were one of the specific reasons disabled visitors cited for abandoning a site entirely, and this is also one of the more fixable issues on the list — every input needs a label that's actually tied to it in the markup, not just placed nearby visually, and every error message needs to be announced clearly rather than communicated only through a color change.

**Alt text that describes, rather than decorates.** Every meaningful image needs alt text that actually describes what's in it for someone who can't see it, and every purely decorative image needs to be marked as such so a screen reader skips it instead of reading out noise. This is a small habit with an outsized effect, and it's one of the easiest things to get right if it's built into the workflow from the first image upload rather than added at the end.

## The honest cost-benefit, for a business actually weighing this

None of this is free, and it's worth being straightforward about that rather than pretending accessibility work has zero cost. Building it in from the start on a new site adds real time to the design and development process — testing contrast ratios, testing keyboard navigation, writing real alt text instead of leaving the field blank. Retrofitting it onto an existing site that wasn't built with any of this in mind is typically more expensive, because structural issues — bad heading hierarchy, inaccessible custom components — are harder to fix after the fact than to avoid in the first place.

Against that cost, weigh the other side of the ledger covered above: a meaningful share of visitors who will simply leave rather than fight through a barrier, a legal environment where filings are near an all-time high and span every industry, and a widely marketed "quick fix" — the overlay widget — that the actual litigation data suggests doesn't reliably work. For a premium business specifically, there's a fourth consideration that doesn't show up in any lawsuit statistic: a site that fails an older or lower-vision visitor is failing exactly the demographic a lot of premium categories — custom building, private wealth, high-end healthcare, luxury travel — depend on most heavily. The business case doesn't require caring about accessibility as a cause. It holds up entirely on its own, on nothing but the numbers above.

## Where this actually leaves a business

Nobody builds a website intending to exclude a quarter of their potential audience, and almost nobody sets out to become one of the thousands of ADA website lawsuit defendants each year. Both of those outcomes happen anyway, at scale, because accessibility simply isn't part of the standard design conversation the way "does it look premium" or "does it rank" already are. That's the actual gap this piece is about — not a missing feature, but a missing question that never gets asked in the room where a site actually gets designed.

Closing it doesn't require turning a premium site into something visually plain or overly clinical — contrast ratios, semantic structure, and keyboard navigation are entirely compatible with ambitious, cinematic design; they just have to be treated as real constraints from the first wireframe rather than an afterthought bolted on with a script tag. The businesses that get this right aren't doing something exotic. They're doing the same kind of quiet, structural work that separates a genuinely well-built site from one that only looks good in a screenshot — the same standard this site's own build is held to.
