"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CaseStudy } from "@/content/cases";

type Shot = { src: string; caption: string };

function buildGallery(item: CaseStudy): Shot[] {
  const fromImages = item.images?.length
    ? item.images
    : [{ src: item.cover, caption: item.title }];

  const seen = new Set<string>();
  const list: Shot[] = [];
  for (const shot of fromImages) {
    if (seen.has(shot.src)) continue;
    seen.add(shot.src);
    list.push(shot);
  }
  return list;
}

export function HallCase({ item, index }: { item: CaseStudy; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const [lit, setLit] = useState(false);
  const [active, setActive] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);
  const [open, setOpen] = useState(false);
  const flip = index % 2 === 1;
  const gallery = useMemo(() => buildGallery(item), [item]);
  const current = gallery[Math.min(active, gallery.length - 1)] ?? gallery[0];

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setLit(true);
      },
      { threshold: 0.28 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (gallery.length <= 1) return;
      if (e.key === "ArrowRight") {
        setActive((prev) => {
          const next = (prev + 1) % gallery.length;
          setFadeKey((k) => k + 1);
          return next;
        });
      }
      if (e.key === "ArrowLeft") {
        setActive((prev) => {
          const next = (prev - 1 + gallery.length) % gallery.length;
          setFadeKey((k) => k + 1);
          return next;
        });
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, gallery.length]);

  function selectShot(next: number) {
    setActive((prev) => {
      if (prev === next) return prev;
      setFadeKey((k) => k + 1);
      return next;
    });
  }

  function openLightbox() {
    setOpen(true);
  }

  function closeLightbox() {
    setOpen(false);
  }

  function goPrev(e: React.MouseEvent) {
    e.stopPropagation();
    setActive((prev) => {
      const next = (prev - 1 + gallery.length) % gallery.length;
      setFadeKey((k) => k + 1);
      return next;
    });
  }

  function goNext(e: React.MouseEvent) {
    e.stopPropagation();
    setActive((prev) => {
      const next = (prev + 1) % gallery.length;
      setFadeKey((k) => k + 1);
      return next;
    });
  }

  return (
    <>
      <article
        ref={ref}
        className={`relative mx-auto grid max-w-5xl items-center gap-6 px-4 py-10 sm:gap-8 sm:px-6 sm:py-14 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-16 ${
          flip ? "lg:pt-20" : ""
        }`}
      >
        <p
          aria-hidden
          className={`pointer-events-none absolute top-6 font-display text-[4.5rem] leading-none text-paper/[0.06] sm:top-10 sm:text-[6rem] lg:text-[7.5rem] ${
            flip ? "right-4 lg:right-8" : "left-4 lg:left-8"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </p>

        <div
          className={`relative z-[25] lg:col-span-7 ${
            flip ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div
            className={`relative p-2.5 transition-all duration-700 ease-out motion-reduce:transition-none ${
              lit
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
            }`}
          >
            {/* 角线在图框外缘 */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-oldgold/55"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-oldgold/55"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l border-oldgold/55"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-oldgold/55"
            />

            <button
              type="button"
              data-spine-gap
              onClick={openLightbox}
              aria-label={`放大查看：${current.caption || item.title}`}
              className="group relative block w-full overflow-hidden border border-oldgold/20 bg-hall-deep text-left"
            >
              <div className="relative aspect-[4/3] sm:aspect-[16/11]">
                <Image
                  key={`${current.src}-${fadeKey}`}
                  src={current.src}
                  alt={current.caption || item.title}
                  fill
                  className="gallery-fade object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 92vw, 560px"
                  priority={index === 0 && active === 0}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-hall/40 via-transparent to-hall/10" />
                <span className="pointer-events-none absolute bottom-3 right-3 bg-hall/70 px-2.5 py-1 text-[10px] tracking-[0.18em] text-paper/70 opacity-90 backdrop-blur-sm transition-opacity group-hover:opacity-100 sm:text-xs">
                  点击放大
                </span>
              </div>
            </button>
          </div>

          {gallery.length > 1 ? (
            <div
              className={`mt-3 transition-opacity delay-200 duration-700 ${
                lit ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="mb-2 flex items-center justify-between gap-3 text-[10px] tracking-[0.18em] text-paper/35 sm:text-xs">
                <span>共 {gallery.length} 张 · 点图切换 · 主图可放大</span>
                <span className="tabular-nums text-oldgold/80">
                  {active + 1} / {gallery.length}
                </span>
              </div>
              <div
                className={`flex gap-2 overflow-x-auto pb-1 ${
                  flip ? "lg:justify-end" : ""
                }`}
                role="tablist"
                aria-label={`${item.title} 图片`}
              >
                {gallery.map((shot, i) => {
                  const selected = i === active;
                  return (
                    <button
                      key={shot.src}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      aria-label={shot.caption || `第 ${i + 1} 张`}
                      onClick={() => selectShot(i)}
                      className={`relative h-14 w-20 shrink-0 overflow-hidden border transition-colors sm:h-16 sm:w-24 ${
                        selected
                          ? "border-oldgold"
                          : "border-paper/15 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={shot.src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </button>
                  );
                })}
              </div>
              {current.caption ? (
                <p
                  className={`mt-2 text-xs leading-relaxed text-paper/40 ${
                    flip ? "lg:text-right" : ""
                  }`}
                >
                  {current.caption}
                </p>
              ) : null}
            </div>
          ) : (
            <p
              className={`mt-2 text-[10px] tracking-[0.18em] text-paper/30 transition-opacity delay-200 duration-700 sm:text-xs ${
                lit ? "opacity-100" : "opacity-0"
              } ${flip ? "lg:text-right" : ""}`}
            >
              点击主图可放大
            </p>
          )}
        </div>

        <div
          className={`relative lg:col-span-5 lg:pb-2 ${
            flip ? "lg:order-1 lg:pr-2 lg:text-right" : "lg:order-2 lg:pl-2"
          }`}
        >
          <p
            className={`text-sm tracking-[0.2em] text-oldgold transition-all delay-100 duration-700 sm:text-base ${
              lit ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            {String(index + 1).padStart(2, "0")} · {item.category}
          </p>
          <h3
            className={`font-display mt-3 text-[clamp(1.35rem,3.5vw,2rem)] leading-snug text-paper transition-all delay-150 duration-700 ${
              lit ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            {item.title}
          </h3>
          <p
            className={`mt-3 text-sm leading-relaxed text-paper/50 transition-all delay-200 duration-700 ${
              lit ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            } ${flip ? "lg:ml-auto lg:max-w-sm" : "max-w-sm"}`}
          >
            {item.location}
            <span className="mx-2 text-paper/20">·</span>
            {item.scale}
          </p>
          <p
            className={`mt-4 text-sm leading-relaxed text-paper/35 transition-all delay-250 duration-700 ${
              lit ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            } ${flip ? "lg:ml-auto lg:max-w-sm" : "max-w-sm"}`}
          >
            {item.summary}
          </p>
          <a
            href="#xiangan"
            className={`mt-6 inline-flex min-h-10 items-center border-b border-oldgold/50 pb-0.5 text-xs tracking-[0.22em] text-oldgold transition-all delay-300 duration-700 hover:border-oldgold hover:text-paper ${
              lit ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            } ${flip ? "lg:ml-auto" : ""}`}
          >
            咨询同类工程 →
          </a>
        </div>
      </article>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.caption || item.title}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-hall/92 p-4 backdrop-blur-sm sm:p-8"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 flex min-h-11 min-w-11 items-center justify-center border border-paper/20 text-sm text-paper/80 hover:border-paper/40 hover:text-paper sm:right-6 sm:top-6"
            aria-label="关闭放大"
          >
            关闭
          </button>

          {gallery.length > 1 ? (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-3 top-1/2 z-10 flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center border border-paper/20 text-paper/80 hover:border-oldgold/50 hover:text-oldgold sm:left-6"
                aria-label="上一张"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-3 top-1/2 z-10 flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center border border-paper/20 text-paper/80 hover:border-oldgold/50 hover:text-oldgold sm:right-6"
                aria-label="下一张"
              >
                ›
              </button>
            </>
          ) : null}

          <div
            className="relative flex max-h-[min(88vh,900px)] w-full max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[min(78vh,820px)] w-full">
              <Image
                key={`lb-${current.src}-${fadeKey}`}
                src={current.src}
                alt={current.caption || item.title}
                fill
                className="gallery-fade object-contain"
                sizes="100vw"
                priority
              />
            </div>
            <div className="mt-4 flex w-full max-w-3xl items-center justify-between gap-4 px-1 text-sm text-paper/55">
              <p className="min-w-0 truncate">{current.caption || item.title}</p>
              {gallery.length > 1 ? (
                <p className="shrink-0 tabular-nums text-oldgold/90">
                  {active + 1} / {gallery.length}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
