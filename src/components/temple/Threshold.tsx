"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  seal: string;
  title: string;
  hint?: string;
};

/** Doorway threshold: one carved character fills the view before the hall opens. */
export function Threshold({ seal, title, hint }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting && entry.intersectionRatio > 0.45),
      { threshold: [0.35, 0.55, 0.75] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex h-[70svh] min-h-[420px] items-center justify-center overflow-hidden bg-hall sm:h-[85svh]"
      aria-label={`${title}门楣`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(166,139,75,0.08), transparent 40%)",
        }}
      />

      {/* lintel lines */}
      <div
        aria-hidden
        className={`absolute inset-x-[12%] top-[18%] h-px bg-oldgold/30 transition-transform duration-1000 sm:inset-x-[18%] ${
          active ? "scale-x-100" : "scale-x-50"
        }`}
      />
      <div
        aria-hidden
        className={`absolute inset-x-[12%] bottom-[18%] h-px bg-oldgold/20 transition-transform duration-1000 sm:inset-x-[18%] ${
          active ? "scale-x-100" : "scale-x-50"
        }`}
      />

      <div className="relative text-center">
        <p
          className={`font-display text-[clamp(7rem,28vw,16rem)] leading-none text-paper/[0.07] transition-all duration-1000 ${
            active ? "scale-100 opacity-100 tracking-[0.05em]" : "scale-90 opacity-40 tracking-[0.2em]"
          }`}
        >
          {seal}
        </p>
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
            active ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <p className="font-display text-[clamp(2.5rem,10vw,5rem)] text-paper">
            {seal}
          </p>
          <p className="mt-4 text-sm tracking-[0.3em] text-oldgold sm:text-base">
            {title}
          </p>
          {hint ? (
            <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-paper/45">
              {hint}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
