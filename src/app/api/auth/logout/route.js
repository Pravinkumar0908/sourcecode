import { createClient } from "../../../../lib/supabase/server";
import { NextResponse } from "next/server";

// POST /api/auth/logout — Sign out user
export async function POST() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();

    return NextResponse.json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
