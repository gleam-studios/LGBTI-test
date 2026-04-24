import { getTranslations } from "next-intl/server";
import { Figure } from "@/components/figures/figure";
import type { Persona } from "@/lib/types";

export async function TypeHero({
  persona,
  locale,
  /** split：与右侧分享区并排时，eyebrow 左对齐+尾线，不再居中 */
  variant = "default",
}: {
  persona: Persona;
  locale: string;
  variant?: "default" | "split";
}) {
  const t = await getTranslations({ locale, namespace: "result" });
  /** 标题两行：代号一行 + 当前语言类型名一行（无单独的英文 archetype 副标题） */
  const localizedName = locale === "zh" ? persona.cn : persona.en;
  const moto = locale === "zh" ? persona.moto.zh : persona.moto.en;
  const tags = locale === "zh" ? persona.tags.zh : persona.tags.en;

  return (
    <section aria-labelledby="type-title">
      {variant === "split" ? (
        <div className="flex items-center gap-3 text-[10.5px] font-medium uppercase tracking-[0.32em] text-[color:var(--text-muted)] sm:text-[11px]">
          <span>{t("kicker")}</span>
          <span aria-hidden className="opacity-50">
            ·
          </span>
          <span
            className="font-mono tracking-[0.22em]"
            style={{ color: persona.hue.to }}
          >
            {persona.code}
          </span>
          <span
            aria-hidden
            className="h-px flex-1 max-w-md bg-gradient-to-r from-[color:var(--line)] to-transparent"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center gap-3 text-[10.5px] font-medium uppercase tracking-[0.32em] text-[color:var(--text-muted)] sm:gap-4 sm:text-[11px]">
          <span
            aria-hidden
            className="h-px w-10 bg-gradient-to-r from-transparent to-[color:var(--line)] sm:w-14"
          />
          <span>{t("kicker")}</span>
          <span aria-hidden className="opacity-50">
            ·
          </span>
          <span
            className="font-mono tracking-[0.22em]"
            style={{ color: persona.hue.to }}
          >
            {persona.code}
          </span>
          <span
            aria-hidden
            className="h-px w-10 bg-gradient-to-l from-transparent to-[color:var(--line)] sm:w-14"
          />
        </div>
      )}

      {/* Hero row: figure 带柔光 + 大字标题。split 时宽度由 result 页外包层 max-w-4xl 控制，避免与 1fr 侧栏同误伤 */}
      <div className="mt-5 grid w-full gap-6 sm:mt-7 sm:grid-cols-[180px_1fr] sm:items-center sm:gap-10 md:grid-cols-[220px_1fr]">
        <div className="relative mx-auto flex aspect-square w-36 items-center justify-center sm:mx-0 sm:w-44 md:w-56">
          {/* 背后 persona 色光晕 */}
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

        <div className="text-center sm:text-left">
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

          {/* motto 引言：display serif italic，左侧 hair 色线，无重底色 */}
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
    </section>
  );
}
