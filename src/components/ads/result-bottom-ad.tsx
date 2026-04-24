"use client";

import { ResultAdSlot } from "./result-ad-slot";

const AD_SLOT_RESULT = process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT;

/** 结果页最底部全宽广告位 */
export function ResultBottomAd() {
  return <ResultAdSlot adSlot={AD_SLOT_RESULT} placement="bottom" />;
}
