import { NextRequest, NextResponse } from "next/server";

const privateRoutes = ["/diary", "/profile", "/journey"];
const publicRoutes = ["/auth/login", "/auth/register"];

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const cookieHeader = `accessToken=${accessToken ?? ""}; refreshToken=${
    refreshToken ?? ""
  }`;
  console.log("access", accessToken);
  console.log("refresh", refreshToken);
  const { pathname } = request.nextUrl;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (isPrivateRoute) {
    if (!accessToken) {
      if (!refreshToken) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }

      try {
        const refreshUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`;
        const apiRes = await fetch(refreshUrl, {
          method: "POST",
          headers: { Cookie: cookieHeader },
        });

        if (apiRes.ok) {
          const res = NextResponse.next();
          const setCookie = apiRes.headers.get("set-cookie");
          if (setCookie) {
            res.headers.set("set-cookie", setCookie);
          }
          return res;
        }

        return NextResponse.redirect(new URL("/auth/login", request.url));
      } catch {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/diary/:path*",
    "/profile/:path*",
    "/journey/:path*",
    "/auth/login",
    "/auth/register",
  ],
};
