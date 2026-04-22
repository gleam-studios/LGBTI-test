import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { DimensionChips } from "@/components/intro/dimension-chips";
import { JsonLd } from "@/components/seo/json-ld";
import { QUESTION_COUNT } from "@/lib/questions";
import { SITE_URL } from "@/lib/utils";

export default async function IntroPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "intro" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: t("eyebrow"),
    description: t("sub"),
    url: `${SITE_URL}/${locale}`,
    inLanguage: locale === "zh" ? "zh-CN" : "en",
    educationalLevel: "beginner",
    numberOfQuestions: QUESTION_COUNT,
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <JsonLd data={jsonLd} />
      {/*
        在 main 剩余高度内做垂直居中：内层 min-h-full + flex items-center justify-center。
        比 flex-1 占位更可靠；内容短于一屏时上下留白对称，过长时整区可滚。
      */}
      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-behavior-y-contain [-webkit-overflow-scrolling:touch]">
        <div className="flex min-h-full w-full items-center justify-center px-6 py-6 sm:px-10 sm:py-8 lg:px-16">
          <div className="w-full max-w-[1400px]">
            <div className="flex flex-col gap-8 sm:gap-10">
              {/* Hero */}
              <section className="flex flex-col items-center text-center">
                <div className="flex items-center gap-3 text-[10.5px] font-medium uppercase tracking-[0.32em] text-[color:var(--text-muted)] sm:gap-4 sm:text-[11px]">
                  <span
                    aria-hidden
                    className="h-px w-10 bg-gradient-to-r from-transparent to-[color:var(--line)] sm:w-12"
                  />
                  <span className="text-sm" aria-hidden>
                    🏳️‍🌈
                  </span>
                  <span>{t("eyebrow")}</span>
                  <span
                    aria-hidden
                    className="h-px w-10 bg-gradient-to-l from-transparent to-[color:var(--line)] sm:w-12"
                  />
                </div>

                <h1
                  className="font-display mt-5 text-balance text-[clamp(3rem,7.5vw,5.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] sm:mt-6"
                  dangerouslySetInnerHTML={{ __html: t.raw("title") }}
                />

                <p className="mt-4 max-w-2xl text-base leading-[1.85] text-[color:var(--text-muted)] sm:mt-5 sm:text-[17.5px]">
                  {t("sub")}
                </p>

                <Link
                  href="/test"
                  className="group mt-6 inline-flex items-center gap-3 font-display text-2xl italic text-[color:var(--accent-strong)] transition-colors hover:text-[color:var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent)] sm:mt-7 sm:text-3xl"
                >
                  <span className="relative">
                    <span className="tracking-wide">{t("cta")}</span>
                    <span
                      aria-hidden
                      className="absolute -bottom-1 left-0 block h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                    />
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 sm:h-6 sm:w-6" />
                </Link>
              </section>

              {/* Dimensions */}
              <section className="flex flex-col gap-5 sm:gap-6">
                <DimensionChips locale={locale} />
                <p className="mx-auto max-w-2xl text-center text-[13px] italic leading-[1.8] text-[color:var(--text-muted)] sm:text-[13.5px]">
                  {t("straight")}
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
