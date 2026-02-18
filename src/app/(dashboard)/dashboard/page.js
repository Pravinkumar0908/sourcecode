import Link from "next/link";
import { getCurrentUser } from "../../../lib/auth";
import { createClient } from "../../../lib/supabase/server";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  // Fetch user's orders from Supabase
  let orders = [];
  let totalSpent = 0;
  let totalDownloads = 0;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("orders")
      .select("*, products(name, slug, category)")
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false });
    if (data) {
      orders = data;
      totalSpent = data.reduce((sum, o) => sum + (o.amount || 0), 0);
      totalDownloads = data.filter((o) => o.status === "completed").length * 4; // estimate
    }
  } catch {}

  const stats = [
    { label: "Total Purchases", value: String(orders.length), icon: "📦", change: `${orders.filter((o) => { const d = new Date(o.created_at); const now = new Date(); return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); }).length} this month` },
    { label: "Downloads", value: String(totalDownloads), icon: "⬇️", change: "Keep building!" },
    { label: "Total Spent", value: `₹${totalSpent.toLocaleString("en-IN")}`, icon: "💰", change: "Lifetime value" },
    { label: "Support Tickets", value: "0", icon: "🎫", change: "All resolved" },
  ];

  const recentPurchases = orders.slice(0, 3).map((o) => ({
    name: o.products?.name || o.product_name || "Product",
    date: new Date(o.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
    price: `₹${(o.amount || 0).toLocaleString("en-IN")}`,
    status: o.status === "completed" ? "Completed" : o.status,
  }));
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white mb-2">Dashboard</h1>
        <p className="text-sm text-white/40">Welcome back{user?.full_name ? `, ${user.full_name}` : ""}! Here&apos;s your account overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl p-5"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="text-2xl mb-3">{stat.icon}</div>
            <div
              className="text-2xl font-black mb-1"
              style={{
                background: "linear-gradient(135deg, #facc15, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {stat.value}
            </div>
            <div className="text-xs font-medium text-white/50 mb-1">{stat.label}</div>
            <div className="text-[10px] text-green-400/70">{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Recent Purchases */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">Recent Purchases</h2>
          <Link href="/dashboard/purchases" className="text-xs text-yellow-400/70 hover:text-yellow-400 transition-colors">
            View All →
          </Link>
        </div>

        <div className="space-y-3">
          {recentPurchases.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between p-4 rounded-xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.04)" }}
            >
              <div>
                <p className="text-sm font-semibold text-white mb-0.5">{item.name}</p>
                <p className="text-xs text-white/30">{item.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-white">{item.price}</p>
                <p className="text-[10px] text-green-400">{item.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Link
          href="/products"
          className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
          style={{
            background: "linear-gradient(135deg, rgba(250,204,21,0.08), rgba(236,72,153,0.08))",
            border: "1px solid rgba(250,204,21,0.12)",
          }}
        >
          <h3 className="text-sm font-bold text-white mb-1">Browse Products</h3>
          <p className="text-xs text-white/35">Explore our latest source codes →</p>
        </Link>
        <Link
          href="/dashboard/settings"
          className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h3 className="text-sm font-bold text-white mb-1">Account Settings</h3>
          <p className="text-xs text-white/35">Update your profile & preferences →</p>
        </Link>
      </div>
    </div>
  );
}
