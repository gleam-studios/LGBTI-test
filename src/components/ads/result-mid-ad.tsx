"use client";

import { ResultAdSlot } from "./result-ad-slot";

const AD_SLOT_MID = process.env.NEXT_PUBLIC_ADSENSE_SLOT_MID;

/** 结果页「简单解读」与「四维度分析」之间的全宽广告位 */
export function ResultMidAd() {
  return (
    <ResultAdSlot
      adSlot={AD_SLOT_MID}
      placement="mid"
      className="mt-8 sm:mt-9"
    />
  );
}
