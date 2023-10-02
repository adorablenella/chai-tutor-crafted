import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient<any>({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  // NOTE: for development. the redirect goes to localhost:3000 instead of app.localhost:3000.
  // simply goto app.localhost:3000 to see the app
  return NextResponse.redirect(requestUrl.origin);
}
