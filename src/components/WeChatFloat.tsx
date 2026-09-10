import { site } from "@/content/site";

export function WeChatFloat() {
  return (
    <a
      href="#xiangan"
      className="fixed right-3 bottom-[calc(6.5rem+var(--safe-bottom))] z-40 flex min-h-12 items-center gap-2 bg-cinnabar/95 px-4 py-3 text-sm text-paper shadow-lg transition-colors hover:bg-cinnabar-hover sm:right-5 sm:bottom-[calc(1.25rem+var(--safe-bottom))]"
      aria-label="前往香案咨询"
    >
      <span className="hidden sm:inline">微信咨询</span>
      <span className="sm:hidden">咨询</span>
      <span className="text-paper/70">·</span>
      <span className="font-mono text-xs tracking-wide">{site.wechat}</span>
    </a>
  );
}
