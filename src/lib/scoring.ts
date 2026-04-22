import { DIMENSION_META, DIMENSIONS, type Dimension } from "./dimensions";
import { QUESTIONS, type Question } from "./questions";
import type { TypeCode } from "./types";

export type AnswerMap = Record<string, 1 | 2 | 3>;

export interface DimensionResult {
  dim: Dimension;
  letter: string;
  sum: number;
  count: number;
  /** Average on the 1-3 scale */
  average: number;
  /** Position 0..100 along the left->right axis */
  percent: number;
}

export interface ScoreResult {
  code: TypeCode;
  letters: Record<Dimension, string>;
  dims: Record<Dimension, DimensionResult>;
  totalQuestions: number;
  answeredQuestions: number;
}

/**
 * Threshold: average < 2.1 -> left letter, else right letter.
 * Matches the original HTML behaviour so existing users see stable results.
 */
const THRESHOLD = 2.1;

export function scoreAnswers(answers: AnswerMap): ScoreResult {
  const sums: Record<Dimension, number> = { CR: 0, OM: 0, SA: 0, GP: 0 };
  const counts: Record<Dimension, number> = { CR: 0, OM: 0, SA: 0, GP: 0 };

  let answered = 0;
  for (const q of QUESTIONS) {
    const v = answers[q.id];
    if (v === 1 || v === 2 || v === 3) {
      sums[q.dim] += v;
      counts[q.dim] += 1;
      answered += 1;
    }
  }

  const letters = {} as Record<Dimension, string>;
  const dims = {} as Record<Dimension, DimensionResult>;

  for (const dim of DIMENSIONS) {
    const count = counts[dim] || 1;
    const avg = sums[dim] / count;
    const meta = DIMENSION_META[dim];
    const letter = avg < THRESHOLD ? meta.leftLetter : meta.rightLetter;
    letters[dim] = letter;
    dims[dim] = {
      dim,
      letter,
      sum: sums[dim],
      count: counts[dim],
      average: avg,
      percent: Math.max(
        0,
        Math.min(100, Math.round(((avg - 1) / 2) * 100)),
      ),
    };
  }

  const code = `${letters.CR}-${letters.OM}-${letters.SA}-${letters.GP}` as TypeCode;

  return {
    code,
    letters,
    dims,
    totalQuestions: QUESTIONS.length,
    answeredQuestions: answered,
  };
}

export function groupQuestionsByDimension(): Record<Dimension, Question[]> {
  const groups = { CR: [], OM: [], SA: [], GP: [] } as Record<Dimension, Question[]>;
  for (const q of QUESTIONS) groups[q.dim].push(q);
  return groups;
}

/**
 * Hamming-like distance between two type codes on the four-dimension grid.
 * Used to suggest "closest kin" on the result page.
 */
export function codeDistance(a: TypeCode, b: TypeCode): number {
  const la = a.split("-");
  const lb = b.split("-");
  let d = 0;
  for (let i = 0; i < 4; i++) if (la[i] !== lb[i]) d += 1;
  return d;
}
