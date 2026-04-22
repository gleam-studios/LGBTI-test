import { QUESTIONS } from "./questions";
import type { AnswerMap } from "./scoring";

/**
 * Encode/decode an AnswerMap into a compact URL-safe string.
 *
 * Each question stores a value in {1,2,3}. We represent the sequence as a
 * base-4 string (0 = unanswered, 1-3 = answered) of QUESTIONS.length digits,
 * pack two digits per byte, then base64url encode. Keeping things positional
 * means the URL is stable across refreshes and random shuffles of the UI.
 */

const MAP: Record<number, 1 | 2 | 3 | 0> = { 0: 0, 1: 1, 2: 2, 3: 3 };

export function encodeAnswers(answers: AnswerMap): string {
  const digits: number[] = QUESTIONS.map((q) => {
    const v = answers[q.id];
    return v === 1 || v === 2 || v === 3 ? v : 0;
  });

  const bytes: number[] = [];
  for (let i = 0; i < digits.length; i += 4) {
    // 4 base-4 digits = 1 byte (8 bits)
    const a = digits[i] ?? 0;
    const b = digits[i + 1] ?? 0;
    const c = digits[i + 2] ?? 0;
    const d = digits[i + 3] ?? 0;
    bytes.push((a << 6) | (b << 4) | (c << 2) | d);
  }
  return base64UrlEncode(new Uint8Array(bytes));
}

export function decodeAnswers(str: string): AnswerMap {
  if (!str) return {};
  let bytes: Uint8Array;
  try {
    bytes = base64UrlDecode(str);
  } catch {
    return {};
  }

  const digits: number[] = [];
  for (const byte of bytes) {
    digits.push((byte >> 6) & 0b11);
    digits.push((byte >> 4) & 0b11);
    digits.push((byte >> 2) & 0b11);
    digits.push(byte & 0b11);
  }

  const map: AnswerMap = {};
  QUESTIONS.forEach((q, i) => {
    const d = MAP[digits[i] ?? 0];
    if (d === 1 || d === 2 || d === 3) map[q.id] = d;
  });
  return map;
}

function base64UrlEncode(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  const b64 =
    typeof btoa === "function"
      ? btoa(bin)
      : Buffer.from(bin, "binary").toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(str: string): Uint8Array {
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
  const bin =
    typeof atob === "function"
      ? atob(b64 + pad)
      : Buffer.from(b64 + pad, "base64").toString("binary");
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}
