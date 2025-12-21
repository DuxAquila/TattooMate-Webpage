import "server-only";

export function getBaseUrl() {
  // Vercel & viele Hosts setzen das
  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  // du setzt das selbst (empfohlen)
  const base = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL;
  if (base) return base.replace(/\/$/, "");

  // Fallback lokal
  const port = process.env.PORT || "3000";
  return `http://localhost:${port}`;
}

