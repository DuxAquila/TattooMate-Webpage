import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

declare global {
  // eslint-disable-next-line no-var
  var __tm_prisma: PrismaClient | undefined;
}

function makeClient() {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) throw new Error("DATABASE_URL fehlt. (Prisma)");
  const adapter = new PrismaMariaDb(url);
  return new PrismaClient({ adapter });
}

export const prisma = globalThis.__tm_prisma ?? makeClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.__tm_prisma = prisma;
}

