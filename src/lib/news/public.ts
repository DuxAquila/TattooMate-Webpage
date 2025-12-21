import "server-only";
import { prisma } from "@/lib/prisma";

function now() {
  return new Date();
}

export async function getPublicNewsList(lang?: string) {
  return prisma.newsPost.findMany({
    where: {
      status: "PUBLISHED",
      AND: [
        { OR: [{ publishedAt: null }, { publishedAt: { lte: now() } }] },
        ...(lang ? [{ lang }] : []), // nur exact-match, kein null
      ],
    },
    orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }],
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      publishedAt: true,
      updatedAt: true,
      lang: true,
    },
  });
}

export async function getPublicNewsBySlug(slug: string, lang?: string) {
  return prisma.newsPost.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
      AND: [
        { OR: [{ publishedAt: null }, { publishedAt: { lte: now() } }] },
        ...(lang ? [{ lang }] : []), // nur exact-match, kein null
      ],
    },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      content: true,
      publishedAt: true,
      updatedAt: true,
      lang: true,
    },
  });
}
