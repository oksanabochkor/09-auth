import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkSession } from "@/lib/api/serverApi";

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  const isPrivatePage =
    pathname.startsWith("/profile") || pathname.startsWith("/notes");

  const response = NextResponse.next();

  let isAuthenticated = Boolean(accessToken);

  // 🔁 якщо немає accessToken, але є refreshToken → пробуємо оновити
  if (!accessToken && refreshToken) {
    try {
      const res = await checkSession();

      const newAccessToken = res.data?.accessToken;
      const newRefreshToken = res.data?.refreshToken;

      if (newAccessToken) {
        response.cookies.set("accessToken", newAccessToken);
        isAuthenticated = true;
      }

      if (newRefreshToken) {
        response.cookies.set("refreshToken", newRefreshToken);
      }
    } catch {
      isAuthenticated = false;
    }
  }

  // 🔒 неавторизований → на sign-in
  if (!isAuthenticated && isPrivatePage) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // 🔁 авторизований → НЕ пускаємо на auth сторінки
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url)); // ❗ ВАЖЛИВО
  }

  return response;
}
