import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: { lang: string };
}) {
  const isDE = params.lang === "de";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Akzent-Linie oben */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "6px",
          background: "#ef4444",
        }} />

        {/* Badge */}
        <div style={{
          display: "flex",
          gap: "12px",
          marginBottom: "32px",
        }}>
          {["DSGVO-konform", "Made in Germany", "Kein Cloud-Zwang"].map((label) => (
            <div key={label} style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "999px",
              padding: "6px 16px",
              color: "rgba(255,255,255,0.7)",
              fontSize: "14px",
            }}>
              {label}
            </div>
          ))}
        </div>

        {/* Headline */}
        <div style={{
          fontSize: "56px",
          fontWeight: 800,
          color: "#ffffff",
          lineHeight: 1.15,
          maxWidth: "800px",
          marginBottom: "24px",
        }}>
          {isDE
            ? "Digitale Einwilligungen für Tattoo- & Piercingstudios"
            : "Digital Consent Forms for Tattoo & Piercing Studios"}
        </div>

        {/* Subline */}
        <div style={{
          fontSize: "24px",
          color: "rgba(255,255,255,0.55)",
          marginBottom: "48px",
        }}>
          {isDE ? "Rechtssicher. Digital. Einfach." : "Legally sound. Digital. Simple."}
        </div>

        {/* Brand */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}>
          <div style={{
            width: "48px",
            height: "48px",
            background: "#ef4444",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            fontWeight: 800,
            color: "#fff",
          }}>
            T
          </div>
          <div style={{
            fontSize: "28px",
            fontWeight: 800,
            color: "#ffffff",
          }}>
            TattooMate
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
