"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { QUESTIONS } from "@/lib/questions";
import type { Dimension } from "@/lib/dimensions";
import { decodeAnswers, encodeAnswers } from "@/lib/codec";
import type { AnswerMap } from "@/lib/scoring";
import { scoreAnswers } from "@/lib/scoring";
import { RainbowProgress } from "./rainbow-progress";
import { QuestionCard } from "./question-card";

const STORAGE_KEY = "re.answers.v1";

interface Props {
  locale: string;
}

function readInitialAnswers(): AnswerMap {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get("a");
  if (fromUrl) return decodeAnswers(fromUrl);
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw) as AnswerMap;
    } catch {
      return {};
    }
  }
  return {};
}

export function TestRunner({ locale }: Props) {
  const t = useTranslations("test");
  const router = useRouter();

  const dimensionMap = React.useMemo<Dimension[]>(
    () => QUESTIONS.map((q) => q.dim),
    [],
  );

  const [answers, setAnswers] = React.useState<AnswerMap>({});
  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState<1 | -1>(1);
  const [showResumed, setShowResumed] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    // 从结果页「重新测试」进入：清空答案与存储，从第 1 题开始（不能仅靠 /test，否则会读 localStorage）
    if (params.get("restart") === "1") {
      window.localStorage.removeItem(STORAGE_KEY);
      const url = new URL(window.location.href);
      url.searchParams.delete("restart");
      url.searchParams.delete("a");
      const q = url.searchParams.toString();
      window.history.replaceState(
        null,
        "",
        `${url.pathname}${q ? `?${q}` : ""}${url.hash}`,
      );
      setAnswers({});
      setIndex(0);
      setDirection(1);
      setShowResumed(false);
      return;
    }

    const initial = readInitialAnswers();
    const hasAny = Object.keys(initial).length > 0;
    if (hasAny) {
      setAnswers(initial);
      const nextUnanswered = QUESTIONS.findIndex((q) => !(q.id in initial));
      setIndex(nextUnanswered === -1 ? QUESTIONS.length - 1 : nextUnanswered);
      setShowResumed(true);
    }
  }, []);

  const total = QUESTIONS.length;
  const current = QUESTIONS[index];
  const selectedValue = answers[current.id];
  const answeredFlags = React.useMemo(
    () => QUESTIONS.map((q) => q.id in answers),
    [answers],
  );
  const answeredCount = answeredFlags.filter(Boolean).length;
  const allAnswered = answeredCount === total;

  // Sync answers to URL query (?a=...) and localStorage.
  const syncUrl = React.useCallback(
    (next: AnswerMap) => {
      if (typeof window === "undefined") return;
      const enc = encodeAnswers(next);
      const url = new URL(window.location.href);
      if (enc) url.searchParams.set("a", enc);
      else url.searchParams.delete("a");
      window.history.replaceState(null, "", url.toString());
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    },
    [],
  );

  const goTo = React.useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(total - 1, next));
      setDirection(clamped >= index ? 1 : -1);
      setIndex(clamped);
      setShowResumed(false);
    },
    [index, total],
  );

  const handleSelect = React.useCallback(
    (value: 1 | 2 | 3) => {
      setAnswers((prev) => {
        const next = { ...prev, [current.id]: value };
        syncUrl(next);
        return next;
      });
      // auto-advance unless already at the end
      if (index < total - 1) {
        // Use functional state update to avoid stale closure on `index`
        window.setTimeout(() => {
          setIndex((prev) => {
            const next = Math.min(prev + 1, total - 1);
            setDirection(next >= prev ? 1 : -1);
            return next;
          });
          setShowResumed(false);
        }, 175);
      }
    },
    [current.id, index, syncUrl, total],
  );

  const handleRestart = React.useCallback(() => {
    setAnswers({});
    syncUrl({});
    setIndex(0);
    setDirection(1);
    setShowResumed(false);
  }, [syncUrl]);

  const handleSubmit = React.useCallback(() => {
    const result = scoreAnswers(answers);
    router.push(`/result/${result.code}`);
  }, [answers, router]);

  // Keyboard shortcuts: 1/2/3 select, arrow keys navigate, Enter submits.
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (
        e.target instanceof HTMLElement &&
        ["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)
      )
        return;
      if (e.key === "1") handleSelect(1);
      else if (e.key === "2") handleSelect(2);
      else if (e.key === "3") handleSelect(3);
      else if (e.key === "ArrowLeft") goTo(index - 1);
      else if (e.key === "ArrowRight") goTo(index + 1);
      else if (e.key === "Enter" && allAnswered) handleSubmit();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [allAnswered, goTo, handleSelect, handleSubmit, index]);

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-[1400px] flex-1 flex-col px-6 py-3 sm:px-10 sm:py-4 lg:px-16">
      <div className="mb-3 shrink-0 sm:mb-4">
        <RainbowProgress
          total={total}
          currentIndex={index + 1}
          dimensionMap={dimensionMap}
          answered={answeredFlags}
        />
      </div>

      {showResumed ? (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex shrink-0 items-center justify-between gap-3 rounded-[var(--radius-md)] border border-[color:var(--line)] bg-[color:var(--bg-soft)] px-4 py-3 text-xs text-[color:var(--text-muted)] sm:mb-5"
        >
          <span>{t("resuming")}</span>
          <button
            type="button"
            onClick={handleRestart}
            className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[color:var(--accent-strong)] hover:bg-[color:var(--panel)]"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            {t("restart")}
          </button>
        </motion.div>
      ) : null}

      {/* flex-1 + scroll: bottom nav fixed; my-auto on inner centers short cards vertically. */}
      <div className="flex min-h-0 w-full flex-1 flex-col">
        <div className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto overflow-x-hidden overscroll-behavior-y-contain [-webkit-overflow-scrolling:touch] py-4 sm:py-5">
          {/* 适度留白即可；过大 py 会把底部操作栏顶出视口 */}
          <div className="my-auto w-full py-0.5 sm:py-1">
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              <QuestionCard
                key={current.id}
                question={current}
                locale={locale}
                index={index + 1}
                total={total}
                direction={direction}
                selected={selectedValue}
                onSelect={handleSelect}
              />
            </AnimatePresence>
          </div>
        </div>

        <div className="shrink-0 pt-3 pb-[max(0.25rem,env(safe-area-inset-bottom))] sm:pt-4">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => goTo(index - 1)}
                  disabled={index === 0}
                  className="inline-flex items-center gap-1 rounded-full border border-[color:var(--line)]/80 bg-[color:var(--panel)]/70 px-3 py-1.5 text-[13px] text-[color:var(--text-muted)] transition hover:text-[color:var(--accent-strong)] disabled:opacity-40 disabled:hover:text-[color:var(--text-muted)]"
                >
                  <ArrowLeft className="h-3 w-3" />
                  {t("back")}
                </button>
                <button
                  type="button"
                  onClick={() => goTo(index + 1)}
                  disabled={index >= total - 1}
                  className="inline-flex items-center gap-1 rounded-full border border-[color:var(--line)]/80 bg-[color:var(--panel)]/70 px-3 py-1.5 text-[13px] text-[color:var(--text-muted)] transition hover:text-[color:var(--accent-strong)] disabled:opacity-40 disabled:hover:text-[color:var(--text-muted)]"
                >
                  {t("skip")}
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!allAnswered}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[color:var(--accent-strong)] px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              >
                <Check className="h-3.5 w-3.5" />
                {t("submit")}
              </button>
            </div>
            <p className="text-center text-[11px] leading-snug text-[color:var(--text-muted)]">
              {allAnswered ? t("hintDone") : t("optionHint")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
