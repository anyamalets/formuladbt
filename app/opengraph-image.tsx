import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Формула ДБТ — команда диалектико-поведенческой терапии";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "linear-gradient(135deg, #F7F3FD 0%, #EFE7FC 100%)",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#7C3AED",
            fontWeight: 600,
            display: "flex",
          }}
        >
          Команда «Формула ДБТ»
        </div>
        <div
          style={{
            fontSize: 76,
            lineHeight: 1.1,
            color: "#1E1B4B",
            fontWeight: 500,
            maxWidth: 1000,
            display: "flex",
          }}
        >
          Когда эмоции невыносимы, а одной терапии раз в неделю недостаточно
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#4A4A6A",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>formuladbt.ru</span>
          <span style={{ fontSize: 18 }}>ПРЛ · РПП · самоповреждение · БАР</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
