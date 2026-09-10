"use client";

import { useEffect, useState } from "react";
import { navItems, site } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const sync = () => {
      setScrolled(window.scrollY > 40);

      // Probe line near upper third — section whose top last crossed it is active
      const probe = window.innerHeight * 0.28;
      let current = "";

      for (const item of navItems) {
        const el = document.getElementById(item.href.slice(1));
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= probe) current = item.href;
      }

      // Near page bottom → force contact
      const doc = document.documentElement;
      if (window.scrollY + window.innerHeight >= doc.scrollHeight - 80) {
        current = "#xiangan";
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

  function goTo(href: string) {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-paper/10 bg-hall/90 text-paper backdrop-blur-md"
          : "border-transparent bg-transparent text-paper"
      }`}
    >
      <div className="mx-auto flex h-[var(--header-h)] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#shanmen"
          onClick={(e) => {
            e.preventDefault();
            goTo("#shanmen");
          }}
          className={`font-display tracking-wide transition-opacity hover:opacity-100 ${
            scrolled ? "text-base sm:text-lg" : "text-sm opacity-70 sm:text-base"
          }`}
          aria-label={`${site.name} 回到山门`}
        >
          {site.name}
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="主导航">
          {navItems.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  goTo(item.href);
                }}
                className={`relative text-sm tracking-wider transition-opacity hover:opacity-100 ${
                  isActive ? "opacity-100 text-oldgold" : "opacity-55"
                } after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-oldgold after:transition-transform hover:after:scale-x-100 ${
                  isActive ? "after:scale-x-100" : ""
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "关闭菜单" : "打开菜单"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">菜单</span>
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 block h-px w-full bg-current transition ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] block h-px w-full bg-current transition ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] block h-px w-full bg-current transition ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`md:hidden ${open ? "block" : "hidden"}`}
      >
        <nav
          className="border-t border-paper/10 bg-hall px-4 py-6 text-paper"
          aria-label="移动导航"
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(item.href);
                  }}
                  className={`block min-h-12 px-2 py-3 text-lg ${
                    active === item.href ? "text-oldgold" : ""
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#xiangan"
            onClick={(e) => {
              e.preventDefault();
              goTo("#xiangan");
            }}
            className="mt-4 flex min-h-12 items-center justify-center bg-cinnabar px-4 text-sm text-paper"
          >
            咨询合作
          </a>
        </nav>
      </div>
    </header>
  );
}
