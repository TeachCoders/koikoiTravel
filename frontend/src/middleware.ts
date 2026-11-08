import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 301 redirect for legacy destination paths: /destinations/india-tours/[state]-tours/[city]
  if (pathname.startsWith("/destinations/india-tours/")) {
    const match = pathname.match(/^\/destinations\/india-tours\/([a-z0-9-]+)-tours(?:\/([a-z0-9-]+))?\/?$/i);
    if (match) {
      const state = match[1];
      const city = match[2];
      const dest = city
        ? `/tour-packages/india/${state}/${city}`
        : `/tour-packages/india/${state}`;
      return NextResponse.redirect(new URL(dest, request.url), 301);
    }
  }

  // 301 redirect for /tour-packages/india/golden-triangle-tour-india
  if (pathname === "/tour-packages/india/golden-triangle-tour-india" || pathname === "/tour-packages/india/golden-triangle-tour-india/") {
    return NextResponse.redirect(new URL("/tour-packages/india/golden-triangle", request.url), 301);
  }

  // 301 redirect for /destinations/india
  if (pathname === "/destinations/india" || pathname === "/destinations/india/") {
    return NextResponse.redirect(new URL("/tour-packages/india", request.url), 301);
  }

  // 301 redirect for /cancellation-and-refund-policy
  if (pathname === "/cancellation-and-refund-policy" || pathname === "/cancellation-and-refund-policy/") {
    return NextResponse.redirect(new URL("/cancellation-and-refund", request.url), 301);
  }

  // 301 redirect for /& bug
  if (pathname === "/&") {
    return NextResponse.redirect(new URL("/", request.url), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/destinations/india-tours/:path*",
    "/tour-packages/india/golden-triangle-tour-india",
    "/destinations/india",
    "/cancellation-and-refund-policy",
    "/&",
  ],
};
