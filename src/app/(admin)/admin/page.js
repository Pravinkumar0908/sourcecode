import { createClient } from "../../../lib/supabase/server";

export default async function AdminPage() {
  let adminStats = [
    { label: "Total Revenue", value: "₹0", change: "—", icon: "💰" },
    { label: "Total Orders", value: "0", change: "—", icon: "📦" },
    { label: "Active Users", value: "0", change: "—", icon: "👥" },
    { label: "Products", value: "0", change: "—", icon: "🎯" },
  ];
  let recentOrders = [];

  try {
    const supabase = await createClient();

    const [productsRes, ordersRes, usersRes, revenueRes, recentRes] = await Promise.all([
      supabase.from("products").select("id", { count: "exact", head: true }).eq("is_active", true),
      supabase.from("orders").select("id", { count: "exact", head: true }),
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase.from("orders").select("amount").eq("status", "completed"),
      supabase.from("orders").select("*, products(name, slug, category), profiles(full_name, email)").order("created_at", { ascending: false }).limit(5),
    ]);

    const totalRevenue = (revenueRes.data || []).reduce((sum, o) => sum + (o.amount || 0), 0);

    adminStats = [
      { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}`, change: "+12.5%", icon: "💰" },
      { label: "Total Orders", value: (ordersRes.count || 0).toLocaleString(), change: "+8.2%", icon: "📦" },
      { label: "Active Users", value: (usersRes.count || 0).toLocaleString(), change: "+15.3%", icon: "👥" },
      { label: "Products", value: String(productsRes.count || 0), change: "Active", icon: "🎯" },
    ];

    recentOrders = (recentRes.data || []).map((o, i) => ({
      id: o.order_number || `#${1234 - i}`,
      user: o.profiles?.full_name || o.profiles?.email || "User",
      product: o.products?.name || o.product_name || "Product",
      amount: `₹${(o.amount || 0).toLocaleString("en-IN")}`,
      date: new Date(o.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
    }));
  } catch {}
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white mb-2">Admin Overview</h1>
        <p className="text-sm text-white/40">Monitor your store performance and manage everything.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((stat) => (
          <div key={stat.label} className="rounded-2xl p-5" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-[10px] font-bold text-green-400 px-2 py-0.5 rounded-full bg-green-400/10">{stat.change}</span>
            </div>
            <div className="text-2xl font-black mb-1" style={{ background: "linear-gradient(135deg, #facc15, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{stat.value}</div>
            <div className="text-xs text-white/40">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="rounded-2xl p-6" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h2 className="text-lg font-bold text-white mb-6">Revenue Overview</h2>
        <div className="h-48 flex items-end justify-between gap-2 px-4">
          {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
            <div key={i} className="flex-1 rounded-t-lg transition-all duration-300 hover:opacity-80" style={{ height: `${h}%`, background: `linear-gradient(180deg, #facc15, #ec4899)`, opacity: 0.6 + (h / 250) }} />
          ))}
        </div>
        <div className="flex justify-between mt-3 px-4">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
            <span key={m} className="text-[10px] text-white/20">{m}</span>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="px-6 py-4 border-b border-white/5">
          <h2 className="text-lg font-bold text-white">Recent Orders</h2>
        </div>

        {recentOrders.map((order) => (
          <div key={order.id} className="flex items-center justify-between px-6 py-4 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-white/30">{order.id}</span>
              <div>
                <p className="text-sm font-semibold text-white">{order.product}</p>
                <p className="text-xs text-white/30">by {order.user}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-white">{order.amount}</p>
              <p className="text-[10px] text-white/25">{order.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
