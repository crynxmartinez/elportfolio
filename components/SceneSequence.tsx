"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll-scrubbed image-sequence section. Sticky-pinned canvas, staged
 * loading (poster -> coarse ladder -> backfill), eased scroll-to-frame
 * mapping, desktop/mobile tiers, prefers-reduced-motion drops the pin.
 *
 * Generic version of the hero engine - one instance per cinematic scene,
 * chained down the page. Same technique as the camera teardown funnel.
 */

const BREAKPOINT = 768;
const SMOOTHING = 0.14;
const CONCURRENCY = 6;

type Props = {
  dir: string; // e.g. "/hero-seq"
  counts?: { desktop: number; mobile: number };
  heightVh?: number;
  children?: ReactNode; // copy overlay, optional
  staticAt?: number; // reduced-motion still frame, 0..1
  scrimTop?: boolean;
  scrimBottom?: boolean;
  ladderStep?: number; // coarse-pass spacing; larger for longer sequences
};

export default function SceneSequence({
  dir: DIR,
  counts: COUNTS = { desktop: 240, mobile: 120 },
  heightVh = 300,
  children,
  staticAt = 0.5,
  scrimTop = true,
  scrimBottom = true,
  ladderStep = 10,
}: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const POSTER = `${DIR}/poster.webp`;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let tierName: "desktop" | "mobile" | null = null;
    let count = 0;
    let dir = "";
    let frames: (HTMLImageElement | undefined)[] = [];
    let poster: HTMLImageElement | null = null;
    let target = 0;
    let current = 0;
    let lastDrawn = -1;
    let running = false;
    let started = false;
    let raf = 0;

    const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);

    function resolveTier() {
      if (frames.some(Boolean)) return;
      const wide = (canvas!.clientWidth || document.documentElement.clientWidth) > BREAKPOINT;
      const next = wide ? "desktop" : "mobile";
      if (next === tierName) return;
      tierName = next;
      count = COUNTS[tierName];
      dir = `${DIR}/${tierName}`;
      frames = new Array(count);
      lastDrawn = -1;
    }

    function framePath(i: number) {
      return `${dir}/f${String(i + 1).padStart(4, "0")}.webp`;
    }

    function loadImage(src: string): Promise<HTMLImageElement> {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("failed: " + src));
        img.src = src;
      });
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      if (!w || !h) return;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      lastDrawn = -1;
      draw(current, true);
    }

    function paint(img: HTMLImageElement | null) {
      const cw = canvas!.width;
      const ch = canvas!.height;
      ctx!.fillStyle = "#05080a";
      ctx!.fillRect(0, 0, cw, ch);
      if (!img) return;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx!.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    }

    function nearestLoaded(i: number) {
      if (frames[i]) return frames[i]!;
      for (let d = 1; d < count; d++) {
        if (frames[i - d]) return frames[i - d]!;
        if (frames[i + d]) return frames[i + d]!;
      }
      return poster;
    }

    function draw(frameFloat: number, force = false) {
      const i = clamp(Math.round(frameFloat), 0, count - 1);
      if (i === lastDrawn && !force) return;
      lastDrawn = i;
      paint(nearestLoaded(i));
    }

    function progress() {
      const travel = stage!.offsetHeight - window.innerHeight;
      if (travel <= 0) return 0;
      return clamp(-stage!.getBoundingClientRect().top / travel, 0, 1);
    }

    function fadeEl(el: HTMLElement, o: number) {
      el.style.opacity = String(o);
      el.style.transform = `translate3d(0, ${(1 - o) * 14}px, 0)`;
      el.style.pointerEvents = o < 0.05 ? "none" : "auto";
    }

    /* Same shape as the camera funnel's beatOpacity: fades in and out over
       26% of its own window. The last beat holds at full opacity instead of
       fading, so the CTA doesn't blink out right as the reader reaches it. */
    function beatOpacity(from: number, to: number, p: number, isLast: boolean) {
      const fade = (to - from) * 0.26;
      if (p <= from) return 0;
      if (p >= to && !isLast) return 0;
      const fadeIn = (p - from) / fade;
      const fadeOut = isLast ? Infinity : (to - p) / fade;
      return clamp(Math.min(1, fadeIn, fadeOut), 0, 1);
    }

    function updateCopy(p: number) {
      if (!copyRef.current) return;
      const startEl = copyRef.current.querySelector<HTMLElement>(".journey-copy-start");

      if (startEl) {
        // Visible immediately at rest (p=0) - only fades on the way out.
        const o = p > 0.05 ? clamp(1 - (p - 0.05) / 0.03, 0, 1) : 1;
        fadeEl(startEl, o);
      }

      const beats = copyRef.current.querySelectorAll<HTMLElement>("[data-beat]");
      if (beats.length) {
        beats.forEach((el) => {
          const from = parseFloat(el.dataset.from || "0");
          const to = parseFloat(el.dataset.to || "1");
          const isLast = el.dataset.last === "true";
          fadeEl(el, beatOpacity(from, to, p, isLast));
        });
        return;
      }

      if (startEl) return;

      // Single-block fallback (no start/beat markup at all).
      let o = 1;
      if (p > 0.55) o = clamp(1 - (p - 0.55) / 0.3, 0, 1);
      if (p < 0.06) o = Math.min(o, p / 0.06);
      fadeEl(copyRef.current, o);
    }

    function tick() {
      const diff = target - current;
      if (Math.abs(diff) < 0.01) {
        current = target;
        running = false;
      } else {
        current += diff * SMOOTHING;
        raf = requestAnimationFrame(tick);
      }
      draw(current);
    }

    function onScroll() {
      const p = progress();
      target = p * (count - 1);
      updateCopy(p);
      stage!.style.setProperty("--seq-progress", p.toFixed(4));
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    }

    function ladderIndices() {
      const out: number[] = [];
      for (let i = 0; i < count; i += ladderStep) out.push(i);
      const last = count - 1;
      if (out[out.length - 1] !== last) out.push(last);
      return out;
    }

    function loadInto(i: number) {
      return loadImage(framePath(i))
        .then((img) => {
          frames[i] = img;
        })
        .catch(() => {});
    }

    function backfill() {
      const pending: number[] = [];
      for (let i = 0; i < count; i++) if (!frames[i]) pending.push(i);
      if (!pending.length) return Promise.resolve();

      function next(): Promise<void> {
        if (!pending.length) return Promise.resolve();
        const here = Math.round(current);
        let bestAt = 0;
        let bestDist = Infinity;
        for (let k = 0; k < pending.length; k++) {
          const d = Math.abs(pending[k] - here);
          if (d < bestDist) {
            bestDist = d;
            bestAt = k;
          }
        }
        const idx = pending.splice(bestAt, 1)[0];
        return loadInto(idx).then(() => {
          if (frames[idx] && Math.abs(idx - Math.round(current)) <= 1) draw(current, true);
          return next();
        });
      }

      const workers = [];
      for (let w = 0; w < CONCURRENCY; w++) workers.push(next());
      return Promise.all(workers);
    }

    function loadPoster() {
      return loadImage(POSTER)
        .then((img) => {
          poster = img;
          draw(current, true);
        })
        .catch(() => {});
    }

    function startStatic() {
      resolveTier();
      const idx = Math.round(staticAt * (count - 1));
      loadInto(idx).then(() => {
        resize();
        draw(idx, true);
      });
      if (copyRef.current) {
        copyRef.current.style.opacity = "1";
        copyRef.current.style.transform = "none";
      }
    }

    function startAnimated() {
      if (started) return;
      started = true;
      resolveTier();
      const ladder = ladderIndices();
      void (async () => {
        await loadPoster();
        await Promise.all(ladder.map((i) => loadInto(i).then(() => draw(current, true))));
        await backfill();
      })();
    }

    function boot() {
      resolveTier();
      resize();

      if ("ResizeObserver" in window) {
        const ro = new ResizeObserver(() => {
          resize();
          if (!reduced) onScroll();
        });
        ro.observe(canvas!);
      }

      if (reduced) {
        stage!.classList.add("is-static");
        startStatic();
        return () => cancelAnimationFrame(raf);
      }

      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();

      // Eager for the first screen or two; gated further down the page.
      const rect = stage!.getBoundingClientRect();
      if (rect.top < window.innerHeight * 2.5 || !("IntersectionObserver" in window)) {
        startAnimated();
      } else {
        const io = new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.isIntersecting)) {
              io.disconnect();
              startAnimated();
            }
          },
          { rootMargin: "150% 0px" }
        );
        io.observe(stage!);
      }

      return () => {
        window.removeEventListener("scroll", onScroll);
        cancelAnimationFrame(raf);
      };
    }

    const cleanup = boot();
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DIR]);

  return (
    <div ref={stageRef} className="seq relative" style={{ height: `${heightVh}vh` }}>
      <div className="sticky top-0 h-screen min-h-[600px] overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {scrimTop && (
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, #05080a 0%, rgba(5,8,10,0.12) 45%, rgba(5,8,10,0.5) 100%)",
            }}
          />
        )}
        {scrimBottom && (
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(5,8,10,0.55) 0%, transparent 30%)",
            }}
          />
        )}
        <div className="bg-grain pointer-events-none absolute inset-0 opacity-30" />

        {children && (
          <div ref={copyRef} className="relative mx-auto h-full w-full max-w-6xl">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
