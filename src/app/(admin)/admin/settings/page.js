"use client";

import { useState, useEffect } from "react";

export default function AdminSettingsPage() {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const { createClient } = await import("../../../../lib/supabase/client");
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: p } = await supabase.from("profiles").select("*").eq("id", user.id).single();
          setProfile({ name: p?.full_name || "", email: user.email || "" });
        }
      } catch {}
    }
    load();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { createClient } = await import("../../../../lib/supabase/client");
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("profiles").update({ full_name: profile.name }).eq("id", user.id);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {}
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white mb-2">Admin Settings</h1>
        <p className="text-sm text-white/40">Manage admin profile and site configuration.</p>
      </div>

      <div className="rounded-2xl p-6" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h2 className="text-lg font-bold text-white mb-6">Admin Profile</h2>
        <form onSubmit={handleSave} className="space-y-5 max-w-lg">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-white/40">Full Name</label>
            <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-yellow-400/30 transition-all" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-white/40">Email</label>
            <input type="email" value={profile.email} disabled className="w-full rounded-xl px-4 py-3 text-sm text-white/40 outline-none cursor-not-allowed" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }} />
          </div>
          <button type="submit" disabled={loading} className="px-6 py-3 rounded-xl text-sm font-bold text-black transition-all duration-300 hover:scale-[1.02] disabled:opacity-50" style={{ background: "linear-gradient(135deg, #facc15, #f472b6, #fff)" }}>
            {loading ? "Saving..." : saved ? "✓ Saved!" : "Save Changes"}
          </button>
        </form>
      </div>

      <div className="rounded-2xl p-6" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h2 className="text-lg font-bold text-white mb-4">Site Configuration</h2>
        <p className="text-sm text-white/30">Site-wide settings will be available here in future updates.</p>
      </div>
    </div>
  );
}
