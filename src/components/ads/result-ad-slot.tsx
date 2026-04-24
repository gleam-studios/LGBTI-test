"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

declare global {
  interface Window {
    adsbygoogle: { push: (arg: Record<string, never>) => void } & unknown[];
  }
}

const AD_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

type Placement = "mid" | "bottom";

/**
 * 结果页内某一格 AdSense：与 `layout` 里全局脚本配合；每个 slot 独立 `push`。
 * 请在 AdSense 为每位点各建一个广告单元（不同 slot id），勿复用同一 slot 多实例。
 */
export function ResultAdSlot({
  adSlot,
  placement,
  className,
}: {
  adSlot: string | undefined;
  placement: Placement;
  /** 追加在外层 section 上，如边距 */
  className?: string;
}) {
  const t = useTranslations("result");
  const insRef = React.useRef<HTMLModElement>(null);
  const [scriptReady, setScriptReady] = React.useState(false);
  const [pushed, setPushed] = React.useState(false);

  const hasAdsense = Boolean(AD_CLIENT && adSlot);
  const showDevPlaceholder =
    !hasAdsense && process.env.NODE_ENV === "development";

  const headingId =
    placement === "mid" ? "result-ad-mid-heading" : "result-ad-heading";

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
      const loaded = (el as unknown as { complete?: boolean }).complete;
      if (loaded) setScriptReady(true);
      return () => el.removeEventListener("load", onLoad);
    }
    const iv = window.setInterval(() => {
      if (window.adsbygoogle) {
        setScriptReady(true);
        window.clearInterval(iv);
      }
    }, 80);
    const stop = window.setTimeout(() => window.clearInterval(iv), 12_000);
    return () => {
      window.clearInterval(iv);
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

  const sectionBase =
    placement === "mid"
      ? "w-full border-t border-[color:var(--line)]/60 pt-8 sm:pt-9"
      : "mt-6 w-full border-t border-[color:var(--line)]/50 pt-8 sm:mt-8";

  const devHint =
    placement === "mid"
      ? "NEXT_PUBLIC_ADSENSE_CLIENT + NEXT_PUBLIC_ADSENSE_SLOT_MID"
      : "NEXT_PUBLIC_ADSENSE_CLIENT + NEXT_PUBLIC_ADSENSE_SLOT_RESULT";

  return (
    <section
      className={[sectionBase, className].filter(Boolean).join(" ")}
      aria-labelledby={headingId}
    >
      <div className="flex items-center gap-3 text-[10.5px] font-medium uppercase tracking-[0.32em] text-[color:var(--text-muted)] sm:text-[11px]">
        <span id={headingId}>{t("adLabel")}</span>
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
            data-ad-slot={adSlot!}
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
              {devHint}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
