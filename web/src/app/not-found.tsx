import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en" className="dark">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "64px 24px",
          background:
            "radial-gradient(ellipse 120% 80% at 50% -20%, color-mix(in oklch, #c77dff 22%, transparent), transparent 55%), radial-gradient(ellipse 80% 60% at 100% 0%, color-mix(in oklch, #4d96ff 14%, transparent), transparent 50%), linear-gradient(180deg, #06050c, #020204)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#eceaf4",
        }}
      >
        <div
          style={{
            height: 4,
            width: 160,
            borderRadius: 999,
            background:
              "linear-gradient(90deg,#ff6b6b,#ff9f43,#ffd93d,#6bcb77,#4d96ff,#c77dff)",
          }}
        />
        <h1 style={{ fontSize: 48, marginTop: 24, marginBottom: 8 }}>
          Outside the rainbow
        </h1>
        <p style={{ opacity: 0.75, maxWidth: 420, textAlign: "center", color: "#8f8ba3" }}>
          这里是一片彩虹之外的空白 / This page does not exist.
        </p>
        <Link
          href="/"
          style={{
            marginTop: 32,
            background: "linear-gradient(135deg, #6a5ed4, #5548a8)",
            color: "white",
            padding: "14px 28px",
            borderRadius: 20,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          ← Back home
        </Link>
      </body>
    </html>
  );
}
