import { createClient } from "../../../../lib/supabase/server";

export default async function AdminUsersPage() {
  let users = [];
  let totalUsers = 0;
  let newThisMonth = 0;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    // Fetch order counts per user
    const { data: orders } = await supabase
      .from("orders")
      .select("user_id");
    const orderCounts = {};
    if (orders) orders.forEach((o) => { orderCounts[o.user_id] = (orderCounts[o.user_id] || 0) + 1; });

    if (data) {
      const now = new Date();
      users = data.map((u, i) => ({
        id: i + 1,
        name: u.full_name || "No name",
        email: u.email || "",
        role: u.role === "admin" ? "Admin" : "Customer",
        purchases: orderCounts[u.id] || 0,
        joined: new Date(u.created_at).toISOString().split("T")[0],
        status: "Active",
        dbId: u.id,
      }));
      totalUsers = data.length;
      newThisMonth = data.filter((u) => {
        const d = new Date(u.created_at);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      }).length;
    }
  } catch {}
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Users</h1>
          <p className="text-sm text-white/40">Manage registered users and roles ({totalUsers} total).</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" placeholder="Search users…" className="pl-9 pr-4 py-2 rounded-xl text-sm text-white/70 placeholder-white/20 outline-none w-full sm:w-56 focus:ring-1 focus:ring-yellow-400/30" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.06)" }} />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Users", value: totalUsers.toLocaleString(), icon: "👥" },
          { label: "Active", value: totalUsers.toLocaleString(), icon: "🟢" },
          { label: "New This Month", value: String(newThisMonth), icon: "📈" },
        ].map((s) => (
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

      {/* Desktop Table */}
      <div className="hidden md:block rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-semibold text-white/30 uppercase tracking-wider border-b border-white/5">
          <div className="col-span-1">ID</div>
          <div className="col-span-3">Name</div>
          <div className="col-span-3">Email</div>
          <div className="col-span-1">Role</div>
          <div className="col-span-1">Purchases</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {users.map((u) => (
          <div key={u.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
            <div className="col-span-1 text-xs text-white/30">#{u.id}</div>
            <div className="col-span-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black shrink-0" style={{ background: "linear-gradient(135deg, #facc15, #f472b6)" }}>
                  {u.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{u.name}</p>
                  <p className="text-[10px] text-white/25">Joined {u.joined}</p>
                </div>
              </div>
            </div>
            <div className="col-span-3 text-sm text-white/40 truncate">{u.email}</div>
            <div className="col-span-1">
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${u.role === "Admin" ? "text-yellow-300" : "text-white/40"}`} style={{ background: u.role === "Admin" ? "rgba(250,204,21,0.1)" : "rgba(255,255,255,0.04)", border: `1px solid ${u.role === "Admin" ? "rgba(250,204,21,0.2)" : "rgba(255,255,255,0.06)"}` }}>
                {u.role}
              </span>
            </div>
            <div className="col-span-1 text-sm text-white/40 text-center">{u.purchases}</div>
            <div className="col-span-1">
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${u.status === "Active" ? "text-emerald-400" : "text-white/30"}`} style={{ background: u.status === "Active" ? "rgba(52,211,153,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${u.status === "Active" ? "rgba(52,211,153,0.15)" : "rgba(255,255,255,0.05)"}` }}>
                {u.status}
              </span>
            </div>
            <div className="col-span-2 flex items-center justify-end gap-2">
              <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-white/50 hover:text-white transition-colors" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>View</button>
              <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-400/60 hover:text-red-400 transition-colors" style={{ border: "1px solid rgba(239,68,68,0.15)" }}>Ban</button>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {users.map((u) => (
          <div key={u.id} className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-black shrink-0" style={{ background: "linear-gradient(135deg, #facc15, #f472b6)" }}>
                {u.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">{u.name}</p>
                <p className="text-xs text-white/30 truncate">{u.email}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0 ${u.role === "Admin" ? "text-yellow-300" : "text-white/40"}`} style={{ background: u.role === "Admin" ? "rgba(250,204,21,0.1)" : "rgba(255,255,255,0.04)", border: `1px solid ${u.role === "Admin" ? "rgba(250,204,21,0.2)" : "rgba(255,255,255,0.06)"}` }}>
                {u.role}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs text-white/25">Joined {u.joined}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold text-emerald-400`} style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.15)" }}>{u.status}</span>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-white/50" style={{ background: "rgba(255,255,255,0.05)" }}>View</button>
                <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-400/60" style={{ border: "1px solid rgba(239,68,68,0.15)" }}>Ban</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
