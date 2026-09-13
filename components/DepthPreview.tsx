"use client";
import { useRef, type PointerEvent, type ReactNode } from "react";
/** CSS perspective only: no render loop, assets or scroll interception. */
export default function DepthPreview({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  function move(e: PointerEvent<HTMLDivElement>) {
    if (
      e.pointerType !== "mouse" ||
      !window.matchMedia(
        "(prefers-reduced-motion: no-preference) and (min-width: 900px)",
      ).matches
    )
      return;
    const r = e.currentTarget.getBoundingClientRect();
    ref.current?.style.setProperty(
      "--rx",
      `${-((e.clientY - r.top) / r.height - 0.5) * 5}deg`,
    );
    ref.current?.style.setProperty(
      "--ry",
      `${((e.clientX - r.left) / r.width - 0.5) * 7}deg`,
    );
  }
  function reset() {
    ref.current?.style.removeProperty("--rx");
    ref.current?.style.removeProperty("--ry");
  }
  return (
    <div className="depth-stage" onPointerMove={move} onPointerLeave={reset}>
      <div ref={ref} className="depth-object">
        {children}
      </div>
    </div>
  );
}
