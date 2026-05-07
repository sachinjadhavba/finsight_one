import { useState } from "react";

const C = {
  bg: "#0f172a",
  surface: "#1e293b",
  surfaceHover: "#273449",
  border: "#334155",
  accent: "#6366f1",
  accentGlow: "rgba(99,102,241,0.15)",
  green: "#00C9A7",
  amber: "#F59E0B",
  red: "#EF4444",
  textPrimary: "#f1f5f9",
  textSecondary: "#94a3b8",
  textMuted: "#64748b",
};

const Badge = ({ label, color }) => (
  <span
    style={{
      display: "inline-block",
      padding: "2px 10px",
      borderRadius: 999,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 0.5,
      background: color + "22",
      color: color,
      border: `1px solid ${color}44`,
    }}
  >
    {label}
  </span>
);

const Card = ({ children, style }) => (
  <div
    style={{
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: "20px 24px",
      ...style,
    }}
  >
    {children}
  </div>
);

const SectionTitle = ({ icon, title, sub }) => (
  <div style={{ marginBottom: 16 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      <span style={{ fontSize: 16, fontWeight: 700, color: C.textPrimary }}>{title}</span>
    </div>
    {sub && <p style={{ margin: "4px 0 0 26px", fontSize: 12, color: C.textMuted }}>{sub}</p>}
  </div>
);

const BulletList = ({ items, color = C.textSecondary }) => (
  <ul style={{ margin: 0, paddingLeft: 20 }}>
    {items.map((item, i) => (
      <li key={i} style={{ color, fontSize: 13, lineHeight: 1.7, marginBottom: 2 }}>
        {item}
      </li>
    ))}
  </ul>
);

const TABS = [
  { id: "surfaced", label: "A. Corpus Status", icon: "📂" },
  { id: "digital", label: "B. Digital PDF", icon: "🏦" },
  { id: "streams", label: "C. New Stream", icon: "🔀" },
  { id: "gating", label: "D. Gating Qs", icon: "🚦" },
];

const A_SURFACED = {
  already: [
    "4-line service architecture (Credit / Analytics / Freelance / Digital)",
    "Success-fee model for MSME loan advisory",
    "Agri-finance vertical (KCC, NABARD, Agri-input lending)",
    "Former Regional Credit & Risk Analyst positioning",
    "ML portfolio scoring (1,000+ farmer accounts)",
    "₹3,000 Cr+ aggregate client company turnover",
    "30% portfolio quality improvement claim",
    "Pune / Maharashtra geographic base",
    "3-strategy routing (Proxy / SME Direct / Hybrid)",
    "First-10-customer acquisition plan",
  ],
  underUsed: [
    "20 Years experience (previously stated as 8 — corrected, not yet woven into all touchpoints)",
    "CA/DSA channel economics (commission %, margin split) — mentioned but not quantified",
    "Cross-sell logic between lines (Credit → Analytics, Digital → Credit) — not operationalized",
    "Rejection-reversal use case — powerful anchor, under-marketed",
  ],
  notSurfaced: [
    "Detailed competitor/market mapping per line",
    "Seasonality of agri-lending cycles (Kharif/Rabi timing)",
    "Specific NBFC/bank names Shweta has worked with (for social proof)",
    "Maharashtra district-level MSME cluster targeting (Pune / Nashik / Ahmednagar / Kolhapur)",
    "Trade associations beyond MCCIA (MACCIA, TiE Pune, NASSCOM)",
    "Pricing anchors from competitors (what CAs/DSAs currently charge)",
    "Indian proprietorship compliance details (Udyam, Shop Act, GST threshold)",
  ],
  gaps: [
    "Q: Any signed NDAs/MSAs limiting how past client names can be used?",
    "Q: GST registration status (turnover-dependent trigger)?",
    "Q: Existing Upwork/Fiverr profile maturity (rating, reviews, hours logged)?",
    "Q: Current bandwidth per week available for delivery (hrs/wk)?",
  ],
};

const B_DIGITAL = {
  notYet: [
    'Hero headline: "Banker-Grade Documents. Loans Sanctioned." with 3-deliverable subhead (CAM · CMA · DPR)',
    "6-reason card grid ("Why Pay Before Seeing the Report?") — trust-building block",
    "BankReady™ 4-tier pricing table: Basic ₹40K · Standard ₹90K · Premium ₹2L · Enterprise ₹3.5L (all + GST 18%)",
    "Us-vs-Market comparison table (9 criteria × 4 columns: CA / DSA / Consultant / FinSight Digital)",
    "5-step process ("Enquiry to Bank Submission in 10 Days")",
    "Sugar Mill case study: ₹60 Cr, Maharashtra, anonymised, 12 risk flags, 4.17x ICR by FY30",
    "System D Automation Architecture (9-box flow in 3 rows)",
    "6 tool-stack cards: Tally.so · WATI+AiSensy · Mailchimp+ConvertKit · Notion+HubSpot · Claude API · Razorpay+UPI",
    "Email campaigns: Day 0 (41-item Loan Readiness Checklist) + Day 5 (Sugar Mill case study)",
    "WhatsApp campaigns: Instant ACK menu (1–4 package reply) + CA/DSA monthly broadcast (15–25% B2B discount)",
    "Contact form: 7 fields — name, business, loan amount, loan type, bank, timeline, WhatsApp submit",
    "Renewal reminder at Month 11 · Referral ask at Day 30 post-sanction",
    'Footer correction needed: "Shweta Sachin Jadhav" → "Shweta Jadhav"',
  ],
  clarify: [
    "Q: Is 41-item Loan Readiness Checklist a ready PDF or to be authored?",
    "Q: Sugar Mill case study — cleared for public use or NDA-gated?",
    "Q: WATI vs AiSensy — pick one or both (they overlap)?",
    "Q: Claude API budget ceiling per month?",
    "Q: Razorpay merchant onboarding status (approved / pending / not started)?",
  ],
};

const C_STREAMS = {
  routed: [
    "Strategy 1: Proxy Entry (CA / DSA / Loan consultants / Credit advisory / DSA networks)",
    "Strategy 2: SME-side wedge (Loan readiness reports, Financial analysis, Credit improvement)",
    "Strategy 3: Consultant + Automation hybrid",
  ],
  notOperationalized: [
    'S1 explicit offers: "Credit memo automation / Loan file processing / Client reporting" as 3 distinct SKUs for CA/DSA partners',
    'S1 positioning line: "Backend engine for people who already sell to lenders" — not yet used as tagline',
    "S2 output productization: "Loan readiness reports" and "Credit improvement reports" as 2 low-ticket entry SKUs priced below BankReady™ Basic",
    "S3 retainer construct: price point and deliverable cadence still undefined",
    'Regulatory friction note from S2 ("No regulatory friction") — needs to be risk-comms anchor',
  ],
  gaps: [
    "No unified pricing grid showing S1 / S2 / S3 alongside BankReady™ 4 tiers",
    "No decision tree for "which strategy fires for which lead type"",
    "No commission structure for S1 CA/DSA partners (% of fee)",
    "No qualification question in intake form that routes lead to S1/S2/S3 automatically",
  ],
};

const D_GATING = [
  {
    label: "D1 — Automation scope (blocks D2)",
    color: C.accent,
    qs: [
      "Q: Approve full System D stack (Tally + WATI + Mailchimp + Claude API + Razorpay)?",
      "Q: Budget ceiling per month for tool stack?",
      "Q: Human-gate every automation output, or full auto-send on low-ticket items?",
    ],
  },
  {
    label: "D2 — Outreach channels (blocks D3)",
    color: C.amber,
    qs: [
      "Q: LinkedIn Sales Navigator budget approved (≈₹6K/mo)?",
      "Q: Apollo.io budget approved (≈₹4K/mo)?",
      "Q: MCCIA membership already active or to be initiated?",
    ],
  },
  {
    label: "D3 — Revenue plan assumptions (blocks D4)",
    color: C.green,
    qs: [
      "Q: Start date for Month 1 — May 2026 or earlier?",
      "Q: Fiverr/Upwork profile — new or migrating existing?",
      "Q: Any fixed monthly retainer already contracted?",
      "Q: Personal cash runway — affects aggressiveness of Month 1–3 targets",
      "Q: FX confirmed ₹85/$ — noted",
    ],
  },
  {
    label: "D4 — JSX website (blocks D5)",
    color: "#a78bfa",
    qs: [
      "Q: Approve modular split: App.jsx + FinsightCredit.jsx + FinsightAnalytics.jsx + FinsightFreelance.jsx + FinsightDigital.jsx + Footer.jsx + CaseStudy.jsx + AutomationArchitecture.jsx + PricingTable.jsx + ContactForm.jsx?",
      "Q: Keep existing Vite/React setup (no framework change)?",
      "Q: Existing design tokens (C object) retained or refreshed?",
    ],
  },
];

export default function D1Audit() {
  const [activeTab, setActiveTab] = useState("surfaced");

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", padding: "32px 24px", color: C.textPrimary }}>
      {/* Header */}
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: C.textMuted, textTransform: "uppercase" }}>
            FINSIGHT ONE · DELIVERABLE 1
          </span>
        </div>
        <h1 style={{ margin: "0 0 6px", fontSize: 32, fontWeight: 800, color: C.textPrimary, lineHeight: 1.2 }}>
          Missing-Points Audit
        </h1>
        <p style={{ margin: "0 0 8px", fontSize: 15, color: C.textSecondary }}>
          Gating step before D2–D5 build · Author: Shweta Jadhav · 2026-04-18
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
          <Badge label="ANALYSIS MODE" color={C.accent} />
          <Badge label="52-FILE CORPUS" color={C.amber} />
          <Badge label="4 GATING BLOCKS" color={C.green} />
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 28 }}>
          {[
            { label: "Already Surfaced", value: "10", color: C.green },
            { label: "Under-Used", value: "4", color: C.amber },
            { label: "Not Yet Surfaced", value: "7", color: C.accent },
            { label: "Corpus Gaps", value: "4", color: C.red },
          ].map((s) => (
            <Card key={s.label} style={{ textAlign: "center", padding: "16px 12px" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4 }}>{s.label}</div>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20, background: C.surface, padding: 4, borderRadius: 10, border: `1px solid ${C.border}` }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                flex: 1,
                padding: "10px 8px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                background: activeTab === t.id ? C.accent : "transparent",
                color: activeTab === t.id ? "#fff" : C.textMuted,
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
              }}
            >
              <span>{t.icon}</span>
              <span style={{ display: window.innerWidth < 500 ? "none" : "inline" }}>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "surfaced" && (
          <div style={{ display: "grid", gap: 16 }}>
            <Card>
              <SectionTitle icon="✅" title="A1 — Already Surfaced" sub="Present in prior Synthesis.docx / SOP.docx" />
              <BulletList items={A_SURFACED.already} color={C.green} />
            </Card>
            <Card>
              <SectionTitle icon="⚠️" title="A2 — Surfaced but Under-Used" sub="Needs amplification in D2–D5" />
              <BulletList items={A_SURFACED.underUsed} color={C.amber} />
            </Card>
            <Card>
              <SectionTitle icon="❌" title="A3 — Not Yet Surfaced" sub="Must fold in before execution" />
              <BulletList items={A_SURFACED.notSurfaced} color={C.red} />
            </Card>
            <Card>
              <SectionTitle icon="❓" title="A4 — Corpus Gaps Requiring User Input" />
              <BulletList items={A_SURFACED.gaps} color={C.textSecondary} />
            </Card>
          </div>
        )}

        {activeTab === "digital" && (
          <div style={{ display: "grid", gap: 16 }}>
            <Card>
              <SectionTitle icon="🏦" title="B1 — Not Yet in Website / SOP" sub="From finsight digital section.pdf" />
              <BulletList items={B_DIGITAL.notYet} color={C.textSecondary} />
            </Card>
            <Card>
              <SectionTitle icon="❓" title="B2 — PDF Items Requiring Clarification" />
              <BulletList items={B_DIGITAL.clarify} color={C.amber} />
            </Card>

            {/* BankReady pricing quick-ref */}
            <Card>
              <SectionTitle icon="💰" title="BankReady™ Pricing Tiers (Quick Reference)" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginTop: 8 }}>
                {[
                  { tier: "Basic", price: "₹40,000", range: "Loans ₹25–50 Cr", color: C.green },
                  { tier: "Standard", price: "₹90,000", range: "Loans ₹50–75 Cr", color: C.accent },
                  { tier: "Premium", price: "₹2,00,000", range: "Loans ₹75–100 Cr", color: C.amber },
                  { tier: "Enterprise", price: "₹3,50,000", range: "Complex/Restructure", color: C.red },
                ].map((p) => (
                  <div
                    key={p.tier}
                    style={{
                      background: p.color + "11",
                      border: `1px solid ${p.color}33`,
                      borderRadius: 8,
                      padding: "12px 14px",
                    }}
                  >
                    <div style={{ fontSize: 11, fontWeight: 700, color: p.color, textTransform: "uppercase", letterSpacing: 1 }}>{p.tier}</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: C.textPrimary, margin: "4px 0 2px" }}>{p.price}</div>
                    <div style={{ fontSize: 11, color: C.textMuted }}>{p.range}</div>
                    <div style={{ fontSize: 10, color: C.textMuted, marginTop: 2 }}>+ GST 18%</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === "streams" && (
          <div style={{ display: "grid", gap: 16 }}>
            <Card>
              <SectionTitle icon="✅" title="C1 — Surfaced & Routed" />
              {C_STREAMS.routed.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{
                    minWidth: 24, height: 24, borderRadius: "50%", background: C.accent + "22",
                    border: `1px solid ${C.accent}44`, display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700, color: C.accent,
                  }}>
                    S{i + 1}
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: C.textSecondary, lineHeight: 1.6 }}>{item}</p>
                </div>
              ))}
            </Card>
            <Card>
              <SectionTitle icon="⚙️" title="C2 — Not Yet Operationalized" sub="Needs definition before launch" />
              <BulletList items={C_STREAMS.notOperationalized} color={C.amber} />
            </Card>
            <Card>
              <SectionTitle icon="🔗" title="C3 — Strategy Integration Gaps" />
              <BulletList items={C_STREAMS.gaps} color={C.red} />
            </Card>
          </div>
        )}

        {activeTab === "gating" && (
          <div style={{ display: "grid", gap: 16 }}>
            {D_GATING.map((block) => (
              <Card key={block.label}>
                <div style={{
                  display: "inline-block", padding: "3px 12px", borderRadius: 6,
                  background: block.color + "22", border: `1px solid ${block.color}44`,
                  fontSize: 12, fontWeight: 700, color: block.color, marginBottom: 12,
                }}>
                  {block.label}
                </div>
                {block.qs.map((q, i) => (
                  <div key={i} style={{
                    display: "flex", gap: 10, alignItems: "flex-start",
                    marginBottom: 8, paddingBottom: 8,
                    borderBottom: i < block.qs.length - 1 ? `1px solid ${C.border}` : "none",
                  }}>
                    <span style={{ color: block.color, fontSize: 14, marginTop: 1 }}>→</span>
                    <p style={{ margin: 0, fontSize: 13, color: C.textSecondary, lineHeight: 1.6 }}>{q}</p>
                  </div>
                ))}
              </Card>
            ))}

            {/* Next steps */}
            <Card style={{ borderColor: C.accent + "44", background: C.accentGlow }}>
              <SectionTitle icon="🚀" title="What Happens Next (on approval)" />
              <div style={{ display: "grid", gap: 8 }}>
                {[
                  { d: "D2", label: "Automation Architecture (Lines 2, 3, 4)", file: "D2_Automation.jsx" },
                  { d: "D3", label: "Enterprise Analytics Outreach Plan", file: "D3_Outreach.jsx" },
                  { d: "D4", label: "12-Month Revenue Plan to $10K MRR", file: "D4_Revenue.jsx" },
                  { d: "D5", label: "JSX Website Updates → modular components", file: "D5_Code/*.jsx" },
                ].map((item) => (
                  <div key={item.d} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{
                      minWidth: 32, height: 28, background: C.accent, borderRadius: 6,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 800, color: "#fff",
                    }}>
                      {item.d}
                    </span>
                    <span style={{ fontSize: 13, color: C.textSecondary }}>{item.label}</span>
                    <span style={{ marginLeft: "auto", fontSize: 11, color: C.textMuted, fontFamily: "monospace" }}>{item.file}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: 32, textAlign: "center", fontSize: 11, color: C.textMuted }}>
          © 2026 FinSight One · Shweta Jadhav · Pune, India &nbsp;·&nbsp; Deliverable 1 of 5
        </div>
      </div>
    </div>
  );
}
