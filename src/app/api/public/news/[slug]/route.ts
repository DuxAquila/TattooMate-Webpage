import { NextResponse } from "next/server";
import { getPublicNewsBySlug } from "@/lib/news/public";

export async function GET(req: Request, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const url = new URL(req.url);
  const lang = url.searchParams.get("lang") ?? undefined;

  const post = await getPublicNewsBySlug(slug, lang ?? undefined);
  if (!post) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  return NextResponse.json({ post });
}
