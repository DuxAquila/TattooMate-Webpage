export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/admin-permissions";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const { id: idParam } = await ctx.params;

  const guard = await requirePermission("canReadNewsAdmin", `/admin/news/${idParam}`);
  if (!guard.ok) return guard.res;

  const id = Number(idParam);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "bad id" }, { status: 400 });
  }

  const post = await prisma.newsPost.findUnique({ where: { id } });
  if (!post) return NextResponse.json({ error: "not found" }, { status: 404 });

  return NextResponse.json({ post });
}

export async function PUT(req: Request, ctx: Ctx) {
  const { id: idParam } = await ctx.params;

  const guard = await requirePermission("canEditNews", `/admin/news/${idParam}`);
  if (!guard.ok) return guard.res;

  const { ctx: adminCtx } = guard;

  const id = Number(idParam);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "bad id" }, { status: 400 });
  }

  const body = await req.json().catch(() => null);

  const data: any = {};
  if (body?.lang != null) data.lang = String(body.lang).toLowerCase();
  if (body?.title != null) data.title = String(body.title).trim();
  if (body?.slug != null) data.slug = String(body.slug).trim();
  if (body?.excerpt != null) data.excerpt = String(body.excerpt).trim();
  if (body?.content != null) data.content = String(body.content).trim();

  if (body?.status != null) {
    const nextStatus = String(body.status).toUpperCase();

    if (nextStatus === "PUBLISHED") {
      const pub = await requirePermission("canPublishNews", `/admin/news/${idParam}`);
      if (!pub.ok) return pub.res;

      data.status = "PUBLISHED";
      data.publishedAt = new Date();
      data.scheduledAt = null;
    } else {
      data.status = nextStatus;
      if (nextStatus !== "SCHEDULED") data.scheduledAt = null;
      if (nextStatus !== "PUBLISHED") data.publishedAt = null;
    }
  }

  data.updatedById = adminCtx.userId;

  const updated = await prisma.newsPost.update({ where: { id }, data });
  return NextResponse.json({ ok: true, updated });
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const { id: idParam } = await ctx.params;

  const guard = await requirePermission("canDeleteNews", `/admin/news/${idParam}`);
  if (!guard.ok) return guard.res;

  const id = Number(idParam);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "bad id" }, { status: 400 });
  }

  await prisma.newsPost.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
