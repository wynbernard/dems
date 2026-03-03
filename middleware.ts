import { auth } from "@/lib/auth/auth.config";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session;

  const isAuthRoute  = nextUrl.pathname === "/login";           // ← exact match, not startsWith
  const isApiRoute   = nextUrl.pathname.startsWith("/api/");
  const isPublicFile = nextUrl.pathname.startsWith("/_next") ||
                       nextUrl.pathname.startsWith("/favicon");

  // ✅ always allow these through — no redirect
  if (isAuthRoute || isApiRoute || isPublicFile) {
    return NextResponse.next();
  }

  // ✅ not logged in + protected route → go to login
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl.origin));
  }

  // ✅ logged in + protected route → allow
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};