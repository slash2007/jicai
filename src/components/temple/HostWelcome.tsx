import Image from "next/image";
import { host, site } from "@/content/site";

/**
 * 山门之后、侧廊之前：主理人以迎客身份出场，
 * 如住持迎入——先见人，再随其入廊、殿、香案。
 */
export function HostWelcome() {
  return (
    <section
      id="zhuchi"
      className="relative scroll-mt-[var(--header-h)] overflow-hidden border-y border-paper/5"
      aria-labelledby="host-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(166,139,75,0.09), transparent 45%), radial-gradient(ellipse at 70% 60%, rgba(139,46,46,0.06), transparent 40%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        {/* lintel */}
        <div className="mb-12 flex items-center gap-4 sm:mb-16">
          <span className="h-px flex-1 bg-oldgold/25" />
          <p className="text-sm tracking-[0.25em] text-oldgold sm:text-base">
            {host.honorific} · 过门见人
          </p>
          <span className="h-px flex-1 bg-oldgold/25" />
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* vertical name plaque */}
          <div className="hidden justify-center lg:col-span-2 lg:flex">
            <div className="border border-oldgold/25 bg-hall-deep/50 px-4 py-8">
              <p className="font-display writing-vertical text-3xl tracking-[0.4em] text-paper">
                {host.plaqueName}
              </p>
              <p className="mt-6 text-center text-sm tracking-[0.2em] text-oldgold/80">
                {host.title}
              </p>
            </div>
          </div>

          {/* portrait — standing at the threshold */}
          <div className="lg:col-span-4">
            <figure className="relative mx-auto max-w-sm lg:mx-0">
              <div className="relative p-2.5">
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
                <div className="relative aspect-[3/4] overflow-hidden border border-oldgold/20 bg-hall-deep">
                  <Image
                    src={host.portrait}
                    alt={`${host.name}，${host.roleLine}`}
                    fill
                    priority
                    className="object-cover object-[center_20%]"
                    sizes="(max-width: 1024px) 80vw, 320px"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-hall/50 via-transparent to-transparent" />
                </div>
              </div>
              <figcaption className="mt-4 border-b border-oldgold/20 pb-3">
                <p id="host-title" className="font-display text-2xl text-paper">
                  {host.name}
                </p>
                <p className="mt-1 text-sm tracking-[0.2em] text-oldgold">
                  {host.roleLine}
                </p>
              </figcaption>
            </figure>
          </div>

          {/* greeting — the abbot speaks */}
          <div className="lg:col-span-6 lg:pl-4">
            <p className="font-display text-[clamp(1.35rem,3.5vw,1.85rem)] leading-snug text-paper/90">
              「{host.greeting}」
            </p>
            <p className="mt-6 text-sm leading-relaxed text-paper/55 sm:text-base">
              {host.lead}
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-paper/40">
              {host.bio.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 bg-oldgold/70" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-paper/35">{site.region}</p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#celang"
                className="group inline-flex min-h-12 items-center justify-center gap-3 bg-cinnabar px-7 text-sm tracking-wider text-paper transition-colors hover:bg-cinnabar-hover"
              >
                {host.invite}
                <span className="transition-transform group-hover:translate-y-0.5">
                  ↓
                </span>
              </a>
              <p className="text-xs leading-relaxed tracking-wide text-paper/35 sm:max-w-[12rem]">
                入廊看工艺，再进正殿看工程——由我领路。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
