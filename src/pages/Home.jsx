import { HERO_STATS, SERVICES, STEPS, JOURNEY, TESTIMONIALS } from "../data";

const S = {
  section: { padding: "64px 48px" },
  sectionGray: { padding: "64px 48px", background: "#F9FAFB" },
  secTag: { fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", color: "#B45309", marginBottom: 10, textAlign: "center" },
  secH2: { fontSize: 30, fontWeight: 800, textAlign: "center", marginBottom: 10, lineHeight: 1.25 },
  secSub: { fontSize: 14, color: "#6B7280", textAlign: "center", maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.7 },
};

function Footer({ navigate }) {
  return (
    <footer style={{ background: "#111827", padding: "32px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
      <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: 1.5, color: "#fff" }}>FINSIGHT<span style={{ color: "#F59E0B" }}>ONE</span></div>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {[["home","Home"],["check","Check Eligibility"],["analytics","Monthly Plans"],["advisory","Advisory"],["about","About"]].map(([id,l]) => (
          <span key={id} onClick={() => navigate(id)} style={{ fontSize: 12, color: "#6B7280", cursor: "pointer" }}>{l}</span>
        ))}
      </div>
      <div style={{ fontSize: 11, color: "#4B5563" }}>© 2026 FinsightOne · All rights reserved</div>
    </footer>
  );
}

export default function Home({ navigate }) {
  return (
    <div>
      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg,#1E3A5F 0%,#0F2140 100%)", color: "#fff", padding: "72px 48px 64px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#B4530920", border: "1px solid #B4530950", color: "#FCD34D", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "5px 16px", borderRadius: 100, marginBottom: 20 }}>
          Trusted by Businesses & Individuals · Expert-Verified
        </div>
        <h1 style={{ fontSize: "clamp(28px,4vw,40px)", fontWeight: 900, lineHeight: 1.15, marginBottom: 16 }}>
          Get <span style={{ color: "#FCD34D" }}>Any Loan</span> Approved —<br />Business, Home, or Personal
        </h1>
        <p style={{ fontSize: 15, color: "#93C5FD", maxWidth: 560, margin: "0 auto 32px", lineHeight: 1.7 }}>
          From checking if you qualify, to bank-ready documents, to disbursement — we handle every step so your loan goes through the first time.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
          <button onClick={() => navigate("check")} style={{ background: "#B45309", color: "#fff", fontSize: 14, fontWeight: 700, padding: "14px 28px", borderRadius: 10, border: "none", cursor: "pointer" }}>
            Check If I Qualify — Free
          </button>
          <button onClick={() => document.getElementById("services-section")?.scrollIntoView({ behavior: "smooth" })} style={{ background: "transparent", color: "#fff", fontSize: 14, fontWeight: 600, padding: "14px 28px", borderRadius: 10, border: "1px solid #ffffff40", cursor: "pointer" }}>
            See All Services
          </button>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
          {HERO_STATS.map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#FCD34D" }}>{s.val}</div>
              <div style={{ fontSize: 11, color: "#93C5FD", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PROBLEM STRIP */}
      <div style={{ background: "#FEF3C7", padding: "18px 48px", display: "flex", gap: 28, justifyContent: "center", flexWrap: "wrap", borderBottom: "1px solid #FDE68A" }}>
        {["❌ Loan rejected by your bank?", "📄 Don't know which documents to submit?", "📉 No idea why your application was refused?", "⏳ Waiting months with no update?"].map(t => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "#92400E" }}>{t}</div>
        ))}
      </div>

      {/* SERVICES */}
      <div style={S.section} id="services-section">
        <div style={S.secTag}>Our Services</div>
        <div style={S.secH2}>One Platform for Every Loan Need</div>
        <div style={{ ...S.secSub }}>Whether you are a business owner or an individual — we have a service that fits your stage and budget.</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 16, maxWidth: 1100, margin: "0 auto" }}>
          {SERVICES.map(svc => (
            <div key={svc.id} style={{ borderRadius: 14, border: "1px solid #E5E7EB", background: "#fff", overflow: "hidden" }}>
              <div style={{ padding: "20px 18px 16px", background: svc.headBg }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{svc.icon}</div>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6, color: svc.numColor }}>{svc.num}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#111827", marginBottom: 6 }}>{svc.title}</div>
                <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.5 }}>{svc.pitch}</div>
              </div>
              <div style={{ padding: "12px 18px 4px", borderTop: "1px solid #F3F4F6" }}>
                {svc.items.map(it => (
                  <div key={it.name} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #F9FAFB", fontSize: 11.5, color: "#374151" }}>
                    <span>{it.name}</span>
                    <span style={{ fontWeight: 700, fontSize: 11, color: svc.priceColor }}>{it.price}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate(svc.page)} style={{ display: "block", width: "calc(100% - 36px)", margin: "12px 18px 18px", padding: 9, borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", background: svc.btnBg, color: svc.btnColor, border: `1px solid ${svc.btnBorder}` }}>
                {svc.btn}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={S.sectionGray}>
        <div style={S.secTag}>How It Works</div>
        <div style={S.secH2}>Simple. Clear. 4 Steps.</div>
        <div style={{ ...S.secSub }}>No jargon. No running to banks. You focus on your business — we handle the paperwork and lenders.</div>
        <div style={{ display: "flex", gap: 0, maxWidth: 900, margin: "0 auto" }}>
          {STEPS.map((st, i) => (
            <div key={st.num} style={{ flex: 1, textAlign: "center", padding: "0 16px", position: "relative" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#1E3A5F", color: "#fff", fontSize: 16, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", position: "relative", zIndex: 2 }}>{st.num}</div>
              {i < STEPS.length - 1 && <div style={{ position: "absolute", top: 22, left: "50%", right: "-50%", height: 2, background: "#E5E7EB", zIndex: 1 }} />}
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{st.title}</div>
              <div style={{ fontSize: 11.5, color: "#6B7280", lineHeight: 1.5 }}>{st.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* JOURNEY */}
      <div style={{ padding: 48, background: "#1E3A5F", color: "#fff" }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#93C5FD", textAlign: "center", marginBottom: 6 }}>Your Journey With Us</div>
        <div style={{ fontSize: 26, fontWeight: 800, textAlign: "center", marginBottom: 28 }}>
          Start Free. <span style={{ color: "#FCD34D" }}>Grow with Every Step.</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, flexWrap: "wrap" }}>
          {JOURNEY.map((j, i) => (
            <div key={j.name} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ background: j.highlight ? "#B45309" : "#ffffff10", border: `1px solid ${j.highlight ? "#B45309" : "#ffffff20"}`, borderRadius: 10, padding: "14px 16px", textAlign: "center", minWidth: 110 }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4, color: j.tagColor }}>{j.tag}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{j.name}</div>
                <div style={{ fontSize: 10, color: "#FCD34D", marginTop: 3, fontWeight: 600 }}>{j.price}</div>
              </div>
              {i < JOURNEY.length - 1 && <div style={{ fontSize: 20, color: "#ffffff40", padding: "0 6px" }}>→</div>}
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div style={S.sectionGray}>
        <div style={S.secTag}>Client Stories</div>
        <div style={{ ...S.secH2, marginBottom: 32 }}>Real People. Real Approvals.</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20, maxWidth: 1000, margin: "0 auto" }}>
          {TESTIMONIALS.map(t => (
            <div key={t.author} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: 24 }}>
              <div style={{ color: "#F59E0B", fontSize: 14, marginBottom: 12 }}>★★★★★</div>
              <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.6, marginBottom: 16, fontStyle: "italic" }}>"{t.quote}"</div>
              <div style={{ fontSize: 12, fontWeight: 700 }}>{t.author}</div>
              <div style={{ fontSize: 11, color: "#9CA3AF" }}>{t.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER CTA */}
      <div style={{ background: "linear-gradient(135deg,#B45309,#92400E)", padding: "56px 48px", textAlign: "center", color: "#fff" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 10 }}>Ready to Get Your Loan Approved?</h2>
        <p style={{ fontSize: 14, color: "#FEF3C7", marginBottom: 24 }}>Check if you qualify — free, instant, no documents needed.</p>
        <button onClick={() => navigate("check")} style={{ background: "#fff", color: "#B45309", fontSize: 14, fontWeight: 800, padding: "14px 32px", borderRadius: 10, border: "none", cursor: "pointer" }}>
          Check My Eligibility — It's Free →
        </button>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}
