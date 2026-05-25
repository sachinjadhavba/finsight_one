import Footer from "../components/Footer";

export default function SampleReport({ navigate }) {
  const score = 74;
  const scoreColor = "#059669";
  const barColor = "linear-gradient(90deg,#059669,#34D399)";

  return (
    <div>
      {/* HEADER BANNER */}
      <div style={{ background: "#ffffff", padding: "clamp(32px,4vw,48px) clamp(20px,4vw,48px)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 20 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, background: "#E8A020", color: "#fff", padding: "3px 10px", borderRadius: 20, letterSpacing: 1 }}>SAMPLE REPORT</span>
            <span style={{ fontSize: 11, color: "#64748B" }}>Loan Readiness Report — Basic</span>
          </div>
          <h1 style={{ fontSize: "clamp(18px,2.5vw,26px)", fontWeight: 800, color: "#fff", marginBottom: 6 }}>
            Credit Appraisal — Working Capital Loan
          </h1>
          <div style={{ fontSize: 13, color: "#64748B" }}>MSME Business Profile · Maharashtra · ₹65 Lakh CC Request</div>
        </div>
        {/* Score */}
        <div style={{ background: "#ffffff", borderRadius: 12, padding: "20px 28px", textAlign: "center", minWidth: 140 }}>
          <div style={{ fontSize: 48, fontWeight: 900, color: "#E8A020", lineHeight: 1 }}>{score}</div>
          <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>/100 AI Score</div>
          <div style={{ height: 6, background: "#EA580C", borderRadius: 3, marginTop: 10, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${score}%`, background: barColor, borderRadius: 3 }} />
          </div>
          <div style={{ marginTop: 8, background: "#DCFCE7", color: "#166534", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20, display: "inline-block" }}>
            ✓ GREEN — RECOMMEND
          </div>
        </div>
      </div>

      <div style={{ padding: "clamp(24px,4vw,40px) clamp(20px,4vw,48px)", maxWidth: 900, margin: "0 auto" }}>

        {/* SECTION 1 — SUMMARY */}
        <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "24px", marginBottom: 20 }}>
          <SectionTitle num="01" title="Executive Summary" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12, margin: "16px 0" }}>
            {[
              { label: "Borrower Type", val: "MSME — Manufacturing" },
              { label: "Loan Product", val: "Working Capital CC/OD" },
              { label: "Amount Requested", val: "₹65 Lakh" },
              { label: "Recommended Amount", val: "₹65 Lakh (Full)" },
              { label: "Best Lender Match", val: "Axis Bank / HDFC Bank" },
              { label: "Recommendation", val: "SUBMIT — Strong Profile" },
            ].map(i => (
              <div key={i.label} style={{ background: "#F9FAFB", borderRadius: 8, padding: "12px 14px" }}>
                <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 4 }}>{i.label}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{i.val}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "#DCFCE7", borderRadius: 8, padding: "12px 16px", fontSize: 13, color: "#166534", lineHeight: 1.6 }}>
            <strong>AI Assessment:</strong> This profile demonstrates strong creditworthiness with a stable turnover growth of 22% YoY, healthy banking behaviour, and zero DPD history. The working capital requirement of ₹65L is well within the 25% of turnover threshold at ₹2.6 Cr annual revenue. Recommend immediate submission to Axis Bank SME branch.
          </div>
        </div>

        {/* SECTION 2 — SCORE BREAKDOWN */}
        <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "24px", marginBottom: 20 }}>
          <SectionTitle num="02" title="Credit Score Breakdown" />
          <div style={{ marginTop: 16 }}>
            {[
              { param: "KYC & Business Basics",   weight: 10, score: 9,  pct: 90, color: "#059669" },
              { param: "Credit Bureau (CIBIL)",   weight: 25, score: 20, pct: 80, color: "#059669" },
              { param: "GST & Turnover Health",   weight: 20, score: 16, pct: 80, color: "#059669" },
              { param: "Banking Behaviour",       weight: 25, score: 18, pct: 72, color: "#D97706" },
              { param: "Financial Ratios",        weight: 15, score: 10, pct: 67, color: "#D97706" },
              { param: "Collateral & Security",   weight: 5,  score: 4,  pct: 80, color: "#059669" },
            ].map(r => (
              <div key={r.param} style={{ display: "grid", gridTemplateColumns: "1fr 80px 160px 50px", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #F3F4F6" }}>
                <div style={{ fontSize: 13, color: "#374151" }}>{r.param}</div>
                <div style={{ fontSize: 11, color: "#9CA3AF", textAlign: "center" }}>Weight: {r.weight}%</div>
                <div style={{ height: 8, background: "#F3F4F6", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${r.pct}%`, background: r.color === "#059669" ? "linear-gradient(90deg,#059669,#34D399)" : "linear-gradient(90deg,#D97706,#F59E0B)", borderRadius: 4 }} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: r.color, textAlign: "right" }}>{r.score}/{r.weight}</div>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0 0", borderTop: "2px solid #E5E7EB", marginTop: 4 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>Total Score</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#059669" }}>74 / 100</div>
            </div>
          </div>
        </div>

        {/* SECTION 3 — STRENGTHS & RISKS */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "24px" }}>
            <SectionTitle num="03" title="Key Strengths" color="#059669" />
            <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0" }}>
              {[
                "Zero DPD in last 24 months — clean repayment history",
                "Turnover growth 22% YoY — consistent demand",
                "CIBIL 742 — well above WC loan threshold",
                "GST vs bank statement variance below 8%",
                "Debtor aging below 60 days — healthy collections",
              ].map(s => (
                <li key={s} style={{ display: "flex", gap: 10, fontSize: 13, color: "#374151", lineHeight: 1.6, marginBottom: 10 }}>
                  <span style={{ color: "#059669", fontSize: 16, flexShrink: 0 }}>✓</span>{s}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "24px" }}>
            <SectionTitle num="04" title="Risk Flags" color="#D97706" />
            <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0" }}>
              {[
                "Cash deposit ratio 38% — slightly elevated, monitor",
                "Current ratio 1.22 — above minimum but low buffer",
                "One cheque return in last 12 months — explain in file",
              ].map(r => (
                <li key={r} style={{ display: "flex", gap: 10, fontSize: 13, color: "#374151", lineHeight: 1.6, marginBottom: 10 }}>
                  <span style={{ color: "#D97706", fontSize: 16, flexShrink: 0 }}>⚠</span>{r}
                </li>
              ))}
              <div style={{ background: "#FFFBEB", borderRadius: 8, padding: "10px 12px", fontSize: 12, color: "#92400E", marginTop: 12 }}>
                These are advisory flags — not rejection triggers. Address them in the file narrative before submission.
              </div>
            </ul>
          </div>
        </div>

        {/* SECTION 5 — NEXT STEPS */}
        <div style={{ background: "#ffffff", borderRadius: 12, padding: "24px", marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#EA580C", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Recommended Next Steps</div>
          {[
            { num: "1", step: "Prepare formal CAM note addressing the cheque return with bank statement explanation" },
            { num: "2", step: "Calculate Drawing Power using latest stock + debtors minus creditors — confirm ₹65L is within DP" },
            { num: "3", step: "Approach Axis Bank SME branch first — best profile match for your turnover and industry" },
            { num: "4", step: "Prepare 6-month projected cash flow statement to strengthen the file" },
          ].map(s => (
            <div key={s.num} style={{ display: "flex", gap: 14, marginBottom: 12 }}>
              <div style={{ width: 24, height: 24, background: "#E8A020", color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{s.num}</div>
              <div style={{ fontSize: 13, color: "#CBD5E1", lineHeight: 1.6, paddingTop: 3 }}>{s.step}</div>
            </div>
          ))}
        </div>

        {/* UPGRADE CTA */}
        <div style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 12, padding: "28px 24px", textAlign: "center" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#EA580C", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>This is a Sample Report</div>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 10 }}>
            Get Your Actual Eligibility Report
          </h3>
          <p style={{ fontSize: 14, color: "#6B7280", maxWidth: 480, margin: "0 auto 20px", lineHeight: 1.7 }}>
            Your free eligibility check gives you the score. The full report gives you the complete breakdown — all 15 parameters, exact weaknesses, lender match, and step-by-step fix plan.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate("check")} style={{ background: "#ffffff", color: "#fff", fontSize: 14, fontWeight: 700, padding: "12px 28px", borderRadius: 8, border: "none", cursor: "pointer" }}>
              Check My Eligibility — Free →
            </button>
            <button onClick={() => navigate("advisory")} style={{ background: "transparent", color: "#374151", fontSize: 14, fontWeight: 600, padding: "12px 28px", borderRadius: 8, border: "1px solid #E5E7EB", cursor: "pointer" }}>
              Get Full Report — ₹799
            </button>
          </div>
        </div>
      </div>
      <Footer navigate={navigate} />
    </div>
  );
}

function SectionTitle({ num, title, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 28, height: 28, background: color || "#0D1428", color: "#fff", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{num}</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{title}</div>
    </div>
  );
}
