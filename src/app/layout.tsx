import type { Metadata, Viewport } from "next";
import { Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WeChatFloat } from "@/components/WeChatFloat";
import { site } from "@/content/site";
import "./globals.css";

const notoSans = Noto_Sans_SC({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const notoSerif = Noto_Serif_SC({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: site.seoTitle,
    template: `%s｜${site.name}`,
  },
  description: site.seoDescription,
  metadataBase: new URL("https://jicaigujian.com"),
  openGraph: {
    title: site.seoTitle,
    description: site.seoDescription,
    locale: "zh_CN",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0e0d0b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      className={`${notoSans.variable} ${notoSerif.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-hall text-paper antialiased">
        <Header />
        <main className="flex-1 bg-hall pb-[calc(5rem+var(--safe-bottom))] sm:pb-8">{children}</main>
        <Footer />
        <WeChatFloat />
      </body>
    </html>
  );
}
