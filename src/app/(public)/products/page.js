"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { products as fallbackProducts, categories } from "../../../data/products";
import { formatPrice, getDiscount } from "../../../lib/helpers";

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(true);

  // Fetch products from Supabase
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          // Map Supabase fields to match existing UI field names
          setProducts(
            data.data.map((p) => ({
              ...p,
              shortDescription: p.short_description || p.description?.slice(0, 100),
              originalPrice: p.original_price || p.price,
              techStack: p.tech_stack || [],
              demoUrl: p.demo_url || `/demo/${p.slug}`,
              image: p.image_url || "",
              reviews: p.reviews_count || 0,
            }))
          );
        }
      } catch {
        // Fallback to local data silently
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filtered = products.filter((p) => {
    const matchesCategory =
      activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-yellow-400 tracking-wider uppercase mb-3">
            Marketplace
          </p>
          <h1 className="text-4xl md:text-6xl font-black mb-5">
            <span className="text-white">Browse </span>
            <span
              style={{
                background: "linear-gradient(135deg, #facc15, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Source Codes
            </span>
          </h1>
          <p className="text-white/40 max-w-xl mx-auto">
            Explore our collection of premium, production-ready source codes for
            every platform.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-10">
          <div
            className="flex items-center gap-3 px-5 py-3.5 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
            }}
          >
            <svg className="w-5 h-5 text-white/30 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search source codes, technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent w-full text-sm text-white placeholder-white/30 outline-none"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300"
              style={
                activeCategory === cat
                  ? {
                      background: "linear-gradient(135deg, #facc15, #f472b6)",
                      color: "#000",
                    }
                  : {
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.5)",
                    }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/30 text-lg">No products found.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {/* Image Placeholder */}
                <div
                  className="w-full aspect-video rounded-xl mb-5 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(250,204,21,0.06), rgba(236,72,153,0.06))",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <svg className="w-12 h-12 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>

                  {/* Discount Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-black" style={{ background: "linear-gradient(135deg, #facc15, #f472b6)" }}>
                      {getDiscount(product.originalPrice, product.price)}% OFF
                    </span>
                  </div>

                  {/* Featured Badge */}
                  {product.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-yellow-400 bg-yellow-400/10 border border-yellow-400/20">
                        ★ Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Category */}
                <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-400/70 mb-2 block">
                  {product.category}
                </span>

                {/* Title */}
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-white/30 leading-relaxed mb-4 line-clamp-2">
                  {product.shortDescription}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {product.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[10px] font-medium text-white/30"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom Row */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xl font-black"
                      style={{
                        background: "linear-gradient(135deg, #facc15, #ec4899)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-xs text-white/20 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-white/30">
                    <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {product.rating} ({product.reviews})
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
