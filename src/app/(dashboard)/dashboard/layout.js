"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const dashLinks = [
  { name: "Dashboard", href: "/dashboard", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" /></svg> },
  { name: "Purchases", href: "/dashboard/purchases", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" /></svg> },
  { name: "Settings", href: "/dashboard/settings", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.573-1.066z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  useEffect(() => { setSidebarOpen(false); }, [pathname]);

  const SidebarContent = () => (
    <>
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25 mb-4 px-3">Dashboard</p>
      <nav className="flex flex-col gap-1">
        {dashLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link key={link.href} href={link.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${isActive ? "text-white" : "text-white/50 hover:text-white"}`} style={isActive ? { background: "linear-gradient(135deg, rgba(250,204,21,0.1), rgba(236,72,153,0.1))", border: "1px solid rgba(250,204,21,0.15)" } : { border: "1px solid transparent" }}>
              <span className={isActive ? "text-yellow-400" : "text-white/30"}>{link.icon}</span>
              {link.name}
            </Link>
          );
        })}
      </nav>
      <div className="flex-1" />
      <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-4" />
      <Link href="/products" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white transition-all">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
        Browse Products
      </Link>
    </>
  );

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-60 shrink-0 rounded-2xl p-5 h-fit sticky top-24" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(20px)" }}>
          <SidebarContent />
        </aside>

        {/* Mobile Sidebar Toggle */}
        <button onClick={() => setSidebarOpen(true)} className="fixed bottom-6 right-6 z-30 lg:hidden w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl" style={{ background: "linear-gradient(135deg, #facc15, #ec4899)", boxShadow: "0 8px 32px rgba(250,204,21,0.3)" }}>
          <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>

        {/* Mobile Sidebar */}
        <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ${sidebarOpen ? "visible" : "invisible pointer-events-none"}`}>
          <div onClick={() => setSidebarOpen(false)} className={`absolute inset-0 transition-opacity duration-500 ${sidebarOpen ? "opacity-100" : "opacity-0"}`} style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} />
          <aside className={`absolute left-3 top-3 bottom-3 w-72 rounded-3xl overflow-hidden transition-all duration-500 flex flex-col p-5 ${sidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`} style={{ background: "linear-gradient(180deg, rgba(20,20,30,0.98), rgba(10,10,20,0.98))", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(40px)" }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-white/50">My Account</span>
              <button onClick={() => setSidebarOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 hover:border-pink-400/30 hover:bg-pink-400/10 transition-all">
                <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <SidebarContent />
          </aside>
        </div>

        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
