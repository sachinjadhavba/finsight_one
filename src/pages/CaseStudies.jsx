import { useState } from "react";
import Footer from "../components/Footer";

const ORANGE = "#EA580C";
const INDIGO = "#4F46E5";
const DARK   = "#111827";
const MUTED  = "#6B7280";
const WHITE  = "#fff";
const GRAY   = "#F9FAFB";
const GREEN  = "#059669";
const RED    = "#DC2626";
const WA     = "919579453635";

const CASES = [
  {
    id: "cs01",
    filter: "business",
    tag: "SUGAR & AGRO · MAHARASHTRA",
    color: "#166534", bgColor: "#064E3B", tagColor: "#6EE7B7",
    icon: "🏭",
    title: "₹60 Crore Sugar Mill Consortium Loan",
    subtitle: "Two rejections. 12 risk flags. Sanctioned in 38 days.",
    stats: [
      { val:"₹60 Cr",  label:"Loan Sanctioned" },
      { val:"38 Days", label:"Time to Sanction" },
      { val:"12",      label:"Risk Flags Fixed" },
      { val:"4.17x",   label:"ICR by FY30" },
    ],
    difference: "Rebuilt the DPR to comply with RBI 2025 Project Finance Directions and integrated PPA revenue into CMA projections — the two items both previous submissions had missed entirely.",
    problem: "A Maharashtra sugar co-operative had applied twice to a consortium of banks and been rejected both times. The bank cited weak CMA projections, missing ICR calculations, DPR format non-compliant with RBI 2025 Project Finance Directions, and no Power Purchase Agreement revenue integration in the financial model. The co-operative had engaged two local CAs previously — both had prepared files that did not meet consortium lending standards.",
    solution: "FinsightOne rebuilt the complete LAN, CMA and DPR from scratch. We restructured projections to correctly integrate seasonal crushing income with PPA co-generation revenue across a 10-year projection period, demonstrating ICR of 4.17x by FY30. Each of the 12 risk flags cited by the credit committee was addressed with a specific, documented mitigant in the file narrative. Resubmitted to the lead bank in the same consortium — sanctioned in 38 days.",
    cta: "advisory",
  },
  {
    id: "cs02",
    filter: "business",
    tag: "DAIRY & AGRI · RAJASTHAN",
    color: "#1D4ED8", bgColor: "#1E3A8A", tagColor: "#93C5FD",
    icon: "🐄",
    title: "₹14.5 Crore Dairy Farm Term Loan",
    subtitle: "2 bank rejections reversed. NABARD DEDS subsidy unlocked.",
    stats: [
      { val:"₹14.5 Cr", label:"Loan Sanctioned" },
      { val:"2",         label:"Rejections Reversed" },
      { val:"₹2.1 Cr",  label:"NABARD Subsidy" },
      { val:"5 Weeks",  label:"To Sanction" },
    ],
    difference: "Establishing NABARD DEDS subsidy eligibility reduced effective bank exposure by ₹2.1 Crore — converting a DSCR of 0.98x (below lender floor) to 1.42x (approvable). The subsidy was always available. No one had documented it.",
    problem: "A family-owned dairy farm had been rejected by two different banks. Three issues compounded each other: the promoter's CIBIL showed a 3-year-old settled account incorrectly marked as Written Off, the project lacked a techno-economic viability report meeting bank standards, and NABARD DEDS subsidy eligibility — which would have materially improved the DSCR — had never been established or documented in either submission.",
    solution: "FinsightOne obtained CIBIL dispute resolution and a NOC letter from the original lender confirming the settlement, which corrected the Written Off classification. Commissioned an independent TEV study meeting bank requirements. Established and fully documented NABARD DEDS eligibility of ₹2.1 Crore — reducing effective bank exposure and improving DSCR from 0.98x to 1.42x. Submitted to a PSU bank with a strong agri-lending track record. Sanctioned in 5 weeks.",
    cta: "advisory",
  },
  {
    id: "cs05",
    filter: "business",
    tag: "TEXTILES & EXPORT · SURAT",
    color: "#B45309", bgColor: "#78350F", tagColor: "#FCD34D",
    icon: "🧵",
    title: "₹12 Crore WC Enhancement — Textile Exporter",
    subtitle: "Thin PAT margins misread for 4 years. Correct framework presented. Enhancement sanctioned.",
    stats: [
      { val:"₹12 Cr",  label:"CC Limit Sanctioned" },
      { val:"4 Years", label:"Stuck at ₹6 Cr" },
      { val:"28%",     label:"EBITDA on Value-Added" },
      { val:"2.8%",    label:"PAT/Sales — Correctly Explained" },
    ],
    difference: "The lender's credit team was applying a manufacturing margin benchmark to an export business — structurally incorrect. Rebuilding the CMA to show EBITDA on value-added (28%) instead of PAT on gross FOB (2.8%) changed the credit story entirely — with the same underlying numbers.",
    problem: "A Surat textile exporter with ₹42 Crore FOB export turnover had been stuck at a WC CC limit of ₹6 Crore for 4 years. Every annual renewal assessment flagged 2.8% PAT/Sales as dangerously thin margins — and the lender's credit team declined enhancement year after year on that basis. The business was profitable, growing, and fully compliant. The problem was entirely in how the financials were being read — PAT/Sales is the wrong metric for an export business where high material cost (fabric, yarn) structurally suppresses the ratio relative to FOB value.",
    solution: "FinsightOne rebuilt the CMA to separate value-added margin (manufacturing spread) from gross FOB revenue. Demonstrated EBITDA of 28% on value-added — well above manufacturing sector benchmarks. Prepared a detailed industry context note explaining the correct profitability framework for textile export businesses, supported by RBI and ECGC sector guidelines. Routed the file to the lender's trade finance vertical — which has analysts familiar with export sector economics — rather than the retail MSME desk that had been reviewing it for 4 years. Enhancement from ₹6 Cr to ₹12 Cr sanctioned.",
    cta: "docs",
  },
];

const FILTERS = [
  { id:"all",      label:"All Cases" },
  { id:"business", label:"Business Loans" },
];

const CTA_MAP = {
  check:    { label:"Check My Eligibility — Free →", page:"check",    bg:ORANGE },
  advisory: { label:"Talk to an Expert →",           page:"advisory",  bg:INDIGO },
  docs:     { label:"Get My Documents →",            page:"docs",      bg:DARK },
};

function CaseCard({ cs, navigate }) {
  const cta = CTA_MAP[cs.cta];
  return (
    <div style={{ border:"1px solid #E5E7EB", borderRadius:14, overflow:"hidden", background:WHITE }}>
      {/* Header */}
      <div style={{ background:cs.bgColor, padding:"22px 28px" }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:2, color:cs.tagColor, textTransform:"uppercase", marginBottom:8 }}>{cs.tag}</div>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
          <span style={{ fontSize:22 }}>{cs.icon}</span>
          <div style={{ fontSize:17, fontWeight:800, color:WHITE, lineHeight:1.25 }}>{cs.title}</div>
        </div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.65)", fontStyle:"italic", marginBottom:18 }}>{cs.subtitle}</div>
        <div style={{ display:"flex", gap:28, flexWrap:"wrap" }}>
          {cs.stats.map(s => (
            <div key={s.label}>
              <div style={{ fontSize:18, fontWeight:800, color:WHITE }}>{s.val}</div>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.5)", marginTop:2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* What made the difference */}
      <div style={{ background:`${cs.bgColor}18`, borderBottom:"1px solid #F3F4F6", padding:"12px 28px", display:"flex", alignItems:"flex-start", gap:10 }}>
        <span style={{ fontSize:16, flexShrink:0, marginTop:1 }}>💡</span>
        <div>
          <span style={{ fontSize:10, fontWeight:800, letterSpacing:1.5, textTransform:"uppercase", color:cs.color, marginRight:8 }}>What Made the Difference</span>
          <span style={{ fontSize:13, color:"#374151", lineHeight:1.6 }}>{cs.difference}</span>
        </div>
      </div>

      {/* Problem / Solution */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:0 }}>
        <div style={{ padding:"20px 28px", borderRight:"1px solid #F3F4F6" }}>
          <div style={{ fontSize:10, fontWeight:800, letterSpacing:1.5, color:RED, textTransform:"uppercase", marginBottom:8 }}>The Problem</div>
          <div style={{ fontSize:13, color:"#374151", lineHeight:1.7 }}>{cs.problem}</div>
        </div>
        <div style={{ padding:"20px 28px" }}>
          <div style={{ fontSize:10, fontWeight:800, letterSpacing:1.5, color:GREEN, textTransform:"uppercase", marginBottom:8 }}>Our Solution</div>
          <div style={{ fontSize:13, color:"#374151", lineHeight:1.7 }}>{cs.solution}</div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding:"14px 28px", borderTop:"1px solid #F3F4F6", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
        <div style={{ fontSize:12, color:MUTED, fontStyle:"italic" }}>Client details anonymised · Outcomes are actual results</div>
        <div style={{ display:"flex", gap:10 }}>
          <button
            onClick={() => navigate(cta.page)}
            style={{ background:cta.bg, color:WHITE, fontSize:12, fontWeight:700, padding:"8px 18px", borderRadius:6, border:"none", cursor:"pointer", fontFamily:"inherit" }}>
            {cta.label}
          </button>
          <button
            onClick={() => window.open(`https://wa.me/${WA}?text=${encodeURIComponent("Hi FinsightOne, I have a similar situation — " + cs.title)}`, "_blank")}
            style={{ background:"transparent", color:DARK, fontSize:12, fontWeight:600, padding:"8px 18px", borderRadius:6, border:"1px solid #E5E7EB", cursor:"pointer", fontFamily:"inherit" }}>
            💬 Similar Situation?
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudies({ navigate }) {
  const [active, setActive] = useState("all");
  const filtered = active === "all" ? CASES : CASES.filter(c => c.filter === active);

  return (
    <div style={{ fontFamily:"Arial,'Helvetica Neue',sans-serif", color:DARK }}>

      {/* HERO */}
      <div style={{ background:`linear-gradient(135deg,#0F172A 0%,#1E1B4B 100%)`, padding:"clamp(48px,7vw,72px) clamp(20px,5vw,48px)", textAlign:"center" }}>
        <div style={{ maxWidth:720, margin:"0 auto" }}>
          <div style={{ display:"inline-block", background:"rgba(234,88,12,0.2)", border:"1px solid rgba(234,88,12,0.4)", color:"#FB923C", fontSize:11, fontWeight:700, letterSpacing:2, textTransform:"uppercase", padding:"5px 16px", borderRadius:100, marginBottom:20 }}>
            Real Outcomes · All Client Details Anonymised
          </div>
          <h1 style={{ fontSize:"clamp(26px,3.5vw,40px)", fontWeight:900, color:WHITE, lineHeight:1.15, marginBottom:14 }}>
            Case Studies
          </h1>
          <p style={{ fontSize:16, color:"#CBD5E1", maxWidth:560, margin:"0 auto", lineHeight:1.7 }}>
            Every case below is real. Client names and specific lender details are anonymised. Loan amounts, timelines, and outcomes are actual results.
          </p>
        </div>
      </div>

      {/* STATS */}
      <div style={{ background:GRAY, borderBottom:"1px solid #E5E7EB", padding:"16px clamp(20px,4vw,48px)", display:"flex", justifyContent:"space-around", flexWrap:"wrap", gap:16 }}>
        {[["3","Case Studies Published"],["₹60 Cr","Largest Case"],["5 Weeks","Fastest Sanction"],["4.17x","Highest ICR Achieved"]].map(([v,l]) => (
          <div key={l} style={{ textAlign:"center" }}>
            <div style={{ fontSize:20, fontWeight:900, color:ORANGE }}>{v}</div>
            <div style={{ fontSize:11, color:MUTED, marginTop:2 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* FILTER BAR */}
      <div style={{ background:WHITE, borderBottom:"1px solid #E5E7EB", padding:"14px clamp(20px,4vw,48px)", display:"flex", justifyContent:"center", gap:8, flexWrap:"wrap" }}>
        {FILTERS.map(f => (
          <button key={f.id}
            onClick={() => setActive(f.id)}
            style={{ padding:"7px 18px", borderRadius:20, fontSize:12.5, fontWeight:600, cursor:"pointer", fontFamily:"inherit", border: active===f.id ? `1px solid ${ORANGE}` : "1px solid #E5E7EB", background: active===f.id ? `${ORANGE}10` : WHITE, color: active===f.id ? ORANGE : MUTED, transition:"all 0.15s" }}>
            {f.label}
          </button>
        ))}
      </div>

      {/* CASES */}
      <div style={{ padding:"clamp(28px,4vw,48px) clamp(20px,4vw,48px)", maxWidth:1100, margin:"0 auto", display:"flex", flexDirection:"column", gap:24 }}>
        {filtered.map(cs => <CaseCard key={cs.id} cs={cs} navigate={navigate} />)}
      </div>

      {/* BOTTOM CTA */}
      <div style={{ background:`linear-gradient(135deg,#0F172A 0%,#1E1B4B 100%)`, padding:"clamp(40px,5vw,64px) clamp(20px,4vw,48px)", textAlign:"center" }}>
        <div style={{ maxWidth:560, margin:"0 auto" }}>
          <h2 style={{ fontSize:"clamp(22px,3vw,30px)", fontWeight:900, color:WHITE, marginBottom:12 }}>
            Is Your Situation Similar?
          </h2>
          <p style={{ fontSize:14, color:"#CBD5E1", marginBottom:28, lineHeight:1.7 }}>
            Check your eligibility free — 2 minutes, no documents needed. Or talk to our team directly on WhatsApp.
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={() => navigate("check")} style={{ background:ORANGE, color:WHITE, fontSize:14, fontWeight:700, padding:"13px 28px", borderRadius:8, border:"none", cursor:"pointer", fontFamily:"inherit" }}>
              Check My Eligibility — Free →
            </button>
            <button
              onClick={() => window.open(`https://wa.me/${WA}?text=${encodeURIComponent("Hi FinsightOne, I have a loan case I need help with")}`, "_blank")}
              style={{ background:"rgba(255,255,255,0.1)", color:WHITE, fontSize:14, fontWeight:600, padding:"13px 28px", borderRadius:8, border:"1px solid rgba(255,255,255,0.2)", cursor:"pointer", fontFamily:"inherit" }}>
              💬 Talk to an Expert
            </button>
          </div>
          <div style={{ fontSize:11, color:"#475569", marginTop:16 }}>🔒 Free · No documents needed · No spam</div>
        </div>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}
