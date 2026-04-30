import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Privacy",
};

export default async function PrivacyPage({
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
        {isZh ? "隐私政策" : "Privacy"}
      </h1>
      <p className="mt-4 text-[color:var(--text-muted)]">
        {isZh
          ? "这是一份简单、诚实、没有律师腔的隐私说明。最后更新：2026。"
          : "A plain-English privacy summary. Last updated: 2026."}
      </p>

      <div className="prose mt-8 space-y-6 text-[15px] leading-relaxed">
        <section>
          <h2 className="font-display text-xl font-semibold">
            {isZh ? "我们收集什么" : "What we collect"}
          </h2>
          <p className="mt-2 text-[color:var(--text-muted)]">
            {isZh
              ? "你的测试答案保存在你的浏览器本地存储里，以及以编码形式存在你的 URL 查询参数中。我们不会把它们发送到任何服务器。你随时可以清空浏览器或点「重新开始」。"
              : "Your answers live in your browser's local storage and as encoded query parameters in the URL. We never send them to a server. Clear your browser or tap \"Start over\" any time."}
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold">
            {isZh ? "分析工具" : "Analytics"}
          </h2>
          <p className="mt-2 text-[color:var(--text-muted)]">
            {isZh
              ? "如果环境变量配置了 Google Analytics（GA4）、PostHog 或 Vercel Analytics，我们会采集匿名访问与页面浏览等聚合数据，以便理解测试的完成率、哪些题导致跳出、分享行为等。我们不会识别个人身份；未配置对应变量时不加载对应脚本。"
              : "If Google Analytics (GA4), PostHog, or Vercel Analytics env keys are present, we load those tools to collect anonymous usage and page-view aggregates — completion rates, drop-off points, share interactions. No personal identification. Without the relevant env vars, those scripts are not loaded."}
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold">
            {isZh ? "分享链接" : "Share links"}
          </h2>
          <p className="mt-2 text-[color:var(--text-muted)]">
            {isZh
              ? "你的结果页 URL 包含一个 4 字母的人格代号（例如 R-M-A-P），不包含你的 IP、位置或身份信息。动态分享卡 /api/og/[code] 由服务器根据代号实时生成，不记录访问者数据。"
              : "Your result URL contains a 4-letter code (e.g. R-M-A-P) — no IP, location, or identity data. The dynamic OG image at /api/og/[code] is generated from the code alone and stores no visitor data."}
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold">
            {isZh ? "联系" : "Contact"}
          </h2>
          <p className="mt-2 text-[color:var(--text-muted)]">
            {isZh
              ? "如有疑问或请求删除数据（虽然我们本来就没有），请通过 hello@rainbow-elevator.app 联系我们。"
              : "Questions or deletion requests (of data we do not have) — hello@rainbow-elevator.app."}
          </p>
        </section>
      </div>
    </div>
  );
}
