"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ links = [], title = "Menu" }) {
  const pathname = usePathname();

  return (
    <aside
      className="hidden lg:flex flex-col w-64 shrink-0 rounded-2xl p-5 h-fit sticky top-24"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        backdropFilter: "blur(20px) saturate(1.5)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Gradient top line */}
      <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />

      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-5 px-3">
        {title}
      </p>

      <nav className="flex flex-col gap-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "text-white"
                  : "text-white/50 hover:text-white"
              }`}
              style={
                isActive
                  ? {
                      background:
                        "linear-gradient(135deg, rgba(250,204,21,0.1), rgba(236,72,153,0.1))",
                      border: "1px solid rgba(250,204,21,0.15)",
                    }
                  : { border: "1px solid transparent" }
              }
            >
              {link.icon && (
                <span className={isActive ? "text-yellow-400" : "text-white/30"}>
                  {link.icon}
                </span>
              )}
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
