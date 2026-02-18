import { products as fallbackProducts } from "../../../../data/products";
import { formatPrice } from "../../../../lib/helpers";
import { createClient } from "../../../../lib/supabase/server";

export default async function AdminProductsPage() {
  let products = fallbackProducts;

  try {
    const supabase = await createClient();
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (data && data.length > 0) {
      products = data.map((p) => ({
        ...p,
        originalPrice: p.original_price || p.price,
        techStack: p.tech_stack || [],
        reviews: p.reviews_count || 0,
      }));
    }
  } catch {}

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Products</h1>
          <p className="text-sm text-white/40">Manage your source code products ({products.length} total).</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl text-sm font-bold text-black transition-all hover:scale-105 shrink-0" style={{ background: "linear-gradient(135deg, #facc15, #f472b6, #fff)" }}>+ Add Product</button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-semibold text-white/30 uppercase tracking-wider border-b border-white/5">
          <div className="col-span-1">ID</div>
          <div className="col-span-3">Name</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-1">Price</div>
          <div className="col-span-1">Rating</div>
          <div className="col-span-2">Downloads</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>
        {products.map((p) => (
          <div key={p.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
            <div className="col-span-1 text-xs text-white/30">#{p.id}</div>
            <div className="col-span-3">
              <p className="text-sm font-semibold text-white line-clamp-1">{p.name}</p>
              <div className="flex gap-1 mt-1">{(p.tags || []).slice(0, 2).map(t => <span key={t} className="text-[9px] px-1.5 py-0.5 rounded text-white/25" style={{ background: "rgba(255,255,255,0.04)" }}>{t}</span>)}</div>
            </div>
            <div className="col-span-2 text-xs text-white/40">{p.category}</div>
            <div className="col-span-1 text-sm font-bold" style={{ background: "linear-gradient(135deg, #facc15, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{formatPrice(p.price)}</div>
            <div className="col-span-1 flex items-center gap-1">
              <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              <span className="text-xs text-white/50">{p.rating}</span>
            </div>
            <div className="col-span-2 text-sm text-white/40">{(p.downloads || 0).toLocaleString()}</div>
            <div className="col-span-2 flex items-center justify-end gap-2">
              <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-white/50 hover:text-white transition-colors" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>Edit</button>
              <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-400/60 hover:text-red-400 transition-colors" style={{ border: "1px solid rgba(239,68,68,0.15)" }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {products.map((p) => (
          <div key={p.id} className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-semibold text-white">{p.name}</p>
                <p className="text-xs text-white/30 mt-0.5">{p.category}</p>
              </div>
              <span className="text-sm font-bold" style={{ background: "linear-gradient(135deg, #facc15, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{formatPrice(p.price)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-xs text-white/40"><svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>{p.rating}</span>
                <span className="text-xs text-white/30">{(p.downloads || 0).toLocaleString()} downloads</span>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-white/50" style={{ background: "rgba(255,255,255,0.05)" }}>Edit</button>
                <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-400/60" style={{ border: "1px solid rgba(239,68,68,0.15)" }}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
