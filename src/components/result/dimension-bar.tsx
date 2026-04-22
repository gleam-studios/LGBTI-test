import { DIMENSION_META, type Dimension } from "@/lib/dimensions";

interface Props {
  dim: Dimension;
  /** 0..100，落在 leftLabel↔rightLabel 轴上的位置 */
  percent: number;
  letter: string;
  locale: string;
  desc: string;
}

/**
 * 维度 chip：与首页 DimensionChips 同一语汇——
 * 左侧维度色发丝 + 代号/百分比 + 名称（display serif）+ 细条轨 + 双端标签 + 简要释义。
 * 不使用卡片边框，让内容自然呼吸。
 */
export function DimensionBar({ dim, percent, letter, locale, desc }: Props) {
  const meta = DIMENSION_META[dim];
  const leftLabel = locale === "zh" ? meta.leftLabel.zh : meta.leftLabel.en;
  const rightLabel = locale === "zh" ? meta.rightLabel.zh : meta.rightLabel.en;
  const name = locale === "zh" ? meta.zh : meta.en;

  return (
    <article className="group relative pl-5">
      <span
        aria-hidden
        className="absolute bottom-1 left-0 top-1 w-px transition-[width] duration-500 group-hover:w-[1.5px]"
        style={{
          background: `linear-gradient(180deg, ${meta.color}, color-mix(in oklab, ${meta.color} 8%, transparent))`,
        }}
      />

      <div className="flex items-baseline justify-between gap-2">
        <span
          className="font-mono text-[11.5px] font-semibold tracking-[0.28em]"
          style={{ color: meta.color }}
        >
          {meta.leftLetter}
          <span className="mx-0.5 opacity-40">·</span>
          {meta.rightLetter}
        </span>
        <span className="font-mono text-[10.5px] tracking-widest text-[color:var(--text-muted)]">
          {percent}%
        </span>
      </div>

      <h3 className="font-display mt-2 flex items-baseline gap-2 text-[16px] font-semibold leading-snug tracking-[-0.01em] text-[color:var(--text)] sm:text-[17px]">
        <span>{name}</span>
        {letter ? (
          <span
            className="font-mono text-[11px] font-bold tracking-widest"
            style={{ color: meta.color }}
          >
            {letter}
          </span>
        ) : null}
      </h3>

      {/* 细条轨，头端圆点表示落点 */}
      <div
        className="relative mt-2.5 h-[3px] w-full overflow-visible rounded-full"
        style={{
          background: `color-mix(in oklab, ${meta.color} 14%, transparent)`,
        }}
        aria-hidden
      >
        <span
          className="absolute left-0 top-0 h-full rounded-full transition-all duration-500"
          style={{
            width: `${percent}%`,
            background: meta.color,
          }}
        />
        <span
          className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500"
          style={{
            left: `${percent}%`,
            background: meta.color,
            boxShadow: `0 0 0 3px color-mix(in oklab, ${meta.color} 18%, var(--panel))`,
          }}
        />
      </div>

      <div className="mt-1.5 flex justify-between text-[10.5px] tracking-wide text-[color:var(--text-muted)]">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>

      <p className="mt-2.5 text-[12.5px] leading-[1.8] text-[color:var(--text-muted)]">
        {desc}
      </p>
    </article>
  );
}
