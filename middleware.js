// middleware.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Define protected routes with allowed roles
const protectedRoutes = {
  "/admin": ["admin"],
  "/marketing": ["marketing"],
  "/seo": ["seo"],
};

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Find which route is matched
  const matchedRoute = Object.keys(protectedRoutes).find((route) =>
    pathname.startsWith(route)
  );

  if (matchedRoute) {
    const requiredRoles = protectedRoutes[matchedRoute];
    const token = req.cookies.get("token")?.value;

    // ✅ No token → redirect
    if (!token) {
      console.log("No token found, redirecting to login");
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  
    try {
      // ✅ Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const role = decoded.role;

      // ✅ Role mismatch → redirect
      if (!role || !requiredRoles.includes(role)) {
        console.log(`Role ${role} not authorized for ${pathname}`);
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
    } catch (err) {
      console.log("Invalid token:", err.message);
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/marketing/:path*", "/seo/:path*"],
};
