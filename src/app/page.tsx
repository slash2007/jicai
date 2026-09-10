import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { BeamPerspective } from "@/components/temple/BeamPerspective";
import { CraftNiche } from "@/components/temple/CraftNiche";
import { GateProgress } from "@/components/temple/GateProgress";
import { HallCase } from "@/components/temple/HallCase";
import { HostWelcome } from "@/components/temple/HostWelcome";
import { IncenseSpine } from "@/components/temple/IncenseSpine";
import { LanternField } from "@/components/temple/LanternField";
import { Threshold } from "@/components/temple/Threshold";
import { getFeaturedCases } from "@/content/cases";
import { processSteps, services, site } from "@/content/site";

export default function HomePage() {
  const featured = getFeaturedCases();

  return (
    <div className="bg-hall text-paper">
      <IncenseSpine />
      <GateProgress />

      {/* 山门 */}
      <section
        id="shanmen"
        className="relative flex min-h-[100svh] items-stretch overflow-hidden grain"
      >
        <div className="absolute inset-0 bg-hall">
          <Image
            src="/images/demo/sculpture-2.jpg"
            alt=""
            fill
            priority
            className="animate-kenburns object-cover opacity-55"
            sizes="100vw"
          />
          <BeamPerspective />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 30%, rgba(166,139,75,0.1), transparent 38%), linear-gradient(to top, #0e0d0b 10%, transparent 42%), linear-gradient(to bottom, #0e0d0b 0%, transparent 30%), linear-gradient(to right, #0e0d0b 0%, transparent 35%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-end gap-10 px-4 pb-24 pt-[calc(var(--header-h)+2rem)] sm:px-6 sm:pb-28 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:px-8 lg:pb-20">
          <div className="order-2 max-w-sm lg:order-1 lg:justify-self-start">
            <p className="text-sm tracking-[0.25em] text-oldgold/90 sm:text-base">
              进殿不必赶路
            </p>
            <p className="mt-4 text-sm leading-relaxed text-paper/50 sm:text-base">
              {site.tagline}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-paper/35">
              过山门，先见主理人；再随他入廊看工艺、进殿看工程、到香案谈承接。
            </p>
            <a
              href="#zhuchi"
              className="mt-10 inline-flex items-center gap-3 text-xs tracking-[0.3em] text-paper/50 transition-colors hover:text-oldgold"
            >
              <span className="flex h-10 w-10 items-center justify-center border border-paper/15">
                ↓
              </span>
              见主理人
            </a>
          </div>

          <div className="order-1 flex justify-center lg:order-2">
            <div className="relative inline-flex min-w-[5.5rem] flex-col items-center border border-oldgold/25 bg-hall-deep/40 px-7 py-12 backdrop-blur-[2px] sm:min-w-[6.5rem] sm:px-8 sm:py-14">
              <div className="absolute inset-x-3 top-3 h-px bg-oldgold/20" />
              <div className="absolute inset-x-3 bottom-3 h-px bg-oldgold/20" />
              <h1
                className="font-display flex flex-col items-center gap-3 text-[clamp(2.15rem,7vw,4.25rem)] leading-none text-paper sm:gap-4"
                aria-label={site.name}
              >
                {Array.from(site.name).map((ch, i) => (
                  <span key={`${ch}-${i}`} className="block">
                    {ch}
                  </span>
                ))}
              </h1>
              <p className="mt-8 text-center text-sm tracking-[0.3em] text-oldgold/80">
                门
              </p>
            </div>
          </div>

          <div className="order-3 hidden lg:block" aria-hidden />
        </div>
      </section>

      {/* 迎客 · 主理人（门与廊之间） */}
      <HostWelcome />

      <Threshold seal="廊" title="侧廊" hint="一龛一盏，工序次第" />

      {/* 侧廊 · 工序 + 主理人旁白 */}
      <section id="celang" className="relative scroll-mt-[var(--header-h)]">
        <LanternField>
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="mb-14 text-center sm:mb-20">
              <p className="text-sm tracking-[0.25em] text-paper/40">
                工序在廊 · 成片在殿
              </p>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-paper/45">
                不摆落成堂景，只放工艺流程。
              </p>
            </div>

            <div className="space-y-20 sm:space-y-28">
              {services.map((service, i) => (
                <CraftNiche key={service.id} service={service} index={i} />
              ))}
            </div>

            <p className="mt-16 text-center text-sm leading-relaxed text-paper/40 sm:mt-20">
              往下进殿看落成，或
              <a
                href="#xiangan"
                className="mx-1 text-oldgold/80 underline-offset-4 hover:text-oldgold hover:underline"
              >
                去结缘谈承接
              </a>
              。
            </p>
          </div>
        </LanternField>
      </section>

      <Threshold seal="殿" title="正殿" hint="一次只望一座殿" />

      {/* 正殿 · 作品 */}
      <section id="zhengdian" className="relative scroll-mt-[var(--header-h)] overflow-hidden">
        <div className="mx-auto max-w-5xl px-4 pb-4 pt-10 sm:px-6 sm:pt-14 lg:px-8">
          <div className="flex items-end justify-between gap-6 border-b border-paper/10 pb-8">
            <div>
              <p className="text-sm tracking-[0.25em] text-oldgold sm:text-base">
                正殿工程
              </p>
              <h2 className="font-display mt-3 text-[clamp(1.5rem,4vw,2.25rem)] text-paper">
                抬头看梁，一次一座
              </h2>
            </div>
            <p className="hidden max-w-[14rem] text-right text-sm leading-relaxed text-paper/40 sm:block">
              一次只看一座，细处留给驻足。
            </p>
          </div>
        </div>

        <div className="divide-y divide-paper/[0.06]">
          {featured.map((item, index) => (
            <HallCase key={item.slug} item={item} index={index} />
          ))}
        </div>

        <div className="flex justify-center py-14">
          <a
            href="#xiangan"
            className="text-xs tracking-[0.3em] text-paper/40 hover:text-oldgold"
          >
            有相似工程？去结缘留下 →
          </a>
        </div>
      </section>

      <Threshold seal="缘" title="结缘" hint="话说完了，可以留下" />

      {/* 结缘 · 合作与联系 */}
      <section
        id="xiangan"
        className="relative scroll-mt-[var(--header-h)] bg-hall pb-6 sm:pb-10"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(139,46,46,0.16), transparent 42%), radial-gradient(ellipse at 50% 20%, rgba(166,139,75,0.08), transparent 36%)",
          }}
        />

        <div className="relative mx-auto max-w-5xl px-4 pt-20 sm:px-6 sm:pt-28 lg:px-8">
          <div className="mx-auto h-px w-16 bg-oldgold/40" />
          <div className="mx-auto mt-0 h-12 w-px bg-gradient-to-b from-oldgold/40 to-transparent" />

          <p className="mt-2 text-center text-sm tracking-[0.3em] text-oldgold">
            结缘
          </p>
          <h2 className="font-display mt-4 text-center text-[clamp(1.75rem,5vw,2.75rem)] leading-snug">
            工程说到这里
          </h2>
          <p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-paper/45">
            微信优先。类型、地点、大致工期——三句话够我们判断能否承接。
          </p>

          <div className="mt-14 border-t border-paper/10 pt-12">
            <p className="text-sm tracking-[0.2em] text-oldgold">合作怎么走</p>
            <h3 className="font-display mt-3 text-xl sm:text-2xl">
              勘察到验收，四个节点
            </h3>
            <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {processSteps.map((step) => (
                <li key={step.step} className="border-t border-oldgold/35 pt-4">
                  <p className="font-display text-base text-oldgold">
                    {step.step}
                  </p>
                  <p className="mt-2 text-base text-paper">{step.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-paper/40">
                    {step.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-16 grid gap-12 border-t border-paper/10 pb-6 pt-12 sm:pb-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <div className="border border-oldgold/20 bg-hall-deep/60 px-5 py-6">
                <p className="text-sm tracking-[0.2em] text-paper/45">微信</p>
                <p className="font-display mt-2 text-2xl text-oldgold sm:text-3xl">
                  {site.wechat}
                </p>
                <a
                  href={`tel:${site.phone.replace(/-/g, "")}`}
                  className="mt-3 block text-sm text-paper/50 hover:text-paper"
                >
                  {site.phone}
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <h3 className="font-display mb-6 text-xl">留下工程需求</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
