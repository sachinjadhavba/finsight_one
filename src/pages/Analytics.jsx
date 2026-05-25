import { PLANS, WHAT_INCLUDED } from "../data";

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

export default function Analytics({ navigate }) {
  return (
    <div>
      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg,#064E3B,#022C22)", color: "#fff", padding: "clamp(32px,5vw,56px) clamp(20px,4vw,48px)", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#34D39920", border: "1px solid #34D39950", color: "#34D399", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "5px 16px", borderRadius: 100, marginBottom: 16 }}>
          Monthly Plans · Cancel Anytime
        </div>
        <h1 style={{ fontSize: "clamp(24px,3.5vw,34px)", fontWeight: 900, marginBottom: 10 }}>
          Always Know<br /><span style={{ color: "#34D399" }}>Where Your Money Stands</span>
        </h1>
        <p style={{ fontSize: 14, color: "#6EE7B7", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
          Monthly reports, dashboards, and alerts — so your business finances are always in order and always bank-ready.
        </p>
      </div>

      {/* PLANS */}
      <div style={{ padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", color: "#059669", marginBottom: 10, textAlign: "center" }}>Monthly Plans</div>
        <div style={{ fontSize: 30, fontWeight: 800, textAlign: "center", marginBottom: 10 }}>Pick the Plan That Fits Your Business</div>
        <div style={{ fontSize: 14, color: "#6B7280", textAlign: "center", maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.7 }}>No lock-in. No hidden fees. Cancel any month. All plans include expert preparation and delivery.</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20, maxWidth: 960, margin: "0 auto" }}>
          {PLANS.map(plan => (
            <div key={plan.name} style={{ border: `1px solid ${plan.featured ? "#059669" : "#E5E7EB"}`, borderRadius: 16, padding: 28, background: "#fff", position: "relative", boxShadow: plan.featured ? "0 0 0 2px #059669" : "none" }}>
              {plan.featured && plan.badge && (
                <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#059669", color: "#fff", fontSize: 10, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", padding: "4px 14px", borderRadius: 100, whiteSpace: "nowrap" }}>{plan.badge}</div>
              )}
              <div style={{ fontSize: 13, fontWeight: 800, color: "#059669", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{plan.name}</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: "#111827", marginBottom: 4 }}>{plan.price} <span style={{ fontSize: 14, fontWeight: 500, color: "#6B7280" }}>{plan.per}</span></div>
              <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 20, lineHeight: 1.5 }}>{plan.desc}</div>
              <ul style={{ listStyle: "none", marginBottom: 24, padding: 0 }}>
                {plan.features.map(f => (
                  <li key={f} style={{ fontSize: 12.5, color: "#374151", padding: "7px 0", borderBottom: "1px solid #F3F4F6", display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <button onClick={() => navigate("check")} style={{ width: "100%", padding: 12, borderRadius: 10, fontSize: 13, fontWeight: 700, border: plan.featured ? "none" : "1px solid #059669", cursor: "pointer", background: plan.featured ? "#059669" : "#fff", color: plan.featured ? "#fff" : "#059669" }}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* WHAT'S INCLUDED */}
      <div style={{ padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)", background: "#F9FAFB" }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", color: "#059669", marginBottom: 10, textAlign: "center" }}>What You Get Every Month</div>
        <div style={{ fontSize: 30, fontWeight: 800, textAlign: "center", marginBottom: 40 }}>More Than Just a Report</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16, maxWidth: 900, margin: "0 auto" }}>
          {WHAT_INCLUDED.map(w => (
            <div key={w.title} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{w.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 6 }}>{w.title}</div>
              <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.5 }}>{w.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* STANDALONE PRODUCTS */}
      <div style={{ padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)", background: "#fff" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", color: "#059669", marginBottom: 10, textAlign: "center" }}>Add-On Services</div>
          <div style={{ fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 8 }}>Need Just One Thing?</div>
          <div style={{ fontSize: 13, color: "#6B7280", textAlign: "center", maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.7 }}>
            Not ready for a full plan? Subscribe to individual monitoring services on their own.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
            {[
              {
                icon: "📊", name: "Working Capital Monitor",
                price: "₹1,999 / month",
                desc: "Monthly alert and summary of your working capital position. Know exactly how much cash your business has available — before your bank does.",
                features: ["Monthly WC position report", "Low-cash alert via WhatsApp", "Trend analysis (3-month rolling)", "Improvement recommendations"],
                who: "For: MSME owners managing daily cash flow"
              },
              {
                icon: "🗂️", name: "Loan Portfolio Tracker",
                price: "₹2,499 / month",
                desc: "Full visibility of all your existing loans in one place — EMI schedules, renewal dates, interest costs, and upcoming milestones.",
                features: ["All loan EMI schedule in one view", "Renewal / maturity date alerts (90 days)", "Interest cost summary", "Prepayment opportunity flags"],
                who: "For: Businesses with 2+ active loans"
              },
              {
                icon: "📅", name: "Yearly Financial Health Audit",
                price: "₹14,999 / year",
                desc: "An annual deep-dive into your complete financial health — conducted by our senior advisor and delivered as a detailed report with action items.",
                features: ["Full P&L and balance sheet review", "Credit profile assessment", "Loan readiness score for next year", "One-on-one advisory session included"],
                who: "For: Growing businesses, annual planning"
              },
            ].map(p => (
              <div key={p.name} style={{ border: "1px solid #D1FAE5", borderRadius: 16, padding: 24, background: "#F0FDF4" }}>
                <div style={{ fontSize: 26, marginBottom: 12 }}>{p.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 6 }}>{p.name}</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#059669", marginBottom: 4 }}>{p.price}</div>
                <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 12 }}>{p.who}</div>
                <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.6, marginBottom: 16 }}>{p.desc}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px" }}>
                  {p.features.map(f => (
                    <li key={f} style={{ fontSize: 12, color: "#374151", padding: "5px 0", borderBottom: "1px solid #D1FAE5", display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => window.open("https://wa.me/919999999999?text=Hi%20FinsightOne%2C%20I%27m%20interested%20in%20" + encodeURIComponent(p.name), "_blank")} style={{ width: "100%", padding: 11, borderRadius: 10, fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer", background: "#059669", color: "#fff" }}>
                  Enquire Now →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "linear-gradient(135deg,#064E3B,#059669)", padding: "clamp(32px,5vw,56px) clamp(20px,4vw,48px)", textAlign: "center", color: "#fff" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 10 }}>Stay Loan-Ready Every Month</h2>
        <p style={{ fontSize: 14, color: "#FEF3C7", marginBottom: 24 }}>Start with the free eligibility check, then pick the plan that suits your needs.</p>
        <button onClick={() => navigate("check")} style={{ background: "#fff", color: "#059669", fontSize: 14, fontWeight: 800, padding: "14px 32px", borderRadius: 10, border: "none", cursor: "pointer" }}>
          Check My Eligibility First →
        </button>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}
