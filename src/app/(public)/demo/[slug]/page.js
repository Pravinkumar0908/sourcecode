"use client";

import { useState, use } from "react";
import Link from "next/link";
import { products } from "../../../../data/products";
import { formatPrice, getDiscount } from "../../../../lib/helpers";

export default function DemoPage({ params }) {
  const { slug } = use(params);
  const product = products.find((p) => p.slug === slug);
  const [device, setDevice] = useState("desktop");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-6xl">🔍</p>
          <h1 className="text-2xl font-bold text-white">Demo Not Found</h1>
          <p className="text-white/40 text-sm">The product demo you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/products" className="inline-block mt-4 px-6 py-2.5 rounded-xl text-sm font-bold text-black" style={{ background: "linear-gradient(135deg, #facc15, #f472b6, #fff)" }}>
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const deviceWidths = { desktop: "100%", tablet: "768px", mobile: "375px" };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Demo Toolbar */}
      <div className="sticky top-0 z-50 px-4 sm:px-6 py-3 flex items-center justify-between" style={{ background: "rgba(10,10,15,0.9)", backdropFilter: "blur(20px) saturate(1.5)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {/* Left - Product info */}
        <div className="flex items-center gap-4">
          <Link href={`/products/${slug}`} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back
          </Link>
          <div className="hidden sm:block w-px h-5 bg-white/10" />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-white">{product.name}</p>
            <p className="text-[10px] text-white/30">Live Preview</p>
          </div>
        </div>

        {/* Center - Device toggle */}
        <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.06)" }}>
          {[
            { key: "desktop", icon: (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            )},
            { key: "tablet", icon: (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            )},
            { key: "mobile", icon: (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            )},
          ].map((d) => (
            <button
              key={d.key}
              onClick={() => setDevice(d.key)}
              className={`px-3 py-1.5 rounded-lg transition-all ${device === d.key ? "text-black" : "text-white/40 hover:text-white/60"}`}
              style={device === d.key ? { background: "linear-gradient(135deg, #facc15, #f472b6)" } : {}}
            >
              {d.icon}
            </button>
          ))}
        </div>

        {/* Right - Buy button */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-bold" style={{ background: "linear-gradient(135deg, #facc15, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {formatPrice(product.price)}
            </p>
            {product.originalPrice > product.price && (
              <p className="text-[10px] text-white/25 line-through">{formatPrice(product.originalPrice)}</p>
            )}
          </div>
          <Link href={`/products/${slug}`} className="px-4 py-2 rounded-xl text-xs font-bold text-black transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #facc15, #f472b6, #fff)" }}>
            Buy Now
          </Link>
        </div>
      </div>

      {/* Demo Preview Area */}
      <div className="flex-1 flex items-start justify-center p-4 sm:p-8" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div
          className="w-full transition-all duration-500 ease-out rounded-2xl overflow-hidden"
          style={{
            maxWidth: deviceWidths[device],
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/50" />
              <div className="w-3 h-3 rounded-full bg-green-400/50" />
            </div>
            <div className="flex-1 mx-4">
              <div className="px-3 py-1 rounded-lg text-[10px] text-white/25 truncate" style={{ background: "rgba(255,255,255,0.04)" }}>
                https://{product.slug}.codevault.dev
              </div>
            </div>
          </div>

          {/* Preview content */}
          <div className="relative" style={{ background: "linear-gradient(180deg, #0f0f1a 0%, #0a0a0f 100%)" }}>
            {/* Simulated preview with product info */}
            <div className="p-6 sm:p-10 space-y-8" style={{ minHeight: device === "desktop" ? "600px" : device === "tablet" ? "500px" : "400px" }}>
              {/* Hero simulation */}
              <div className="text-center space-y-4 pt-8">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold text-yellow-300" style={{ background: "rgba(250,204,21,0.08)", border: "1px solid rgba(250,204,21,0.15)" }}>
                  ⚡ Live Preview
                </span>
                <h2 className="text-2xl sm:text-4xl font-black" style={{ background: "linear-gradient(135deg, #facc15, #ec4899, #ffffff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {product.name}
                </h2>
                <p className="text-sm text-white/40 max-w-md mx-auto leading-relaxed">
                  {product.shortDescription}
                </p>
              </div>

              {/* Feature cards simulation */}
              <div className={`grid gap-4 ${device === "mobile" ? "grid-cols-1" : "grid-cols-2"}`}>
                {product.features.slice(0, 4).map((f, i) => (
                  <div key={i} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm mb-3" style={{ background: "linear-gradient(135deg, rgba(250,204,21,0.1), rgba(244,114,182,0.1))" }}>
                      {["🚀", "⚡", "🎨", "🔒"][i]}
                    </div>
                    <p className="text-sm font-semibold text-white">{f}</p>
                  </div>
                ))}
              </div>

              {/* Tech stack */}
              <div className="text-center space-y-3">
                <p className="text-xs text-white/25 uppercase tracking-wider">Built With</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {product.techStack.map((t) => (
                    <span key={t} className="px-3 py-1.5 rounded-lg text-xs text-white/40" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="text-center pt-4">
                <Link href={`/products/${slug}`} className="inline-block px-8 py-3 rounded-xl text-sm font-bold text-black transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #facc15, #f472b6, #fff)" }}>
                  Get Full Source Code — {formatPrice(product.price)}
                </Link>
                {product.originalPrice > product.price && (
                  <p className="mt-2 text-xs text-white/25">
                    Save {getDiscount(product.originalPrice, product.price)}% — was <span className="line-through">{formatPrice(product.originalPrice)}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
