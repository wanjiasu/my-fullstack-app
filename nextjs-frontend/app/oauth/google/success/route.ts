import { NextRequest, NextResponse } from "next/server";

const TOKEN_COOKIE = "accessToken";
const USER_ID_COOKIE = "userId";
const CALLBACK_TOKEN_ERROR = "OAUTH_CALLBACK_MISSING_TOKEN";

function resolveRedirectPath(path: string) {
  return path.startsWith("/") ? path : "/";
}

function buildRedirect(request: NextRequest, path: string) {
  return new URL(path, request.nextUrl.origin);
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const accessToken = url.searchParams.get("access_token");
  const tokenType = url.searchParams.get("token_type");
  const userId = url.searchParams.get("user_id");
  const redirectPath = resolveRedirectPath(url.searchParams.get("redirect") || "/");

  if (!accessToken || tokenType !== "bearer") {
    return NextResponse.redirect(
      buildRedirect(request, `/login?error=${CALLBACK_TOKEN_ERROR}`),
    );
  }

  const response = NextResponse.redirect(buildRedirect(request, redirectPath));

  response.cookies.set(TOKEN_COOKIE, accessToken, {
    httpOnly: false,
    maxAge: 60 * 60, // 1 hour to match backend token expiry
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  if (userId) {
    response.cookies.set(USER_ID_COOKIE, userId, {
      httpOnly: false,
      maxAge: 60 * 60,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }

  return response;
}
