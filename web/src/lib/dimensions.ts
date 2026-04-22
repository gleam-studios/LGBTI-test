export const DIMENSIONS = ["CR", "OM", "SA", "GP"] as const;
export type Dimension = (typeof DIMENSIONS)[number];

export type DimensionLetter = "C" | "R" | "O" | "M" | "S" | "A" | "G" | "P";

export const DIMENSION_META: Record<
  Dimension,
  {
    zh: string;
    en: string;
    emoji: string;
    leftLetter: DimensionLetter;
    rightLetter: DimensionLetter;
    leftLabel: { zh: string; en: string };
    rightLabel: { zh: string; en: string };
    color: string;
  }
> = {
  CR: {
    zh: "性别表达方式",
    en: "Gender Expression",
    emoji: "🪞",
    leftLetter: "C",
    rightLetter: "R",
    leftLabel: { zh: "规范", en: "Conforming" },
    rightLabel: { zh: "出格", en: "Rebel" },
    color: "var(--r1)",
  },
  OM: {
    zh: "吸引性别范围",
    en: "Attraction Range",
    emoji: "🧲",
    leftLetter: "O",
    rightLetter: "M",
    leftLabel: { zh: "单一", en: "One gender" },
    rightLabel: { zh: "多元", en: "Multi gender" },
    color: "var(--r2)",
  },
  SA: {
    zh: "欲望类型",
    en: "Desire Type",
    emoji: "🔥",
    leftLetter: "S",
    rightLetter: "A",
    leftLabel: { zh: "性向强", en: "Sexual" },
    rightLabel: { zh: "无性谱系", en: "Asexual" },
    color: "var(--r4)",
  },
  GP: {
    zh: "关系结构",
    en: "Relationship Structure",
    emoji: "💞",
    leftLetter: "G",
    rightLetter: "P",
    leftLabel: { zh: "单偶", en: "Monogamous" },
    rightLabel: { zh: "多元", en: "Polyamorous" },
    color: "var(--r5)",
  },
};
