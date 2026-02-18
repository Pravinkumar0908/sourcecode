import Link from "next/link";
import { STATS } from "../../../lib/constants";

export const metadata = {
  title: "About — Codevault",
  description: "Learn about Codevault and our mission to empower developers.",
};

const team = [
  { name: "Pravin Kumar", role: "Founder & Developer", avatar: "PK" },
  { name: "Ankit Verma", role: "Full-Stack Developer", avatar: "AV" },
  { name: "Riya Singh", role: "UI/UX Designer", avatar: "RS" },
  { name: "Vikram Patel", role: "Content Creator", avatar: "VP" },
];

export default function AboutPage() {
  return (
    <main className="pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-sm font-semibold text-yellow-400 tracking-wider uppercase mb-3">
            About Us
          </p>
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            <span className="text-white">Building the Future of </span>
            <span
              style={{
                background: "linear-gradient(135deg, #facc15, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Development
            </span>
          </h1>
          <p className="text-white/40 max-w-2xl mx-auto leading-relaxed">
            We&apos;re a team of passionate developers and designers on a mission to
            make premium source codes accessible to everyone. We believe great
            software should be built faster.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {[
            {
              title: "Our Mission",
              desc: "To empower developers worldwide with production-ready source codes that save time, reduce costs, and help ship better products faster.",
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              ),
            },
            {
              title: "Our Vision",
              desc: "A world where every developer has access to the best tools and templates to build anything they imagine, without starting from scratch.",
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl p-8"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: "linear-gradient(135deg, rgba(250,204,21,0.15), rgba(236,72,153,0.15))",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span className="text-yellow-400">{item.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl px-6 py-8 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="text-3xl md:text-4xl font-black mb-2"
                style={{
                  background: "linear-gradient(135deg, #facc15, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-white/40 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            <span className="text-white">Meet the </span>
            <span
              style={{
                background: "linear-gradient(135deg, #facc15, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Team
            </span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto">
            The passionate people behind Codevault.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-20">
          {team.map((member) => (
            <div
              key={member.name}
              className="rounded-2xl p-6 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-lg font-bold text-black"
                style={{ background: "linear-gradient(135deg, #facc15, #f472b6)" }}
              >
                {member.avatar}
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{member.name}</h4>
              <p className="text-xs text-white/30">{member.role}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="rounded-3xl p-10 md:p-14 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(250,204,21,0.08), rgba(236,72,153,0.08))",
            border: "1px solid rgba(250,204,21,0.15)",
            backdropFilter: "blur(20px)",
          }}
        >
          <h2 className="text-3xl font-black text-white mb-4">Want to Collaborate?</h2>
          <p className="text-white/40 mb-8 max-w-lg mx-auto">
            We&apos;re always looking for talented developers and creators to join our team.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-bold text-black transition-all duration-300 hover:scale-[1.03]"
            style={{ background: "linear-gradient(135deg, #facc15, #f472b6, #fff)" }}
          >
            Get In Touch
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
