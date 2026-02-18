import { createClient } from "../../../../lib/supabase/server";

export default async function AdminOrdersPage() {
  let orders = [];
  let totalRevenue = 0;
  let totalOrders = 0;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("orders")
      .select("*, products(name, slug, category), profiles(full_name, email)")
      .order("created_at", { ascending: false });
    if (data) {
      orders = data;
      totalOrders = data.length;
      totalRevenue = data.filter(o => o.status === "completed").reduce((s, o) => s + (o.amount || 0), 0);
    }
  } catch {}

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white mb-2">Orders</h1>
        <p className="text-sm text-white/40">Manage all customer orders.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Orders", value: totalOrders.toLocaleString(), icon: "📦" },
          { label: "Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}`, icon: "💰" },
          { label: "Completed", value: String(orders.filter(o => o.status === "completed").length), icon: "✅" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-3">
              <span className="text-xl">{s.icon}</span>
              <div>
                <p className="text-xs text-white/30 uppercase tracking-wider">{s.label}</p>
                <p className="text-xl font-black text-white mt-0.5">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-xs font-semibold text-white/30 uppercase tracking-wider border-b border-white/5">
          <div className="col-span-2">Order ID</div>
          <div className="col-span-3">Customer</div>
          <div className="col-span-3">Product</div>
          <div className="col-span-1">Amount</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2">Date</div>
        </div>

        {orders.length === 0 && (
          <div className="px-6 py-12 text-center text-white/30 text-sm">No orders yet.</div>
        )}

        {orders.map((o, i) => (
          <div key={o.id || i} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 items-center border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
            <div className="md:col-span-2 text-xs text-white/30 font-mono">{o.order_number || `#${String(i + 1).padStart(4, "0")}`}</div>
            <div className="md:col-span-3">
              <p className="text-sm font-semibold text-white">{o.profiles?.full_name || "User"}</p>
              <p className="text-[10px] text-white/25">{o.profiles?.email || ""}</p>
            </div>
            <div className="md:col-span-3 text-sm text-white/50">{o.products?.name || o.product_name || "Product"}</div>
            <div className="md:col-span-1 text-sm font-bold" style={{ background: "linear-gradient(135deg, #facc15, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>₹{(o.amount || 0).toLocaleString("en-IN")}</div>
            <div className="md:col-span-1">
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${o.status === "completed" ? "text-emerald-400 bg-emerald-400/10" : o.status === "pending" ? "text-yellow-400 bg-yellow-400/10" : "text-white/40 bg-white/5"}`}>{o.status || "pending"}</span>
            </div>
            <div className="md:col-span-2 text-xs text-white/30">{new Date(o.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
