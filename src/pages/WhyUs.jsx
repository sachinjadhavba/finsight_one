import Footer from "../components/Footer";

export default function WhyUs({ navigate }) {
  return (
    <div>
      <div style={{ background: "#0D1428", padding: "clamp(44px,6vw,72px) clamp(20px,4vw,48px)", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(232,160,32,0.15)", border: "1px solid rgba(232,160,32,0.3)", color: "#E8A020", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "5px 16px", borderRadius: 100, marginBottom: 20 }}>The Honest Comparison</div>
        <h1 style={{ fontSize: "clamp(26px,3.5vw,44px)", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: 16 }}>
          Why FinSight One?<br /><span style={{ color: "#E8A020" }}>Not a Bank. Not a DSA. Not Your CA.</span>
        </h1>
        <p style={{ fontSize: 16, color: "#94A3B8", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
          Each of these serves a different purpose. Here is an honest breakdown of what each one does — and does not do — for you.
        </p>
      </div>

      <div style={{ padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr>
                <th style={{ background: "#F9FAFB", padding: "14px 16px", textAlign: "left", color: "#6B7280", fontWeight: 600, borderBottom: "2px solid #E5E7EB", fontSize: 12, minWidth: 180 }}>What You Need</th>
                {[
                  { label: "Your Bank", color: "#DC2626" },
                  { label: "A DSA",     color: "#D97706" },
                  { label: "Your CA",   color: "#2563EB" },
                  { label: "FinSight One", color: "#166534", highlight: true },
                ].map(h => (
                  <th key={h.label} style={{ background: h.highlight ? "#0D1428" : "#F9FAFB", padding: "14px 16px", textAlign: "center", color: h.highlight ? "#E8A020" : "#374151", fontWeight: 700, borderBottom: "2px solid #E5E7EB", fontSize: h.highlight ? 14 : 12, minWidth: 130 }}>
                    {h.label}
                    {h.highlight && <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 400, marginTop: 2 }}>Recommended</div>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Tell you honestly if you will be approved",  "❌","❌","❌","✅"],
                ["Identify rejection risk before you apply",   "❌","❌","❌","✅"],
                ["Match you to the best lender",               "❌","Partial","❌","✅"],
                ["Prepare banker-ready documents (CAM/CMA)",   "❌","❌","Partial","✅"],
                ["Submit to 275+ lenders",                     "❌","1 bank","❌","✅"],
                ["Follow up till disbursement",                "❌","Partial","❌","✅"],
                ["Monthly financial health monitoring",        "❌","❌","Partial","✅"],
                ["Handle rejected loan recovery",              "❌","❌","❌","✅"],
                ["Earn DSA commission",                        "N/A","✅","Partial","✅"],
                ["Work in your interest (not bank's)",         "❌","❌","✅","✅"],
              ].map(([feat, bank, dsa, ca, fs], i) => (
                <tr key={feat} style={{ background: i % 2 === 0 ? "#fff" : "#F9FAFB" }}>
                  <td style={{ padding: "12px 16px", color: "#374151", fontWeight: 500, borderBottom: "1px solid #F3F4F6" }}>{feat}</td>
                  {[bank, dsa, ca, fs].map((v, ci) => (
                    <td key={ci} style={{ padding: "12px 16px", textAlign: "center", borderBottom: "1px solid #F3F4F6", fontSize: 16, background: ci === 3 ? "rgba(22,101,52,0.04)" : "transparent" }}>
                      {v === "✅" ? <span style={{ color: "#166534" }}>✅</span>
                       : v === "❌" ? <span style={{ color: "#9CA3AF", fontSize: 13 }}>—</span>
                       : <span style={{ fontSize: 11, color: "#6B7280" }}>{v}</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ background: "#0D1428", padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)", textAlign: "center" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Ready to Experience the Difference?</h2>
        <p style={{ fontSize: 15, color: "#94A3B8", marginBottom: 28 }}>Free eligibility check — 2 minutes — no documents needed.</p>
        <button onClick={() => navigate("check")} style={{ background: "#E8A020", color: "#fff", fontSize: 15, fontWeight: 700, padding: "14px 36px", borderRadius: 8, border: "none", cursor: "pointer" }}>
          Check My Eligibility — Free →
        </button>
      </div>
      <Footer navigate={navigate} />
    </div>
  );
}
