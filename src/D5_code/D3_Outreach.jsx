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

const TableRow = ({ cols, header, borderBottom = true }) => (
  <div style={{
    display: "grid", gridTemplateColumns: cols.map((c) => c.w || "1fr").join(" "),
    borderBottom: borderBottom ? `1px solid ${C.border}` : "none",
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
  { id: "position", label: "Positioning", icon: "🎯" },
  { id: "channels", label: "Channel Mix", icon: "📡" },
  { id: "linkedin", label: "LinkedIn", icon: "💼" },
  { id: "apollo", label: "Apollo Email", icon: "📧" },
  { id: "network", label: "Network", icon: "🤝" },
  { id: "pricing", label: "Pricing", icon: "💰" },
  { id: "targets", label: "Targets", icon: "📊" },
];

const CHANNEL_MIX = [
  { channel: "LinkedIn Sales Nav + Outreach", pct: "35%", live: "M3", tool: "Sales Nav + heyreach", cost: "₹9,000" },
  { channel: "Apollo.io cold email", pct: "20%", live: "M2", tool: "Apollo.io", cost: "Free M1–M2 → ₹4K M3+" },
  { channel: "MCCIA / MACCIA / TiE network", pct: "20%", live: "M1", tool: "Memberships", cost: "₹8K one-time" },
  { channel: "CA / DSA referrals", pct: "10%", live: "M1", tool: "Commission 10%", cost: "Variable" },
  { channel: "SEO / content (blog)", pct: "10%", live: "M2", tool: "Webflow CMS → self", cost: "Ahrefs M9 ₹8K" },
  { channel: "Webinars / events", pct: "5%", live: "M4", tool: "Zoom + Meetup", cost: "₹2K" },
];

const SEGMENTS = [
  {
    id: "T1", label: "T1 — Maharashtra MSMEs", effort: "60%", color: C.accent,
    sub: "Pune, Mumbai, Nashik, Ahmednagar, Kolhapur, Aurangabad, Solapur",
    sectors: "Manufacturing, agri-processing, sugar, dairy, textiles, auto components",
    pain: "Founder-led, no MIS, no investor-ready reporting, lender pressure",
  },
  {
    id: "T2", label: "T2 — NBFCs & Cooperative Banks", effort: "25%", color: C.amber,
    sub: "Pune-HQ NBFCs, Maharashtra State Coop Bank network",
    sectors: "Portfolio risk visibility, ECL provisioning, regulator reporting",
    pain: "Fragmented portfolio data, no ML-grade scoring, manual risk reports",
  },
  {
    id: "T3", label: "T3 — Global Agri-Finance", effort: "15%", color: C.green,
    sub: "Agri-input distributors in MH, KA, TN, AP · Cooperative lenders (PACS, DCCBs)",
    sectors: "Farmer credit scoring, default prediction, seasonal lending",
    pain: "No structured farmer scoring, Kharif/Rabi cycle blind spots",
  },
];

const LI_SEQUENCE = [
  { day: "Day 0", touch: "Connect request", channel: "LinkedIn", sample: '"Saw your work at [Co] — curious if credit/risk analytics is on your radar this quarter."' },
  { day: "Day 3", touch: "Accept → value msg", channel: "LI DM", sample: "Share 1 insight + link to Sugar Mill case study" },
  { day: "Day 7", touch: "Soft offer", channel: "LI DM", sample: "Offer free 30-min MIS diagnostic" },
  { day: "Day 12", touch: "Email follow-up", channel: "Apollo", sample: '"Adding context to my LI note — attached 1-page approach"' },
  { day: "Day 21", touch: "Break-up message", channel: "LI DM", sample: '"Closing the loop — reach out any time"' },
];

const LI_CONTENT = [
  { day: "Mon", type: "Industry stat + take", example: "MSME credit gap, NPA trends" },
  { day: "Wed", type: "Tactical post", example: "How to read a CMA, 3 ratios bankers check" },
  { day: "Fri", type: "Case study snippet", example: "Sugar Mill, farmer scoring outcome" },
];

const APOLLO_EMAILS = [
  {
    num: 1, day: "Day 0",
    subject: '"Credit-risk analytics for [Company name]"',
    body: "80 words. Problem statement + 1 sentence credential + soft CTA (reply 'yes' for 1-pager). A/B test subject line weekly.",
  },
  {
    num: 2, day: "Day 4",
    subject: '"Re: Credit-risk analytics for [Company name]"',
    body: "Forward chain style. Add 1 bullet stat from their industry.",
  },
  {
    num: 3, day: "Day 10",
    subject: '"One last note"',
    body: "Break-up message. Share free download: Sample MIS Dashboard template.",
  },
];

const NETWORK = [
  { org: "MCCIA", full: "Mahratta Chamber of Commerce Industries & Agriculture, Pune", cost: "₹5,000–15,000/yr", goal: "5 warm intros/month", events: "CFO Forum, MSME Business Connect, Credit Fair" },
  { org: "MACCIA", full: "Maharashtra Chamber", cost: "₹3,000–8,000/yr", goal: "Nagpur / Nashik / Aurangabad chapters", events: "Regional networking events" },
  { org: "TiE Pune", full: "TiE Pune Chapter", cost: "₹10,000/yr", goal: "3 startup CFO intros/month", events: "Founder-heavy network" },
  { org: "FIDC / MFIN", full: "Finance Industry Development Council / Microfinance Industry Network", cost: "Event-based", goal: "NBFC + microlender pitch", events: "2 events/year" },
];

const PRICING = [
  { pkg: "Diagnostic", scope: "MIS gap audit + 1 dashboard", price: "₹50,000", delivery: "2 weeks", color: C.green },
  { pkg: "Pilot", scope: "End-to-end MIS for 1 business unit", price: "₹1,50,000", delivery: "4–6 weeks", color: C.accent },
  { pkg: "Full MIS Build", scope: "All business units, dashboards, SOPs", price: "₹3–6,00,000", delivery: "8–12 weeks", color: C.amber },
  { pkg: "Retainer (ongoing)", scope: "Monthly analytics + insights + QoQ review", price: "₹50–1.2L/mo", delivery: "Ongoing", color: C.teal },
  { pkg: "Credit Model (NBFC)", scope: "Scorecard + backtesting", price: "₹2,50,000", delivery: "6 weeks", color: "#a78bfa" },
  { pkg: "Portfolio Analytics Retainer", scope: "Monthly risk reports", price: "₹75–1.5L/mo", delivery: "Ongoing", color: C.red },
];

const MONTHLY_TARGETS = [
  { metric: "LI connects/wk", m3: "50", m6: "75", m9: "75", m12: "75" },
  { metric: "Apollo emails/mo", m3: "300", m6: "500", m9: "500", m12: "700" },
  { metric: "MCCIA/event touches/mo", m3: "5", m6: "10", m9: "12", m12: "15" },
  { metric: "Discovery calls/mo", m3: "4", m6: "8", m9: "12", m12: "15" },
  { metric: "Pilots closed/mo", m3: "0.5", m6: "1", m9: "2", m12: "3" },
  { metric: "Retainers active", m3: "0", m6: "1", m9: "2", m12: "3" },
  { metric: "Line 2 MRR", m3: "₹0", m6: "₹55K", m9: "₹1.0L", m12: "₹1.5L" },
];

const KILL_CRITERIA = [
  { channel: "LI Sales Nav", deadline: "M6", criterion: "<3 discovery calls/mo by M6", action: "Pause + re-audit ICP" },
  { channel: "Apollo cold email", deadline: "M4", criterion: "<3% reply rate by M4", action: "Rewrite copy, change list" },
  { channel: "Blog / SEO", deadline: "M6", criterion: "<500 visits/mo by M6", action: "Shift to guest posts (Finshots / YourStory)" },
  { channel: "Events", deadline: "M9", criterion: "<1 qualified lead per event by M9", action: "Drop, reinvest in paid" },
];

export default function D3Outreach() {
  const [activeTab, setActiveTab] = useState("position");

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", padding: "32px 24px", color: C.textPrimary }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: C.textMuted, textTransform: "uppercase" }}>
            FINSIGHT ONE · DELIVERABLE 3
          </span>
        </div>
        <h1 style={{ margin: "0 0 6px", fontSize: 32, fontWeight: 800, color: C.textPrimary, lineHeight: 1.2 }}>
          Enterprise Analytics Outreach
        </h1>
        <p style={{ margin: "0 0 8px", fontSize: 15, color: C.textSecondary }}>
          FinSight Analytics (Line 2) — System A · Shweta Jadhav · 2026-04-18
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
          <Badge label="LINE 2 — ANALYTICS" color={C.accent} />
          <Badge label="6 CHANNELS" color={C.amber} />
          <Badge label="₹1.5L MRR TARGET M12" color={C.green} />
        </div>

        {/* Proof bar */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 28 }}>
          {[
            { val: "20 Years", label: "Credit & Risk Experience", color: C.accent },
            { val: "1,000+", label: "ML-scored farmer accounts", color: C.green },
            { val: "₹3,000 Cr+", label: "Aggregate client turnover", color: C.amber },
            { val: "30%", label: "Portfolio quality improvement", color: C.teal },
          ].map((p) => (
            <Card key={p.label} style={{ textAlign: "center", padding: "14px 12px" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: p.color }}>{p.val}</div>
              <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4 }}>{p.label}</div>
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

        {/* POSITIONING */}
        {activeTab === "position" && (
          <div style={{ display: "grid", gap: 16 }}>
            <Card style={{ borderColor: C.accent + "44", background: C.accentGlow }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>One-Liner</div>
              <p style={{ margin: 0, fontSize: 17, fontWeight: 700, color: C.textPrimary, lineHeight: 1.5 }}>
                "Banker-grade analytics for MSMEs and lenders — MIS dashboards, credit models, portfolio analytics delivered in weeks, not months."
              </p>
            </Card>
            <div style={{ display: "grid", gap: 12 }}>
              {SEGMENTS.map((s) => (
                <Card key={s.id} style={{ borderColor: s.color + "33" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: s.color }}>{s.label}</div>
                    <Badge label={`${s.effort} effort`} color={s.color} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                    {[["📍 Geography / ICP", s.sub], ["🏭 Sectors", s.sectors], ["😤 Pain", s.pain]].map(([title, val]) => (
                      <div key={title}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, marginBottom: 4 }}>{title}</div>
                        <div style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.6 }}>{val}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* CHANNEL MIX */}
        {activeTab === "channels" && (
          <div style={{ display: "grid", gap: 16 }}>
            <Card>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary, marginBottom: 14 }}>📡 Channel Mix</div>
              <div style={{ borderRadius: 8, overflow: "hidden", border: `1px solid ${C.border}` }}>
                <TableRow header cols={[{ val: "Channel", w: "2fr" }, { val: "% Pipeline", w: "0.7fr" }, { val: "M1 Live", w: "0.6fr" }, { val: "Tool", w: "1.5fr" }, { val: "Monthly Cost", w: "1fr" }]} />
                {CHANNEL_MIX.map((row, i) => (
                  <TableRow
                    key={row.channel}
                    borderBottom={i < CHANNEL_MIX.length - 1}
                    cols={[
                      { val: row.channel, w: "2fr" },
                      { val: row.pct, w: "0.7fr" },
                      { val: row.live, w: "0.6fr" },
                      { val: row.tool, w: "1.5fr" },
                      { val: row.cost, w: "1fr" },
                    ]}
                  />
                ))}
              </div>
            </Card>
            <Card>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary, marginBottom: 12 }}>🔴 Kill Criteria (if channel fails by milestone)</div>
              <div style={{ borderRadius: 8, overflow: "hidden", border: `1px solid ${C.border}` }}>
                <TableRow header cols={[{ val: "Channel", w: "1fr" }, { val: "Deadline", w: "0.5fr" }, { val: "Kill Criterion", w: "2fr" }, { val: "Action", w: "1.5fr" }]} />
                {KILL_CRITERIA.map((row, i) => (
                  <TableRow
                    key={row.channel}
                    borderBottom={i < KILL_CRITERIA.length - 1}
                    cols={[
                      { val: row.channel, w: "1fr" },
                      { val: row.deadline, w: "0.5fr" },
                      { val: row.criterion, w: "2fr" },
                      { val: row.action, w: "1.5fr" },
                    ]}
                  />
                ))}
              </div>
            </Card>
            <Card>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary, marginBottom: 10 }}>🗓️ CA / DSA Referral Program</div>
              {[
                "Flat 10% commission on first-project fee for referred analytics engagement",
                "Capped ₹50,000 per referral",
                "Payout: 50% on project start, 50% on delivery",
                "Target: 10 CA partners signed by M4",
                "Tracking: HubSpot custom field 'referral_partner'",
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                  <span style={{ color: C.green }}>✓</span>
                  <span style={{ fontSize: 13, color: C.textSecondary }}>{r}</span>
                </div>
              ))}
            </Card>
          </div>
        )}

        {/* LINKEDIN */}
        {activeTab === "linkedin" && (
          <div style={{ display: "grid", gap: 16 }}>
            <Card>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary, marginBottom: 14 }}>💼 LinkedIn Sales Navigator Playbook</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.textMuted, marginBottom: 8 }}>Saved Search Filters</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                {["CFO", "Finance Head", "Head of Finance", "VP Finance", "MD", "Director Finance"].map((t) => (
                  <Badge key={t} label={t} color={C.accent} />
                ))}
                <Badge label="50–500 headcount" color={C.amber} />
                <Badge label="Manufacturing / Agri / Dairy / Sugar / Auto" color={C.teal} />
                <Badge label="Maharashtra · Pune · Mumbai · Nashik" color={C.green} />
                <Badge label="2+ years in role" color="#a78bfa" />
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.textMuted, marginBottom: 10 }}>5-Touch Outreach Sequence (21 days)</div>
              <div style={{ display: "grid", gap: 8 }}>
                {LI_SEQUENCE.map((s) => (
                  <div key={s.day} style={{
                    background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "12px 14px",
                    display: "grid", gridTemplateColumns: "60px 100px 1fr", gap: 12, alignItems: "center",
                  }}>
                    <Badge label={s.day} color={C.accent} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.textPrimary }}>{s.touch}</span>
                    <span style={{ fontSize: 12, color: C.textSecondary, fontStyle: "italic" }}>{s.sample}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, padding: "10px 14px", background: C.green + "11", borderRadius: 8, border: `1px solid ${C.green}33` }}>
                <span style={{ fontSize: 13, color: C.green, fontWeight: 700 }}>
                  Target: 50 connects/wk → 30 accepts → 10 replies → 3 discovery calls → 1 pilot/month by M4
                </span>
              </div>
            </Card>
            <Card>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary, marginBottom: 12 }}>📅 Content Calendar (Shweta-authored)</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                {LI_CONTENT.map((c) => (
                  <div key={c.day} style={{
                    background: C.accent + "11", border: `1px solid ${C.accent}33`, borderRadius: 8, padding: "12px 14px",
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: C.accent, marginBottom: 4 }}>{c.day}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary, marginBottom: 2 }}>{c.type}</div>
                    <div style={{ fontSize: 11, color: C.textMuted }}>{c.example}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* APOLLO */}
        {activeTab === "apollo" && (
          <div style={{ display: "grid", gap: 16 }}>
            <Card>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary, marginBottom: 4 }}>📧 Apollo.io Cold Email Playbook</div>
              <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 16 }}>500 contacts/month · Same ICP as LinkedIn · Verified email + direct phone</div>
              <div style={{ display: "grid", gap: 12 }}>
                {APOLLO_EMAILS.map((e) => (
                  <div key={e.num} style={{
                    background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 18px",
                  }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                      <div style={{
                        width: 28, height: 28, background: C.accent, borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 12, fontWeight: 800, color: "#fff",
                      }}>
                        {e.num}
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: C.textMuted }}>{e.day}</span>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.textPrimary, marginBottom: 4 }}>Subject: {e.subject}</div>
                    <div style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.6 }}>{e.body}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, padding: "10px 14px", background: C.amber + "11", borderRadius: 8, border: `1px solid ${C.amber}33` }}>
                <span style={{ fontSize: 13, color: C.amber, fontWeight: 700 }}>
                  Target: 500/mo → 5–8% reply → 25–40 conversations → 3–5 discovery → 1 pilot/quarter from channel
                </span>
              </div>
            </Card>
            <Card>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary, marginBottom: 12 }}>🔍 SEO / Content Funnel (Line 2 Blog)</div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, marginBottom: 6 }}>Pillar Topics</div>
                {[
                  "MIS dashboard for manufacturing MSMEs — what actually matters",
                  "Credit scoring for agri-input distributors: a 2026 guide",
                  "How NBFCs should price MSME loans in 2026",
                  "Portfolio analytics for cooperative banks — Maharashtra context",
                  "ECL provisioning simplified — a CFO's 10-min primer",
                ].map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                    <span style={{ color: C.teal }}>→</span>
                    <span style={{ fontSize: 13, color: C.textSecondary }}>{t}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, marginBottom: 6 }}>Keyword Targets</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {["MIS dashboard Pune", "ML credit scoring MSME", "CMA report cost India", "Business analytics consultant Pune", "Portfolio risk analytics NBFC"].map((kw) => (
                    <Badge key={kw} label={kw} color={C.teal} />
                  ))}
                </div>
              </div>
              <div style={{ padding: "10px 14px", background: C.teal + "11", borderRadius: 8, border: `1px solid ${C.teal}33` }}>
                <span style={{ fontSize: 12, color: C.teal }}>
                  Goal: 2,000 organic visits/mo by M9 → 5,000 by M12 · 1 pillar post + 2 short posts per month
                </span>
              </div>
            </Card>
          </div>
        )}

        {/* NETWORK */}
        {activeTab === "network" && (
          <div style={{ display: "grid", gap: 16 }}>
            <Card>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary, marginBottom: 14 }}>🤝 Network Channels (M1 Immediate)</div>
              <div style={{ display: "grid", gap: 12 }}>
                {NETWORK.map((n) => (
                  <div key={n.org} style={{
                    background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 18px",
                    display: "grid", gridTemplateColumns: "80px 1fr", gap: 16, alignItems: "start",
                  }}>
                    <div style={{
                      background: C.accent, borderRadius: 8, padding: "8px 6px",
                      textAlign: "center", fontSize: 13, fontWeight: 800, color: "#fff",
                    }}>
                      {n.org}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: C.textPrimary, marginBottom: 4 }}>{n.full}</div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                        <Badge label={n.cost} color={C.amber} />
                        <Badge label={n.events} color={C.teal} />
                      </div>
                      <div style={{ fontSize: 12, color: C.green }}>🎯 {n.goal}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary, marginBottom: 12 }}>🎙️ Events & Webinars</div>
              {[
                { when: "M4", what: "30-min webinar: 'Is your MSME loan-ready? 10 banker checks'", channel: "MCCIA + LinkedIn" },
                { when: "M7", what: "In-person Pune meetup at MCCIA: 'Credit risk analytics for MSMEs'", channel: "MCCIA" },
                { when: "M10", what: "Co-host with 1 NBFC partner: 'AI in credit decisioning'", channel: "NBFC partner" },
              ].map((e) => (
                <div key={e.when} style={{
                  display: "grid", gridTemplateColumns: "45px 1fr auto", gap: 12, alignItems: "center",
                  padding: "10px 0", borderBottom: `1px solid ${C.border}`,
                }}>
                  <Badge label={e.when} color={C.accent} />
                  <span style={{ fontSize: 13, color: C.textSecondary }}>{e.what}</span>
                  <span style={{ fontSize: 11, color: C.textMuted }}>{e.channel}</span>
                </div>
              ))}
              <div style={{ marginTop: 10, fontSize: 12, color: C.green }}>
                Target: 30 attendees/event → 5 discovery calls
              </div>
            </Card>
          </div>
        )}

        {/* PRICING */}
        {activeTab === "pricing" && (
          <div style={{ display: "grid", gap: 16 }}>
            <Card>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary, marginBottom: 14 }}>💰 Pricing Anchors for Discovery Calls</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
                {PRICING.map((p) => (
                  <div key={p.pkg} style={{
                    background: p.color + "0d", border: `1px solid ${p.color}33`, borderRadius: 10, padding: "16px 18px",
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: p.color, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{p.pkg}</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: C.textPrimary, marginBottom: 4 }}>{p.price}</div>
                    <div style={{ fontSize: 12, color: C.textSecondary, marginBottom: 6 }}>{p.scope}</div>
                    <Badge label={`⏱ ${p.delivery}`} color={p.color} />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* 12-MONTH TARGETS */}
        {activeTab === "targets" && (
          <div style={{ display: "grid", gap: 16 }}>
            <Card>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary, marginBottom: 14 }}>📊 12-Month Outreach Targets</div>
              <div style={{ borderRadius: 8, overflow: "hidden", border: `1px solid ${C.border}` }}>
                <TableRow header cols={[{ val: "Metric", w: "2fr" }, { val: "M3", w: "1fr" }, { val: "M6", w: "1fr" }, { val: "M9", w: "1fr" }, { val: "M12", w: "1fr" }]} />
                {MONTHLY_TARGETS.map((row, i) => (
                  <TableRow
                    key={row.metric}
                    borderBottom={i < MONTHLY_TARGETS.length - 1}
                    cols={[
                      { val: row.metric, w: "2fr" },
                      { val: row.m3, w: "1fr" },
                      { val: row.m6, w: "1fr" },
                      { val: row.m9, w: "1fr" },
                      { val: row.m12, w: "1fr" },
                    ]}
                  />
                ))}
              </div>
            </Card>
            <Card>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary, marginBottom: 12 }}>📅 Accountability Structure</div>
              {[
                { freq: "Weekly (Mon 9 AM · 30 min)", what: "Connects / Emails / Replies / Calls / Pilots" },
                { freq: "Monthly (last Sat · 60 min)", what: "Channel ROI, content performance, pricing feedback" },
                { freq: "Quarterly", what: "Strategic reset, ICP refinement, pricing changes" },
              ].map((a) => (
                <div key={a.freq} style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start" }}>
                  <Badge label={a.freq} color={C.accent} />
                  <span style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.5 }}>{a.what}</span>
                </div>
              ))}
            </Card>
          </div>
        )}

        <div style={{ marginTop: 32, textAlign: "center", fontSize: 11, color: C.textMuted }}>
          © 2026 FinSight One · Shweta Jadhav · Pune, India &nbsp;·&nbsp; Deliverable 3 of 5
        </div>
      </div>
    </div>
  );
}
