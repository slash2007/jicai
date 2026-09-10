"use client";

import { useEffect, useState } from "react";

/** Perspective beam frame that breathes as you stand at the mountain gate. */
export function BeamPerspective() {
  const [tilt, setTilt] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById("shanmen");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const view = window.innerHeight || 1;
      const p = 1 - Math.min(1, Math.max(0, rect.bottom / (view + rect.height)));
      setTilt(p * 18);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <g
        stroke="rgba(166,139,75,0.28)"
        strokeWidth="0.15"
        fill="none"
        style={{
          transformOrigin: "50% 20%",
          transform: `perspective(600px) rotateX(${tilt}deg)`,
        }}
      >
        <path d={`M 8 95 L ${50 - tilt * 0.4} 12 L ${50 + tilt * 0.4} 12 L 92 95`} />
        <path d={`M 18 95 L ${50 - tilt * 0.25} 28 L ${50 + tilt * 0.25} 28 L 82 95`} />
        <path d={`M 28 95 L ${50 - tilt * 0.12} 44 L ${50 + tilt * 0.12} 44 L 72 95`} />
        <line x1="50" y1="12" x2="50" y2="95" strokeOpacity="0.15" />
      </g>
      <circle
        cx="50"
        cy={22 + tilt * 0.15}
        r="1.2"
        fill="rgba(166,139,75,0.35)"
      />
    </svg>
  );
}
