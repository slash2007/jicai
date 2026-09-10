"use client";

import { useEffect, useState } from "react";

const gates = [
  { id: "shanmen", label: "山门", seal: "门" },
  { id: "zhuchi", label: "迎客", seal: "迎" },
  { id: "celang", label: "侧廊", seal: "廊" },
  { id: "zhengdian", label: "正殿", seal: "殿" },
  { id: "xiangan", label: "香案", seal: "香" },
] as const;

type GateId = (typeof gates)[number]["id"];

export function GateProgress() {
  const [active, setActive] = useState<GateId>(gates[0].id);

  useEffect(() => {
    const nodes = gates
      .map((g) => document.getElementById(g.id))
      .filter(Boolean) as HTMLElement[];

    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActive(visible.target.id as GateId);
        }
      },
      { threshold: [0.2, 0.4, 0.55], rootMargin: "-8% 0px -40% 0px" },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav
        aria-label="进殿动线"
        className="pointer-events-none fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 lg:block xl:right-7"
      >
        <ol className="pointer-events-auto flex flex-col items-center gap-1">
          {gates.map((gate, i) => {
            const isActive = active === gate.id;
            return (
              <li key={gate.id} className="flex flex-col items-center">
                <a
                  href={`#${gate.id}`}
                  className={`font-display flex h-10 w-10 items-center justify-center text-lg transition-all ${
                    isActive
                      ? "text-oldgold scale-110"
                      : "text-paper/25 hover:text-paper/60"
                  }`}
                  title={gate.label}
                >
                  {gate.seal}
                </a>
                {i < gates.length - 1 ? (
                  <span className="h-5 w-px bg-paper/10" aria-hidden />
                ) : null}
              </li>
            );
          })}
        </ol>
      </nav>

      <nav
        aria-label="进殿动线"
        className="fixed bottom-[calc(4.25rem+var(--safe-bottom))] left-1/2 z-40 flex -translate-x-1/2 items-center gap-0.5 rounded-full border border-paper/10 bg-hall/80 px-1.5 py-1.5 backdrop-blur-md lg:hidden"
      >
        {gates.map((gate) => {
          const isActive = active === gate.id;
          return (
            <a
              key={gate.id}
              href={`#${gate.id}`}
              className={`font-display flex h-8 w-8 items-center justify-center text-sm transition-colors ${
                isActive ? "text-oldgold" : "text-paper/35"
              }`}
            >
              {gate.seal}
            </a>
          );
        })}
      </nav>
    </>
  );
}
