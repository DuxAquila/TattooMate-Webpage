import { NextResponse } from "next/server";
import { getPublicNewsList } from "@/lib/news/public";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const lang = url.searchParams.get("lang") ?? undefined;

  const items = await getPublicNewsList(lang ?? undefined);
  return NextResponse.json({ items });
}
