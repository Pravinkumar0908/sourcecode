const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Full-Stack Developer",
    avatar: "RS",
    content:
      "Codevault saved me weeks of development time. The SaaS starter kit was incredibly well-structured and easy to customize. Highly recommend!",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "Freelance Designer",
    avatar: "PP",
    content:
      "The UI components are stunning and the code quality is top-notch. I use Codevault templates for all my client projects now.",
    rating: 5,
  },
  {
    name: "Amit Kumar",
    role: "Startup Founder",
    avatar: "AK",
    content:
      "We launched our MVP in just 2 weeks using the Next.js SaaS Starter. The payment integration and auth system worked flawlessly.",
    rating: 5,
  },
  {
    name: "Sneha Gupta",
    role: "Mobile Developer",
    avatar: "SG",
    content:
      "The Flutter templates are beautifully designed and well-documented. Worth every penny. Customer support is amazing too!",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    role: "Tech Lead",
    avatar: "VS",
    content:
      "Our team uses Codevault as the foundation for all our new projects. The code quality and architecture patterns are excellent.",
    rating: 5,
  },
  {
    name: "Ananya Reddy",
    role: "YouTuber & Developer",
    avatar: "AR",
    content:
      "I featured Codevault on my channel and my audience loved it. The glassmorphic design and smooth animations are next level!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div
        className="absolute top-1/2 left-0 w-96 h-96 rounded-full blur-[150px] opacity-[0.06]"
        style={{ background: "#facc15" }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-yellow-400 tracking-wider uppercase mb-3">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-5">
            <span className="text-white">Loved by </span>
            <span
              style={{
                background: "linear-gradient(135deg, #facc15, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Developers
            </span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Join thousands of developers who trust Codevault for their projects.
          </p>
        </div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <p className="text-sm text-white/50 leading-relaxed mb-6">
                &ldquo;{t.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-black"
                  style={{
                    background: "linear-gradient(135deg, #facc15, #f472b6)",
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-white/30">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
