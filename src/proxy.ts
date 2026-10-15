import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Supabase CMS authentication handling
  if (path.startsWith("/cms")) {
    const isLogin = path === "/cms/login" || path.startsWith("/cms/login");

    // Check if Supabase auth cookie exists
    const allCookies = request.cookies.getAll();
    const hasAuthCookie = allCookies.some(
      (c) =>
        (c.name.startsWith("sb-") && c.name.includes("-auth-token")) ||
        c.name === "supabase-auth-token" ||
        c.name.startsWith("sb-access-token"),
    );

    if (!hasAuthCookie && !isLogin) {
      return NextResponse.redirect(new URL("/cms/login", request.url));
    }

    if (hasAuthCookie && isLogin) {
      return NextResponse.redirect(new URL("/cms", request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
