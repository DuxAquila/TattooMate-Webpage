// src/lib/admin-auth.ts
import crypto from "crypto";
import { cookies, headers } from "next/headers";

const COOKIE_NAME = "tm_admin_session";

export type SessionPayload = {
  v: 2;
  sub: string; // username
  uid: number; // adminUserId
  roleId: number;
  iat: number;
  exp: number;
  perms: string[]; // effective permission keys
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

function timingSafeEqualStr(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

export function getAdminCookieName() {
  return COOKIE_NAME;
}

export function hasPerm(session: SessionPayload | null, perm: string): boolean {
  if (!session) return false;
  return Array.isArray(session.perms) && session.perms.includes(perm);
}

export function requirePerm(session: SessionPayload | null, perm: string) {
  if (!hasPerm(session, perm)) throw new Error("Forbidden");
}

export function signAdminSession(input: {
  username: string;
  userId: number;
  roleId: number;
  perms: string[];
}): string {
  const secret = getEnv("ADMIN_SESSION_SECRET");
  const ttlHours = Number(process.env.ADMIN_SESSION_TTL_HOURS ?? "168");
  const now = Math.floor(Date.now() / 1000);

  const payload: SessionPayload = {
    v: 2,
    sub: input.username,
    uid: input.userId,
    roleId: input.roleId,
    iat: now,
    exp: now + ttlHours * 60 * 60,
    perms: Array.from(new Set((input.perms ?? []).filter(Boolean))).sort(),
  };

  const payloadStr = JSON.stringify(payload);
  const payloadB64 = b64url(payloadStr);
  const sig = hmacSHA256(payloadB64, secret);
  return `${payloadB64}.${sig}`;
}

export function verifyAdminSession(token: string | undefined | null): SessionPayload | null {
  if (!token) return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [payloadB64, sig] = parts;

  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return null;

  const expected = hmacSHA256(payloadB64, secret);
  if (!timingSafeEqualStr(sig, expected)) return null;

  try {
    const payloadJson = unb64url(payloadB64).toString("utf8");
    const payload = JSON.parse(payloadJson) as SessionPayload;

    const now = Math.floor(Date.now() / 1000);
    if (!payload || payload.v !== 2) return null;
    if (typeof payload.sub !== "string" || payload.sub.length < 1) return null;
    if (typeof payload.uid !== "number" || !Number.isFinite(payload.uid)) return null;
    if (typeof payload.roleId !== "number" || !Number.isFinite(payload.roleId)) return null;
    if (typeof payload.exp !== "number" || payload.exp <= now) return null;
    if (!Array.isArray(payload.perms)) return null;

    payload.perms = payload.perms.filter((p) => typeof p === "string" && p.length > 0);
    return payload;
  } catch {
    return null;
  }
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

// (Optional) Route Handlers: Cookie direkt lesen
export async function getAdminSessionFromCookies(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value ?? null;
  return verifyAdminSession(token);
}
