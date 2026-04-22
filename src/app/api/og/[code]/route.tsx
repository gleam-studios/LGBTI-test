import { ImageResponse } from "next/og";
import { TYPES, isTypeCode } from "@/lib/types";

export const runtime = "edge";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;
  if (!isTypeCode(code)) {
    return new Response("Not found", { status: 404 });
  }
  const url = new URL(req.url);
  const lang = url.searchParams.get("lang") === "en" ? "en" : "zh";
  const p = TYPES[code];
  const name = lang === "zh" ? p.cn : p.en;
  const moto = lang === "zh" ? p.moto.zh : p.moto.en;
  const tagline =
    lang === "zh" ? "彩虹电梯测试 · Rainbow Elevator" : "Rainbow Elevator Test";

  const asDownload = url.searchParams.get("download") === "1";
  const filename = `rainbow-elevator-${code}-${lang}.png`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: `linear-gradient(135deg, ${p.hue.from}, ${p.hue.to})`,
          padding: "60px 72px",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              opacity: 0.85,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 14,
                height: 14,
                borderRadius: 14,
                background:
                  "linear-gradient(90deg,#ff6b6b,#ff9f43,#ffd93d,#6bcb77,#4d96ff,#c77dff)",
              }}
            />
            <span>{tagline}</span>
          </div>

          <div
            style={{
              marginTop: 34,
              fontSize: 120,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -2,
              display: "flex",
            }}
          >
            {code}
          </div>

          <div
            style={{
              marginTop: 18,
              fontSize: 56,
              fontWeight: 700,
              letterSpacing: -1,
              display: "flex",
            }}
          >
            {name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            lineHeight: 1.4,
            maxWidth: 920,
            opacity: 0.95,
            fontStyle: "italic",
          }}
        >
          &ldquo;{moto}&rdquo;
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            opacity: 0.8,
          }}
        >
          <span>rainbow-elevator.app</span>
          <span>
            {lang === "zh" ? "16 种结果，没一种正常。" : "16 results. None normal."}
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      ...(asDownload
        ? {
            headers: {
              "Content-Disposition": `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
            },
          }
        : {}),
    },
  );
}
