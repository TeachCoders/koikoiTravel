import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
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

  // 301 redirect for /destinations/india and subpaths
  if (pathname.startsWith("/destinations/india")) {
    const rest = pathname.replace(/^\/destinations\/india\/?/, "");
    const dest = rest ? `/tour-packages/india/${rest}` : "/tour-packages/india";
    return NextResponse.redirect(new URL(dest, request.url), 301);
  }

  // 301 redirect for /cancellation-and-refund-policy
  if (pathname === "/cancellation-and-refund-policy" || pathname === "/cancellation-and-refund-policy/") {
    return NextResponse.redirect(new URL("/cancellation-and-refund", request.url), 301);
  }

  // 301 redirect for /& bug
  if (pathname === "/&") {
    return NextResponse.redirect(new URL("/", request.url), 301);
  }

  // 301 redirect for /tour-packages/10-days-south-india-itinerary
  if (pathname === "/tour-packages/10-days-south-india-itinerary" || pathname === "/tour-packages/10-days-south-india-itinerary/") {
    return NextResponse.redirect(new URL("/tour-packages/10-days-south-india-tour-package", request.url), 301);
  }

  // 301 redirect for /travel-experiences/nature
  if (pathname === "/travel-experiences/nature" || pathname === "/travel-experiences/nature/") {
    return NextResponse.redirect(new URL("/travel-experiences/hill-station", request.url), 301);
  }

  // 301 redirect for /travel-experiences/beach-lake
  if (pathname === "/travel-experiences/beach-lake" || pathname === "/travel-experiences/beach-lake/") {
    return NextResponse.redirect(new URL("/tour-packages/india/kerala", request.url), 301);
  }

  // 301 redirect for /tour-packages/india/uttar-pradesh/fatehpur-sikri
  if (pathname === "/tour-packages/india/uttar-pradesh/fatehpur-sikri" || pathname === "/tour-packages/india/uttar-pradesh/fatehpur-sikri/") {
    return NextResponse.redirect(new URL("/tour-packages/india/uttar-pradesh", request.url), 301);
  }

  // 301 redirect any legacy paginated /travel-experiences/*?page=... to the clean canonical URL
  if (pathname.startsWith("/travel-experiences/") && request.nextUrl.searchParams.has("page")) {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete("page");
    return NextResponse.redirect(cleanUrl, 301);
  }

  // Dashboard auth check
  if (pathname.startsWith("/dashboard")) {
    const session = request.cookies.get("connect.sid");
    if (!session) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/destinations/india-tours/:path*",
    "/destinations/india/:path*",
    "/destinations/india",
    "/tour-packages/india/golden-triangle-tour-india",
    "/cancellation-and-refund-policy",
    "/&",
    "/tour-packages/10-days-south-india-itinerary",
    "/travel-experiences/nature",
    "/travel-experiences/beach-lake",
    "/travel-experiences/:path*",
    "/tour-packages/india/uttar-pradesh/fatehpur-sikri",
  ],
};
