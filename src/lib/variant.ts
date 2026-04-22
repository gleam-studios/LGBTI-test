/**
 * Regional content variant switch.
 *
 * - `default`: full uncensored copy (used on overseas Vercel deploy)
 * - `cn-safe`: softer phrasing, no direct reference to banned topics.
 *
 * Controlled by `NEXT_PUBLIC_VARIANT`. Evaluated at build time.
 */
export const VARIANT: "default" | "cn-safe" =
  process.env.NEXT_PUBLIC_VARIANT === "cn-safe" ? "cn-safe" : "default";

export const IS_CN_SAFE = VARIANT === "cn-safe";
