import Image from "next/image";
import { LanternNiche } from "@/components/temple/LanternField";
import { host, services } from "@/content/site";

type CraftService = (typeof services)[number];

function CraftImage({
  service,
  priority,
  sizes,
  className = "",
}: {
  service: CraftService;
  priority?: boolean;
  sizes: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className="overflow-hidden border border-oldgold/15 bg-hall-deep/80">
        <Image
          src={service.image}
          alt={`${service.title}工序`}
          width={service.imageWidth}
          height={service.imageHeight}
          className="h-auto w-full opacity-[0.88]"
          sizes={sizes}
          priority={priority}
        />
      </div>
      <figcaption className="mt-2 text-xs tracking-[0.2em] text-paper/35">
        {service.title} · 工序示意
      </figcaption>
    </figure>
  );
}

function CraftIntro({ service }: { service: CraftService }) {
  return (
    <div>
      <p className="font-display text-4xl text-paper/10 sm:text-5xl">
        {service.title.slice(0, 1)}
      </p>
      <h3 className="font-display -mt-3 text-2xl sm:text-3xl">{service.title}</h3>
      <p className="mt-4 text-sm leading-relaxed text-paper/55 sm:text-base">
        {service.lead}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-paper/35">{service.summary}</p>

      <blockquote className="mt-6 border-l border-oldgold/30 pl-4">
        <p className="text-sm tracking-[0.2em] text-oldgold/90">
          {host.title} · 旁白
        </p>
        <p className="mt-2 font-display text-[0.95rem] leading-relaxed text-paper/70 sm:text-base">
          「{service.voice}」
        </p>
      </blockquote>
    </div>
  );
}

function CraftSteps({
  service,
  columns,
}: {
  service: CraftService;
  columns: 2 | 3 | 5;
}) {
  const colClass =
    columns === 5
      ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      : columns === 3
        ? "sm:grid-cols-2 lg:grid-cols-3"
        : "sm:grid-cols-2";

  return (
    <div>
      <p className="text-sm tracking-[0.2em] text-oldgold">
        主要工序 · 视现场增减
      </p>
      <ol className={`mt-4 grid gap-4 ${colClass}`}>
        {service.steps.map((step, stepIndex) => (
          <li key={step.name} className="border-t border-oldgold/25 pt-3">
            <p className="flex items-baseline gap-2 text-sm tracking-[0.15em] text-oldgold">
              <span className="font-display text-base">
                {String(stepIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-paper/90">{step.name}</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-paper/40">
              {step.note}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function stepColumns(count: number): 2 | 3 | 5 {
  if (count >= 5) return 5;
  if (count === 3) return 3;
  return 2;
}

/**
 * 文案为主、配图收束：
 * - split：文左图右（图约四成宽）
 * - stack：先文案，再中等宽度配图，工序在下
 */
export function CraftNiche({
  service,
  index,
}: {
  service: CraftService;
  index: number;
}) {
  const cols = stepColumns(service.steps.length);
  const split = service.layout === "split";

  if (split) {
    return (
      <LanternNiche>
        <article className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col gap-8 lg:col-span-7">
            <CraftIntro service={service} />
            <CraftSteps service={service} columns={2} />
          </div>
          <div className="lg:col-span-5 lg:pt-2">
            <CraftImage
              service={service}
              priority={index === 0}
              sizes="(max-width: 1024px) 92vw, 28vw"
            />
          </div>
        </article>
      </LanternNiche>
    );
  }

  return (
    <LanternNiche>
      <article className="relative space-y-7">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <CraftIntro service={service} />
          </div>
          <div className="lg:col-span-7 lg:flex lg:justify-end lg:pt-1">
            <CraftImage
              service={service}
              priority={index === 0}
              sizes="(max-width: 1024px) 92vw, 36vw"
              className="w-full max-w-md sm:max-w-lg lg:max-w-[28rem]"
            />
          </div>
        </div>
        <CraftSteps service={service} columns={cols} />
      </article>
    </LanternNiche>
  );
}
