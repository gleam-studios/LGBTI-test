"use client";

import { useTranslations } from "next-intl";
import { DIMENSIONS, DIMENSION_META, type Dimension } from "@/lib/dimensions";

interface Props {
  /** total questions */
  total: number;
  /** 1-based index of the current question */
  currentIndex: number;
  /** mapping from questionIndex -> dimension, to color each segment */
  dimensionMap: Dimension[];
  /** answered flags per question */
  answered: boolean[];
  /** 点击某一格时跳转（0-based 题目下标） */
  onSeekQuestion?: (zeroBasedIndex: number) => void;
}

export function RainbowProgress({
  total,
  currentIndex,
  dimensionMap,
  answered,
  onSeekQuestion,
}: Props) {
  const t = useTranslations("test");
  const interactive = typeof onSeekQuestion === "function";

  return (
    <div className="flex w-full flex-col gap-2" aria-live="polite">
      <div className="flex items-center justify-between text-xs text-[color:var(--text-muted)]">
        <div className="flex items-center gap-3">
          {DIMENSIONS.map((dim) => {
            const meta = DIMENSION_META[dim];
            const isActive = dimensionMap[currentIndex - 1] === dim;
            return (
              <span
                key={dim}
                className="inline-flex items-center gap-1 font-mono tracking-wider"
                style={{
                  color: isActive ? meta.color : undefined,
                  opacity: isActive ? 1 : 0.6,
                }}
              >
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: meta.color }}
                  aria-hidden
                />
                {dim}
              </span>
            );
          })}
        </div>
        <span className="font-mono">
          {currentIndex} / {total}
        </span>
      </div>
      <div className="flex w-full gap-[3px]">
        {Array.from({ length: total }, (_, i) => {
          const dim = dimensionMap[i];
          const color = DIMENSION_META[dim]?.color ?? "var(--line)";
          const isCurrent = i === currentIndex - 1;
          const isAnswered = answered[i];
          const isPast = i < currentIndex - 1;
          const bar = (
            <span
              className="block h-2 w-full rounded-full transition-all duration-200"
              style={{
                background:
                  isAnswered || isPast || isCurrent ? color : "var(--line)",
                opacity: isCurrent ? 1 : isAnswered ? 0.9 : isPast ? 0.55 : 0.3,
                transform: isCurrent ? "scaleY(1.4)" : undefined,
              }}
              aria-hidden
            />
          );

          if (!interactive) {
            return (
              <span key={i} className="min-w-0 flex-1">
                {bar}
              </span>
            );
          }

          return (
            <button
              key={i}
              type="button"
              onClick={() => onSeekQuestion!(i)}
              className="flex min-h-10 min-w-0 flex-1 touch-manipulation cursor-pointer items-center justify-center rounded-md border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
              aria-label={t("progressSeek", { index: i + 1 })}
              aria-current={isCurrent ? "step" : undefined}
            >
              {bar}
            </button>
          );
        })}
      </div>
    </div>
  );
}
