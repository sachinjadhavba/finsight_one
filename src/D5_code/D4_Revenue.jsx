import { useState } from "react";

const C = {
  bg: "#0f172a",
  surface: "#1e293b",
  border: "#334155",
  accent: "#6366f1",
  accentGlow: "rgba(99,102,241,0.12)",
  green: "#00C9A7",
  amber: "#F59E0B",
  red: "#EF4444",
  teal: "#06b6d4",
  purple: "#a78bfa",
  textPrimary: "#f1f5f9",
  textSecondary: "#94a3b8",
  textMuted: "#64748b",
};

const Card = ({ children, style }) => (
  <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px", ...style }}>
    {children}
  </div>
);

const Badge = ({ label, color }) => (
  <span style={{
    display: "inline-block", padding: "2px 10px", borderRadius: 999, fontSize: 11,
    fontWeight: 700, letterSpacing: 0.5, background: color + "22", color, border: `1px solid ${color}44`,
  }}>
    {label}
  </span>
);

const TableRow = ({ cols, header, borderBottom = true, highlight }) => (
  <div style={{
    display: "grid", gridTemplateColumns: cols.map((c) => c.w || "1fr").join(" "),
    borderBottom: borderBottom ? `1px solid ${C.border}` : "none",
    background: header ? C.accent + "18" : highlight ? C.green + "18" : "transparent",
  }}>
    {cols.map((c, i) => (
      <div key={i} style={{
        padding: "9px 11px", fontSize: header ? 11 : 12,
        fontWeight: header ? 700 : c.bold ? 700 : 400,
        color: header ? C.textPrimary : c.color || C.textSecondary,
        textTransform: header ? "uppercase" : "none", letterSpacing: header ? 0.5 : 0,
        borderRight: i < cols.length - 1 ? `1px solid ${C.border}` : "none",
      }}>
        {c.val}
      </div>
    ))}
  </div>
);

const TABS = [
  { id: "headline", label: "Headline", icon: "🎯" },
  { id: "glide", label: "Month-by-Month", icon: "📈" },
  { id: "phases", label: "Phases", icon: "🏁" },
  { id: "unit", label: "Unit Economics", icon: "💡" },
  { id: "costs", label: "Costs & Profit", icon: "💰" },
  { id: "leads", label: "Lead Volume", icon: "📡" },
  { id: "risks", label: "Risks", icon: "⚠️" },
  { id: "scorecard", label: "Scorecard", icon: "📋" },
];

const REVENUE_MIX = [
  { stream: "Line 3 — Fiverr + Upwork (USD)", mrr: "₹2,10,000", usd: "$2,470", pct: 25, color: C.teal },
  { stream: "Line 1 — S1 CA/DSA retainers", mrr: "₹1,50,000", usd: "$1,765", pct: 18, color: C.accent },
  { stream: "Line 1 — S2 SME direct projects", mrr: "₹1,00,000", usd: "$1,176", pct: 12, color: "#a78bfa" },
  { stream: "Line 1 — S3 Hybrid retainers", mrr: "₹1,20,000", usd: "$1,412", pct: 14, color: C.purple },
  { stream: "Line 4 — BankReady™ Digital", mrr: "₹1,50,000", usd: "$1,765", pct: 18, color: C.amber },
  { stream: "Line 2 — Enterprise Analytics", mrr: "₹1,20,000", usd: "$1,412", pct: 14, color: C.green },
];

const GLIDE_PATH = [
  { m: "M1", period: "May 2026", l3: "25K", l1s1: "0", l1s2: "20K", l1s3: "0", l4: "0", l2: "0", total: "₹45K", usd: "$530", pct: 5 },
  { m: "M2", period: "Jun 2026", l3: "60K", l1s1: "0", l1s2: "35K", l1s3: "0", l4: "0", l2: "0", total: "₹95K", usd: "$1,120", pct: 11 },
  { m: "M3", period: "Jul 2026", l3: "85K", l1s1: "15K", l1s2: "40K", l1s3: "0", l4: "40K", l2: "0", total: "₹1.80L", usd: "$2,120", pct: 21 },
  { m: "M4", period: "Aug 2026", l3: "1.00L", l1s1: "30K", l1s2: "50K", l1s3: "35K", l4: "80K", l2: "0", total: "₹2.95L", usd: "$3,470", pct: 35 },
  { m: "M5", period: "Sep 2026", l3: "1.25L", l1s1: "45K", l1s2: "60K", l1s3: "35K", l4: "90K", l2: "0", total: "₹3.55L", usd: "$4,180", pct: 42 },
  { m: "M6", period: "Oct 2026", l3: "1.40L", l1s1: "60K", l1s2: "70K", l1s3: "70K", l4: "1.10L", l2: "50K", total: "₹5.00L", usd: "$5,880", pct: 59 },
  { m: "M7", period: "Nov 2026", l3: "1.60L", l1s1: "75K", l1s2: "80K", l1s3: "70K", l4: "1.20L", l2: "70K", total: "₹5.75L", usd: "$6,760", pct: 68 },
  { m: "M8", period: "Dec 2026", l3: "1.75L", l1s1: "90K", l1s2: "85K", l1s3: "1.05L", l4: "1.30L", l2: "85K", total: "₹6.70L", usd: "$7,880", pct: 79 },
  { m: "M9", period: "Jan 2027", l3: "1.85L", l1s1: "1.05L", l1s2: "90K", l1s3: "1.05L", l4: "1.35L", l2: "1.00L", total: "₹7.20L", usd: "$8,470", pct: 85 },
  { m: "M10", period: "Feb 2027", l3: "1.95L", l1s1: "1.20L", l1s2: "95K", l1s3: "1.05L", l4: "1.40L", l2: "1.10L", total: "₹7.65L", usd: "$9,000", pct: 90 },
  { m: "M11", period: "Mar 2027", l3: "2.05L", l1s1: "1.35L", l1s2: "1.00L", l1s3: "1.20L", l4: "1.45L", l2: "1.15L", total: "₹8.20L", usd: "$9,650", pct: 96 },
  { m: "M12", period: "Apr 2027", l3: "2.10L", l1s1: "1.50L", l1s2: "1.00L", l1s3: "1.20L", l4: "1.50L", l2: "1.20L", total: "₹8.50L", usd: "$10,000", pct: 100 },
];

const PHASES = [
  {
    phase: "Phase 1 — Foundation", range: "M1–M3", target: "₹3.2L total", color: C.accent,
    focus: "Tooling live, Fiverr/Upwork profile ranked, first paying SME client",
    ship: "Website JSX rebuild, WATI + Mailchimp + Calendly + Razorpay onboarded",
    wins: "M1: 2 Fiverr gigs closed, 1 S2 Loan Readiness Report sold",
    exit: "M3: First automation-delivered BankReady™ Basic, first CA partner signed",
  },
  {
    phase: "Phase 2 — Traction", range: "M4–M6", target: "₹11.5L total", color: C.amber,
    focus: "CA/DSA network build, S3 retainers, LinkedIn Sales Nav live",
    ship: "3 CA partners, 2 S3 retainers, first Enterprise Analytics pilot",
    wins: "M6 checkpoint: ₹5L/mo run-rate (60% of final target)",
    exit: "KPI gate: if M6 < ₹4L, reassess before Phase 3 spend",
  },
  {
    phase: "Phase 3 — Scale", range: "M7–M9", target: "₹19.7L total", color: C.green,
    focus: "Recurring revenue compounding, case study publication",
    ship: "Published Sugar Mill case + 2 new case studies, webinar funnel",
    wins: "M9: ₹7.2L/mo (85%) with 3 Analytics retainers + 10 CA partners",
    exit: "M9: 85% of target with 3 retainers and full pipeline live",
  },
  {
    phase: "Phase 4 — Lock", range: "M10–M12", target: "₹24.3L total", color: C.purple,
    focus: "Retention, upsell, renewal automation",
    ship: "M11 renewal sequence firing, 20% referral rate, 2 case webinars",
    wins: "M12: ₹8.5L MRR → $10K target achieved",
    exit: "Year 2 plan: $20K MRR",
  },
];

const UNIT_ECON = [
  {
    line: "Line 3 — Fiverr + Upwork",
    color: C.teal,
    metrics: [
      { label: "Avg order value", val: "$150 (₹12,750)" },
      { label: "Orders/mo at steady state", val: "16–18" },
      { label: "Direct cost per order", val: "₹200 Claude API + 20% platform cut" },
      { label: "Net margin after fees", val: "78%" },
    ],
  },
  {
    line: "Line 1 — S1 CA/DSA Retainers",
    color: C.accent,
    metrics: [
      { label: "Partners at M12", val: "10" },
      { label: "Avg revenue per partner", val: "₹15K/mo" },
      { label: "Acquisition cost per partner", val: "~₹500 (1 coffee + 2 demos)" },
      { label: "Recurring margin", val: "85%" },
    ],
  },
  {
    line: "Line 1 — S2 SME Direct",
    color: "#a78bfa",
    metrics: [
      { label: "Avg project value", val: "₹18K (blended LRR + CIR)" },
      { label: "Projects/mo at M12", val: "5–6" },
      { label: "Lead source", val: "Website + referrals" },
      { label: "Margin", val: "90%" },
    ],
  },
  {
    line: "Line 1 — S3 Hybrid Retainers",
    color: C.purple,
    metrics: [
      { label: "Retainer value", val: "₹35K–45K/mo" },
      { label: "Clients at M12", val: "3" },
      { label: "Margin", val: "80% (tool cost allocation)" },
    ],
  },
  {
    line: "Line 4 — FinSight Digital (BankReady™)",
    color: C.amber,
    metrics: [
      { label: "Tier mix at M12", val: "40% Basic + 40% Std + 15% Premium + 5% Enterprise" },
      { label: "Avg ticket", val: "₹85K" },
      { label: "Sales/mo at M12", val: "~2" },
      { label: "Direct cost per delivery", val: "₹1,500 Claude API + ₹500 tools" },
      { label: "Margin", val: "95%" },
    ],
  },
  {
    line: "Line 2 — Enterprise Analytics",
    color: C.green,
    metrics: [
      { label: "Clients at M12", val: "2–3 active retainers" },
      { label: "Avg retainer", val: "₹50K–60K/mo" },
      { label: "One-time project avg", val: "~₹30K rolled in" },
      { label: "Margin", val: "85%" },
    ],
  },
];

const FIXED_COSTS = [
  { item: "Tool stack (Tally/WATI/Mailchimp/Claude API/Razorpay)", m1: "₹12K", m6: "₹18K", m12: "₹25K" },
  { item: "LinkedIn Sales Nav + Apollo", m1: "₹0", m6: "₹10K", m12: "₹10K" },
  { item: "Memberships (MCCIA/MACCIA/TiE)", m1: "₹2K", m6: "₹2K", m12: "₹2K" },
  { item: "Hosting + domain + misc", m1: "₹2K", m6: "₹3K", m12: "₹3K" },
  { item: "Contract support (VA, designer, writer)", m1: "₹0", m6: "₹15K", m12: "₹30K" },
];

const PROFIT_TRAJ = [
  { m: "M3", rev: "₹1.80L", fixed: "₹20K", fees: "₹15K", net: "₹1.45L" },
  { m: "M6", rev: "₹5.00L", fixed: "₹48K", fees: "₹40K", net: "₹4.12L" },
  { m: "M9", rev: "₹7.20L", fixed: "₹60K", fees: "₹55K", net: "₹6.05L" },
  { m: "M12", rev: "₹8.50L", fixed: "₹70K", fees: "₹65K", net: "₹7.15L" },
];

const LEAD_VOL = [
  { line: "L3 Fiverr", leads: "Auto (organic + invites)", conv: "N/A" },
  { line: "L1 S1 CA/DSA", leads: "2 new partners/mo", conv: "1 active partner needed" },
  { line: "L1 S2 SME", leads: "20 qualified enquiries", conv: "25% → 5 projects" },
  { line: "L1 S3 Hybrid", leads: "10 discovery calls", conv: "10% → 1 retainer" },
  { line: "L4 Digital", leads: "30 website leads", conv: "10% → 3 sales" },
  { line: "L2 Analytics", leads: "15 LI / Apollo replies", conv: "20% → 3 discoveries → 1 close" },
];

const RISKS = [
  { risk: "Fiverr stuck at low rating", impact: "-30% L3 revenue", mitigation: "Month 1: 5 deeply discounted gigs to build rating fast", color: C.red },
  { risk: "CA/DSA partners don't convert", impact: "-15% MRR", mitigation: "If 3 signed by M4, accelerate; if not, pivot to S2 direct", color: C.amber },
  { risk: "Razorpay compliance delay", impact: "Cash flow", mitigation: "UPI + bank transfer fallback live Day 1", color: C.amber },
  { risk: "Shweta bandwidth ceiling", impact: "Scale ceiling", mitigation: "VA hired by M5, fractional CA reviewer by M8", color: C.amber },
  { risk: "Claude API cost creep", impact: "Margin erosion", mitigation: "Prompt optimization monthly; hard budget cap ₹6K/mo", color: C.teal },
  { risk: "Enterprise Analytics >6 mo cycle", impact: "M12 miss", mitigation: "Start outreach M3, not M5; no first close needed until M6", color: C.amber },
  { risk: "FX shift ₹85 → ₹75", impact: "-12% L3 INR revenue", mitigation: "Price Upwork jobs in USD with 10% buffer, monitor monthly", color: C.teal },
  { risk: "Single-person SPOF", impact: "Delivery delay", mitigation: "M6 onward: fractional analyst + CA on retainer", color: C.red },
];

const ACCELERATORS = [
  { item: "Paid ads from M7", detail: "+₹15K/mo → +₹50K MRR by M12" },
  { item: "CA volume bonus", detail: "20% commission on 5th+ partner referrals → faster signup" },
  { item: "Webinar-to-sales funnel", detail: "₹999 × 100 attendees = ₹1L quick cash M8" },
  { item: "Productized loan audit", detail: "₹5K flash product for CAs → list building" },
  { item: "Export Line 4 to USD", detail: "BankReady™ for Indian diaspora/NRI investors" },
];

const SCORECARD = [
  { metric: "Fiverr orders closed last week", target: "≥3" },
  { metric: "Upwork proposals sent", target: "≥15" },
  { metric: "LI connects sent", target: "≥50 (from M3)" },
  { metric: "Apollo emails sent", target: "≥100" },
  { metric: "Discovery calls booked", target: "≥3" },
  { metric: "Proposals/quotes sent", target: "≥2" },
  { metric: "Paid invoices collected", target: "Track YTD" },
  { metric: "BankReady™ sales closed", target: "≥0.5/wk M4+" },
];

const QUARTERLY_GATES = [
  { q: "Q1 (M3)", gate: "₹3.2L cumulative", action: "Extend runway, audit Line 3", color: C.accent },
  { q: "Q2 (M6)", gate: "₹14.7L cumulative", action: "Pause Line 2, double-down Line 4", color: C.amber },
  { q: "Q3 (M9)", gate: "₹34.4L cumulative", action: "Review pricing up 10–15%", color: C.green },
  { q: "Q4 (M12)", gate: "₹57.7L cumulative", action: "Year 2 plan: $20K MRR", color: C.purple },
];

export default function D4Revenue() {
  const [activeTab, setActiveTab] = useState("headline");

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", padding: "32px 24px", color: C.textPrimary }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: C.textMuted, textTransform: "uppercase" }}>
            FINSIGHT ONE · DELIVERABLE 4
          </span>
        </div>
        <h1 style={{ margin: "0 0 6px", fontSize: 32, fontWeight: 800, color: C.textPrimary, lineHeight: 1.2 }}>
          12-Month Revenue Plan
        </h1>
        <p style={{ margin: "0 0 8px", fontSize: 15, color: C.textSecondary }}>
          Target: $10,000 MRR by Month 12 (May 2026 → April 2027) · FX ₹85/$ · Shweta Jadhav
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
          <Badge label="TARGET $10K MRR" color={C.green} />
          <Badge label="₹8,50,000 / MONTH" color={C.amber} />
          <Badge label="~₹57.7L YEAR 1" color={C.accent} />
          <Badge label="80%+ GROSS MARGIN" color={C.teal} />
        </div>

        {/* Top KPI row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 28 }}>
          {[
            { val: "$10,000", label: "M12 MRR Target", color: C.green },
            { val: "₹8.5L/mo", label: "INR equivalent", color: C.amber },
            { val: "~₹57.7L", label: "Year 1 Revenue", color: C.accent },
            { val: "~₹42L", label: "Year 1 Net (pre-tax)", color: C.teal },
            { val: "80%+", label: "Blended Gross Margin", color: C.purple },
          ].map((k) => (
            <Card key={k.label} style={{ textAlign: "center", padding: "14px 10px" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: k.color }}>{k.val}</div>
              <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4 }}>{k.label}</div>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 3, marginBottom: 20, background: C.surface, padding: 4, borderRadius: 10, border: `1px solid ${C.border}`, flexWrap: "wrap" }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                flex: 1, minWidth: 80, padding: "9px 6px", borderRadius: 7, border: "none", cursor: "pointer",
                fontSize: 11, fontWeight: 600, background: activeTab === t.id ? C.accent : "transparent",
                color: activeTab === t.id ? "#fff" : C.textMuted, transition: "all 0.2s",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
              }}
            >
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        {/* HEADLINE */}
        {activeTab === "headline" && (
          <div style={{ display: "grid", gap: 16 }}>
            <Card>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary, marginBottom: 14 }}>Revenue Mix at Steady State (M12)</div>
              <div style={{ display: "grid", gap: 8 }}>
                {REVENUE_MIX.map((r) => (
                  <div key={r.stream}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 13, color: C.textSecondary }}>{r.stream}</span>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: r.color }}>{r.mrr}</span>
                        <Badge label={`${r.pct}%`} color={r.color} />
                      </div>
                    </div>
                    <div style={{ height: 6, background: C.border, borderRadius: 999, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${r.pct * 4}%`, background: r.color, borderRadius: 999 }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, padding: "12px 14px", background: C.green + "18", borderRadius: 8, border: `1px solid ${C.green}33` }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: C.green }}>TOTAL M12: ₹8,50,000 = $10,000 MRR</span>
              </div>
            </Card>
            <Card>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary, marginBottom: 10 }}>Explicit Assumptions</div>
              {[
                "FX constant at ₹85/$ (stress-tested at ₹78, ₹88)",
                "Shweta full-time on business from M1",
                "No external capital raise required — bootstrap only",
                "Pune base retained (cost of living flex)",
                "No hiring until M5 (VA), M8 (CA reviewer)",
                "Existing website on Vercel free tier",
                "Zero legal/compliance blockers on proprietorship structure",
                "41-item Loan Readiness Checklist ready for Day-0 email by M1",
              ].map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                  <span style={{ color: C.accent }}>✓</span>
                  <span style={{ fontSize: 13, color: C.textSecondary }}>{a}</span>
                </div>
              ))}
            </Card>
          </div>
        )}

        {/* GLIDE PATH */}
        {activeTab === "glide" && (
          <div style={{ display: "grid", gap: 16 }}>
            <Card>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary, marginBottom: 14 }}>Month-by-Month Glide Path</div>
              <div style={{ borderRadius: 8, overflow: "hidden", border: `1px solid ${C.border}`, overflowX: "auto" }}>
                <TableRow header cols={[
                  { val: "Mo", w: "40px" }, { val: "Period", w: "90px" },
                  { val: "L3 Fiverr", w: "70px" }, { val: "L1-S1", w: "65px" },
                  { val: "L1-S2", w: "65px" }, { val: "L1-S3", w: "65px" },
                  { val: "L4 Digital", w: "75px" }, { val: "L2 Analytics", w: "80px" },
                  { val: "TOTAL", w: "75px" }, { val: "USD", w: "70px" }, { val: "% Goal", w: "60px" },
                ]} />
                {GLIDE_PATH.map((row, i) => (
                  <TableRow
                    key={row.m}
                    borderBottom={i < GLIDE_PATH.length - 1}
                    highlight={row.m === "M12"}
                    cols={[
                      { val: row.m, w: "40px", bold: true, color: C.textPrimary },
                      { val: row.period, w: "90px" },
                      { val: row.l3, w: "70px", color: C.teal },
                      { val: row.l1s1, w: "65px", color: C.accent },
                      { val: row.l1s2, w: "65px", color: "#a78bfa" },
                      { val: row.l1s3, w: "65px", color: C.purple },
                      { val: row.l4, w: "75px", color: C.amber },
                      { val: row.l2, w: "80px", color: C.green },
                      { val: row.total, w: "75px", bold: true, color: C.textPrimary },
                      { val: row.usd, w: "70px", color: C.green },
                      { val: `${row.pct}%`, w: "60px", color: row.pct >= 100 ? C.green : C.textMuted },
                    ]}
                  />
                ))}
              </div>
              <p style={{ fontSize: 11, color: C.textMuted, marginTop: 8 }}>
                L = Lakh = ₹100,000 · K = ₹1,000 · Cumulative Y1: ~₹57.7 Lakh ≈ $67,900
              </p>
            </Card>

            {/* Progress bar visual */}
            <Card>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary, marginBottom: 12 }}>Progress to $10K MRR</div>
              <div style={{ display: "grid", gap: 6 }}>
                {GLIDE_PATH.map((row) => (
                  <div key={row.m} style={{ display: "grid", gridTemplateColumns: "30px 80px 1fr 60px", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.textMuted }}>{row.m}</span>
                    <span style={{ fontSize: 11, color: C.textMuted }}>{row.usd}</span>
                    <div style={{ height: 8, background: C.border, borderRadius: 999, overflow: "hidden" }}>
                      <div style={{
                        height: "100%", width: `${row.pct}%`,
                        background: row.pct >= 100 ? C.green : row.pct >= 75 ? C.amber : C.accent,
                        borderRadius: 999, transition: "width 0.5s",
                      }} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: row.pct >= 100 ? C.green : C.textMuted }}>{row.pct}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* PHASES */}
        {activeTab === "phases" && (
          <div style={{ display: "grid", gap: 16 }}>
            {PHASES.map((p) => (
              <Card key={p.phase} style={{ borderColor: p.color + "44" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: p.color }}>{p.phase}</div>
                    <div style={{ fontSize: 12, color: C.textMuted }}>{p.range}</div>
                  </div>
                  <Badge label={p.target} color={p.color} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[
                    ["🎯 Focus", p.focus],
                    ["🚢 Ship", p.ship],
                    ["🏆 Wins", p.wins],
                    ["🚪 Exit Condition", p.exit],
                  ].map(([label, val]) => (
                    <div key={label} style={{ background: C.bg, borderRadius: 8, padding: "10px 12px", border: `1px solid ${C.border}` }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: p.color, marginBottom: 4 }}>{label}</div>
                      <div style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.6 }}>{val}</div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* UNIT ECONOMICS */}
        {activeTab === "unit" && (
          <div style={{ display: "grid", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              {UNIT_ECON.map((u) => (
                <Card key={u.line} style={{ borderColor: u.color + "33" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: u.color, marginBottom: 12 }}>{u.line}</div>
                  {u.metrics.map((m) => (
                    <div key={m.label} style={{ display: "flex", justifyContent: "space-between", gap: 8, padding: "6px 0", borderBottom: `1px solid ${C.border}` }}>
                      <span style={{ fontSize: 12, color: C.textMuted }}>{m.label}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: C.textPrimary }}>{m.val}</span>
                    </div>
                  ))}
                </Card>
              ))}
            </div>
            <Card>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary, marginBottom: 12 }}>🚀 Accelerators (Optional — Not in Base Plan)</div>
              {ACCELERATORS.map((a) => (
                <div key={a.item} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary }}>{a.item}</span>
                  <span style={{ fontSize: 12, color: C.green }}>{a.detail}</span>
                </div>
              ))}
            </Card>
          </div>
        )}

        {/* COSTS & PROFIT */}
        {activeTab === "costs" && (
          <div style={{ display: "grid", gap: 16 }}>
            <Card>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary, marginBottom: 14 }}>Fixed Monthly Costs</div>
              <div style={{ borderRadius: 8, overflow: "hidden", border: `1px solid ${C.border}` }}>
                <TableRow header cols={[{ val: "Item", w: "3fr" }, { val: "M1", w: "0.8fr" }, { val: "M6", w: "0.8fr" }, { val: "M12", w: "0.8fr" }]} />
                {FIXED_COSTS.map((row, i) => (
                  <TableRow
                    key={row.item}
                    borderBottom={i < FIXED_COSTS.length - 1}
                    cols={[
                      { val: row.item, w: "3fr" },
                      { val: row.m1, w: "0.8fr" },
                      { val: row.m6, w: "0.8fr" },
                      { val: row.m12, w: "0.8fr" },
                    ]}
                  />
                ))}
                <div style={{ display: "grid", gridTemplateColumns: "3fr 0.8fr 0.8fr 0.8fr", background: C.accent + "18", borderTop: `1px solid ${C.border}` }}>
                  {["Total Fixed Cost", "₹16K", "₹48K", "₹70K"].map((v, i) => (
                    <div key={i} style={{ padding: "10px 11px", fontSize: 12, fontWeight: 800, color: C.textPrimary, borderRight: i < 3 ? `1px solid ${C.border}` : "none" }}>{v}</div>
                  ))}
                </div>
              </div>
            </Card>
            <Card>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary, marginBottom: 14 }}>Profit Trajectory</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
                {PROFIT_TRAJ.map((p) => (
                  <div key={p.m} style={{
                    background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 16px",
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, marginBottom: 8 }}>{p.m}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 11, color: C.textMuted }}>Revenue</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: C.textPrimary }}>{p.rev}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 11, color: C.textMuted }}>Fixed cost</span>
                      <span style={{ fontSize: 12, color: C.red }}>-{p.fixed}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontSize: 11, color: C.textMuted }}>Platform fees</span>
                      <span style={{ fontSize: 12, color: C.red }}>-{p.fees}</span>
                    </div>
                    <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 8, display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: C.textMuted }}>Net (pre-tax)</span>
                      <span style={{ fontSize: 15, fontWeight: 800, color: C.green }}>{p.net}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, padding: "10px 14px", background: C.green + "11", borderRadius: 8, border: `1px solid ${C.green}33` }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.green }}>Year 1 pre-tax net: ~₹42 Lakh (after fixed costs and platform fees)</span>
              </div>
            </Card>
          </div>
        )}

        {/* LEAD VOLUME */}
        {activeTab === "leads" && (
          <div style={{ display: "grid", gap: 16 }}>
            <Card>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary, marginBottom: 4 }}>Lead Volume Requirements at M12</div>
              <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 14 }}>
                Total inbound lead volume at M12: ~75 touches/week (website + outreach combined)
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                {LEAD_VOL.map((l) => (
                  <div key={l.line} style={{
                    background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8,
                    padding: "12px 14px", display: "grid", gridTemplateColumns: "120px 1fr 1fr", gap: 12, alignItems: "center",
                  }}>
                    <Badge label={l.line} color={C.accent} />
                    <div>
                      <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 2 }}>LEADS NEEDED / MO</div>
                      <div style={{ fontSize: 13, color: C.textPrimary }}>{l.leads}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 2 }}>CONVERSION</div>
                      <div style={{ fontSize: 13, color: C.green }}>{l.conv}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary, marginBottom: 12 }}>Quarterly Gates</div>
              <div style={{ display: "grid", gap: 10 }}>
                {QUARTERLY_GATES.map((g) => (
                  <div key={g.q} style={{
                    background: g.color + "0d", border: `1px solid ${g.color}33`, borderRadius: 8,
                    padding: "12px 16px", display: "grid", gridTemplateColumns: "80px 1fr 2fr", gap: 12, alignItems: "center",
                  }}>
                    <Badge label={g.q} color={g.color} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: g.color }}>{g.gate}</span>
                    <span style={{ fontSize: 12, color: C.textSecondary }}>{g.action}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* RISKS */}
        {activeTab === "risks" && (
          <div style={{ display: "grid", gap: 16 }}>
            <Card>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary, marginBottom: 14 }}>⚠️ Risk Register & Mitigations</div>
              <div style={{ display: "grid", gap: 10 }}>
                {RISKS.map((r) => (
                  <div key={r.risk} style={{
                    background: r.color + "0d", border: `1px solid ${r.color}33`,
                    borderRadius: 8, padding: "12px 16px",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: r.color }}>{r.risk}</span>
                      <Badge label={r.impact} color={r.color} />
                    </div>
                    <div style={{ fontSize: 12, color: C.textSecondary }}>
                      <span style={{ color: C.green }}>→ </span>{r.mitigation}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* SCORECARD */}
        {activeTab === "scorecard" && (
          <div style={{ display: "grid", gap: 16 }}>
            <Card>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary, marginBottom: 4 }}>Weekly Scorecard (Every Monday 9 AM)</div>
              <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 14 }}>Shweta's operating cadence</div>
              <div style={{ display: "grid", gap: 8 }}>
                {SCORECARD.map((s) => (
                  <div key={s.metric} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "10px 14px", background: C.bg, borderRadius: 8, border: `1px solid ${C.border}`,
                  }}>
                    <span style={{ fontSize: 13, color: C.textSecondary }}>{s.metric}</span>
                    <Badge label={s.target} color={C.green} />
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary, marginBottom: 12 }}>📅 Reporting Cadence</div>
              {[
                { freq: "Daily", what: "Tally/Sheet lead log review (5 min)" },
                { freq: "Weekly (Mon)", what: "Monday scorecard — 30 min" },
                { freq: "Monthly", what: "P&L, pipeline, channel ROI — 90 min" },
                { freq: "Quarterly", what: "Strategic review + pricing check + hiring gate — 3 hours" },
              ].map((r) => (
                <div key={r.freq} style={{
                  display: "flex", gap: 12, alignItems: "center", padding: "8px 0",
                  borderBottom: `1px solid ${C.border}`,
                }}>
                  <Badge label={r.freq} color={C.accent} />
                  <span style={{ fontSize: 13, color: C.textSecondary }}>{r.what}</span>
                </div>
              ))}
            </Card>
          </div>
        )}

        <div style={{ marginTop: 32, textAlign: "center", fontSize: 11, color: C.textMuted }}>
          © 2026 FinSight One · Shweta Jadhav · Pune, India &nbsp;·&nbsp; Deliverable 4 of 5
        </div>
      </div>
    </div>
  );
}
