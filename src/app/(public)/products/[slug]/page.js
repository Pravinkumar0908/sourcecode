import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProductBySlug } from "../../../../data/products";
import { formatPrice, getDiscount } from "../../../../lib/helpers";
import { createClient } from "../../../../lib/supabase/server";
import BuyButton from "../../../../components/ui/BuyButton";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  // Try Supabase first
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("products")
      .select("name, short_description")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();
    if (data) return { title: `${data.name} — Codevault`, description: data.short_description };
  } catch {}
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} — Codevault`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;

  // Try Supabase first, fallback to local data
  let product = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();
    if (data) {
      product = {
        ...data,
        shortDescription: data.short_description || "",
        originalPrice: data.original_price || data.price,
        techStack: data.tech_stack || [],
        demoUrl: data.demo_url || `/demo/${data.slug}`,
        reviews: data.reviews_count || 0,
      };
    }
  } catch {}

  if (!product) {
    product = getProductBySlug(slug);
  }

  if (!product) notFound();

  const discount = getDiscount(product.originalPrice, product.price);

  return (
    <main className="pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-white/30 mb-8">
          <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-white/60 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-yellow-400/70">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left: Image + Details (3 cols) */}
          <div className="lg:col-span-3 space-y-8">
            {/* Product Image */}
            <div
              className="w-full aspect-video rounded-3xl flex items-center justify-center relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(250,204,21,0.08), rgba(236,72,153,0.08), rgba(255,255,255,0.04))",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
              }}
            >
              <svg className="w-20 h-20 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
              </svg>
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1.5 rounded-xl text-xs font-bold text-black" style={{ background: "linear-gradient(135deg, #facc15, #f472b6)" }}>
                  {discount}% OFF
                </span>
              </div>
            </div>

            {/* Description */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <h2 className="text-lg font-bold text-white mb-4">Description</h2>
              <p className="text-sm text-white/40 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <h2 className="text-lg font-bold text-white mb-4">Features</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {product.features.map((f) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-white/50">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <h2 className="text-lg font-bold text-white mb-4">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {product.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-white/50"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Purchase Card (2 cols) */}
          <div className="lg:col-span-2">
            <div
              className="sticky top-24 rounded-3xl p-7 space-y-6 relative"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.07), rgba(250,204,21,0.03), rgba(236,72,153,0.03))",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(30px)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              }}
            >
              {/* Top glow */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent rounded-t-3xl" />

              {/* Category + Rating */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-400/70">
                  {product.category}
                </span>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-bold text-white">{product.rating}</span>
                  <span className="text-xs text-white/30">({product.reviews})</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl font-black text-white leading-tight">{product.name}</h1>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span
                  className="text-4xl font-black"
                  style={{
                    background: "linear-gradient(135deg, #facc15, #ec4899)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {formatPrice(product.price)}
                </span>
                <span className="text-lg text-white/20 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-xs font-bold text-green-400 px-2 py-0.5 rounded-full bg-green-400/10">
                  {discount}% OFF
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div
                  className="rounded-xl p-3 text-center"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="text-lg font-bold text-white">{product.downloads.toLocaleString()}</div>
                  <div className="text-[10px] text-white/30">Downloads</div>
                </div>
                <div
                  className="rounded-xl p-3 text-center"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="text-lg font-bold text-white">{product.reviews}</div>
                  <div className="text-[10px] text-white/30">Reviews</div>
                </div>
              </div>

              {/* Buy Button */}
              <BuyButton productId={product.id} productName={product.name} price={product.price} />

              {/* Demo Link */}
              <Link
                href={product.demoUrl}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-semibold text-white/70 hover:text-white transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <svg className="w-4 h-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Live Preview
              </Link>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-medium text-white/30"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Guarantee */}
              <div className="flex items-center gap-2 text-xs text-white/25 pt-2">
                <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Secure payment • Instant access • Lifetime updates
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
