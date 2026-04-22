import { Link } from "@/i18n/navigation";
import { Figure } from "@/components/figures/figure";
import { DIMENSIONS, DIMENSION_META } from "@/lib/dimensions";
import { TYPES, type TypeCode } from "@/lib/types";

/**
 * 邻近类型列表：把当前 code 的四个字母按顺序各翻转一次，产生 4 个"只差一个维度"的相近人格。
 * 例如 C-M-A-G → R-M-A-G / C-O-A-G / C-M-S-G / C-M-A-P。
 * 不含 section 外壳（由父布局用 Eyebrow 负责标题）。
 */
export async function NeighborTypes({
  code,
  locale,
}: {
  code: TypeCode;
  locale: string;
}) {
  const parts = code.split("-") as [string, string, string, string];

  const neighbors = DIMENSIONS.map((dim, idx) => {
    const meta = DIMENSION_META[dim];
    const current = parts[idx];
    const flipped = current === meta.leftLetter ? meta.rightLetter : meta.leftLetter;
    const copy = [...parts];
    copy[idx] = flipped;
    const newCode = copy.join("-") as TypeCode;
    const flippedLabel =
      flipped === meta.leftLetter ? meta.leftLabel : meta.rightLabel;
    return {
      code: newCode,
      dim,
      dimName: locale === "zh" ? meta.zh : meta.en,
      flippedLabel: locale === "zh" ? flippedLabel.zh : flippedLabel.en,
      flippedLetter: flipped,
    };
  });

  return (
    <ul className="flex flex-col gap-1">
      {neighbors.map(({ code: nc, dimName, flippedLabel, flippedLetter }) => {
        const p = TYPES[nc];
        const name = locale === "zh" ? p.cn : p.en;
        return (
          <li key={nc}>
            <Link
              href={`/result/${nc}`}
              className="group relative flex items-center gap-3.5 py-2.5 pl-4 pr-2 transition-[transform,background-color] duration-300 hover:translate-x-0.5"
            >
              <span
                aria-hidden
                className="absolute bottom-2 left-0 top-2 w-px transition-[width] duration-500 group-hover:w-[1.5px]"
                style={{
                  background: `linear-gradient(180deg, ${p.hue.from}, color-mix(in oklab, ${p.hue.to} 10%, transparent))`,
                }}
              />
              <div
                className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[14px]"
                style={{
                  background: `radial-gradient(circle at 30% 30%, color-mix(in oklab, ${p.hue.from} 22%, transparent), color-mix(in oklab, ${p.hue.to} 6%, transparent))`,
                  boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${p.hue.from} 20%, transparent)`,
                }}
              >
                <Figure
                  code={nc}
                  size={44}
                  className="h-11 w-11 object-contain drop-shadow-[0_3px_6px_rgba(20,18,40,0.12)]"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className="font-mono text-[10.5px] tracking-[0.24em]"
                  style={{ color: p.hue.to }}
                >
                  {nc}
                </p>
                <p className="truncate text-[14px] font-semibold text-[color:var(--text)] transition-colors duration-300 group-hover:text-[color:var(--accent-strong)]">
                  {name}
                </p>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-0.5 pl-1 text-right">
                <span
                  className="font-mono text-[10.5px] tracking-widest"
                  style={{ color: p.hue.to }}
                >
                  {flippedLetter}
                </span>
                <span className="text-[10.5px] italic text-[color:var(--text-muted)]">
                  {locale === "zh" ? `${dimName} · ${flippedLabel}` : `${dimName} · ${flippedLabel}`}
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
