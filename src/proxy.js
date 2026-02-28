import { NextResponse } from "next/server";

export function proxy(request) {
  const token = request.cookies.get("token");

  const headers = new Headers(request.headers);

  if (token) {
    headers.set(
      "Authorization",
      `Bearer ${token.value}`
    );
  }

  return NextResponse.rewrite(
    new URL(
      "http://localhost:5000" + request.nextUrl.pathname,
      request.url
    ),
    { request: { headers } }
  );
}

export const config = {
  matcher: "/api/:path*",
};