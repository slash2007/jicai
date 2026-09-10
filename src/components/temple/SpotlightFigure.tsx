"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/** Image that "receives light" as it enters the viewport — like a corridor niche. */
export function SpotlightFigure({
  src,
  alt,
  caption,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLit(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <figure ref={ref} className={`relative ${className}`}>
      <div
        className={`relative aspect-[4/5] overflow-hidden bg-hall-deep sm:aspect-[3/4] transition-[filter,opacity,transform] duration-1000 ease-out motion-reduce:transition-none ${
          lit
            ? "opacity-100 brightness-100 saturate-100 translate-y-0"
            : "opacity-40 brightness-[0.35] saturate-50 translate-y-4 motion-reduce:opacity-100 motion-reduce:brightness-100 motion-reduce:saturate-100 motion-reduce:translate-y-0"
        }`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes={sizes}
        />
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ${
            lit ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "radial-gradient(ellipse at 40% 30%, rgba(166,139,75,0.22), transparent 55%), radial-gradient(ellipse at 70% 80%, rgba(139,46,46,0.12), transparent 50%)",
          }}
        />
      </div>
      {caption ? (
        <figcaption
          className={`mt-3 max-w-xs text-xs leading-relaxed tracking-wide text-paper/55 transition-opacity duration-700 sm:text-sm ${
            lit ? "opacity-100" : "opacity-0"
          }`}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
