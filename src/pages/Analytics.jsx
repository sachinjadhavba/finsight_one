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
      <div style={{ background: "linear-gradient(135deg,#064E3B,#022C22)", color: "#fff", padding: "56px 48px", textAlign: "center" }}>
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
      <div style={{ padding: "64px 48px" }}>
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
      <div style={{ padding: "64px 48px", background: "#F9FAFB" }}>
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

      {/* CTA */}
      <div style={{ background: "linear-gradient(135deg,#064E3B,#059669)", padding: "56px 48px", textAlign: "center", color: "#fff" }}>
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
