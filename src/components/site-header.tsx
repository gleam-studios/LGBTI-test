import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";

export async function SiteHeader({ locale }: { locale: string }) {
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tMeta = await getTranslations({ locale, namespace: "metadata" });
  const siteTitle = tMeta("title");
  return (
    <header className="relative z-40 w-full shrink-0">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 pb-2 pt-4 sm:px-10 lg:px-16">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-display text-lg tracking-tight"
          aria-label={siteTitle}
        >
          <span
            className="inline-block h-3 w-3 rounded-full rainbow-bar"
            aria-hidden
          />
          <span className="rainbow-text font-semibold">{siteTitle}</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Link
            href="/about"
            className="hidden rounded-full px-3 py-1.5 text-sm text-[color:var(--text-muted)] transition hover:text-[color:var(--accent-strong)] sm:inline-flex"
          >
            {tNav("about")}
          </Link>
          <LanguageToggle />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
