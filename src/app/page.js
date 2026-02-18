import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import Pricing from "../components/sections/Pricing";
import Testimonials from "../components/sections/Testimonials";
import Link from "next/link";
import { getFeaturedProducts } from "../data/products";
import { formatPrice, getDiscount } from "../lib/helpers";

export default function Home() {
  const featured = getFeaturedProducts();

  return (
    <main className="overflow-hidden">
      <Hero />

      {/* ─── Featured Products ─── */}
      <section className="relative py-16 sm:py-20 md:py-24 px-4">
        <div
          className="absolute top-1/2 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full blur-[100px] sm:blur-[120px] md:blur-[150px] opacity-[0.05]"
          style={{ background: "#ec4899" }}
        />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-14 md:mb-16">
            <p className="text-xs sm:text-sm font-semibold text-yellow-400 tracking-wider uppercase mb-2 sm:mb-3">
              Featured
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 md:mb-5 px-4">
              <span className="text-white">Top </span>
              <span
                style={{
                  background: "linear-gradient(135deg, #facc15, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Source Codes
              </span>
            </h2>
            <p className="text-sm sm:text-base text-white/40 max-w-xl mx-auto px-4">
              Our most popular and highest rated premium source codes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {featured.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group rounded-2xl p-4 sm:p-5 transition-all duration-500 hover:-translate-y-2"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {/* Image placeholder */}
                <div
                  className="w-full aspect-[4/3] rounded-xl mb-3 sm:mb-4 flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(250,204,21,0.08), rgba(236,72,153,0.08))",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 text-white/10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                    />
                  </svg>
                </div>

                {/* Category */}
                <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-400/70 mb-2 block">
                  {product.category}
                </span>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-bold text-white mb-1.5 group-hover:text-yellow-400 transition-colors line-clamp-1">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-white/30 leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                  {product.shortDescription}
                </p>

                {/* Price Row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <span
                      className="text-base sm:text-lg font-black"
                      style={{
                        background: "linear-gradient(135deg, #facc15, #ec4899)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-[10px] sm:text-xs text-white/20 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-green-400 px-1.5 sm:px-2 py-0.5 rounded-full bg-green-400/10 whitespace-nowrap">
                    {getDiscount(product.originalPrice, product.price)}% OFF
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10 sm:mt-12">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 hover:scale-[1.03]"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff",
              }}
            >
              View All Products
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Features />
      <Testimonials />
      <Pricing />

      {/* ─── CTA Section ─── */}
      <section className="relative py-16 sm:py-20 md:py-24 px-4">
        <div className="relative max-w-4xl mx-auto">
          <div
            className="rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 overflow-hidden relative"
            style={{
              background:
                "linear-gradient(135deg, rgba(250,204,21,0.08), rgba(236,72,153,0.08), rgba(255,255,255,0.04))",
              border: "1px solid rgba(250,204,21,0.15)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />
            <div
              className="absolute -top-10 sm:-top-20 left-1/2 -translate-x-1/2 w-40 h-40 sm:w-60 sm:h-60 rounded-full blur-[80px] sm:blur-[100px] opacity-20"
              style={{ background: "linear-gradient(135deg, #facc15, #ec4899)" }}
            />

            <div className="relative text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-5 px-2">
                <span className="text-white">Ready to Build </span>
                <span
                  style={{
                    background: "linear-gradient(135deg, #facc15, #ec4899)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Faster?
                </span>
              </h2>
              <p className="text-sm sm:text-base text-white/40 max-w-lg mx-auto mb-6 sm:mb-8 px-4">
                Join 10,000+ developers who save hours of work with our premium
                source codes. Start building today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
                <Link
                  href="/products"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-bold text-black transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl hover:shadow-yellow-400/20"
                  style={{
                    background: "linear-gradient(135deg, #facc15, #f472b6, #fff)",
                  }}
                >
                  Get Started Now
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/pricing"
                  className="text-sm font-semibold text-white/50 hover:text-yellow-400 transition-colors"
                >
                  View Pricing →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}