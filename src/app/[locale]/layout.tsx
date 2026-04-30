import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Noto_Sans_SC, Noto_Serif_SC, Playfair_Display } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Analytics } from "@/components/analytics";
import { cn, SITE_URL } from "@/lib/utils";

/**
 * AdSense 发布商 ID（公开）。优先读环境变量；未设置时与后台 HTML meta 默认值一致，便于 meta 验证。
 */
const ADSENSE_PUB =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() || "ca-pub-7248894390538261";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--next-font-sans",
  display: "swap",
});

const fontDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--next-font-display",
  display: "swap",
});

const fontCjkSans = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--next-font-cjk-sans",
  display: "swap",
});

const fontCjkDisplay = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  variable: "--next-font-cjk-display",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: { default: t("title"), template: `%s · ${t("title")}` },
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "zh-CN": "/zh",
        en: "/en",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      title: t("title"),
      description: t("description"),
      siteName: t("title"),
      url: `${SITE_URL}/${locale}`,
      locale: locale === "zh" ? "zh_CN" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    /** Google AdSense：HTML meta 连接网站（与后台「HTML 标签」方式一致） */
    other: {
      "google-adsense-account": ADSENSE_PUB,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const gaMeasurementId =
    process.env.GA_MEASUREMENT_ID?.trim() ||
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ||
    "";

  return (
    <html
      lang={locale === "zh" ? "zh-CN" : "en"}
      suppressHydrationWarning
      className={cn(
        fontSans.variable,
        fontDisplay.variable,
        fontCjkSans.variable,
        fontCjkDisplay.variable,
        "h-full",
      )}
    >
      <Script
        id="adsense-global"
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB}`}
        crossOrigin="anonymous"
        strategy="beforeInteractive"
      />
      <body className="min-h-full antialiased">
        <a
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-4 focus-visible:z-[60] focus-visible:rounded-lg focus-visible:bg-[color:var(--accent-strong)] focus-visible:px-3 focus-visible:py-2 focus-visible:text-sm focus-visible:text-white"
        >
          {locale === "zh" ? "跳到主内容" : "Skip to content"}
        </a>
        <ThemeProvider>
          <NextIntlClientProvider>
            <div className="rainbow-bar fixed left-0 right-0 top-0 z-50 h-1" />
            <div className="flex min-h-screen flex-col">
              <SiteHeader locale={locale} />
              <main
                id="main"
                className="flex min-h-0 flex-1 flex-col"
              >
                {children}
              </main>
              <SiteFooter locale={locale} />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
        <Analytics gaMeasurementId={gaMeasurementId || undefined} />
      </body>
    </html>
  );
}
