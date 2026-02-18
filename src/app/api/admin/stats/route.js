import { createClient } from "../../../../lib/supabase/server";
import { NextResponse } from "next/server";

// GET /api/admin/stats — Dashboard statistics for admin
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

    if (!profile || profile.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Parallel queries for stats
    const [productsRes, ordersRes, usersRes, revenueRes, recentOrdersRes] =
      await Promise.all([
        supabase
          .from("products")
          .select("id", { count: "exact", head: true })
          .eq("is_active", true),
        supabase
          .from("orders")
          .select("id, amount", { count: "exact" }),
        supabase
          .from("profiles")
          .select("id", { count: "exact", head: true }),
        supabase
          .from("orders")
          .select("amount")
          .eq("status", "completed"),
        supabase
          .from("orders")
          .select("*, products(name, slug, category), profiles(full_name, email)")
          .order("created_at", { ascending: false })
          .limit(10),
      ]);

    const totalRevenue = (revenueRes.data || []).reduce(
      (sum, o) => sum + (o.amount || 0),
      0
    );

    return NextResponse.json({
      success: true,
      data: {
        total_products: productsRes.count || 0,
        total_orders: ordersRes.count || 0,
        total_users: usersRes.count || 0,
        total_revenue: totalRevenue,
        recent_orders: recentOrdersRes.data || [],
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
