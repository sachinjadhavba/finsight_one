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
    difference: "Rebuilt DPR to comply with RBI 2025 Project Finance Directions and integrated PPA revenue — the two items both previous submissions had missed.",
    problem: "A Maharashtra sugar co-operative had applied twice to a consortium of banks and been rejected both times. The bank cited weak CMA projections, missing ICR calculations, wrong DPR format non-compliant with RBI 2025 Project Finance Directions, and no Power Purchase Agreement revenue integration in the financials.",
    solution: "FinsightOne rebuilt the complete LAN, CMA and DPR from scratch. We restructured projections to integrate seasonal crushing income and PPA revenue, demonstrating ICR of 4.17x by FY30. All 12 risk flags cited by the credit committee were addressed directly in the file narrative. Resubmitted to the lead bank in the same consortium.",
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
    difference: "Established NABARD DEDS subsidy eligibility — reducing effective bank exposure and improving DSCR from 0.98x to 1.42x. This alone converted a rejection into an approval.",
    problem: "A family-owned dairy farm had been rejected by two different banks. The primary issues: promoter's CIBIL showed a 3-year-old settled account marked as Written Off, the project lacked a techno-economic viability report, and NABARD DEDS subsidy eligibility had not been established in the file.",
    solution: "FinsightOne obtained CIBIL dispute resolution and a NOC letter from the original lender. Commissioned an independent TEV study. Established and documented NABARD DEDS eligibility of ₹2.1 Crore, which reduced effective bank exposure and improved DSCR from 0.98x to 1.42x. Submitted to a PSU bank with a strong track record in agri-lending.",
    cta: "advisory",
  },
  {
    id: "cs03",
    filter: "rejection",
    tag: "LOGISTICS & TRANSPORT · DELHI NCR",
    color: "#7C3AED", bgColor: "#4C1D95", tagColor: "#C4B5FD",
    icon: "🚛",
    title: "₹22 Crore Fleet Expansion — WC + Term Loan",
    subtitle: "Wrong NIC code caused rejection. Corrected and sanctioned by same bank.",
    stats: [
      { val:"₹22 Cr",    label:"Loan Sanctioned" },
      { val:"1",          label:"Rejection Reversed" },
      { val:"Same Bank",  label:"Resubmitted To" },
      { val:"4 Weeks",   label:"Sanction Timeline" },
    ],
    difference: "Identified a single NIC code mismatch that had been triggering an automated credit ceiling cap. One correction — same bank, same credit committee — different outcome.",
    problem: "A Delhi NCR logistics company with a fleet of 38 commercial vehicles was rejected by their existing lender for a ₹22 Cr fleet expansion loan. The bank cited incorrect NIC code classification, which meant their turnover was being assessed under a lower credit ceiling than applicable for commercial transport businesses.",
    solution: "FinsightOne identified the NIC code mismatch, filed the correction with the Udyam registration, and rebuilt the LAN with the correct industry classification. Re-approached the same bank with corrected documents, demonstrating eligibility under the commercial transport lending framework. Sanctioned within 4 weeks of resubmission.",
    cta: "docs",
  },
  {
    id: "cs04",
    filter: "individual",
    tag: "INDIVIDUAL · HOME LOAN · PUNE",
    color: "#0369A1", bgColor: "#0C4A6E", tagColor: "#7DD3FC",
    icon: "🏠",
    title: "₹68 Lakh Home Loan — Self-Employed Professional",
    subtitle: "FOIR exceeded. Co-applicant structured. Approved at best available rate.",
    stats: [
      { val:"₹68 L",   label:"Loan Sanctioned" },
      { val:"8.65%",   label:"Interest Rate" },
      { val:"38%",     label:"FOIR After Fix" },
      { val:"18 Days", label:"Time to Sanction" },
    ],
    difference: "Adding a zero-EMI co-applicant reduced effective FOIR from 64% to 38% — converting a certain rejection into a best-rate approval at a lender that values CA income profiles.",
    problem: "A Pune-based chartered accountant with 12 years of practice applied for a ₹68L home loan. A leading private bank rejected the application citing FOIR of 64% — exceeding their 50% cap — due to two active business loans and a credit card EMI. The applicant had a CIBIL of 768 and stable income — a strong profile that was being blocked by a structuring issue, not a credit issue.",
    solution: "FinsightOne analysed the co-applicant option — the spouse, a salaried professional with no existing EMIs. Adding the spouse as co-applicant reduced effective FOIR to 38%. Identified a lender with a strong track record for CA professionals and business income ITRs. Prepared income assessment using 3-year ITR averaging with appropriate add-backs. Sanctioned in 18 working days at 8.65% — 35 bps better than the original offer.",
    cta: "check",
  },
  {
    id: "cs05",
    filter: "individual",
    tag: "INDIVIDUAL · LAP · MUMBAI",
    color: "#B45309", bgColor: "#78350F", tagColor: "#FCD34D",
    icon: "🏢",
    title: "₹1.4 Crore LAP Against Commercial Office — Mumbai",
    subtitle: "Title chain gap resolved. LTV maximised. Approved by a leading NBFC.",
    stats: [
      { val:"₹1.4 Cr", label:"Loan Sanctioned" },
      { val:"62%",      label:"LTV Achieved" },
      { val:"3 Weeks",  label:"Post-Fix Sanction" },
      { val:"2",        label:"Prior Rejections" },
    ],
    difference: "A missing sale deed from 2009 had been silently blocking every application. Once traced and resolved with a clean title opinion, the same property that two banks had rejected was sanctioned by an NBFC in 3 weeks.",
    problem: "A Mumbai-based MSME owner applied for LAP against a commercial office unit. Two lenders declined — one cited a title chain gap (missing sale deed for one transfer in 2009) and another cited property age exceeding their internal limit. The borrower needed a minimum of ₹1.2 Crore to fund working capital and equipment.",
    solution: "FinsightOne appointed a property title specialist to trace the 2009 transfer gap. Obtained a certified copy of the missing sale deed from the Sub-Registrar office and secured a clean title advocate opinion. Identified a lender that accepts commercial property of this age with clear title. Re-valued the property with an empanelled valuer — achieved 62% LTV = ₹1.4 Cr sanctioned. Disbursed in 3 weeks after title resolution.",
    cta: "check",
  },
];

const FILTERS = [
  { id:"all",        label:"All Cases" },
  { id:"business",   label:"Business Loans" },
  { id:"individual", label:"Individual" },
  { id:"rejection",  label:"Rejection Recovery" },
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
            onClick={() => window.open(`https://wa.me/${WA}?text=${encodeURIComponent("Hi FinsightOne, I have a similar situation to your case study — " + cs.title)}`, "_blank")}
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

      {/* STATS — all from actual case data */}
      <div style={{ background:GRAY, borderBottom:"1px solid #E5E7EB", padding:"16px clamp(20px,4vw,48px)", display:"flex", justifyContent:"space-around", flexWrap:"wrap", gap:16 }}>
        {[["5","Case Studies Published"],["₹60 Cr","Largest Case"],["18 Days","Fastest Sanction"],["38 Days","Fastest Consortium"]].map(([v,l]) => (
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
            style={{ padding:"7px 18px", borderRadius:20, fontSize:12.5, fontWeight:600, cursor:"pointer", fontFamily:"inherit", border: active === f.id ? `1px solid ${ORANGE}` : "1px solid #E5E7EB", background: active === f.id ? `${ORANGE}10` : WHITE, color: active === f.id ? ORANGE : MUTED, transition:"all 0.15s" }}>
            {f.label}
            {f.id !== "all" && (
              <span style={{ marginLeft:6, background: active===f.id ? ORANGE : "#E5E7EB", color: active===f.id ? WHITE : MUTED, fontSize:10, fontWeight:700, padding:"1px 6px", borderRadius:10 }}>
                {CASES.filter(c => c.filter === f.id).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* CASES */}
      <div style={{ padding:"clamp(28px,4vw,48px) clamp(20px,4vw,48px)", maxWidth:1100, margin:"0 auto", display:"flex", flexDirection:"column", gap:24 }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign:"center", padding:"48px", color:MUTED, fontSize:14 }}>No cases in this category yet.</div>
        ) : (
          filtered.map(cs => <CaseCard key={cs.id} cs={cs} navigate={navigate} />)
        )}
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
