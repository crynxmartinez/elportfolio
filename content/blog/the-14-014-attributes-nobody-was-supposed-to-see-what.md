---
title: >-
  The 14,014 Attributes Nobody Was Supposed to See: What Google's Leaked Search
  Documentation Actually Revealed
excerpt: >-
  In May 2024, thousands of pages of Google's own internal ranking documentation
  leaked by accident. Here's what the actual attribute names say, line by line,
  and what Google admitted when asked about it directly.
date: '2026-11-02'
mode: exposure
readTime: 16 min read
faqs:
  - q: Is the leaked Google documentation proof of how rankings actually work?
    a: >-
      No. It confirms that Google's systems store and compute these attributes,
      not how heavily each one is weighted or whether a given attribute is
      actively used in live ranking. The documents didn't contain source code or
      reveal the specific weights assigned to different ranking signals, which
      is exactly the limitation Google itself pointed to in its response.
  - q: Did Google ever admit the leaked documents were real?
    a: >-
      Yes, with a caveat. A Google spokesperson confirmed the documents'
      authenticity to The Verge while cautioning against drawing conclusions,
      saying Google would caution against inaccurate assumptions about Search
      based on out-of-context, outdated, or incomplete information. It confirmed
      the files were genuine without endorsing any interpretation of them.
  - q: Does this mean backlinks don't matter anymore?
    a: >-
      No — the documents still show PageRank and link-based signals as active
      components, including a homepage PageRank value applied to new pages. What
      changed is the evidence that click-based systems like NavBoost sit
      alongside links as a major signal, not that links were replaced.
  - q: What is a 'Twiddler' and should I be trying to optimize for one?
    a: >-
      A Twiddler is a re-ranking function that adjusts a page's position after
      the main algorithm has already scored it — a boost or demotion applied on
      top, rather than a separate thing to target. You can't optimize for a
      specific Twiddler by name; the practical response is making sure nothing
      about your site gives any demotion-type Twiddler a reason to fire.
  - q: Should I change anything about my website because of this leak?
    a: >-
      Only in the sense of taking it as confirmation, not new information: real
      engagement, real backlinks from relevant sites, and content that earns
      actual clicks instead of just impressions all map to attributes the
      documents describe as real and tracked. It's not a new playbook — it's
      documentation that the old advice was measuring real things.
coverImage: >-
  https://images.pexels.com/photos/37730212/pexels-photo-37730212.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940
coverImageAlt: >-
  Close-up of server racks in a data center highlighting modern technology
  infrastructure.
coverCredit:
  name: panumas nikhomkhai
  url: 'https://www.pexels.com/@cookiecutter'
---

In March 2024, a piece of automation inside Google called yoshi-code-bot did something small and procedural: it pushed an internal documentation update to a code repository. Nothing unusual about that — it's the kind of commit that happens inside a company like Google thousands of times a day. The problem was which repository. The commit went to a publicly accessible Google-owned repo, carrying a standard Apache 2.0 open-source license, as though it were meant for the outside world. It wasn't. [What leaked was internal documentation for Google's Content Warehouse API](https://en.wikipedia.org/wiki/2024_Google_Search_documentation_leak) — the system Google Search itself uses to store and retrieve information about every page it has indexed.

It sat there, publicly reachable, for six weeks before anyone with the right eyes noticed. This piece isn't about the controversy that followed, or the arguments about what it means for your SEO strategy — those arguments happened already, extensively, in 2024. This is about something narrower and more useful: actually showing what was in the documents, by name, in the industry's own technical analysis of them, and matching it against what Google had been telling the public for years. Not theory about ranking. The actual attribute names, as recorded by the people who read the files.

## How It Actually Got Out

The mechanics of the leak matter, because they explain why almost nobody noticed for so long. [The leaked materials consisted of over 2,500 pages describing more than 14,000 attributes related to Google's search ranking systems](https://en.wikipedia.org/wiki/2024_Google_Search_documentation_leak). The commit sat live in the repository from early March until a follow-up commit on May 7 attempted to remove it — but by then, an automated external service called Hexdocs, which indexes public GitHub repositories for documentation, had already captured and cached the material. Removing the original commit didn't remove the copy.

The person who first flagged it publicly, Erfan Azimi, brought it to Rand Fishkin, co-founder of SparkToro and former CEO of Moz. [Fishkin verified the documents by consulting former Google employees, two of whom confirmed the materials appeared genuine and matched the formatting and notation style of internal Google documentation](https://en.wikipedia.org/wiki/2024_Google_Search_documentation_leak). Fishkin then handed the material to Michael King, CEO of the technical SEO firm iPullRank, for the deeper engineering read. [Fishkin published his account on the SparkToro blog on May 27, 2024, and King published his analysis on iPullRank on May 28, 2024](https://en.wikipedia.org/wiki/2024_Google_Search_documentation_leak). That two-day window is when the SEO industry's entire understanding of its own subject shifted, because for the first time there was something to point to that wasn't a patent filing, a cryptic blog post, or an inference from rank-tracking data. There was an actual internal document, with actual field names, describing what the system tracks.

## The Scale: What's Actually Inside 2,596 Modules

Before getting into specific attributes, it's worth being honest about scale, because it changes how to read everything that follows. [As of March 2024, Google's ranking algorithm consisted of 2,596 modules and 14,014 attributes](https://blog.getadmiral.com/massive-google-search-algorithm-leak-what-publishers-should-know), according to the published counts from the analysis. That is not a list of 14,014 ranking factors in the sense of "do these 14,000 things." Most of those attributes describe internal plumbing — how a document is stored, how a crawl request is logged, how a field gets passed between systems. The documents did not contain source code or reveal the specific weights assigned to different ranking signals, which is exactly what makes them hard to turn into a precise playbook and exactly why the actual, specific, named attributes are worth looking at directly rather than treating the whole leak as one undifferentiated revelation.

That distinction — existence versus weighting — is the single most important thing to hold onto reading any of this. The documents prove a field is computed and stored. They do not prove how much it moves a result up or down, or whether it's even active for a given query today. Keep that in mind for every attribute below, because it's also exactly the distinction Google's own response leaned on.

## siteAuthority: The Attribute Google Said Didn't Exist

This is the single most-cited finding from the entire leak, and it's worth seeing the actual language involved on both sides. For years, Google's public search advocates were asked, repeatedly, whether something like a sitewide authority score exists — the kind of single number an entire domain carries that helps or hurts every page on it, similar in concept to what third-party tools call Domain Authority or Domain Rating. The public answer was consistently no. [iPullRank's technical breakdown documents John Mueller, a "search advocate who coordinates Google search relations," stating in a video, "we don't have website authority score"](https://ipullrank.com/google-algo-leak).

The leaked documentation says otherwise, in Google's own internal notation. [As part of the Compressed Quality Signals stored on a per-document basis, Google has a feature it computes called "siteAuthority"](https://ipullrank.com/google-algo-leak) — and the documentation snippet King published describes it precisely: an integer type, converted from a quality signal called `quality_nsr.SiteAuthority`, applied inside a scoring system Google calls Qstar. That's not a vague conceptual mention. That's a typed field, with a defined source and a named destination in the ranking pipeline. [iPullRank's analysis further suggests it, along with a related homepage-level signal, is likely used as a proxy score for new pages until they've accumulated their own PageRank](https://ipullrank.com/google-algo-leak) — meaning a brand-new page on an established, high-authority domain may inherit some of that domain's standing before it has any track record of its own, while the same page on a brand-new domain gets no such head start.

This is also where [the 2024 Google Search documentation leak](https://en.wikipedia.org/wiki/2024_Google_Search_documentation_leak) earned its reputation for contradicting the company's own messaging most directly — not because `siteAuthority` proves domain authority works exactly the way third-party SEO tools model it, but because the field existing at all is a different claim than "we don't have anything like that."

## NavBoost: What Clicks Actually Do, By Name

The second major finding is less about a single denied attribute and more about an entire system whose existence Google spent years downplaying in public, before eventually confirming it under oath in a separate legal proceeding entirely.

The documents reference a system called NavBoost, [a click-driven re-ranking system whose attributes include specific fields for different types of clicks, including "badClicks," "goodClicks," and "lastLongestClicks"](https://en.wikipedia.org/wiki/2024_Google_Search_documentation_leak). Those names are self-explanatory in a way that's almost unsettling to read as plain text: a click where the visitor bounced straight back to the search results is logged differently than a click where they stayed, and a click where they stayed the longest out of everyone who clicked that result gets its own dedicated field. [Google employees had previously denied using Chrome browser data for ranking purposes](https://en.wikipedia.org/wiki/2024_Google_Search_documentation_leak), yet the Chrome connection to this same click-logging system shows up repeatedly in the leaked material.

What makes NavBoost different from most of the rest of the leak is that it didn't need the documents to be confirmed — it had already been confirmed under oath, months earlier, in open court. [The existence of NavBoost was confirmed during the United States v. Google antitrust trial, where Google VP Pandu Nayak testified that the system had used click data since approximately 2005](https://en.wikipedia.org/wiki/2024_Google_Search_documentation_leak). Independent write-ups of that same testimony describe the mechanism in more operational detail: [NavBoost runs on a rolling 13-month window of click data, sliced by country and device, aggregating what people click on for a given query and how long they stay afterward](https://www.szymonslowik.com/navboost/). Nayak was also careful, under oath, to put a boundary on how far this goes — [he said plainly that NavBoost is a factor "but by no means the only" one, because plenty of documents have no clicks at all](https://www.szymonslowik.com/navboost/) to draw on, which is a useful corrective against treating click data as the entire algorithm.

The timeline here is worth sitting with for a second, because it's unusually clean as far as these things go: a Google representative publicly called click-based signals "noisy" and dismissed their role years earlier, a federal court later heard Google's own VP of Search describe a system built specifically around those signals since 2005, and then the internal documentation describing the exact field names surfaced on top of both. Three independent sources — a public denial, sworn testimony, and a leaked internal spec — converging on the same conclusion is a different kind of evidence than any one of them alone.

## Twiddlers: The Re-Ranking Layer Most People Have Never Heard Of

One of the more technically interesting things the leak exposed isn't a specific signal at all — it's a layer of the system most outside observers didn't know existed as a distinct architectural concept.

[The documentation describes a core ranking function called Ascorer — the primary ranking algorithm that scores pages before any re-ranking adjustments happen](https://ipullrank.com/google-algo-leak). After Ascorer produces an initial ranking, a separate class of functions called Twiddlers runs on top of it, nudging individual results up or down without touching the underlying score. [iPullRank's analysis notes that when Google says a named update like Panda "was not part of the core algorithm," that most likely means it launched as a Twiddler — a reranking boost or demotion calculation — before possibly being folded into the primary scoring function later](https://ipullrank.com/google-algo-leak).

This matters for a reason that's easy to miss: it means two statements that sound contradictory — "Panda isn't part of the core algorithm" and "Panda affects your rankings" — can both be technically true at once, because the demotion is happening in a bolt-on layer that runs after the main scoring, not inside it. [The documentation even references something called "Baby Panda," described as a Twiddler, a bolt-on adjustment applied after initial ranking rather than baked into the primary score](https://ipullrank.com/google-algo-leak). The practical takeaway isn't that you can target a specific Twiddler — you can't, their names and triggers aren't things an outside site owner can address individually — it's that a page's position is best understood as the result of at least two separate passes, not one single calculation, which is a more accurate mental model than most public explanations of "the algorithm" ever offered.

## hostAge and the Sandbox Google Denied

A third recurring theme across the technical write-ups is a cluster of attributes related to how Google treats brand-new content and brand-new domains — an idea the SEO industry has informally called "the sandbox" for close to two decades, usually dismissed by Google representatives as a myth.

[The documents included an attribute called "hostAge" and references to a sandboxing mechanism for new content, suggesting Google may delay the ranking of content from new websites](https://en.wikipedia.org/wiki/2024_Google_Search_documentation_leak). Separately, [iPullRank's analysis describes a specific flag Google maintains that indicates whether a site is a "small personal site,"](https://ipullrank.com/google-algo-leak) with no public definition of what qualifies — but the existence of the flag at all means it would be straightforward for Google to attach a Twiddler to it, boosting or demoting such sites as a category, whether or not that's currently happening. None of this proves the sandbox works exactly the way outside SEOs have described it for years. It does mean the raw ingredients for something sandbox-shaped — a tracked age signal, a tracked "small site" flag, and a re-ranking layer built to act on exactly these kinds of flags — are all present and named in Google's own internal documentation, which is a different and more concrete claim than the folk version of the theory ever had behind it.

## What Google Said When Asked About It

A document leaking is one thing. A company's response to being asked about it directly is a separate piece of evidence worth reading carefully, because it tells you what Google was and wasn't willing to dispute.

Google initially said nothing. [Google initially declined to comment on the leak](https://en.wikipedia.org/wiki/2024_Google_Search_documentation_leak) in the first days after Fishkin and King published their analyses. Two days later, that changed. [On May 29, 2024, Google spokesperson Davis Thompson confirmed the documents' authenticity in a statement to The Verge](https://en.wikipedia.org/wiki/2024_Google_Search_documentation_leak), while framing the confirmation carefully: [the spokesperson said, "We would caution against making inaccurate assumptions about Search based on out-of-context, outdated, or incomplete information. We've shared extensive information about how Search works and the types of factors that our systems weigh, while also working to protect the integrity of our results from manipulation."](https://searchengineland.com/google-responds-to-leak-documentation-lacks-context-442705)

Read that statement closely and notice what it does and doesn't deny. It doesn't say the documents are fake. It doesn't say the named attributes don't exist. It says the information might be out of context, outdated, or incomplete — all three of which can be true and still leave the core fact standing: these are real fields, inside a real Google system, that someone at Google built for a reason. [Google separately told reporters it would be incorrect to assume the leak is comprehensive, fully relevant, or provides up-to-date information on current rankings](https://searchengineland.com/google-responds-to-leak-documentation-lacks-context-442705) — a fair point about any seven-week-old snapshot of a system that changes constantly, but not a rebuttal of what the snapshot showed at the moment it was taken.

## What Actually Changes for a Real Business Website

This is the part worth being disciplined about, because the honest answer is: less than the headlines implied, and more than "ignore it" implies.

Nothing here hands you a lever to pull. You cannot set a `siteAuthority` value, request a Twiddler boost, or manually populate your own `goodClicks` field. What the leak actually does is confirm, with named internal fields rather than inference, that several things the independent SEO industry had been recommending for years on the basis of correlation and pattern-matching were correlating with real, deliberately tracked mechanisms — not superstition. A new site earning its first real backlinks and its first genuine, satisfied visits isn't chasing a myth; it's feeding exactly the kind of signals — homepage-level authority, click behavior that ends a search rather than bouncing back to it — that the documentation names explicitly. A business whose entire visitor experience ends in a fast bounce back to Google is handing a real, logged signal straight to a system built specifically to catch that pattern. The response to that isn't a technical trick. It's the same thing this site has argued from a different angle before: a page has to be fast enough, clear enough, and credible enough on arrival that a visitor doesn't immediately retreat — because that retreat is not an abstraction anymore. It has field names.

The other practical lesson is about where to put your trust in public SEO advice going forward. For years, the honest answer to "does Google use X" was frequently unknowable, forcing the industry to rely on testing, correlation studies, and reading between the lines of carefully worded public statements. This leak, combined with the sworn courtroom testimony that preceded it, narrowed that gap for a specific handful of questions — clicks, site-level authority, and new-site treatment chief among them — from "probably, based on pattern" to "confirmed to exist, inside Google's own system, as of March 2024." That's a meaningfully different epistemic position to build decisions from, even with every caveat about weighting and staleness fully intact.

## Where This Actually Leaves You

The honest summary of a 2,500-page internal leak is unglamorous: it didn't hand anyone a working algorithm to reverse-engineer, and it didn't need to. What it did was confirm, in the company's own internal language, that a handful of things long treated as either myth or marketing — a sitewide authority signal, a click-based re-ranking layer, a tracked history for how new a site is — are real, named, and built on purpose. None of that replaces doing the actual work of earning real visits that end well instead of bouncing, real links from sites that would plausibly link to you anyway, and a site that holds up once the click has already been spent. It just means that work was never guesswork in the first place. It was always being measured. The documents just happened, for six weeks in the spring of 2024, to be sitting somewhere anyone could read them.
