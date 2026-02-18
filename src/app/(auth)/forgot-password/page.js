"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to send reset link.");
        setLoading(false);
        return;
      }

      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-28">
      <div className="fixed top-1/3 left-1/3 w-72 h-72 rounded-full blur-[140px] opacity-[0.06]" style={{ background: "#facc15" }} />

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
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent rounded-t-3xl" />

          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(250,204,21,0.2), rgba(236,72,153,0.2))", border: "1px solid rgba(255,255,255,0.1)" }}>
              <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <h1 className="text-2xl font-black text-white mb-2">Forgot Password?</h1>
            <p className="text-sm text-white/35">Enter your email and we&apos;ll send you a reset link</p>
          </div>

          {sent ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(74,222,128,0.15), rgba(34,197,94,0.15))", border: "1px solid rgba(74,222,128,0.2)" }}>
                <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm text-white/50">We&apos;ve sent a password reset link to <span className="text-yellow-400 font-medium">{email}</span></p>
              <Link href="/login" className="inline-block text-sm text-yellow-400 hover:text-yellow-300 font-medium transition-colors">← Back to Login</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="rounded-xl px-4 py-3 text-sm text-red-300 border border-red-500/20" style={{ background: "rgba(239,68,68,0.08)" }}>
                  {error}
                </div>
              )}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-white/40">Email Address</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:ring-2 focus:ring-yellow-400/30 transition-all" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }} />
              </div>

              <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl text-sm font-bold text-black transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-yellow-400/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100" style={{ background: "linear-gradient(135deg, #facc15, #f472b6, #fff)" }}>
                {loading ? "Sending..." : "Send Reset Link"}
              </button>

              <p className="text-center text-sm text-white/25">
                Remember your password?{" "}
                <Link href="/login" className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors">Sign In</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
