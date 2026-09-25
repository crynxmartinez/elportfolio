---
title: >-
  Inside the Local Pack: The Actual Mechanics Behind Whether Your Business Shows
  Up (And Whether Anyone Calls)
excerpt: >-
  A hands-on look at the real signals, code, and tracking gaps that decide
  whether a local business gets found — the primary category setting, the schema
  markup, the UTM tags, and the NAP data most sites get quietly wrong.
date: '2026-09-25'
mode: exposure
readTime: 17 min read
faqs:
  - q: >-
      Do I need both a Google Business Profile and website schema markup, or is
      one enough?
    a: >-
      Both, and they're not interchangeable. Your Google Business Profile is
      what Google reads to decide whether to show you in the map pack. Your
      website's LocalBusiness schema is what confirms and reinforces that same
      information once someone clicks through. They're supposed to say the exact
      same thing about your name, address, and phone number — that agreement is
      part of what builds confidence in the data.
  - q: >-
      Will changing my primary category hurt my rankings for other services I
      offer?
    a: >-
      It can shift what you're eligible to rank for, which is exactly why it's
      worth choosing deliberately rather than defaulting to whatever felt safest
      when the profile was created. You get one primary category and up to nine
      additional ones — the primary carries most of the weight, and the
      additional categories still matter enough to be worth filling in
      accurately rather than padding.
  - q: >-
      Why don't my Google Business Profile website clicks show up properly in my
      analytics?
    a: >-
      Almost certainly because the website link on your profile isn't tagged
      with UTM parameters, so Google Analytics has no way to distinguish that
      click from any other organic visit and lumps it into a generic bucket
      instead. This is a five-minute fix, not a structural problem — it just
      requires actually adding the tags most businesses never think to add.
  - q: >-
      How much does an inconsistent phone number or address actually cost a
      business?
    a: >-
      More than most owners assume, and the cost shows up as lost trust rather
      than an obvious ranking drop, which is why it's easy to miss. It's worth
      treating your name, address, and phone number as a single canonical record
      and checking it periodically rather than assuming it's still correct
      everywhere it was ever typed in.
  - q: 'Do reviews still matter as much as everyone says, or has that changed?'
    a: >-
      The role has shifted more than the importance. Total review count used to
      be treated as the main signal; consistent, recent review activity is
      increasingly treated as more telling, because it shows a business is still
      actively operating and engaging, not just accumulating old proof.
coverImage: >-
  https://images.pexels.com/photos/5444625/pexels-photo-5444625.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940
coverImageAlt: Detailed image of a navigation app icon on a smartphone screen.
coverCredit:
  name: Brett Jordan
  url: 'https://www.pexels.com/@brettjordan'
---

Type a service into Google with a city attached and three businesses appear above everything else, inside a small gray box with a map. Most business owners have looked at that box a hundred times without ever seeing what actually put those three businesses there instead of them. It isn't mysterious in the sense of being unknowable — it's mysterious in the sense that nobody ever opens the hood and shows you the parts. This piece opens the hood. Not the theory of local SEO, the actual mechanics: the specific field in a Google Business Profile that outweighs almost everything else, the actual code a website is supposed to be running and usually isn't, the tracking gap that makes half your local traffic invisible in your own analytics, and the data mismatch that's quietly costing trust before a phone ever rings.

## The Map Pack Isn't Magic — It's a Filter

Google has never hidden the basic framework it uses to decide who appears in local results. It publishes it in plain language: relevance, distance, and prominence. [Google publicly documents only three broad local ranking factors — relevance, distance, and prominence — and publishes no weighted percentages for individual fields.](https://www.mbadv.agency/google-business-profile/optimizing-business-categories-for-better-visibility) That last part matters as much as the three words themselves. Google will tell you the categories of the test; it won't hand you the answer key. Which is exactly why an entire cottage industry exists around reverse-engineering, at scale, which specific fields and behaviors move the needle inside each of those three buckets.

The most rigorous version of that reverse-engineering is a recurring survey that's been running since 2008. [It was developed by David Mihm in 2008 and taken over by Darren Shaw in 2017, with 47 of the best and the brightest local search experts invited to complete a comprehensive 2-hour survey, weighing and scoring 187 factors](https://whitespark.ca/local-search-ranking-factors/) in the current edition. That survey — Whitespark's Local Search Ranking Factors report — is the closest thing the industry has to a real answer key, built from aggregate practitioner testing rather than guesswork. It's worth treating as the primary source for everything below, because most of what gets repeated as local SEO folklore traces back to it, often several steps removed and reworded past recognition.

## The One Field That Outweighs Almost Everything Else You'll Tweak

If there's a single mechanical fact worth knowing before touching anything else on a Google Business Profile, it's this one: the primary category field carries more weight than nearly any other lever a business owner controls directly. [Selecting the appropriate primary category for your business is crucial for local search rankings, and according to the 2026 Local Search Ranking Factors survey, the primary category is the top factor influencing rankings in Google's Local Pack.](https://www.brightlocal.com/learn/google-local-algorithm-and-ranking-factors/)

This isn't abstract. A large-scale study of real profiles confirms the mechanism at work rather than just the survey opinion behind it. [Whitespark studied 1.8 million Google Business Profiles across 4,209 categories to learn more about the impact of Google Business Profile categories on rankings](https://searchengineland.com/google-business-profiles-local-seo-success-data-485727), and the core finding lines up with what the expert survey predicts: [the idea that Google matches the primary GBP category to the search term shouldn't come as a surprise to any local marketer](https://searchengineland.com/google-business-profiles-local-seo-success-data-485727), but seeing it confirmed at that scale is a different thing than assuming it.

Here's what that means mechanically, in the actual profile settings: a business gets exactly one primary category and up to nine additional ones. The primary category isn't decorative — it functions as the main filter Google uses to decide which searches you're even eligible to appear for, before distance or prominence are considered at all. A general contractor whose primary category is "Contractor" instead of "Kitchen Remodeler" isn't just being modest — they're telling Google's filter to consider them for a broader, more diluted set of queries where they'll compete against everyone, rather than the specific query where they'd actually win. The additional categories still matter, just less: [selecting relevant additional categories can further enhance your visibility, and it's the 8th most important local pack ranking factor](https://www.brightlocal.com/learn/google-local-algorithm-and-ranking-factors/). Worth filling in accurately. Not worth treating as the main event.

The fix, mechanically, takes about ninety seconds: open the Google Business Profile, go to Business Information, and read the primary category out loud next to the exact phrase a real customer would type into Google. If those two strings don't roughly match, that's the highest-leverage single edit available before touching anything else on the profile.

## The Code Most Websites Never Ship

A Google Business Profile is Google's record of a business. A website's schema markup is the website's own record, written in a format machines can parse directly rather than infer from prose. The relevant vocabulary is called LocalBusiness, and it lives inside a script tag most premium-looking websites still don't actually include. Here's a genuinely minimal, realistic version of what that code looks like on a real homepage:

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "name": "Example Construction Co.",
  "image": "https://www.example.com/images/storefront.jpg",
  "telephone": "+1-555-201-4488",
  "priceRange": "$$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "418 Ridgeline Ave",
    "addressLocality": "Boulder",
    "addressRegion": "CO",
    "postalCode": "80302",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.0150,
    "longitude": -105.2705
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "08:00",
    "closes": "17:00"
  },
  "sameAs": [
    "https://www.facebook.com/exampleconstruction",
    "https://www.instagram.com/exampleconstruction"
  ]
}
</script>
```

The specific type used above — `GeneralContractor` — matters more than it looks like it should. LocalBusiness has over a hundred more specific subtypes, and choosing the closest accurate one rather than defaulting to the generic label is part of the actual mechanism, not a cosmetic detail: [the recommended practice is to use the most specific accurate subtype, such as Dentist, Restaurant, or ProfessionalService, rather than the generic LocalBusiness type](https://unhead.unjs.io/docs/schema-org/api/schema/local-business). This is the same logic as the primary category setting on the Google Business Profile, expressed in a different system — precision over breadth, everywhere the business describes itself.

What this code actually does once it's live: it gives search engines a structured, unambiguous version of the same facts a human visitor reads in the footer or the contact page, removing the guesswork of parsing prose for an address or a phone number. It's the site's own sworn statement of its NAP data — which is exactly why it has to match the Google Business Profile and every other listing exactly, not approximately.

## The Data Mismatch That's Quietly Costing Trust

NAP stands for name, address, and phone number, and consistency across every place those three facts appear is one of the oldest, most boring, and most persistently underrated mechanics in local search. It's boring precisely because there's no clever trick to it — just the discipline of making sure a single canonical version of those three facts is the one that appears everywhere, from the website footer to the schema markup above to every directory listing that exists whether anyone remembers creating it or not.

The actual cost of getting this wrong isn't primarily a ranking penalty — it's a trust penalty, and it's been measured directly. In a large consumer survey on exactly this question, BrightLocal found that [68% of consumers would stop using a local business if they found incorrect information in online directories](https://www.brightlocal.com/resources/inaccurate-business-information/). That's not a hypothetical UX concern. That's more than two-thirds of the audience quietly opting out before a business ever gets the chance to explain that the listing was just outdated, not dishonest.

The mechanical failure mode is usually mundane: a business moves offices, or swaps phone providers, or a directory somewhere auto-generated a listing years ago with a typo nobody caught. Now there are three versions of the phone number floating around the internet — one with dashes, one with dots, one with the old area code — and every one of them is a small, silent vote against the business's credibility, cast by a visitor who never says anything, just leaves.

## The Photo Field: The Structured Data You Can Actually See

Schema markup is structured data written for machines. A Google Business Profile's photo gallery is structured data too — it's just structured for a computer vision model instead of a parser, and most owners never think of it that way. Google runs every uploaded photo through an image-recognition system that classifies what's in it and matches that classification against what people are searching for, which is why the photo section of a profile isn't decoration any more than the schema tag above is decoration.

Google has published its own numbers on the effect, and they're specific enough to plan around rather than just repeat as a vague encouragement to "add some photos." As [Google itself states, businesses that add photos to their Business Profiles receive 42% more requests for directions on Google Maps, and 35% more clicks through to their websites than businesses that don't](https://www.rioseo.com/blog/7-image-optimization-tips-for-google-my-business-photos/). That's not a marginal lift — a direction request is about as close to a physical, real-world action as an online interaction gets, and it's moving by nearly half.

The effect doesn't plateau quickly, either. A large-scale analysis of real listing data found that the gap widens further as photo volume increases: [Whitespark's study of 580,853 images across 15,191 GBP listings found that profiles with more than 100 images get 520% more calls and 1,065% more website clicks than the average listing](https://www.sideways8.com/insights/google-business-profile-photos-that-win-over-local-customers/). And freshness appears to matter independently of raw count — the same underlying mechanism that makes review recency a live factor applies here too: [profiles where all photos are 2+ years old signal a potentially inactive business](https://www.jaymehta.co/blog/google-business-profile-photo-order-changing/) to whatever system is evaluating them, which lines up with everything else in this piece pointing toward recency as a quiet, recurring theme across nearly every local signal, not just one.

Mechanically, this means treating the photo tab the way you'd treat any other field that gets scored: exterior, interior, product or work-in-progress, and team photos, uploaded on an actual schedule rather than once at setup and never touched again — not because more photos are inherently better, but because a stale, three-year-old photo library is functionally the same signal as a stale copyright year in a website footer. Both tell the evaluating system, human or algorithmic, that nobody's been minding the account.

## Duplicate Listings and Suspensions: The Failure Mode Nobody Explains Until It Happens

There's a mechanical failure that doesn't show up in any ranking factor survey because it isn't a ranking problem — it's a listing that stops existing in local search entirely, sometimes without the business ever being told exactly why. It usually starts small: an employee tries to claim a listing that's already claimed, a franchise location gets entered manually by two different people at two different times, or a reinstatement request creates a second profile instead of restoring the first one. What was meant to fix an access problem instead produces two records of the same business competing for the same search results.

Google treats this as a policy violation, not a cosmetic annoyance, and the consequences are structural rather than cosmetic too. [Leaving duplicates active can confuse customers, split your reviews and ranking signals, and even cause suspension under Google's business representation policies](https://www.localfalcon.com/blog/how-to-report-and-remove-fake-or-duplicate-google-business-profile-listings). "Split ranking signals" is the mechanical part worth sitting with: reviews, photo engagement, and interaction history don't merge themselves across two listings — they fragment, and a fragmented profile with sixty reviews spread across two records reads as weaker to the algorithm than one profile with all sixty in one place.

Suspension itself isn't a single event either — it's a graded mechanism worth understanding before it happens rather than after. One breakdown of the actual dashboard states describes the split clearly: [soft suspension means your information remains visible on Google Maps but you cannot make changes to your profile, while a hard suspension means your listing is completely removed from Google Maps and local search results entirely](https://www.dealersunited.com/blog/google-business-profile-suspended/). A soft suspension is recoverable friction. A hard suspension is the map pack acting as though the business doesn't exist, which is a very different problem to be debugging at 9pm than a category field.

The specific triggers worth checking against your own listing, mechanically, before they ever become a suspension: [inaccurate business information such as a fake address or incorrect category, use of a virtual office or P.O. box without proper verification, having multiple profiles for the same business, and keyword stuffing in the business name](https://www.reinstatelabs.com/discoveries/the-impact-of-a-suspended-google-business-profile-on-your-local-seo) are the recurring causes across most documented cases. None of these are exotic. Most are the accumulated residue of a listing that's been touched by three different people over five years, none of whom checked what the others had already entered.

## Reviews: The Ranking Factor That Moved While Nobody Was Watching

Review volume used to be the entire conversation — get to a hundred, get to two hundred, treat the count as a trophy. The mechanics underneath that conversation have shifted, and the shift is worth naming specifically rather than vaguely. [In the 2023 Local Search Ranking Factors, Review Recency ranked as only the #20th most valuable local ranking factor](https://whitespark.ca/blog/the-most-underrated-local-ranking-factor-in-2025/), a fairly minor line item. The person who runs that same survey now argues its actual weight has moved substantially: ["I'd put review recency in my top 5 most important ranking factors of 2025."](https://whitespark.ca/blog/the-most-underrated-local-ranking-factor-in-2025/) That's not a small reshuffle. That's a factor jumping from a footnote to a headline in the span of roughly two years, and it changes the practical instruction from "accumulate reviews" to "keep reviews coming steadily, indefinitely."

The consumer-side data backs up why that shift makes sense. Reviews aren't a formality most people skip past — [just 4% of consumers say they "never" read online business reviews](https://www.brightlocal.com/research/local-consumer-review-survey-2025/), which means the other 96% are, at minimum, glancing at them as part of deciding whether to call. A profile with two hundred reviews from three years ago and nothing since reads, mechanically, as a business that used to be active. A profile with forty reviews and three new ones this month reads as a business that's still operating and still worth trusting with a decision being made today.

## The Invisible Leak: Why Half Your Local Traffic Disappears From Your Own Analytics

Here's a mechanic almost nobody checks, because the failure is silent rather than broken. Most Google Business Profiles list a plain website URL with no tracking parameters attached. That means every visitor who clicks "Website" from the map pack arrives at the site with zero information attached about where they came from — and analytics tools don't leave that gap empty, they guess. One detailed breakdown of exactly this problem put it bluntly: without tagging, [Google Analytics shrugs its shoulders and files the visit under "Direct" traffic, meaning it looks like the user typed the URL in manually](https://www.clickreturn.co.uk/digital-marketing-blog/seo/local-seo/mastering-google-business-profile-utm-tracking-in-ga4/), or it gets folded into generic organic search traffic indistinguishable from someone who found the site through a completely unrelated Google search.

The fix is a URL parameter, appended once, in one settings field. A properly built version looks like this, using Google's own recommended structure: source set to identify the platform, medium set to organic so it's still bucketed correctly, and a campaign name that identifies the specific profile feature being tracked. [Campaign Source identifies where people are coming from — "gbp" for Google Business Profile activity — Campaign Medium gets set to "Organic" to keep it in the default organic search channel, and Campaign Name identifies the specific GBP feature, like a menu or booking link, that people are clicking](https://searchengineland.com/guide/utms-for-google-business-profile). That URL, tags and all, is what goes in the Website field of the profile — nowhere else, and no code changes required on the site itself.

Once it's live, the payoff shows up in a specific, findable place inside GA4 rather than anywhere obvious: Reports, then Acquisition, then Traffic Acquisition, filtered by session source and medium. Before that tag existed, every Google Business Profile click was invisible, folded into a bucket with traffic that had nothing to do with the profile at all. After it exists, that traffic has a name, a volume, and a trend line — which is the entire difference between assuming the profile is working and actually knowing it.

## Tracing an Actual Lead Through the Machine

Put all of the above in a single sequence and the mechanics stop being abstract. A prospective customer searches a service plus their city. Google filters eligible businesses first by primary category match, then narrows further by proximity and by prominence signals — review count, review recency, photo engagement, and the completeness of the profile data. Three businesses clear that filter and appear in the map pack. The customer taps one, glances at the photo gallery, reads a few recent reviews, and clicks through to the website.

If that website's URL was tagged, the visit now arrives labeled — source: the profile, medium: organic, campaign: named — instead of disappearing into a generic bucket. If the site is running LocalBusiness schema, the browser and any AI-driven search surface reading that page get an unambiguous, structured confirmation of the same name, address, and phone number the customer just saw on the profile — no mismatch, no hesitation. The customer reads the page, sees a phone number and an address that match exactly what they just looked at thirty seconds earlier on the map, and calls. Every one of those steps is a discrete, checkable, fixable mechanism. None of it depends on luck, and very little of it depends on anything mysterious — it depends on whether the underlying fields were actually filled in correctly and the tracking was actually turned on.

## A Five-Minute Audit You Can Run Right Now

A few specific things worth checking today, in order of how much time each one takes:

**Open your Google Business Profile and read the primary category out loud.** Does it match the exact phrase a real customer would type into Google, or does it describe the business the way it talks about itself internally?

**Pull up your website's source code and search for "LocalBusiness."** If nothing comes back, that structured confirmation of your identity simply doesn't exist yet, no matter how complete the profile looks elsewhere.

**Compare your phone number as it appears on your website, your Google Business Profile, and one directory listing you haven't touched in years.** Formatting differences aside, do all three actually match?

**Search your own business name in Google Maps and see if a second, thinner listing appears.** If it does, that's a fragmented set of reviews and signals working against you rather than for you, not a harmless leftover.

**Check whether your profile's website link has any parameters after a question mark.** If it's a bare URL, every click from that profile is currently invisible in your analytics, filed under a generic label instead of its own.

**Look at your most recent review date and your most recent photo upload date.** If either is measured in months rather than weeks, that's now a more consequential gap than it would have been two years ago.

## Where This Leaves You

None of this requires rebuilding anything. It requires treating a handful of specific, checkable fields — a category dropdown, a script tag, a URL parameter, a phone number format, a photo library, a second listing that shouldn't exist — with the same precision a business already brings to its actual work. The map pack isn't rewarding mystery inputs. It's reading a small number of concrete signals and making a filtering decision based on them, the same way a website's design makes a trust decision in the first fraction of a second a visitor looks at it. Fixing the mechanics described here doesn't guarantee a top-three spot. It does guarantee that the business is no longer losing ground to something as fixable as a category field, a stale photo, or a duplicate profile nobody ever cleaned up.
