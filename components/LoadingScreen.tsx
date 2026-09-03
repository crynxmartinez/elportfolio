"use client";

type Props = {
  ready: boolean;
  progress: number; // 0..1
};

/**
 * Full-screen gate shown while the journey's poster + coarse frame ladder
 * load in the background - so the first scroll a visitor makes is already
 * smooth instead of popping in frame by frame.
 */
export default function LoadingScreen({ ready, progress }: Props) {
  const pct = Math.round(clamp(progress) * 100);

  return (
    <div
      aria-hidden={ready}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05080a] transition-opacity duration-700"
      style={{
        opacity: ready ? 0 : 1,
        pointerEvents: ready ? "none" : "auto",
      }}
    >
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-300">
          Raphael Martinez
        </span>
      </div>

      <div className="mt-10 h-px w-40 overflow-hidden bg-white/10">
        <div
          className="h-full bg-teal-300 transition-[width] duration-200 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
        Loading the journey &middot; {pct}%
      </p>
    </div>
  );
}

function clamp(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}
