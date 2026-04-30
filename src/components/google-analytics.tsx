"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const DEFAULT_MEASUREMENT_ID = "G-7SG0K6MZ0S";

function resolveMeasurementId(fromServer?: string | null) {
  const s = fromServer?.trim();
  if (s) return s;
  return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || DEFAULT_MEASUREMENT_ID;
}

function GaPageView({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const q = searchParams?.toString();
    const pagePath = q ? `${pathname}?${q}` : pathname;
    window.gtag?.("config", measurementId, { page_path: pagePath });
  }, [pathname, searchParams, measurementId]);

  return null;
}

type GoogleAnalyticsProps = {
  /** 服务端注入（如 Zeabur 的 `GA_MEASUREMENT_ID`），构建时不必内联 NEXT_PUBLIC */
  measurementId?: string | null;
};

/**
 * GA4：优先用服务端传入的 `measurementId`；否则用 `NEXT_PUBLIC_GA_MEASUREMENT_ID`（本地/构建时）。
 */
export function GoogleAnalytics({ measurementId: measurementIdProp }: GoogleAnalyticsProps) {
  const measurementId = resolveMeasurementId(measurementIdProp);
  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${measurementId}', { send_page_view: false });
        `}
      </Script>
      <Suspense fallback={null}>
        <GaPageView measurementId={measurementId} />
      </Suspense>
    </>
  );
}
