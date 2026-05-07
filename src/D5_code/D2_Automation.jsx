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

const NodeBox = ({ number, title, detail, color = C.accent }) => (
  <div style={{
    background: color + "11", border: `1px solid ${color}33`, borderRadius: 10,
    padding: "14px 16px", position: "relative",
  }}>
    <div style={{
      position: "absolute", top: -10, left: 14, background: color, color: "#fff",
      borderRadius: 999, width: 22, height: 22, display: "flex", alignItems: "center",
      justifyContent: "center", fontSize: 11, fontWeight: 800,
    }}>
      {number}
    </div>
    <div style={{ fontSize: 13, fontWeight: 700, color: C.textPrimary, marginBottom: 4 }}>{title}</div>
    <div style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.6 }}>{detail}</div>
  </div>
);

const TableRow = ({ cols, header, borderBottom = true }) => (
  <div style={{
    display: "grid", gridTemplateColumns: cols.map((c) => c.w || "1fr").join(" "),
    gap: 0, borderBottom: borderBottom ? `1px solid ${C.border}` : "none",
    background: header ? C.accent + "18" : "transparent",
  }}>
    {cols.map((c, i) => (
      <div key={i} style={{
        padding: "10px 12px", fontSize: header ? 11 : 12,
        fontWeight: header ? 700 : 400, color: header ? C.textPrimary : C.textSecondary,
        textTransform: header ? "uppercase" : "none", letterSpacing: header ? 0.5 : 0,
        borderRight: i < cols.length - 1 ? `1px solid ${C.border}` : "none",
      }}>
        {c.val}
      </div>
    ))}
  </div>
);

const TABS = [
  { id: "stack", label: "Tool Stack", icon: "🔧" },
  { id: "digital", label: "Line 4 — Digital", icon: "🏦" },
  { id: "freelance", label: "Line 3 — Freelance", icon: "💻" },
  { id: "analytics", label: "Line 2 — Analytics", icon: "📊" },
  { id: "crossline", label: "Cross-Line", icon: "🔀" },
  { id: "rollout", label: "Rollout", icon: "🚀" },
];

const TOOL_STACK = [
  { layer: "Intake", tool: "Tally.so", role: "Forms, conditional logic", cost: "Free" },
  { layer: "CRM", tool: "Google Sheets + HubSpot Free", role: "Lead DB, pipeline", cost: "Free" },
  { layer: "WhatsApp", tool: "WATI", role: "Broadcast + automation", cost: "₹2,500" },
  { layer: "Email", tool: "Mailchimp", role: "Sequences, broadcasts", cost: "₹1,500" },
  { layer: "Calendar", tool: "Calendly", role: "Scoping call booking", cost: "Free" },
  { layer: "Docs", tool: "Google Drive + Docs", role: "Data collection, collab", cost: "Free" },
  { layer: "AI Drafting", tool: "Claude API (Sonnet)", role: "CAM/CMA/DPR/proposals", cost: "₹6,000" },
  { layer: "Payment", tool: "Razorpay + UPI", role: "Invoice, collect", cost: "2% fee" },
  { layer: "Automation", tool: "Zapier OR Make.com", role: "Cross-tool triggers", cost: "₹2,000" },
  { layer: "Website", tool: "Vite/React on Vercel", role: "Marketing site", cost: "Free" },
  { layer: "Analytics", tool: "GA4 + PostHog Free", role: "Funnel tracking", cost: "Free" },
];

const SCALE_TRIGGERS = [
  "M3: add LinkedIn Sales Navigator (₹6K/mo)",
  "M6: upgrade Mailchimp + WATI Pro (+₹4K/mo)",
  "M9: add Ahrefs Starter (₹8K/mo) if SEO funnel working",
];

const D_NODES = [
  { title: "Lead Capture", detail: "Tally form on /digital, /credit, /contact · 7 fields · Conditional routing by loan amount · Webhook → Sheet + HubSpot" },
  { title: "WhatsApp Auto-ACK (<2 min)", detail: "WATI template triggered on new row · Menu: Reply 1–4 for packages, 5 for Shweta · Auto-send package PDF + Calendly on reply 1–4" },
  { title: "Email Welcome (<5 min)", detail: "Mailchimp 'FSD-Welcome' sequence · Day 0: 41-item Loan Readiness Checklist · Day 2: Banker scrutiny article · Day 5: Sugar Mill case · Day 8: Calendly CTA · Day 12: Soft exit" },
  { title: "Scoping Call (20 min)", detail: "Calendly slot, 10 AM–6 PM IST Mon–Sat · Pre-call intake doc auto-sent · Post-call: Shweta updates HubSpot deal stage" },
  { title: "Data Collection", detail: "Google Drive folder auto-created per deal · 41-item checklist shared · WATI reminder at Day 3, 5, 7 if folder empty" },
  { title: "AI-Assisted Build (Claude API)", detail: "Prompt library Git-versioned · 3 chains: CAM / CMA / DPR · Input: docs → structured JSON · Output: Word draft · HUMAN GATE: Shweta reviews every draft" },
  { title: "Draft Delivery + Revision", detail: "Email + WhatsApp notification · 2 revision rounds, 48-hr turnaround each · Revisions logged in HubSpot" },
  { title: "Payment + Final", detail: "50% Razorpay invoice on scoping approval · 50% on final delivery · Auto-send final Word + PDF on payment clear" },
  { title: "Nurture + Referral", detail: "Day 30: WhatsApp referral ask + Google/LinkedIn review request · Month 11: renewal reminder (CMA update ₹30K) · Quarterly newsletter" },
];

const D_KPIS = [
  { metric: "Lead → Scoping Call", target: "25%" },
  { metric: "Scoping → Paid", target: "40%" },
  { metric: "Lead → Paid (blended)", target: "10%" },
  { metric: "Avg Ticket by M6", target: "₹85K" },
  { metric: "Referral Rate", target: "0.3 per closed deal" },
];

const L3_NODES = [
  { title: "Job/Order Intake", detail: "Upwork: RSS saved searches → Zapier → Sheet · Fiverr: order email → Gmail filter → Sheet · Target: 10 Upwork invites/week, 5 Fiverr orders/week by M3" },
  { title: "Claude Proposal Drafting", detail: "Per-job Claude API call · 150-word custom proposal · Cost: ₹2–4 each · HUMAN GATE: Shweta reviews + sends (<10 min) · Auto-send never allowed — Upwork TOS" },
  { title: "Template Library", detail: "excel-dashboard-v1.xlsx · cma-format-inr.xlsx · credit-scorecard-v2.xlsx · powerbi-msme-v1.pbix · dpr-skeleton.docx · Versioned on Drive" },
  { title: "Drafting", detail: "Fixed-price packages only (24–72 hr delivery) · Claude helps with narrative + commentary · Shweta owns numbers, validation, final formatting · HUMAN GATE: full QA before every send" },
  { title: "Upsell Sequence", detail: "Fiverr buyer → Mailchimp 'FSF-Buyers' · Day 7: free Loan Readiness Checklist · Day 14: FinSight Digital service offer · Target: 5% Fiverr buyers → FSD Basic within 90 days" },
];

const L3_ECON = [
  { item: "Per proposal cost", value: "₹3" },
  { item: "Per delivery (API)", value: "₹15–40" },
  { item: "FSD upsell revenue", value: "₹40,000" },
  { item: "Break-even proposals", value: "~1,500 before 1 FSD conversion covers all API cost" },
];

const CROSS_LINE = [
  { trigger: "New Upwork buyer closes order", action: "Add to Mailchimp 'FSF-Buyers' + tag country" },
  { trigger: "FSD Basic sale closes", action: "Tag HubSpot 'Digital-Basic' + enroll in M11 renewal sequence" },
  { trigger: "Any sale >₹50K", action: "WhatsApp alert to Shweta + add to referral ask queue Day 30" },
  { trigger: "LinkedIn reply 'interested'", action: "Create HubSpot deal 'Discovery' + Calendly link sent" },
  { trigger: "Blog visitor reads >3 articles", action: "Retarget via LinkedIn Ads audience" },
  { trigger: "Case study page visit", action: "Trigger Mailchimp 'Case Study Viewer' sequence" },
];

const HUMAN_GATE = [
  { range: "≤ ₹20K (Fiverr gig, S1 memo)", policy: "Auto-send after Shweta's 5-min QA", color: C.green },
  { range: "₹20–50K (Loan Readiness Report)", policy: "Full Shweta review — no auto-send", color: C.amber },
  { range: "₹50K–2L (BankReady™ Std/Premium)", policy: "Full review + client review call", color: C.amber },
  { range: "> ₹2L (Enterprise, Premium)", policy: "Full review + CA peer review optional", color: C.red },
];

const ROLLOUT = [
  { when: "Week 1 (May W1)", what: "Tally + Sheets + Mailchimp + Calendly live" },
  { when: "Week 2", what: "WATI + Razorpay onboarded" },
  { when: "Week 3", what: "Claude API prompt library v1 built" },
  { when: "Week 4", what: "End-to-end test with 1 paid pilot customer" },
  { when: "M2", what: "Line 3 Fiverr/Upwork Claude proposal live" },
  { when: "M3", what: "LinkedIn Sales Nav + Line 2 outreach live" },
  { when: "M4", what: "Full System D live for all tiers" },
  { when: "M6", what: "Mid-year automation audit, upgrade tools as needed" },
];

const RISKS = [
  { risk: "WATI downtime", fallback: "Manual WhatsApp + apology credit" },
  { risk: "Claude API rate limit", fallback: "Queue system + SLA buffer disclosed" },
  { risk: "Razorpay freeze", fallback: "UPI direct + bank transfer backup" },
  { risk: "Tally outage", fallback: "Google Form mirror at /apply-backup" },
  { risk: "Shweta illness/leave", fallback: "Auto-responder + 3-day SLA extension in welcome email" },
];

export default function D2Automation() {
  const [activeTab, setActiveTab] = useState("stack");

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", padding: "32px 24px", color: C.textPrimary }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: C.textMuted, textTransform: "uppercase" }}>
            FINSIGHT ONE · DELIVERABLE 2
          </span>
        </div>
        <h1 style={{ margin: "0 0 6px", fontSize: 32, fontWeight: 800, color: C.textPrimary, lineHeight: 1.2 }}>
          Automation Architecture
        </h1>
        <p style={{ margin: "0 0 8px", fontSize: 15, color: C.textSecondary }}>
          Lines 2, 3, 4 — Tool Stack, Flows, Human-Gate Rules · Shweta Jadhav · 2026-04-18
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
          <Badge label="SYSTEM D" color={C.accent} />
          <Badge label="₹12K/MO TOOL STACK" color={C.amber} />
          <Badge label="HUMAN-GATE POLICY ACTIVE" color={C.green} />
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 3, marginBottom: 20, background: C.surface, padding: 4, borderRadius: 10, border: `1px solid ${C.border}`, flexWrap: "wrap" }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                flex: 1, minWidth: 90, padding: "9px 8px", borderRadius: 7, border: "none", cursor: "pointer",
                fontSize: 11, fontWeight: 600, background: activeTab === t.id ? C.accent : "transparent",
                color: activeTab === t.id ? "#fff" : C.textMuted, transition: "all 0.2s",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
              }}
            >
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        {/* TOOL STACK */}
        {activeTab === "stack" && (
          <div style={{ display: "grid", gap: 16 }}>
            <Card>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary, marginBottom: 14 }}>
                🔧 Master Tool Stack — Shared Across Lines 2, 3, 4
              </div>
              <div style={{ borderRadius: 8, overflow: "hidden", border: `1px solid ${C.border}` }}>
                <TableRow header cols={[{ val: "Layer", w: "1fr" }, { val: "Tool", w: "2fr" }, { val: "Role", w: "2.5fr" }, { val: "Cost/mo", w: "0.8fr" }]} />
                {TOOL_STACK.map((row, i) => (
                  <TableRow
                    key={row.layer}
                    borderBottom={i < TOOL_STACK.length - 1}
                    cols={[
                      { val: row.layer, w: "1fr" },
                      { val: row.tool, w: "2fr" },
                      { val: row.role, w: "2.5fr" },
                      { val: row.cost, w: "0.8fr" },
                    ]}
                  />
                ))}
                <div style={{ padding: "10px 12px", background: C.green + "18", borderTop: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: C.green }}>TOTAL FIXED: ₹12,000/mo</span>
                </div>
              </div>
            </Card>
            <Card>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.amber, marginBottom: 10 }}>📈 Scale-Up Triggers</div>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {SCALE_TRIGGERS.map((s, i) => (
                  <li key={i} style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.7 }}>{s}</li>
                ))}
              </ul>
            </Card>
            <Card>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.textPrimary, marginBottom: 10 }}>⚙️ Core Principles</div>
              {[
                "Manual does not scale to $10K MRR with one operator",
                "Automate acquisition, qualification, drafting, delivery, payment, nurture",
                "Human gate = quality control, not bottleneck",
                "Every flow must be measurable (conversion rate per step)",
                "Every tool must have a fallback (no single point of failure)",
              ].map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <span style={{ color: C.accent, fontSize: 14 }}>→</span>
                  <span style={{ fontSize: 13, color: C.textSecondary }}>{p}</span>
                </div>
              ))}
            </Card>
          </div>
        )}

        {/* LINE 4 */}
        {activeTab === "digital" && (
          <div style={{ display: "grid", gap: 16 }}>
            <Card style={{ borderColor: C.accent + "44" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary, marginBottom: 4 }}>
                🏦 Line 4 — FinSight Digital (BankReady™ CAM/CMA/DPR)
              </div>
              <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 16 }}>System D — 9-node automation flow</div>

              {/* Flow diagram */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
                {[
                  ["Lead Capture", "Tally form"],
                  ["WhatsApp ACK", "<2 min SLA"],
                  ["Email Welcome", "<5 min SLA"],
                  ["Scoping Call", "20 min · Calendly"],
                  ["Data Collection", "Drive checklist"],
                  ["AI-Assisted Build", "Claude API · GATE"],
                  ["Draft Delivery", "Email + WA · 2 revisions"],
                  ["Payment + Final", "Razorpay invoice"],
                  ["Nurture + Referral", "D+30 · M+11 renewal"],
                ].map(([title, sub], i) => (
                  <div key={i} style={{
                    background: C.accent + "11", border: `1px solid ${C.accent}33`, borderRadius: 8,
                    padding: "10px 12px", textAlign: "center",
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.accent, marginBottom: 2 }}>NODE {i + 1}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.textPrimary }}>{title}</div>
                    <div style={{ fontSize: 11, color: C.textMuted }}>{sub}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary, marginBottom: 14 }}>Node-by-Node Detail</div>
              <div style={{ display: "grid", gap: 10 }}>
                {D_NODES.map((n, i) => (
                  <NodeBox key={i} number={i + 1} title={n.title} detail={n.detail} color={C.accent} />
                ))}
              </div>
            </Card>

            <Card>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary, marginBottom: 12 }}>📊 KPIs — Weekly Dashboard</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10 }}>
                {D_KPIS.map((k) => (
                  <div key={k.metric} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "12px 14px" }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: C.green }}>{k.target}</div>
                    <div style={{ fontSize: 11, color: C.textMuted, marginTop: 3 }}>{k.metric}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* LINE 3 */}
        {activeTab === "freelance" && (
          <div style={{ display: "grid", gap: 16 }}>
            <Card>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary, marginBottom: 4 }}>💻 Line 3 — FinSight Freelance (Upwork / Fiverr)</div>
              <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 16 }}>Proposal automation + template delivery + upsell to FSD</div>
              <div style={{ display: "grid", gap: 10 }}>
                {L3_NODES.map((n, i) => (
                  <NodeBox key={i} number={i + 1} title={n.title} detail={n.detail} color={C.purple} />
                ))}
              </div>
            </Card>
            <Card>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary, marginBottom: 12 }}>💰 Automation Economics</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
                {L3_ECON.map((e) => (
                  <div key={e.item} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "12px 14px" }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: C.purple }}>{e.value}</div>
                    <div style={{ fontSize: 11, color: C.textMuted, marginTop: 3 }}>{e.item}</div>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary, marginBottom: 12 }}>📊 KPIs</div>
              {[
                { metric: "Proposals / week", target: "Track weekly" },
                { metric: "Proposal → Invite rate", target: "15%" },
                { metric: "Invite → Hire rate", target: "30%" },
                { metric: "Repeat buyer rate", target: "20%" },
                { metric: "Fiverr gig conversion", target: "4%" },
              ].map((k) => (
                <div key={k.metric} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 13, color: C.textSecondary }}>{k.metric}</span>
                  <Badge label={k.target} color={C.purple} />
                </div>
              ))}
            </Card>
          </div>
        )}

        {/* LINE 2 */}
        {activeTab === "analytics" && (
          <div style={{ display: "grid", gap: 16 }}>
            <Card>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary, marginBottom: 4 }}>📊 Line 2 — FinSight Analytics (Enterprise)</div>
              <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 16 }}>Long sales cycle · High ticket · Lower volume</div>

              {/* Flow */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
                {[
                  ["Cold Outreach", "LinkedIn + Apollo · M3"],
                  ["Content Nurture", "Blog + case studies · weekly"],
                  ["Discovery Call", "60 min · Shweta"],
                  ["Proposal", "Claude-drafted · human-edited"],
                  ["Pilot / Project", "₹1.5–3L · 3–6 wk"],
                  ["Retainer Convert", "₹50K–1.2L/mo"],
                ].map(([title, sub], i) => (
                  <div key={i} style={{
                    background: C.green + "11", border: `1px solid ${C.green}33`,
                    borderRadius: 8, padding: "10px 12px", textAlign: "center",
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.textPrimary }}>{title}</div>
                    <div style={{ fontSize: 11, color: C.textMuted }}>{sub}</div>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary, marginBottom: 12 }}>🔒 Human-Gate Rules (Line 2)</div>
              {[
                "All outreach messages personalised by Shweta before send — no full-auto",
                "Claude drafts sequence; Shweta approves 5/week batch",
                "Discovery and pilot delivery 100% human — high-trust work",
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <span style={{ color: C.amber }}>🔒</span>
                  <span style={{ fontSize: 13, color: C.textSecondary }}>{r}</span>
                </div>
              ))}
            </Card>
          </div>
        )}

        {/* CROSS-LINE */}
        {activeTab === "crossline" && (
          <div style={{ display: "grid", gap: 16 }}>
            <Card>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary, marginBottom: 14 }}>🔀 Cross-Line Automations</div>
              <div style={{ borderRadius: 8, overflow: "hidden", border: `1px solid ${C.border}` }}>
                <TableRow header cols={[{ val: "Trigger", w: "2fr" }, { val: "Action", w: "3fr" }]} />
                {CROSS_LINE.map((row, i) => (
                  <TableRow
                    key={i}
                    borderBottom={i < CROSS_LINE.length - 1}
                    cols={[{ val: row.trigger, w: "2fr" }, { val: row.action, w: "3fr" }]}
                  />
                ))}
              </div>
            </Card>
            <Card>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary, marginBottom: 14 }}>🔒 Human-Gate Policy (All Lines)</div>
              <div style={{ display: "grid", gap: 10 }}>
                {HUMAN_GATE.map((g) => (
                  <div key={g.range} style={{
                    background: g.color + "11", border: `1px solid ${g.color}33`, borderRadius: 8, padding: "12px 16px",
                    display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap",
                  }}>
                    <span style={{ fontSize: 13, color: C.textSecondary }}>{g.range}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: g.color }}>{g.policy}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary, marginBottom: 12 }}>⚠️ Risk & Fallbacks</div>
              {RISKS.map((r) => (
                <div key={r.risk} style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 12, padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.red }}>{r.risk}</span>
                  <span style={{ fontSize: 13, color: C.textSecondary }}>{r.fallback}</span>
                </div>
              ))}
            </Card>
          </div>
        )}

        {/* ROLLOUT */}
        {activeTab === "rollout" && (
          <div style={{ display: "grid", gap: 16 }}>
            <Card>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary, marginBottom: 14 }}>🚀 Rollout Timeline</div>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 36, top: 0, bottom: 0, width: 2, background: C.border }} />
                {ROLLOUT.map((r, i) => (
                  <div key={i} style={{ display: "flex", gap: 16, marginBottom: 20, position: "relative" }}>
                    <div style={{
                      minWidth: 72, height: 28, background: C.accent, borderRadius: 6, zIndex: 1,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 800, color: "#fff",
                    }}>
                      {r.when}
                    </div>
                    <div style={{
                      background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8,
                      padding: "10px 14px", flex: 1, fontSize: 13, color: C.textSecondary, lineHeight: 1.5,
                    }}>
                      {r.what}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        <div style={{ marginTop: 32, textAlign: "center", fontSize: 11, color: C.textMuted }}>
          © 2026 FinSight One · Shweta Jadhav · Pune, India &nbsp;·&nbsp; Deliverable 2 of 5
        </div>
      </div>
    </div>
  );
}
