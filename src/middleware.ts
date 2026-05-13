import { next } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token");
  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");
  const isAuth = request.nextUrl.pathname.startsWith("/login") || 
                 request.nextUrl.pathname.startsWith("/register");

  if (isDashboard && !token) {
    return next.redirect(new URL("/login", request.url));
  }

  if (isAuth && token) {
    return next.redirect(new URL("/dashboard", request.url));
  }

  return next.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};