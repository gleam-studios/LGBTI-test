import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Figure } from "@/components/figures/figure";
import type { Persona } from "@/lib/types";
import { cn } from "@/lib/utils";

/** 眉标 + 类型码：整段单行（避免中文在 flex 下被压窄后断行） */
function KickerWithCode({
  kicker,
  code,
  hueTo,
  locale,
}: {
  kicker: string;
  code: string;
  hueTo: string;
  locale: string;
}) {
  const isZh = locale === "zh";
  return (
    <span
      className={cn(
        "inline-flex min-w-max flex-none flex-nowrap items-center gap-x-1 whitespace-nowrap sm:gap-x-1.5",
        "text-[10.5px] font-medium text-[color:var(--text-muted)] sm:text-[11px]",
        isZh
          ? "normal-case tracking-[0.04em]"
          : "uppercase tracking-[0.22em] sm:tracking-[0.3em]",
      )}
    >
      <span className="shrink-0">{kicker}</span>
      <span aria-hidden className="shrink-0 opacity-50">
        ·
      </span>
      <span
        className={cn(
          "shrink-0 font-mono",
          isZh ? "tracking-[0.1em]" : "tracking-[0.16em] sm:tracking-[0.22em]",
        )}
        style={{ color: hueTo }}
      >
        {code}
      </span>
    </span>
  );
}

/** 主卡：插图 + 标题区（与 split 侧栏组合时由外层控制上间距） */
function TypeHeroMainGrid({
  persona,
  localizedName,
  moto,
  tags,
  className,
}: {
  persona: Persona;
  localizedName: string;
  moto: string;
  tags: string[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid w-full gap-6 sm:grid-cols-[180px_1fr] sm:items-center sm:gap-10 md:grid-cols-[220px_1fr]",
        className,
      )}
    >
      <div className="relative mx-auto flex aspect-square w-36 items-center justify-center sm:mx-0 sm:w-44 md:w-56">
        <div
          aria-hidden
          className="absolute inset-[-18%] -z-10 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, color-mix(in oklab, ${persona.hue.from} 32%, transparent) 0%, transparent 65%)`,
          }}
        />
        <Figure
          code={persona.code}
          size={224}
          priority
          className="h-full w-full object-contain drop-shadow-[0_12px_32px_rgba(20,18,40,0.18)]"
          alt={`${persona.code} · ${localizedName}`}
        />
      </div>

      <div className="mx-auto w-full max-w-xl justify-self-center text-center sm:mx-0 sm:justify-self-start sm:text-left">
        <h1
          id="type-title"
          className="font-display text-balance leading-[1.08] text-[color:var(--text)]"
        >
          <span
            className="block font-mono text-[clamp(1.15rem,2.8vw,1.65rem)] font-semibold tracking-[0.22em]"
            style={{ color: persona.hue.to }}
          >
            {persona.code}
          </span>
          <span className="mt-2 block text-[clamp(1.85rem,4.8vw,3.35rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
            {localizedName}
          </span>
        </h1>

        <ul className="mt-4 flex flex-wrap justify-center gap-1.5 sm:justify-start">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full px-2.5 py-0.5 text-[11.5px] font-medium transition"
              style={{
                color: persona.hue.to,
                background: `color-mix(in oklab, ${persona.hue.from} 12%, transparent)`,
                boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${persona.hue.from} 24%, transparent)`,
              }}
            >
              {tag}
            </li>
          ))}
        </ul>

        <blockquote
          className="relative mt-5 max-w-xl pl-4 text-[15.5px] leading-[1.6] sm:text-[17px]"
          style={{ color: "var(--text)" }}
        >
          <span
            aria-hidden
            className="absolute bottom-1 left-0 top-1 w-[1.5px]"
            style={{
              background: `linear-gradient(180deg, ${persona.hue.from}, color-mix(in oklab, ${persona.hue.to} 12%, transparent))`,
            }}
          />
          <span className="font-display italic">&ldquo;{moto}&rdquo;</span>
        </blockquote>
      </div>
    </div>
  );
}

export async function TypeHero({
  persona,
  locale,
  /** split：与右侧分享区并排时，eyebrow 左对齐+尾线，不再居中 */
  variant = "default",
  /** split 专用：眉标行右侧（如「重新测试」「支持资源」），与 Kicker 同一 flex 行 */
  splitHeaderEnd,
  /** split 专用：与主卡并排的同 section 内分享区（Ko-fi、保存与社交） */
  splitShare,
  /** split 且传入 splitShare 时，用于分享包裹层的 aria-label */
  shareAsideLabel,
}: {
  persona: Persona;
  locale: string;
  variant?: "default" | "split";
  splitHeaderEnd?: ReactNode;
  splitShare?: ReactNode;
  shareAsideLabel?: string;
}) {
  const t = await getTranslations({ locale, namespace: "result" });
  /** 标题两行：代号一行 + 当前语言类型名一行（无单独的英文 archetype 副标题） */
  const localizedName = locale === "zh" ? persona.cn : persona.en;
  const moto = locale === "zh" ? persona.moto.zh : persona.moto.en;
  const tags = locale === "zh" ? persona.tags.zh : persona.tags.en;
  const shareLabel = shareAsideLabel ?? t("shareAside");

  return (
    <section aria-labelledby="type-title">
      {variant === "split" ? (
        <div className="flex w-full min-w-0 flex-nowrap items-center gap-1.5 overflow-x-auto overscroll-x-contain sm:gap-3">
          <KickerWithCode
            kicker={t("kicker")}
            code={persona.code}
            hueTo={persona.hue.to}
            locale={locale}
          />
          <span
            aria-hidden
            className="h-px min-w-0 flex-1 self-center bg-gradient-to-r from-[color:var(--line)] to-transparent"
          />
          {splitHeaderEnd ? (
            <div className="ml-auto shrink-0">{splitHeaderEnd}</div>
          ) : null}
        </div>
      ) : (
        <div className="flex w-full min-w-0 flex-nowrap items-center justify-center gap-2 sm:gap-3">
          <span
            aria-hidden
            className="h-px min-w-2 flex-1 max-w-14 bg-gradient-to-r from-transparent to-[color:var(--line)] sm:max-w-16"
          />
          <KickerWithCode
            kicker={t("kicker")}
            code={persona.code}
            hueTo={persona.hue.to}
            locale={locale}
          />
          <span
            aria-hidden
            className="h-px min-w-2 flex-1 max-w-14 bg-gradient-to-l from-transparent to-[color:var(--line)] sm:max-w-16"
          />
        </div>
      )}

      {variant === "split" && splitShare ? (
        <div className="mt-5 flex w-full max-w-full flex-col gap-6 lg:w-fit lg:max-w-full lg:flex-row lg:items-stretch lg:gap-5 xl:gap-6 2xl:gap-6">
          <div className="min-w-0 w-full max-w-[54rem] shrink-0">
            <TypeHeroMainGrid
              persona={persona}
              localizedName={localizedName}
              moto={moto}
              tags={tags}
              className="mt-0"
            />
          </div>
          <div
            className="mx-auto flex min-h-0 w-full min-w-0 max-w-sm flex-col self-stretch overflow-x-clip sm:max-w-none lg:mx-0 lg:w-[16.5rem] lg:min-w-[16.5rem] lg:max-w-[16.5rem] xl:min-w-[18rem] xl:max-w-[18rem] 2xl:min-w-[19.5rem] 2xl:max-w-[19.5rem]"
            data-html2img-ignore
            aria-label={shareLabel}
          >
            <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col items-center justify-center pt-4 pb-0.5 sm:pt-6 lg:pt-8">
              {splitShare}
            </div>
          </div>
        </div>
      ) : (
        <TypeHeroMainGrid
          persona={persona}
          localizedName={localizedName}
          moto={moto}
          tags={tags}
          className="mt-5 sm:mt-7"
        />
      )}
    </section>
  );
}
