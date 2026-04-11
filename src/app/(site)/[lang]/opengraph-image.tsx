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
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Accent-Gradient – exakt wie tm-section--accent-top */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(to bottom, rgba(255,59,48,0.08), rgba(255,138,0,0.04) 35%, transparent 70%)",
        }} />

        {/* Akzentlinie oben links – wie der rote Strich auf der Seite */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "200px",
          height: "4px",
          background: "linear-gradient(135deg, #ff3b30, #ff8a00)",
        }} />

        {/* Badges – wie tm-pill */}
        <div style={{
          display: "flex",
          gap: "10px",
          marginBottom: "40px",
          position: "relative",
        }}>
          {(isDE
            ? ["DSGVO-konform", "Made in Germany", "Kein Cloud-Zwang"]
            : ["GDPR-compliant", "Made in Germany", "No cloud lock-in"]
          ).map((label) => (
            <div key={label} style={{
              background: "rgba(15,23,42,0.06)",
              border: "1px solid rgba(15,23,42,0.12)",
              borderRadius: "999px",
              padding: "6px 18px",
              color: "#64748b",
              fontSize: "15px",
              fontWeight: 600,
            }}>
              {label}
            </div>
          ))}
        </div>

        {/* H1 – wie tm-h1 */}
        <div style={{
          fontSize: "52px",
          fontWeight: 700,
          color: "#0f172a",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          maxWidth: "780px",
          marginBottom: "20px",
          position: "relative",
        }}>
          {isDE
            ? "Digitale Einwilligungen für Tattoo- & Piercingstudios"
            : "Digital Consent Forms for Tattoo & Piercing Studios"}
        </div>

        {/* Subline – wie tm-lead */}
        <div style={{
          fontSize: "22px",
          color: "#64748b",
          marginBottom: "56px",
          position: "relative",
        }}>
          {isDE
            ? "Rechtssicher. Digital. Einfach."
            : "Legally sound. Digital. Simple."}
        </div>

        {/* Brand – wie tm-brand */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          position: "relative",
        }}>
          <img
            src="https://tattoomate.de/images/branding/logo-tattoomate.svg"
            width={44}
            height={44}
            alt="TattooMate Logo"
          />
          <div style={{
            fontSize: "24px",
            fontWeight: 800,
            color: "#0f172a",
          }}>
            TattooMate
          </div>
        </div>

        {/* Primary Button rechts unten – wie tm-btn--primary */}
        <div style={{
          position: "absolute",
          bottom: "80px",
          right: "80px",
          background: "linear-gradient(135deg, #ff3b30, #ff8a00)",
          borderRadius: "12px",
          padding: "14px 28px",
          color: "#ffffff",
          fontSize: "16px",
          fontWeight: 700,
          boxShadow: "0 10px 18px rgba(255,59,48,0.18)",
        }}>
          {isDE ? "Live-Demo anfordern →" : "Request live demo →"}
        </div>

        {/* tattoomate.de URL unten rechts unter dem Button */}
        <div style={{
          position: "absolute",
          bottom: "48px",
          right: "80px",
          fontSize: "13px",
          color: "#64748b",
        }}>
          tattoomate.de
        </div>
      </div>
    ),
    { ...size }
  );
}
