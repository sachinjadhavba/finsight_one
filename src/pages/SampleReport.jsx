import Footer from "../components/Footer";

const INDIGO = "#4F46E5";
const ORANGE = "#EA580C";
const GREEN  = "#059669";
const AMBER  = "#D97706";
const DARK   = "#111827";
const MUTED  = "#6B7280";
const WHITE  = "#fff";
const GRAY   = "#F9FAFB";

function SecTitle({ num, title, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
      <div style={{ width: 28, height: 28, background: color || INDIGO, color: WHITE, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, flexShrink: 0, fontFamily: "Arial,sans-serif" }}>{num}</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: DARK }}>{title}</div>
    </div>
  );
}

export default function SampleReport({ navigate }) {
  const score = 74;

  return (
    <div style={{ fontFamily: "Arial,sans-serif", background: GRAY }}>

      {/* ── REPORT HEADER ── */}
      <div style={{ background: DARK, padding: "clamp(24px,4vw,40px) clamp(20px,4vw,48px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 20 }}>
          <div>
            {/* Logo in header */}
            <div style={{ display: "flex", alignItems: "baseline", marginBottom: 12 }}>
              <span style={{ fontFamily: "Arial,sans-serif", fontSize: 16, fontWeight: 900, color: "#818CF8" }}>Fin</span>
              <span style={{ fontFamily: "Arial,sans-serif", fontSize: 16, fontWeight: 900, color: WHITE }}>sight</span>
              <span style={{ fontFamily: "Arial,sans-serif", fontSize: 16, fontWeight: 200, color: "#818CF8" }}>&nbsp;One</span>
              <span style={{ display: "inline-block", width: 4, height: 4, background: ORANGE, borderRadius: "50%", marginLeft: 2, marginBottom: 5 }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 10, fontWeight: 700, background: ORANGE, color: WHITE, padding: "3px 10px", borderRadius: 20, letterSpacing: 1 }}>SAMPLE REPORT</span>
              <span style={{ fontSize: 11, color: "#64748B" }}>Loan Readiness Report — Basic</span>
            </div>
            <h1 style={{ fontSize: "clamp(18px,2.5vw,24px)", fontWeight: 800, color: WHITE, marginBottom: 6, lineHeight: 1.2 }}>
              Credit Appraisal — Working Capital Loan
            </h1>
            <div style={{ fontSize: 13, color: "#64748B" }}>MSME Business Profile · Maharashtra · ₹65 Lakh CC Request</div>
          </div>

          {/* Score Card */}
          <div style={{ background: "#1F2937", borderRadius: 12, padding: "20px 24px", textAlign: "center", minWidth: 140, border: "1px solid #374151" }}>
            <div style={{ fontSize: 48, fontWeight: 900, color: ORANGE, lineHeight: 1 }}>{score}</div>
            <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 4 }}>/100 AI Score</div>
            <div style={{ height: 6, background: "#374151", borderRadius: 3, marginTop: 10, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${score}%`, background: "linear-gradient(90deg,#059669,#34D399)", borderRadius: 3 }} />
            </div>
            <div style={{ marginTop: 10, background: "#DCFCE7", color: GREEN, fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20, display: "inline-block" }}>
              ✓ GREEN — RECOMMEND
            </div>
          </div>
        </div>
      </div>

      {/* ── REPORT BODY ── */}
      <div style={{ padding: "clamp(20px,4vw,36px) clamp(20px,4vw,48px)", maxWidth: 900, margin: "0 auto" }}>

        {/* SECTION 1 — SUMMARY */}
        <div style={{ background: WHITE, border: "1px solid #E5E7EB", borderRadius: 12, padding: 24, marginBottom: 16 }}>
          <SecTitle num="01" title="Executive Summary" color={INDIGO} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 10, marginBottom: 16 }}>
            {[
              { label: "Borrower Type",       val: "MSME — Manufacturing" },
              { label: "Loan Product",        val: "Working Capital CC/OD" },
              { label: "Amount Requested",    val: "₹65 Lakh" },
              { label: "Recommended Amount",  val: "₹65 Lakh (Full)" },
              { label: "Best Lender Match",   val: "Axis Bank / HDFC Bank" },
              { label: "Recommendation",      val: "SUBMIT — Strong Profile" },
            ].map(i => (
              <div key={i.label} style={{ background: GRAY, borderRadius: 8, padding: "10px 12px" }}>
                <div style={{ fontSize: 10, color: "#9CA3AF", marginBottom: 4 }}>{i.label}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: DARK }}>{i.val}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "#DCFCE7", borderRadius: 8, padding: "12px 14px", fontSize: 13, color: "#166534", lineHeight: 1.6 }}>
            <strong>AI Assessment:</strong> This profile demonstrates strong creditworthiness with stable turnover growth of 22% YoY, healthy banking behaviour, and zero DPD history. The ₹65L CC requirement is within the 25% turnover threshold at ₹2.6 Cr annual revenue. Recommend immediate submission to Axis Bank SME branch.
          </div>
        </div>

        {/* SECTION 2 — SCORE BREAKDOWN */}
        <div style={{ background: WHITE, border: "1px solid #E5E7EB", borderRadius: 12, padding: 24, marginBottom: 16 }}>
          <SecTitle num="02" title="Credit Score Breakdown" color={INDIGO} />
          {[
            { param: "KYC & Business Basics",  weight: 10, score: 9,  pct: 90, color: GREEN },
            { param: "Credit Bureau (CIBIL)",  weight: 25, score: 20, pct: 80, color: GREEN },
            { param: "GST & Turnover Health",  weight: 20, score: 16, pct: 80, color: GREEN },
            { param: "Banking Behaviour",      weight: 25, score: 18, pct: 72, color: AMBER },
            { param: "Financial Ratios",       weight: 15, score: 10, pct: 67, color: AMBER },
            { param: "Collateral & Security",  weight: 5,  score: 4,  pct: 80, color: GREEN },
          ].map(r => (
            <div key={r.param} style={{ display: "grid", gridTemplateColumns: "1fr 80px 1fr 50px", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #F3F4F6" }}>
              <div style={{ fontSize: 13, color: "#374151" }}>{r.param}</div>
              <div style={{ fontSize: 11, color: "#9CA3AF", textAlign: "center" }}>Wt: {r.weight}%</div>
              <div style={{ height: 7, background: "#F3F4F6", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${r.pct}%`, background: r.color, borderRadius: 4 }} />
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: r.color, textAlign: "right" }}>{r.score}/{r.weight}</div>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0 0", borderTop: "2px solid #E5E7EB" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: DARK }}>Total Score</span>
            <span style={{ fontSize: 20, fontWeight: 900, color: GREEN }}>74 / 100</span>
          </div>
        </div>

        {/* SECTION 3+4 — STRENGTHS & RISKS */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div style={{ background: WHITE, border: "1px solid #E5E7EB", borderRadius: 12, padding: 20 }}>
            <SecTitle num="03" title="Key Strengths" color={GREEN} />
            {["Zero DPD in last 24 months — clean repayment history","Turnover growth 22% YoY — consistent demand","CIBIL 742 — well above WC loan threshold","GST vs bank statement variance below 8%","Debtor aging below 60 days — healthy collections"].map(s => (
              <div key={s} style={{ display: "flex", gap: 8, fontSize: 12, color: "#374151", lineHeight: 1.5, marginBottom: 8 }}>
                <span style={{ color: GREEN, flexShrink: 0 }}>✓</span>{s}
              </div>
            ))}
          </div>
          <div style={{ background: WHITE, border: "1px solid #E5E7EB", borderRadius: 12, padding: 20 }}>
            <SecTitle num="04" title="Risk Flags" color={AMBER} />
            {["Cash deposit ratio 38% — slightly elevated, monitor","Current ratio 1.22 — above minimum but low buffer","One cheque return in last 12 months — explain in file"].map(r => (
              <div key={r} style={{ display: "flex", gap: 8, fontSize: 12, color: "#374151", lineHeight: 1.5, marginBottom: 8 }}>
                <span style={{ color: AMBER, flexShrink: 0 }}>⚠</span>{r}
              </div>
            ))}
            <div style={{ background: "#FFFBEB", borderRadius: 6, padding: "8px 10px", fontSize: 11, color: "#92400E", marginTop: 8 }}>
              Advisory flags only — not rejection triggers.
            </div>
          </div>
        </div>

        {/* SECTION 5 — NEXT STEPS */}
        <div style={{ background: DARK, borderRadius: 12, padding: 24, marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: ORANGE, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Recommended Next Steps</div>
          {[
            "Prepare formal CAM note addressing the cheque return with bank statement explanation",
            "Calculate Drawing Power using latest stock + debtors minus creditors — confirm ₹65L is within DP",
            "Approach Axis Bank SME branch first — best profile match for your turnover and industry",
            "Prepare 6-month projected cash flow statement to strengthen the file",
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 22, height: 22, background: ORANGE, color: WHITE, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{i+1}</div>
              <div style={{ fontSize: 13, color: "#CBD5E1", lineHeight: 1.6, paddingTop: 2 }}>{s}</div>
            </div>
          ))}
        </div>

        {/* UPGRADE CTA */}
        <div style={{ background: WHITE, border: "1px solid #E5E7EB", borderRadius: 12, padding: "24px", textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: ORANGE, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>This is a Sample Report</div>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: DARK, marginBottom: 10 }}>Get Your Actual Eligibility Report</h3>
          <p style={{ fontSize: 14, color: MUTED, maxWidth: 480, margin: "0 auto 20px", lineHeight: 1.7 }}>
            Your free check gives you the score. The full report gives you the complete breakdown — all 15 parameters, exact weaknesses, lender match, and step-by-step fix plan.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate("check")} style={{ background: INDIGO, color: WHITE, fontSize: 14, fontWeight: 700, padding: "12px 28px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
              Check My Eligibility — Free →
            </button>
            <button onClick={() => navigate("advisory")} style={{ background: "transparent", color: DARK, fontSize: 14, fontWeight: 600, padding: "12px 28px", borderRadius: 8, border: "1px solid #E5E7EB", cursor: "pointer", fontFamily: "inherit" }}>
              Get Full Report — ₹799
            </button>
          </div>
        </div>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}
