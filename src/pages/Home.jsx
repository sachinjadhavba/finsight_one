import Footer from "../components/Footer";
import { HERO_STATS, SERVICES, STEPS, TESTIMONIALS } from "../data";

const INDIGO = "#4F46E5";
const ORANGE = "#EA580C";
const DARK   = "#111827";
const GRAY   = "#F9FAFB";
const WHITE  = "#fff";
const MUTED  = "#6B7280";

export default function Home({ navigate }) {
  return (
    <div style={{ fontFamily: "Arial,'Helvetica Neue',sans-serif" }}>

      {/* ── HERO — white background ── */}
      <div style={{ background: WHITE, padding: "clamp(48px,6vw,80px) clamp(20px,4vw,48px) clamp(40px,5vw,64px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 420px", gap: "clamp(32px,4vw,56px)", alignItems: "center" }}>

          {/* LEFT */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#EEF2FF", border: "1px solid #C7D2FE", color: INDIGO, fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 20, marginBottom: 20 }}>
              <span style={{ width: 5, height: 5, background: ORANGE, borderRadius: "50%", display: "inline-block" }} />
              Trusted by Businesses & Individuals · Expert-Verified
            </div>
            <h1 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, color: DARK, lineHeight: 1.1, marginBottom: 18, letterSpacing: "-0.03em" }}>
              Get <span style={{ color: INDIGO }}>Any Loan</span><br />Approved —<br />Business, Home<br />or <span style={{ color: ORANGE }}>Personal</span>
            </h1>
            <p style={{ fontSize: "clamp(14px,1.5vw,16px)", color: MUTED, lineHeight: 1.7, marginBottom: 28, maxWidth: 480 }}>
              From checking if you qualify to bank-ready documents to disbursement — we handle every step so your loan goes through the first time.
            </p>
            <div style={{ display: "flex", gap: 12, marginBottom: 36, flexWrap: "wrap" }}>
              <button onClick={() => navigate("check")} style={{ background: ORANGE, color: WHITE, fontSize: "clamp(13px,1.5vw,15px)", fontWeight: 700, padding: "14px 28px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                Check If I Qualify — Free
              </button>
              <button onClick={() => navigate("about")} style={{ background: WHITE, color: DARK, fontSize: "clamp(13px,1.5vw,14px)", fontWeight: 600, padding: "14px 28px", borderRadius: 8, border: "1px solid #E5E7EB", cursor: "pointer", fontFamily: "inherit" }}>
                See All Services →
              </button>
            </div>
            <div style={{ display: "flex", gap: "clamp(20px,3vw,40px)", flexWrap: "wrap" }}>
              {HERO_STATS.map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: "clamp(20px,2vw,26px)", fontWeight: 900, color: ORANGE }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — FORM CARD */}
          <div style={{ background: WHITE, border: "1px solid #E5E7EB", borderRadius: 16, padding: 28, boxShadow: "0 4px 24px rgba(79,70,229,0.08)" }}>
            <div style={{ display: "inline-block", background: "#EEF2FF", color: INDIGO, fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, marginBottom: 12, letterSpacing: 1 }}>
              FREE · 2 MINUTES · NO DOCUMENTS
            </div>
            <div style={{ fontSize: 17, fontWeight: 800, color: DARK, marginBottom: 3 }}>Free Eligibility Check</div>
            <div style={{ fontSize: 13, color: MUTED, marginBottom: 18 }}>Know your chances before approaching any bank</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              {[
                { label: "Your Name",      ph: "Ramesh Sharma",     type: "input" },
                { label: "Mobile Number",  ph: "98xxxxxxxx",        type: "input" },
                { label: "I am a...",      opts: ["Business Owner","Salaried Individual","Self-Employed","Farmer / Agri"] },
                { label: "Loan Type",      opts: ["Working Capital","Home Loan","Personal Loan","LAP","Business Loan"] },
                { label: "Amount Needed",  opts: ["Up to ₹5L","₹5L–₹25L","₹25L–₹1Cr","₹1Cr–₹5Cr","Above ₹5Cr"] },
                { label: "Monthly Turnover/Income", opts: ["Below ₹50K/mo","₹50K–₹2L/mo","₹2L–₹10L/mo","Above ₹10L/mo"] },
              ].map((f, i) => (
                <div key={i} style={i === 6 ? { gridColumn: "1/-1" } : {}}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#374151", marginBottom: 4 }}>{f.label}</div>
                  {f.type === "input"
                    ? <input placeholder={f.ph} style={{ width: "100%", border: "1px solid #E5E7EB", borderRadius: 6, padding: "9px 10px", fontSize: 12, color: "#374151", boxSizing: "border-box", fontFamily: "inherit" }} />
                    : <select style={{ width: "100%", border: "1px solid #E5E7EB", borderRadius: 6, padding: "9px 10px", fontSize: 12, color: "#374151", background: WHITE, boxSizing: "border-box", fontFamily: "inherit" }}>
                        {f.opts.map(o => <option key={o}>{o}</option>)}
                      </select>
                  }
                </div>
              ))}
              <div style={{ gridColumn: "1/-1" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#374151", marginBottom: 4 }}>Previously rejected?</div>
                <select style={{ width: "100%", border: "1px solid #E5E7EB", borderRadius: 6, padding: "9px 10px", fontSize: 12, color: "#374151", background: WHITE, boxSizing: "border-box", fontFamily: "inherit" }}>
                  <option>No, first time applying</option>
                  <option>Yes, rejected once</option>
                  <option>Yes, rejected more than once</option>
                </select>
              </div>
            </div>
            <button onClick={() => navigate("check")} style={{ width: "100%", background: INDIGO, color: WHITE, fontSize: 14, fontWeight: 700, padding: 13, borderRadius: 8, border: "none", cursor: "pointer", marginTop: 4, fontFamily: "inherit" }}>
              Show My Eligibility Score →
            </button>
            <div style={{ fontSize: 11, color: "#9CA3AF", textAlign: "center", marginTop: 8 }}>
              🔒 100% private · AI-powered · Built on 20 years of credit rules
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div style={{ background: GRAY, borderTop: "1px solid #E5E7EB", borderBottom: "1px solid #E5E7EB", padding: "20px clamp(20px,4vw,48px)", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 16 }}>
        {[["500+","Clients Served"],["₹200Cr+","Loans Facilitated"],["275+","Lender Network"],["20 yrs","Banking Expertise"],["85%","Approval Rate"]].map(([v,l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "clamp(18px,2vw,22px)", fontWeight: 900, color: ORANGE }}>{v}</div>
            <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* ── PROBLEM STRIP ── */}
      <div style={{ background: "#EEF2FF", borderBottom: "1px solid #C7D2FE", padding: "12px clamp(16px,3vw,48px)", display: "flex", gap: "clamp(10px,2vw,24px)", justifyContent: "center", flexWrap: "wrap" }}>
        {["❌ Loan rejected by your bank?","📄 Wrong documents submitted?","📉 Don't know why refused?","⏳ Waiting months with no update?"].map(t => (
          <div key={t} style={{ fontSize: "clamp(11px,1.2vw,13px)", fontWeight: 600, color: INDIGO }}>{t}</div>
        ))}
      </div>

      {/* ── SERVICES ── */}
      <div style={{ padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)", background: WHITE }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", color: ORANGE, marginBottom: 10, textAlign: "center" }}>Our Services</div>
        <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 900, textAlign: "center", marginBottom: 10, lineHeight: 1.2, color: DARK }}>One Platform for Every Loan Need</h2>
        <p style={{ fontSize: 14, color: MUTED, textAlign: "center", maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.7 }}>Whether you are a business owner or an individual — we have a service that fits your stage and budget.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, maxWidth: 1200, margin: "0 auto" }}>
          {SERVICES.map(svc => (
            <div key={svc.id} style={{ borderRadius: 14, border: "1px solid #E5E7EB", background: WHITE, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ padding: "20px 18px 16px", background: svc.headBg }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{svc.icon}</div>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 5, color: svc.numColor }}>{svc.num}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: DARK, marginBottom: 6 }}>{svc.title}</div>
                <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.5 }}>{svc.pitch}</div>
              </div>
              <div style={{ padding: "12px 18px 4px", borderTop: "1px solid #F3F4F6", flex: 1 }}>
                {svc.items.map(it => (
                  <div key={it.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #F9FAFB" }}>
                    <span style={{ fontSize: 11.5, color: "#374151" }}>{it.name}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ fontWeight: 700, fontSize: 11, color: svc.priceColor, whiteSpace: "nowrap" }}>{it.price}</span>
                      {it.sample && (
                        <button onClick={() => navigate(it.sample)} style={{ fontSize: 9, color: svc.btnColor, background: svc.btnBg, border: `1px solid ${svc.btnBorder}`, borderRadius: 3, padding: "1px 5px", cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit" }}>Sample</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: "12px 18px 18px" }}>
                <button onClick={() => navigate(svc.page)} style={{ display: "block", width: "100%", padding: 9, borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", background: svc.btnBg, color: svc.btnColor, border: `1px solid ${svc.btnBorder}`, fontFamily: "inherit" }}>
                  {svc.btn}
                </button>
              </div>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:900px){.svc-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:560px){.svc-grid{grid-template-columns:1fr!important}}`}</style>
      </div>

      {/* ── WHO WE HELP ── */}
      <div style={{ background: GRAY, padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", color: ORANGE, marginBottom: 10, textAlign: "center" }}>Who We Help</div>
        <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 900, textAlign: "center", marginBottom: 36, color: DARK }}>Built for Every Borrower</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, maxWidth: 1000, margin: "0 auto" }}>
          {[
            { id: "msme",        icon: "🏭", title: "MSMEs & SMEs",     color: INDIGO, desc: "Working capital, term loans, machinery, LAP. We structure your case, match the right lender, and submit professionally.", items: ["Working Capital CC / OD","Machinery Loans","Loan Against Property","Unsecured Business Loans"] },
            { id: "individuals", icon: "🏠", title: "Individuals",       color: ORANGE, desc: "Home loan, personal loan, vehicle, LAP. We tell you what you qualify for and get you to the right bank first time.", items: ["Home Loan","Personal Loan","Loan Against Property","Vehicle Loan"] },
            { id: "partners",    icon: "💼", title: "CA & DSA Partners", color: "#059669", desc: "Refer clients and earn up to 45% of DSA payout on disbursement. White-label documents under your firm name.", items: ["Sub-DSA earning 45% payout","White-label CAM/CMA/DPR","Monthly monitoring resale","Rejection recovery channel"] },
          ].map(w => (
            <div key={w.id} style={{ background: WHITE, border: "1px solid #E5E7EB", borderRadius: 12, padding: 24, borderTop: `3px solid ${w.color}` }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{w.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: DARK, marginBottom: 8 }}>{w.title}</h3>
              <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6, marginBottom: 14 }}>{w.desc}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px" }}>
                {w.items.map(i => (
                  <li key={i} style={{ fontSize: 12, color: "#374151", padding: "4px 0", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 5, height: 5, background: ORANGE, borderRadius: "50%", flexShrink: 0 }} />{i}
                  </li>
                ))}
              </ul>
              <button onClick={() => navigate(w.id)} style={{ background: "transparent", border: `1px solid ${w.color}40`, color: w.color, fontSize: 12, fontWeight: 600, padding: "8px 14px", borderRadius: 6, cursor: "pointer", fontFamily: "inherit" }}>
                Explore {w.title} →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div style={{ padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)", background: WHITE }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", color: ORANGE, marginBottom: 10, textAlign: "center" }}>How It Works</div>
        <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 900, textAlign: "center", marginBottom: 40, color: DARK }}>Simple. Clear. 4 Steps.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, maxWidth: 900, margin: "0 auto" }}>
          {STEPS.map(st => (
            <div key={st.num} style={{ textAlign: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: INDIGO, color: WHITE, fontSize: 18, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontFamily: "inherit" }}>{st.num}</div>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6, color: DARK }}>{st.title}</div>
              <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.5 }}>{st.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CASE STUDIES PREVIEW ── */}
      <div style={{ background: GRAY, padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", color: ORANGE, marginBottom: 10, textAlign: "center" }}>Case Studies</div>
        <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 900, textAlign: "center", marginBottom: 36, color: DARK }}>Real Results</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, maxWidth: 1000, margin: "0 auto 32px" }}>
          {[
            { tag: "Sugar Mill · Maharashtra", color: "#064E3B", result: "₹60 Cr Sanctioned",  detail: "2 rejections reversed. 12 risk flags fixed. Consortium of 3 banks." },
            { tag: "Home Loan · Pune",          color: "#312E81", result: "₹68L at 8.65%",      detail: "FOIR exceeded. Co-applicant added. Saved ₹5L vs original offer." },
            { tag: "LAP · Mumbai",              color: "#7C2D12", result: "₹1.4 Cr sanctioned", detail: "Title chain gap resolved. 62% LTV achieved. Bajaj Finserv." },
          ].map(c => (
            <div key={c.tag} onClick={() => navigate("casestudies")} style={{ background: WHITE, border: "1px solid #E5E7EB", borderRadius: 12, overflow: "hidden", cursor: "pointer" }}>
              <div style={{ background: c.color, padding: "16px 20px" }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{c.tag}</div>
                <div style={{ fontSize: 17, fontWeight: 800, color: WHITE }}>{c.result}</div>
              </div>
              <div style={{ padding: "14px 20px" }}>
                <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6, margin: 0 }}>{c.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <button onClick={() => navigate("casestudies")} style={{ background: "transparent", border: `1px solid ${INDIGO}`, color: INDIGO, fontSize: 13, fontWeight: 600, padding: "10px 24px", borderRadius: 6, cursor: "pointer", fontFamily: "inherit" }}>
            View All Case Studies →
          </button>
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <div style={{ padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)", background: WHITE }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", color: ORANGE, marginBottom: 10, textAlign: "center" }}>Client Stories</div>
        <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 900, textAlign: "center", marginBottom: 32, color: DARK }}>Real People. Real Approvals.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, maxWidth: 1000, margin: "0 auto" }}>
          {TESTIMONIALS.map(t => (
            <div key={t.author} style={{ background: WHITE, border: "1px solid #E5E7EB", borderRadius: 14, padding: 24 }}>
              <div style={{ color: ORANGE, fontSize: 14, marginBottom: 12 }}>★★★★★</div>
              <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.6, marginBottom: 16, fontStyle: "italic" }}>"{t.quote}"</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: DARK }}>{t.author}</div>
              <div style={{ fontSize: 11, color: "#9CA3AF" }}>{t.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FINAL CTA ── */}
      <div style={{ background: DARK, padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 900, color: WHITE, marginBottom: 12 }}>Ready to Get Your Loan Approved?</h2>
        <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 28 }}>Check if you qualify — free, instant, no documents needed.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => navigate("check")} style={{ background: ORANGE, color: WHITE, fontSize: 15, fontWeight: 700, padding: "14px 32px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
            Check My Eligibility — Free →
          </button>
          <button onClick={() => navigate("advisory")} style={{ background: "transparent", color: WHITE, fontSize: 14, fontWeight: 500, padding: "14px 28px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", fontFamily: "inherit" }}>
            Talk to an Expert
          </button>
        </div>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}
