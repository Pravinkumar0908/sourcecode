import Link from "next/link";
import { getCurrentUser } from "../../../../lib/auth";
import { createClient } from "../../../../lib/supabase/server";

export default async function DashboardPurchasesPage() {
  const user = await getCurrentUser();

  let purchases = [];
  let totalSpent = 0;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("orders")
      .select("*, products(name, slug, image_url, category)")
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false });
    if (data) {
      purchases = data.map((o, i) => ({
        id: o.order_number || `ORD-${String(i + 1).padStart(3, "0")}`,
        name: o.products?.name || o.product_name || "Product",
        date: new Date(o.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
        price: `₹${(o.amount || 0).toLocaleString("en-IN")}`,
        status: o.status === "completed" ? "Completed" : o.status,
        downloadUrl: "#",
      }));
      totalSpent = data.reduce((sum, o) => sum + (o.amount || 0), 0);
    }
  } catch {}
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white mb-2">My Purchases</h1>
        <p className="text-sm text-white/40">All your purchased source codes and download links.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Spent", value: `₹${totalSpent.toLocaleString("en-IN")}` },
          { label: "Items Purchased", value: String(purchases.length) },
          { label: "Total Downloads", value: String(purchases.length * 4) },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-5 text-center" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="text-xl font-black mb-1" style={{ background: "linear-gradient(135deg, #facc15, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</div>
            <div className="text-xs text-white/40">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Purchases List */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.06)" }}>
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-semibold text-white/30 uppercase tracking-wider border-b border-white/5">
          <div className="col-span-1">ID</div>
          <div className="col-span-4">Product</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2 text-right">Action</div>
        </div>

        {/* Rows */}
        {purchases.map((p) => (
          <div key={p.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
            <div className="col-span-1 text-xs text-white/30 font-mono">{p.id}</div>
            <div className="col-span-4 text-sm font-semibold text-white">{p.name}</div>
            <div className="col-span-2 text-xs text-white/40">{p.date}</div>
            <div className="col-span-2 text-sm font-bold text-white">{p.price}</div>
            <div className="col-span-1">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-green-400 bg-green-400/10">{p.status}</span>
            </div>
            <div className="col-span-2 text-right">
              <button className="px-3 py-1.5 rounded-lg text-xs font-semibold text-black transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #facc15, #f472b6)" }}>
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Browse More */}
      <div className="text-center">
        <Link href="/products" className="text-sm text-yellow-400/70 hover:text-yellow-400 transition-colors">
          Browse more source codes →
        </Link>
      </div>
    </div>
  );
}
