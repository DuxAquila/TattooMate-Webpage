
// src/lib/admin-permissions.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSessionFromHeaders } from "@/lib/admin-auth";

export type AdminContext = {
  userId: number;
  username: string;
  roleKey: string;
  permissions: Set<string>;
};

function buildRedirectToLogin(nextPath: string) {
  const url = new URL("/admin/login", process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000");
  url.searchParams.set("next", nextPath);
  url.searchParams.set("err", "1");
  return NextResponse.redirect(url);
}

/**
 * Lädt AdminUser + Role + RolePermissions + UserOverrides und berechnet die effektiven Rechte.
 * Regel: DENY > ALLOW > ROLE
 */
export async function getAdminContext(): Promise<AdminContext | null> {
  const session = await getAdminSessionFromHeaders();
  if (!session?.sub) return null;

  const user = await prisma.adminUser.findUnique({
    where: { username: session.sub },
    select: {
      id: true,
      username: true,
      active: true,
      role: {
        select: {
          key: true,
          permissions: {
            where: { allowed: true },
            select: {
              permission: { select: { key: true } },
            },
          },
        },
      },
      overrides: {
        select: {
          effect: true, // ALLOW | DENY
          permission: { select: { key: true } },
        },
      },
    },
  });

  if (!user || !user.active) return null;

  // 1) Base: Role permissions (allowed=true)
  const effective = new Set<string>(
    (user.role?.permissions ?? []).map((rp) => rp.permission.key)
  );

  // 2) Apply overrides: DENY wins
  // -> erst DENY entfernen, dann ALLOW hinzufügen (damit bei doppelten Daten DENY immer gewinnt)
  for (const o of user.overrides ?? []) {
    if (o.effect === "DENY") effective.delete(o.permission.key);
  }
  for (const o of user.overrides ?? []) {
    if (o.effect === "ALLOW") effective.add(o.permission.key);
  }

  return {
    userId: user.id,
    username: user.username,
    roleKey: user.role?.key ?? "UNKNOWN",
    permissions: effective,
  };
}

export function hasPermission(ctx: AdminContext | null, key: string): boolean {
  if (!ctx) return false;
  return ctx.permissions.has(key);
}

/**
 * Guard für API Routes:
 * - nicht eingeloggt -> Redirect /admin/login?next=...
 * - keine Rechte -> 403
 *
 * Usage:
 *   const guard = await requirePermission("canCreateNews", "/admin/news");
 *   if (!guard.ok) return guard.res;
 *   const { ctx } = guard;
 */
import { redirect, notFound } from "next/navigation";

export async function requirePermission(
  permissionKey: string,
  nextPathForLogin: string = "/admin"
): Promise<{ ok: true; ctx: AdminContext } | { ok: false; res: NextResponse }> {
  const ctx = await getAdminContext();

  if (!ctx) {
    return { ok: false, res: buildRedirectToLogin(nextPathForLogin) };
  }

  // optional: wer Admin-Bereich betritt, braucht canAccessAdmin
  if (!ctx.permissions.has("canAccessAdmin")) {
    return { ok: false, res: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }

  if (!ctx.permissions.has(permissionKey)) {
    return { ok: false, res: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }

  return { ok: true, ctx };
}

/**
 * Shorthand: nur Login + canAccessAdmin
 */
export async function requireAdmin(
  nextPathForLogin: string = "/admin"
): Promise<{ ok: true; ctx: AdminContext } | { ok: false; res: NextResponse }> {
  const ctx = await getAdminContext();

  if (!ctx) {
    return { ok: false, res: buildRedirectToLogin(nextPathForLogin) };
  }

  if (!ctx.permissions.has("canAccessAdmin")) {
    return { ok: false, res: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }

  return { ok: true, ctx };
}

export async function requireAdminRsc(nextPathForLogin: string = "/admin") {
  const ctx = await getAdminContext();
  if (!ctx) {
    redirect(`/admin/login?next=${encodeURIComponent(nextPathForLogin)}&err=1`);
  }
  if (!ctx.permissions.has("canAccessAdmin")) {
    notFound(); // oder redirect("/admin/forbidden")
  }
  return ctx;
}

export async function requirePermissionRsc(
  permissionKey: string,
  nextPathForLogin: string = "/admin"
) {
  const ctx = await requireAdminRsc(nextPathForLogin);
  if (!ctx.permissions.has(permissionKey)) {
    notFound(); // oder redirect("/admin/forbidden")
  }
  return ctx;
}
