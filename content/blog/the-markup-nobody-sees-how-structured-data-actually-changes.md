---
title: >-
  The Markup Nobody Sees: How Structured Data Actually Changes What Google Shows
  About You
excerpt: >-
  A plain explanation of what schema markup actually is, how search engines use
  it, what it can and can't do for rankings, and how to tell whether yours is
  even working.
date: '2026-10-05'
mode: education
readTime: 16 min read
faqs:
  - q: Does adding schema markup directly improve my Google rankings?
    a: >-
      No, and Google has said this plainly — structured data affects eligibility
      for rich results, not ranking position. The more honest framing is
      indirect: rich results can lift click-through rate, and click-through
      behavior is one of many signals that can influence visibility over time.
      Treat it as a persuasion tool on the results page, not a ranking lever.
  - q: 'Is JSON-LD required, or can I use Microdata instead?'
    a: >-
      Google supports three formats — JSON-LD, Microdata, and RDFa — but
      explicitly recommends JSON-LD, and it's what nearly every modern CMS and
      schema generator defaults to. Unless you have a specific legacy reason to
      use Microdata, there's no real argument for choosing anything else.
  - q: >-
      Why did my FAQ rich results disappear even though my markup still
      validates?
    a: >-
      If this happened in 2026, it's not a bug on your end — Google retired the
      FAQ rich result entirely in May of that year, on all surfaces and all
      verticals. The markup can still validate cleanly because validity and
      eligibility for display are two separate things; Google can stop showing a
      feature without your schema becoming 'wrong.'
  - q: >-
      Can adding schema markup to false or unverifiable information get my site
      penalized?
    a: >-
      Yes. Google's structured data guidelines are explicit that markup must
      describe content actually visible on the page and must be accurate, and
      violations can trigger a manual action that strips rich result
      eligibility. It won't tank your core rankings by itself, but it removes
      the entire benefit you added the markup to get.
  - q: How do I actually check if my structured data is working?
    a: >-
      Google's own Rich Results Test and the Search Console structured data
      reports are the two tools built specifically for this, and they catch the
      technical errors automatically. What they won't catch is the
      quality-guideline problems — markup describing something not actually on
      the page, or outdated information — which take a human reading the page,
      not a validator, to notice.
coverImage: >-
  https://images.pexels.com/photos/226232/pexels-photo-226232.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940
coverImageAlt: 'Focused shot of a laptop displaying code, suitable for tech and coding themes.'
coverCredit:
  name: Oluwaseun Duncan
  url: 'https://www.pexels.com/@duncanoluwaseun'
---

There's a piece of almost every well-built website that no visitor will ever consciously see. It doesn't change how a page looks, it doesn't move any pixels, and most business owners who've paid for a "premium" site have no idea whether their developer included it at all. It's a block of code sitting in the page's source, invisible unless you go looking for it — and it's often the difference between a plain blue link in Google and a listing with star ratings, a price, a FAQ dropdown, or a photo sitting right there in the results page before anyone has clicked anything.

That code is called structured data, and the vocabulary most of it is written in is called schema markup. This piece is entirely about that one thing: what it actually is, how a search engine actually uses it, what it can and cannot do, and how to tell — concretely, not vaguely — whether the one on your own site is doing any work at all.

## What a search engine actually sees without it

Start with the plainest possible version of the problem. When Googlebot crawls a normal page of text, it's reading HTML built for human eyes — headings, paragraphs, images, a price sitting in a `<span>` tag next to a product name. A human glancing at that page instantly understands "this is a product, it costs $42, it has four and a half stars, it's in stock." A machine reading the same raw HTML has to guess. Is "$42" a price, a part number, a quantity? Is "4.5" a rating, a model number, a page count? The words carry meaning to a person because of context a human brings automatically. A crawler doesn't bring that context on its own.

Structured data is the fix for that specific gap. It's a layer of explicit labeling sitting alongside the normal content, written in a shared vocabulary that both the search engine and the website agree on in advance, that says, unambiguously: this text is a price, this one is a rating, this one is a business's operating hours, this one is a recipe's cook time. Nothing about the labeling changes what a visitor reading the page actually sees. It changes what the machine reading the same page can confidently extract from it.

## The vocabulary behind the code: what schema.org actually is

The reason nearly everyone's structured data looks similar, regardless of which developer or CMS built the site, is that almost none of it is invented per-project. It's drawn from a shared, public vocabulary called schema.org, and the fact that it's shared is the entire point. [On June 2, 2011, Google, Bing, and Yahoo! collectively announced Schema.org](https://yoast.com/history-of-schema/), built specifically to solve the fragmentation problem described above — before it existed, different search engines had been experimenting with their own incompatible markup systems, which meant a webmaster had no single standard to build toward. Having competing search engines agree on one shared vocabulary meant a business could mark up its site once and have it understood everywhere, rather than maintaining parallel versions for each search engine.

That vocabulary has grown enormously since 2011. It now defines hundreds of distinct types — Product, LocalBusiness, Review, Event, Recipe, Article, FAQPage, Person, Organization, and many more — each with its own set of properties that describe exactly what a thing of that type can have: a Product has a price and an availability status; a LocalBusiness has an address and operating hours; a Recipe has a cook time and a list of ingredients. When a developer writes structured data, they're picking the closest matching type from that shared library and filling in its defined properties, not improvising a new format from scratch.

## How the code actually gets read

Schema.org defines the vocabulary — the nouns and properties — but it doesn't dictate the exact syntax used to write it into a page. For that, [Google supports three formats: JSON-LD, which is recommended, along with Microdata and RDFa](https://developers.google.com/search/docs/appearance/structured-data/sd-policies). In practice, JSON-LD has become the default almost everywhere, for a reason that matters mechanically: it sits in its own self-contained script block, separate from the visible HTML, rather than being woven directly into the tags that render content on the page. That separation makes it far easier to generate programmatically, easier to update without touching the visible design, and easier to audit, which is most of why virtually every modern CMS, page builder, and schema plugin defaults to it.

Here's roughly what that looks like in practice, stripped down to a minimal example for a local business:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Example Studio",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "Austin",
    "addressRegion": "TX"
  },
  "telephone": "+1-512-555-0100"
}
```

A crawler reading a page with that block embedded doesn't need to infer anything about which string on the page is a phone number. It's labeled. That labeling is then what allows Google's systems to consider the page eligible for the enhanced presentations collectively called rich results — the star ratings, the FAQ dropdowns, the recipe cards, the knowledge panel data pulled directly into the search results page itself.

## The distinction almost everyone gets wrong: eligibility, not ranking

This is the single most consequential thing to understand about schema markup, and it's also the thing most agencies and blog posts either get wrong or quietly blur, because the correct version is less exciting to sell. Structured data does not directly move your ranking position. Google has said this explicitly and repeatedly, not as a hedge but as a flat statement of how the system works: [a structured data manual action means that a page loses eligibility for appearance as a rich result; it doesn't affect how the page ranks in Google web search](https://developers.google.com/search/docs/appearance/structured-data/sd-policies). That's Google describing what happens when markup goes wrong — and even in the penalty case, ranking is explicitly untouched. The implication for when markup goes right follows the same logic: adding schema doesn't push you from position eight to position three.

What it does instead is change what your listing looks like once your ranking position is already decided elsewhere. Search Engine Land's reporting on this distinction, drawn directly from Google's own guidance, put it plainly: ["In order to be eligible to be shown as a rich result, you need to make sure that the page uses the right structured data and that it complies with the appropriate policies on our side," said Webmaster Trends Analyst John Mueller](https://searchengineland.com/google-stick-to-structured-data-guidelines-if-you-want-the-rich-result-323222). Even meeting every requirement isn't a guarantee of display — ["Keep in mind that it's not guaranteed for us to show these rich results just because a page uses the appropriate structured data," Mueller also said](https://searchengineland.com/google-stick-to-structured-data-guidelines-if-you-want-the-rich-result-323222). Markup is a prerequisite for the enhanced listing, not a purchase of it.

Why this distinction matters practically: if you're told schema markup is going to "boost your SEO," the honest, specific version of that claim is that it can make the listing you already have more persuasive once a searcher sees it — not that it changes whether you're seen in the first place. Confusing the two leads to disappointment when a site gets fully marked up and the ranking position doesn't budge, which is exactly what should be expected.

## Where the actual benefit shows up: the data on rich results

If schema isn't a ranking lever, it's worth being precise about what it actually is a lever for, and here the evidence is stronger than the vague "CTR increases" number that gets thrown around in marketing copy. Google's own published case studies are the most reliable source, because they're measuring real production sites rather than a single agency's client anecdote. [Rotten Tomatoes added structured data to 100,000 unique pages and measured a 25% higher click-through rate for pages enhanced with structured data, compared to pages without structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data), and [the Food Network converted 80% of their pages to enable search features, and saw a 35% increase in visits](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data).

The Rakuten case, documented directly by Google, is worth walking through because it shows the mechanism rather than just the headline number. [Rakuten used the recipe search experience and saw a 2.7X increase in traffic from search engines and a 1.5X increase in session duration](https://developers.google.com/search/blog/2019/04/enriching-search-results-structured-data). The traffic increase is the number that gets quoted, but the session duration increase is arguably more informative: a visitor who lands from a rich result already has more context about what they're clicking into — a photo, a cook time, a rating — which means the people who do click tend to be a better match for the content, not just a larger raw count of clicks. Two other cases from the same Google report reinforce the pattern at smaller scale: [Eventbrite leveraged event structured data and saw a 100% increase in the typical year-over-year growth of traffic from search, and Jobrapido integrated with the job experience on Google Search and saw a 115% increase in organic traffic](https://developers.google.com/search/blog/2019/04/enriching-search-results-structured-data).

Outside Google's own case studies, the broader body of industry reporting on CTR lift is noisier and less consistent — different agencies cite different numbers for different schema types, and the honest summary is that the range is wide and implementation-dependent rather than a single fixed percentage. One synthesis of the available testing puts typical CTR lifts for rich snippets in roughly the 10-30% range, with the caveat that exact gains depend heavily on snippet type and how much competition exists on that specific search result page. Treat any single "schema increases CTR by X%" claim with some skepticism — the direction of the effect is well established, the size of it is not a fixed constant.

## What marking something up does not entitle you to

A separate, less discussed problem: even correct, validating markup is not a guarantee of anything appearing. Google is explicit that eligibility and actual display are two different gates, and a page can clear the first without ever clearing the second, because the decision about whether to actually render a rich result also factors in competition from other eligible pages and the search engine's own judgment about what helps that particular query. This matters because it reframes what "my schema isn't working" usually means in practice — it rarely means the code is broken. It more often means the code is fine and simply isn't being selected for display on that particular query, which isn't something a developer can force through better markup alone.

## The types of schema worth knowing, and what each one is actually for

Not every schema type is equally useful to a typical business site, and it's worth being specific about the handful that do most of the real work:

**Organization and LocalBusiness** describe the business itself — name, address, phone number, hours, logo. This is foundational rather than flashy; it's less about winning a rich result and more about making sure Google's broader understanding of who you are, used across Maps, the Knowledge Panel, and local search, is drawn from a clean, authoritative source rather than pieced together from inconsistent directory listings.

**Review and AggregateRating** attach star ratings to a listing, which is the single most visually prominent rich result most small businesses will ever get. It only works, importantly, when there's a genuine review source behind it — this is not a type to populate with invented numbers, for reasons covered in the next section.

**Product** covers price, availability, and specifications for anything sold directly, and is the type behind most e-commerce rich results showing a price tag in the search listing itself.

**Article** helps a publisher's content — blog posts, news pieces — qualify for enhanced presentation in search and in Google's content-focused surfaces, tagging headline, publish date, and author.

**BreadcrumbList** replaces a raw URL in the search result with a readable navigation path, a small but genuinely useful clarity improvement on mobile results specifically.

**FAQPage** deserves its own callout, because its story recently changed in a way that's a useful lesson in itself — covered next.

## The lesson in the FAQ rich result's retirement

For years, FAQPage schema was one of the most commonly recommended types in SEO content, because it could produce expandable question-and-answer dropdowns directly inside a search result, taking up substantially more visual space than a competitor's plain listing. Then, in 2026, that changed. [Google's FAQPage structured data documentation carries the verbatim banner: "As of May 7, 2026, FAQ rich results are no longer appearing in Google Search."](https://www.digitalapplied.com/blog/structured-data-after-io-2026-schema-updates) [This is not a reduction in eligibility or a vertical restriction; it is a full retirement of the FAQ rich result on all surfaces and all verticals.](https://www.digitalapplied.com/blog/structured-data-after-io-2026-schema-updates)

The reason this is worth including in an explainer rather than a passing footnote: it's the cleanest real-world proof that structured data's value is entirely downstream of what the search engine chooses to do with it. A site's FAQPage markup can be flawless — perfectly valid, perfectly matched to visible content, zero errors in any testing tool — and still produce nothing, because the thing it was built to unlock was discontinued on Google's end, not broken on the site's end. Markup is a request made to a system that reserves the right to stop honoring that type of request entirely. That's a different failure mode than "your code is wrong," and worth distinguishing when diagnosing why a rich result that used to show up has disappeared.

## Where people get this wrong in practice

A few recurring mistakes account for most of the real-world problems with structured data, and none of them involve complicated code:

**Marking up content that isn't actually visible on the page.** Google's guidelines are direct about this: structured data has to describe what a visitor can actually see and read, not an aspirational or invented version of the page. A LocalBusiness block claiming hours, services, or reviews that don't actually appear anywhere in the visible content is a guideline violation, not a clever shortcut — and it's exactly the kind of thing that triggers a manual action.

**Letting it go stale.** A Review or Product schema reflecting a price from eight months ago, or availability that no longer matches reality, isn't just inaccurate — it actively damages trust the moment a visitor clicks through and finds a mismatch between what the search result promised and what the page delivers. Markup needs the same maintenance discipline as any other content on the site, not a "set once and forget" treatment.

**Assuming more markup is automatically better.** Marking up every conceivable type on every page, including ones with no real editorial justification, doesn't compound the benefit — it mostly adds surface area for something to be wrong, and quality guidelines are evaluated per-type, not in aggregate. A site with three types implemented correctly outperforms one with ten types implemented carelessly.

**Confusing "it validates" with "it's helping."** A markup validator checks syntax — is this JSON-LD well-formed, are the required properties present. It cannot tell you whether the information inside is accurate, whether it matches the visible page, or whether Google has chosen to actually use it for anything. Passing validation is necessary and not remotely sufficient.

## How to actually check whether yours is working

This is where theory needs to turn into something checkable. There are two distinct things worth testing, and conflating them is itself a common mistake.

**Technical validity** — is the code syntactically correct, are required properties present — is what [the Rich Results Test and the URL Inspection tool are built to catch, along with most technical errors](https://developers.google.com/search/docs/appearance/structured-data/sd-policies). Running a page through the Rich Results Test takes under a minute and will flag missing required fields immediately. This is the floor, not the ceiling.

**Actual display performance** — whether the markup is translating into real rich results showing up in real search traffic — lives in Google Search Console's structured data and search performance reports, which show impressions and clicks specifically for pages with rich result eligibility. This is the only place that answers the question that actually matters commercially: not "does this validate" but "is this doing anything."

**Quality accuracy** — whether the marked-up content actually matches what a visitor sees on the page, and whether it's current — is the one no automated tool fully catches. It requires a human looking at both the markup and the rendered page side by side and asking, honestly, does this match. This is the step almost every site skips, because it's the only one without a green checkmark at the end of it.

## A short checklist worth running on your own site

A handful of direct questions, worth answering honestly rather than assuming:

**Does your homepage and key service pages have LocalBusiness or Organization markup at all?** This is the foundational layer most business sites never get even this far with, independent of any fancier rich result ambitions.

**If you have star ratings in your schema, do they match a real, checkable review source?** Invented or unverifiable ratings are a guideline violation waiting to be caught, not a free visual upgrade.

**Has anyone checked whether your markup is current in the last six months?** Prices, hours, and availability drift. Markup that described reality in January can describe fiction by summer.

**Are you still relying on FAQPage schema and wondering why the dropdown stopped appearing?** As covered above, that's an industry-wide retirement, not a site-specific bug — worth confirming before anyone spends hours debugging code that was never broken.

**Has your markup actually been checked against Search Console's structured data report, or only against a validator?** These answer different questions, and only one of them tells you whether anything real is happening with it.

## Where this actually leaves you

Structured data is one of the few pieces of technical SEO that's genuinely simple to explain once the central confusion — ranking versus eligibility — is cleared up. It doesn't move your position in the results. It changes what your position looks like once you're there, and per Google's own published case studies, that visual difference is frequently worth a real, measurable share of additional clicks from the same ranking spot. The code itself is small, well-documented, and not particularly hard to implement correctly. The actual discipline it requires is the unglamorous kind: keeping it accurate, keeping it matched to what's really on the page, and checking, periodically, whether the thing it's supposed to unlock still exists on Google's end at all.
