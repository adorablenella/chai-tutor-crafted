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

  const redirectURL = process.env.NEXTAUTH_URL || "https://app.chaibuilder.xyz/";
  return NextResponse.redirect(redirectURL);
}
