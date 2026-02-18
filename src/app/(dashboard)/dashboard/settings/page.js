"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SettingsContent() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
  });
  const [passwords, setPasswords] = useState({ newPassword: "", confirmPassword: "" });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwError, setPwError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const isReset = searchParams.get("reset") === "true";

  // Fetch user profile on mount
  useEffect(() => {
    async function loadProfile() {
      try {
        const { createClient } = await import("../../../../lib/supabase/client");
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();
          setProfile({
            name: profileData?.full_name || "",
            email: user.email || "",
            bio: profileData?.bio || "",
          });
        }
      } catch {}
    }
    loadProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { createClient } = await import("../../../../lib/supabase/client");
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("profiles").update({
          full_name: profile.name,
          bio: profile.bio,
        }).eq("id", user.id);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {}
    setLoading(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPwError("");
    setPwSuccess(false);
    if (passwords.newPassword.length < 6) { setPwError("Password must be at least 6 characters."); return; }
    if (passwords.newPassword !== passwords.confirmPassword) { setPwError("Passwords do not match."); return; }
    setPwLoading(true);
    try {
      const { createClient } = await import("../../../../lib/supabase/client");
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password: passwords.newPassword });
      if (error) { setPwError(error.message); } else {
        setPwSuccess(true);
        setPasswords({ newPassword: "", confirmPassword: "" });
        setTimeout(() => setPwSuccess(false), 3000);
      }
    } catch { setPwError("Something went wrong. Please try again."); }
    setPwLoading(false);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch {}
  };

  const userInitial = profile.name ? profile.name.charAt(0).toUpperCase() : profile.email ? profile.email.charAt(0).toUpperCase() : "U";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white mb-2">Settings</h1>
        <p className="text-sm text-white/40">Manage your account settings and preferences.</p>
      </div>

      {isReset && (
        <div className="rounded-2xl px-5 py-4 text-sm text-yellow-300 border border-yellow-400/20" style={{ background: "rgba(250,204,21,0.08)" }}>
          🔑 You&apos;re here via password reset. Please set your new password below.
        </div>
      )}

      {/* Profile Section */}
      <div className="rounded-2xl p-6" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h2 className="text-lg font-bold text-white mb-6">Profile Information</h2>

        <form onSubmit={handleSave} className="space-y-5 max-w-lg">
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-black" style={{ background: "linear-gradient(135deg, #facc15, #f472b6)" }}>
              {userInitial}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Profile Photo</p>
              <p className="text-xs text-white/30">Avatar based on your name</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-white/40">Full Name</label>
            <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-yellow-400/30 transition-all" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-white/40">Email</label>
            <input type="email" value={profile.email} disabled className="w-full rounded-xl px-4 py-3 text-sm text-white/40 outline-none cursor-not-allowed" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }} />
            <p className="text-[10px] text-white/20">Email cannot be changed</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-white/40">Bio</label>
            <textarea rows={3} value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-yellow-400/30 transition-all resize-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }} />
          </div>

          <button type="submit" disabled={loading} className="px-6 py-3 rounded-xl text-sm font-bold text-black transition-all duration-300 hover:scale-[1.02] disabled:opacity-50" style={{ background: "linear-gradient(135deg, #facc15, #f472b6, #fff)" }}>
            {loading ? "Saving..." : saved ? "✓ Saved!" : "Save Changes"}
          </button>
        </form>
      </div>

      {/* Password Section */}
      <div className="rounded-2xl p-6" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h2 className="text-lg font-bold text-white mb-6">{isReset ? "Set New Password" : "Change Password"}</h2>
        <form onSubmit={handlePasswordChange} className="space-y-5 max-w-lg">
          {pwError && (
            <div className="rounded-xl px-4 py-3 text-sm text-red-300 border border-red-500/20" style={{ background: "rgba(239,68,68,0.08)" }}>{pwError}</div>
          )}
          {pwSuccess && (
            <div className="rounded-xl px-4 py-3 text-sm text-green-300 border border-green-500/20" style={{ background: "rgba(74,222,128,0.08)" }}>✓ Password updated successfully!</div>
          )}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-white/40">New Password</label>
            <input type="password" required minLength={6} value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} placeholder="Min. 6 characters" className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:ring-2 focus:ring-yellow-400/30 transition-all" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-white/40">Confirm New Password</label>
            <input type="password" required minLength={6} value={passwords.confirmPassword} onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })} placeholder="Repeat your password" className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:ring-2 focus:ring-yellow-400/30 transition-all" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }} />
          </div>
          <button type="submit" disabled={pwLoading} className="px-6 py-3 rounded-xl text-sm font-semibold text-white/70 transition-all hover:text-white disabled:opacity-50" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
            {pwLoading ? "Updating..." : pwSuccess ? "✓ Updated!" : "Update Password"}
          </button>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="rounded-2xl p-6" style={{ background: "linear-gradient(135deg, rgba(239,68,68,0.05), rgba(255,255,255,0.02))", border: "1px solid rgba(239,68,68,0.1)" }}>
        <h2 className="text-lg font-bold text-red-400/80 mb-2">Danger Zone</h2>
        <p className="text-sm text-white/30 mb-4">Once you delete your account, there&apos;s no going back.</p>
        <div className="flex items-center gap-3">
          <button onClick={handleLogout} className="px-5 py-2.5 rounded-xl text-xs font-bold text-yellow-400 transition-all hover:bg-yellow-400/10" style={{ border: "1px solid rgba(250,204,21,0.2)" }}>
            Sign Out
          </button>
          <button className="px-5 py-2.5 rounded-xl text-xs font-bold text-red-400 transition-all hover:bg-red-400/10" style={{ border: "1px solid rgba(239,68,68,0.2)" }}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardSettingsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><div className="w-8 h-8 border-2 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin" /></div>}>
      <SettingsContent />
    </Suspense>
  );
}
