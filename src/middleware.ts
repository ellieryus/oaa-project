import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { appConfig } from "@/lib/config";

/**
 * Route protection middleware.
 *
 * Current (MVP): session cookie check only.
 * Production: decode JWT, verify role, redirect accordingly.
 *
 * Route groups:
 *   /home, /matches, /requests, /calls, /profile, /notifications,
 *   /alumni/*, /ask/*, /reflect/*  → requires auth + role=student
 *
 *   /inbox, /past-students, /post-call-notes, /profile/alumnus → requires auth + role=alumnus
 *
 *   /signin, /role-select, /  → public
 */

const PUBLIC_PATHS = ["/", "/signin", "/signin/sent", "/role-select"];

const STUDENT_PATHS = [
  "/home",
  "/matches",
  "/requests",
  "/calls",
  "/profile",
  "/notifications",
  "/alumni",
  "/ask",
  "/reflect",
  "/student-inbox",
  "/past-contacts",
  "/onboarding/student",
];

const ALUMNUS_PATHS = [
  "/inbox",
  "/past-students",
  "/post-call-notes",
  "/profile/alumnus",
  "/onboarding/alumnus",
];

function isPublic(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

function isStudentPath(pathname: string): boolean {
  return STUDENT_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

function isAlumnusPath(pathname: string): boolean {
  return ALUMNUS_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow public paths and API routes
  if (isPublic(pathname) || pathname.startsWith("/api/") || pathname.startsWith("/_next/")) {
    return NextResponse.next();
  }

  // Read session cookie (MVP: simple existence check)
  const session = request.cookies.get(appConfig.sessionCookieName);

  if (!session) {
    const loginUrl = new URL("/signin", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // TODO: decode JWT and extract role
  // const { role } = decodeJwt(session.value);
  // if (isStudentPath(pathname) && role !== "student") {
  //   return NextResponse.redirect(new URL("/inbox", request.url));
  // }
  // if (isAlumnusPath(pathname) && role !== "alumnus") {
  //   return NextResponse.redirect(new URL("/home", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, icons, public assets
     */
    "/((?!_next/static|_next/image|favicon.ico|logo|apple-icon|icon).*)",
  ],
};
