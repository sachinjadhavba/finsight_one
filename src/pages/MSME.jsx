import { useState } from "react";
import Footer from "../components/Footer";

const ORANGE = "#FB923C";
const INDIGO = "#4F46E5";
const DARK   = "#111827";
const MUTED  = "#6B7280";
const WHITE  = "#fff";
const GRAY   = "#F9FAFB";
const GREEN  = "#059669";
const RED    = "#DC2626";
const WA     = "919579453635";

const LOANS = [
  {
    icon: "💰",
    title: "Working Capital CC / OD",
    desc: "Drawing power calculation, GST alignment, banking behaviour review. CC and OD facilities matched to the right lender for your turnover and sector.",
    indicators: [
      { label: "Turnover", value: "₹25L+/yr", note: "Strong above ₹50L", rag: "g" },
      { label: "Vintage",  value: "2 yrs+",   note: "NBFCs accept 1 yr",  rag: "a" },
      { label: "CIBIL",    value: "650+",      note: "Best rates 720+",    rag: "a" },
      { label: "Promoter Margin", value: "25%", note: "Of sanctioned limit", rag: "g" },
    ],
  },
  {
    icon: "🏭",
    title: "Machinery & Equipment Loan",
    desc: "DSCR calculation, promoter contribution verification, lender matching for manufacturing and processing units. Capex structured for maximum tenure.",
    indicators: [
      { label: "Turnover", value: "₹20L+/yr", note: "Strong above ₹40L",  rag: "g" },
      { label: "Vintage",  value: "2 yrs+",   note: "With existing cashflow", rag: "a" },
      { label: "CIBIL",    value: "650+",      note: "Best rates 720+",    rag: "a" },
      { label: "Promoter Margin", value: "25%", note: "Of project cost",   rag: "g" },
    ],
  },
  {
    icon: "🏢",
    title: "Loan Against Property (LAP)",
    desc: "Title chain review, LTV maximisation, lender matching — residential, commercial or industrial property. Income from business or salary both accepted.",
    indicators: [
      { label: "Turnover", value: "₹15L+/yr", note: "Or salaried income",  rag: "g" },
      { label: "Vintage",  value: "1 yr+",    note: "Self-employed or salaried", rag: "g" },
      { label: "CIBIL",    value: "650+",      note: "Best rates 720+",    rag: "a" },
      { label: "FOIR",     value: "Up to 80%", note: "Including proposed EMI", rag: "g" },
    ],
  },
  {
    icon: "📄",
    title: "Unsecured Business Loan",
    desc: "GST and banking-based assessment. Fast disbursal through fintech NBFCs. No collateral required — eligibility driven purely by income and conduct.",
    indicators: [
      { label: "Turnover", value: "₹15L+/yr", note: "Fintechs: ₹10L+",   rag: "g" },
      { label: "Vintage",  value: "1 yr+",    note: "Fintechs: 6 months", rag: "a" },
      { label: "CIBIL",    value: "650+",      note: "Some NBFCs: 625+",   rag: "a" },
      { label: "FOIR",     value: "Up to 65%", note: "Including proposed EMI", rag: "a" },
    ],
  },
  {
    icon: "🏗️",
    title: "Business Term Loan",
    desc: "DSCR-based assessment, fund flow analysis, project report preparation. Structured for capex, expansion, and working capital gap bridging.",
    indicators: [
      { label: "Turnover", value: "₹30L+/yr", note: "Strong above ₹75L",  rag: "a" },
      { label: "Vintage",  value: "3 yrs+",   note: "NBFCs accept 2 yrs", rag: "a" },
      { label: "CIBIL",    value: "650+",      note: "Best rates 720+",    rag: "a" },
      { label: "Promoter Margin", value: "25%", note: "Of project cost",   rag: "g" },
    ],
  },
  {
    icon: "🏦",
    title: "Lease Rental Discounting (LRD)",
    desc: "Rental yield calculation, lease lock-in assessment, escrow structure and lender matching. Loan against future rental income from leased property.",
    indicators: [
      { label: "Rental Income", value: "Steady lease", note: "Institutional tenant preferred", rag: "g" },
      { label: "Lock-in",  value: "3+ yrs",    note: "Remaining lease tenure", rag: "a" },
      { label: "CIBIL",    value: "650+",       note: "Best rates 720+",   rag: "a" },
      { label: "Promoter Margin", value: "10%", note: "Of loan amount",    rag: "g" },
    ],
  },
];

const RAG_COLORS = {
  g: { bg: "#F0FDF4", border: "#BBF7D0", text: GREEN },
  a: { bg: "#FFFBEB", border: "#FDE68A", text: "#92400E" },
  r: { bg: "#FEF2F2", border: "#FECACA", text: RED },
};

const REJECTION_REASONS = [
  { icon: "📉", title: "Low CIBIL Score", desc: "Most lenders reject below 650. Even 650–700 narrows your options significantly. We identify what's pulling your score down and build a fix-first strategy." },
  { icon: "🔄", title: "Banking ≠ ITR", desc: "Your ITR shows ₹50L turnover but banking credits are ₹30L. Lenders cross-check all three — ITR, GST, banking. A gap is a red flag. We reconcile and explain it before submission." },
  { icon: "📅", title: "Business Too New", desc: "Most banks need 2–3 years vintage. Under 2 years, your lender universe shrinks to NBFCs and fintechs — which is fine, but you need to know who to approach and how." },
  { icon: "📁", title: "Incomplete Documents", desc: "Missing ITR year, no CA-certified financials, wrong property documents, outdated valuation report. Banks reject on technicalities. We catch every gap before submission." },
  { icon: "💸", title: "FOIR Too High", desc: "Too many existing EMIs eating your income. Your eligible amount drops or you get rejected entirely. We restructure the ask — amount, tenure, or facility type — to fit within your FOIR." },
  { icon: "🏦", title: "Wrong Lender", desc: "A Gram Panchayat property to HDFC, a 1-year business to SBI — guaranteed rejection. Every lender has specific appetite. We match you to the right one first time." },
];

const COST_ITEMS = [
  { problem: "Working capital too low",        cost: "You turn down orders you cannot fund" },
  { problem: "Rejected — reapply elsewhere",   cost: "CIBIL drops further — next approval harder" },
  { problem: "Wrong lender for your profile",  cost: "2% higher rate on ₹1 Cr = ₹2 Lakh/yr extra" },
  { problem: "No monthly monitoring",          cost: "NPA risk builds silently — hits by surprise" },
];

function IndicatorRow({ ind }) {
  const c = RAG_COLORS[ind.rag];
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid #F3F4F6", gap: 8 }}>
      <span style={{ fontSize: 11, color: MUTED, fontWeight: 600, minWidth: 110 }}>{ind.label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, justifyContent: "flex-end" }}>
        <span style={{ fontSize: 11.5, fontWeight: 700, color: DARK }}>{ind.value}</span>
        <span style={{ fontSize: 10, color: c.text, background: c.bg, border: `1px solid ${c.border}`, borderRadius: 10, padding: "1px 7px", whiteSpace: "nowrap" }}>{ind.note}</span>
      </div>
    </div>
  );
}

export default function MSME({ navigate }) {
  return (
    <div style={{ fontFamily: "Arial,sans-serif", color: DARK }}>

      {/* ── HERO ── */}
      <div style={{ background: "linear-gradient(135deg,#0F172A 0%,#1E1B4B 100%)", padding: "clamp(44px,6vw,72px) clamp(20px,4vw,48px)", textAlign: "center" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "rgba(234,88,12,0.2)", border: "1px solid rgba(234,88,12,0.4)", color: "#FB923C", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "5px 16px", borderRadius: 100, marginBottom: 20 }}>
            For MSMEs & SMEs
          </div>
          <h1 style={{ fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 900, color: WHITE, lineHeight: 1.2, marginBottom: 16 }}>
            Your Bank Knows Your Balance Sheet.<br />
            <span style={{ color: ORANGE }}>We Know How to Get You Approved.</span>
          </h1>
          <p style={{ fontSize: 15, color: "#CBD5E1", maxWidth: 580, margin: "0 auto 32px", lineHeight: 1.75 }}>
            20 years inside banking credit teams. We know exactly what makes a banker approve — and exactly what makes them reject. We fix the second so you get the first.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate("check")} style={{ background: ORANGE, color: WHITE, fontSize: 14, fontWeight: 700, padding: "13px 32px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
              Check My Business Eligibility — Free →
            </button>
            <button onClick={() => window.open(`https://wa.me/${WA}?text=${encodeURIComponent("Hi FinsightOne, I need help with my MSME loan")}`, "_blank")} style={{ background: "rgba(255,255,255,0.1)", color: WHITE, fontSize: 14, fontWeight: 600, padding: "13px 28px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", fontFamily: "inherit" }}>
              💬 Talk to an Expert
            </button>
          </div>
        </div>
      </div>

      {/* ── TRUST BAR ── */}
      <div style={{ background: GRAY, borderBottom: "1px solid #E5E7EB", padding: "16px clamp(20px,4vw,48px)", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 16 }}>
        {[["₹0", "To Check Eligibility"], ["72 hrs", "Document Delivery"], ["20 yrs", "Banking Expertise"], ["PAN India", "Coverage"]].map(([v, l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: ORANGE }}>{v}</div>
            <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* ── LOAN PRODUCTS WITH ELIGIBILITY INDICATORS ── */}
      <div style={{ padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)", background: WHITE }}>
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, color: ORANGE, textTransform: "uppercase", marginBottom: 10 }}>Loan Products We Cover</div>
          <h2 style={{ fontSize: "clamp(22px,3vw,28px)", fontWeight: 900, color: DARK, marginBottom: 10 }}>Every MSME Loan Product — One Platform</h2>
          <p style={{ fontSize: 13.5, color: MUTED, maxWidth: 560, margin: "0 auto 10px", lineHeight: 1.6 }}>
            Each card shows what lenders typically look for — not our cutoffs. Borderline on any indicator? We know which lenders have higher appetite.
          </p>
          {/* RAG legend */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 14, background: GRAY, border: "1px solid #E5E7EB", borderRadius: 20, padding: "6px 16px", marginBottom: 36 }}>
            {[["g", "Strong fit"], ["a", "Depends on lender"], ["r", "Needs structuring"]].map(([rag, label]) => (
              <div key={rag} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: RAG_COLORS[rag].text, display: "inline-block" }} />
                <span style={{ fontSize: 11, color: MUTED, fontWeight: 500 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 18, maxWidth: 1100, margin: "0 auto" }}>
          {LOANS.map((loan) => (
            <div key={loan.title} style={{ background: WHITE, border: "1px solid #E5E7EB", borderRadius: 12, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ padding: "20px 20px 14px", flex: 1 }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{loan.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: DARK, marginBottom: 8 }}>{loan.title}</h3>
                <p style={{ fontSize: 12.5, color: MUTED, lineHeight: 1.6, marginBottom: 14 }}>{loan.desc}</p>

                {/* Eligibility Indicators */}
                <div style={{ background: GRAY, borderRadius: 8, padding: "10px 12px" }}>
                  <div style={{ fontSize: 9.5, fontWeight: 800, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>
                    What lenders typically look for
                  </div>
                  {loan.indicators.map((ind) => (
                    <IndicatorRow key={ind.label} ind={ind} />
                  ))}
                  <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #E5E7EB" }}>
                    <span
                      onClick={() => navigate("check")}
                      style={{ fontSize: 11, color: INDIGO, fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}>
                      Not sure where you stand? Free check →
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ padding: "12px 20px 16px", borderTop: "1px solid #F3F4F6" }}>
                <button
                  onClick={() => navigate("check")}
                  style={{ width: "100%", padding: "9px 0", borderRadius: 8, fontSize: 12.5, fontWeight: 700, cursor: "pointer", background: ORANGE, color: WHITE, border: "none", fontFamily: "inherit" }}>
                  Check My Eligibility — Free →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW FINSIGHTONE HELPS ── */}
      <div style={{ background: GRAY, padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, color: ORANGE, textTransform: "uppercase", marginBottom: 10 }}>How We Help</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,28px)", fontWeight: 900, color: DARK }}>Three Things We Do for Every MSME Client</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
            {[
              { icon: "📄", color: INDIGO, title: "We Prepare", sub: "Every document your lender needs", points: ["Loan Appraisal Note (LAN)", "CMA Financial Analysis", "Project Report (DPR)", "Banking conduct summary", "Income reconciliation note"] },
              { icon: "🎯", color: ORANGE, title: "We Match", sub: "Right lender for your exact profile", points: ["Lender shortlisting by turnover, vintage, CIBIL", "No random applications", "No CIBIL damage from wrong enquiries", "Track record with specific lender policies", "Approach strategy per lender type"] },
              { icon: "📊", color: GREEN, title: "We Monitor", sub: "Keep you loan-ready every month", points: ["Monthly banking conduct review", "CIBIL score tracking", "Working capital alerts", "Pre-NPA warning signals", "Annual renewal preparation"] },
            ].map((col) => (
              <div key={col.title} style={{ background: WHITE, borderRadius: 12, padding: "22px 20px", border: "1px solid #E5E7EB", borderTop: `3px solid ${col.color}` }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{col.icon}</div>
                <div style={{ fontSize: 17, fontWeight: 800, color: DARK, marginBottom: 4 }}>{col.title}</div>
                <div style={{ fontSize: 13, color: MUTED, marginBottom: 14 }}>{col.sub}</div>
                {col.points.map((p, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 7 }}>
                    <span style={{ color: col.color, fontWeight: 900, fontSize: 11, marginTop: 2, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 12.5, color: DARK, lineHeight: 1.4 }}>{p}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── COMMON REJECTION REASONS ── */}
      <div style={{ background: WHITE, padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, color: ORANGE, textTransform: "uppercase", marginBottom: 10 }}>Why Loans Get Rejected</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,28px)", fontWeight: 900, color: DARK, marginBottom: 10 }}>6 Most Common MSME Rejection Reasons</h2>
            <p style={{ fontSize: 14, color: MUTED, maxWidth: 500, margin: "0 auto" }}>Every one of these is fixable. We identify which ones apply to your profile — and fix them before submission.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
            {REJECTION_REASONS.map((r) => (
              <div key={r.title} style={{ background: GRAY, border: "1px solid #E5E7EB", borderRadius: 10, padding: "18px 18px", borderLeft: `3px solid ${RED}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 22 }}>{r.icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: DARK }}>{r.title}</span>
                </div>
                <p style={{ fontSize: 12.5, color: MUTED, lineHeight: 1.65, margin: 0 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── REAL COST ── */}
      <div style={{ background: GRAY, padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, color: ORANGE, textTransform: "uppercase", marginBottom: 10 }}>The Real Cost of Not Getting Help</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,28px)", fontWeight: 900, color: DARK }}>What a Rejection Actually Costs You</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
            {COST_ITEMS.map((item) => (
              <div key={item.problem} style={{ background: WHITE, border: "1px solid #FEE2E2", borderRadius: 10, padding: 20, borderTop: "3px solid #EF4444" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: RED, marginBottom: 8 }}>{item.problem}</div>
                <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.55 }}>{item.cost}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div style={{ background: `linear-gradient(135deg,#0F172A 0%,#1E1B4B 100%)`, padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)", textAlign: "center" }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 900, color: WHITE, marginBottom: 12 }}>
            Check Your Business Eligibility — Free
          </h2>
          <p style={{ fontSize: 14, color: "#CBD5E1", marginBottom: 28, lineHeight: 1.7 }}>
            2 minutes. No documents. Know your chances before approaching any bank.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate("check")} style={{ background: ORANGE, color: WHITE, fontSize: 14, fontWeight: 700, padding: "13px 32px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
              Check Eligibility — Free →
            </button>
            <button onClick={() => window.open(`https://wa.me/${WA}?text=${encodeURIComponent("Hi FinsightOne, I need help with my MSME loan")}`, "_blank")} style={{ background: "rgba(255,255,255,0.1)", color: WHITE, fontSize: 14, fontWeight: 600, padding: "13px 28px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", fontFamily: "inherit" }}>
              💬 Talk to an Expert
            </button>
          </div>
          <div style={{ fontSize: 11, color: "#475569", marginTop: 16 }}>🔒 Free · No documents needed · No spam</div>
        </div>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}
