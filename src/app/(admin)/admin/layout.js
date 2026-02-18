"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const adminLinks = [
  { name: "Overview", href: "/admin", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg> },
  { name: "Products", href: "/admin/products", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg> },
  { name: "Users", href: "/admin/users", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg> },
  { name: "Orders", href: "/admin/orders", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" /></svg> },
  { name: "Messages", href: "/admin/messages", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg> },
  { name: "Settings", href: "/admin/settings", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.573-1.066z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  // Close sidebar on route change
  useEffect(() => { setSidebarOpen(false); }, [pathname]);

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-3 mb-6 px-3">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(250,204,21,0.2), rgba(236,72,153,0.2))", border: "1px solid rgba(255,255,255,0.1)" }}>
            <span className="text-xs font-black" style={{ background: "linear-gradient(135deg, #facc15, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>CV</span>
          </div>
          <span className="text-sm font-bold text-white/80">Codevault</span>
        </Link>
        <span className="text-[9px] font-bold text-yellow-400 px-2 py-0.5 rounded-md bg-yellow-400/10 border border-yellow-400/20 ml-auto">ADMIN</span>
      </div>

      <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-5" />
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25 mb-3 px-3">Management</p>

      <nav className="flex flex-col gap-1">
        {adminLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link key={link.href} href={link.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${isActive ? "text-white" : "text-white/50 hover:text-white"}`} style={isActive ? { background: "linear-gradient(135deg, rgba(250,204,21,0.12), rgba(236,72,153,0.12))", border: "1px solid rgba(250,204,21,0.2)" } : { border: "1px solid transparent" }}>
              <span className={isActive ? "text-yellow-400" : "text-white/30"}>{link.icon}</span>
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="flex-1" />
      <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-4" />
      <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white transition-all">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Back to Dashboard
      </Link>
    </>
  );

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-60 shrink-0 rounded-2xl p-5 h-fit sticky top-24 relative" style={{ background: "linear-gradient(180deg, rgba(250,204,21,0.06), rgba(236,72,153,0.04), rgba(255,255,255,0.03))", border: "1px solid rgba(250,204,21,0.1)", backdropFilter: "blur(20px)" }}>
          <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />
          <SidebarContent />
        </aside>

        {/* Mobile Sidebar Toggle */}
        <button onClick={() => setSidebarOpen(true)} className="fixed bottom-6 right-6 z-30 lg:hidden w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl" style={{ background: "linear-gradient(135deg, #facc15, #ec4899)", boxShadow: "0 8px 32px rgba(250,204,21,0.3)" }}>
          <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>

        {/* Mobile Sidebar Overlay */}
        <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ${sidebarOpen ? "visible" : "invisible pointer-events-none"}`}>
          <div onClick={() => setSidebarOpen(false)} className={`absolute inset-0 transition-opacity duration-500 ${sidebarOpen ? "opacity-100" : "opacity-0"}`} style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} />
          <aside className={`absolute left-3 top-3 bottom-3 w-72 rounded-3xl overflow-hidden transition-all duration-500 flex flex-col p-5 ${sidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`} style={{ background: "linear-gradient(180deg, rgba(20,20,30,0.98), rgba(10,10,20,0.98))", border: "1px solid rgba(250,204,21,0.1)", backdropFilter: "blur(40px)" }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-yellow-400 px-2 py-0.5 rounded-md bg-yellow-400/10 border border-yellow-400/20">ADMIN PANEL</span>
              <button onClick={() => setSidebarOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 hover:border-pink-400/30 hover:bg-pink-400/10 transition-all">
                <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <SidebarContent />
          </aside>
        </div>

        {/* Main Content */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
