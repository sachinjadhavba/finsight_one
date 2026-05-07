import { VALUES, CREDENTIALS } from "../data";

function Footer({ navigate }) {
  return (
    <footer style={{ background: "#111827", padding: "32px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
      <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: 1.5, color: "#fff" }}>FINSIGHT<span style={{ color: "#F59E0B" }}>ONE</span></div>
      <div style={{ display: "flex", gap: 20 }}>
        {[["home","Home"],["check","Check Eligibility"],["analytics","Plans"],["advisory","Advisory"]].map(([id,l]) => (
          <span key={id} onClick={() => navigate(id)} style={{ fontSize: 12, color: "#6B7280", cursor: "pointer" }}>{l}</span>
        ))}
      </div>
      <div style={{ fontSize: 11, color: "#4B5563" }}>© 2026 FinsightOne</div>
    </footer>
  );
}

export default function About({ navigate }) {
  return (
    <div>
      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg,#1E3A5F,#0F2140)", color: "#fff", padding: "56px 48px 80px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#FCD34D20", border: "1px solid #FCD34D50", color: "#FCD34D", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "5px 16px", borderRadius: 100, marginBottom: 16 }}>
          Our Story
        </div>
        <h1 style={{ fontSize: "clamp(24px,3.5vw,34px)", fontWeight: 900, marginBottom: 10 }}>
          Built by Bankers.<br />For People Who Need Loans.
        </h1>
        <p style={{ fontSize: 15, color: "#93C5FD", maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
          FinsightOne was built from one simple observation: most Indians get rejected for loans not because they don't qualify — but because their application is not prepared correctly.
        </p>
      </div>

      {/* TEAM CARD */}
      <div style={{ padding: "0 48px 64px", background: "#F9FAFB" }}>
        <div style={{ maxWidth: 900, margin: "-40px auto 0", background: "#fff", borderRadius: 16, padding: 36, boxShadow: "0 16px 48px rgba(0,0,0,0.10)", position: "relative", zIndex: 10, display: "grid", gridTemplateColumns: "160px 1fr", gap: 32, alignItems: "start" }}>
          <div style={{ width: 140, height: 140, borderRadius: "50%", background: "linear-gradient(135deg,#1E3A5F,#2563EB)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, flexShrink: 0 }}>🏦</div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#B45309", marginBottom: 8 }}>Expert Credit Advisory Team</div>
            <div style={{ fontSize: 24, fontWeight: 900, marginBottom: 4 }}>FinsightOne Expert Team</div>
            <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 16 }}>20+ Years Combined · MSME & Retail Banking · Former Senior Bankers</div>
            <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.7, marginBottom: 16 }}>
              Our team spent 20+ years inside banks — reviewing loan applications, rejecting files, and watching good businesses fail because their paperwork was wrong. We started FinsightOne to fix that. Every client we work with gets the same quality of guidance that bank insiders give to their own families.
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["20 Yrs Banking", "MSME Credit", "Retail Lending", "Project Finance", "NPA Recovery"].map(b => (
                <div key={b} style={{ background: "#F3F4F6", borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 700, color: "#374151" }}>{b}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* VALUES */}
      <div style={{ padding: "64px 48px" }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", color: "#B45309", marginBottom: 10, textAlign: "center" }}>Why We Are Different</div>
        <div style={{ fontSize: 30, fontWeight: 800, textAlign: "center", marginBottom: 40, lineHeight: 1.25 }}>No Agent Commissions. No Hidden Fees.<br />Just Expert Help.</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16, maxWidth: 900, margin: "0 auto" }}>
          {VALUES.map(v => (
            <div key={v.title} style={{ textAlign: "center", padding: "24px 16px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14 }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{v.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 6 }}>{v.title}</div>
              <div style={{ fontSize: 11.5, color: "#6B7280", lineHeight: 1.5 }}>{v.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CREDENTIALS */}
      <div style={{ padding: "64px 48px", background: "#F9FAFB" }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", color: "#B45309", marginBottom: 10, textAlign: "center" }}>Experience</div>
        <div style={{ fontSize: 30, fontWeight: 800, textAlign: "center", marginBottom: 32 }}>20 Years of Banking Expertise</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16, maxWidth: 900, margin: "0 auto" }}>
          {CREDENTIALS.map(c => (
            <div key={c.period} style={{ background: "#F9FAFB", borderRadius: 12, padding: 20, borderLeft: "4px solid #B45309" }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#B45309", letterSpacing: 1, marginBottom: 6 }}>{c.period}</div>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{c.title}</div>
              <div style={{ fontSize: 12, color: "#6B7280" }}>{c.org}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "linear-gradient(135deg,#B45309,#92400E)", padding: "56px 48px", textAlign: "center", color: "#fff" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 10 }}>Ready to Work With Us?</h2>
        <p style={{ fontSize: 14, color: "#FEF3C7", marginBottom: 24 }}>Start with a free eligibility check — no commitment, no documents needed.</p>
        <button onClick={() => navigate("check")} style={{ background: "#fff", color: "#B45309", fontSize: 14, fontWeight: 800, padding: "14px 32px", borderRadius: 10, border: "none", cursor: "pointer" }}>
          Check My Eligibility — Free →
        </button>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}
