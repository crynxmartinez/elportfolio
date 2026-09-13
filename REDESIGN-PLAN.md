# Portfolio redesign — clarity, proof and optional 3D

Reviewed 14 September 2026. Planning only; no production changes.

## Decision

Build a professional, content-first website with one progressively enhanced 3D project showcase. A simple site is sufficient to sell these services. 3D earns its place by demonstrating Raphael's interactive design skill while leaving the offer and contact path instantly accessible. Keep the existing cinematic journey as an optional experiment/case study rather than the required homepage experience.

Primary buyer assumption: service-business owners with an existing website who need better presentation, clearer enquiries and follow-up. Agencies needing GHL implementation get a separate service page. Confirm offer scope before adding price or turnaround guarantees. Do not replace this with another generic developer resume.

## Evidence and limits

- Live home and portfolio inspected in browser. Home has dark teal art direction, a premium-design headline, two CTAs and a loader. Portfolio has text-only project cards with no screenshots in the visible grid.
- Local app/page.tsx uses 2,160 desktop and 1,080 mobile frames, a 600vh scene and an 8-second loader safety timeout. This timeout is not a measured load time.
- Local desktop frames total 174,215,722 bytes. SceneSequence.tsx schedules a backfill of missing frames and retains image references. This identifies bandwidth/memory risk; it is not a measured transfer or heap result for every visitor.
- Current homepage text splits attention between premium brands and agencies, and spends subsequent screens describing premium design instead of showing projects or explaining deliverables.
- Existing testimonial source contains invented quotes presented as client feedback with stock portraits. Remove these from the proposed design; use verified feedback or documented project evidence. Earlier assistant creation of those quotes was a mistake, not proof.
- No analytics, conversion rate, mobile field data or real-device frame-rate benchmark was available for this review. No claim that the redesign will increase conversion by a stated amount.

## Reference studies

These are design observations, not evidence that a particular style causes sales.

1. [Bruno Simon](https://bruno-simon.com/): a drivable 3D world demonstrating creative-development skill. Take the idea of making the skill tangible; do not require business prospects to navigate a game to find services.
2. [Emil Kowalski](https://emilkowal.ski/): direct introduction, named projects and writing. Take clear positioning and direct access to work.
3. [Josh Comeau](https://www.joshwcomeau.com/): a browsable collection of technical articles and explanations. Take useful, demonstrable expertise for the blog and case studies.
4. [King Kong homepage](https://kingkong.co/): customer concerns, offers, case studies and repeated next steps. Its revenue and review figures are its own claims, not independently verified here. Our use of this pattern is an adaptation, not a quoted universal Sabri Suby formula.
5. [Sabri's Black Tiger document](https://kingkong.co/wp-content/uploads/2023/10/Sabri-The-1-Billion-Black-Tiger-Strategy.pdf): explicitly qualifies a buyer and offers a defined consultation. Adapt qualification and specificity; do not copy its financial promises or tone.

The King Kong landing-page service URL was verification-blocked. Do not imply its content or a Sabri video/course was reviewed.

## Proposed hero

Eyebrow: Website design, SEO & GHL systems for service businesses

Headline: Make your website your next customer's first step.

Subheading: I design professional websites that explain your services, make enquiries easy, and connect with your CRM for follow-up. From the first page to the booking form, I build the pieces to work together.

Primary CTA: Discuss my website
Secondary text link: Explore the work
Microcopy: Tell me what you have and what you want to improve. I'll recommend the next step and a clear scope.

Visual: actual MAREA, KingVet and Opervia screenshots in a restrained layered composition. Identify concept projects honestly. Initially render a compressed static image; optional subtle perspective on capable devices. Use real 3D only if it materially improves that composition.

Alternative test headline: A better website. A clearer path to an enquiry.

Do not add promised lead counts, rank guarantees, artificial deadlines or invented customer statistics. AIRS can support research within delivery, but should not become another competing hero offer.

## Homepage sequence

1. Hero: reader, offer, visual proof, next step; useful immediately.
2. Three selected projects: large previews, Raphael's role, problem and solution; local case-study links plus live-site links.
3. The customer journey: understand the service, send an enquiry, receive follow-up. Explain concrete website/CRM work without claiming every buyer has these problems.
4. The offer: what design/development includes, SEO scope, optional GHL integrations, ownership and support boundaries.
5. Process: discovery, agreed scope, design review, implementation/testing, launch and handover. Publish timelines only after establishing a deliverable scope.
6. About Raphael: real portrait if supplied; concise experience connecting research, software and workflows. No stock portrait implying it is Raphael.
7. FAQs: pricing process, existing websites, SEO expectations, GHL need, ongoing costs and handover.
8. Contact: same main CTA and working GHL form with a clear confirmation state.

Navigation: Work, Services, About, Insights, Contact. Remove the fabricated-testimonial destination from primary navigation; determine a truthful replacement/redirect before release.

## Supporting pages and funnel

- Portfolio: image-first grid with simple category filters only if useful. Three detailed case studies before polishing all nine. Do not invent before/after results.
- Services: website design/development, SEO/AIRS-assisted research, and GHL implementation, each with explicit scope. One coherent main offer on home.
- About: credible biography and working process, not an exhaustive list of all past ideas.
- Blog: retain URLs, automate compatibility, images and sources; improve reading width and contextual related-work links. Review factual claims rather than treating auto-generated length as quality.
- Contact: retain real GHL integration, verify mobile usability and delivery with an identified test enquiry; no silent outreach to clients.
- Separate outreach landing page when a niche campaign actually runs: one audience, one problem, matching proof and one CTA. Homepage remains a navigable credibility hub; do not apply a no-navigation rule globally.
- Optional free review funnel only if Raphael commits capacity: define exactly what the review includes and how it is delivered before advertising it. Do not create another large unpaid workload by default.

## Performance plan and proposed acceptance targets

These are engineering targets to test, not current scores or guarantees on every device.

- Server-render essential text and links; no full-screen loading gate. Native document scrolling, no wheel interception on the main sales pages.
- Start with HTML/CSS layout and responsive project screenshots. Add one isolated, dynamically loaded scene after the useful page renders.
- Initial page transfer target below 1.5 MB excluding deferred 3D and later GHL interaction; optional scene/asset budget below 2 MB compressed. If missed, simplify before release.
- Avoid continuous motion by default. Render on interaction/demand; pause hidden/offscreen scenes, cap DPR, reuse materials and dispose resources. No large postprocessing stack without demonstrated need.
- Static fallback for reduced motion or failed WebGL, with identical information and CTAs. On mobile prefer the static composition until real-device tests justify motion.
- Target LCP <=2.5 seconds, INP <=200ms and CLS <=0.1 at the 75th percentile when field data becomes available. Before launch use repeatable lab runs and label them lab measurements. Reference: https://web.dev/articles/vitals
- Test representative mobile hardware and desktop, slow-network cold loads, keyboard navigation, touch, reduced motion, WebGL failure and form flow. Inspect frame timing during actual interactions; do not report a universal no-lag claim.
- Load project images at their display sizes and lazy-load below-fold media. Keep important content crawlable outside canvas; retain canonicals, sitemap, metadata and genuine structured data.

## Phases and completion criteria

### 1. Baseline and proof
Record current route map, form behavior and performance. Capture project screenshots, validate project descriptions and classify concept versus delivered work. Compile real evidence. Deliverable: approved content inventory, baseline report and asset set.

### 2. Static conversion-first design
Implement the proposed hero and full homepage in a local preview, with mobile navigation and static project visuals. Deliverable: readable and usable site before any 3D dependency is loaded.

### 3. Portfolio and supporting pages
Add three case studies; refresh services, about, blog and contact. Preserve existing useful URLs and automation. Replace unsupported testimonials with truthful evidence. Deliverable: complete navigation and working lead path.

### 4. Add and evaluate one signature interaction
Use premium-3d-web-design source catalog. Select the minimum useful technique; keep all five resources for study, not five runtime dependencies. Compare enhanced versus static performance. Drop the effect if it obstructs information or exceeds budgets.

### 5. Verify, release and measure
Build and browser checks, real mobile checks, source/license notices, form delivery verification, redirects and metadata. Release only within current user authorization. Track CTA clicks, form starts, confirmed enquiries and qualified conversations; do not call a CTA click a lead. With low traffic, use observed usability issues and real prospect feedback before claiming A/B-test significance.

## Priority

Clear offer and real project images first. Trustworthy evidence second. Friction-free contact third. 3D refinement fourth.

## Video research update — Sabri Suby

Reviewed accessible transcript material and video descriptions on 14 September 2026; not a claim to have watched the videos visually. Transcript mirrors can contain transcription errors.

- [How To Fix Your Funnels & Landing Pages To Convert Like CRAZY](https://www.youtube.com/watch?v=K9kYwUWUjLc), [accessible transcript](https://lilys.ai/notes/144531): around 02:02 he prioritizes consuming information; 03:33–06:57 addresses visual clutter and scrolling; 07:51–08:21 focuses attention on the headline; 10:11–11:20 addresses specificity; 17:38–18:02 addresses mobile presentation. He criticizes artificial urgency in the reviewed course funnel. These observations concern that funnel, not universal conversion findings.
- [Ultimate Step-By-Step Landing Page Guide](https://www.youtube.com/watch?v=zpTsCrOvGao): official description identifies audience attention, copywriting and offer construction as topics. Only a short [transcript extract](https://glasp.co/youtube/zpTsCrOvGao) was accessible; fuller topic/timestamp outline is [secondary material](https://summify.io/discover/the-ultimate-step-by-step-landing-page-guide-my-1-33-billion-secret-selling-syst-zpTsCrOvGao), not independently verified video timing.

### Revised creative direction — our adaptation

Use the homepage to make the buying decision easier. The following is proposed copy and design, not Sabri's wording or a proven conversion winner.

Eyebrow: For service businesses ready to improve their website

Headline: **Give customers a clear reason to choose your business.**

Supporting copy: I design and build websites that show the quality of your work, explain your services, and make it easy to enquire. SEO and GHL integration connect your website with how customers find you and how you follow up.

Primary action: **Discuss my website**

Secondary text link: **See selected projects**

Hero visual: one authentic project preview with optional subtle depth. Keep the headline visually dominant. Display content immediately, retain native scrolling, and place further work directly below the hero. Do not make visitors interact to discover the offer.

Revised page order: audience and offer → selected work as evidence → recognizable website problems → scoped solution → process and genuine experience → FAQs → enquiry.

Do not copy course-funnel tactics blindly: keep useful portfolio navigation, keep contact available, and do not hide the page behind a video or delayed button. Do not import the video's projected conversion improvements as expected outcomes for this site. Specificity must come from real scope and evidence, not invented turnaround times or rankings.

If AIRS becomes the primary paid offer, build a separate focused service/landing page explaining competitor research, findings, implementation scope and evidence limits. Do not combine an audit offer, website build, and agency subcontracting pitch into three equal hero messages.
