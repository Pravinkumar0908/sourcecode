import { createClient } from "../../../../lib/supabase/server";
import { NextResponse } from "next/server";

// POST /api/auth/signup — Register new user
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, fullName, full_name } = body;
    const name = fullName || full_name || "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Account created successfully! Check your email for verification.",
      user: data.user,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
