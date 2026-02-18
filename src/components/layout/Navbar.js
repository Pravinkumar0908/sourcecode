"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const { createClient } = await import("../../lib/supabase/client");
        const supabase = createClient();
        const { data: { user: authUser } } = await supabase.auth.getUser();
        setUser(authUser);
        if (authUser) {
          const { data: profileData } = await supabase
            .from("profiles").select("*").eq("id", authUser.id).single();
          setProfile(profileData);
        }
      } catch { setUser(null); setProfile(null); }
      setLoading(false);
    }
    checkAuth();
  }, []);

  useEffect(() => {
    let sub;
    async function listenAuth() {
      const { createClient } = await import("../../lib/supabase/client");
      const supabase = createClient();
      const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          setUser(session.user);
          const { data: p } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
          setProfile(p);
        } else if (event === "SIGNED_OUT") { setUser(null); setProfile(null); }
      });
      sub = data.subscription;
    }
    listenAuth();
    return () => { if (sub) sub.unsubscribe(); };
  }, []);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const h = () => setUserMenuOpen(false);
    if (userMenuOpen) { document.addEventListener("click", h); return () => document.removeEventListener("click", h); }
  }, [userMenuOpen]);

  const handleLogout = async () => {
    try { await fetch("/api/auth/logout", { method: "POST" }); } catch {}
    setUser(null); setProfile(null); setUserMenuOpen(false);
    router.push("/"); router.refresh();
  };

  const isAdmin = profile?.role === "admin";
  const userName = profile?.full_name || user?.email?.split("@")[0] || "User";
  const userInitial = userName.charAt(0).toUpperCase();

  const sidebarLinks = (() => {
    const base = [
      { name: "Home", href: "/", icon: "home" },
      { name: "Products", href: "/products", icon: "box" },
      { name: "Pricing", href: "/pricing", icon: "dollar" },
    ];
    if (user) {
      base.push(
        { name: "Dashboard", href: "/dashboard", icon: "grid" },
        { name: "My Purchases", href: "/dashboard/purchases", icon: "cart" },
        { name: "Settings", href: "/dashboard/settings", icon: "gear" }
      );
      if (isAdmin) base.push({ name: "Admin Panel", href: "/admin", icon: "shield" });
    } else {
      base.push(
        { name: "Login", href: "/login", icon: "login" },
        { name: "Register", href: "/register", icon: "register" }
      );
    }
    return base;
  })();

  const iconMap = {
    home: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" /></svg>,
    box: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
    dollar: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    grid: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>,
    cart: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" /></svg>,
    gear: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.573-1.066z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    shield: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    login: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>,
    register: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>,
  };

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-6xl" style={{ transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)" }}>
        <div className={`relative overflow-hidden rounded-2xl border transition-all duration-500 ${scrolled ? "border-white/15 bg-black/40 shadow-2xl shadow-pink-500/5" : "border-white/10 bg-white/5 shadow-lg"}`} style={{ backdropFilter: "blur(24px) saturate(1.6)" }}>
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />
          <div className="px-4 sm:px-6 py-3.5 flex items-center justify-between relative">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-yellow-400/30 transition-all duration-300" style={{ background: "linear-gradient(135deg, rgba(250,204,21,0.15), rgba(236,72,153,0.15))" }}>
                <span className="text-base font-black" style={{ background: "linear-gradient(135deg, #facc15, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>CV</span>
              </div>
              <span className="text-xl font-bold tracking-tight hidden sm:inline" style={{ background: "linear-gradient(135deg, #ffffff 0%, #facc15 50%, #ec4899 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Codevault</span>
            </Link>

            {/* Center Nav */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1">
              {navLinks.map((item) => (
                <Link key={item.name} href={item.href} onMouseEnter={() => setHoveredLink(item.name)} onMouseLeave={() => setHoveredLink(null)} className="relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300" style={{ color: hoveredLink === item.name ? "#facc15" : "rgba(255,255,255,0.75)" }}>
                  <span className="absolute inset-0 rounded-xl transition-all duration-300" style={{ background: hoveredLink === item.name ? "linear-gradient(135deg, rgba(250,204,21,0.08), rgba(236,72,153,0.08))" : "transparent", border: hoveredLink === item.name ? "1px solid rgba(250,204,21,0.15)" : "1px solid transparent" }} />
                  <span className="relative z-10">{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2 sm:gap-3">
              {!loading && (
                <>
                  {user ? (
                    <div className="hidden md:flex items-center gap-2">
                      {isAdmin && <Link href="/admin" className="px-3 py-1.5 rounded-lg text-xs font-bold text-yellow-400 border border-yellow-400/20 hover:bg-yellow-400/10 transition-all duration-300">Admin</Link>}
                      <Link href="/dashboard" className="px-3 py-1.5 rounded-lg text-xs font-medium text-white/60 hover:text-white border border-white/10 hover:border-white/20 transition-all duration-300">Dashboard</Link>

                      {/* User avatar dropdown */}
                      <div className="relative">
                        <button onClick={(e) => { e.stopPropagation(); setUserMenuOpen(!userMenuOpen); }} className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-white/10 hover:border-yellow-400/30 transition-all duration-300 group" style={{ background: "rgba(255,255,255,0.04)" }}>
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-black shrink-0" style={{ background: "linear-gradient(135deg, #facc15, #f472b6)" }}>{userInitial}</div>
                          <span className="text-sm font-medium text-white/70 group-hover:text-white max-w-[100px] truncate">{userName}</span>
                          <svg className={`w-3 h-3 text-white/30 transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                        </button>

                        {userMenuOpen && (
                          <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl py-2 overflow-hidden" style={{ background: "linear-gradient(180deg, rgba(30,30,40,0.98), rgba(20,20,30,0.98))", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(40px)", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }} onClick={(e) => e.stopPropagation()}>
                            <div className="px-4 py-3 border-b border-white/5">
                              <p className="text-sm font-semibold text-white">{userName}</p>
                              <p className="text-xs text-white/30 truncate">{user?.email}</p>
                              {isAdmin && <span className="inline-block mt-1 text-[9px] font-bold text-yellow-400 px-1.5 py-0.5 rounded bg-yellow-400/10 border border-yellow-400/20">ADMIN</span>}
                            </div>
                            <div className="py-1">
                              <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all" onClick={() => setUserMenuOpen(false)}>
                                {iconMap.grid && <span className="w-4 h-4">{iconMap.grid}</span>}
                                Dashboard
                              </Link>
                              <Link href="/dashboard/purchases" className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all" onClick={() => setUserMenuOpen(false)}>
                                {iconMap.cart && <span className="w-4 h-4">{iconMap.cart}</span>}
                                My Purchases
                              </Link>
                              <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all" onClick={() => setUserMenuOpen(false)}>
                                {iconMap.gear && <span className="w-4 h-4">{iconMap.gear}</span>}
                                Settings
                              </Link>
                              {isAdmin && (
                                <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm text-yellow-400/70 hover:text-yellow-400 hover:bg-yellow-400/5 transition-all" onClick={() => setUserMenuOpen(false)}>
                                  {iconMap.shield && <span className="w-4 h-4">{iconMap.shield}</span>}
                                  Admin Panel
                                </Link>
                              )}
                            </div>
                            <div className="border-t border-white/5 pt-1">
                              <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400/70 hover:text-red-400 hover:bg-red-400/5 transition-all">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                Sign Out
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="hidden md:flex items-center gap-2">
                      <Link href="/login" className="px-4 py-2 rounded-xl text-sm font-medium text-white/70 hover:text-white border border-white/10 hover:border-white/20 transition-all duration-300">Login</Link>
                      <Link href="/register" className="px-4 py-2 rounded-xl text-sm font-bold text-black transition-all duration-300 hover:scale-[1.04] hover:shadow-lg hover:shadow-yellow-400/20" style={{ background: "linear-gradient(135deg, #facc15, #f472b6, #ffffff)" }}>Register</Link>
                    </div>
                  )}
                </>
              )}

              {/* Hamburger */}
              <button onClick={() => setOpen(true)} className="relative w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 hover:border-yellow-400/30 transition-all duration-300 group md:hidden" style={{ background: "linear-gradient(135deg, rgba(250,204,21,0.06), rgba(236,72,153,0.06))" }} aria-label="Open menu">
                <div className="flex flex-col gap-[5px]">
                  <span className="block w-4 h-[2px] rounded-full bg-white/80 group-hover:bg-yellow-400 transition-all duration-300 group-hover:w-5" />
                  <span className="block w-5 h-[2px] rounded-full bg-white/80 group-hover:bg-pink-400 transition-all duration-300" />
                  <span className="block w-3 h-[2px] rounded-full bg-white/80 group-hover:bg-yellow-400 transition-all duration-300 group-hover:w-5" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-50 transition-all duration-500 md:hidden ${open ? "visible" : "invisible pointer-events-none"}`}>
        <div onClick={() => setOpen(false)} className={`absolute inset-0 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`} style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} />
        <aside className={`absolute right-3 top-3 bottom-3 w-[85%] max-w-80 rounded-3xl overflow-hidden transition-all duration-500 ${open ? "translate-x-0 opacity-100 scale-100" : "translate-x-8 opacity-0 scale-[0.97]"}`} style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(250,204,21,0.04) 50%, rgba(236,72,153,0.04) 100%)", backdropFilter: "blur(40px) saturate(1.8)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 32px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)" }}>
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
          <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full blur-3xl opacity-20" style={{ background: "linear-gradient(135deg, #facc15, #ec4899)" }} />
          <div className="relative p-6 flex flex-col h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(250,204,21,0.2), rgba(236,72,153,0.2))", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <span className="text-sm font-black" style={{ background: "linear-gradient(135deg, #facc15, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>CV</span>
                </div>
                <span className="text-lg font-bold tracking-tight" style={{ background: "linear-gradient(135deg, #fff 0%, #facc15 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Codevault</span>
              </div>
              <button onClick={() => setOpen(false)} className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10 hover:border-pink-400/30 hover:bg-pink-400/10 transition-all duration-300" aria-label="Close menu">
                <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {user && (
              <div className="rounded-2xl p-4 mb-5" style={{ background: "linear-gradient(135deg, rgba(250,204,21,0.08), rgba(236,72,153,0.08))", border: "1px solid rgba(250,204,21,0.15)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-black shrink-0" style={{ background: "linear-gradient(135deg, #facc15, #f472b6)" }}>{userInitial}</div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{userName}</p>
                    <p className="text-xs text-white/30 truncate">{user?.email}</p>
                    {isAdmin && <span className="inline-block mt-0.5 text-[8px] font-bold text-yellow-400 px-1.5 py-0.5 rounded bg-yellow-400/10 border border-yellow-400/20">ADMIN</span>}
                  </div>
                </div>
              </div>
            )}

            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-5" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-3 px-3">Menu</p>

            <div className="flex flex-col gap-1">
              {sidebarLinks.map((item, i) => (
                <Link key={item.name} href={item.href} onClick={() => setOpen(false)} className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300">
                  <span className="text-white/40 group-hover:text-yellow-400 transition-colors duration-300">{iconMap[item.icon]}</span>
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              ))}
            </div>

            <div className="flex-1" />

            {user ? (
              <button onClick={() => { setOpen(false); handleLogout(); }} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-400/5 transition-all mt-4 w-full" style={{ border: "1px solid rgba(239,68,68,0.15)" }}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                Sign Out
              </button>
            ) : (
              <div className="p-4 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(250,204,21,0.1), rgba(236,72,153,0.1))", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="text-sm font-semibold text-white/90 mb-1">Join Codevault</p>
                <p className="text-xs text-white/50 mb-3 leading-relaxed">Get access to premium source codes.</p>
                <Link href="/register" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-black transition-all duration-300 hover:scale-[1.03]" style={{ background: "linear-gradient(135deg, #facc15, #f472b6, #fff)" }}>
                  Get Started
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </Link>
              </div>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}
