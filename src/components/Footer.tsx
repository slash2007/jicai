import { navItems, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-hall text-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8 lg:py-14">
        <div className="w-max max-w-full shrink-0">
          <p className="font-display text-2xl tracking-wider whitespace-nowrap">
            {site.name}
          </p>
          <p className="mt-2 text-sm tracking-wide text-paper/55 whitespace-nowrap">
            {site.tagline}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-paper/40 whitespace-nowrap">
            {site.region}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <p className="text-sm tracking-[0.15em] text-oldgold">导航</p>
            <ul className="mt-3 space-y-2 text-sm text-paper/60">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-paper">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm tracking-[0.15em] text-oldgold">联系</p>
            <ul className="mt-3 space-y-2 text-sm text-paper/60">
              <li>微信 {site.wechat}</li>
              <li>
                <a
                  href={`tel:${site.phone.replace(/-/g, "")}`}
                  className="hover:text-paper"
                >
                  {site.phone}
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="text-sm tracking-[0.15em] text-oldgold">合作</p>
            <p className="mt-3 text-sm leading-relaxed text-paper/45">
              寺庙、古建工程方与私人宅院均可咨询。请说明工程类型与大致地点。
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-paper/10 px-4 py-4 text-center text-xs text-paper/30 sm:px-6">
        © {new Date().getFullYear()} {site.name}
      </div>
    </footer>
  );
}
