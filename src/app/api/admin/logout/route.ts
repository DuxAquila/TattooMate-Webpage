export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getAdminCookieName } from "@/lib/admin-auth";

export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL("/admin/login", req.url));

  res.cookies.set({
    name: getAdminCookieName(),
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return res;
}
