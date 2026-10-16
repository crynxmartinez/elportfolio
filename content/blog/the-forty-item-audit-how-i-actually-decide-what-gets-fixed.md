---
title: >-
  The Forty-Item Audit: How I Actually Decide What Gets Fixed First (And What I
  Tell a Client to Ignore)
excerpt: >-
  An SEO audit tool will flag forty things wrong with a site in about ninety
  seconds. Most of them don't matter. Here's the actual reasoning behind which
  ones do.
date: '2026-10-16'
mode: reasoning
readTime: 18 min read
faqs:
  - q: Should I fix every issue an SEO audit tool flags?
    a: >-
      No. Audit tools are built to flag anything that deviates from a pattern,
      not to judge whether that deviation actually costs you anything. Treat the
      list as a set of questions to investigate, not a set of instructions to
      execute line by line.
  - q: Do I need to disavow toxic or spammy backlinks?
    a: >-
      In almost all cases, no. Google's own search advocates have said
      repeatedly that their systems identify and ignore manipulative links
      automatically, and that disavowing without a manual action in Search
      Console can do more harm than good. Save the disavow tool for a confirmed
      manual action, not a tool's toxicity score.
  - q: Will a few 404 errors hurt my rankings?
    a: >-
      Not directly. Google has said plainly that 404s are a normal, expected
      part of how the web works and don't themselves affect how other pages on
      your site rank. What's worth checking is whether an important page is
      404ing by accident, or whether a backlink-carrying page was deleted
      without a redirect — that's a real loss, just not the one the audit tool
      is naming.
  - q: Is crawl budget something a small business website needs to worry about?
    a: >-
      Almost never. Google's own documentation is specific about scale: crawl
      budget mainly matters for sites with over a million pages or over ten
      thousand pages changing daily. A ten-page local business site isn't in
      that conversation, and spending client budget optimizing for it is solving
      a problem that doesn't exist yet.
  - q: 'How do you actually decide what to fix first on a messy, older site?'
    a: >-
      By sorting for what actually touches whether a page gets found, crawled,
      and trusted — not by severity color in a dashboard. Then, between two real
      fixes, picking the one with the better long-run effect rather than the one
      that's fastest to close out, because a quick fix that creates a new
      bottleneck later isn't actually a fix.
coverImage: >-
  https://images.pexels.com/photos/8112185/pexels-photo-8112185.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940
coverImageAlt: >-
  A lawyer's desk featuring a justice statue, diploma, laptop, magnifying glass,
  and documents.
coverCredit:
  name: Pavel Danilyuk
  url: 'https://www.pexels.com/@pavel-danilyuk'
---

An audit tool takes about ninety seconds to scan a website and come back with a list. Forty items, sometimes eighty. Red, yellow, green. Missing alt text, duplicate meta descriptions, thin content, broken links, a crawl budget warning, a handful of backlinks flagged as "toxic," an H1 that's technically missing on three pages nobody visits. The report looks thorough. It looks like proof that something is very wrong and someone should get to work immediately.

Most of that list doesn't matter. Not "doesn't matter eventually" — doesn't matter at all, for this specific site, at this specific size, right now. And the honest, slightly uncomfortable part of this job is that figuring out which five items on a forty-item list are real requires more judgment than the audit itself. The tool can't tell the difference between a problem and a pattern that looks like a problem. That's the part I actually have to do.

## I don't trust the first read — including my own

When something's actually broken on a live site, my instinct isn't to start fixing. It's to get a second opinion on my own first opinion. I'll run an AI audit first, specifically because it's fast and it's unbiased by whatever I already assume is wrong. Then I don't take that output at face value either — I dig into whatever it flags, because an AI audit has the same blind spot a tool-generated SEO report has: it's pattern-matching against what usually causes problems, not confirming what's actually causing this one. After that I test the behavior myself, and I check logs and console, because that's where the actual evidence lives, not in a summary paragraph.

I bring the same posture to an SEO audit, even though nothing is technically "broken." A 40-line report is a list of patterns a crawler noticed. It is not a list of causes. Confusing the two is how a business ends up spending real money fixing things that were never costing them anything, while the one or two line items that were actually quietly capping their traffic sit untouched because they didn't get flagged in red.

## The filter I actually run everything through first

Before I decide what's urgent, I ask one blunt question about every flagged item: does this plausibly affect whether a page gets crawled, gets indexed, or gets trusted enough to rank? If the honest answer is "no, it's just untidy," it goes in a different pile — not deleted, just deprioritized, because untidy and broken are not the same category of problem and treating them the same is how a client's limited budget gets spent on the wrong five hours of work.

This sounds obvious written out like that. It's less obvious inside an actual audit report, because every item is formatted with the same visual weight — same red icon, same urgency, same implied "fix this." A missing meta description and a site returning soft 404s on category pages look identical in a dashboard. They are not identical in consequence. One is cosmetic. The other can quietly keep real pages out of the index. The dashboard won't tell you which is which. You have to go check.

## Why "fix everything red first" isn't actually a strategy

There's a version of audit triage that just sorts by severity label and works top to bottom. I don't use it, for the same reason I don't pick the fastest option when two approaches both technically work: fastest isn't the same as efficient, and severity-by-color isn't the same as impact-by-reality. The tie-breaker I actually use, on audits the same as everywhere else, is the long-run effect of fixing this versus fixing that — not which one closes out the ticket quickest.

A severity-sorted list will often put twelve "missing alt text" warnings above one genuinely important issue, purely because the tool found twelve instances of the first thing and one instance of the second. Twelve of something isn't automatically worse than one of something else. It just looks louder. Breaking the list down by actual consequence instead of count is the whole job here — the same decomposition instinct I use on everything else, applied to a report instead of a build.

## Case one: the duplicate content warning that isn't a penalty

Almost every audit on an older site flags duplicate or near-duplicate content — product variants, old blog categories, a page that got copy-pasted and half-edited two redesigns ago. The language in most tools makes this sound like a penalty waiting to happen. It mostly isn't. Google's own Search Advocate Martin Splitt has said directly that [duplicate content doesn't negatively impact a site's quality in Google's eyes, though it does cause some challenges](https://www.searchenginejournal.com/googles-martin-splitt-duplicate-content-doesnt-impact-site-quality/532425/) for the people running the site. The actual cost Splitt describes isn't a ranking hit — it's that [duplicate pages make it harder to track performance and can cause similar content to compete with itself](https://www.searchenginejournal.com/googles-martin-splitt-duplicate-content-doesnt-impact-site-quality/532425/), and that at scale it [can slow down crawling](https://www.searchenginejournal.com/googles-martin-splitt-duplicate-content-doesnt-impact-site-quality/532425/).

That reframes the whole decision. The question stops being "is this going to get us penalized" and becomes "is this costing us clarity or crawl efficiency." On a twelve-page local business site, three near-duplicate service pages probably aren't burning meaningful crawl budget — there's nothing to burn. On a 400-page site with a dozen near-identical location pages, it's a different conversation, because now two pages really might be splitting authority that should be sitting on one. Same audit flag, two completely different levels of urgency, depending entirely on scale — which the audit tool has no way of knowing on its own.

## Case two: the backlink report that wants you to panic

This is the one I push back on most often, because it's also the one client-facing audit tools are most aggressive about. A backlink report shows up with a toxicity score, a list of "spammy" referring domains, and an implicit recommendation to disavow all of them. It reads like an emergency. Google has said, repeatedly and specifically, that it isn't.

Asked directly about this, Google's John Mueller has said [it's not necessary to do anything about spammy backlinks because Google ignores them, and he didn't suggest using the Disavow Tool](https://www.searchenginejournal.com/google-on-spammy-backlinks-negative-impact-on-rankings/511433/) at all. He's made the same point elsewhere even more plainly, saying [most websites do not need to worry about toxic links, because when their systems run across links they think are bad, they primarily ignore them](https://searchengineland.com/toxic-links-disavows-seo-383324). The actual Google guidance on when disavowing is warranted is narrow — essentially a confirmed manual action in Search Console, or a provable, large-scale negative SEO attack — not a third-party tool's toxicity percentage.

I don't ignore this line item because it's unimportant. I ignore acting on it because the action itself — spending hours building a disavow file against a tool's guess — has a real cost and close to zero plausible upside for the overwhelming majority of sites that have never bought links or run a manipulative campaign. The one time I'd actually revisit this is a confirmed manual action notice inside Search Console itself, from Google, not a vendor dashboard. That's a different document with a different level of authority behind it, and it changes the entire calculation.

## Case three: the wall of 404s

Every older site accumulates dead pages. An audit will list every single one, formatted to look like a wall of damage. Here too, the actual guidance is calmer than the tooling suggests. Google's Search Relations team has stated directly that [404 errors do not affect the rankings of other pages on a site](https://ppc.land/404-errors-dont-hurt-rankings-says-google-search-relations-team/), and cautioned site owners against reflexively redirecting every dead page to the homepage just to make the report look cleaner, since that can [lead to poor user experiences](https://ppc.land/404-errors-dont-hurt-rankings-says-google-search-relations-team/) of its own. The broader reporting on this is consistent: [Google's John Mueller addressed whether numerous 404 errors negatively impact rankings and clarified that 404 responses are not always something that needs fixing](https://www.searchenginejournal.com/google-cautions-on-improper-404-handling/525243/).

What I actually check, once a client's audit lights up with forty 404s, isn't the count. It's whether any of those dead URLs are pages that should still exist — an old page that got orphaned during a redesign, a service page a client renamed without a redirect, a blog post that used to rank and now silently 404s. That's a real loss, worth fixing immediately. A decade-old blog tag page returning a 404 because the tag taxonomy changed in 2019 is not a loss. It's the web working the way it's supposed to. Sorting the forty into those two buckets takes maybe twenty minutes. Fixing all forty identically, without sorting first, takes much longer and solves a problem that mostly didn't exist.

## Case four: the "thin content" warning on a 280-word page

Audit tools routinely flag any page under some arbitrary threshold — often 300 or 500 words — as "thin content," with a built-in recommendation to add more text before resubmitting the page for a rescan. I treat this one almost the opposite of how it's presented. The word count itself isn't the problem, and padding a page toward a round number is more likely to hurt the page than help it.

Google's John Mueller has been about as direct about this as he gets about anything. Asked in a Reddit thread whether word count affects rankings, his reply was blunt: [Word count is not a ranking factor](https://www.seroundtable.com/google-word-count-is-not-a-ranking-factor-27994.html). When the same thread asked about tools for benchmarking word count against top-ranking competitors, his advice was to [save yourself the trouble](https://www.seroundtable.com/google-word-count-is-not-a-ranking-factor-27994.html). He's made the identical point elsewhere, noting specifically that [just blindly adding text to a page doesn't make it better](https://www.searchenginejournal.com/word-count-seo-importance/441742/).

That doesn't mean length is irrelevant to a given page — it means the causality runs backwards from what the audit implies. A page is short because its topic was covered quickly, or because it's genuinely thorough and doesn't need padding. Mueller has allowed that a word count target can still function as a useful internal guideline, saying it's [fine to use word counts for yourself as a guideline for your content, if it encourages better content from your writers](https://www.searchenginejournal.com/google-comprehensive-content/379652/) — but that's a sentence about managing a content team, not a ranking input aimed at Google's crawlers.

What I actually check when a page gets flagged as thin is whether it answers the question a visitor came with, completely, or whether it leaves something unaddressed that a competitor's page covers. If it answers completely in 280 words, the flag is noise and I move past it. If it leaves something real unaddressed, the fix is adding the missing information — not stretching existing sentences toward an arbitrary number an audit tool decided on without ever reading the page.

## Case five: the mobile usability section checking a rulebook that no longer exists

Some SEO audit tools, particularly the older or cheaper ones, still generate a "mobile usability issues" section modeled directly on a specific Google Search Console feature — a feature that Google itself no longer runs. In December 2023, Google officially retired Search Console's Mobile Usability report along with the Mobile-Friendly Test tool and its API, posting at the time: [Today we're sunsetting Search Console's Mobile Usability report, Mobile-Friendly Test tool and Mobile-Friendly Test API](https://searchengineland.com/google-officially-drops-mobile-usability-report-mobile-friendly-test-tool-and-mobile-friendly-test-api-435377).

Google was careful to clarify that the retirement wasn't a signal that mobile friendliness stopped mattering. The same announcement stated plainly that [this doesn't mean that mobile usability isn't important for success with Google Search; it remains critical for users, who are using mobile devices more than ever](https://developers.google.com/search/blog/2023/04/page-experience-in-search). The actual reason given for retiring the dedicated report was that, in [the nearly ten years since Google initially launched this report, many other robust resources for evaluating mobile usability have emerged, including Lighthouse from Chrome](https://searchengineland.com/google-officially-drops-mobile-usability-report-mobile-friendly-test-tool-and-mobile-friendly-test-api-435377).

This matters for how I treat a flagged list, because some third-party audit tools are still generating mobile usability scores using logic built around a report that no longer exists on Google's side at all, sometimes checking for things — tap-target spacing thresholds, viewport configurations — that were relevant when most sites weren't responsive by default and are now close to a solved problem in any modern framework. When this section shows up on an audit, I don't trust its framing. I open the actual page on an actual phone, and I run it through Lighthouse directly, because that's the tool Google itself pointed to as the replacement. Most of the time the "mobile usability issues" the report lists were already fixed by the responsive framework the site was built on years ago, and the flag is measuring a problem that stopped being common well before the client ever hired anyone.

## The one line item that isn't actually a checklist item

Every modern audit eventually mentions E-E-A-T — experience, expertise, authoritativeness, trust — usually as a single bullet point with a vague recommendation to "add author bios" or "include credentials." I find this the most honestly difficult line item on any list, because unlike the others, it genuinely can't be fixed with a task. Google itself has been explicit that these are rater guidelines, not a scoring algorithm: [these guidelines are what are used by our search raters to help evaluate the performance of our various search ranking systems, and they don't directly influence ranking](https://developers.google.com/search/blog/2022/12/google-raters-guidelines-e-e-a-t?hl=zh-jp). There's no E-E-A-T score sitting in a database waiting to be nudged upward by adding a bio paragraph.

What that means practically is that this item doesn't belong on the same list as "fix broken link" at all. It's not a task with a defined endpoint — it's closer to an ongoing argument the whole site has to keep making: that a real person with real experience is actually behind the content, that the business is who it says it is, that claims are specific rather than generic. I treat it the way I treat continuous improvement generally, not as a box to check once. It shows up in how a case study is written, whether a result has a real number attached to it instead of a vague claim, whether the person writing about a topic has actually done the thing. There's no ticket I can close that makes this "done," and I've stopped pretending there is one for a client's sake.

## When the client's list and my list disagree

Sometimes a client hands me their own audit — usually from a tool they found on their own, sometimes from a previous agency — with their own idea of what's urgent, and it doesn't match mine. The instinct to just overrule it is strong, and I don't do that. I ask how they landed on this list, genuinely, not as a rhetorical setup. Usually there's a real reason underneath it: a competitor ranks above them and the competitor's site looks cleaner, or someone told them backlinks were hurting them, or a tool assigned their site a "health score" that scared them.

Once I understand where the concern actually came from, I don't tell them they're wrong. I lay out what I'd actually prioritize and why, as one option next to theirs, and let them choose with the full picture in front of them rather than a dashboard's severity colors. Most of the time, once the reasoning is visible — this item plausibly affects whether pages get found, this one is cosmetic, this one is a tool guessing — the client's own priorities shift to match without me ever having to say their original list was wrong. The disagreement usually isn't really about SEO. It's about which signals they'd been trusting before anyone walked them through what the signals actually mean.

## Where I'm genuinely unsure

I want to be honest about the edges of this, because treating every audit item with total confidence would be its own kind of dishonesty. Scale changes everything here, and I don't always know a site's real scale implications until I've actually looked at its Search Console data, not just its page count. Google's own crawl budget documentation is specific that [crawl budget considerations are primarily relevant for large sites with over a million pages, or medium-to-large sites with over ten thousand pages changing daily](https://developers.google.com/crawling/docs/crawl-budget), and separate reporting on the same guidance notes it mainly matters for [very small sites where Google says the Crawl Stats report is generally unnecessary](https://dev.to/alifar/google-crawl-guidance-when-smaller-sites-can-stop-worrying-about-crawl-budget-n9a), versus sites with far larger URL inventories. Most client sites I work on sit nowhere near that threshold, which means most crawl budget warnings in a generic audit tool are noise for this specific business. But "most" isn't "all," and a site with aggressive faceted navigation or a poorly built CMS can hit crawl inefficiency at a much smaller page count than the headline numbers suggest. I don't assume a client is safely under the threshold just because their page count looks small — I check the actual crawl stats before I rule it out, because ruling it out on an assumption is exactly the kind of shortcut that creates the bottleneck later.

I'm also genuinely unsure where the line sits on 404 volume for smaller sites specifically, because most of the public guidance and case data is written with larger sites in mind. The reasoning transfers in principle — individual 404s aren't a ranking signal, volume at meaningful scale can mean something — but I don't have confidence in exactly where "meaningful scale" starts for a 30-page business site versus a 30,000-page one, and I'd rather say that plainly than invent a number that sounds authoritative. What would change my mind on any of this is the same thing that always changes my mind: actual behavior in the logs and in Search Console for that specific site, not a general rule applied uniformly.

## What actually happens after the sorting

Once the real list is separated from the noise, it's usually short — three to six items, not forty. That's not because the audit tool was wrong to flag the other thirty-four. It's because flagging deviation from a pattern and judging actual consequence are two different jobs, and only one of them is something software does well. The real list gets worked through the same way everything else does here: broken into the smallest piece that can actually be finished, checked, and then reassessed — because the honest answer to "is the site done now" is never yes. There's always a next question worth asking, which is the only part of this that doesn't change no matter how the tools or the guidelines shift underneath it.
