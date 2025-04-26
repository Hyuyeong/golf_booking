import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// 보호할 경로 지정
const protectedPaths = ["/account"];

export async function middleware(req) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // 보호된 경로에 접근하는데 토큰이 없으면 로그인으로 리다이렉트
  if (protectedPaths.some((path) => pathname.startsWith(path)) && !token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
