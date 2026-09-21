---
title: 'The Metric That Quietly Replaced FID: What the INP Data Actually Shows'
excerpt: >-
  In March 2024, Google swapped out a Core Web Vital most sites were already
  passing for one most sites immediately failed. The CrUX data on what happened
  next says the common reactions on both sides were wrong.
date: '2026-09-21'
mode: analysis
readTime: 14 min read
faqs:
  - q: >-
      Do I need to worry about INP if my site runs on WordPress with a lot of
      plugins?
    a: >-
      More than most other platforms, yes. Plugin-driven event handlers,
      page-builder widget logic, and third-party embeds are consistently named
      as the leading causes of poor INP on WordPress specifically, because each
      one adds code competing for the same main thread at the exact moment a
      visitor clicks something.
  - q: Will fixing INP actually move my rankings?
    a: >-
      Probably a little, rarely a lot. Google's own John Mueller has described
      Core Web Vitals as more than a tiebreaker but well below content relevance
      in weight, and most independent studies find a correlation with ranking
      position rather than proof that INP alone moves anyone up the page. The
      more reliable payoff is fewer visitors abandoning an interaction that felt
      broken.
  - q: How do I actually check my site's INP score?
    a: >-
      Field data — real visitor measurements, not a lab simulation — is what
      matters, and it lives in Google Search Console's Core Web Vitals report
      and in the free PageSpeed Insights tool, both pulling from the same Chrome
      User Experience Report dataset Google uses for search.
  - q: Does adding animation or scroll effects to a site hurt INP?
    a: >-
      Not automatically. CSS animations and transitions that run without user
      input aren't counted as interactions at all. The actual risk is
      JavaScript-driven scroll or animation logic that hijacks native browser
      scrolling, which can register as a slow interaction in a way that native
      CSS scrolling never does.
  - q: 'If Core Web Vitals is ''just a tiebreaker,'' is it worth spending money on?'
    a: >-
      The ranking effect alone might not justify it. The visitor-experience
      effect usually does — a page that feels sluggish when someone taps a menu
      or a filter is losing trust and conversions independent of anything Google
      ever measures, which is the part the tiebreaker framing leaves out
      entirely.
coverImage: >-
  https://images.pexels.com/photos/574080/pexels-photo-574080.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940
coverImageAlt: >-
  A developer's hand interacting with code on a laptop screen in a workspace
  setting.
coverCredit:
  name: Lukas Blazek
  url: 'https://www.pexels.com/@goumbik'
---

On March 12, 2024, Google made a change to Core Web Vitals that most business owners never heard about and most agencies barely explained. The metric measuring how responsive a website feels — Interaction to Next Paint, or INP — officially replaced an older metric called First Input Delay, or FID. The change had been telegraphed for almost two years before it happened, tested, delayed, and finally locked in. And when it landed, a huge number of websites that had been quietly passing Core Web Vitals for years suddenly weren't.

That's the kind of fact that gets summarized in two lazy ways. One camp turned it into a scare headline: your rankings are at risk, optimize now. The other camp shrugged it off entirely, on the reasonable-sounding grounds that Google has said for years that Core Web Vitals barely move rankings anyway. Both readings are missing the more interesting thing the actual data shows, which is that this metric change was less about SEO than almost everyone treated it, and more about a specific, measurable design problem that most websites — expensive ones included — still have.

## What FID actually measured, and why almost nobody failed it

To understand what changed, it helps to be precise about what got replaced. First Input Delay measured a single number: how long it took a page to start responding to a visitor's *first* click, tap, or keypress after the page loaded. If someone clicked a button and the browser began processing that click within, say, 80 milliseconds, FID scored that as good — even if every interaction after that first one was sluggish.

That narrow scope turned out to be the metric's biggest weakness. [First Input Delay is a Core Web Vitals metric, but will be replaced in March 2024 by Interaction to Next Paint, and First Input Delay rarely causes sites to fail the Core Web Vitals — even on mobile only 6.4% of sites fail this metric.](https://www.debugbear.com/blog/hardest-core-web-vitals-metric) In other words, FID was a bar almost nobody tripped over, which made it a fairly useless signal for separating genuinely responsive sites from sluggish ones. A site could load fast, respond instantly to that first click, and then bog down completely on the second, third, or tenth interaction — a dropdown that hangs, a filter that takes a full second to update, a form that seems frozen after submit — and FID would have no way of catching any of it.

Google's own engineering team reached the same conclusion. [One of the Core Web Vitals metrics, First Input Delay, measures responsiveness, but there are known limitations of FID, which led the Chrome team to explore an experimental metric that addresses these limitations more effectively, and in 2022 they announced Interaction to Next Paint as that new metric.](https://developers.google.com/search/blog/2023/05/introducing-inp?authuser=1) The gap wasn't a rounding error. It was a structural blind spot in what the metric was even designed to see.

## What INP measures instead, and why it's a genuinely harder test

INP throws out the "first interaction only" limitation entirely. [INP measures every interaction on a page, not just the first one, which makes it a far stricter test of responsiveness.](https://www.corewebvitals.io/core-web-vitals) Instead of grading a website on its best behavior at the exact moment it's least likely to be under load, INP samples the latency of every click, tap, and keypress across an entire visit and reports back essentially the worst representative value — the one that most visitors are actually experiencing by the time they've clicked around the page a few times.

The threshold Google settled on for "good" is unforgiving relative to what FID asked for. [A good INP is 200 milliseconds or less, 201 to 500 needs improvement, and anything over 500 is poor.](https://www.rebelmouse.com/inp-core-web-vitals) That number matters because of what it's measuring across: not a single moment right after load, when a page's resources are typically most available, but the entire session, including the moment fifteen seconds in when a visitor opens a mobile menu after three tracking scripts and a chat widget have already loaded in behind the page.

## The data: pass rates cratered, then mostly recovered

This is where the story gets more specific than "Google changed a metric." When INP went live as a Core Web Vital, a large share of the web that had been comfortably passing under FID immediately failed under the new standard. One aggregation of CrUX data puts the immediate hit at a striking drop: [43.9% of origins had good Core Web Vitals immediately after INP replaced FID in February 2024, a number that recovered to over 50% within 12 months as sites optimized for the new metric.](https://thestacc.com/blog/core-web-vitals-statistics/) That's not a small dip — it's roughly half the measured web failing a bar it had just cleared months earlier, followed by a genuine, measurable recovery as developers actually went and fixed things.

The recovery kept compounding. By mid-2024, [the percentage of sites that had passing scores across all three Core Web Vitals metrics reached 51.0%, up 2.3%, as the June 2024 Chrome User Experience Report showed websites experiencing an averaged improvement across the board.](https://www.searchenginejournal.com/cwv-google-page-experience-ranking-factor-updated/522279/) Worth flagging here, because it's exactly the kind of detail a purely celebratory reading of this data would skip: [some of the improvements are attributable to a change in how Interaction To Next Paint is measured, which will be good news to websites with dialog modals.](https://www.searchenginejournal.com/cwv-google-page-experience-ranking-factor-updated/522279/) Some of the apparent industry-wide improvement wasn't sites actually getting faster — it was Google adjusting how the ruler itself worked. That distinction matters for anyone tempted to read a rising pass-rate chart as proof the web collectively got its act together.

By early 2026, the picture had stabilized into something closer to normal. [Global pass rates as of January 2026 CrUX data show 68.3% of origins with good LCP, 87.1% with good INP, and 80.9% with good CLS — but only 55.7% pass all three, up from roughly 50% in early 2024.](https://whitehat-seo.co.uk/blog/google-core-web-vitals-guide-for-b2b) Read that carefully: INP itself, in isolation, is now one of the *easier* individual metrics to pass at 87.1%. The overall pass rate stays stuck in the mid-50s because passing requires clearing all three metrics simultaneously, and LCP — loading speed, not responsiveness — remains the harder problem for most sites. That's a genuinely counterintuitive finding if your mental model of this story is "INP is the new hard metric everyone's failing." It was the hard one in March 2024. Two years later, it mostly isn't, and the bottleneck moved elsewhere.

The mobile-versus-desktop gap tells a related, equally specific story. [Per the 2025 Web Almanac, 48% of mobile origins pass all three Core Web Vitals versus 56% of desktop origins — an 8 percentage-point gap.](https://www.digitalapplied.com/blog/core-web-vitals-benchmarks-2026-pass-rate-reference) On INP specifically, that split is even starker at the high end of the web: [according to the HTTP Archive 2025 Web Almanac, 77% of all mobile pages achieve a good INP score, up from 55% in 2022, yet only 53% of the top 1,000 most-visited websites pass INP, because high-traffic websites tend to have more complex JavaScript, more third-party scripts, and more intricate DOM structures — and on desktop, 97% of pages achieve good INP scores.](https://www.corewebvitals.io/core-web-vitals/interaction-to-next-paint) That last contrast is the whole pattern in miniature: a near-universal desktop pass rate next to a mobile pass rate that, even after two years of industry attention, still leaves roughly a quarter of pages failing. Weaker mobile processors amplify every millisecond of JavaScript that a desktop machine shrugs off — which means a metric change that reads as an abstract algorithm update is, underneath, mostly a story about phones.

## Where the common reading gets the ranking stakes wrong

Here's where the "optimize now or lose rankings" framing runs into trouble. Google's own search advocate has been consistent and specific about how much weight this actually carries. [John Mueller has described Core Web Vitals as "not giant factors in ranking," more than a tiebreaker but less important than content relevance, adding on Reddit that depending on the site there might be situations where it's more of a factor and situations where it's less, and that "as an SEO, I think it's worth working on, but I wouldn't drop everything else to focus on it."](https://www.corewebvitals.io/core-web-vitals/seo) That's about as direct a statement as Google ever gives, and it doesn't support either extreme reaction.

Independent research backs the modest framing up. One large-scale study looking specifically for a ranking relationship concluded plainly: [the study confirms what Mueller said on Reddit — it's not a large factor at all, though Google cares about it because you can have the most-relevant and highest-quality content on the planet and it won't matter if the experience around it is broken.](https://www.perficient.com/insights/research-hub/impact-of-core-web-vitals-on-ranking) The same research is careful about the difference between correlation and cause: [the data shows a general correlation between pages with higher CWV scores and rank, but the rollout of the Page Experience update did not change the shape or scope of that correlation to any noticeable degree.](https://www.perficient.com/insights/research-hub/impact-of-core-web-vitals-on-ranking) Pages that rank well also tend to be fast, which is a different claim than fast pages rank well — the first is what most of this data actually captures.

Interestingly, of the three Core Web Vitals, INP isn't even the one most associated with whatever correlation does exist. That distinction goes to loading speed. [LCP is the metric with the strongest observed correlation to ranking position — an Advanced Web Ranking study of 3 million pages found pages ranking in positions 1 through 3 had measurably lower LCP values than pages ranking in positions 8 through 10.](https://www.corewebvitals.io/core-web-vitals/seo) If the goal is chasing whatever sliver of ranking benefit Core Web Vitals actually offers, INP was never the highest-leverage place to spend the effort — LCP was, and still is. That's a genuinely useful correction to the "INP is the new SEO priority" narrative that followed the March 2024 change: the metric that got the headline wasn't the metric doing the ranking work.

## Where design decisions are the actual cause of a poor score

If the ranking upside is modest, why did INP become such a widespread problem the moment Google started measuring the whole session instead of just the first click? The answer has almost nothing to do with content or SEO strategy and almost everything to do with what's actually running in a visitor's browser.

Google's own developer documentation is blunt about the mechanism: [any code running in any event listener will delay the interaction — that includes listeners registered from different scripts and framework or library code, and not only your own code, but also all third party scripts. It's a common problem.](https://codelabs.developers.google.com/understanding-inp) That single sentence is the real explanation for why high-traffic, feature-rich sites disproportionately failed the new metric: every chat widget, every analytics snippet, every A/B testing platform, every ad network script is competing for the same single-threaded slice of the browser's attention at the exact moment a visitor expects a click to register.

The specific offenders show up consistently across independent technical audits. Common causes cited include [heavy plugins, third-party scripts, consent banners, ads, complex menus, page-builder bloat, large page structures, slow event handlers, and expensive CSS or layout work.](https://airlift.net/improve-inp/) None of that is a content problem or a keyword problem. It's an accumulation of small conveniences — the marketing tag manager, the reviews plugin, the popup builder — each individually reasonable, collectively enough to push a page's worst interaction past the 200-millisecond line.

There's a genuinely counterintuitive wrinkle worth pulling out here, because it directly contradicts an assumption a lot of designers carry into this conversation. [CSS transitions and animations that occur without user input are not interactions — a common misconception is that scrolling affects INP, but it does not, unless the page uses JavaScript-based scrolling instead of native browser scrolling, in which case those scroll handlers can trigger event callbacks that the browser measures as interactions, which is one reason native CSS scrolling consistently outperforms JavaScript scrolling for responsiveness.](https://www.corewebvitals.io/core-web-vitals/interaction-to-next-paint) That's a sharper distinction than most conversations about "does animation hurt performance" ever get to. A page can be full of motion — fades, reveals, parallax — without any INP penalty at all, as long as that motion isn't gated behind a scroll or click listener doing heavy work. The animation itself was never the problem. What the browser has to compute in response to a user's input is.

## Why this matters specifically for design-heavy, animation-driven sites

This is the part of the INP story that gets skipped in most SEO-flavored coverage of the metric, and it's the part most directly relevant to anyone building or commissioning a site meant to feel more considered than a template. A visually ambitious site — heavy on custom interaction, scroll-tied motion, layered animation — is exactly the profile of site most likely to accumulate the kind of main-thread work INP is designed to catch, for the simple reason that it has more moving parts responding to more user input than a static brochure page does.

The distinction from the previous section is the whole design lesson: the failure mode isn't "this site has motion," it's "this site's motion depends on JavaScript recalculating something on every scroll tick or every click instead of letting the browser's own compositor handle it." A dropdown menu built with a heavy animation library and its own scroll listener can register a worse INP than a page with twice as much visual movement built on native CSS transforms and transitions that fire without needing to ask the main thread's permission first. The visual result to a visitor's eye can look identical. The cost to the browser — and the score Google reports — is not.

That's a meaningfully different design conversation than "should this site have animation at all." The honest answer, based on how the metric actually works, is that a genuinely premium, motion-forward build and a genuinely responsive one aren't in tension by default. They only come into conflict when the interaction logic behind the motion is doing more computational work than the interaction needs — heavy scroll-jacking libraries, unthrottled resize or scroll handlers, animation triggered by JavaScript state changes instead of CSS. Getting that distinction right is closer to an engineering discipline than a design one, which is exactly why it's the part of "premium" web design least visible in a screenshot and most visible in a Core Web Vitals report.

## Where this analysis could be wrong

It's worth being honest about the limits of what this data actually proves, rather than treating a set of CrUX percentages as settled fact.

First, CrUX field data is opted-in and Chrome-specific: [the CrUX dataset consists of actual Core Web Vitals performance scores as measured in Chrome browsers when visiting websites, from browsers that were voluntarily opted in to report website performance metrics.](https://www.searchenginejournal.com/cwv-google-page-experience-ranking-factor-updated/522279/) Every percentage cited above describes an aggregate of real Chrome sessions, not a controlled experiment, and not necessarily a representative sample of every browser or every visitor a specific business actually has. A site's own Search Console data is a much better guide to that site's real situation than any industry-wide average.

Second, "origin-level" data — the level most of the widely quoted pass-rate statistics use — can flatten real variation across a single domain's pages. A homepage with a light interaction footprint and a product page loaded with third-party widgets can belong to the same origin and get folded into one aggregate score, which means a domain-wide pass or fail doesn't tell you which specific pages or interactions are the actual problem.

Third, and this is the correction worth sitting with the longest: the recovery in pass rates between 2024 and 2026 is genuinely ambiguous about cause. Some of it is real optimization work — developers actually deferring third-party scripts, actually breaking up long JavaScript tasks. Some of it, as Google itself acknowledged, is the measurement methodology changing underneath the number. A rising pass-rate chart makes for a tidier story than "the ruler moved slightly and also some people did real work," but the tidier story isn't necessarily the accurate one, and I'd rather flag that ambiguity than round it off.

Finally, treating this purely as a ranking question — which most coverage of the March 2024 change did, this piece somewhat included by necessity of the available research — probably undersells the real stakes. The ranking effect is small and contested. The experience effect on an actual visitor clicking a menu that stutters for half a second is not contested at all; it's just harder to attach a clean statistic to, because it shows up as a lost phone call or an abandoned form rather than a ranking position anyone tracks.

## What to actually do with this

For a business evaluating its own site rather than the industry-wide averages, the useful move isn't to chase a specific percentile against a global benchmark. It's to check the site's own field data in Search Console's Core Web Vitals report or in PageSpeed Insights, both of which draw from the same CrUX data referenced throughout this piece, and look specifically at INP rather than assuming a fast-loading homepage means every interaction on the site is fast too. If the number is above 200 milliseconds, the next step isn't guessing — it's auditing exactly which third-party scripts, plugins, or JavaScript-driven interactions are running at the moment visitors actually click something, since that's consistently where the real cost lives, not in the visual design itself.

## Where this actually leaves the "premium equals slow" assumption

The instinct that a more ambitious, more custom-built website has to trade away responsiveness to get its visual effect turns out not to hold up against how INP actually works. The metric doesn't penalize motion. It penalizes unnecessary computation sitting between a visitor's input and the browser's next paint — and that computation is just as often found in a bloated plugin stack on a template site as it is in a custom animation sequence, arguably more often, given how consistently third-party scripts and page-builder bloat show up as the leading causes in technical audits of ordinary sites. The real dividing line INP draws isn't between plain sites and elaborate ones. It's between sites where every line of interactive code earned its place, and sites where nobody ever went back and checked.
