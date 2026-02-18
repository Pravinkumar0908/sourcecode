import { createClient } from "../../../../lib/supabase/server";

export default async function AdminMessagesPage() {
  let messages = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) messages = data;
  } catch {}

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white mb-2">Messages</h1>
        <p className="text-sm text-white/40">Customer contact messages ({messages.length} total).</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Messages", value: String(messages.length), icon: "💬" },
          { label: "This Month", value: String(messages.filter(m => { const d = new Date(m.created_at); const n = new Date(); return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear(); }).length), icon: "📅" },
          { label: "Unread", value: String(messages.filter(m => !m.is_read).length), icon: "🔔" },
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

      <div className="space-y-3">
        {messages.length === 0 && (
          <div className="rounded-2xl px-6 py-12 text-center text-white/30 text-sm" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.06)" }}>No messages yet.</div>
        )}

        {messages.map((m) => (
          <div key={m.id} className="rounded-2xl p-5 transition-all hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))", border: `1px solid ${m.is_read ? "rgba(255,255,255,0.06)" : "rgba(250,204,21,0.15)"}` }}>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-black shrink-0" style={{ background: "linear-gradient(135deg, #facc15, #f472b6)" }}>{(m.name || "U").charAt(0).toUpperCase()}</div>
                  <div>
                    <p className="text-sm font-semibold text-white">{m.name || "Unknown"}</p>
                    <p className="text-[10px] text-white/30">{m.email || ""}</p>
                  </div>
                  {!m.is_read && <span className="ml-2 w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />}
                </div>
                {m.subject && <p className="text-xs font-semibold text-white/60 mb-1">{m.subject}</p>}
                <p className="text-sm text-white/40 leading-relaxed">{m.message}</p>
              </div>
              <div className="text-xs text-white/20 shrink-0">{new Date(m.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
