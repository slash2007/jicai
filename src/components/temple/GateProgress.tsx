"use client";

import { useEffect, useState } from "react";

const gates = [
  { id: "shanmen", label: "山门", seal: "门" },
  { id: "zhuchi", label: "迎客", seal: "迎" },
  { id: "celang", label: "侧廊", seal: "廊" },
  { id: "zhengdian", label: "正殿", seal: "殿" },
  { id: "xiangan", label: "结缘", seal: "缘" },
] as const;

type GateId = (typeof gates)[number]["id"];

/**
 * 不用 intersectionRatio：正殿等长区块在手机上永远盖不满整段，
 * ratio 到不了 0.2，「殿」就点不亮。改为视口探针判断。
 */
export function GateProgress() {
  const [active, setActive] = useState<GateId>(gates[0].id);

  useEffect(() => {
    const sync = () => {
      const probe = window.innerHeight * 0.32;
      let current: GateId = gates[0].id;

      for (const gate of gates) {
        const el = document.getElementById(gate.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= probe) {
          current = gate.id;
        }
      }

      const doc = document.documentElement;
      if (window.scrollY + window.innerHeight >= doc.scrollHeight - 100) {
        current = "xiangan";
      }

      setActive(current);
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
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
        className="fixed bottom-[calc(0.75rem+var(--safe-bottom))] left-1/2 z-40 flex -translate-x-1/2 items-center gap-0.5 border border-paper/10 bg-hall/85 px-1.5 py-1.5 backdrop-blur-md lg:hidden"
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
