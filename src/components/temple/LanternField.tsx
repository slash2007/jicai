"use client";

import { useEffect, useRef, useState } from "react";

function usePreferReduceMotion() {
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(reduce.matches);
    update();
    reduce.addEventListener("change", update);
    return () => reduce.removeEventListener("change", update);
  }, []);
  return reduceMotion;
}

/** 侧廊容器（不再整廊一次点亮） */
export function LanternField({ children }: { children: React.ReactNode }) {
  return <div className="relative">{children}</div>;
}

/**
 * 单龛照明：滚入视口后点亮，之后保持常亮。
 * 各龛独立，故滚动时会依次亮起。
 */
export function LanternNiche({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(false);
  const reduceMotion = usePreferReduceMotion();
  const fade = reduceMotion ? "duration-0" : "duration-[1.05s] ease-out";

  useEffect(() => {
    if (lit) return;
    const el = ref.current;
    if (!el) return;

    const tryLight = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 龛的上沿越过视口约 72%，且底部仍在视口内偏上
      if (rect.top < vh * 0.72 && rect.bottom > vh * 0.18) {
        setLit(true);
      }
    };

    tryLight();
    window.addEventListener("scroll", tryLight, { passive: true });
    window.addEventListener("resize", tryLight);
    return () => {
      window.removeEventListener("scroll", tryLight);
      window.removeEventListener("resize", tryLight);
    };
  }, [lit]);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      data-niche-lit={lit ? "true" : "false"}
    >
      <div
        className={`relative z-10 transition-[filter] ${fade}`}
        style={{
          filter: lit ? "none" : "brightness(0.48) saturate(0.7)",
        }}
      >
        {children}
      </div>

      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-20 transition-opacity ${fade} ${
          lit ? "opacity-0" : "opacity-100"
        }`}
        style={{
          background:
            "radial-gradient(ellipse 95% 85% at 50% 40%, rgba(14,13,11,0.5), rgba(14,13,11,0.9) 70%, rgba(14,13,11,0.96) 100%)",
        }}
      />

      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-[5] transition-opacity ${fade} ${
          lit ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 35%, rgba(232,200,122,0.12), rgba(166,139,75,0.04) 45%, transparent 72%)",
        }}
      />
    </div>
  );
}
