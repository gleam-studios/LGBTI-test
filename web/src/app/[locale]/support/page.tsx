import type { Metadata } from "next";
import { ExternalLink, HeartHandshake } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { IS_CN_SAFE } from "@/lib/variant";

export const metadata: Metadata = {
  title: "Support",
};

interface Resource {
  name: string;
  url: string;
  summary: string;
  region: "zh" | "en" | "global";
}

const RESOURCES_EN: Resource[] = [
  {
    name: "The Trevor Project",
    url: "https://www.thetrevorproject.org",
    summary:
      "24/7 crisis support for LGBTQ youth. Text, chat, and phone helplines in the US.",
    region: "en",
  },
  {
    name: "Trans Lifeline",
    url: "https://translifeline.org",
    summary: "Peer support hotline for trans and non-binary people in the US/Canada.",
    region: "en",
  },
  {
    name: "GLAAD Resource List",
    url: "https://glaad.org/resourcelist",
    summary: "Curated directory of LGBTQ+ community and support organizations.",
    region: "en",
  },
  {
    name: "PFLAG",
    url: "https://pflag.org",
    summary: "Support for LGBTQ+ people, their families, and allies across the US.",
    region: "en",
  },
  {
    name: "Switchboard LGBT+",
    url: "https://switchboard.lgbt",
    summary: "UK-based LGBT+ helpline offering listening support and information.",
    region: "en",
  },
  {
    name: "ILGA World",
    url: "https://ilga.org",
    summary: "Global federation of LGBTQ+ organizations with country-specific resources.",
    region: "global",
  },
];

const RESOURCES_ZH: Resource[] = [
  {
    name: "同语 Tongyu",
    url: "https://www.tongyulala.org",
    summary: "中国大陆女同志与双性恋/跨性别者的公益组织，提供社群资源与法律支持指引。",
    region: "zh",
  },
  {
    name: "北同文化 · Beijing LGBT Center",
    url: "https://bjlgbt.org",
    summary: "北京彩虹中心，提供心理咨询、社群活动与性别相关议题的研究资源。",
    region: "zh",
  },
  {
    name: "彩虹暴力终结所",
    url: "https://www.weibo.com/u/6443964919",
    summary: "关注 LGBTQ+ 亲密关系中暴力议题的公益项目，提供咨询与资源转介。",
    region: "zh",
  },
  {
    name: "GayChina 彩虹热线",
    url: "https://www.shlgbt.org/",
    summary: "上海女同/多元性别社群支持组织，提供活动与心理支持资源。",
    region: "zh",
  },
  {
    name: "同志亦凡人中文站",
    url: "https://www.tonfan.com/",
    summary: "长期运营的华语 LGBTQ+ 内容与社区平台。",
    region: "zh",
  },
];

export default async function SupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === "zh";
  // CN-safe variant keeps Chinese resources only (no links to overseas orgs).
  const resources = isZh
    ? IS_CN_SAFE
      ? RESOURCES_ZH
      : [...RESOURCES_ZH, ...RESOURCES_EN.filter((r) => r.region !== "en")]
    : RESOURCES_EN;

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="flex items-start gap-3">
        <HeartHandshake className="mt-1 h-6 w-6 text-[color:var(--accent-strong)]" />
        <div>
          <h1 className="font-display text-4xl font-semibold">
            {isZh ? "支持与资源" : "Support & resources"}
          </h1>
          <p className="mt-3 text-[color:var(--text-muted)]">
            {isZh
              ? "如果你正在经历身份困惑、出柜压力、歧视或暴力，你并不孤单。下面是一些可信的社群与心理支持资源。它们不替代专业咨询，但可以成为第一个求助的地方。"
              : "If you are navigating identity, coming-out pressure, discrimination, or violence — you are not alone. The resources below offer community and listening ears. They do not replace professional care, but they are a safe first step."}
          </p>
        </div>
      </div>

      <ul className="mt-10 space-y-3">
        {resources.map((r) => (
          <li
            key={r.name}
            className="rounded-[var(--radius-md)] border border-[color:var(--line)] bg-[color:var(--panel)] p-4 transition hover:shadow-[var(--shadow-card)]"
          >
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3"
            >
              <div className="flex-1">
                <div className="flex items-center gap-1.5 font-semibold">
                  {r.name}
                  <ExternalLink className="h-3.5 w-3.5 text-[color:var(--text-muted)] transition group-hover:text-[color:var(--accent-strong)]" />
                </div>
                <p className="mt-1 text-sm text-[color:var(--text-muted)]">
                  {r.summary}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>

      <aside className="mt-10 rounded-[var(--radius-md)] border border-dashed border-[color:var(--line)] bg-[color:var(--bg-soft)] p-5 text-sm text-[color:var(--text-muted)]">
        {isZh
          ? "如果你身边有人正在求助，不要评判，先倾听，再告诉 ta 这些资源。你的存在本身就是一种支持。🏳️‍🌈"
          : "If someone close to you is reaching out — don't judge, listen first, then share these resources. Your presence alone is support. 🏳️‍🌈"}
      </aside>
    </div>
  );
}
