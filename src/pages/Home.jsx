import Footer from "../components/Footer";
import { HERO_STATS, SERVICES, STEPS, JOURNEY, TESTIMONIALS } from "../data";

const rp = (v) => `clamp(20px, ${v}, ${v})`; // responsive padding helper

export default function Home({ navigate }) {
  return (
    <div>
      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg,#1E3A5F 0%,#0F2140 100%)", color: "#fff", padding: "clamp(40px,6vw,72px) clamp(20px,4vw,48px) clamp(40px,5vw,64px)", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#B4530920", border: "1px solid #B4530950", color: "#FCD34D", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "5px 16px", borderRadius: 100, marginBottom: 20 }}>
          Trusted by Businesses & Individuals · Expert-Verified
        </div>
        <h1 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 900, lineHeight: 1.15, marginBottom: 16, maxWidth: 680, margin: "0 auto 16px" }}>
          Get <span style={{ color: "#FCD34D" }}>Any Loan</span> Approved —<br />Business, Home, or Personal
        </h1>
        <p style={{ fontSize: "clamp(13px,1.5vw,15px)", color: "#93C5FD", maxWidth: 520, margin: "0 auto 32px", lineHeight: 1.7 }}>
          From checking if you qualify, to bank-ready documents, to disbursement — we handle every step so your loan goes through the first time.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
          <button onClick={() => navigate("check")} style={{ background: "#B45309", color: "#fff", fontSize: "clamp(13px,1.5vw,14px)", fontWeight: 700, padding: "14px 28px", borderRadius: 10, border: "none", cursor: "pointer" }}>
            Check If I Qualify — Free
          </button>
          <button onClick={() => document.getElementById("services-section")?.scrollIntoView({ behavior: "smooth" })} style={{ background: "transparent", color: "#fff", fontSize: "clamp(13px,1.5vw,14px)", fontWeight: 600, padding: "14px 28px", borderRadius: 10, border: "1px solid #ffffff40", cursor: "pointer" }}>
            See All Services
          </button>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "clamp(20px,4vw,40px)", flexWrap: "wrap" }}>
          {HERO_STATS.map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "clamp(18px,2vw,22px)", fontWeight: 800, color: "#FCD34D" }}>{s.val}</div>
              <div style={{ fontSize: 11, color: "#93C5FD", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PROBLEM STRIP */}
      <div style={{ background: "#FEF3C7", padding: "16px clamp(16px,3vw,48px)", display: "flex", gap: "clamp(12px,2vw,28px)", justifyContent: "center", flexWrap: "wrap", borderBottom: "1px solid #FDE68A" }}>
        {["❌ Loan rejected by your bank?", "📄 Wrong documents submitted?", "📉 No idea why you were refused?", "⏳ Waiting months with no update?"].map(t => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "clamp(11px,1.2vw,13px)", fontWeight: 600, color: "#92400E" }}>{t}</div>
        ))}
      </div>

      {/* SERVICES */}
      <div style={{ padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }} id="services-section">
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", color: "#B45309", marginBottom: 10, textAlign: "center" }}>Our Services</div>
        <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 800, textAlign: "center", marginBottom: 10, lineHeight: 1.25 }}>One Platform for Every Loan Need</h2>
        <p style={{ fontSize: 14, color: "#6B7280", textAlign: "center", maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.7 }}>
          Whether you are a business owner or an individual — we have a service that fits your stage and budget.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16, maxWidth: 1100, margin: "0 auto" }}>
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

      {/* WHO WE HELP */}
      <div style={{ background: "#F9FAFB", padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", color: "#B45309", marginBottom: 10, textAlign: "center" }}>Who We Help</div>
        <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 800, textAlign: "center", marginBottom: 36, lineHeight: 1.25 }}>Built for Every Borrower</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20, maxWidth: 1000, margin: "0 auto" }}>
          {[
            { id: "msme",        icon: "🏭", title: "MSMEs & SMEs",      color: "#0D1428", desc: "Working capital, term loans, machinery, LAP. We structure your case, match the right lender, and submit professionally.", items: ["Working Capital CC / OD","Machinery Loans","Loan Against Property","Unsecured Business Loans"] },
            { id: "individuals", icon: "🏠", title: "Individuals",        color: "#E8A020", desc: "Home loan, personal loan, vehicle, LAP. We tell you what you qualify for and get you to the right bank first time.", items: ["Home Loan","Personal Loan","Loan Against Property","Vehicle Loan"] },
            { id: "partners",    icon: "💼", title: "CA & DSA Partners",  color: "#166534", desc: "Refer clients and earn up to 45% of DSA payout on disbursement. White-label documents under your firm name.", items: ["Sub-DSA earning 45% payout","White-label CAM/CMA/DPR","Monthly monitoring resale","Rejection recovery channel"] },
          ].map(w => (
            <div key={w.id} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: 24, borderTop: `3px solid ${w.color}` }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{w.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{w.title}</h3>
              <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6, marginBottom: 14 }}>{w.desc}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px" }}>
                {w.items.map(i => (
                  <li key={i} style={{ fontSize: 12, color: "#374151", padding: "4px 0", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 5, height: 5, background: "#E8A020", borderRadius: "50%", flexShrink: 0 }} />{i}
                  </li>
                ))}
              </ul>
              <button onClick={() => navigate(w.id)} style={{ background: "transparent", border: `1px solid ${w.color}30`, color: w.color, fontSize: 12, fontWeight: 600, padding: "8px 14px", borderRadius: 6, cursor: "pointer" }}>
                Explore {w.title} →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", color: "#B45309", marginBottom: 10, textAlign: "center" }}>How It Works</div>
        <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 800, textAlign: "center", marginBottom: 10, lineHeight: 1.25 }}>Simple. Clear. 4 Steps.</h2>
        <p style={{ fontSize: 14, color: "#6B7280", textAlign: "center", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.7 }}>No jargon. No running to banks. You focus on your business — we handle the paperwork and lenders.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 24, maxWidth: 900, margin: "0 auto" }}>
          {STEPS.map((st) => (
            <div key={st.num} style={{ textAlign: "center", padding: "0 8px" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#1E3A5F", color: "#fff", fontSize: 18, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>{st.num}</div>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{st.title}</div>
              <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.5 }}>{st.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CASE STUDIES PREVIEW */}
      <div style={{ background: "#F9FAFB", padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", color: "#B45309", marginBottom: 10, textAlign: "center" }}>Case Studies</div>
        <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 800, textAlign: "center", marginBottom: 36, lineHeight: 1.25 }}>Real Results</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20, maxWidth: 1000, margin: "0 auto 32px" }}>
          {[
            { tag: "Sugar Mill · Maharashtra", color: "#064E3B", result: "₹60 Cr Sanctioned", detail: "2 rejections reversed. 12 risk flags fixed. Consortium of 3 banks." },
            { tag: "Home Loan · Pune",          color: "#0C4A6E", result: "₹68L at 8.65%",     detail: "FOIR exceeded. Co-applicant added. Saved ₹5L vs original offer." },
            { tag: "LAP · Mumbai",               color: "#78350F", result: "₹1.4 Cr sanctioned", detail: "Title chain gap resolved. 62% LTV achieved. Bajaj Finserv." },
          ].map(c => (
            <div key={c.tag} onClick={() => navigate("casestudies")} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, overflow: "hidden", cursor: "pointer" }}>
              <div style={{ background: c.color, padding: "16px 20px" }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{c.tag}</div>
                <div style={{ fontSize: 17, fontWeight: 800, color: "#fff" }}>{c.result}</div>
              </div>
              <div style={{ padding: "14px 20px" }}>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6, margin: 0 }}>{c.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <button onClick={() => navigate("casestudies")} style={{ background: "transparent", border: "1px solid #0D1428", color: "#0D1428", fontSize: 13, fontWeight: 600, padding: "10px 24px", borderRadius: 6, cursor: "pointer" }}>
            View All Case Studies →
          </button>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div style={{ padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", color: "#B45309", marginBottom: 10, textAlign: "center" }}>Client Stories</div>
        <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 800, textAlign: "center", marginBottom: 32, lineHeight: 1.25 }}>Real People. Real Approvals.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 20, maxWidth: 1000, margin: "0 auto" }}>
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

      {/* FINAL CTA */}
      <div style={{ background: "#0D1428", padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 800, color: "#fff", marginBottom: 12 }}>Ready to Get Your Loan Approved?</h2>
        <p style={{ fontSize: 14, color: "#94A3B8", marginBottom: 28 }}>Check if you qualify — free, instant, no documents needed.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => navigate("check")} style={{ background: "#E8A020", color: "#fff", fontSize: 15, fontWeight: 700, padding: "14px 32px", borderRadius: 8, border: "none", cursor: "pointer" }}>
            Check My Eligibility — Free →
          </button>
          <button onClick={() => navigate("advisory")} style={{ background: "transparent", color: "#fff", fontSize: 14, fontWeight: 500, padding: "14px 28px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer" }}>
            Talk to an Expert
          </button>
        </div>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}
