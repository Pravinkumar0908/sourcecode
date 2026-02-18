import Link from "next/link";
import { SOCIAL_LINKS } from "../../lib/constants";

const footerLinks = {
  Products: [
    { name: "SaaS Starter", href: "/products/nextjs-saas-starter" },
    { name: "E-Commerce Pro", href: "/products/react-ecommerce-pro" },
    { name: "Dashboard UI", href: "/products/tailwind-dashboard-ui" },
    { name: "AI Chatbot", href: "/products/ai-chatbot-template" },
    { name: "All Products", href: "/products" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
    { name: "Demo", href: "/demo/nextjs-saas-starter" },
  ],
  Account: [
    { name: "Login", href: "/login" },
    { name: "Register", href: "/register" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Purchases", href: "/dashboard/purchases" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 mt-10">
      {/* Gradient glow at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />

      {/* Background orbs */}
      <div
        className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full blur-[150px] opacity-[0.04]"
        style={{ background: "#facc15" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-[120px] opacity-[0.04]"
        style={{ background: "#ec4899" }}
      />

      <div className="relative max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, rgba(250,204,21,0.2), rgba(236,72,153,0.2))",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <span
                  className="text-xs font-black"
                  style={{
                    background: "linear-gradient(135deg, #facc15, #ec4899)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  CV
                </span>
              </div>
              <span
                className="text-lg font-bold"
                style={{
                  background: "linear-gradient(135deg, #fff, #facc15)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Codevault
              </span>
            </Link>
            <p className="text-sm text-white/30 leading-relaxed mb-6">
              Premium source codes for modern developers. Build faster, ship sooner.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { label: "YouTube", href: SOCIAL_LINKS.youtube, icon: <path d="M23 12s0-3.85-.46-5.34a2.74 2.74 0 00-1.94-1.93C19.11 4.29 12 4.29 12 4.29s-7.11 0-8.6.44a2.74 2.74 0 00-1.94 1.93C1 8.15 1 12 1 12s0 3.85.46 5.34a2.74 2.74 0 001.94 1.93c1.49.44 8.6.44 8.6.44s7.11 0 8.6-.44a2.74 2.74 0 001.94-1.93C23 15.85 23 12 23 12zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" /> },
                { label: "GitHub", href: SOCIAL_LINKS.github, icon: <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /> },
                { label: "Twitter", href: SOCIAL_LINKS.twitter, icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /> },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/[0.08] hover:border-yellow-400/30 hover:bg-yellow-400/5 transition-all duration-300"
                  aria-label={s.label}
                >
                  <svg className="w-4 h-4 text-white/40 hover:text-white/80" fill="currentColor" viewBox="0 0 24 24">{s.icon}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white/70 mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/30 hover:text-yellow-400 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} Codevault. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Support"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-xs text-white/20 hover:text-white/50 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
