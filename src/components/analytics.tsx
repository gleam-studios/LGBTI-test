"use client";

import * as React from "react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import posthog from "posthog-js";
import { GoogleAnalytics } from "@/components/google-analytics";

type AnalyticsProps = {
  /** 来自服务端 `GA_MEASUREMENT_ID` / `NEXT_PUBLIC_GA_MEASUREMENT_ID`，便于 Zeabur 仅配运行时变量 */
  gaMeasurementId?: string;
};

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

export function Analytics({ gaMeasurementId }: AnalyticsProps) {
  React.useEffect(() => {
    if (!POSTHOG_KEY) return;
    if (typeof window === "undefined") return;
    if (posthog.__loaded) return;
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      capture_pageview: true,
      capture_pageleave: true,
      person_profiles: "identified_only",
      autocapture: false,
    });
  }, []);
  return (
    <>
      <GoogleAnalytics measurementId={gaMeasurementId} />
      <VercelAnalytics />
    </>
  );
}

export function track(event: string, props?: Record<string, unknown>) {
  try {
    if (typeof window === "undefined") return;
    if (!POSTHOG_KEY || !posthog.__loaded) return;
    posthog.capture(event, props);
  } catch {
    // best-effort
  }
}
