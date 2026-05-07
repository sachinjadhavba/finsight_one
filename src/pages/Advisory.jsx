import { DOC_PRODUCTS, ADVISORY_PRODUCTS } from "../data";

function Footer({ navigate }) {
  return (
    <footer style={{ background: "#111827", padding: "32px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
      <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: 1.5, color: "#fff" }}>FINSIGHT<span style={{ color: "#F59E0B" }}>ONE</span></div>
      <div style={{ display: "flex", gap: 20 }}>
        {[["home","Home"],["check","Check Eligibility"],["about","About"]].map(([id,l]) => (
          <span key={id} onClick={() => navigate(id)} style={{ fontSize: 12, color: "#6B7280", cursor: "pointer" }}>{l}</span>
        ))}
      </div>
      <div style={{ fontSize: 11, color: "#4B5563" }}>© 2026 FinsightOne</div>
    </footer>
  );
}

export default function Advisory({ navigate }) {
  return (
    <div>
      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg,#451A03,#78350F)", color: "#fff", padding: "56px 48px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#FCD34D20", border: "1px solid #FCD34D50", color: "#FCD34D", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "5px 16px", borderRadius: 100, marginBottom: 16 }}>
          Expert-Prepared · 72-Hour Delivery · 20 Years Experience
        </div>
        <h1 style={{ fontSize: "clamp(24px,3.5vw,34px)", fontWeight: 900, marginBottom: 10 }}>
          Loan Documents &amp;<br /><span style={{ color: "#FCD34D" }}>Expert Advisory</span>
        </h1>
        <p style={{ fontSize: 14, color: "#FDE68A", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
          Every document a bank asks for — prepared correctly by our expert team with 20+ years of banking experience. Plus one-on-one advisory for complex situations.
        </p>
      </div>

      {/* CONTENT */}
      <div style={{ padding: "64px 48px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>

          {/* DOCUMENTS */}
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 16, paddingBottom: 8, borderBottom: "2px solid #3B82F6", color: "#1D4ED8" }}>
            📄 Loan Documents — Prepared by Our Expert Team
          </div>
          <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 20, lineHeight: 1.6 }}>
            Banks ask for specific financial documents in a specific format. If even one is wrong, your loan gets delayed or rejected. We prepare every document exactly the way your bank needs it.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14, marginBottom: 40 }}>
            {DOC_PRODUCTS.map(d => (
              <div key={d.name} style={{ border: "1px solid #E5E7EB", borderRadius: 12, padding: 20, background: "#fff" }}>
                <div style={{ fontSize: 22, marginBottom: 10 }}>{d.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 6 }}>{d.name}</div>
                <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.5, marginBottom: 12 }}>{d.desc}</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#1D4ED8" }}>{d.price}</div>
                <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 3 }}>{d.who}</div>
                <button onClick={() => navigate("check")} style={{ display: "block", marginTop: 12, padding: 9, borderRadius: 8, fontSize: 12, fontWeight: 700, textAlign: "center", cursor: "pointer", background: "#EFF6FF", color: "#1D4ED8", border: "1px solid #BFDBFE", width: "100%" }}>
                  Know More
                </button>
              </div>
            ))}
          </div>

          {/* ADVISORY */}
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 16, paddingBottom: 8, borderBottom: "2px solid #B45309", color: "#B45309" }}>
            🎯 Personal Advisory — Talk to Our Expert Team
          </div>
          <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 20, lineHeight: 1.6 }}>
            Beyond documents — sometimes you need expert advice on how to structure your loan, recover from a rejection, or plan your finances. Our team has 20+ years of banking experience and will advise you personally.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14 }}>
            {ADVISORY_PRODUCTS.map(a => (
              <div key={a.name} style={{ border: "1px solid #E5E7EB", borderRadius: 12, padding: 20, background: "#fff" }}>
                <div style={{ fontSize: 22, marginBottom: 10 }}>{a.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 6 }}>{a.name}</div>
                <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.5, marginBottom: 12 }}>{a.desc}</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#B45309" }}>{a.price}</div>
                <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 3 }}>{a.who}</div>
                <button onClick={() => navigate("check")} style={{ display: "block", marginTop: 12, padding: 9, borderRadius: 8, fontSize: 12, fontWeight: 700, textAlign: "center", cursor: "pointer", background: "#FFFBEB", color: "#B45309", border: "1px solid #FDE68A", width: "100%" }}>
                  Book a Call
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "linear-gradient(135deg,#B45309,#92400E)", padding: "56px 48px", textAlign: "center", color: "#fff" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 10 }}>Not Sure Where to Start?</h2>
        <p style={{ fontSize: 14, color: "#FEF3C7", marginBottom: 24 }}>Start with a free eligibility check — we will tell you exactly which service you need.</p>
        <button onClick={() => navigate("check")} style={{ background: "#fff", color: "#B45309", fontSize: 14, fontWeight: 800, padding: "14px 32px", borderRadius: 10, border: "none", cursor: "pointer" }}>
          Check My Eligibility First →
        </button>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}
