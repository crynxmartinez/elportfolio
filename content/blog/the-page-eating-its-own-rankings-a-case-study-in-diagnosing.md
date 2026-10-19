---
title: >-
  The Page Eating Its Own Rankings: A Case Study in Diagnosing Real Keyword
  Cannibalization
excerpt: >-
  A composite case study in why a business's own pages were quietly competing
  against each other for the same search term — and the difference between
  fixing that and chasing a myth.
date: '2026-10-19'
mode: case-study
readTime: 17 min read
faqs:
  - q: >-
      Does having more than one page rank for the same keyword always mean I
      have a cannibalization problem?
    a: >-
      No. Google's own guidance, and independent research from Ahrefs, both make
      the same point: most pages rank for hundreds of related terms, and two
      URLs showing up for one query is often healthy overlap, not a conflict.
      It's only a real problem when the pages target the same keyword and the
      same intent and are measurably hurting each other's performance — which
      you confirm with data, not a hunch.
  - q: >-
      How do I actually confirm cannibalization instead of guessing from a site:
      search?
    a: >-
      Start in Google Search Console's Performance report, filter by the query
      in question, then switch to the Pages tab. If you see multiple URLs
      splitting impressions and clicks, with positions trading places over time,
      that's the real signal. A site: search is a fine starting point but it
      only shows overlap, not whether that overlap is actually costing you
      anything.
  - q: >-
      Will merging two pages and redirecting one hurt the backlinks pointing to
      the page I delete?
    a: >-
      Done correctly, no — that's the entire point of a 301 redirect paired with
      a canonical signal. It consolidates the ranking signals, including
      backlinks, onto the one URL you keep, rather than losing them. The risk
      isn't in redirecting; it's in redirecting to a page that doesn't actually
      satisfy the same intent the old page was earning links for.
  - q: Should I use a canonical tag or a 301 redirect to fix it?
    a: >-
      If the page you're removing has no reason to keep existing — no separate
      audience, no separate use case — redirect it. Reserve the canonical tag
      for near-duplicates you still need to keep live for some other reason,
      like tracking parameters or a filtered version of the same page.
      Merge-and-redirect is the default; canonical is the exception.
  - q: How long does it take to see the effect after consolidating the pages?
    a: >-
      There's no fixed number, because it depends on how quickly Google recrawls
      the affected URLs and rebuilds its ranking signals around the new
      canonical page. What you're watching for isn't a sudden jump — it's the
      query's performance data in Search Console shifting from being split
      across several URLs to consolidating cleanly onto one, which is usually
      visible within a few reporting cycles.
coverImage: >-
  https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940
coverImageAlt: >-
  Sleek laptop showcasing data analytics and graphs on the screen in a bright
  room.
coverCredit:
  name: Lukas Blazek
  url: 'https://www.pexels.com/@goumbik'
---

A law firm's marketing coordinator pulled up Google Search Console one afternoon to check on a page the firm had just spent real money producing — a long, carefully written guide on estate planning for the firm's home state. She expected to see it climbing. Instead, she saw something stranger: the query it was supposed to own was showing impressions, clicks, and a bouncing average position, but Search Console's Pages tab told her those metrics weren't landing on the new guide at all. They were spread across four different URLs, all belonging to the same site, all nominally about the same thing, and none of them higher than position six.

This is a composite situation, built from a pattern that shows up constantly in site audits rather than a single named client, but it's worth walking through in full because the symptom — content that should be working, producing numbers that don't make sense — is one of the most common and most misdiagnosed problems in SEO. The reflex, the moment someone notices multiple pages ranking for the same term, is to shout "keyword cannibalization" and start deleting things. That reflex is usually wrong in its details even when it's right in its instinct, and the difference between those two outcomes is the entire subject of this piece.

## What the Site Actually Looked Like From the Outside

The firm in question had, over about four years, accumulated four separate pages that all had a legitimate claim to the search term "estate planning attorney" plus their city name. There was the original service page, built when the site first launched. There was a blog post written two years later by a content freelancer who had no visibility into what the service page already covered. There was a landing page originally built for a paid ad campaign, repurposed for organic traffic after the campaign ended, because someone decided it seemed wasteful not to. And there was a location page, added when the firm opened a second office, that described the same practice area in slightly different words for a slightly different neighborhood.

None of these pages were bad on their own. Read individually, each one was competent, reasonably well-written, and aimed at a real visitor. The problem wasn't quality. The problem was that nobody had ever stepped back and asked whether four pages needed to exist for one search intent, and Google's own systems were left to make that call instead — repeatedly, inconsistently, and at the site's expense.

## The Term Everyone Reaches For, and Why It's Usually Misapplied

"Keyword cannibalization" is the label almost everyone reaches for in this situation, and it's worth being precise about what it actually means before diagnosing anything, because the term gets used far more loosely than the problem it's supposed to describe. The standard definition, echoed across the SEO industry, is that it occurs when [two or more pages on a website target the same keyword or very similar keywords, start competing against each other for the same spot in Google search results, and instead of one strong page ranking, you end up with multiple weak pages splitting the ranking power](https://www.santhyainfotech.com/blog/keyword-cannibalization/).

That definition sounds alarming, and it's gotten more alarming through a decade of repetition — but it's also easy to over-apply, because most sites have far more keyword overlap than people assume, and most of it is completely harmless. Research from Ahrefs looking at a large sample of search queries found that [pages ranking in the top 10 for a primary keyword typically also rank for hundreds of related terms](https://digitalguider.com/blog/what-is-keyword-cannibalization/), which means two pages that appear to compete on a single keyword may actually be doing fine, serving genuinely different slices of demand that just happen to overlap on one query. Ahrefs went further in a dedicated study of its own site, noting flatly: [At Ahrefs.com we've got 9.7k cases of "keyword cannibalization"—but almost none of them need fixing.](https://ahrefs.com/blog/multiple-rankings-study/)

Google has been saying some version of this for years, and has recently said it more directly. Asked about the issue in 2025, John Mueller's answer, as reported by Search Engine Journal, was blunt: [two pages on your website appearing for the same query is not, by itself, an error. Seeing several pages from the same site in a result is not problematic just because there is "more than one." What should be reduced is unnecessary duplication.](https://www.latevaweb.com/en/keyword-cannibalization-how-to-fix-it-or-leave-it) Mueller has made the same point before in more memorable terms, comparing it to search results for a generic topic: as he's put it, a page about cheese might legitimately show up alongside "shops, recipes, suggestions, knives, pineapple, etc." without any of them being duplicates of each other.

So the first move in this case study wasn't to assume the four estate-planning pages were a problem. It was to find out whether they actually were one.

## Telling Real Cannibalization From Harmless Overlap

The diagnostic method here is more mundane than most blog posts make it sound, and that's the point — it doesn't rely on a tool's proprietary "cannibalization score," it relies on the same free data Google already gives every site owner. The standard approach is to [start in Google Search Console: Performance, filter by query, Pages tab](https://www.smartsites.com/blog/keyword-cannibalization-in-seo-how-to-find-and-fix-it/), which is exactly what the firm's marketing coordinator had stumbled into without fully realizing what she was looking at. When you filter the Performance report to a single query and switch to the Pages view, you see every URL on the site that earned an impression for that term, side by side, with its own clicks, impressions, and average position.

For most of the firm's keywords, this view showed exactly one URL, cleanly. For "estate planning attorney [city]," it showed four, trading positions with each other week over week — one URL at position 5 one week, a different one at position 7 the next, a third briefly spiking to position 4 before dropping out of the top ten entirely. That instability, not the mere existence of multiple URLs, is the actual signal. Mueller's 2025 clarification spells out exactly why this pattern matters: when two pages genuinely compete for the same intent, the usual effects are that [links and internal anchors are split between two URLs instead of strengthening one, the query's average position fluctuates because Google alternates the page it shows, the click goes to a less suitable URL, and results analysis becomes confusing because the traffic is divided](https://www.latevaweb.com/en/keyword-cannibalization-how-to-fix-it-or-leave-it). That description matched the Search Console data almost exactly.

There's a useful structural exception worth naming here too, because it's the other half of the diagnosis: category and hub pages. A site can have a broad overview page and a specific, detailed page sharing a keyword without that being a problem, because [category, hub, and tag pages within a broader website structure will naturally share keywords with standalone articles... That's fine because users recognise that a category page signposts to content rather than replacing it, and Google spots this too and ranks accordingly](https://machined.ai/blog/keyword-cannibalization-guide). The firm's four pages didn't fit that pattern. None of them pointed to the others as a hub would. Each one tried, independently, to be the complete answer.

## What Was Actually Sitting Underneath the Symptom

This is the part that matters most, because "merge the pages" is an easy thing to say and a slightly harder thing to do correctly if you don't understand why the pages ended up competing in the first place. The real cause almost never shows up in the pages' copy — it shows up in the site's structure and history.

Mueller's own framing is useful here: the word "cannibalization" is often a catch-all that masks more specific, fixable problems. As he put it, the label [often hides more concrete, real problems: unfocused pages, insufficient internal linking, thin content or near-total duplication. The useful question, then, is not "are there two URLs?", but "do they compete for the same intent and are they hurting each other?"](https://www.latevaweb.com/en/keyword-cannibalization-how-to-fix-it-or-leave-it) In the firm's case, two underlying structural failures were doing the actual damage.

The first was internal linking. An audit of the site's navigation, footer, and related-post modules found that all four pages were being linked to from different places across the site, using inconsistent anchor text — "estate planning," "estate planning services," "plan your estate," and the exact city-plus-service phrase, scattered more or less at random depending on which page happened to be live when a given internal link was written. This matters more than it looks like it should, because [if you link to two different pages with the same anchor text, you tell Google both pages are about the same thing — internal links for a keyword should point at the one page you want to rank, with anchor text that matches each page's own focus](https://www.smartsites.com/blog/keyword-cannibalization-in-seo-how-to-find-and-fix-it/). The firm's internal linking wasn't doing that. It was telling Google, repeatedly and inconsistently, that all four pages deserved equal weight for the same idea.

The second was a pattern Google has warned about for years, going back to a 2018 Reddit AMA that's still cited constantly because the advice hasn't changed: thin, geographically-differentiated pages that don't add unique information beyond a location name. Mueller's answer at the time was direct — [doorway pages are a bad user experience and against webmaster guidelines, and if you don't have unique information to add to a page other than a city name, you should fold those pages together and make a single, really strong page instead](https://www.billhartzer.com/google/takeaways-google-john-mueller-ama-reddit/). The firm's location page was close to this exact pattern — not a deliberate doorway page, nobody set out to build one, but functionally indistinguishable from one. It restated the same estate-planning content with a different neighborhood name swapped into the H1, with nothing substantively unique underneath.

Put those two problems together — scattered internal linking and a near-duplicate location page — and the four-way split in Search Console stopped being mysterious. It was the predictable outcome of a site that had grown by addition, with each new page solving an immediate need (a blog post for content calendar quota, a landing page for a paid campaign, a location page for a new office) without anyone checking what already existed for that term.

## The Fix, and Why It's More Than a Rewrite

Once the diagnosis was confirmed with data rather than assumption, the fix followed a fairly standard shape, but the details matter more than the headline. The general approach across SEO guidance on this is consistent: [merge and 301 is the default fix, with a canonical tag reserved only for near-duplicates — the underlying goal is to keep one URL per search intent](https://www.smartsites.com/blog/keyword-cannibalization-in-seo-how-to-find-and-fix-it/).

For the firm, that meant choosing one page to survive — the original service page, since it had the longest history and the most accumulated backlinks — and rebuilding it to absorb the genuinely useful content from the other three: the more detailed explanatory sections from the blog post, the stronger calls to action from the old paid landing page, and the location-specific detail from the second-office page, folded in as a clearly labeled section rather than spun out into its own URL. The other three URLs were then 301-redirected to the surviving page, not left live and merely de-linked, because a redirect — unlike simply ignoring a page — actively consolidates its signals rather than abandoning them.

This isn't a stylistic preference; it's how Google's own systems are documented to behave. Google's Search Central guidance on handling duplicate or near-duplicate URLs is explicit that the reason to canonicalize or consolidate at all is [to consolidate signals for similar or duplicate pages — it helps search engines consolidate the signals they have for the individual URLs, such as links to them, into a single, preferred URL](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls). Google has also documented, in its own guidance on reading the resulting Search Console data, that after consolidation [you will see traffic shift from any non-canonical, duplicate URLs to the canonical URL](https://developers.google.com/search/blog/2019/02/consolidating-your-website-traffic-on) — which is precisely the before-and-after signature to look for, and precisely what eventually showed up in the firm's Performance report: the same query, previously split four ways, reporting against a single URL.

Internal links were then cleaned up across the site to point exclusively at the surviving page, with anchor text standardized rather than left to whatever phrase a given writer had reached for. That piece alone addressed the "unfocused pages" and "insufficient internal linking" causes Mueller's framework points to directly — the site was no longer telling Google four different things about where that topic lived.

It's also worth noting a detail that rarely makes it into "how to fix cannibalization" checklists: Google's search results themselves are built to discourage exactly the pattern the firm had been accumulating. In 2019, Google rolled out what it called a site diversity change, confirming that [Google will aim to show no more than two results from the same domain for a particular query in the top results](https://searchengineland.com/google-search-update-aims-to-show-more-diverse-results-from-different-domain-names-317934). The company was explicit that this was a display change rather than a ranking change, and that [this site diversity change means that you usually won't see more than two listings from the same site in top results](https://searchengineland.com/google-search-update-aims-to-show-more-diverse-results-from-different-domain-names-317934). Even setting aside the internal competition between the firm's own pages, the fourth-best internal candidate for that query was never going to get meaningful visibility anyway — Google simply wasn't going to show it. Consolidating down to one strong page wasn't giving anything up. It was stopping the site from quietly competing against a ceiling that was always there.

## What Changed, and What That Change Actually Looked Like

It's worth being honest about what resolution looks like in a case like this, because it isn't dramatic, and it isn't a number worth inventing for effect. The visible change wasn't a sudden jump to position one. It was the Search Console data for that query collapsing from four competing URLs into one — the same query, the same approximate volume of impressions, now attributed to a single, stronger page instead of divided unevenly across four weaker ones. Average position, which had been bouncing unpredictably between five and ten depending on which internal URL Google happened to be favoring that week, settled and began moving in one direction instead of oscillating.

That stabilization is the actual mechanism behind why consolidation works, and it maps directly onto the reasoning in Mueller's original, now years-old but still widely cited answer on this exact question: asked how Google views pages competing with each other, he said plainly, [we just rank the content as we get it — if you have a bunch of pages with roughly the same content, it's going to compete with each other, kinda like a bunch of kids wanting to be first in line, and ultimately someone else slips in ahead of them](https://www.billhartzer.com/google/takeaways-google-john-mueller-ama-reddit/). The firm's four pages had been four kids elbowing each other out of the way, and the competitor that quietly slipped past all of them wasn't a stronger business — it was just a site with one clean, unambiguous answer to the query instead of four muddled ones.

There's also a secondary benefit that's easy to miss if you're only watching rankings: conversion. A visitor landing on the stronger, consolidated page encountered a single clear argument instead of a redundant or contradictory one depending on which of the four URLs they happened to land on. The reasoning behind the "merge, don't just monitor" approach isn't only about search engines — it's that there's little point maintaining several pages with the same purpose when [one of them converts better, and effort should concentrate on that one page rather than a lower-converting version aimed at the same traffic](https://loganix.com/what-is-keyword-cannibalization/).

## The Discipline That Actually Prevents This From Recurring

Fixing the four pages solved the symptom. It didn't solve the underlying habit that produced them, which is the part most audits skip past because it's less satisfying than a before-and-after screenshot. The firm's real problem wasn't that four pages happened to exist — it's that nothing in their process checked whether a new piece of content was stepping on an old one before it got published.

The fix for that is unglamorous: a keyword map, maintained as a living document rather than a one-time spreadsheet, assigning exactly one primary target to each page on the site before anything new gets written. The logic is straightforward — without it, [different pages on a website can unintentionally compete with each other for the same keyword, confusing both Google and the audience](https://digitalguider.com/blog/what-is-keyword-cannibalization/), and the fix is to [assign one primary keyword per page, ensuring each page has a unique focus and avoids unnecessary overlap](https://digitalguider.com/blog/what-is-keyword-cannibalization/). A practical version of this, usable by any team without specialized tools, is to export every URL on the site along with its intended primary keyword and sort the list — [export all URLs using a crawler, add a column for each page's primary target keyword, and sort by that column; any keyword that appears more than once is a cannibalization risk](https://www.smartsites.com/blog/keyword-cannibalization-in-seo-how-to-find-and-fix-it/) worth investigating before it becomes a four-URL problem again.

It's also worth treating this as a recurring discipline rather than a cleanup project with an end date. As one practical guide on the subject puts it, after a fix is in place the work isn't finished — [keep tracking keyword rankings, traffic, and engagement metrics for the affected pages, because cannibalization may resurface as new content is introduced](https://digitalguider.com/blog/what-is-keyword-cannibalization/). Every new blog post, every new location page, every campaign landing page repurposed for organic traffic is a fresh opportunity to recreate exactly the situation the firm had spent months untangling, unless someone checks the map first.

## Where This Actually Leaves You

The instinct that something is wrong when a page underperforms is usually right. The specific diagnosis attached to that instinct — "cannibalization," reached for the moment a site: search turns up more than one URL — is usually wrong, or at least incomplete, because most overlap is harmless and some of it is actively useful. The way to tell the difference isn't a tool's automated flag. It's going into Search Console, filtering by the actual query, and watching what the Pages tab shows over several weeks: stable, or splitting and swapping.

When it's genuinely splitting, the fix isn't deleting content out of anxiety. It's doing the slower, less visible work of figuring out which page deserves to survive, consolidating the others into it honestly rather than deleting them into nothing, redirecting instead of abandoning, and fixing the internal linking habits that let four competing pages accumulate in the first place. None of that is about chasing an algorithm. It's about giving Google, and more importantly a real visitor, exactly one clear, well-built answer instead of asking either of them to guess between four mediocre ones.
