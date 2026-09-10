"use client";

import { useEffect, useState } from "react";

type Gap = { top: number; bottom: number };

function mergeGaps(gaps: Gap[]): Gap[] {
  if (!gaps.length) return [];
  const sorted = [...gaps].sort((a, b) => a.top - b.top);
  const merged: Gap[] = [{ ...sorted[0] }];
  for (let i = 1; i < sorted.length; i++) {
    const last = merged[merged.length - 1];
    const cur = sorted[i];
    if (cur.top <= last.bottom + 8) {
      last.bottom = Math.max(last.bottom, cur.bottom);
    } else {
      merged.push({ ...cur });
    }
  }
  return merged;
}

function toSegments(endY: number, gaps: Gap[]): Gap[] {
  if (endY <= 0) return [];
  const merged = mergeGaps(
    gaps
      .map((g) => ({
        top: Math.max(0, g.top),
        bottom: Math.min(endY, g.bottom),
      }))
      .filter((g) => g.bottom - g.top > 4),
  );

  const segments: Gap[] = [];
  let cursor = 0;
  for (const gap of merged) {
    if (gap.top > cursor + 2) {
      segments.push({ top: cursor, bottom: gap.top });
    }
    cursor = Math.max(cursor, gap.bottom);
  }
  if (endY > cursor + 2) {
    segments.push({ top: cursor, bottom: endY });
  }
  return segments;
}

/** Incense line: breaks at hall photos, stops before the contact altar. */
export function IncenseSpine() {
  const [endY, setEndY] = useState(0);
  const [gaps, setGaps] = useState<Gap[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - vh,
      );
      const progress = Math.min(1, window.scrollY / maxScroll);
      const grown = Math.max(vh * 0.08, progress * vh);

      const xiangan = document.getElementById("xiangan");
      const xianganTop = xiangan
        ? xiangan.getBoundingClientRect().top
        : Number.POSITIVE_INFINITY;

      // Stop completely once the contact section takes the screen
      if (xianganTop <= vh * 0.12) {
        setVisible(false);
        setEndY(0);
        setGaps([]);
        return;
      }

      setVisible(true);
      const capped = Math.min(grown, Math.max(0, xianganTop - 12));

      const cx = window.innerWidth / 2;
      const holeNodes = document.querySelectorAll<HTMLElement>("[data-spine-gap]");
      const nextGaps: Gap[] = [];
      holeNodes.forEach((node) => {
        const r = node.getBoundingClientRect();
        if (r.right < cx - 2 || r.left > cx + 2) return;
        if (r.bottom < 0 || r.top > capped) return;
        // small padding so the break is clean at the frame edge
        nextGaps.push({
          top: r.top - 6,
          bottom: r.bottom + 6,
        });
      });

      setEndY(capped);
      setGaps(nextGaps);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (!visible || endY <= 0) return null;

  const segments = toSegments(endY, gaps);
  const emberInGap = gaps.some((g) => endY >= g.top && endY <= g.bottom);
  const showEmber = !emberInGap && endY > 24;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-y-0 left-1/2 z-20 hidden w-px -translate-x-1/2 md:block"
    >
      {/* faint guide only along active segments */}
      {segments.map((seg) => (
        <div
          key={`track-${seg.top}-${seg.bottom}`}
          className="absolute inset-x-0 bg-paper/[0.04]"
          style={{ top: seg.top, height: Math.max(0, seg.bottom - seg.top) }}
        />
      ))}

      {segments.map((seg) => (
        <div
          key={`line-${seg.top}-${seg.bottom}`}
          className="absolute inset-x-0 bg-gradient-to-b from-oldgold/75 via-cinnabar/45 to-oldgold/25"
          style={{ top: seg.top, height: Math.max(0, seg.bottom - seg.top) }}
        />
      ))}

      {showEmber ? (
        <>
          <div
            className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-cinnabar shadow-[0_0_18px_rgba(139,46,46,0.85)]"
            style={{ top: endY - 6 }}
          />
          <div
            className="absolute left-1/2 w-16 -translate-x-1/2 opacity-40"
            style={{ top: endY - 72 }}
          >
            <span className="incense-smoke absolute left-2 top-0 h-16 w-px bg-gradient-to-t from-paper/50 to-transparent" />
            <span className="incense-smoke incense-smoke-delay absolute left-6 top-2 h-14 w-px bg-gradient-to-t from-paper/30 to-transparent" />
            <span className="incense-smoke incense-smoke-delay-2 absolute left-10 top-1 h-12 w-px bg-gradient-to-t from-paper/25 to-transparent" />
          </div>
        </>
      ) : null}
    </div>
  );
}
