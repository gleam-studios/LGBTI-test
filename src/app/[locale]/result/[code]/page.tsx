import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, Heart, RefreshCw } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { TypeHero } from "@/components/result/type-hero";
import { DimensionBar } from "@/components/result/dimension-bar";
import { NeighborTypes } from "@/components/result/neighbor-types";
import { Reveal } from "@/components/result/reveal";
import { ShareSheet } from "@/components/result/share-sheet";
import { ResultBottomAd } from "@/components/ads/result-bottom-ad";
import { JsonLd } from "@/components/seo/json-ld";
import { DIMENSIONS } from "@/lib/dimensions";
import { TYPES, TYPE_CODES, isTypeCode } from "@/lib/types";
import { SITE_URL } from "@/lib/utils";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    TYPE_CODES.map((code) => ({ locale, code })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; code: string }>;
}): Promise<Metadata> {
  const { locale, code } = await params;
  if (!isTypeCode(code)) return {};
  const persona = TYPES[code];
  const name = locale === "zh" ? persona.cn : persona.en;
  const tagline = locale === "zh" ? persona.moto.zh : persona.moto.en;
  const path = `/${locale}/result/${code}`;
  const ogImage = `${SITE_URL}/api/og/${code}?lang=${locale}`;

  return {
    title: `${name} (${code})`,
    description: tagline,
    alternates: {
      canonical: path,
      languages: {
        "zh-CN": `/zh/result/${code}`,
        en: `/en/result/${code}`,
      },
    },
    openGraph: {
      type: "article",
      url: `${SITE_URL}${path}`,
      title: `${name} · ${code}`,
      description: tagline,
      images: [{ url: ogImage, width: 1200, height: 630, alt: name }],
      locale: locale === "zh" ? "zh_CN" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} · ${code}`,
      description: tagline,
      images: [ogImage],
    },
  };
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[10.5px] font-medium uppercase tracking-[0.32em] text-[color:var(--text-muted)] sm:text-[11px]">
      <span>{children}</span>
      <span
        aria-hidden
        className="h-px flex-1 bg-gradient-to-r from-[color:var(--line)] to-transparent"
      />
    </div>
  );
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ locale: string; code: string }>;
}) {
  const { locale, code } = await params;
  if (!isTypeCode(code)) notFound();
  setRequestLocale(locale);

  const persona = TYPES[code];
  const t = await getTranslations({ locale, namespace: "result" });
  const name = locale === "zh" ? persona.cn : persona.en;
  const desc = locale === "zh" ? persona.desc.zh : persona.desc.en;
  const path = `/${locale}/result/${code}`;
  const shareUrl = `${SITE_URL}${path}`;
  const ogImageUrl = `${SITE_URL}/api/og/${code}?lang=${locale}`;

  const letters = code.split("-");
  const canonicalPercent = (letterIdx: number, rightLetter: string) =>
    letters[letterIdx] === rightLetter ? 80 : 20;

  const dimsPercents: Record<(typeof DIMENSIONS)[number], number> = {
    CR: canonicalPercent(0, "R"),
    OM: canonicalPercent(1, "M"),
    SA: canonicalPercent(2, "A"),
    GP: canonicalPercent(3, "P"),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${name} · ${code}`,
    description: locale === "zh" ? persona.moto.zh : persona.moto.en,
    inLanguage: locale === "zh" ? "zh-CN" : "en",
    url: shareUrl,
    image: ogImageUrl,
    about: {
      "@type": "Quiz",
      name: locale === "zh" ? "彩虹电梯测试" : "Rainbow Elevator",
    },
  };

  const supportLabel = locale === "zh" ? "支持资源" : "Support";

  return (
    <div className="mx-auto w-full max-w-[1400px] px-6 py-5 sm:px-10 sm:py-7 lg:px-16">
      <JsonLd data={jsonLd} />

      <nav className="text-xs">
        <Link
          href="/"
          className="group inline-flex items-center gap-1.5 text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--accent-strong)]"
        >
          <ArrowLeft className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-0.5" />
          {locale === "zh" ? "返回首页" : "Back home"}
        </Link>
      </nav>

      {/* 结果页主要内容（可截图区域） */}
      <div id="result-capture" data-capture-root>

      {/* 1. 结果 + 右栏：上为「重新测试 / 支持」，下为分享模块（下载 + 图标） */}
      <div className="mt-5 grid gap-6 sm:mt-6 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-stretch lg:gap-6 xl:grid-cols-[minmax(0,1fr)_16.5rem]">
        <div className="min-w-0">
          <Reveal>
            <TypeHero persona={persona} locale={locale} variant="split" />
          </Reveal>
        </div>
        <aside
          data-html2img-ignore
          className="flex min-h-0 min-w-0 flex-col self-stretch px-1.5 sm:px-2 lg:pt-1"
          aria-label={`${t("resultActions")} · ${t("shareAside")}`}
        >
          <nav
            className="mb-4 w-full min-w-0 max-w-full shrink-0 sm:mb-5"
            aria-label={t("resultActions")}
          >
            <div className="flex w-full min-w-0 max-w-full flex-nowrap items-center gap-x-1.5 sm:gap-x-2">
              <Link
                href={{ pathname: "/test", query: { restart: "1" } }}
                className="group flex min-w-0 flex-1 items-center gap-1 text-[color:var(--text)] transition-colors hover:text-[color:var(--accent-strong)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent)] sm:gap-1.5"
              >
                <RefreshCw className="h-3 w-3 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-90 sm:h-3.5 sm:w-3.5" />
                <span className="relative min-w-0 flex-1 font-display text-[14px] italic sm:text-[15px]">
                  <span className="block truncate">{t("retake")}</span>
                  <span
                    aria-hidden
                    className="absolute -bottom-0.5 left-0 right-0 block h-px origin-left scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                  />
                </span>
                <ArrowRight className="h-3 w-3 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 sm:h-3.5 sm:w-3.5" />
              </Link>
              <span
                className="shrink-0 text-[color:var(--line)]"
                aria-hidden
              >
                |
              </span>
              <Link
                href="/support"
                className="group flex min-w-0 flex-1 items-center gap-1 text-[color:var(--accent-strong)] transition-colors hover:text-[color:var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent)] sm:gap-1.5"
              >
                <Heart className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
                <span className="relative min-w-0 flex-1 font-display text-[14px] italic sm:text-[15px]">
                  <span className="block truncate">{supportLabel}</span>
                  <span
                    aria-hidden
                    className="absolute -bottom-0.5 left-0 right-0 block h-px origin-left scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                  />
                </span>
                <ArrowRight className="h-3 w-3 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 sm:h-3.5 sm:w-3.5" />
              </Link>
            </div>
          </nav>
          <div className="min-h-0 w-full min-w-0 flex-1 overflow-x-clip lg:-ml-1 lg:mr-1.5 lg:pr-0.5 xl:-ml-1.5 xl:mr-2">
            <ShareSheet
              code={code}
              title={name}
              locale={locale}
              shareUrl={shareUrl}
              variant="hero"
            />
          </div>
        </aside>
      </div>

      {/* 2. 简单解读：全宽，与版心右缘对齐，不与侧栏争宽 */}
      <section className="mt-9 border-t border-[color:var(--line)]/60 pt-8 sm:mt-10 sm:pt-9">
        <SectionEyebrow>{t("analysis")}</SectionEyebrow>
        <p className="mt-3 whitespace-pre-line text-[14.5px] leading-[1.85] text-[color:var(--text)] sm:text-[15px]">
          {desc}
        </p>
      </section>

      {/* 3. 四维度分析 | 与你最接近 — 同一起始线并排 */}
      <div className="mt-8 grid gap-8 border-t border-[color:var(--line)]/60 pt-8 sm:mt-9 sm:gap-9 sm:pt-9 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-8 xl:grid-cols-[minmax(0,1fr)_25rem]">
        <section className="min-w-0">
          <SectionEyebrow>{t("dimsTitle")}</SectionEyebrow>
          <div className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2 sm:gap-y-6 md:gap-x-10">
            {DIMENSIONS.map((dim) => (
              <DimensionBar
                key={dim}
                dim={dim}
                percent={dimsPercents[dim]}
                letter={
                  persona.dims[dim] ? letters[DIMENSIONS.indexOf(dim)] : ""
                }
                locale={locale}
                desc={locale === "zh" ? persona.dims[dim].zh : persona.dims[dim].en}
              />
            ))}
          </div>
        </section>

        <aside className="min-w-0 border-t border-[color:var(--line)]/60 pt-6 lg:border-l lg:border-t-0 lg:border-[color:var(--line)]/50 lg:pl-6 lg:pt-0.5">
          <section>
            <SectionEyebrow>{t("neighbors")}</SectionEyebrow>
            <div className="mt-4">
              <NeighborTypes code={code} locale={locale} />
            </div>
          </section>
        </aside>
      </div>

      <div className="mt-9 border-t border-[color:var(--line)]/60 pt-6 sm:mt-10 sm:pt-8">
        <p className="max-w-3xl text-[11px] italic leading-[1.7] text-[color:var(--text-muted)]">
          <span className="not-italic font-medium text-[color:var(--text-muted)]/90">
            {t("noteTitle")}
          </span>{" "}
          {t("note")}
        </p>
      </div>

      </div>{/* /#result-capture */}

      <div data-html2img-ignore>
        <ResultBottomAd />
      </div>
    </div>
  );
}
