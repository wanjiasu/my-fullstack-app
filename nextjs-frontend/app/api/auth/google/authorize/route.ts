import { NextRequest, NextResponse } from "next/server";

const ERROR_PARAM = "OAUTH_AUTHORIZE_FAILED";
const CONFIG_ERROR_PARAM = "OAUTH_CONFIG_ERROR";

export async function GET(request: NextRequest) {
  const baseUrl = process.env.API_BASE_URL;

  if (!baseUrl) {
    const fallback = new URL(`/login?error=${CONFIG_ERROR_PARAM}`, request.url);
    return NextResponse.redirect(fallback);
  }

  try {
    const response = await fetch(`${baseUrl}/auth/google/authorize`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const fallback = new URL(`/login?error=${ERROR_PARAM}`, request.url);
      return NextResponse.redirect(fallback);
    }

    const data = (await response.json()) as { authorization_url?: string };

    if (!data.authorization_url) {
      const fallback = new URL(`/login?error=${ERROR_PARAM}`, request.url);
      return NextResponse.redirect(fallback);
    }

    return NextResponse.redirect(data.authorization_url);
  } catch (error) {
    const fallback = new URL(`/login?error=${ERROR_PARAM}`, request.url);
    return NextResponse.redirect(fallback);
  }
}
