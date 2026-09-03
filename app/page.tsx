"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SceneSequence from "@/components/SceneSequence";
import LoadingScreen from "@/components/LoadingScreen";

/**
 * The homepage is the journey - nothing else. One continuous 2,160-frame
 * scroll-scrubbed animation (9 source clips stitched end to end, each one
 * picking up exactly where the last one left off).
 *
 * Shape: hero headline holds at rest, then a question, then a three-part
 * answer as short beats spaced through the middle, then the closing CTA.
 * Restrained on purpose - four short beats across the whole scroll, not
 * one per chunk.
 *
 * The page stays gated behind a loading screen until the poster + coarse
 * frame ladder are in (covers the full scroll range at a coarse spacing),
 * so the first scroll a visitor makes is already smooth. Full-resolution
 * backfill keeps loading underneath, invisibly, after the reveal.
 */

const BEATS = [
  { from: 0.14, to: 0.28, kind: "question" },
  { from: 0.38, to: 0.52, kind: "answer", label: "01", title: "Trust, before anything else.", body: "A visitor decides whether you operate at this level before they read a word." },
  { from: 0.58, to: 0.72, kind: "answer", label: "02", title: "Pacing you control.", body: "Not autoplay. You just proved that yourself, scrolling this." },
  { from: 0.78, to: 0.9, kind: "answer", label: "03", title: "Craft as evidence.", body: "This page is the sample. Everything else is the pitch." },
];

export default function Home() {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const revealed = useRef(false);

  const reveal = () => {
    if (revealed.current) return;
    revealed.current = true;
    setReady(true);
  };

  useEffect(() => {
    document.body.style.overflow = ready ? "" : "hidden";
    // Safety net: never trap a visitor behind the loader on a slow connection.
    const fallback = window.setTimeout(reveal, 8000);
    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(fallback);
    };
  }, [ready]);

  return (
    <>
      <LoadingScreen ready={ready} progress={progress} />
      <SceneSequence
        dir="/journey-seq"
        counts={{ desktop: 2160, mobile: 1080 }}
        heightVh={2600}
        ladderStep={24}
        staticAt={0.45}
        onProgress={setProgress}
        onReady={reveal}
      >
        <JourneyCopy />
      </SceneSequence>
    </>
  );
}

function JourneyCopy() {
  return (
    <>
      <div className="journey-copy-start">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-teal-300/80">
          Premium website design
        </p>
        <h1 className="font-display max-w-3xl text-4xl leading-tight sm:text-6xl sm:leading-[1.05]">
          Websites built to match the quality of the work behind them.
        </h1>
        <p className="mt-8 max-w-xl text-neutral-400">
          Cinematic, scroll-driven sites for brands that already do excellent work and deserve a
          website that says so — plus GHL-connected system builds for agencies who need it to
          actually run, not just look good.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/portfolio"
            className="rounded-full border border-teal-300/40 bg-teal-400/10 px-7 py-3 font-mono text-xs uppercase tracking-wide text-teal-200 transition hover:bg-teal-400/20"
          >
            See the work &rarr;
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-white/15 px-7 py-3 font-mono text-xs uppercase tracking-wide text-neutral-200 transition hover:border-white/35"
          >
            Start a project
          </Link>
        </div>
      </div>

      {BEATS.map((b) =>
        b.kind === "question" ? (
          <div key="question" data-beat data-from={b.from} data-to={b.to}>
            <div className="beat-card">
              <p className="font-display text-4xl text-neutral-50 sm:text-6xl">
                Why premium?
              </p>
            </div>
          </div>
        ) : (
          <div key={b.label} data-beat data-from={b.from} data-to={b.to} className="max-w-md">
            <div className="beat-card">
              <p className="font-mono text-sm font-semibold uppercase tracking-wide text-teal-200 sm:text-base">
                {b.label} &middot; {b.title}
              </p>
              <p className="mt-3 text-base leading-relaxed text-neutral-100 sm:text-lg">{b.body}</p>
            </div>
          </div>
        )
      )}

      <div data-beat data-from={0.94} data-to={1} data-last="true" className="max-w-lg">
        <div className="beat-card">
          <h2 className="font-display text-3xl text-neutral-50 sm:text-4xl">
            Have a brand that deserves better than a template?
          </h2>
          <p className="mt-4 text-base text-neutral-100 sm:text-lg">
            Tell me about the project. I&apos;ll tell you honestly whether a premium build is the
            right fit for it.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full border border-teal-300/40 bg-teal-400/10 px-8 py-3 font-mono text-xs uppercase tracking-wide text-teal-200 hover:bg-teal-400/20"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </>
  );
}
