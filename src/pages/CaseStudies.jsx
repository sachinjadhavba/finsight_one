import Footer from "../components/Footer";

const CASES = [
  {
    id: "cs01",
    tag: "SUGAR & AGRO · MAHARASHTRA",
    color: "#166534",
    bgColor: "#064E3B",
    icon: "🏭",
    title: "₹60 Crore Sugar Mill Consortium Loan",
    subtitle: "Two rejections. 12 risk flags. Sanctioned in 38 days.",
    stats: [
      { val: "₹60 Cr",   label: "Loan Sanctioned" },
      { val: "38 Days",  label: "Time to Sanction" },
      { val: "12",       label: "Risk Flags Fixed" },
      { val: "4.17x",    label: "ICR by FY30" },
    ],
    problem: "A Maharashtra sugar co-operative had applied twice to a consortium of 3 banks and been rejected both times. The bank cited weak CMA projections, missing ICR calculations, wrong DPR format (non-compliant with RBI 2025 Project Finance Directions), and no PPA (Power Purchase Agreement) revenue integration.",
    solution: "FinsightOne rebuilt the complete CAM + CMA + DPR from scratch. We restructured projections to integrate seasonal crushing income and PPA revenue, demonstrating ICR of 4.17x by FY30. All 12 risk flags cited by the credit committee were addressed directly in the file narrative. Resubmitted to the lead bank in the same consortium.",
  },
  {
    id: "cs02",
    tag: "DAIRY & AGRI · RAJASTHAN",
    color: "#1D4ED8",
    bgColor: "#1E3A8A",
    icon: "🐄",
    title: "₹14.5 Crore Dairy Farm Term Loan",
    subtitle: "2 bank rejections reversed. NABARD DEDS subsidy unlocked.",
    stats: [
      { val: "₹14.5 Cr", label: "Loan Sanctioned" },
      { val: "2",         label: "Rejections Reversed" },
      { val: "₹2.1 Cr",  label: "NABARD Subsidy" },
      { val: "5 Weeks",  label: "To Sanction" },
    ],
    problem: "A family-owned dairy farm in Jaipur had been rejected by two different banks. The primary issues: promoter's individual CIBIL had a 3-year-old settled account showing as Written Off, the project lacked a proper techno-economic viability report, and the NABARD DEDS subsidy eligibility had not been established in the file.",
    solution: "We obtained CIBIL dispute resolution, prepared a NOC letter from the original lender, and incorporated it into the banker presentation. Commissioned an independent TEV study. Established and documented NABARD DEDS eligibility (₹2.1 Cr subsidy), which reduced the effective bank exposure and improved the DSCR from 0.98x to 1.42x. Submitted to a PSU bank with a track record in agri-lending.",
  },
  {
    id: "cs03",
    tag: "LOGISTICS & TRANSPORT · DELHI NCR",
    color: "#7C3AED",
    bgColor: "#4C1D95",
    icon: "🚛",
    title: "₹22 Crore Fleet Expansion — WC + Term Loan",
    subtitle: "Wrong NIC code caused rejection. Corrected and sanctioned by same bank.",
    stats: [
      { val: "₹22 Cr",  label: "Loan Sanctioned" },
      { val: "1",        label: "Rejection Reversed" },
      { val: "Same Bank",label: "Resubmitted To" },
      { val: "4 Weeks",  label: "Sanction Timeline" },
    ],
    problem: "A Delhi NCR logistics company with a fleet of 38 commercial vehicles was rejected by their existing lender for a ₹22 Cr fleet expansion loan. The bank cited incorrect NIC code classification, which meant their turnover was being assessed under a lower credit ceiling than applicable.",
    solution: "FinsightOne identified the NIC code mismatch, filed the correction with Udyam registration, and rebuilt the CAM with the correct industry classification. Re-approached the same bank with corrected documents, demonstrating eligibility under the commercial transport lending framework. Sanctioned within 4 weeks of resubmission.",
  },
  {
    id: "cs04",
    tag: "INDIVIDUAL · HOME LOAN · PUNE",
    color: "#0369A1",
    bgColor: "#0C4A6E",
    icon: "🏠",
    title: "₹68 Lakh Home Loan — Self-Employed Professional",
    subtitle: "FOIR exceeded. Co-applicant added. Approved by HDFC at best rate.",
    stats: [
      { val: "₹68 L",    label: "Loan Sanctioned" },
      { val: "HDFC",     label: "Lender" },
      { val: "8.65%",    label: "Interest Rate" },
      { val: "18 Days",  label: "Time to Sanction" },
    ],
    problem: "A Pune-based chartered accountant with 12 years of practice and own office property applied for a ₹68L home loan to purchase a 3BHK in Baner. ICICI Bank rejected the application citing FOIR of 64% — exceeding their 50% cap — due to two active business loans and one credit card EMI. The applicant had a CIBIL of 768 and stable income.",
    solution: "FinSight One analysed the co-applicant option — spouse, salaried software professional with ₹1.2L net monthly income and zero existing EMIs. Adding spouse as co-applicant reduced effective FOIR to 38%. Identified HDFC as the best lender for CA professionals with business income ITR. Prepared income assessment using 3-year ITR averaging with appropriate add-backs. Submitted to HDFC with complete documentation. Sanctioned in 18 working days at 8.65% — 35 bps better than the original ICICI offer.",
  },
  {
    id: "cs05",
    tag: "INDIVIDUAL · LAP · MUMBAI",
    color: "#B45309",
    bgColor: "#78350F",
    icon: "🏢",
    title: "₹1.4 Crore LAP Against Commercial Office — Mumbai",
    subtitle: "Title chain gap resolved. LTV maximised. Bajaj Finserv approved.",
    stats: [
      { val: "₹1.4 Cr",  label: "Loan Sanctioned" },
      { val: "Bajaj",    label: "Lender" },
      { val: "62%",      label: "LTV Achieved" },
      { val: "3 Weeks",  label: "Post-Fix Sanction" },
    ],
    problem: "A Mumbai-based MSME owner (textile trading, ₹4.2 Cr annual turnover) applied for LAP against a commercial office unit in Andheri East. Two banks declined — HDFC cited a title chain gap (missing sale deed for one transfer in 2009) and Kotak cited the property age (32 years — above their 30-year limit). The borrower needed ₹1.2 Cr minimum to fund working capital and equipment purchase.",
    solution: "FinSight One appointed a property title specialist to trace the 2009 transfer gap. Obtained a certified copy of the missing sale deed from the Sub-Registrar office and got a title advocate's clean opinion. Identified Bajaj Finserv as the right lender — they accept commercial property up to 35 years with clear title. Re-valued the property with a Bajaj-empanelled valuer — valuation came at ₹2.26 Cr. Achieved 62% LTV = ₹1.4 Cr sanctioned. Loan disbursed in 3 weeks after title resolution.",
  },
];

function CaseCard({ cs, navigate }) {
  return (
    <div style={{ border: "1px solid #E5E7EB", borderRadius: 14, overflow: "hidden", marginBottom: 24, background: "#fff" }}>
      {/* Header */}
      <div style={{ background: cs.bgColor, padding: "20px 28px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: cs.color === "#166534" ? "#6EE7B7" : "#93C5FD", textTransform: "uppercase", marginBottom: 8 }}>{cs.tag}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>{cs.icon}</span>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>{cs.title}</div>
        </div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", fontStyle: "italic", marginBottom: 16 }}>{cs.subtitle}</div>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          {cs.stats.map(s => (
            <div key={s.label}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>{s.val}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Body */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
        <div style={{ padding: "20px 28px", borderRight: "1px solid #F3F4F6" }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.5, color: "#DC2626", textTransform: "uppercase", marginBottom: 8 }}>The Problem</div>
          <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.7 }}>{cs.problem}</div>
        </div>
        <div style={{ padding: "20px 28px" }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.5, color: "#059669", textTransform: "uppercase", marginBottom: 8 }}>Our Solution</div>
          <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.7 }}>{cs.solution}</div>
        </div>
      </div>
      {/* Footer */}
      <div style={{ padding: "14px 28px", borderTop: "1px solid #F3F4F6", display: "flex", gap: 12 }}>
        <button onClick={() => navigate("check")} style={{ background: "#0D1428", color: "#fff", fontSize: 12, fontWeight: 700, padding: "8px 18px", borderRadius: 6, border: "none", cursor: "pointer" }}>
          Check My Eligibility →
        </button>
        <button onClick={() => navigate("advisory")} style={{ background: "transparent", color: "#374151", fontSize: 12, fontWeight: 600, padding: "8px 18px", borderRadius: 6, border: "1px solid #E5E7EB", cursor: "pointer" }}>
          Talk to an Expert
        </button>
      </div>
    </div>
  );
}

export default function CaseStudies({ navigate }) {
  return (
    <div>
      {/* HERO */}
      <div style={{ background: "#0D1428", padding: "64px 48px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(232,160,32,0.15)", border: "1px solid rgba(232,160,32,0.3)", color: "#E8A020", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "5px 16px", borderRadius: 100, marginBottom: 20 }}>
          Real Outcomes · All Details Anonymised
        </div>
        <h1 style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: 14 }}>
          Case Studies
        </h1>
        <p style={{ fontSize: 16, color: "#94A3B8", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
          Every case below is real. Client names and specific bank details are anonymised. Loan amounts, timelines, and outcomes are actual results.
        </p>
      </div>

      {/* STATS */}
      <div style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB", padding: "20px 48px", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 16 }}>
        {[["5+","Case Studies Published"],["₹200Cr+","Total Loans Facilitated"],["85%","First-Attempt Approval Rate"],["38 Days","Fastest Consortium Sanction"]].map(([v,l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#0D1428" }}>{v}</div>
            <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* CASES */}
      <div style={{ padding: "48px 48px", maxWidth: 1100, margin: "0 auto" }}>
        {CASES.map(cs => <CaseCard key={cs.id} cs={cs} navigate={navigate} />)}
      </div>

      {/* CTA */}
      <div style={{ background: "#0D1428", padding: "64px 48px", textAlign: "center" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 12 }}>
          Is Your Situation Similar?
        </h2>
        <p style={{ fontSize: 15, color: "#94A3B8", marginBottom: 28 }}>
          Check your eligibility free — 2 minutes, no documents needed.
        </p>
        <button onClick={() => navigate("check")} style={{ background: "#E8A020", color: "#fff", fontSize: 15, fontWeight: 700, padding: "14px 36px", borderRadius: 8, border: "none", cursor: "pointer" }}>
          Check My Eligibility — Free →
        </button>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}
