// File: src/app/api/admin/login/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signAdminSession } from "@/lib/admin-auth";

export async function POST(req: Request) {
  const form = await req.formData();

  const user = String(form.get("user") ?? "").trim();
  const pass = String(form.get("pass") ?? "").trim();
  const next = String(form.get("next") ?? "/admin");

  const bad = () => {
    const url = new URL(req.url);
    url.pathname = "/admin/login";
    url.searchParams.set("err", "1");
    if (next) url.searchParams.set("next", next);
    return NextResponse.redirect(url);
  };

  if (!user || !pass) return bad();

  // ✅ role + role.permissions + overrides mitladen
  const admin = await prisma.adminUser.findUnique({
    where: { username: user },
    select: {
      id: true,
      username: true,
      passwordHash: true,
      active: true,
      roleId: true,
      role: {
        select: {
          permissions: {
            where: { allowed: true },
            select: {
              allowed: true,
              permission: { select: { key: true } },
            },
          },
        },
      },
      overrides: {
        select: {
          effect: true,
          permission: { select: { key: true } },
        },
      },
    },
  });

  if (!admin || !admin.active) return bad();

  const ok = await bcrypt.compare(pass, admin.passwordHash);
  if (!ok) return bad();

  // lastLoginAt nur best-effort
  try {
    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { lastLoginAt: new Date() },
    });
  } catch {}

  // ✅ effektive Permission Keys berechnen
  const permSet = new Set<string>();

  for (const rp of admin.role?.permissions ?? []) {
    const key = rp.permission?.key;
    if (key) permSet.add(key);
  }

  for (const ov of admin.overrides ?? []) {
    const key = ov.permission?.key;
    if (!key) continue;

    if (ov.effect === "DENY") permSet.delete(key);
    if (ov.effect === "ALLOW") permSet.add(key);
  }

  const perms = Array.from(permSet).sort();

  // ✅ Token inkl. DB-Permissions
  const token = signAdminSession({
    username: admin.username,
    userId: admin.id,
    roleId: admin.roleId,
    perms,
  });

  const res = NextResponse.redirect(new URL(next.startsWith("/") ? next : "/admin", req.url));

  res.cookies.set({
    name: "tm_admin_session",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Number(process.env.ADMIN_SESSION_TTL_HOURS ?? "168") * 60 * 60,
  });

  return res;
}
