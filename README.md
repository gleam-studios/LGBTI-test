# LGBTI Test (Next.js)

A bilingual (中文 / English) self-exploration test for the LGBTQ+ community.
4 dimensions · 40 questions · 16 possible persona types. All content is static;
the only dynamic endpoint is `/api/og/[code]` for share cards.

## Stack

- **Next.js 16** (App Router + Turbopack) + React 19 + TypeScript
- **Tailwind CSS v4** with design-tokens in `src/app/globals.css`
- **next-intl 4** for route-level i18n (`/zh`, `/en`)
- **Framer Motion** for question transitions & reveal animations
- **Zod** for question/type schema validation
- **next-themes** for dark mode
- **Vitest** for scoring / codec unit tests
- **@vercel/og** (Edge runtime) for dynamic share images
- **Vercel Analytics + PostHog** (optional) for funnel metrics

## Project layout

```
src/
  app/
    [locale]/
      layout.tsx         # html/body, theme, i18n, fonts, chrome
      page.tsx           # Intro
      test/page.tsx      # One-question-per-screen flow
      result/[code]/     # 32 prerendered persona pages (16 x 2)
      about/ support/ privacy/
    api/og/[code]/       # Dynamic 1200x630 share card (Edge)
    sitemap.ts robots.ts not-found.tsx
  components/
    intro/ test/ result/ figures/ seo/ analytics.tsx ...
  lib/
    questions.ts types.ts scoring.ts codec.ts dimensions.ts variant.ts utils.ts
  i18n/                  # routing.ts, request.ts, navigation.ts
messages/                # zh.json / en.json
tests/scoring.test.ts    # 11 unit tests — data, scoring, codec
```

## Scripts

```bash
pnpm dev          # local dev
pnpm build        # production build (typechecks + static export of 47 routes)
pnpm start        # start production server
pnpm test         # run Vitest suite
pnpm typecheck    # tsc --noEmit
pnpm lint
```

## Deployment

### Overseas (default): Vercel

```bash
vercel --prod
```

- Edge function for `/api/og/[code]` runs in Vercel Edge Network.
- `NEXT_PUBLIC_SITE_URL` is picked up automatically from the deployment URL if
  you leave it unset.

### Mainland China acceleration: Cloudflare Pages

- Deploy the same repo via Cloudflare Pages.
- If you need to strip dynamic OG and ship pure static HTML, replace the Edge
  route with a prerendered image and add `output: "export"` to `next.config.ts`.
- Set `NEXT_PUBLIC_VARIANT=cn-safe` to swap to the softer content variant and
  keep the support page pointed at domestic resources only.

## Environment variables

See `.env.example` for the complete list. All are optional except
`NEXT_PUBLIC_SITE_URL` (defaults to `https://rainbow-elevator.app`).
