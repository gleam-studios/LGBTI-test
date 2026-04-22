import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { DIMENSIONS, DIMENSION_META } from "@/lib/dimensions";
import { QUESTION_COUNT } from "@/lib/questions";
import { TYPE_CODES } from "@/lib/types";

export const metadata: Metadata = {
  title: "About",
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === "zh";

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:px-8 sm:py-16">
      <h1 className="font-display text-4xl font-semibold">
        {isZh ? "关于这个测试" : "About this test"}
      </h1>
      <p className="mt-4 text-[color:var(--text-muted)]">
        {isZh
          ? `彩虹电梯测试是一个为 LGBTQ+ 社群和任何想探索自己在性别与关系光谱上位置的人设计的自我探索工具。${QUESTION_COUNT} 道题 · 4 个维度 · ${TYPE_CODES.length} 种可能的结果。`
          : `Rainbow Elevator is a self-exploration tool for the LGBTQ+ community and anyone curious about their position on the gender and relationship spectrum. ${QUESTION_COUNT} questions · 4 dimensions · ${TYPE_CODES.length} possible results.`}
      </p>

      <h2 className="font-display mt-10 text-2xl font-semibold">
        {isZh ? "四个维度" : "The four dimensions"}
      </h2>
      <ul className="mt-4 space-y-4">
        {DIMENSIONS.map((dim) => {
          const meta = DIMENSION_META[dim];
          return (
            <li
              key={dim}
              className="rounded-[var(--radius-md)] border border-[color:var(--line)] bg-[color:var(--panel)] p-4"
            >
              <div className="flex items-center gap-2">
                <span
                  className="font-mono text-xs font-bold"
                  style={{ color: meta.color }}
                >
                  {meta.leftLetter} · {meta.rightLetter}
                </span>
                <strong>{isZh ? meta.zh : meta.en}</strong>
              </div>
              <p className="mt-2 text-sm text-[color:var(--text-muted)]">
                {isZh
                  ? `光谱从 "${meta.leftLabel.zh}" 到 "${meta.rightLabel.zh}"。每个位置都合理，没有更好或更差。`
                  : `Spectrum from "${meta.leftLabel.en}" to "${meta.rightLabel.en}". All positions are valid. None is better.`}
              </p>
            </li>
          );
        })}
      </ul>

      <h2 className="font-display mt-10 text-2xl font-semibold">
        {isZh ? "方法论" : "Methodology"}
      </h2>
      <p className="mt-3 text-[color:var(--text-muted)]">
        {isZh
          ? "每个维度 10 题，每题 3 个选项（保守 / 中间 / 开放），用平均分判定落点。阈值设在 2.1：平均分 <2.1 取左字母，≥2.1 取右字母——同时保留原始百分比用于可视化。这不是一个严谨的心理测量工具，主要目的是自我探索与有趣的社交交流。"
          : "Each dimension has 10 questions with 3 options (conservative / middle / open). The threshold is 2.1 — averages below 2.1 get the left letter, above get the right. This is not a rigorous psychometric instrument; it's an entertainment and self-exploration tool."}
      </p>

      <h2 className="font-display mt-10 text-2xl font-semibold">
        {isZh ? "我们不做什么" : "What we don't do"}
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-[color:var(--text-muted)]">
        <li>
          {isZh
            ? "不收集个人身份信息。你的答案只保存在你自己的浏览器里，URL 会编码你的答案以便你保存或分享。"
            : "We do not collect personal identifying information. Your answers live in your browser; the URL encodes them so you can bookmark or share."}
        </li>
        <li>
          {isZh
            ? "不提供任何医学或心理学诊断。如果你在探索身份，建议寻找社群支持或专业心理咨询。"
            : "We provide no medical or psychological diagnosis. If you are exploring identity, reach out to community or professional support."}
        </li>
        <li>
          {isZh
            ? "不歧视、不嘲弄任何性别认同或关系结构——所有 16 种结果都是有尊严的。"
            : "We do not discriminate or mock any identity or relationship structure — all 16 results are presented with dignity."}
        </li>
      </ul>
    </div>
  );
}
