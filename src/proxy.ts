// src/proxy.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "./lib/admin-auth";

const COOKIE_NAME = "tm_admin_session";

export default function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // 1) Root -> /de (dein bestehendes Verhalten)
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/de", request.url));
  }

  // 2) Admin schützen, ohne /[lang] anzufassen
  if (pathname.startsWith("/admin")) {
    // Login-Seite muss frei bleiben
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    const token = request.cookies.get(COOKIE_NAME)?.value;
    const valid = !!verifyAdminSession(token);

    if (valid) {
      return NextResponse.next();
    }

    // Redirect zum Login + next Parameter
    const url = new URL("/admin/login", request.url);
    const next =
      pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    url.searchParams.set("next", next);

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*"],
};
