"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

declare global {
  interface Window {
    adsbygoogle: { push: (arg: Record<string, never>) => void } & unknown[];
  }
}

const AD_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const AD_SLOT_RESULT = process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT;

/**
 * 结果页底部全宽广告位。
 * - 配置 `NEXT_PUBLIC_ADSENSE_CLIENT` + `NEXT_PUBLIC_ADSENSE_SLOT_RESULT` 后注入 AdSense 自适应单元。
 * - 未配置时：生产环境不渲染；开发环境显示虚线占位便于对齐。
 */
export function ResultBottomAd() {
  const t = useTranslations("result");
  const insRef = React.useRef<HTMLModElement>(null);
  const [scriptReady, setScriptReady] = React.useState(false);
  const [pushed, setPushed] = React.useState(false);

  const hasAdsense = Boolean(AD_CLIENT && AD_SLOT_RESULT);
  const showDevPlaceholder =
    !hasAdsense && process.env.NODE_ENV === "development";

  /** 广告脚本由 `layout.tsx` 全站只加载一次；此处等待就绪后再 push 单元 */
  React.useEffect(() => {
    if (!hasAdsense) return;
    if (typeof window === "undefined") return;
    if (window.adsbygoogle) {
      setScriptReady(true);
      return;
    }
    const el = document.getElementById("adsense-global") as HTMLScriptElement | null;
    const onLoad = () => setScriptReady(true);
    if (el) {
      el.addEventListener("load", onLoad, { once: true });
      if (el.complete) setScriptReady(true);
      return () => el.removeEventListener("load", onLoad);
    }
    const t = window.setInterval(() => {
      if (window.adsbygoogle) {
        setScriptReady(true);
        window.clearInterval(t);
      }
    }, 80);
    const stop = window.setTimeout(() => window.clearInterval(t), 12_000);
    return () => {
      window.clearInterval(t);
      window.clearTimeout(stop);
    };
  }, [hasAdsense]);

  React.useEffect(() => {
    if (!hasAdsense || !scriptReady || !insRef.current || pushed) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      setPushed(true);
    } catch {
      // 广告脚本未就绪或屏蔽插件时静默失败
    }
  }, [hasAdsense, scriptReady, pushed]);

  if (!hasAdsense && !showDevPlaceholder) {
    return null;
  }

  return (
    <section
      className="mt-6 w-full border-t border-[color:var(--line)]/50 pt-8 sm:mt-8"
      aria-labelledby="result-ad-heading"
    >
      <div className="flex items-center gap-3 text-[10.5px] font-medium uppercase tracking-[0.32em] text-[color:var(--text-muted)] sm:text-[11px]">
        <span id="result-ad-heading">{t("adLabel")}</span>
        <span
          aria-hidden
          className="h-px flex-1 bg-gradient-to-r from-[color:var(--line)] to-transparent"
        />
      </div>

      <div className="mt-4 w-full min-w-0">
        {hasAdsense ? (
          <ins
            ref={insRef}
            className="adsbygoogle block w-full min-h-[100px] overflow-hidden"
            style={{ display: "block" }}
            data-ad-client={AD_CLIENT}
            data-ad-slot={AD_SLOT_RESULT!}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : (
          <div
            className="flex min-h-[120px] w-full max-w-3xl flex-col items-center justify-center gap-1 rounded-[var(--radius-md)] border border-dashed border-[color:var(--line)]/80 bg-[color:var(--bg-soft)]/50 px-4 py-6 text-center"
            role="status"
            aria-label={t("adDevPlaceholder")}
          >
            <span className="text-[12px] text-[color:var(--text-muted)]">
              {t("adDevPlaceholder")}
            </span>
            <span className="font-mono text-[10px] text-[color:var(--text-muted)]/70">
              NEXT_PUBLIC_ADSENSE_CLIENT + NEXT_PUBLIC_ADSENSE_SLOT_RESULT
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
