import { useState } from "react";
import Footer from "../components/Footer";

const INDIGO = "#4F46E5";
const ORANGE = "#EA580C";
const DARK   = "#111827";
const MUTED  = "#6B7280";
const WHITE  = "#fff";
const GRAY   = "#F9FAFB";

// ── CONVERSATION FLOW ──────────────────────────────────────────────────────
// Each step has: question, why, options or input type, next logic
const FLOWS = {
  start: {
    q: "What kind of loan are you looking for?",
    why: null,
    type: "cards",
    options: [
      { id: "business", label: "Business Loan", icon: "🏭", sub: "Working capital, term loan, machinery" },
      { id: "property", label: "Loan Against Property", icon: "🏠", sub: "Mortgage your property for funds" },
      { id: "home",     label: "Home Loan",             icon: "🔑", sub: "Buy or construct your home" },
      { id: "personal", label: "Personal Loan",          icon: "👤", sub: "Quick funds for any purpose" },
      { id: "unsecured",label: "Unsecured Business Loan",icon: "⚡", sub: "Fast business loan, no collateral" },
      { id: "rejected", label: "Loan was Rejected",      icon: "🔄", sub: "Help to get approved this time" },
    ],
  },
};

const STEPS = {
  // ── BUSINESS LOAN FLOW ──
  business_type: {
    q: "What do you need the loan for?",
    why: "This determines which lenders and products fit best — and your eligible amount.",
    type: "options",
    options: ["Working Capital / Overdraft", "Business Expansion", "Equipment / Machinery", "Project Finance"],
  },
  business_vintage: {
    q: "How long has your business been running?",
    why: "Business age is the single most checked factor by lenders.",
    type: "options",
    options: ["Less than 1 year", "1–2 years", "2–3 years", "3–5 years", "More than 5 years"],
  },
  business_turnover: {
    q: "What was your business turnover last financial year?",
    why: "Your working capital limit is typically 20–25% of annual turnover. This is the starting point.",
    type: "options",
    options: ["Below ₹25 Lakh", "₹25L – ₹1 Crore", "₹1 Cr – ₹5 Crore", "₹5 Cr – ₹25 Crore", "Above ₹25 Crore"],
  },
  business_gst: {
    q: "Is your business GST registered?",
    why: "GST returns are the primary income proof for most lenders. Registered businesses get better rates and higher limits.",
    type: "options",
    options: ["Yes — GST registered", "No — below threshold", "Applied but not yet registered"],
  },
  business_amount: {
    q: "How much are you looking to borrow?",
    why: "This helps me match the right lenders — amount determines whether banks or NBFCs are the better fit.",
    type: "options",
    options: ["Up to ₹25 Lakh", "₹25L – ₹1 Crore", "₹1 Cr – ₹5 Crore", "Above ₹5 Crore"],
  },
  // ── LAP FLOW ──
  lap_purpose: {
    q: "What will you use the LAP funds for?",
    why: "Purpose determines product structure — business use is assessed differently from personal debt consolidation.",
    type: "options",
    options: ["Business working capital", "Debt consolidation", "Personal requirement", "Business expansion", "Other"],
  },
  lap_property: {
    q: "What type of property are you mortgaging?",
    why: "Property type is the most critical factor — it determines which lenders will consider your case at all.",
    type: "options",
    options: ["Residential — Society / Apartment", "Residential — Independent House", "Residential — Gram Panchayat", "Commercial Property", "Industrial / Factory"],
  },
  lap_value: {
    q: "Approximate market value of the property?",
    why: "Banks lend 60–75% of property value. This tells me your maximum eligible amount before income assessment.",
    type: "options",
    options: ["Below ₹50 Lakh", "₹50L – ₹1 Crore", "₹1 Cr – ₹2 Crore", "₹2 Cr – ₹5 Crore", "Above ₹5 Crore"],
  },
  lap_existing: {
    q: "Is there an existing loan on this property already?",
    why: "Existing loan reduces available equity. I need to know the outstanding to calculate real top-up room.",
    type: "options",
    options: ["No existing loan — clear property", "Yes — and I want to transfer + top up", "Yes — only want top up"],
  },
  // ── HOME LOAN FLOW ──
  hl_applicant: {
    q: "Are you salaried or self-employed?",
    why: "Income type is the first filter lenders apply. It changes the document list and lender options significantly.",
    type: "options",
    options: ["Salaried — Private Company", "Salaried — Government / PSU", "Self-Employed / Business Owner", "Professional (Doctor / CA / Lawyer)"],
  },
  hl_income: {
    q: "What is your net monthly income (in-hand)?",
    why: "I calculate your maximum eligible EMI from this — which directly tells me your home loan limit.",
    type: "options",
    options: ["Below ₹40,000", "₹40K – ₹75K", "₹75K – ₹1.5 Lakh", "₹1.5L – ₹3 Lakh", "Above ₹3 Lakh"],
  },
  hl_existing_emi: {
    q: "How much are you currently paying in total EMIs every month?",
    why: "This directly impacts your FOIR — the ratio lenders use to decide if you can take on more EMI.",
    type: "options",
    options: ["No existing EMIs", "Below ₹10,000/month", "₹10K – ₹30K/month", "₹30K – ₹60K/month", "Above ₹60K/month"],
  },
  hl_amount: {
    q: "What home loan amount are you looking for?",
    why: null,
    type: "options",
    options: ["Below ₹30 Lakh", "₹30L – ₹60L", "₹60L – ₹1 Crore", "₹1 Cr – ₹2 Crore", "Above ₹2 Crore"],
  },
  // ── PERSONAL LOAN FLOW ──
  pl_employment: {
    q: "What is your employment type?",
    why: "Salaried profiles get instant pre-approved offers. Self-employed need different documentation.",
    type: "options",
    options: ["Salaried", "Self-Employed / Business Owner", "Professional"],
  },
  pl_income: {
    q: "Your net monthly take-home income?",
    why: "Personal loan EMI should not exceed 40–50% of take-home. This determines your eligible amount.",
    type: "options",
    options: ["Below ₹30,000", "₹30K – ₹60K", "₹60K – ₹1.5 Lakh", "Above ₹1.5 Lakh"],
  },
  pl_amount: {
    q: "How much personal loan do you need?",
    why: null,
    type: "options",
    options: ["Up to ₹3 Lakh", "₹3L – ₹7L", "₹7L – ₹15L", "₹15L – ₹30L", "Above ₹30 Lakh"],
  },
  // ── UNSECURED BUSINESS FLOW ──
  ub_turnover: {
    q: "What is your annual business turnover (approximate)?",
    why: "Fintech lenders calculate your unsecured limit as 20–30% of annual GST turnover. This is the key number.",
    type: "options",
    options: ["Below ₹25 Lakh", "₹25L – ₹75L", "₹75L – ₹2 Crore", "₹2 Cr – ₹10 Crore", "Above ₹10 Crore"],
  },
  ub_vintage: {
    q: "How old is your business?",
    why: null,
    type: "options",
    options: ["Less than 1 year", "1–2 years", "2–3 years", "More than 3 years"],
  },
  ub_amount: {
    q: "How much are you looking to borrow?",
    why: null,
    type: "options",
    options: ["Up to ₹15 Lakh", "₹15L – ₹35L", "₹35L – ₹75L", "₹75L – ₹2 Crore", "Above ₹2 Crore"],
  },
  // ── REJECTION FLOW ──
  rejected_product: {
    q: "Which type of loan was rejected?",
    why: "Different rejection reasons apply to different products. I need to know the product to diagnose the issue.",
    type: "options",
    options: ["Home Loan", "Business Loan / Working Capital", "Personal Loan", "LAP", "Other"],
  },
  rejected_reason: {
    q: "What reason did the bank give for rejection?",
    why: "The stated reason is often not the real reason. But it gives me a starting point.",
    type: "options",
    options: [
      "Low CIBIL score",
      "Insufficient income / FOIR too high",
      "Business too new / low vintage",
      "Property issue",
      "Documents incomplete",
      "No reason given",
    ],
  },
  rejected_count: {
    q: "How many lenders rejected you?",
    why: "Multiple rejections create hard enquiries which further damage CIBIL. I need to know how many before recommending next steps.",
    type: "options",
    options: ["Only 1 lender", "2 lenders", "3 or more lenders"],
  },
  // ── COMMON FINAL STEPS ──
  cibil: {
    q: "Do you know your approximate CIBIL score?",
    why: "CIBIL score is checked by every lender. It directly affects which lenders can approve and at what rate.",
    type: "options",
    options: ["750 and above", "700 – 750", "650 – 700", "Below 650", "Don't know my score"],
  },
  contact: {
    q: "Last step — where should we send your detailed assessment?",
    why: "Our expert team will review your profile and send a personalised eligibility analysis to your WhatsApp within 2 hours.",
    type: "contact",
  },
};

// ── FLOW SEQUENCES ─────────────────────────────────────────────────────────
const SEQUENCES = {
  business:  ["business_type","business_vintage","business_turnover","business_gst","business_amount","cibil","contact"],
  property:  ["lap_purpose","lap_property","lap_value","lap_existing","cibil","contact"],
  home:      ["hl_applicant","hl_income","hl_existing_emi","hl_amount","cibil","contact"],
  personal:  ["pl_employment","pl_income","pl_amount","cibil","contact"],
  unsecured: ["ub_turnover","ub_vintage","ub_amount","cibil","contact"],
  rejected:  ["rejected_product","rejected_reason","rejected_count","cibil","contact"],
};

// ── INSIGHT MESSAGES — shown after each answer ─────────────────────────────
const INSIGHTS = {
  business_vintage: {
    "Less than 1 year":    { msg: "New business — noted. Fintech lenders like Lendingkart and FlexiLoans work with early-stage businesses. Let me find the right path.", color: "#D97706" },
    "1–2 years":           { msg: "2-year vintage opens several NBFC options. With the right structuring this is workable.", color: "#D97706" },
    "2–3 years":           { msg: "Good. 2-3 years vintage qualifies you for most NBFCs and some private banks.", color: "#059669" },
    "3–5 years":           { msg: "Strong vintage. Most private banks and NBFCs will consider your case.", color: "#059669" },
    "More than 5 years":   { msg: "Excellent. 5+ year vintage gives you access to the full lender panel.", color: "#059669" },
  },
  lap_property: {
    "Residential — Gram Panchayat": { msg: "GP property needs specialist lenders — most private banks won't touch it. But we have lenders who specifically work with GP properties.", color: "#D97706" },
    "Commercial Property":           { msg: "Commercial property typically gets 50-60% LTV. Some lenders specialise in commercial — we will find the right one.", color: "#D97706" },
    "Residential — Society / Apartment": { msg: "Clean residential property — best LTV possible. Strong case for most lenders.", color: "#059669" },
  },
  cibil: {
    "750 and above":    { msg: "Excellent CIBIL. You qualify for the best rates from all lenders.", color: "#059669" },
    "700 – 750":        { msg: "Good score. Most lenders will consider you. Rate may be slightly higher than top tier.", color: "#059669" },
    "650 – 700":        { msg: "Borderline — some lenders will approve, others won't. Lender selection becomes critical.", color: "#D97706" },
    "Below 650":        { msg: "Low CIBIL — but not the end of the road. NBFCs have higher risk appetite. And we can build a plan to improve it.", color: "#D97706" },
    "Don't know my score": { msg: "No problem — our assessment will include a CIBIL check recommendation.", color: INDIGO },
  },
  rejected_count: {
    "3 or more lenders": { msg: "Important — stop applying now. Each rejection creates a hard enquiry that further damages CIBIL. Let us diagnose first before approaching any more lenders.", color: "#DC2626" },
    "2 lenders":         { msg: "Two rejections means there is likely a specific issue we need to identify and fix before approaching a third lender.", color: "#D97706" },
    "Only 1 lender":     { msg: "One rejection is common. Different lenders have different appetite. Let us find the right one.", color: "#059669" },
  },
};

export default function Check({ navigate }) {
  const [phase, setPhase]         = useState("start");   // start | flow | result
  const [loanType, setLoanType]   = useState(null);
  const [stepIdx, setStepIdx]     = useState(0);
  const [answers, setAnswers]     = useState({});
  const [insight, setInsight]     = useState(null);
  const [contact, setContact]     = useState({ name: "", mobile: "" });
  const [submitted, setSubmitted] = useState(false);

  const sequence  = loanType ? SEQUENCES[loanType] : [];
  const currentKey = sequence[stepIdx];
  const currentStep = STEPS[currentKey] || null;
  const progress  = loanType ? Math.round(((stepIdx) / sequence.length) * 100) : 0;

  const handleLoanType = (type) => {
    setLoanType(type);
    setPhase("flow");
    setStepIdx(0);
    setAnswers({});
    setInsight(null);
  };

  const handleAnswer = (val) => {
    const newAnswers = { ...answers, [currentKey]: val };
    setAnswers(newAnswers);

    // Show insight if available
    const stepInsights = INSIGHTS[currentKey];
    if (stepInsights && stepInsights[val]) {
      setInsight(stepInsights[val]);
    } else {
      setInsight(null);
    }

    // Move to next step after brief delay
    setTimeout(() => {
      setInsight(null);
      if (stepIdx + 1 < sequence.length) {
        setStepIdx(stepIdx + 1);
      } else {
        setPhase("contact");
      }
    }, insight ? 1800 : 400);
  };

  const handleSubmit = () => {
    if (!contact.name || contact.mobile.replace(/\D/g,"").length !== 10) {
      alert("Please enter your name and a valid 10-digit mobile number.");
      return;
    }
    // Submit to n8n webhook
    const payload = {
      name: contact.name,
      mobile: contact.mobile,
      loan_type: loanType,
      answers,
      source: "website_check",
      timestamp: new Date().toISOString(),
    };
    fetch(`${import.meta.env.VITE_N8N_WEBHOOK_URL || "https://n8n-production-ccb2.up.railway.app/webhook/eligibility-form"}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {}); // Silent fail — still show result
    setSubmitted(true);
    setPhase("result");
  };

  // ── START SCREEN ────────────────────────────────────────────────────────
  if (phase === "start") return (
    <div style={{ fontFamily: "Arial,sans-serif", minHeight: "100vh", background: GRAY }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "clamp(32px,5vw,56px) 20px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#EEF2FF", border: "1px solid #C7D2FE", color: INDIGO, fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 20, marginBottom: 16 }}>
            <span style={{ width: 5, height: 5, background: ORANGE, borderRadius: "50%", display: "inline-block" }} />
            Free · 2 Minutes · No Documents Needed
          </div>
          <h1 style={{ fontSize: "clamp(22px,4vw,32px)", fontWeight: 900, color: DARK, marginBottom: 10, lineHeight: 1.2 }}>
            Tell us what you need.<br /><span style={{ color: INDIGO }}>We find you the best path.</span>
          </h1>
          <p style={{ fontSize: 15, color: MUTED, maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            Answer a few questions. Our expert team reviews your profile and sends a personalised eligibility assessment to your WhatsApp — free, within 2 hours.
          </p>
        </div>

        {/* Loan type cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12 }}>
          {FLOWS.start.options.map(opt => (
            <div key={opt.id} onClick={() => handleLoanType(opt.id)} style={{
              background: WHITE, border: "2px solid #E5E7EB", borderRadius: 12,
              padding: "20px 18px", cursor: "pointer", transition: "all 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = INDIGO; e.currentTarget.style.background = "#EEF2FF"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.background = WHITE; }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{opt.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: DARK, marginBottom: 4 }}>{opt.label}</div>
              <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.4 }}>{opt.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── CONVERSATION FLOW ───────────────────────────────────────────────────
  if (phase === "flow" && currentStep) return (
    <div style={{ fontFamily: "Arial,sans-serif", minHeight: "100vh", background: GRAY }}>
      <div style={{ maxWidth: 620, margin: "0 auto", padding: "clamp(24px,4vw,48px) 20px" }}>

        {/* Progress */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: MUTED }}>Building your profile...</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: INDIGO }}>{progress}%</span>
          </div>
          <div style={{ height: 4, background: "#E5E7EB", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg,${INDIGO},${ORANGE})`, borderRadius: 2, transition: "width 0.4s ease" }} />
          </div>
          {/* Breadcrumb answers */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
            {Object.entries(answers).map(([k, v]) => (
              <span key={k} style={{ background: "#EEF2FF", color: INDIGO, fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 20, border: "1px solid #C7D2FE" }}>{v}</span>
            ))}
          </div>
        </div>

        {/* Insight flash */}
        {insight && (
          <div style={{ background: insight.color + "15", border: `1px solid ${insight.color}40`, borderRadius: 10, padding: "12px 16px", marginBottom: 20, display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ fontSize: 16 }}>💡</span>
            <div style={{ fontSize: 13, color: DARK, lineHeight: 1.6 }}>{insight.msg}</div>
          </div>
        )}

        {/* Question card */}
        <div style={{ background: WHITE, borderRadius: 16, padding: "28px 24px", border: "1px solid #E5E7EB", marginBottom: 16, boxShadow: "0 4px 16px rgba(79,70,229,0.06)" }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: DARK, marginBottom: 8, lineHeight: 1.3 }}>
            {currentStep.q}
          </div>
          {currentStep.why && (
            <div style={{ fontSize: 12, color: MUTED, marginBottom: 20, lineHeight: 1.5, fontStyle: "italic", borderLeft: `3px solid ${ORANGE}`, paddingLeft: 10 }}>
              {currentStep.why}
            </div>
          )}

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {currentStep.options?.map(opt => (
              <button key={opt} onClick={() => handleAnswer(opt)} style={{
                background: answers[currentKey] === opt ? INDIGO : WHITE,
                color: answers[currentKey] === opt ? WHITE : DARK,
                border: `1.5px solid ${answers[currentKey] === opt ? INDIGO : "#E5E7EB"}`,
                borderRadius: 8, padding: "11px 16px", textAlign: "left",
                fontSize: 13, fontWeight: 500, cursor: "pointer",
                fontFamily: "inherit", transition: "all 0.15s",
              }}
                onMouseEnter={e => { if (answers[currentKey] !== opt) { e.currentTarget.style.borderColor = INDIGO; e.currentTarget.style.background = "#EEF2FF"; e.currentTarget.style.color = INDIGO; } }}
                onMouseLeave={e => { if (answers[currentKey] !== opt) { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.background = WHITE; e.currentTarget.style.color = DARK; } }}>
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Step indicator */}
        <div style={{ textAlign: "center", fontSize: 11, color: "#9CA3AF" }}>
          Question {stepIdx + 1} of {sequence.length - 1}
        </div>
      </div>
    </div>
  );

  // ── CONTACT STEP ────────────────────────────────────────────────────────
  if (phase === "contact") return (
    <div style={{ fontFamily: "Arial,sans-serif", minHeight: "100vh", background: GRAY }}>
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "clamp(24px,4vw,48px) 20px" }}>

        {/* Summary of answers */}
        <div style={{ background: WHITE, borderRadius: 16, padding: 24, border: "1px solid #E5E7EB", marginBottom: 20, boxShadow: "0 4px 16px rgba(79,70,229,0.06)" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: INDIGO, marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>Your Profile Summary</div>
          {Object.entries(answers).map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #F3F4F6", fontSize: 12 }}>
              <span style={{ color: MUTED }}>{STEPS[k]?.q?.replace("?","") || k}</span>
              <span style={{ fontWeight: 600, color: DARK }}>{v}</span>
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div style={{ background: DARK, borderRadius: 16, padding: 28, border: "1px solid #1F2937" }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: WHITE, marginBottom: 6 }}>
            Almost done — where do we send your assessment?
          </div>
          <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 20, lineHeight: 1.6 }}>
            Our expert team reviews your profile and sends a personalised eligibility analysis to your WhatsApp — free, within 2 hours.
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", marginBottom: 5, textTransform: "uppercase", letterSpacing: 1 }}>Your Name</div>
            <input
              type="text" placeholder="Ramesh Sharma"
              value={contact.name} onChange={e => setContact(c => ({ ...c, name: e.target.value }))}
              style={{ width: "100%", background: "#1F2937", border: "1px solid #374151", borderRadius: 8, padding: "11px 14px", fontSize: 14, color: WHITE, boxSizing: "border-box", fontFamily: "inherit" }}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", marginBottom: 5, textTransform: "uppercase", letterSpacing: 1 }}>WhatsApp Number</div>
            <input
              type="tel" placeholder="98xxxxxxxx" maxLength={10}
              value={contact.mobile} onChange={e => setContact(c => ({ ...c, mobile: e.target.value }))}
              style={{ width: "100%", background: "#1F2937", border: "1px solid #374151", borderRadius: 8, padding: "11px 14px", fontSize: 14, color: WHITE, boxSizing: "border-box", fontFamily: "inherit" }}
            />
          </div>
          <button onClick={handleSubmit} style={{
            width: "100%", background: ORANGE, color: WHITE,
            fontSize: 15, fontWeight: 700, padding: 14, borderRadius: 8,
            border: "none", cursor: "pointer", fontFamily: "inherit",
          }}>
            Get My Free Assessment on WhatsApp →
          </button>
          <div style={{ textAlign: "center", fontSize: 11, color: "#4B5563", marginTop: 10 }}>
            🔒 100% private · Never shared · No spam
          </div>
        </div>
      </div>
    </div>
  );

  // ── RESULT SCREEN ───────────────────────────────────────────────────────
  if (phase === "result") return (
    <div style={{ fontFamily: "Arial,sans-serif", minHeight: "100vh", background: GRAY }}>
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "clamp(32px,5vw,56px) 20px", textAlign: "center" }}>

        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
        <h2 style={{ fontSize: "clamp(20px,3vw,26px)", fontWeight: 900, color: DARK, marginBottom: 12, lineHeight: 1.2 }}>
          Profile received. Expert review underway.
        </h2>
        <p style={{ fontSize: 15, color: MUTED, maxWidth: 440, margin: "0 auto 28px", lineHeight: 1.7 }}>
          Our banking expert is reviewing your profile right now. You will receive a detailed personalised eligibility assessment on WhatsApp <strong style={{ color: DARK }}>+91 {contact.mobile}</strong> within 2 hours.
        </p>

        <div style={{ background: WHITE, borderRadius: 14, padding: 24, border: "1px solid #E5E7EB", textAlign: "left", marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: INDIGO, marginBottom: 14, textTransform: "uppercase", letterSpacing: 1 }}>What happens next</div>
          {[
            ["🔍 Expert review",    "Our banker analyses your profile against 80+ lenders."],
            ["📊 Lender matching",  "We identify the best lender fit for your exact profile."],
            ["📱 WhatsApp delivery","Full assessment — eligible amount, lender match, next steps."],
            ["📞 Your call",        "If you want to proceed, we take it forward at zero cost to you."],
          ].map(([title, desc]) => (
            <div key={title} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              <div style={{ fontSize: 18, flexShrink: 0 }}>{title.split(" ")[0]}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: DARK }}>{title.slice(2)}</div>
                <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.5 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => window.open(`https://wa.me/919579453635?text=Hi%20FinsightOne%2C%20I%20just%20submitted%20my%20eligibility%20check%20for%20${encodeURIComponent(loanType || "loan")}`, "_blank")}
          style={{ background: "#25D366", color: WHITE, fontSize: 14, fontWeight: 700, padding: "12px 28px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit", marginBottom: 12, display: "block", width: "100%", textAlign: "center" }}>
          💬 Chat with us on WhatsApp
        </button>
        <button onClick={() => navigate("home")} style={{ background: "transparent", color: MUTED, fontSize: 13, padding: "10px 20px", border: "1px solid #E5E7EB", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", width: "100%" }}>
          Back to Home
        </button>
      </div>
      <Footer navigate={navigate} />
    </div>
  );

  return null;
}
