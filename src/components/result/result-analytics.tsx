"use client";

import * as React from "react";
import { track } from "@/components/analytics";
import type { TypeCode } from "@/lib/types";

export function ResultAnalytics({
  code,
  locale,
}: {
  code: TypeCode;
  locale: string;
}) {
  React.useEffect(() => {
    const [genderExpression, attractionRange, desireType, relationship] =
      code.split("-");
    track("result_view", {
      result_code: code,
      locale,
      gender_expression: genderExpression,
      attraction_range: attractionRange,
      desire_type: desireType,
      relationship_structure: relationship,
    });
  }, [code, locale]);

  return null;
}
