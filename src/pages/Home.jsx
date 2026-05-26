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

      {/* ── HERO ── */}
      <div style={{ background: WHITE, padding: "clamp(36px,5vw,60px) clamp(20px,4vw,48px) clamp(32px,4vw,52px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 400px", gap: "clamp(28px,4vw,52px)", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#EEF2FF", border: "1px solid #C7D2FE", color: INDIGO, fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 20, marginBottom: 18 }}>
              <span style={{ width: 5, height: 5, background: ORANGE, borderRadius: "50%", display: "inline-block" }} />
              Credit · Advisory · Intelligence — For Businesses & Individuals
            </div>
            <h1 style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 900, color: DARK, lineHeight: 1.1, marginBottom: 16, letterSpacing: "-0.03em" }}>
              <span style={{ color: INDIGO }}>Loan Approved.</span><br />
              Documents Prepared.<br />
              <span style={{ color: ORANGE }}>Finances Monitored.</span>
            </h1>
            <p style={{ fontSize: "clamp(14px,1.5vw,16px)", color: MUTED, lineHeight: 1.7, marginBottom: 24, maxWidth: 500 }}>
              From free eligibility check to bank-ready CAM/CMA/DPR documents to monthly financial monitoring — one platform, every loan need, built on 20 years of banking expertise.
            </p>
            {/* Four service pills */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
              {[
                { label: "✓ Free Eligibility Check", page: "check", bg: "#EEF2FF", color: INDIGO },
                { label: "✓ CAM / CMA / DPR Docs", page: "docs",  bg: "#FFF7ED", color: ORANGE },
                { label: "✓ Monthly Monitoring",    page: "analytics", bg: "#ECFDF5", color: "#059669" },
                { label: "✓ Expert Advisory",       page: "advisory",  bg: "#F5F3FF", color: "#7C3AED" },
              ].map(p => (
                <button key={p.label} onClick={() => navigate(p.page)} style={{ background: p.bg, color: p.color, fontSize: 12, fontWeight: 700, padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                  {p.label}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
              <button onClick={() => navigate("check")} style={{ background: ORANGE, color: WHITE, fontSize: 15, fontWeight: 700, padding: "13px 28px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 12px rgba(234,88,12,0.25)" }}>
                Check If I Qualify — Free
              </button>
              <button onClick={() => navigate("docs")} style={{ background: WHITE, color: DARK, fontSize: 14, fontWeight: 600, padding: "13px 28px", borderRadius: 8, border: "1px solid #E5E7EB", cursor: "pointer", fontFamily: "inherit" }}>
                View Sample Documents →
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

          {/* FORM CARD */}
          <div style={{ background: WHITE, border: "1px solid #E5E7EB", borderRadius: 16, padding: 24, boxShadow: "0 4px 24px rgba(79,70,229,0.08)" }}>
            <div style={{ display: "inline-block", background: "#EEF2FF", color: INDIGO, fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, marginBottom: 10, letterSpacing: 1 }}>
              FREE · 2 MINUTES · NO DOCUMENTS
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, color: DARK, marginBottom: 3 }}>Free Eligibility Check</div>
            <div style={{ fontSize: 13, color: MUTED, marginBottom: 16 }}>Know your chances before approaching any bank</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              {[
                { label: "Your Name",     ph: "Ramesh Sharma",  type: "input" },
                { label: "Mobile",        ph: "98xxxxxxxx",     type: "input" },
                { label: "I am a...",     opts: ["Business Owner","Salaried Individual","Self-Employed","Farmer / Agri"] },
                { label: "Loan Type",     opts: ["Working Capital / OD","Home Loan","Personal Loan","LAP","Business Term Loan","Machinery Loan"] },
                { label: "Amount Needed", opts: ["Up to ₹5L","₹5L–₹25L","₹25L–₹1Cr","₹1Cr–₹5Cr","Above ₹5Cr"] },
                { label: "Monthly Income / Turnover", opts: ["Below ₹50K/mo","₹50K–₹2L/mo","₹2L–₹10L/mo","Above ₹10L/mo"] },
              ].map((f, i) => (
                <div key={i}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#374151", marginBottom: 4 }}>{f.label}</div>
                  {f.type === "input"
                    ? <input placeholder={f.ph} style={{ width: "100%", border: "1px solid #E5E7EB", borderRadius: 6, padding: "8px 10px", fontSize: 12, color: "#374151", boxSizing: "border-box", fontFamily: "inherit" }} />
                    : <select style={{ width: "100%", border: "1px solid #E5E7EB", borderRadius: 6, padding: "8px 10px", fontSize: 12, color: "#374151", background: WHITE, boxSizing: "border-box", fontFamily: "inherit" }}>
                        <option value="">Select...</option>
                        {f.opts.map(o => <option key={o}>{o}</option>)}
                      </select>
                  }
                </div>
              ))}
              <div style={{ gridColumn: "1/-1" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#374151", marginBottom: 4 }}>Previously rejected?</div>
                <select style={{ width: "100%", border: "1px solid #E5E7EB", borderRadius: 6, padding: "8px 10px", fontSize: 12, color: "#374151", background: WHITE, boxSizing: "border-box", fontFamily: "inherit" }}>
                  <option>No, first time applying</option>
                  <option>Yes, rejected once</option>
                  <option>Yes, rejected more than once</option>
                </select>
              </div>
            </div>
            <button onClick={() => navigate("check")} style={{ width: "100%", background: INDIGO, color: WHITE, fontSize: 14, fontWeight: 700, padding: 12, borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
              Show My Eligibility Score →
            </button>
            <div style={{ fontSize: 11, color: "#9CA3AF", textAlign: "center", marginTop: 8 }}>
              🔒 100% private · AI-powered · Built on 20 years of credit rules
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div style={{ background: GRAY, borderTop: "1px solid #E5E7EB", borderBottom: "1px solid #E5E7EB", padding: "18px clamp(20px,4vw,48px)", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 16 }}>
        {[["500+","Clients Served"],["₹200Cr+","Loans Facilitated"],["275+","Lender Network"],["20 yrs","Banking Expertise"],["85%","Approval Rate"]].map(([v,l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: ORANGE }}>{v}</div>
            <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* ── PROBLEM STRIP ── */}
      <div style={{ background: "#EEF2FF", borderBottom: "1px solid #C7D2FE", padding: "11px clamp(16px,3vw,48px)", display: "flex", gap: "clamp(10px,2vw,24px)", justifyContent: "center", flexWrap: "wrap" }}>
        {["❌ Loan rejected?","📄 Wrong documents?","📉 Don't know why refused?","⏳ Waiting months?"].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: 600, color: INDIGO }}>{t}</div>
        ))}
      </div>

      {/* ── SERVICES ── */}
      <div style={{ padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)", background: WHITE }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", color: ORANGE, marginBottom: 10, textAlign: "center" }}>Our Services</div>
        <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 900, textAlign: "center", marginBottom: 10, color: DARK }}>One Platform for Every Loan Need</h2>
        <p style={{ fontSize: 14, color: MUTED, textAlign: "center", maxWidth: 560, margin: "0 auto 36px", lineHeight: 1.7 }}>Whether you are a business owner or an individual — we have a service that fits your stage and budget.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, maxWidth: 1200, margin: "0 auto" }}>
          {SERVICES.map(svc => (
            <div key={svc.id} style={{ borderRadius: 14, border: "1px solid #E5E7EB", background: WHITE, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ padding: "18px 16px 14px", background: svc.headBg }}>
                <div style={{ fontSize: 26, marginBottom: 8 }}>{svc.icon}</div>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4, color: svc.numColor }}>{svc.num}</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: DARK, marginBottom: 5 }}>{svc.title}</div>
                <div style={{ fontSize: 11.5, color: MUTED, lineHeight: 1.5 }}>{svc.pitch}</div>
              </div>
              <div style={{ padding: "10px 16px 4px", borderTop: "1px solid #F3F4F6", flex: 1 }}>
                {svc.items.map(it => (
                  <div key={it.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", borderBottom: "1px solid #F9FAFB" }}>
                    <span style={{ fontSize: 11, color: "#374151" }}>{it.name}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ fontWeight: 700, fontSize: 10.5, color: svc.priceColor, whiteSpace: "nowrap" }}>{it.price}</span>
                      {it.sample && (
                        <button onClick={() => window.open(it.sample,'_blank')} style={{ fontSize: 9, color: svc.btnColor, background: svc.btnBg, border: `1px solid ${svc.btnBorder}`, borderRadius: 3, padding: "1px 5px", cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit" }}>Sample</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: "10px 16px 16px" }}>
                <button onClick={() => navigate(svc.page)} style={{ display: "block", width: "100%", padding: 8, borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", background: svc.btnBg, color: svc.btnColor, border: `1px solid ${svc.btnBorder}`, fontFamily: "inherit" }}>
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
            { id: "msme",        icon: "🏭", title: "MSMEs & SMEs",     color: INDIGO,    desc: "Working capital, term loans, machinery, LAP. We structure your case, match the right lender, and submit professionally.", items: ["Working Capital CC / OD","Machinery Loans","Loan Against Property","Unsecured Business Loans"] },
            { id: "individuals", icon: "🏠", title: "Individuals",       color: ORANGE,    desc: "Home loan, personal loan, vehicle, LAP. We tell you what you qualify for and get you to the right bank first time.", items: ["Home Loan","Personal Loan","Loan Against Property","Vehicle Loan"] },
            { id: "partners",    icon: "💼", title: "CA & DSA Partners", color: "#059669", desc: "White-label documents under your firm name. Full referral dashboard. Three income streams your bank DSA does not offer.", items: ["Sub-DSA on disbursement","White-label CAM/CMA/DPR","Monthly monitoring resale","Rejection recovery channel"] },
          ].map(w => (
            <div key={w.id} style={{ background: WHITE, border: "1px solid #E5E7EB", borderRadius: 12, padding: 22, borderTop: `3px solid ${w.color}` }}>
              <div style={{ fontSize: 26, marginBottom: 10 }}>{w.icon}</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: DARK, marginBottom: 7 }}>{w.title}</h3>
              <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6, marginBottom: 12 }}>{w.desc}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 14px" }}>
                {w.items.map(i => (
                  <li key={i} style={{ fontSize: 12, color: "#374151", padding: "3px 0", display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ width: 4, height: 4, background: ORANGE, borderRadius: "50%", flexShrink: 0 }} />{i}
                  </li>
                ))}
              </ul>
              <button onClick={() => navigate(w.id)} style={{ background: "transparent", border: `1px solid ${w.color}40`, color: w.color, fontSize: 12, fontWeight: 600, padding: "7px 14px", borderRadius: 6, cursor: "pointer", fontFamily: "inherit" }}>
                Explore {w.title} →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div style={{ padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)", background: WHITE }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", color: ORANGE, marginBottom: 10, textAlign: "center" }}>How It Works</div>
        <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 900, textAlign: "center", marginBottom: 36, color: DARK }}>Simple. Clear. 4 Steps.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, maxWidth: 900, margin: "0 auto" }}>
          {STEPS.map(st => (
            <div key={st.num} style={{ textAlign: "center" }}>
              <div style={{ width: 46, height: 46, borderRadius: "50%", background: INDIGO, color: WHITE, fontSize: 17, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>{st.num}</div>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 5, color: DARK }}>{st.title}</div>
              <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.5 }}>{st.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CASE STUDIES ── */}
      <div style={{ background: GRAY, padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", color: ORANGE, marginBottom: 10, textAlign: "center" }}>Case Studies</div>
        <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 900, textAlign: "center", marginBottom: 36, color: DARK }}>Real Results</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, maxWidth: 1000, margin: "0 auto 28px" }}>
          {[
            { tag: "Sugar Mill · Maharashtra", color: "#064E3B", result: "₹60 Cr Sanctioned",  detail: "2 rejections reversed. 12 risk flags fixed.", url: "/reports/case-studies/cs01_sugar_mill_maharashtra.html" },
            { tag: "Home Loan · Pune",          color: "#312E81", result: "₹68L at 8.65%",      detail: "FOIR exceeded. Co-applicant added. Saved ₹5L.", url: "/reports/business-services/06_eligibility_report_it.html" },
            { tag: "LAP · Mumbai",              color: "#7C2D12", result: "₹1.4 Cr sanctioned", detail: "Title chain resolved. 62% LTV. Bajaj Finserv.", url: "/reports/case-studies/cs01_sugar_mill_maharashtra.html" },
          ].map(c => (
            <div key={c.tag} onClick={() => window.open(c.url,"_blank")} style={{ background: WHITE, border: "1px solid #E5E7EB", borderRadius: 12, overflow: "hidden", cursor: "pointer" }}>
              <div style={{ background: c.color, padding: "14px 18px" }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 5 }}>{c.tag}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: WHITE }}>{c.result}</div>
              </div>
              <div style={{ padding: "12px 18px" }}>
                <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6, margin: "0 0 8px" }}>{c.detail}</p>
                <span style={{ fontSize: 12, fontWeight: 600, color: INDIGO }}>Read full case study →</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <button onClick={() => navigate("casestudies")} style={{ background: "transparent", border: `1px solid ${INDIGO}`, color: INDIGO, fontSize: 13, fontWeight: 600, padding: "10px 24px", borderRadius: 6, cursor: "pointer", fontFamily: "inherit" }}>View All Case Studies →</button>
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <div style={{ padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)", background: WHITE }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", color: ORANGE, marginBottom: 10, textAlign: "center" }}>Client Stories</div>
        <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 900, textAlign: "center", marginBottom: 32, color: DARK }}>Real People. Real Approvals.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, maxWidth: 1000, margin: "0 auto" }}>
          {TESTIMONIALS.map(t => (
            <div key={t.author} style={{ background: WHITE, border: "1px solid #E5E7EB", borderRadius: 14, padding: 22 }}>
              <div style={{ color: ORANGE, fontSize: 13, marginBottom: 10 }}>★★★★★</div>
              <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.6, marginBottom: 14, fontStyle: "italic" }}>"{t.quote}"</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: DARK }}>{t.author}</div>
              <div style={{ fontSize: 11, color: "#9CA3AF" }}>{t.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ background: DARK, padding: "clamp(40px,5vw,60px) clamp(20px,4vw,48px)", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 900, color: WHITE, marginBottom: 12 }}>Ready to Get Your Loan Approved?</h2>
        <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 24 }}>Check if you qualify — free, instant, no documents needed.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => navigate("check")} style={{ background: ORANGE, color: WHITE, fontSize: 14, fontWeight: 700, padding: "13px 28px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit" }}>Check My Eligibility — Free →</button>
          <button onClick={() => navigate("advisory")} style={{ background: "transparent", color: WHITE, fontSize: 14, fontWeight: 500, padding: "13px 28px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", fontFamily: "inherit" }}>Talk to an Expert</button>
        </div>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}
