import Pricing from "../../../components/sections/Pricing";

export const metadata = {
  title: "Pricing — Codevault",
  description: "Choose the perfect plan for your development needs.",
};

export default function PricingPage() {
  return (
    <main className="pt-28 pb-10">
      {/* Header */}
      <div className="text-center px-4 mb-4">
        <p className="text-sm font-semibold text-yellow-400 tracking-wider uppercase mb-3">
          Plans
        </p>
        <h1 className="text-4xl md:text-6xl font-black mb-5">
          <span className="text-white">Choose Your </span>
          <span
            style={{
              background: "linear-gradient(135deg, #facc15, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Plan
          </span>
        </h1>
        <p className="text-white/40 max-w-xl mx-auto">
          Simple, transparent pricing. No hidden fees. Cancel anytime.
        </p>
      </div>

      <Pricing />

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-black text-white text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            { q: "Can I use the source codes for client projects?", a: "Yes! With the Pro and Team plans, you get a full commercial license to use our source codes in unlimited client projects." },
            { q: "Do I get free updates?", a: "Yes, all plans include free updates for the subscription period. Pro gets 1 year of updates, Team gets lifetime updates." },
            { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards, UPI, net banking, and international payments via Stripe." },
            { q: "Can I get a refund?", a: "Yes, we offer a 7-day money-back guarantee. If you're not satisfied, we'll refund your payment — no questions asked." },
            { q: "Is there a free trial?", a: "Our Starter plan is completely free! You can explore 5 free templates before upgrading to a paid plan." },
          ].map((faq) => (
            <div
              key={faq.q}
              className="rounded-2xl p-6"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <h3 className="text-sm font-bold text-white mb-2">{faq.q}</h3>
              <p className="text-sm text-white/35 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
