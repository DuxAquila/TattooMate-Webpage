import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/de", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
