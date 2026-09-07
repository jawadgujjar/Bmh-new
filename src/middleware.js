// middleware.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Protected page routes and the roles allowed on each
const protectedRoutes = {
  "/admin": ["admin", "digital-marketing"],
  "/marketing": ["marketing"],
  "/seo": ["seo"],
};

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  const matchedRoute = Object.keys(protectedRoutes).find((route) =>
    pathname.startsWith(route)
  );

  if (!matchedRoute) return NextResponse.next();

  const requiredRoles = protectedRoutes[matchedRoute];
  const token = req.cookies.get("token")?.value;
  const loginUrl = new URL("/auth/login", req.url);

  // No token → login
  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  try {
    // jose runs natively on the Edge runtime (jsonwebtoken does not).
    // Tokens are HS256, signed with the same JWT_SECRET string by /api/admin/login.
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const role = payload.role;
    if (!role || !requiredRoles.includes(role)) {
      return NextResponse.redirect(loginUrl);
    }
  } catch {
    // expired / tampered / wrong secret
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/marketing/:path*", "/seo/:path*"],
};
