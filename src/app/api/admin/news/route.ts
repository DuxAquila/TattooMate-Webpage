export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/admin-permissions";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 120);
}

export async function GET(req: Request) {
  const guard = await requirePermission("canReadNewsAdmin", "/admin/news");
  if (!guard.ok) return guard.res;

  const url = new URL(req.url);
  const status = (url.searchParams.get("status") ?? "").toUpperCase();
  const lang = (url.searchParams.get("lang") ?? "").toLowerCase();
  const q = (url.searchParams.get("q") ?? "").trim();

  const items = await prisma.newsPost.findMany({
    where: {
      ...(lang ? { lang } : {}),
      ...(status ? { status: status as any } : {}),
      ...(q
        ? {
            OR: [
              { title: { contains: q } },
              { slug: { contains: q } },
              { excerpt: { contains: q } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 300,
    select: {
      id: true,
      lang: true,
      title: true,
      slug: true,
      status: true,
      publishedAt: true,
      scheduledAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const guard = await requirePermission("canCreateNews", "/admin/news");
  if (!guard.ok) return guard.res;

  const { ctx } = guard;
  const body = await req.json().catch(() => null);

  const lang = String(body?.lang ?? "de").toLowerCase();
  const title = String(body?.title ?? "").trim();
  const excerpt = String(body?.excerpt ?? "").trim();
  const content = String(body?.content ?? "").trim();
  const status = String(body?.status ?? "DRAFT").toUpperCase();

  if (!title || !content) {
    return NextResponse.json({ error: "title/content required" }, { status: 400 });
  }

  let slug = String(body?.slug ?? "").trim();
  if (!slug) slug = slugify(title);
  if (!slug) slug = `news-${Date.now()}`;

  // publish only with permission
  let publishNow = false;
  if (status === "PUBLISHED") {
    const pub = await requirePermission("canPublishNews", "/admin/news");
    if (!pub.ok) return pub.res;
    publishNow = true;
  }

  const created = await prisma.newsPost.create({
    data: {
      lang,
      title,
      slug,
      excerpt,
      content,
      status: publishNow ? "PUBLISHED" : (status as any),
      publishedAt: publishNow ? new Date() : null,
      scheduledAt: null,
      createdById: ctx.userId,
      updatedById: ctx.userId,
    },
    select: { id: true, slug: true },
  });

  return NextResponse.json({ ok: true, created });
}

