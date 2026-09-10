import { site } from "@/content/site";

export function WeChatFloat() {
  return (
    <a
      href="#xiangan"
      className="fixed right-3 bottom-[calc(4.25rem+var(--safe-bottom))] z-40 flex min-h-11 items-center bg-cinnabar/95 px-4 py-2.5 text-sm text-paper shadow-lg transition-colors hover:bg-cinnabar-hover sm:right-5 sm:bottom-[calc(1.25rem+var(--safe-bottom))] sm:min-h-12 sm:gap-2 sm:px-4 sm:py-3"
      aria-label="前往结缘咨询"
    >
      <span className="sm:hidden">咨询</span>
      <span className="hidden sm:inline">微信咨询</span>
      <span className="hidden text-paper/70 sm:inline">·</span>
      <span className="hidden font-mono text-xs tracking-wide sm:inline">
        {site.wechat}
      </span>
    </a>
  );
}
