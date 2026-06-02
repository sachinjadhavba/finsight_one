import { useState, useEffect } from "react";

const INDIGO = "#4F46E5";
const ORANGE = "#EA580C";
const DARK   = "#111827";
const MUTED  = "#6B7280";
const WHITE  = "#fff";
const GRAY   = "#F9FAFB";
const GREEN  = "#059669";

// ── ALL STEPS ──────────────────────────────────────────────────────────────
const STEPS = {
  applicant_type: {
    q: "Are you applying as an individual or a business owner?",
    why: "This determines which income questions I ask next — and which lenders are right for you.",
    type: "single",
    options: ["Individual — salaried or self-employed", "Business Owner / MSME"],
  },
  individual_income: {
    q: "Your net monthly take-home income?",
    why: "Your eligible EMI is typically 50% of take-home. This is the key number for loan sizing.",
    type: "single",
    options: ["Below ₹30,000", "₹30K – ₹60K", "₹60K – ₹1.5 Lakh", "₹1.5L – ₹3 Lakh", "Above ₹3 Lakh"],
  },
  msme_turnover: {
    q: "Your business monthly turnover (approximate)?",
    why: "Monthly turnover is the primary income signal for MSME lenders — more important than net profit.",
    type: "single",
    options: ["Below ₹2 Lakh", "₹2L – ₹10L", "₹10L – ₹50L", "₹50L – ₹2 Crore", "Above ₹2 Crore"],
  },
  msme_income: {
    q: "Your net monthly personal income (salary or drawings)?",
    why: "Lenders check both your business turnover AND personal income for secured loans. Both matter.",
    type: "single",
    options: ["Below ₹30,000", "₹30K – ₹75K", "₹75K – ₹1.5 Lakh", "₹1.5L – ₹3 Lakh", "Above ₹3 Lakh"],
  },
  cibil: {
    q: "Your approximate CIBIL score?",
    why: "CIBIL is checked by every lender and directly affects rate and approval probability.",
    type: "single",
    options: ["750 and above", "700 – 750", "650 – 700", "Below 650", "Don't know my score"],
  },

  // BUSINESS LOAN
  business_type: {
    q: "What do you need the business loan for?",
    why: "Select all that apply — multiple needs can be structured into a single or split facility.",
    type: "multi",
    options: ["Working Capital / Overdraft", "Business Expansion", "Equipment / Machinery", "Project Finance"],
  },
  business_vintage: {
    q: "How long has your business been running?",
    why: "Business age is the most checked factor — it determines which lender categories are available.",
    type: "single",
    options: ["Less than 1 year", "1–2 years", "2–3 years", "3–5 years", "More than 5 years"],
  },
  business_gst: {
    q: "Is your business GST registered?",
    why: "GST returns are primary income proof for most lenders. Registered businesses get better rates.",
    type: "single",
    options: ["Yes — GST registered", "No — below threshold", "Applied but not yet registered"],
  },
  business_amount: {
    q: "How much are you looking to borrow?",
    why: "This tells me whether banks or NBFCs are the better fit.",
    type: "single",
    options: ["Up to ₹25 Lakh", "₹25L – ₹1 Crore", "₹1 Cr – ₹5 Crore", "Above ₹5 Crore"],
  },

  // LAP
  lap_purpose: {
    q: "What will you use the LAP funds for?",
    why: "Select all that apply — multiple purposes change the product structure.",
    type: "multi",
    options: ["Business working capital", "Debt consolidation", "Personal requirement", "Business expansion", "Other"],
  },
  lap_property: {
    q: "What type of property are you mortgaging?",
    why: "Property type determines which lenders will consider your case. Select all that apply if you have multiple properties.",
    type: "multi",
    options: [
      "Residential — Society / Apartment",
      "Residential — Independent House",
      "Residential — Gram Panchayat",
      "Commercial Property",
      "Industrial / Factory",
    ],
  },
  lap_value: {
    q: "Approximate combined market value of the property / properties?",
    why: "Banks lend 60–75% of property value. This is your maximum eligible amount ceiling.",
    type: "single",
    options: ["Below ₹50 Lakh", "₹50L – ₹1 Crore", "₹1 Cr – ₹2 Crore", "₹2 Cr – ₹5 Crore", "Above ₹5 Crore"],
  },
  lap_existing: {
    q: "Is there an existing loan on any of these properties?",
    why: "Existing loan reduces available equity and changes the lender options.",
    type: "single",
    options: ["No existing loan — all clear", "Yes — want to transfer + top up", "Yes — only top up needed"],
  },
  lap_amount: {
    q: "How much LAP are you looking for?",
    why: null,
    type: "single",
    options: ["Up to ₹25 Lakh", "₹25L – ₹75L", "₹75L – ₹2 Crore", "₹2 Cr – ₹5 Crore", "Above ₹5 Crore"],
  },

  // HOME LOAN
  hl_employment: {
    q: "Your employment type?",
    why: "This is the first filter — it changes income documentation and lender shortlist completely.",
    type: "single",
    options: ["Salaried — Private Company", "Salaried — Government / PSU", "Self-Employed / Business Owner", "Professional (Doctor / CA / Lawyer)"],
  },
  hl_existing_emi: {
    q: "Total existing EMIs you pay every month?",
    why: "This directly impacts your FOIR — the ratio lenders use to check if you can take on more EMI.",
    type: "single",
    options: ["No existing EMIs", "Below ₹10,000", "₹10K – ₹30K", "₹30K – ₹60K", "Above ₹60K"],
  },
  hl_amount: {
    q: "Home loan amount you are looking for?",
    why: null,
    type: "single",
    options: ["Below ₹30 Lakh", "₹30L – ₹60L", "₹60L – ₹1 Crore", "₹1 Cr – ₹2 Crore", "Above ₹2 Crore"],
  },

  // PERSONAL LOAN
  pl_existing_emi: {
    q: "Total existing EMIs every month?",
    why: "Personal loan eligibility drops if existing EMIs are high. FOIR check is critical.",
    type: "single",
    options: ["No existing EMIs", "Below ₹10,000", "₹10K – ₹25K", "₹25K – ₹50K", "Above ₹50K"],
  },
  pl_amount: {
    q: "Personal loan amount needed?",
    why: null,
    type: "single",
    options: ["Up to ₹3 Lakh", "₹3L – ₹7L", "₹7L – ₹15L", "₹15L – ₹30L", "Above ₹30 Lakh"],
  },

  // UNSECURED BUSINESS
  ub_vintage: {
    q: "How long has your business been running?",
    why: "Fintech NBFCs accept 1+ year. Banks need 2-3 years minimum.",
    type: "single",
    options: ["Less than 1 year", "1–2 years", "2–3 years", "More than 3 years"],
  },
  ub_gst: {
    q: "Is your business GST registered?",
    why: "Most fintech lenders calculate eligible amount as 20-30% of annual GST turnover.",
    type: "single",
    options: ["Yes — GST registered", "No — below threshold", "Applied but not registered yet"],
  },
  ub_amount: {
    q: "How much unsecured business loan do you need?",
    why: null,
    type: "single",
    options: ["Up to ₹15 Lakh", "₹15L – ₹35L", "₹35L – ₹75L", "₹75L – ₹2 Crore", "Above ₹2 Crore"],
  },

  // REJECTION
  rejected_product: {
    q: "Which type of loan was rejected?",
    why: "Different rejection reasons apply to different products.",
    type: "single",
    options: ["Home Loan", "Business Loan / Working Capital", "Personal Loan", "LAP", "Other"],
  },
  rejected_reason: {
    q: "What reason did the lender give?",
    why: "Select all that apply — multiple rejection reasons need different fixes.",
    type: "multi",
    options: ["Low CIBIL score", "Insufficient income / FOIR too high", "Business too new", "Property issue", "Documents incomplete", "No reason given"],
  },
  rejected_count: {
    q: "How many lenders have rejected you?",
    why: "Multiple rejections damage CIBIL further via hard enquiries. Critical to know before recommending next steps.",
    type: "single",
    options: ["Only 1 lender", "2 lenders", "3 or more lenders"],
  },
};

// ── DYNAMIC SEQUENCE BUILDER ───────────────────────────────────────────────
function buildSequence(loanType, answers) {
  const isMSME = answers.applicant_type === "Business Owner / MSME";
  const isSelfEmp = answers.hl_employment?.includes("Self-Employed") || answers.hl_employment?.includes("Professional");
  const incomeSteps = isMSME ? ["msme_turnover", "msme_income"] : ["individual_income"];

  switch (loanType) {
    case "business":
      return ["business_type", "business_vintage", "msme_turnover", "msme_income", "business_gst", "business_amount", "cibil"];

    case "property":
      return [
        "lap_purpose",
        "applicant_type",     // ← shows immediately after purpose
        ...incomeSteps,       // ← routes to right income question(s) based on answer above
        "lap_property",       // ← multi-select
        "lap_value",
        "lap_existing",
        "lap_amount",
        "cibil",
      ];

    case "home":
      return [
        "hl_employment",
        ...(isSelfEmp ? ["msme_turnover", "msme_income"] : ["individual_income"]),
        "hl_existing_emi",
        "hl_amount",
        "cibil",
      ];

    case "personal":
      return [
        "applicant_type",
        ...incomeSteps,
        "pl_existing_emi",
        "pl_amount",
        "cibil",
      ];

    case "unsecured":
      return ["ub_vintage", "msme_turnover", "msme_income", "ub_gst", "ub_amount", "cibil"];

    case "rejected":
      return ["rejected_product", "rejected_reason", "rejected_count", "cibil"];

    default: return [];
  }
}

// ── INSIGHTS ───────────────────────────────────────────────────────────────
const INSIGHTS = {
  applicant_type: {
    "Business Owner / MSME": { msg: "MSME profile — I will capture both your business turnover and personal income separately. Both matter for lender assessment.", color: INDIGO },
    "Individual — salaried or self-employed": { msg: "Individual profile — your net monthly take-home is the key number I need next.", color: INDIGO },
  },
  business_vintage: {
    "Less than 1 year": { msg: "Very new — fintech lenders like Lendingkart and FlexiLoans work with early-stage businesses. We will find the path.", color: "#D97706" },
    "1–2 years":        { msg: "1-2 year vintage opens several NBFC options. Workable with right structuring.", color: "#D97706" },
    "3–5 years":        { msg: "Good vintage — most private banks and NBFCs will consider you.", color: GREEN },
    "More than 5 years":{ msg: "Excellent — 5+ years gives you access to the full lender panel.", color: GREEN },
  },
  lap_property: {
    "Residential — Gram Panchayat": { msg: "GP property needs specialist lenders — most private banks won't touch it. But we have lenders who specifically work with GP properties.", color: "#D97706" },
    "Industrial / Factory":          { msg: "Industrial property typically gets 50-55% LTV. Specialist lenders apply. Good that you have multiple properties — we may use the best one.", color: "#D97706" },
    "Residential — Society / Apartment": { msg: "Residential apartment — best LTV available. Strong asset for most lenders.", color: GREEN },
  },
  cibil: {
    "750 and above":       { msg: "Excellent CIBIL — best rates from all lenders.", color: GREEN },
    "700 – 750":           { msg: "Good score. Most lenders will consider you at competitive rates.", color: GREEN },
    "650 – 700":           { msg: "Borderline — lender selection is critical here. We know exactly who to approach.", color: "#D97706" },
    "Below 650":           { msg: "Low CIBIL — but NBFCs have higher appetite. We can also build an improvement plan alongside.", color: "#D97706" },
    "Don't know my score": { msg: "No problem — our assessment will include a CIBIL check recommendation.", color: INDIGO },
  },
  rejected_count: {
    "3 or more lenders": { msg: "STOP applying now. Each rejection is a hard enquiry that damages CIBIL further. Diagnose first — then approach the right lender.", color: "#DC2626" },
    "2 lenders":         { msg: "Two rejections indicate a specific issue. Let us identify and fix it before approaching a third.", color: "#D97706" },
    "Only 1 lender":     { msg: "One rejection is common — different lenders have completely different appetite.", color: GREEN },
  },
};

const LOAN_CARDS = [
  { id: "business",  label: "Business Loan",           icon: "🏭", sub: "Working capital, term loan, machinery" },
  { id: "property",  label: "Loan Against Property",   icon: "🏠", sub: "Mortgage your property for funds" },
  { id: "home",      label: "Home Loan",               icon: "🔑", sub: "Buy or construct your home" },
  { id: "personal",  label: "Personal Loan",           icon: "👤", sub: "Quick funds for any purpose" },
  { id: "unsecured", label: "Unsecured Business Loan", icon: "⚡", sub: "Fast business loan, no collateral" },
  { id: "rejected",  label: "Loan was Rejected",       icon: "🔄", sub: "Help to get approved this time" },
];

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────
export default function Check({ navigate }) {
  const [phase, setPhase]         = useState("start");
  const [loanType, setLoanType]   = useState(null);
  const [stepIdx, setStepIdx]     = useState(0);
  const [answers, setAnswers]     = useState({});
  const [multiSel, setMultiSel]   = useState([]);
  const [insight, setInsight]     = useState(null);
  const [contact, setContact]     = useState({ name: "", mobile: "" });
  const [errors, setErrors]       = useState({});

  const sequence    = loanType ? buildSequence(loanType, answers) : [];
  const currentKey  = sequence[stepIdx];
  const currentStep = currentKey ? STEPS[currentKey] : null;
  const isMulti     = currentStep?.type === "multi";
  const totalQ      = sequence.length;
  const progress    = totalQ > 0 ? Math.round((stepIdx / totalQ) * 100) : 0;

  // Reset multi-select when step changes
  useEffect(() => {
    setMultiSel(answers[currentKey] ? (Array.isArray(answers[currentKey]) ? answers[currentKey] : [answers[currentKey]]) : []);
  }, [currentKey]);

  // Move to contact when all questions answered
  useEffect(() => {
    if (phase === "flow" && loanType && sequence.length > 0 && stepIdx >= sequence.length) {
      setPhase("contact");
    }
  }, [stepIdx, sequence.length, phase, loanType]);

  const handleLoanType = (type) => {
    setLoanType(type);
    setPhase("flow");
    setStepIdx(0);
    setAnswers({});
    setInsight(null);
    setMultiSel([]);
  };

  const advance = (newAnswers, val) => {
    // Show insight for first selected value if available
    const flash = INSIGHTS[currentKey]?.[Array.isArray(val) ? val[0] : val];
    if (flash) setInsight(flash); else setInsight(null);

    const delay = flash ? 1800 : 350;
    setTimeout(() => {
      setInsight(null);
      const newSeq = buildSequence(loanType, newAnswers);
      if (stepIdx + 1 >= newSeq.length) setPhase("contact");
      else setStepIdx(stepIdx + 1);
    }, delay);
  };

  // Single select answer
  const handleSingle = (val) => {
    const newAnswers = { ...answers, [currentKey]: val };
    setAnswers(newAnswers);
    advance(newAnswers, val);
  };

  // Multi select toggle
  const toggleMulti = (val) => {
    setMultiSel(prev =>
      prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]
    );
  };

  // Multi select continue
  const confirmMulti = () => {
    if (multiSel.length === 0) return;
    const val = multiSel.length === 1 ? multiSel[0] : multiSel;
    const newAnswers = { ...answers, [currentKey]: val };
    setAnswers(newAnswers);
    advance(newAnswers, multiSel[0]);
  };

  const handleSubmit = () => {
    const errs = {};
    if (!contact.name.trim()) errs.name = "Please enter your name";
    if (contact.mobile.replace(/\D/g, "").length !== 10) errs.mobile = "Please enter a valid 10-digit mobile number";
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    fetch(import.meta.env.VITE_N8N_WEBHOOK_URL || "https://n8n-production-ccb2.up.railway.app/webhook/eligibility-form", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: contact.name, mobile: contact.mobile, loan_type: loanType, answers, source: "website_check", timestamp: new Date().toISOString() }),
    }).catch(() => {});
    setPhase("result");
  };

  // ── START ────────────────────────────────────────────────────────────────
  if (phase === "start") return (
    <div style={{ fontFamily: "Arial,sans-serif", minHeight: "100vh", background: GRAY }}>
      <style>{`
        @media(max-width:480px){
          #check-start-grid { grid-template-columns: 1fr !important; }
          #check-start-grid > div { padding: 16px 14px !important; }
        }
        @media(max-width:768px){
          .check-opt-btn { padding: 12px 14px !important; font-size: 14px !important; min-height: 48px !important; }
          #check-flow-card { padding: 20px 16px !important; }
          #check-flow-card h2 { font-size: 16px !important; }
          .check-multi-btn { padding: 12px 14px !important; font-size: 14px !important; min-height: 48px !important; }
        }
      `}</style>
      <div style={{ maxWidth: 740, margin: "0 auto", padding: "clamp(32px,5vw,52px) 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#EEF2FF", border: "1px solid #C7D2FE", color: INDIGO, fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 20, marginBottom: 14 }}>
            <span style={{ width: 6, height: 6, background: ORANGE, borderRadius: "50%", display: "inline-block" }} />
            Free · 2 Minutes · No Documents Needed
          </div>
          <h1 style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 900, color: DARK, marginBottom: 10, lineHeight: 1.25 }}>
            Tell us what you need.<br /><span style={{ color: INDIGO }}>We find you the best path.</span>
          </h1>
          <p style={{ fontSize: 14, color: MUTED, maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            Answer a few questions. Our expert team reviews your profile and sends a personalised eligibility assessment to your WhatsApp — free, within 2 hours.
          </p>
        </div>
        <div id="check-start-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12 }}>
          {LOAN_CARDS.map(c => (
            <div key={c.id} onClick={() => handleLoanType(c.id)}
              style={{ background: WHITE, border: "2px solid #E5E7EB", borderRadius: 12, padding: "20px 16px", cursor: "pointer", transition: "all 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = INDIGO; e.currentTarget.style.background = "#EEF2FF"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.background = WHITE; }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: DARK, marginBottom: 4 }}>{c.label}</div>
              <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.4 }}>{c.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── FLOW ─────────────────────────────────────────────────────────────────
  if (phase === "flow" && currentStep) return (
    <div style={{ fontFamily: "Arial,sans-serif", minHeight: "100vh", background: GRAY }}>
      <style>{`
        @media(max-width:768px){
          .check-opt-btn { padding: 12px 14px !important; font-size: 14px !important; min-height: 48px !important; }
          .check-multi-btn { padding: 12px 14px !important; font-size: 14px !important; min-height: 48px !important; }
        }
      `}</style>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "clamp(24px,4vw,44px) 20px" }}>

        {/* Progress */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ fontSize: 12, color: MUTED }}>Building your profile...</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: INDIGO }}>{progress}%</span>
          </div>
          <div style={{ height: 4, background: "#E5E7EB", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg,${INDIGO},${ORANGE})`, borderRadius: 2, transition: "width 0.4s" }} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8 }}>
            {Object.entries(answers).map(([k, v]) => (
              <span key={k} style={{ background: "#EEF2FF", color: INDIGO, fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 20, border: "1px solid #C7D2FE" }}>
                {Array.isArray(v) ? v.join(", ") : v}
              </span>
            ))}
          </div>
        </div>

        {/* Insight flash */}
        {insight && (
          <div style={{ background: insight.color + "18", border: `1px solid ${insight.color}50`, borderRadius: 10, padding: "10px 14px", marginBottom: 14, display: "flex", gap: 10 }}>
            <span>💡</span>
            <div style={{ fontSize: 13, color: DARK, lineHeight: 1.6 }}>{insight.msg}</div>
          </div>
        )}

        {/* Question */}
        <div style={{ background: WHITE, borderRadius: 14, padding: "24px 20px", border: "1px solid #E5E7EB", boxShadow: "0 4px 16px rgba(79,70,229,0.06)" }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: DARK, marginBottom: 6, lineHeight: 1.3 }}>
            {currentStep.q}
          </div>
          {isMulti && (
            <div style={{ fontSize: 11, color: ORANGE, fontWeight: 700, marginBottom: 6 }}>
              SELECT ALL THAT APPLY
            </div>
          )}
          {currentStep.why && (
            <div style={{ fontSize: 12, color: MUTED, marginBottom: 16, lineHeight: 1.5, fontStyle: "italic", borderLeft: `3px solid ${ORANGE}`, paddingLeft: 10 }}>
              {currentStep.why}
            </div>
          )}

          {/* Single select options */}
          {!isMulti && (
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {currentStep.options.map(opt => (
                <button key={opt} onClick={() => handleSingle(opt)} className="check-opt-btn" style={{
                  background: answers[currentKey] === opt ? INDIGO : WHITE,
                  color: answers[currentKey] === opt ? WHITE : DARK,
                  border: `1.5px solid ${answers[currentKey] === opt ? INDIGO : "#E5E7EB"}`,
                  borderRadius: 8, padding: "10px 14px", textAlign: "left",
                  fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", transition: "all 0.1s",
                }}
                  onMouseEnter={e => { if (answers[currentKey] !== opt) { e.currentTarget.style.borderColor = INDIGO; e.currentTarget.style.background = "#EEF2FF"; e.currentTarget.style.color = INDIGO; }}}
                  onMouseLeave={e => { if (answers[currentKey] !== opt) { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.background = WHITE; e.currentTarget.style.color = DARK; }}}>
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* Multi select options */}
          {isMulti && (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 14 }}>
                {currentStep.options.map(opt => {
                  const selected = multiSel.includes(opt);
                  return (
                    <button key={opt} onClick={() => toggleMulti(opt)} className="check-multi-btn" style={{
                      background: selected ? "#EEF2FF" : WHITE,
                      color: selected ? INDIGO : DARK,
                      border: `1.5px solid ${selected ? INDIGO : "#E5E7EB"}`,
                      borderRadius: 8, padding: "10px 14px", textAlign: "left",
                      fontSize: 13, fontWeight: selected ? 700 : 500,
                      cursor: "pointer", fontFamily: "inherit",
                      display: "flex", alignItems: "center", gap: 10,
                    }}>
                      <span style={{
                        width: 18, height: 18, borderRadius: 4,
                        border: `2px solid ${selected ? INDIGO : "#D1D5DB"}`,
                        background: selected ? INDIGO : WHITE,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        {selected && <span style={{ color: WHITE, fontSize: 11, fontWeight: 900 }}>✓</span>}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
              <button onClick={confirmMulti} disabled={multiSel.length === 0} style={{
                width: "100%", background: multiSel.length > 0 ? INDIGO : "#E5E7EB",
                color: multiSel.length > 0 ? WHITE : "#9CA3AF",
                fontSize: 14, fontWeight: 700, padding: "11px 0",
                borderRadius: 8, border: "none", cursor: multiSel.length > 0 ? "pointer" : "not-allowed",
                fontFamily: "inherit",
              }}>
                {multiSel.length === 0 ? "Select at least one →" : `Continue with ${multiSel.length} selected →`}
              </button>
            </>
          )}
        </div>
        <div style={{ textAlign: "center", fontSize: 11, color: "#9CA3AF", marginTop: 10 }}>
          Question {stepIdx + 1} of {totalQ}
        </div>
      </div>
    </div>
  );

  // ── CONTACT ──────────────────────────────────────────────────────────────
  if (phase === "contact") return (
    <div style={{ fontFamily: "Arial,sans-serif", minHeight: "100vh", background: GRAY }}>
      <div style={{ maxWidth: 540, margin: "0 auto", padding: "clamp(24px,4vw,44px) 20px" }}>

        <div style={{ background: WHITE, borderRadius: 14, padding: 20, border: "1px solid #E5E7EB", marginBottom: 16, boxShadow: "0 4px 16px rgba(79,70,229,0.06)" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: INDIGO, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Your Profile Summary</div>
          {Object.entries(answers).map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "5px 0", borderBottom: "1px solid #F3F4F6", gap: 12 }}>
              <span style={{ fontSize: 11, color: MUTED, flexShrink: 0, maxWidth: "45%" }}>{STEPS[k]?.q?.replace("?","") || k}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: DARK, textAlign: "right" }}>{Array.isArray(v) ? v.join(", ") : v}</span>
            </div>
          ))}
        </div>

        <div style={{ background: DARK, borderRadius: 14, padding: "24px 20px" }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: WHITE, marginBottom: 6 }}>Almost done — where do we send your assessment?</div>
          <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 20, lineHeight: 1.6 }}>
            Our expert team reviews your profile and sends a personalised eligibility analysis to your WhatsApp — free, within 2 hours.
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", marginBottom: 5, textTransform: "uppercase", letterSpacing: 1 }}>Your Name</div>
            <input type="text" placeholder="Ramesh Sharma" value={contact.name}
              onChange={e => { setContact(c => ({ ...c, name: e.target.value })); setErrors(e2 => ({ ...e2, name: null })); }}
              style={{ width: "100%", background: "#1F2937", border: `1px solid ${errors.name ? "#EF4444" : "#374151"}`, borderRadius: 8, padding: "11px 14px", fontSize: 14, color: WHITE, boxSizing: "border-box", fontFamily: "inherit", outline: "none" }}
            />
            {errors.name && <div style={{ fontSize: 11, color: "#EF4444", marginTop: 4 }}>{errors.name}</div>}
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", marginBottom: 5, textTransform: "uppercase", letterSpacing: 1 }}>WhatsApp Number</div>
            <input type="tel" placeholder="98xxxxxxxx" maxLength={10} value={contact.mobile}
              onChange={e => { setContact(c => ({ ...c, mobile: e.target.value })); setErrors(e2 => ({ ...e2, mobile: null })); }}
              style={{ width: "100%", background: "#1F2937", border: `1px solid ${errors.mobile ? "#EF4444" : "#374151"}`, borderRadius: 8, padding: "11px 14px", fontSize: 14, color: WHITE, boxSizing: "border-box", fontFamily: "inherit", outline: "none" }}
            />
            {errors.mobile && <div style={{ fontSize: 11, color: "#EF4444", marginTop: 4 }}>{errors.mobile}</div>}
          </div>

          <button onClick={handleSubmit} style={{ width: "100%", background: ORANGE, color: WHITE, fontSize: 15, fontWeight: 700, padding: 14, borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
            Get My Free Assessment on WhatsApp →
          </button>
          <div style={{ textAlign: "center", fontSize: 11, color: "#4B5563", marginTop: 10 }}>🔒 100% private · Never shared · No spam</div>
        </div>
      </div>
    </div>
  );

  // ── RESULT ───────────────────────────────────────────────────────────────
  if (phase === "result") return (
    <div style={{ fontFamily: "Arial,sans-serif", minHeight: "100vh", background: GRAY }}>
      <div style={{ maxWidth: 540, margin: "0 auto", padding: "clamp(32px,5vw,52px) 20px", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 14 }}>✅</div>
        <h2 style={{ fontSize: "clamp(18px,3vw,24px)", fontWeight: 900, color: DARK, marginBottom: 10, lineHeight: 1.2 }}>
          Profile received.<br />Expert review underway.
        </h2>
        <p style={{ fontSize: 14, color: MUTED, maxWidth: 420, margin: "0 auto 24px", lineHeight: 1.7 }}>
          Our banking expert is reviewing your profile right now. You will receive a detailed personalised assessment on WhatsApp <strong style={{ color: DARK }}>+91 {contact.mobile}</strong> within 2 hours.
        </p>
        <div style={{ background: WHITE, borderRadius: 14, padding: 20, border: "1px solid #E5E7EB", textAlign: "left", marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: INDIGO, marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>What happens next</div>
          {[
            ["🔍","Expert review","Our banker analyses your profile against 80+ lenders."],
            ["📊","Lender matching","We identify the best fit for your exact profile."],
            ["📱","WhatsApp delivery","Eligible amount, lender match, next steps — on WhatsApp."],
            ["📞","Your call","If you want to proceed, we take it forward at zero cost."],
          ].map(([icon,title,desc]) => (
            <div key={title} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: DARK }}>{tit