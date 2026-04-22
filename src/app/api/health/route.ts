import { NextResponse } from "next/server";

/** Zeabur / 反向代理上快速自测：能返回 200 说明 Node 与路由栈在工作 */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export function GET() {
  return NextResponse.json(
    { ok: true, ts: Date.now() },
    { headers: { "cache-control": "no-store" } },
  );
}
