export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const lang = (url.searchParams.get("lang") ?? "de").toLowerCase();
  const take = Math.min(Number(url.searchParams.get("take") ?? "20"), 50);

  const items = await prisma.newsPost.findMany({
    where: {
      lang,
      status: "PUBLISHED",
      publishedAt: { not: null },
    },
    orderBy: { publishedAt: "desc" },
    take,
    select: {
      id: true,
      lang: true,
      title: true,
      slug: true,
      excerpt: true,
      publishedAt: true,
    },
  });

  return NextResponse.json({ items });
}

