---
title: 'The Ten-Second Test: How I Actually Decide Whether a Homepage Is Doing Its Job'
excerpt: >-
  A walkthrough of the actual two-check process I run on every homepage — mobile
  first, then the hero — and the real trade-offs behind what gets built, kept,
  or cut in those first ten seconds.
date: '2026-11-23'
mode: reasoning
readTime: 15 min read
faqs:
  - q: Is there really a hard ten-second rule for homepages?
    a: >-
      No, and treating it as a hard rule is a mistake. The research behind it
      describes a range — ten to twenty seconds, per Nielsen Norman Group's
      dwell-time analysis — and even that range shifts depending on where the
      visitor came from and how much intent they already have. It's a useful
      pressure test, not a stopwatch to design against.
  - q: Should I check desktop or mobile first when reviewing my own site?
    a: >-
      Mobile, and it's not close. Mobile has carried more than half of global
      web traffic for years now, so a homepage that only works on a wide, fast
      desktop screen is solving for the visitor you're least likely to get
      first. Pull it up on your own phone, on your actual cell signal, before
      you look at anything else.
  - q: What's actually wrong with an animated or video hero?
    a: >-
      Nothing inherently — the problem is almost always sequencing, not the
      animation itself. If the motion delays the visitor understanding what the
      business does and who it's for, it's working against the ten-second window
      instead of inside it. If it reveals that information faster or more
      memorably than static text would, it's doing its job.
  - q: What if my industry genuinely needs more than ten seconds to explain?
    a: >-
      Then the hero's job isn't to finish the explanation — it's to earn the
      next ten seconds. A complex offering doesn't need the entire pitch above
      the fold; it needs enough clarity that a visitor chooses to keep scrolling
      instead of leaving confused. Those are different design problems, and
      conflating them is how heroes get overloaded.
  - q: How do I actually test this on my own site instead of guessing?
    a: >-
      Run the same thing researchers call a five-second test: show someone who's
      never seen the site a screenshot of the homepage for five seconds, hide
      it, then ask what they remember. If they can't say what the business does
      and who it's for, that's not a them problem — that's the hero telling you
      something true.
coverImage: >-
  https://images.pexels.com/photos/192273/pexels-photo-192273.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940
coverImageAlt: >-
  A close-up view of a smartphone displaying the Pexels website screen for stock
  photo searches.
coverCredit:
  name: Lisa Fotios
  url: 'https://www.pexels.com/@fotios-photos'
---

A client sent me a homepage last month and asked, directly, "is this good?" I didn't open it on my laptop. I opened it on my phone, on a regular connection, not the office Wi-Fi. That's the first thing worth explaining about how I actually evaluate a website, because it's not the part people expect: before I look at a single word of the hero, I check whether the site even works on the device most of their visitors are actually going to use.

That sounds like a small methodological choice. It isn't. It's the first decision in a chain of them, and the rest of this piece is about walking through that chain honestly — not as a checklist handed down from somewhere, but as the actual reasoning I go through, including the parts where I'm not fully certain and the parts where a client disagrees with me and turns out to have a point.

## Why mobile comes before the hero, not after

The obvious thing to check first on a new website is the thing you see first — the hero section, the headline, the big image. I don't do that first, and the reason is almost embarrassingly practical: if the site doesn't render correctly on a phone, nothing else I find matters yet. A brilliant hero that breaks, overlaps, or takes eleven seconds to paint on mobile isn't a brilliant hero with a small bug. It's a hero that most visitors will never actually see in working condition, because most visitors are arriving on a phone, not a monitor. Mobile's share of global web traffic has sat somewhere above 50 percent for years now, and in many markets it's considerably higher than that — [StatCounter's figures, aggregated by mobiloud](https://www.mobiloud.com/blog/what-percentage-of-internet-traffic-is-mobile/), put mobile at roughly 59 percent of global web traffic as of late 2026, with mobile holding more than three-quarters of traffic in markets like India and South Africa.

This is the decomposition instinct at work before I've even said the word: don't evaluate "is this website good" as one question, because it isn't one question. It's at minimum two — does it work, and then, does it work *well*. You can't usefully answer the second one until you've confirmed the first, and confirming the first means testing on the device and connection that actually represents the bulk of real traffic, not the fast office machine every site gets built and approved on.

So the actual sequence is: open it on a phone, on a real connection, and just watch. Does it load without jank. Does tapping anything do what it looks like it should do. Does text wrap instead of overflow. Only once that's a clean yes do I move to the second question, which is the one most of this piece is actually about.

## The ten-second window — what the research actually supports

Once mobile is confirmed working, the next question is whether a stranger looking at the hero for about ten seconds would understand what the business does and who it's for. That specific number — ten seconds, sometimes stretched to twenty — isn't something I invented or rounded from a vibe. It comes from a specific piece of research worth being precise about, because the popular version of "attention span" claims floating around marketing content is mostly wrong.

[Nielsen Norman Group's analysis of Microsoft Research dwell-time data](https://www.nngroup.com/articles/how-long-do-users-stay-on-web-pages/) — more than two billion recorded page visits across over two hundred thousand web pages — found that users often leave web pages in 10 to 20 seconds, but that pages with a clear value proposition can hold attention far longer, because visit durations follow what's called a negative Weibull distribution: the risk of someone leaving is highest right at the start, and it drops the longer they've already stayed. In plain terms, the first ten to twenty seconds are disproportionately dangerous, and clearing them buys outsized trust afterward.

That's the real research. It's worth contrasting it with the fake research, because the fake version is everywhere and it's worth knowing the difference if you're the one being pitched on it. The "humans now have an eight-second attention span, shorter than a goldfish" line gets repeated constantly in web design and marketing content, and it has no real study behind it. The [BBC's own investigation into the claim](https://www.bbc.com/news/health-38896790) traced the eight-second figure to a 2015 Microsoft Canada report that itself credited an unrelated website with no recoverable research behind it, and found no evidence that goldfish have short attention spans either. I mention this not to be pedantic but because it matters which claim you're actually building against. "You have eight seconds because humans are basically goldfish now" is a scare tactic dressed as data. "Dwell time follows a hazard curve that's steepest in the first ten to twenty seconds and flattens once a visitor is convinced the page is worth their time" is an actual, testable, useful thing to design toward. One tells you to panic. The other tells you exactly what to build.

## Breaking the ten seconds into smaller questions

Ten seconds isn't one task. Treating it as one undifferentiated window is how heroes end up either empty or overstuffed — empty because "just make it clear in ten seconds" is too vague to act on, overstuffed because someone tries to cram the whole pitch into it out of anxiety about the window closing. So I break it down the same way I break down everything else: into smaller, separately answerable pieces.

The first second or two is pure legibility. Can the visitor's eye find anything to latch onto — is there enough contrast, is the type actually readable at a glance, is there an obvious starting point rather than four competing focal elements all shouting at once. Nothing here is about the business yet. It's about whether the page is even parseable before a single word gets processed.

The next few seconds, roughly two through six, are category and relevance. What *kind* of business is this, and is it the kind the visitor was looking for. A custom home builder's hero needs to read as a custom home builder's hero within this window — not necessarily through a headline that says "we build custom homes," but through imagery, tone, and structure that make the category unmistakable before the visitor reads anything closely.

The remaining stretch, from about six through ten, is differentiation — the part most businesses actually care about and the part that can't do any work until the first two stages have already succeeded. "What makes you different" is a wasted sentence if the visitor still doesn't know what category of business they're looking at. This is the actual reason I check the first two stages before ever judging whether the differentiation message is any good: a persuasive sentence in the wrong position gets none of the credit it deserves.

Breaking it apart this way changes what gets fixed. A homepage that fails at second one needs a contrast and layout fix, not better copy. A homepage that fails at second four needs clearer category signaling, not a punchier tagline. A homepage that's clear and legible but forgettable by second ten needs sharper differentiation — and only that one actually needs a copywriter. Three different failures, three different fixes, and they get confused constantly because "the hero isn't working" sounds like a single problem when it's rarely one.

## Studying before judging

None of this starts with me telling a client what's wrong. It starts with questions, and that's not a soft preference — it's the actual mechanism by which the real problem surfaces. I'll look at the site first, quietly, before I say anything evaluative. What's already been tried. What the goal actually is, in the client's own words, not my inferred version of it. What's missing. What the timeline looks like. The ten-second test I run myself is one input into that conversation, not a verdict I deliver at the start of it.

This matters because the ten-second failure is sometimes not a design failure at all — sometimes it's a decision failure upstream of design, and you only find that out by asking. A hero that fails to communicate "who this is for" might be failing because nobody on the business side has actually agreed on who it's for. No amount of hero redesign fixes that; the website is accurately reflecting an unresolved question, not causing one. You don't get to that root by announcing "your hero doesn't work." You get to it by asking how the current version came to exist, and letting the answer reveal where the actual gap is.

## When a client wants the hero I'd advise against

This happens often enough that it's worth describing honestly rather than glossing over: a client wants a big, slow, cinematic video hero, or a looping animation, or an interactive element that takes real time to resolve — and I think it's going to cost them the ten-second window rather than earn it.

I don't tell them it's wrong. I ask how they landed on it. Usually there's a real reason underneath it — a competitor's site that impressed them, a feeling that their work is visual and deserves a visual-first treatment, a genuine belief that slower and more deliberate signals quality, which, to be fair, it sometimes does. I acknowledge that reasoning honestly, because it's usually not baseless. Then I lay out alternatives rather than a veto: here's what that looks like if the first frame alone communicates category and relevance even before the animation resolves; here's what it looks like if we keep the motion but compress what has to land in the first two seconds so the differentiation work doesn't wait on the whole sequence finishing; here's what it looks like if we test a static first-paint version against the animated one with real visitors and let the data settle it.

The point isn't that I'm neutral about which one is better — I usually have a real opinion, and I'll say what it is if asked directly. The point is that the decision is still theirs to make, and a menu of informed options tends to produce a better outcome than a single directive, partly because the client has context about their actual customers that I don't have walking in. Sometimes I'm right and we end up with the simpler version. Sometimes the slower, more ambitious version tests fine because the audience and intent were different than I assumed — a visitor who's already deep into comparing three high-end builders is not behaving like a cold visitor from a Google search, and the ten-second pressure is genuinely lower for someone who already arrived half-convinced.

## The actual trade-off behind motion

When two approaches both plausibly work — the fast, simple, static hero and the slower, richer, animated one — the decision isn't "which one is faster to build" and it isn't "which one is what everyone else in the category is doing." Both of those are the easy defaults, and I treat them as explicitly disqualifying tie-breakers, not because fast or conventional is always wrong, but because neither answers the only question that actually matters: what happens to this specific site over the next year of real visitors hitting it.

That's the actual tie-breaker — long-run effect, not short-run convenience. A static hero is faster to ship this week. An animated one might convert better for exactly the audience this business attracts, and if it does, that advantage compounds every week the site is live. Neither fact is visible from "which is quicker to build," which is why that question gets set aside entirely rather than treated as a factor.

Motion also carries a cost that's easy to miss because it's invisible until it isn't: a meaningful share of real visitors are physically affected by it. [Vestibular disorder research](https://www.a11ywithlindsey.com/blog/reducing-motion-improve-accessibility/) puts the share of adults over 40 who've experienced some form of vestibular dysfunction at up to 35 percent — motion sickness, vertigo, genuine physical discomfort triggered by parallax and auto-playing animation, not a mild preference against it. That's not a fringe accessibility footnote; depending on the business, it can be a meaningful fraction of the exact visitors you're trying to earn a phone call from. The web platform has a direct answer for this — the `prefers-reduced-motion` setting lets a visitor's own device tell the site to back off, and [WCAG's own guidance on animation triggered by interaction](https://allyway.io/reducing-motion-designing-for-vestibular-disorders-2) exists specifically so that motion is never the only version of the experience on offer. Building the cinematic version without also building the version that respects that setting isn't an aesthetic choice anymore at that point — it's choosing not to serve a documented share of real visitors, and doing it silently, since almost nobody complains about this out loud; they just leave.

So the actual decision isn't "animated hero, yes or no." It's "animated hero, with a genuinely equivalent reduced-motion fallback that still passes the ten-second test on its own" — and if that fallback can't be built well, that's a real signal the animated version was solving a presentation problem rather than a communication one.

## Testing it instead of guessing at it

Everything above is reasoning, and reasoning is cheap compared to actually asking a stranger. The method I lean on when a hero's performance is genuinely in doubt isn't exotic — it's the same tool UX researchers have used for years, usually called a five-second test: show someone who has never seen the site a screenshot of the homepage for a short, fixed window, hide it, then ask what they remember about what the business does, who it's for, and what to do next. [One clear description of the method](https://www.greatquestion.com/ux-research/five-second-testing-guide) frames it plainly: show someone a design for five seconds, hide it, and ask what they remember, which measures the first impression a design creates before anyone has time to analyze it consciously.

That last part is the whole point. It isn't asking someone to critique your homepage the way a designer would, scanning deliberately for flaws. It's forcing the same rushed, half-conscious read that a real cold visitor gives you, then checking whether anything useful survived it. If five or ten strangers in a row can't say what the business does, that's not a sample-size problem. That's the hero telling you something true that no amount of internal confidence can argue with.

## The actual trade-off behind motion, revisited through disagreement

I want to be honest about a place this reasoning gets pushed back on, because it happens often enough to matter. Some clients — correctly, in certain cases — point out that a slower, more deliberate hero is itself a trust signal in categories where speed reads as cheapness. A luxury resort, a bespoke architecture firm, a private wealth practice: in those categories, a visitor who's already somewhat qualified might read "this took its time to load because it's doing something careful" rather than "this is slow." I don't think that argument is wrong. I think it's conditional, and the condition is exactly the audience question from earlier — is this visitor cold or warm, searching or already comparing. The same animated hero that costs a landscaping company its ten seconds with a cold local searcher might cost a boutique developer nothing with a visitor who followed a referral and already expects something considered. Getting this right means asking who's actually going to be looking, not applying one rule to every hero regardless of who lands on it.

## Where the honest uncertainty actually sits

I don't think the ten-second window is a precise instrument, and I'd rather say that directly than imply more confidence than the research supports. Ten to twenty seconds is a range pulled from aggregate behavior across hundreds of thousands of pages — it's not a stopwatch that applies identically to a visitor who typed your business name directly into Google because a friend recommended you, versus a visitor who clicked a cold ad, versus a visitor three tabs deep into comparing competitors. Intent changes the clock. A visitor who already half-trusts you going in will forgive more ambiguity in the first ten seconds than one evaluating you against two tabs open behind yours.

That's a real limit on how literally to take any of this, and I'd rather name it than paper over it. What doesn't change, regardless of traffic source, is the ordering problem underneath it: legibility has to resolve before category, and category has to resolve before differentiation. The exact number of seconds each stage gets is softer than the sequence those stages happen in.

The other place I hold real uncertainty is in how much a hero even matters relative to everything after it. A hero that passes every version of this test still sits on top of a site that might be slow to load, confusing to navigate, or missing the actual proof a visitor needs before calling. The ten-second test is a real and useful pressure point, not the whole evaluation — and treating it as the whole evaluation is its own kind of mistake, just a more flattering one, because the hero is the part everyone looks at first and the part that's easiest to mistake for the whole job.

## What changes my mind, and what doesn't

A client's instinct changes my recommendation constantly, for the reason already described — they usually know something real about their own customers that I don't walk in knowing. What doesn't change my mind is popularity. "This is what everyone in our industry does" is one of the least persuasive arguments I hear, not because convention is always wrong, but because convention usually formed around what was easy to build or safe to approve, not around what was actually tested against real visitor behavior. Copying the category average is a bet that the category average is already optimized. It usually isn't.

What does move me is evidence from the actual site — a recorded session of someone hesitating on the hero, a heatmap showing nobody scrolls past it, a five-second test run with real strangers who get asked what the business does and get it wrong. That's not a hypothetical exercise; it's the cheapest, fastest version of the same test I run personally, just run with people who aren't me and don't already know what the business does.

None of this is a finished method I expect to still be describing the same way next year. It's the current shape of a process I keep adjusting as I see more sites, more client reasoning, more real user behavior that contradicts something I assumed. The standing question after any of this isn't "is the hero done" — nothing on a working website is ever really done. It's "what's the next thing about this page that's quietly costing it seconds it doesn't have to lose," and there's always another answer to that question once you go looking for it.
