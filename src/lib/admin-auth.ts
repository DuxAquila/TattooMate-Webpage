// src/lib/admin-auth.ts
import crypto from "crypto";
import { cookies, headers } from "next/headers";

const COOKIE_NAME = "tm_admin_session";

type SessionPayload = {
  v: 1;
  sub: string; // username
  iat: number; // issued at (unix seconds)
  exp: number; // expires at (unix seconds)
};

function getEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function b64url(input: Buffer | string): string {
  const buf = typeof input === "string" ? Buffer.from(input, "utf8") : input;
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function unb64url(input: string): Buffer {
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
  return Buffer.from(b64 + pad, "base64");
}

function hmacSHA256(data: string, secret: string): string {
  const sig = crypto.createHmac("sha256", secret).update(data).digest();
  return b64url(sig);
}

export function signAdminSession(username: string): string {
  const secret = getEnv("ADMIN_SESSION_SECRET");
  const ttlHours = Number(process.env.ADMIN_SESSION_TTL_HOURS ?? "168");
  const now = Math.floor(Date.now() / 1000);

  const payload: SessionPayload = {
    v: 1,
    sub: username,
    iat: now,
    exp: now + ttlHours * 60 * 60,
  };

  const payloadStr = JSON.stringify(payload);
  const payloadB64 = b64url(payloadStr);
  const sig = hmacSHA256(payloadB64, secret);

  // token format: <payloadB64>.<sig>
  return `${payloadB64}.${sig}`;
}

export function verifyAdminSession(
  token: string | undefined | null
): SessionPayload | null {
  if (!token) return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [payloadB64, sig] = parts;

  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return null;

  const expected = hmacSHA256(payloadB64, secret);

  // timing-safe compare
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return null;
  if (!crypto.timingSafeEqual(a, b)) return null;

  try {
    const payloadJson = unb64url(payloadB64).toString("utf8");
    const payload = JSON.parse(payloadJson) as SessionPayload;

    const now = Math.floor(Date.now() / 1000);
    if (!payload || payload.v !== 1) return null;
    if (typeof payload.exp !== "number" || payload.exp <= now) return null;

    return payload;
  } catch {
    return null;
  }
}

export function getAdminCookieName() {
  return COOKIE_NAME;
}

// ✅ Next.js 16: cookies() ist async → diese Funktion muss async sein
export async function isAdminLoggedIn(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  return !!verifyAdminSession(token);
}

// ✅ Robust (Server Components): Cookie über Header lesen
export async function getAdminSessionFromHeaders(): Promise<SessionPayload | null> {
  const h = await headers();
  const cookieHeader = h.get("cookie") ?? "";
  const name = getAdminCookieName();

  const token =
    cookieHeader
      .split(";")
      .map((p) => p.trim())
      .find((p) => p.startsWith(name + "="))
      ?.slice((name + "=").length) ?? null;

  return verifyAdminSession(token);
}
