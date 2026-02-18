import Link from "next/link";
import { PRICING_PLANS, CURRENCY } from "../../lib/constants";

export default function Pricing() {
  return (
    <section className="relative py-24 px-4">
      {/* Background */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[120px] opacity-10"
        style={{ background: "#facc15" }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[120px] opacity-10"
        style={{ background: "#ec4899" }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-yellow-400 tracking-wider uppercase mb-3">
            Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-5">
            <span className="text-white">Simple, </span>
            <span
              style={{
                background: "linear-gradient(135deg, #facc15, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Transparent
            </span>
            <span className="text-white"> Pricing</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Choose the plan that fits your needs. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 ${
                plan.popular ? "md:-mt-4 md:mb-4" : ""
              }`}
              style={{
                background: plan.popular
                  ? "linear-gradient(135deg, rgba(250,204,21,0.1), rgba(236,72,153,0.08), rgba(255,255,255,0.05))"
                  : "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                border: plan.popular
                  ? "1px solid rgba(250,204,21,0.25)"
                  : "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
                boxShadow: plan.popular
                  ? "0 20px 60px rgba(250,204,21,0.08)"
                  : "0 8px 32px rgba(0,0,0,0.2)",
              }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className="px-4 py-1 rounded-full text-xs font-bold text-black"
                    style={{ background: "linear-gradient(135deg, #facc15, #f472b6)" }}
                  >
                    Most Popular
                  </span>
                </div>
              )}

              {/* Gradient glow for popular */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-white/40">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  {plan.price === 0 ? (
                    <span className="text-4xl font-black text-white">Free</span>
                  ) : (
                    <>
                      <span className="text-sm text-white/40">{CURRENCY}</span>
                      <span
                        className="text-4xl font-black"
                        style={{
                          background: "linear-gradient(135deg, #facc15, #ec4899)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {plan.price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-sm text-white/40">/year</span>
                    </>
                  )}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-white/60">
                    <svg className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={plan.price === 0 ? "/register" : "/pricing"}
                className="block w-full text-center py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.02]"
                style={
                  plan.popular
                    ? {
                        background: "linear-gradient(135deg, #facc15, #f472b6, #fff)",
                        color: "#000",
                      }
                    : {
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#fff",
                      }
                }
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
