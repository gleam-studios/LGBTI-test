import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { TYPE_CODES } from "@/lib/types";
import { SITE_URL } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    base.push(
      { url: `${SITE_URL}/${locale}`, lastModified: now, priority: 1 },
      { url: `${SITE_URL}/${locale}/test`, lastModified: now, priority: 0.9 },
      { url: `${SITE_URL}/${locale}/about`, lastModified: now, priority: 0.5 },
      { url: `${SITE_URL}/${locale}/support`, lastModified: now, priority: 0.5 },
      { url: `${SITE_URL}/${locale}/privacy`, lastModified: now, priority: 0.3 },
    );
    for (const code of TYPE_CODES) {
      base.push({
        url: `${SITE_URL}/${locale}/result/${code}`,
        lastModified: now,
        priority: 0.7,
      });
    }
  }
  return base;
}
