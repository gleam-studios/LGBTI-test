import { getTranslations } from "next-intl/server";
import { DIMENSIONS, DIMENSION_META } from "@/lib/dimensions";

const ROMAN = ["I", "II", "III", "IV"] as const;

/**
 * 编辑感极简栏位：无卡片外壳，仅左侧维度色发丝 + 代号 + 名称 + 释义。
 * md 以上横排 4 列，小屏 2 列。
 */
export async function DimensionChips({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "dims" });
  return (
    <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2 sm:gap-x-8 md:grid-cols-4 md:gap-x-8">
      {DIMENSIONS.map((dim, idx) => {
        const meta = DIMENSION_META[dim];
        return (
          <article key={dim} className="group relative pl-5">
            {/* 左侧维度色发丝：渐变消失、无硬边 */}
            <span
              aria-hidden
              className="absolute bottom-1 left-0 top-1 w-px transition-[width,opacity] duration-500 group-hover:w-[1.5px]"
              style={{
                background: `linear-gradient(180deg, ${meta.color}, color-mix(in oklab, ${meta.color} 8%, transparent))`,
              }}
            />

            {/* 首行：代号 ↔ 罗马数字 */}
            <div className="flex items-baseline justify-between gap-2">
              <span
                className="font-mono text-[11.5px] font-semibold tracking-[0.28em]"
                style={{ color: meta.color }}
              >
                {meta.leftLetter}
                <span className="mx-0.5 opacity-40">·</span>
                {meta.rightLetter}
              </span>
              <span
                aria-hidden
                className="font-display text-[13px] font-medium tracking-[0.2em] text-[color:var(--text-muted)]/35 transition-colors duration-500 group-hover:text-[color:var(--text-muted)]/55"
              >
                {ROMAN[idx]}
              </span>
            </div>

            <h3 className="font-display mt-2.5 text-[17px] font-semibold leading-snug tracking-[-0.01em] text-[color:var(--text)] sm:text-[18px]">
              {t(`${dim}.name`)}
            </h3>

            <p className="mt-2 text-[13.5px] leading-[1.8] text-[color:var(--text-muted)]">
              {t(`${dim}.summary`)}
            </p>
          </article>
        );
      })}
    </div>
  );
}
