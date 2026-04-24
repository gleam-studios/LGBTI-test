"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import {
  AlertCircle,
  Camera,
  Check,
  Coffee,
  Download,
  Loader2,
  MessageCircle,
  Send,
  Share2,
} from "lucide-react";

interface Props {
  code: string;
  title: string;
  locale: string;
  shareUrl: string;
  /**
   * hero：Ko-fi + 彩虹图标行（保存图片、X、Telegram、Instagram）。
   * default：横向胶囊换行，用于全宽区。
   */
  variant?: "default" | "hero";
}

type DownloadState = "idle" | "loading" | "ok" | "err";

const KOFI_URL = "https://ko-fi.com/lgbtitest";

export function ShareSheet({
  code,
  title,
  locale,
  shareUrl,
  variant = "default",
}: Props) {
  const t = useTranslations("result.share");
  const tResult = useTranslations("result");
  const rainbowId = `re-rainbow-${React.useId().replace(/[:]/g, "")}`;
  const [downloadState, setDownloadState] = React.useState<DownloadState>("idle");

  const filename = `rainbow-elevator-${code}-${locale}.png`;

  const caption =
    locale === "zh"
      ? `我的彩虹电梯类型是 ${code} · ${title}。来测测你是什么型？`
      : `My Rainbow Elevator type: ${code} · ${title}. What's yours?`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${caption} ${shareUrl}`);
    } catch {
      // noop
    }
  };

  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}&url=${encodeURIComponent(shareUrl)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(caption)}`;

  const shareNative = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await (navigator as Navigator).share({
          title,
          text: caption,
          url: shareUrl,
        });
      } catch {
        // user cancelled
      }
    } else {
      copy();
    }
  };

  const resolveCssVar = (name: string, fallback: string) => {
    if (typeof window === "undefined") return fallback;
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
    return raw || fallback;
  };

  /** 截图前等 <img> 解码，避免 toPng 时人格图未就绪；部分线上网络略慢时尤其明显 */
  const ensureCaptureImagesReady = async (root: Element) => {
    const imgs = Array.from(root.querySelectorAll("img"));
    await Promise.all(
      imgs.map((img) => {
        const ready = img.complete
          ? Promise.resolve()
          : new Promise<void>((r) => {
              img.addEventListener("load", () => r(), { once: true });
              img.addEventListener("error", () => r(), { once: true });
              window.setTimeout(() => r(), 4_000);
            });
        return ready.then(() => {
          if (img.decode) {
            return img.decode().catch(() => undefined);
          }
        });
      }),
    );
  };

  /**
   * WebKit / Safari 下 html-to-image 在 clone 后对 img 的 fetch+内联常失败，导出图里人物为空白；Chrome 正常。
   * 将同源图先预转成 data:，让库走 isDataUrl 跳过重抓；截图后还原 src。
   */
  const inlineSameOriginImgsToDataUrl = async (
    root: HTMLElement,
  ): Promise<() => void> => {
    const undos: Array<() => void> = [];
    for (const el of Array.from(root.querySelectorAll<HTMLImageElement>("img"))) {
      const href = (el.currentSrc || el.getAttribute("src") || "").trim();
      if (!href || href.startsWith("data:")) continue;
      let url: URL;
      try {
        url = new URL(href, location.href);
      } catch {
        continue;
      }
      if (url.origin !== location.origin) continue;
      try {
        const res = await fetch(url.toString(), {
          mode: "same-origin",
          credentials: "same-origin",
          cache: "force-cache",
        });
        if (!res.ok) continue;
        const blob = await res.blob();
        const data = await new Promise<string>((resolve, reject) => {
          const fr = new FileReader();
          fr.onloadend = () => {
            if (typeof fr.result === "string") resolve(fr.result);
            else reject(new Error("readAsDataURL"));
          };
          fr.onerror = () => reject(new Error("FileReader"));
          fr.readAsDataURL(blob);
        });
        const srcAttr = el.getAttribute("src");
        const srcsetAttr = el.getAttribute("srcset");
        if (srcsetAttr) el.removeAttribute("srcset");
        el.setAttribute("src", data);
        undos.push(() => {
          if (srcsetAttr) el.setAttribute("srcset", srcsetAttr);
          else el.removeAttribute("srcset");
          if (srcAttr) el.setAttribute("src", srcAttr);
          else el.removeAttribute("src");
        });
      } catch {
        // 保留原图
      }
    }
    if (undos.length === 0) {
      return () => undefined;
    }
    return () => {
      for (const u of undos) u();
    };
  };

  const downloadPageAsImage = async () => {
    const target = document.getElementById("result-capture");
    if (!target) throw new Error("no capture target");

    const { toPng } = await import("html-to-image");

    const bg = resolveCssVar("--bg", "#ffffff");

    const rect = target.getBoundingClientRect();
    const padX = 36;
    const padY = 32;
    const width = Math.ceil(rect.width) + padX * 2;
    const height = Math.ceil(rect.height) + padY * 2;

    await ensureCaptureImagesReady(target);
    const restoreInlined = await inlineSameOriginImgsToDataUrl(target);
    await ensureCaptureImagesReady(target);

    const ua = window.navigator.userAgent;
    // Chromium 系 UA 常带 `Safari/` 兼容串；仅对真 Safari / iOS 网页视图略过字体内嵌
    const skipFontsForWebKit =
      /iPhone|iPad|iPod/i.test(ua) ||
      (/\bSafari\//.test(ua) &&
        !/\b(Chrome|Chromium|CriOS|FxiOS|EdgA|Edg)\//.test(ua));

    let dataUrl: string;
    try {
      dataUrl = await toPng(target, {
        pixelRatio: 2,
        // 勿开 cacheBust：会对 /public 静态图追加 ?t= 再 fetch；部分线上 CDN/静态
        // 对带 query 的 URL 返回 404，html-to-image 内联失败，导出图里人物等变空白
        cacheBust: false,
        // WebKit 下注入字体子流程易失败，略过可显著稳定 Safari 导出
        skipFonts: skipFontsForWebKit,
        backgroundColor: bg,
        width,
        height,
        canvasWidth: width,
        canvasHeight: height,
        style: {
          margin: "0",
          padding: `${padY}px ${padX}px`,
          boxSizing: "border-box",
          width: `${width}px`,
          minHeight: `${height}px`,
          background: bg,
        },
        filter: (node) => {
          if (!(node instanceof HTMLElement)) return true;
          if (node.hasAttribute("data-html2img-ignore")) return false;
          return true;
        },
      });
    } finally {
      try {
        restoreInlined();
      } catch {
        // noop
      }
    }

    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = filename;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const downloadPoster = async () => {
    setDownloadState("loading");
    try {
      await downloadPageAsImage();
      setDownloadState("ok");
      window.setTimeout(() => setDownloadState("idle"), 2_000);
      return;
    } catch {
      // fall through to OG fallback
    }

    const apiPath = `/api/og/${code}?lang=${encodeURIComponent(locale)}`;
    const fallbackUrl = `${apiPath}&download=1`;
    try {
      window.open(fallbackUrl, "_blank", "noopener,noreferrer");
    } catch {
      window.location.assign(fallbackUrl);
    }
    setDownloadState("err");
    window.setTimeout(() => setDownloadState("idle"), 4_000);
  };

  const isDlLoading = downloadState === "loading";
  const showDlError = downloadState === "err";

  const baseBtn =
    "inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--line)]/70 bg-transparent px-3.5 py-2 text-[12.5px] font-medium text-[color:var(--text)] transition-[background-color,color,border-color,transform] duration-200 hover:-translate-y-px hover:border-[color:var(--accent)]/40 hover:bg-[color:var(--panel)] hover:text-[color:var(--accent-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]";

  if (variant === "hero") {
    const rainbowRef = `url(#${rainbowId})`;
    const iconHit =
      "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border-0 bg-transparent p-0 shadow-none transition duration-200 hover:scale-110 active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent)]";
    return (
      <div className="flex w-full min-h-[200px] flex-col items-center justify-center gap-4 sm:min-h-[240px] sm:gap-5 lg:min-h-0">
        {/* 主 CTA：Ko-fi 小费 */}
        <a
          href={KOFI_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex rounded-full p-[1.5px] transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent)]"
          style={{
            backgroundImage:
              "linear-gradient(120deg, var(--r1), var(--r2), var(--r4), var(--r5), var(--r6))",
          }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-1.5 -z-10 rounded-full opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(120deg, var(--r1), var(--r4), var(--r6))",
            }}
          />
          <span className="relative inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--panel)] px-5 py-2.5 text-[13px] font-semibold tracking-wide text-[color:var(--text)] shadow-[var(--shadow-card)] transition-shadow duration-300 group-hover:shadow-[var(--shadow-float)]">
            <Coffee className="h-4 w-4 shrink-0 text-[color:var(--accent-strong)]" aria-hidden />
            {tResult("kofi")}
          </span>
        </a>

        {/* 彩虹图标行：保存结果、X、Telegram、Instagram */}
        <div
          className="flex max-w-full flex-row flex-wrap items-center justify-center gap-4 sm:gap-5"
          role="group"
          aria-label={locale === "zh" ? "保存与分享" : "Save and share"}
        >
          <svg
            className="pointer-events-none fixed h-0 w-0"
            width="0"
            height="0"
            aria-hidden
          >
            <defs>
              <linearGradient
                id={rainbowId}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0%" stopColor="var(--r1)" />
                <stop offset="20%" stopColor="var(--r2)" />
                <stop offset="45%" stopColor="var(--r4)" />
                <stop offset="70%" stopColor="var(--r5)" />
                <stop offset="100%" stopColor="var(--r6)" />
              </linearGradient>
            </defs>
          </svg>

          <button
            type="button"
            onClick={downloadPoster}
            disabled={isDlLoading}
            aria-busy={isDlLoading}
            className={iconHit}
            aria-label={
              isDlLoading
                ? t("downloadImageLoading")
                : downloadState === "ok"
                  ? t("downloadImageSuccess")
                  : t("downloadImage")
            }
            title={t("downloadImage")}
          >
            {isDlLoading ? (
              <Loader2
                className="h-5 w-5 animate-spin text-[color:var(--accent-strong)]"
                aria-hidden
              />
            ) : downloadState === "ok" ? (
              <Check
                className="h-5 w-5"
                stroke={rainbowRef}
                fill="none"
                strokeWidth={2.25}
                aria-hidden
              />
            ) : (
              <Download
                className="h-5 w-5"
                stroke={rainbowRef}
                fill="none"
                strokeWidth={2.25}
                aria-hidden
              />
            )}
          </button>

          <a
            href={xUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={iconHit}
            aria-label={t("x")}
            title={t("x")}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill={rainbowRef}
              aria-hidden
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={iconHit}
            aria-label={t("telegram")}
            title={t("telegram")}
          >
            <Send
              className="h-5 w-5"
              stroke={rainbowRef}
              fill="none"
              strokeWidth={2.25}
              aria-hidden
            />
          </a>

          <button
            type="button"
            className={iconHit}
            aria-label={t("instagram")}
            title={t("instagramHint")}
            onClick={async () => {
              await copy();
              if (typeof window === "undefined") return;
              window.open(
                "https://www.instagram.com/",
                "_blank",
                "noopener,noreferrer",
              );
            }}
          >
            <Camera
              className="h-5 w-5"
              stroke={rainbowRef}
              fill="none"
              strokeWidth={2.25}
              aria-hidden
            />
          </button>
        </div>

        {showDlError ? (
          <p
            className="mt-0 flex max-w-[18rem] items-start gap-1.5 text-center text-[11px] italic leading-snug text-[color:var(--text-muted)]"
            role="status"
          >
            <AlertCircle
              className="mt-0.5 h-3 w-3 shrink-0 text-amber-500/90"
              aria-hidden
            />
            {t("downloadImageError")}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          onClick={shareNative}
          className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent-strong)] px-4 py-2 text-[12.5px] font-semibold text-white transition-[transform,background-color] duration-200 hover:-translate-y-px hover:bg-[color:var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
        >
          <Share2 className="h-3.5 w-3.5" />
          {locale === "zh" ? "一键分享" : "Share"}
        </button>

        <button
          type="button"
          onClick={downloadPoster}
          disabled={isDlLoading}
          aria-busy={isDlLoading}
          className={`${baseBtn} min-w-[2.75rem] px-3`}
          aria-label={t("downloadImage")}
          title={t("downloadImage")}
        >
          {isDlLoading ? (
            <Loader2 className="h-4 w-4 shrink-0 animate-spin text-[color:var(--accent-strong)]" aria-hidden />
          ) : downloadState === "ok" ? (
            <Check className="h-4 w-4 shrink-0 text-[color:var(--accent-strong)]" aria-hidden />
          ) : (
            <Download className="h-4 w-4 shrink-0" aria-hidden />
          )}
        </button>

        <a
          href={xUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={baseBtn}
        >
          <span
            aria-hidden
            className="inline-flex h-3.5 w-3.5 items-center justify-center text-[13px] font-bold leading-none"
          >
            𝕏
          </span>
          {t("x")}
        </a>

        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={baseBtn}
        >
          <MessageCircle className="h-3.5 w-3.5" />
          {t("telegram")}
        </a>

        <a href={KOFI_URL} target="_blank" rel="noopener noreferrer" className={baseBtn}>
          <Coffee className="h-3.5 w-3.5 text-[color:var(--accent-strong)]" aria-hidden />
          {tResult("kofi")}
        </a>
      </div>

      {showDlError ? (
        <p
          className="mt-3 flex items-start gap-2 text-[11.5px] italic text-[color:var(--text-muted)]"
          role="status"
        >
          <AlertCircle
            className="mt-0.5 h-3 w-3 shrink-0 text-amber-500/90"
            aria-hidden
          />
          {t("downloadImageError")}
        </p>
      ) : null}
    </div>
  );
}
