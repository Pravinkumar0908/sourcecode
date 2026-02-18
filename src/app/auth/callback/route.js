import { createClient } from "../../../lib/supabase/server";
import { NextResponse } from "next/server";

// Handle Supabase auth callbacks (email confirmation, password reset, OAuth)
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const type = searchParams.get("type");
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Password recovery → redirect to settings to set new password
      if (type === "recovery") {
        return NextResponse.redirect(
          new URL("/dashboard/settings?reset=true", request.url)
        );
      }
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
  }

  // If something went wrong, redirect to login with error
  return NextResponse.redirect(
    new URL("/login?error=auth_callback_failed", request.url)
  );
}
