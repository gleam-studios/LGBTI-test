"use client";

import type * as React from "react";
import {
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from "framer-motion";
import { DIMENSION_META } from "@/lib/dimensions";
import type { Question } from "@/lib/questions";
import { cn } from "@/lib/utils";

interface Props {
  question: Question;
  locale: string;
  index: number;
  total: number;
  /** 与上一题相比的走向：1 下一题，-1 上一题（驱动极轻的横向过渡） */
  direction: 1 | -1;
  selected?: 1 | 2 | 3;
  onSelect: (value: 1 | 2 | 3) => void;
}

const CODES = ["A", "B", "C"] as const;

/** 选项点击：极短 tween，无弹簧回弹 */
const easeTap: Transition = {
  type: "tween",
  duration: 0.12,
  ease: [0.4, 0, 0.2, 1],
};

const easeCardOut: Transition = {
  type: "tween",
  duration: 0.13,
  ease: [0.4, 0, 0.2, 1],
};

const easeCardIn: Transition = {
  type: "tween",
  duration: 0.2,
  ease: [0.22, 1, 0.36, 1],
};

function cardVariants(reduceMotion: boolean): Variants {
  if (reduceMotion) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.12, ease: "easeOut" } },
      exit: { opacity: 0, transition: { duration: 0.1, ease: "easeIn" } },
    };
  }
  const nudge = 7;
  return {
    initial: (dir: 1 | -1) => ({
      opacity: 0,
      x: dir >= 0 ? nudge : -nudge,
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: easeCardIn,
    },
    exit: (dir: 1 | -1) => ({
      opacity: 0,
      x: dir >= 0 ? -nudge * 0.65 : nudge * 0.65,
      transition: easeCardOut,
    }),
  };
}

export function QuestionCard({
  question,
  locale,
  index,
  total,
  direction,
  selected,
  onSelect,
}: Props) {
  const meta = DIMENSION_META[question.dim];
  const prompt = locale === "zh" ? question.zh : question.en;
  const dimName = locale === "zh" ? meta.zh : meta.en;
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <motion.article
      custom={direction}
      variants={cardVariants(reduceMotion)}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative isolate mx-auto w-full bg-transparent p-0 shadow-none ring-0"
    >
      {/*
        整卡背后「光晕」：径向渐变 + 大半径 blur，边缘自然消散，避免多层 box-shadow 的矩形感与硬边。
        放在 overflow 之外，避免被圆角裁成硬轮廓。
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -z-10 w-[min(128%,100rem)] max-w-[min(87.5rem,calc(100vw-1.5rem))]"
        style={{
          top: "58%",
          height: "clamp(14rem, 52vw, 22rem)",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(
            ellipse 72% 52% at 50% 44%,
            var(--card-ambient-core) 0%,
            var(--card-ambient-mid) 40%,
            transparent 70%
          )`,
          filter: "blur(52px)",
          WebkitFilter: "blur(52px)",
        }}
      />

      <div
        className={cn(
          "relative z-10 overflow-hidden rounded-[var(--radius-lg)]",
          "bg-[color:var(--panel)]",
          "ring-1 ring-[color:var(--line)]/32",
          "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]",
          /* 不在正面叠 box-shadow，避免矩形投影边；体量感仅靠背后 blur 光晕 */
          "shadow-none",
        )}
      >
        {/* 顶部维度色柔光（非常淡） */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-50"
          style={{
            background: `radial-gradient(120% 80% at 50% -20%, color-mix(in oklab, ${meta.color} 11%, transparent) 0%, transparent 65%)`,
          }}
        />

        {/* 极细的维度彩虹线（顶部 1px） */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, color-mix(in oklab, ${meta.color} 50%, transparent), transparent)`,
          }}
        />

        <div className="relative z-10 p-6 sm:p-8">
        <header className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span
              className="font-display text-3xl font-semibold leading-none tabular-nums sm:text-4xl"
              style={{ color: "var(--text)" }}
            >
              {String(index).padStart(2, "0")}
            </span>
            <span className="font-mono text-xs tracking-widest text-[color:var(--text-muted)]">
              / {String(total).padStart(2, "0")}
            </span>
          </div>

          <motion.span
            initial={{ opacity: 0, x: reduceMotion ? 0 : 3 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "tween",
              duration: reduceMotion ? 0.12 : 0.18,
              delay: 0.02,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium backdrop-blur-md sm:text-xs"
            style={{
              color: meta.color,
              background: `color-mix(in oklab, ${meta.color} 12%, transparent)`,
              boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${meta.color} 18%, transparent)`,
            }}
          >
            <span aria-hidden className="text-sm leading-none">
              {meta.emoji}
            </span>
            <span className="tracking-wide">{dimName}</span>
          </motion.span>
        </header>

        <div className="mt-5 sm:mt-6">
          <h2 className="text-balance text-pretty text-xl font-medium leading-snug tracking-[-0.005em] sm:text-[1.6rem] sm:leading-[1.35]">
            {prompt}
          </h2>
        </div>

        <ul className="m-0 mt-6 flex list-none flex-col gap-2 p-0 sm:mt-7 sm:gap-2.5">
          {question.opts.map((opt, i) => {
            const code = CODES[i];
            const text = locale === "zh" ? opt.zh : opt.en;
            const isSelected = selected === opt.v;
            return (
              <li key={code} className="m-0">
                <motion.button
                  type="button"
                  onClick={() => onSelect(opt.v)}
                  aria-pressed={isSelected}
                  whileTap={{ scale: 0.985 }}
                  transition={easeTap}
                  className={cn(
                    "group relative flex min-h-[3.5rem] w-full items-center gap-3.5 rounded-[calc(var(--radius-md)-2px)] px-3.5 py-3 text-left",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]",
                    "motion-reduce:transition-none motion-reduce:active:scale-100",
                    "transition-[transform,background-color,box-shadow] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)]",
                    "sm:min-h-[3.75rem] sm:gap-4 sm:px-4 sm:py-3.5",
                    !isSelected &&
                      "hover:bg-[color-mix(in_oklab,var(--panel)_86%,var(--bg-soft))]",
                  )}
                  style={
                    {
                      background: isSelected
                        ? `color-mix(in oklab, ${meta.color} 6%, color-mix(in oklab, var(--panel) 92%, var(--bg-soft)))`
                        : `color-mix(in oklab, var(--panel) 92%, var(--bg-soft))`,
                      boxShadow: isSelected
                        ? `inset 0 0 0 1px ${meta.color}`
                        : "inset 0 0 0 1px color-mix(in oklab, var(--line) 78%, transparent)",
                    } as React.CSSProperties
                  }
                >
                  <span
                    className={cn(
                      "relative w-5 shrink-0 text-center font-mono text-sm tabular-nums",
                      "transition-[color] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
                      isSelected ? "font-bold" : "font-semibold",
                    )}
                    style={{
                      color: isSelected
                        ? meta.color
                        : `color-mix(in oklab, ${meta.color} 52%, var(--text-muted))`,
                    }}
                  >
                    {code}
                  </span>

                  <span className="min-w-0 flex-1 text-[color:var(--text)] text-[15px] leading-[1.6] sm:text-[15.5px]">
                    {text}
                  </span>

                  <span
                    aria-hidden
                    className={cn(
                      "relative flex h-5 w-5 shrink-0 items-center justify-center",
                      "transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
                      isSelected
                        ? "translate-x-0 opacity-100"
                        : "translate-x-1 opacity-0",
                    )}
                    style={{ color: meta.color }}
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      className="h-4 w-4"
                      aria-hidden
                    >
                      <path
                        d="M5.2 10.2 8.4 13.4 14.9 6.9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </motion.button>
              </li>
            );
          })}
        </ul>
        </div>
      </div>
    </motion.article>
  );
}
