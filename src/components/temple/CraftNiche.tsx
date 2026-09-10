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
    </figure>
  );
}

function CraftCopy({ service }: { service: CraftService }) {
  return (
    <div>
      <h3 className="font-display text-2xl sm:text-3xl">{service.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-paper/50 sm:text-base">
        {service.summary}
      </p>
      <blockquote className="mt-7 border-l border-oldgold/35 pl-4">
        <p className="text-sm tracking-[0.22em] text-oldgold sm:text-base">
          {host.title}
          <span className="mx-2 text-oldgold/40" aria-hidden>
            ·
          </span>
          旁白
        </p>
        <p className="mt-3 font-display text-sm leading-relaxed text-paper/70 sm:text-base">
          「{service.voice}」
        </p>
      </blockquote>
      <p className="mt-6 text-sm leading-relaxed tracking-wide text-paper/45">
        {service.steps.join(" · ")}
      </p>
    </div>
  );
}

/**
 * 文案从简：标题、一句说明、旁白、工序名串。
 */
export function CraftNiche({
  service,
  index,
}: {
  service: CraftService;
  index: number;
}) {
  const split = service.layout === "split";

  if (split) {
    return (
      <LanternNiche>
        <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <CraftCopy service={service} />
          </div>
          <div className="lg:col-span-7">
            <CraftImage
              service={service}
              priority={index === 0}
              sizes="(max-width: 1024px) 92vw, 42vw"
              className="w-full max-w-xl lg:max-w-none"
            />
          </div>
        </article>
      </LanternNiche>
    );
  }

  return (
    <LanternNiche>
      <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <CraftCopy service={service} />
        </div>
        <div className="lg:col-span-7 lg:flex lg:justify-end">
          <CraftImage
            service={service}
            priority={index === 0}
            sizes="(max-width: 1024px) 92vw, 36vw"
            className="w-full max-w-md sm:max-w-lg lg:max-w-[28rem]"
          />
        </div>
      </article>
    </LanternNiche>
  );
}
