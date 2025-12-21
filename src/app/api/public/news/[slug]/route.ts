export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const { slug } = await ctx.params;

  const post = await prisma.newsPost.findUnique({
    where: { slug },
    select: {
      id: true,
      lang: true,
      title: true,
      slug: true,
      excerpt: true,
      content: true,
      publishedAt: true,
      createdAt: true,
      updatedAt: true,
      status: true,
    },
  });

  if (!post || post.status !== "PUBLISHED" || !post.publishedAt) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ post });
}
