"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const nextLocale = locale === "zh" ? "en" : "zh";
  const label = locale === "zh" ? "EN" : "中";

  return (
    <button
      type="button"
      aria-label={`Switch to ${nextLocale}`}
      onClick={() =>
        router.replace(pathname, {
          locale: nextLocale as "zh" | "en",
          scroll: false,
        })
      }
      className="inline-flex items-center justify-center rounded-full px-3 py-1.5 text-sm text-[color:var(--text-muted)] transition hover:text-[color:var(--accent-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
    >
      {label}
    </button>
  );
}
