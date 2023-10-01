import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import supabase from "@/app/helpers/supabase";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  // NOTE: for development. the redirect goes to localhost:3000 instead of app.localhost:3000.
  // simply goto app.localhost:3000 to see the app
  return NextResponse.redirect(requestUrl.origin);
}
