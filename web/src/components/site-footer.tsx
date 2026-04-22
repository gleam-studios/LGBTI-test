import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function SiteFooter({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const dot = (
    <span className="select-none text-[color:var(--line)]" aria-hidden>
      ·
    </span>
  );
  const linkClass =
    "underline-offset-2 transition hover:text-[color:var(--accent-strong)] hover:underline";

  return (
    <footer className="w-full shrink-0 border-t border-[color:var(--line)]/70 bg-[color:var(--panel)]">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-3 sm:px-10 sm:py-3.5 lg:px-16">
        <div className="flex flex-col gap-3 md:grid md:grid-cols-3 md:items-center md:gap-x-6">
          <p className="order-1 text-center text-[11px] font-normal leading-snug text-[color:var(--text-muted)] md:order-none md:col-start-2 md:row-start-1 md:px-2">
            {t("disclaimer")}
          </p>

          <div className="order-2 flex items-start justify-between gap-4 md:contents">
            <div className="min-w-0 text-left text-[11px] font-normal leading-snug text-[color:var(--text-muted)] md:col-start-1 md:row-start-1 md:self-center">
              <span className="rainbow-text">{t("madeWith")}</span>
            </div>
            <nav
              className="flex shrink-0 flex-wrap items-center justify-end gap-x-1.5 text-[11px] font-normal leading-snug text-[color:var(--text-muted)] md:col-start-3 md:row-start-1 md:justify-self-end"
              aria-label={locale === "zh" ? "页脚链接" : "Footer links"}
            >
              <Link href="/about" className={linkClass}>
                {t("about")}
              </Link>
              {dot}
              <Link href="/support" className={linkClass}>
                {t("support")}
              </Link>
              {dot}
              <Link href="/privacy" className={linkClass}>
                {t("privacy")}
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
