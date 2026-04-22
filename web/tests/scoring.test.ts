import { describe, expect, it } from "vitest";
import { QUESTIONS } from "@/lib/questions";
import { codeDistance, scoreAnswers, type AnswerMap } from "@/lib/scoring";
import { TYPE_CODES, isTypeCode } from "@/lib/types";
import { decodeAnswers, encodeAnswers } from "@/lib/codec";

function answerAll(v: 1 | 2 | 3): AnswerMap {
  const a: AnswerMap = {};
  for (const q of QUESTIONS) a[q.id] = v;
  return a;
}

describe("scoring", () => {
  it("has 40 questions across 4 dimensions of 10", () => {
    expect(QUESTIONS.length).toBe(40);
    const byDim = QUESTIONS.reduce<Record<string, number>>((acc, q) => {
      acc[q.dim] = (acc[q.dim] ?? 0) + 1;
      return acc;
    }, {});
    expect(byDim.CR).toBe(10);
    expect(byDim.OM).toBe(10);
    expect(byDim.SA).toBe(10);
    expect(byDim.GP).toBe(10);
  });

  it("all 1s yields C-O-S-G", () => {
    const r = scoreAnswers(answerAll(1));
    expect(r.code).toBe("C-O-S-G");
    expect(r.answeredQuestions).toBe(40);
  });

  it("all 3s yields R-M-A-P", () => {
    const r = scoreAnswers(answerAll(3));
    expect(r.code).toBe("R-M-A-P");
  });

  it("all 2s stays just below the 2.1 threshold -> left letters", () => {
    const r = scoreAnswers(answerAll(2));
    expect(r.code).toBe("C-O-S-G");
    for (const dim of ["CR", "OM", "SA", "GP"] as const) {
      expect(r.dims[dim].average).toBe(2);
      expect(r.dims[dim].percent).toBe(50);
    }
  });

  it("an average above 2.1 flips to the right letter", () => {
    const a: AnswerMap = {};
    // 3 of 10 as value 1, rest as value 3 -> avg = 2.4 > threshold
    QUESTIONS.forEach((q, i) => {
      a[q.id] = i % 10 < 3 ? 1 : 3;
    });
    const r = scoreAnswers(a);
    expect(r.code).toBe("R-M-A-P");
  });

  it("produces a valid TypeCode for any answer pattern", () => {
    for (let trial = 0; trial < 50; trial++) {
      const a: AnswerMap = {};
      for (const q of QUESTIONS) {
        const v = ((trial + q.id.length) % 3) + 1;
        a[q.id] = v as 1 | 2 | 3;
      }
      const r = scoreAnswers(a);
      expect(isTypeCode(r.code)).toBe(true);
    }
  });

  it("exposes 16 unique persona codes", () => {
    expect(new Set(TYPE_CODES).size).toBe(16);
  });

  it("computes distance between codes", () => {
    expect(codeDistance("C-O-S-G", "C-O-S-G")).toBe(0);
    expect(codeDistance("C-O-S-G", "R-M-A-P")).toBe(4);
    expect(codeDistance("C-O-S-G", "C-O-S-P")).toBe(1);
  });
});

describe("codec", () => {
  it("round-trips an answer map", () => {
    const a: AnswerMap = {};
    for (let i = 0; i < QUESTIONS.length; i++) {
      a[QUESTIONS[i].id] = ((i % 3) + 1) as 1 | 2 | 3;
    }
    const enc = encodeAnswers(a);
    const dec = decodeAnswers(enc);
    expect(dec).toEqual(a);
  });

  it("empty encode decodes to empty map", () => {
    const enc = encodeAnswers({});
    const dec = decodeAnswers(enc);
    expect(dec).toEqual({});
  });

  it("decodes malformed input gracefully", () => {
    expect(decodeAnswers("!!!not-valid!!!")).toEqual({});
    expect(decodeAnswers("")).toEqual({});
  });
});
