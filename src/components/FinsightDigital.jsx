import { C, FONT_HEAD, FONT_BODY } from "../tokens";
import {
  DIGITAL_REASONS,
  BANKREADY_TIERS,
  US_VS_MARKET,
  FSD_PROCESS,
  SUGAR_MILL,
  SYSTEM_D,
  TOOL_STACK,
  CAMPAIGN_SAMPLES,
  STRATEGY_ROUTES,
} from "../data";

const Section = ({ children, style }) => (
  <div style={{ marginBottom: 64, ...style }}>{children}</div>
);

const Eyebrow = ({ text, color = C.digital }) => (
  <div style={{ fontFamily: FONT_BODY, fontSize: 11, color, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>{text}</div>
);

const H2 = ({ children }) => (
  <h2 style={{ fontFamily: FONT_HEAD, fontSize: "clamp(24px, 4vw, 38px)", color: C.white, margin: 0, lineHeight: 1.2 }}>{children}</h2>
);

const H3 = ({ children, color = C.white }) => (
  <h3 style={{ fontFamily: FONT_HEAD, fontSize: 20, color, margin: "0 0 10px" }}>{children}</h3>
);

// Helper for price (strips ₹ prefix for display grid)
const priceLine = (p) => p.split("₹")[1] ? `₹${p.split("₹")[1]}` : p;

export default function FinsightDigital() {
  return (
    <section id="digital" style={{ padding: "80px 24px", position: "relative", zIndex: 1, background: `linear-gradient(180deg,transparent,${C.bgMid}40,transparent)` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* ─── Section header ─── */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <Eyebrow text="FinSight Digital · BankReady™" />
          <H2>Productized Loan Documents for ₹25–100 Cr Borrowers</H2>
          <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: C.muted, maxWidth: 680, margin: "16px auto 0", lineHeight: 1.7 }}>
            CAM · CMA · DPR. Four flat-fee tiers. 10-day SLA. AI-assisted drafting gated by a 20-year banker. Transparent GST-inclusive pricing.
          </p>
        </div>

        {/* ─── 6-Reason Grid ─── */}
        <Section>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <Eyebrow text="Why Pay Before Seeing the Report" color={C.gold} />
            <H2>Six reasons borrowers pick BankReady™</H2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
            {DIGITAL_REASONS.map((r) => (
              <div key={r.title} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{r.icon}</div>
                <H3>{r.title}</H3>
                <p style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: C.muted, lineHeight: 1.7, margin: 0 }}>{r.body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ─── BankReady™ 4-Tier Pricing ─── */}
        <Section>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <Eyebrow text="BankReady™ Pricing" />
            <H2>Four tiers. Flat fees. GST inclusive.</H2>
            <p style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.muted, marginTop: 10 }}>All prices + 18% GST. 50% on scoping approval, 50% on delivery.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
            {BANKREADY_TIERS.map((t) => (
              <div key={t.tier}
                style={{ background: t.highlight ? `linear-gradient(135deg,${C.digital}22,${C.purple}18)` : C.bgCard, border: `1px solid ${t.highlight ? C.digital : C.border}`, borderRadius: 16, padding: 24, position: "relative" }}>
                {t.highlight && (
                  <div style={{ position: "absolute", top: -10, left: 20, background: C.digital, color: C.white, padding: "3px 10px", borderRadius: 10, fontFamily: FONT_BODY, fontSize: 9, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase" }}>Most Popular</div>
                )}
                <div style={{ fontFamily: FONT_HEAD, fontSize: 22, color: C.white, marginBottom: 6 }}>{t.tier}</div>
                <div style={{ fontFamily: FONT_HEAD, fontSize: 32, color: t.highlight ? C.digital : C.gold, marginBottom: 4 }}>{t.price}</div>
                <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.muted, marginBottom: 18 }}>{t.loanBand} · + GST</div>
                {t.includes.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                    <span style={{ color: C.green, fontSize: 12 }}>✓</span>
                    <span style={{ fontFamily: FONT_BODY, fontSize: 12, color: "#94A3B8", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
                <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  style={{ marginTop: 18, width: "100%", padding: "10px", background: t.highlight ? `linear-gradient(135deg,${C.digital},${C.purpleLight})` : "transparent", border: t.highlight ? "none" : `1px solid ${C.border}`, borderRadius: 8, color: t.highlight ? "white" : C.muted, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: FONT_BODY }}>
                  Get {t.tier} →
                </button>
              </div>
            ))}
          </div>
        </Section>

        {/* ─── Us vs Market ─── */}
        <Section>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <Eyebrow text="Compare" color={C.gold} />
            <H2>FinSight Digital vs the market</H2>
          </div>
          <div style={{ overflowX: "auto", border: `1px solid ${C.border}`, borderRadius: 14, background: C.bgCard }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 720 }}>
              <thead>
                <tr style={{ background: C.bgMid }}>
                  <th style={{ padding: "14px 16px", textAlign: "left", fontFamily: FONT_BODY, fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Criteria</th>
                  {US_VS_MARKET.cols.map((c) => (
                    <th key={c.name} style={{ padding: "14px 16px", textAlign: "left", fontFamily: FONT_BODY, fontSize: 11, fontWeight: 800, letterSpacing: 1, color: c.tone === "us" ? C.digital : C.muted, textTransform: "uppercase" }}>{c.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {US_VS_MARKET.criteria.map((crit, rIdx) => (
                  <tr key={crit} style={{ borderTop: `1px solid ${C.border}` }}>
                    <td style={{ padding: "12px 16px", fontFamily: FONT_BODY, fontSize: 12, color: C.white, fontWeight: 600 }}>{crit}</td>
                    {US_VS_MARKET.cols.map((c) => (
                      <td key={c.name + rIdx} style={{ padding: "12px 16px", fontFamily: FONT_BODY, fontSize: 12, color: c.tone === "us" ? C.digital : "#94A3B8", fontWeight: c.tone === "us" ? 700 : 400 }}>{c.values[rIdx]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ─── 5-Step Process ─── */}
        <Section>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <Eyebrow text="Process" />
            <H2>Enquiry to Bank Submission in 10 Days</H2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
            {FSD_PROCESS.map((s) => (
              <div key={s.step} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, padding: 20, textAlign: "center" }}>
                <div style={{ fontFamily: FONT_HEAD, fontSize: 11, color: C.digital, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>{s.step}</div>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
                <H3>{s.title}</H3>
                <p style={{ fontFamily: FONT_BODY, fontSize: 11.5, color: C.muted, lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ─── Sugar Mill Case Study ─── */}
        <Section>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <Eyebrow text="Case Study" color={C.green} />
            <H2>{SUGAR_MILL.title}</H2>
          </div>
          <div style={{ background: C.bgCard, border: `1px solid ${C.green}30`, borderRadius: 20, overflow: "hidden" }}>
            <div style={{ background: `linear-gradient(135deg,${C.green}15,${C.digital}15)`, borderBottom: `1px solid ${C.border}`, padding: "18px 28px", display: "flex", gap: 24, flexWrap: "wrap" }}>
              {[["Sector", SUGAR_MILL.sector], ["Loan Size", SUGAR_MILL.loanSize], ["Geography", SUGAR_MILL.geography]].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontFamily: FONT_BODY, fontSize: 10, color: C.muted, marginBottom: 2 }}>{k}</div>
                  <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.white, fontWeight: 700 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: 28 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, marginBottom: 24 }}>
                <div>
                  <div style={{ fontFamily: FONT_BODY, fontSize: 10, color: C.red, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>The Problem</div>
                  <p style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.muted, lineHeight: 1.8, margin: 0 }}>{SUGAR_MILL.problem}</p>
                </div>
                <div>
                  <div style={{ fontFamily: FONT_BODY, fontSize: 10, color: C.green, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>BankReady™ Solution</div>
                  <p style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.muted, lineHeight: 1.8, margin: 0 }}>{SUGAR_MILL.solution}</p>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
                {SUGAR_MILL.outcomes.map((o) => (
                  <div key={o.label} style={{ background: `${C.green}10`, border: `1px solid ${C.green}25`, borderRadius: 12, padding: "14px 8px", textAlign: "center" }}>
                    <div style={{ fontFamily: FONT_HEAD, fontSize: 22, color: C.green, marginBottom: 4 }}>{o.metric}</div>
                    <div style={{ fontFamily: FONT_BODY, fontSize: 10, color: C.muted, lineHeight: 1.3 }}>{o.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ─── System D Automation Architecture ─── */}
        <Section>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <Eyebrow text="Automation Architecture" color={C.purpleLight} />
            <H2>System D — lead → cash → renewal</H2>
            <p style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.muted, marginTop: 10 }}>Every touchpoint automated. Every deliverable human-gated. Full transparency from day one.</p>
          </div>
          <div>
            {SYSTEM_D.map((row) => (
              <div key={row.row} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12, marginBottom: 14 }}>
                {row.boxes.map((b) => (
                  <div key={b.title} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: 18 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <span style={{ fontSize: 22 }}>{b.icon}</span>
                      <div style={{ fontFamily: FONT_HEAD, fontSize: 15, color: C.white, fontWeight: 700 }}>{b.title}</div>
                    </div>
                    <p style={{ fontFamily: FONT_BODY, fontSize: 11.5, color: C.muted, lineHeight: 1.6, margin: 0 }}>{b.body}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Section>

        {/* ─── Tool Stack ─── */}
        <Section>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <Eyebrow text="Tool Stack" color={C.gold} />
            <H2>Stack we run. Stack you get.</H2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
            {TOOL_STACK.map((t) => (
              <div key={t.name} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: 18, textAlign: "center" }}>
                <div style={{ fontSize: 26, marginBottom: 8 }}>{t.icon}</div>
                <div style={{ fontFamily: FONT_HEAD, fontSize: 14, color: C.white, fontWeight: 700, marginBottom: 4 }}>{t.name}</div>
                <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.muted, lineHeight: 1.5 }}>{t.role}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* ─── Strategy Routes (S1 / S2 / S3) ─── */}
        <Section>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <Eyebrow text="How we reach you" color={C.gold} />
            <H2>Three routes into FinSight Digital</H2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
            {STRATEGY_ROUTES.map((s) => (
              <div key={s.id} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
                <div style={{ fontFamily: FONT_BODY, fontSize: 10, color: C.gold, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>{s.id} · {s.tag}</div>
                <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.muted, marginBottom: 10 }}>{s.who}</div>
                <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.white, fontWeight: 600, marginBottom: 10, lineHeight: 1.5 }}>{s.offer}</div>
                <div style={{ padding: "8px 12px", background: `${C.gold}12`, border: `1px solid ${C.gold}25`, borderRadius: 8, fontFamily: FONT_BODY, fontSize: 11, color: C.gold, fontWeight: 700 }}>{s.price}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* ─── Campaign Samples ─── */}
        <Section>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <Eyebrow text="Nurture samples" color={C.green} />
            <H2>Messages our leads actually receive</H2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 14 }}>
            {CAMPAIGN_SAMPLES.map((c) => (
              <div key={c.channel} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, padding: 20 }}>
                <div style={{ fontFamily: FONT_BODY, fontSize: 10, color: C.green, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{c.channel}</div>
                <div style={{ fontFamily: FONT_HEAD, fontSize: 14, color: C.white, fontWeight: 700, marginBottom: 10 }}>{c.subject}</div>
                <p style={{ fontFamily: FONT_BODY, fontSize: 12, color: C.muted, lineHeight: 1.7, margin: 0 }}>"{c.body}"</p>
              </div>
            ))}
          </div>
        </Section>

      </div>
    </section>
  );
}
