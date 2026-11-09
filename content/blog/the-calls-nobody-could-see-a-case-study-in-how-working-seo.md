---
title: >-
  The Calls Nobody Could See: A Case Study in How Working SEO Got Mistaken for a
  Failing Channel
excerpt: >-
  A composite case study in a local business that almost cut its best-performing
  marketing channel, because the calls it was generating never passed through
  the analytics meant to prove it was working.
date: '2026-11-09'
mode: case-study
readTime: 17 min read
faqs:
  - q: >-
      Why don't calls from my Google Business Profile show up in Google
      Analytics?
    a: >-
      Because they never touch your website. When someone taps the call button
      directly on your Business Profile in Search or Maps, the call connects
      straight from Google's own interface — the visitor never lands on a page
      your analytics tool can see. That interaction lives only in Google
      Business Profile's own insights, not in GA4 or any website-based tool,
      unless you're specifically cross-referencing both.
  - q: Does GA4 track phone calls at all?
    a: >-
      Only in a limited way, and only for calls that originate on your website.
      It can register a click on a tel: link as an event, but that's a click,
      not a completed call — someone can tap a phone number and never actually
      dial, or dial and hang up in two seconds, and GA4 has no native way to
      tell the difference without additional setup.
  - q: What's the difference between call tracking and just using GA4?
    a: >-
      GA4 tells you a phone number was clicked. Call tracking software assigns
      distinct numbers (often dynamically, per visitor or per source) so you can
      hear whether a call actually connected, how long it lasted, and which
      keyword, page, or campaign it came from — the layer of detail GA4 was
      never built to provide.
  - q: >-
      Is it worth setting up call tracking for a small, single-location
      business?
    a: >-
      If phone calls are a meaningful share of how people actually convert —
      which is true for most local service businesses — then yes, at least in a
      lightweight form. You don't need enterprise-grade dynamic number insertion
      to start; even a simple second tracking number on your Business Profile
      versus your website gives you a first real signal of where calls
      originate.
  - q: How do I know if my business has this same blind spot?
    a: >-
      Pull your Google Business Profile insights export and your website
      analytics for the same month, side by side. If your profile shows a
      meaningful number of direct calls and direction requests that have no
      corresponding session in your website analytics, you've found it — those
      are conversions your current reporting has no way to credit to anything.
coverImage: >-
  https://images.pexels.com/photos/7580908/pexels-photo-7580908.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940
coverImageAlt: >-
  A hand dialing a phone on a wooden desk. Office environment with keyboard and
  planner.
coverCredit:
  name: RDNE Stock project
  url: 'https://www.pexels.com/@rdne'
---

The first sign something was wrong wasn't a drop in traffic. It was the opposite — traffic was fine, rankings were fine, and the conversation almost happened anyway: a regional home-services business, three locations, was fifteen minutes from cutting its SEO retainer in half.

This is a composite case, built from a pattern that shows up often enough to be worth walking through in full rather than naming any single client. The shape of it is simple to state and surprisingly easy to miss while it's happening: the SEO was working exactly as intended. The business just couldn't see it, because the thing SEO was actually producing — phone calls — was happening in a place its own reporting had never been built to look.

## The meeting where the channel almost got cut

The setup was ordinary. Eight months into a local SEO engagement, rankings for the business's core service terms had climbed into the top few local results in two of its three service areas. Google Business Profile views were up. The business owner had noticed, anecdotally, that the phone seemed to be ringing more during the hours he was actually in the truck rather than at a desk — the kind of detail that sticks with an owner more than a spreadsheet does.

But the monthly report his office manager pulled from Google Analytics told a flatter story. Organic traffic was up. Sessions were up. "Conversions" attributed to organic and direct traffic — built around a handful of GA4 events tied to the contact form and a clickable phone number in the header — were essentially unchanged from where they'd been at the start of the engagement. In a budget review meeting, that flat line next to a line-item SEO invoice is exactly the kind of comparison that gets a channel killed, regardless of whether it deserves it.

That's the moment worth slowing down on, because the instinct in that room was not unreasonable. It was the natural conclusion from the only data anyone had actually been shown.

## What the dashboard actually said, and what it didn't

The report wasn't lying. It was just answering a narrower question than anyone in the room realized. GA4 was correctly reporting what happened on the website — and only what happened on the website. If a visitor clicked the phone number in the site header, that click could be logged as a conversion event. If they filled out the form, same thing. What the dashboard had no way to represent was anything that happened before a visitor ever reached the site, or instead of reaching it.

This isn't a quirk specific to this business's setup. It's a structural limit of the tool. [GA4 is built to track what happens on your website, and for businesses where a meaningful portion of revenue is generated through phone calls, in-person visits, or sales conversations that begin online and close offline, GA4 has no native way to connect those outcomes back to the marketing activity that drove them.](https://www.ruleranalytics.com/blog/analytics/google-analaytics-missing-conversions/) That's not a configuration mistake. It's the tool operating exactly as designed, for a question it was never built to answer.

The phone-number click tracking the business did have in place made the picture look more complete than it was, which was arguably worse than having no call data at all. A team at nine peaks media, writing specifically about this failure mode, put the problem bluntly: [GA4's native call tracking has a major flaw — it only registers when someone clicks a phone number link and not the actual call completion, and GA4 counts this as a successful call event, even though no one talked to anyone.](https://ninepeaks.io/your-step-by-step-guide-to-track-phone-calls-in-google-analytics) A click registers as a conversion whether the visitor actually dialed, hung up immediately, or pocket-dialed the number by accident. The dashboard can look stable or even healthy while telling you almost nothing about whether a single real conversation happened.

## The theory everyone reached for first

The first explanation anyone reaches for in a meeting like this is almost always the same one: the website's conversion path must be broken. Maybe the phone number isn't prominent enough. Maybe the form has too many fields. Maybe the SEO traffic is lower intent than it used to be — people browsing rather than people ready to call.

All of those are reasonable hypotheses, and in a lot of cases, one of them is the right answer. But reaching for a conversion-path explanation first assumes the conversions you can already measure are the complete universe of conversions actually happening. In this case, that assumption was the actual bug. The business spent nearly two weeks auditing its contact form and testing a sticky header phone number before anyone thought to ask a more basic question: where do local customers in this industry actually call from, and does any of that route through the website at all?

## What the Google Business Profile data was actually showing

That question led somewhere the GA4 report had never pointed. Pulled separately, the business's Google Business Profile insights showed a steady, unmistakable climb in direct calls and direction requests over the exact period the GA4 "conversions" line had stayed flat — calls initiated from the profile card in search and maps, not from the website.

This isn't an edge case specific to one business. Industry-wide data on how people actually interact with a Business Profile shows calls and direction requests make up a substantial share of total engagement, often comparable to or larger than clicks through to the website itself. [Consumer actions after viewing a Google Business Profile split roughly as follows: visiting the website at 34 percent, requesting directions at 27 percent, calling directly at 16 percent, sending messages at 8 percent, and booking or reserving at 5 percent — with 60 percent of mobile users calling directly via the Business Profile button.](https://searchlab.nl/en/statistics/google-business-profile-statistics-2026) BrightLocal's own research, drawn from its ongoing study of business profile activity, found something similar at scale: [the average business receives 33 clicks each month from their GMB listing, with 59 actions overall](https://www.brightlocal.com/research/google-my-business-insights-study/) — meaning the majority of what a profile actually generates isn't a website click at all.

Profile completeness and photo volume made the gap wider still. [Businesses with more than 100 images on GMB get 520 percent more calls, 2,717 percent more direction requests, and 1,065 percent more website clicks than the average business](https://www.brightlocal.com/research/google-my-business-insights-study/) — a reminder that the Business Profile itself, not just the website, is a surface the SEO work had been actively improving the whole time, and improving in a direction that specifically increased calls, not website sessions.

## The calls nobody's website ever saw

Here's the mechanical detail that made this invisible rather than just under-measured: a call placed from the Business Profile's call button connects directly, from Google's own interface, straight to the business's phone line. The visitor never lands on a page. There's no session, no pageview, no event for any website analytics tool to register — not because the tracking was misconfigured, but because there was never a website interaction to track in the first place.

That's a structurally different problem from the GA4 limitations discussed above, and worth naming separately: GA4 missing a phone-number click is a measurement gap on an interaction that did happen on the site. A Business Profile call bypassing the website entirely isn't a gap in measurement — it's an interaction that, by design, never generates anything for website analytics to have a chance at capturing. Two different blind spots, stacked on top of each other, and from inside a single GA4 dashboard they're indistinguishable from "the SEO isn't converting."

Once the business understood that distinction, the flat line in the monthly report stopped looking like a performance problem and started looking like exactly what it was: a reporting tool correctly measuring a shrinking share of a channel that was, in total, actually growing.

## Rebuilding the measurement, not the strategy

The fix here was never going to be a strategy change — the SEO work was doing what it was supposed to do. The fix was closing the gap between what was actually happening and what anyone could see.

The first step was unglamorous: pulling the Google Business Profile insights export monthly, by hand, and setting it next to the GA4 report rather than treating GA4 as the whole picture. That alone resolved the immediate budget conversation, because the combined number — website conversions plus profile-direct calls and direction requests — told a completely different story than either number did alone.

The second step addressed the website side of the gap specifically. Rather than relying on a single static phone number click as a stand-in for a real conversion, the business moved to basic call tracking, assigning a distinct number to organic and website traffic so an actual connected call — not just a tap — could be confirmed and timed. The mechanics of how this works are fairly standard across providers: a platform swaps the number displayed to a given visitor, logs the call against that visitor's session, and reports back the source. [Each marketing channel, campaign, or even individual webpage is given a distinct phone number, or uses dynamic number insertion; the customer sees or interacts with the tracked number, whether it's a Google Ads listing, a landing page, or a print flyer; the call is placed and logged, with data like call duration, time, and location recorded; and the system matches the number to its source, so the platform instantly knows the call came from, say, organic traffic rather than paid.](https://www.didforsale.com/call-attribution-how-it-works-with-call-tracking)

That last detail — tying a specific number to organic SEO pages specifically, rather than lumping all website traffic under one generic line — turned out to matter more than expected. [Adding dynamic numbers to SEO pages connects each call to the right keyword and content, replacing presumptions with accurate attribution.](https://avidtrak.com/resource/dynamic-call-tracking) Instead of guessing whether a given week's call volume was coming from organic rankings, paid ads, or the Business Profile, the business could finally see each one as its own line.

None of this closed the gap entirely, and it's worth being honest about why. Even good call tracking only covers calls that pass through a tracked number on the website. It does nothing for the Business Profile's own call button, which remains Google's territory, reported only inside Google's own insights panel. The real fix wasn't a single tool — it was accepting that the complete picture lives in two separate systems that have to be read together, every month, by a person, because no single dashboard currently does it automatically.

## What changed once the attribution gap closed

With both data sources in view side by side, the business's actual conversion story looked almost nothing like the one the GA4 report alone had told. Organic rankings were driving a real, growing number of calls — they just weren't landing in the one column anyone had been watching.

The more interesting shift was less about the numbers and more about how the business started making decisions. Instead of treating the website's own analytics as a complete verdict on channel performance, the monthly review became a combined read: Business Profile insights for direct calls and direction requests, call tracking data for website-originated calls by source, and GA4 for everything else a visitor did once they reached the site. None of those three views is complete on its own. Together, they're close.

This matters beyond the specific business, because the underlying failure here generalizes further than phone calls. [GA4's inability to track offline conversions by default, personally identifiable data, and other limitations like tight attribution windows and missing impression data can make it hard to measure the true marketing impact on revenue.](https://www.ruleranalytics.com/blog/phone-call-tracking/track-phone-calls-google-analytics/) Phone calls are simply the most common version of an offline conversion for a local service business — the same blind spot shows up with walk-ins, with calls placed from a saved number in someone's contacts rather than a fresh search, and with word-of-mouth referrals that happen to land on a page the referrer mentioned by name.

## Where this breaks in other places too

The specific mechanism in this case — a Business Profile call bypassing the website — is common enough in local service industries to be worth checking for directly, but the general pattern underneath it shows up in a few recognizable shapes.

**Rankings improve a surface your analytics doesn't watch.** SEO work frequently improves things other than the raw website: the Business Profile itself, directory listings, map pack visibility, even how a business's name and number appear in voice assistant results. Any of those can produce a real customer action — a call, a visit, a saved location — that never generates a session on the website your reporting is built around.

**A tool answers the question it was built for, not the question you're actually asking.** GA4 answers "what happened on this website." That's a genuinely useful, narrow question. The mistake isn't using GA4 — it's treating its answer as the full answer to "is this marketing channel working," when the channel's actual output routinely happens somewhere GA4 can't see.

**Flat or declining numbers in one system get read as channel failure, without checking whether the system itself has a known coverage gap.** This is the part worth building into a habit rather than discovering once under budget pressure. Before concluding a channel isn't converting, it's worth asking specifically what that channel is capable of producing that the current reporting setup wouldn't register at all — not just whether the numbers in front of you look good, but whether the numbers in front of you are even measuring the right thing.

## A short checklist for finding your own invisible channel

A few questions worth sitting with before assuming a marketing channel underperformed rather than simply under-reported:

**Does your business rely on phone calls as a meaningful part of how customers actually convert?** If so, a single clickable phone number tracked as a generic event is very likely undercounting, for the reasons described above.

**Have you ever pulled your Google Business Profile insights and your website analytics for the same month and set them side by side?** If the answer is no, you genuinely don't know whether this gap exists for your business — it has to be checked, not assumed either way.

**Does your call tracking, if you have any, distinguish between a phone number click and a connected call?** [Even though GA4 has the ability to track clicks on a phone number, they still miss out on a large percentage of calls where users type the numbers directly into their phones, and although phone inquiries usually represent high-intent prospects, it can be difficult to know which marketing channel drove a particular lead to call your business.](https://www.searchenginejournal.com/ga4-offline-conversion-tracking-callrail-spa/481047/) If your only signal is a click, you have a click count, not a call count.

**When a channel's reported numbers look flat, is the first explanation reached for always "the channel isn't working," rather than "the measurement might have a gap"?** Both are possible. Only one of them gets checked by default in most businesses, which is exactly how a working channel nearly gets cut.

**Is anyone in the room making the budget decision actually looking at profile-level data, or only website-level data?** The person pulling the GA4 report and the person making the retainer decision are often not the same person asking what GA4 can and can't see. That gap in the room is usually a smaller version of the same gap in the data.

## Where this actually leaves you

None of this was ever really a story about SEO underperforming. It was a story about a measurement system quietly answering a narrower question than the one being asked of it, confidently enough that nobody noticed the narrowing. The rankings worked. The Business Profile worked. The calls were happening. The only thing broken was the view of all of it in one place.

That's a useful thing to sit with any time a marketing channel's numbers look flat: before deciding the work isn't converting, it's worth confirming the thing measuring it was ever capable of seeing the conversion in the first place. For a lot of local businesses, the honest answer is that it wasn't — and the fix isn't more SEO or a different website. It's finally looking at the two or three places a customer actually ends up, instead of just the one your dashboard happens to be pointed at.
