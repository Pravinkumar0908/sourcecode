"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed.");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-28">
      {/* Background orbs */}
      <div className="fixed top-1/3 left-1/4 w-80 h-80 rounded-full blur-[150px] opacity-[0.06]" style={{ background: "#facc15" }} />
      <div className="fixed bottom-1/3 right-1/4 w-64 h-64 rounded-full blur-[120px] opacity-[0.05]" style={{ background: "#ec4899" }} />

      <div className="w-full max-w-md relative">
        <div
          className="rounded-3xl p-8 md:p-10"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(250,204,21,0.03), rgba(236,72,153,0.03))",
            backdropFilter: "blur(30px) saturate(1.6)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 32px 64px rgba(0,0,0,0.4)",
          }}
        >
          {/* Gradient glow */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent rounded-t-3xl" />

          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(250,204,21,0.2), rgba(236,72,153,0.2))", border: "1px solid rgba(255,255,255,0.1)" }}>
              <span className="text-lg font-black" style={{ background: "linear-gradient(135deg, #facc15, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>CV</span>
            </div>
            <h1 className="text-2xl font-black text-white mb-2">Welcome Back</h1>
            <p className="text-sm text-white/35">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-xl px-4 py-3 text-sm text-red-300 border border-red-500/20" style={{ background: "rgba(239,68,68,0.08)" }}>
                {error}
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-white/40">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:ring-2 focus:ring-yellow-400/30 transition-all"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-white/40">Password</label>
                <Link href="/forgot-password" className="text-xs text-yellow-400/70 hover:text-yellow-400 transition-colors">Forgot password?</Link>
              </div>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:ring-2 focus:ring-yellow-400/30 transition-all"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-black transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-yellow-400/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{ background: "linear-gradient(135deg, #facc15, #f472b6, #fff)" }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-[1px] bg-white/[0.08]" />
            <span className="text-xs text-white/20">or</span>
            <div className="flex-1 h-[1px] bg-white/[0.08]" />
          </div>

          {/* Social Login */}
          <button
            type="button"
            onClick={async () => {
              try {
                const { createClient } = await import("../../../lib/supabase/client");
                const supabase = createClient();
                await supabase.auth.signInWithOAuth({
                  provider: "github",
                  options: { redirectTo: `${window.location.origin}/auth/callback` },
                });
              } catch { setError("GitHub login failed. Please try again."); }
            }}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-medium text-white/60 hover:text-white transition-all"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            Continue with GitHub
          </button>

          <p className="text-center text-sm text-white/25 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors">
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
