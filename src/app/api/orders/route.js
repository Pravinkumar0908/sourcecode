import { createClient } from "../../../lib/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// GET /api/orders — Get logged-in user's orders
export async function GET() {
  try {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    let query = supabase
      .from("orders")
      .select("*, products(name, slug, image_url, category)")
      .order("created_at", { ascending: false });

    // Admin sees all orders, normal user sees only own
    if (!profile || profile.role !== "admin") {
      query = query.eq("user_id", user.id);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

// POST /api/orders — Create a new order
export async function POST(request) {
  try {
    const supabase = await createClient();

    // Try to get authenticated user via cookies/session
    let { data: { user } } = await supabase.auth.getUser();

    // If no cookie-based session, try Authorization: Bearer <token>
    if (!user) {
      const authHeader = request.headers.get("authorization") || "";
      if (authHeader.toLowerCase().startsWith("bearer ")) {
        const token = authHeader.split(" ")[1];
        try {
          // Create a direct Supabase client and verify the token
          const directClient = createSupabaseClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
          );
          const userRes = await directClient.auth.getUser(token);
          if (userRes?.data?.user) {
            user = userRes.data.user;
          }
        } catch (e) {
          // ignore
        }
      }
    }

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { product_id, payment_method } = body;

    if (!product_id) {
      return NextResponse.json(
        { error: "Product ID is required." },
        { status: 400 }
      );
    }

    // Get product price
    const { data: product, error: pError } = await supabase
      .from("products")
      .select("id, price, name")
      .eq("id", product_id)
      .eq("is_active", true)
      .single();

    if (pError || !product) {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 }
      );
    }

    // Check for duplicate purchase
    const { data: existing } = await supabase
      .from("orders")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", product_id)
      .eq("status", "completed")
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: "You already purchased this product." },
        { status: 409 }
      );
    }

    // Perform the insert
    const { data: inserted, error: insertError } = await supabase
      .from("orders")
      .insert([
        {
          user_id: user.id,
          product_id,
          product_name: product.name,
          amount: product.price,
          payment_method: payment_method || "card",
          status: "completed",
        },
      ])
      .select("*, products(name, slug, image_url)")
      .single();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 400 });
    }

    // Increment product downloads
    try {
      await supabase.rpc("increment_downloads", { p_id: product_id });
    } catch (e) {
      // ignore increment errors
    }

    return NextResponse.json({ success: true, data: inserted }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
