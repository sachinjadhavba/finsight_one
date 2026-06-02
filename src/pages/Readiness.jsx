import { useState } from "react";

const INDIGO = "#4F46E5";
const ORANGE = "#EA580C";
const DARK   = "#111827";
const MUTED  = "#6B7280";
const WHITE  = "#fff";
const GRAY   = "#F9FAFB";
const GREEN  = "#059669";
const GREEN_L= "#ECFDF5";
const INDIGO_L="#EEF2FF";

const WA_NUMBER = "919579453635";

const PRODUCTS = [
  {
    id: "free",
    step: "Step 01",
    label: "Free Eligibility Score",
    price: "Free",
    priceNote: "No credit card needed",
    color: GREEN,
    bg: GREEN_L,
    border: "#6EE7B7",
    desc: "A quick 2-minute assessment that tells you your approximate loan eligibility — before you approach any lender.",
    bullets: [
      "Estimated eligible loan amount",
      "CIBIL health indicator",
      "Top 2 likely blockers in your profile",
      "Recommended next step",
    ],
    cta: "Get My Free Score on WhatsApp →",
    ctaBg: "#25D366",
    ctaColor: WHITE,
    sample: null,
    waFlow: true,
  },
  {
    id: "eligibility",
    step: "Step 02",
    label: "Detailed Eligibility Report",
    price: "₹799",
    priceNote: "+ GST",
    color: INDIGO,
    bg: INDIGO_L,
    border: "#C7D2FE",
    desc: "A detailed written report covering your full credit profile — income analysis, CIBIL breakdown, lender match probability.",
    bullets: [
      "Full income consistency audit (ITR vs GST vs Banking)",
      "CIBIL score breakdown — what's pulling it down",
      "FOIR analysis — how much more EMI you can carry",
      "3 lender categories ranked by fit",
      "Specific gaps to fix before applying",
    ],
    cta: "Order Report — ₹799",
    ctaBg: INDIGO,
    ctaColor: WHITE,
    sample: "/reports/s2-02-detailed-eligibility.html",
    waFlow: false,
  },
  {
    id: "readiness",
    step: "Step 03",
    label: "Loan Readiness Plan",
    price: "₹2,999",
    priceNote: "+ GST",
    color: ORANGE,
    bg: "#FFF7ED",
    border: "#FED7AA",
    desc: "A complete action plan that tells you exactly what to fix, in what order, to maximise your approval probability.",
    bullets: [
      "Everything in Detailed Eligibility Report",
      "Step-by-step improvement roadmap (30 / 60 / 90 days)",
      "Document checklist for your specific loan type",
      "Banking conduct improvement actions",
      "CIBIL improvement actions if needed",
    ],
    cta: "Order Plan — ₹2,999",
    ctaBg: ORANGE,
    ctaColor: WHITE,
    sample: "/reports/s2-03-loan-readiness-plan.html",
    waFlow: false,
  },
  {
    id: "banker",
    step: "Step 04",
    label: "Banker Presentation Pack",
    price: "₹9,999",
    priceNote: "+ GST",
    color: "#7C3AED",
    bg: "#FAF5FF",
    border: "#DDD6FE",
    desc: "A professionally prepared file that you hand directly to the banker — structured exactly the way credit committees read a case.",
    bullets: [
      "Everything in Loan Readiness Plan",
      "Executive summary for the banker (1 page)",
      "Income narrative with all source reconciliation",
      "Property & security summary (if applicable)",
      "Pre-answered responses to 10 standard banker queries",
      "Recommended lender + branch + RM approach strategy",
    ],
    cta: "Order Pack — ₹9,999",
    ctaBg: "#7C3AED",
    ctaColor: WHITE,
    sample: "/reports/s2-04-banker-presentation-pack.html",
    waFlow: false,
  },
  {
    id: "rejection",
    step: "Step 05",
    label: "Rejection Analysis Report",
    price: "₹4,999",
    priceNote: "+ GST",
    color: "#DC2626",
    bg: "#FEF2F2",
    border: "#FECACA",
    desc: "For borrowers who have already been rejected. A forensic analysis of why it happened — and exactly how to get approved next time.",
    bullets: [
      "Rejection cause identification (CIBIL / income / property / docs)",
      "Hard enquiry damage assessment",
      "Lender-specific policy gap analysis",
      "Cooling-off period recommendation",
      "Step-by-step recovery plan",
      "Which lender to approach next — and when",
    ],
    cta: "Order Report — ₹4,999",
    ctaBg: "#DC2626",
    ctaColor: WHITE,
    sample: "/reports/s2-05-rejection-analysis.html",
    waFlow: false,
  },
];

const PERSONAS = [
  {
    icon: "🏢",
    title: "First-Time Business Loan Applicant",
    desc: "You have never applied for a business loan before. You don't know what lenders check, what documents they need, or whether your profile is ready. The Free Score tells you in 2 minutes — before you walk into any bank.",
  },
  {
    icon: "🔄",
    title: "Already Rejected by a Lender",
    desc: "You applied, got rejected, and don't know why. Each new application is making things worse — every rejection is a hard enquiry that damages your CIBIL further. Stop applying blindly. Our Rejection Analysis tells you exactly what went wrong and what to fix.",
  },
  {
    icon: "📋",
    title: "Planning to Apply in 3–6 Months",
    desc: "You know you will need a loan soon but want to be fully prepared before you approach anyone. The Loan Readiness Plan gives you a 30/60/90-day action plan so that when you walk in, your file is already banker-ready.",
  },
];

const FAQS = [
  {
    q: "How is this different from just checking my CIBIL score?",
    a: "CIBIL is one of 8–10 factors lenders check. A 750 CIBIL does not guarantee approval if your banking turnover is low, your ITR shows thin income, or your FOIR is already high from other EMIs. FinsightOne's Loan Readiness Check analyses all dimensions — not just CIBIL.",
  },
  {
    q: "Who prepares these reports?",
    a: "Every report is prepared by FinsightOne's expert team — ex-bankers with 20+ years of MSME and retail lending experience. These are not automated outputs. A real credit expert reviews your profile before the report is delivered.",
  },
  {
    q: "How is the report delivered?",
    a: "All reports are delivered to your WhatsApp as a PDF within 72 hours of payment and document submission. The Free Eligibility Score is delivered within 2 hours.",
  },
  {
    q: "What if I need help after reading the report?",
    a: "Every paid report includes a 20-minute WhatsApp consultation with our team to walk you through the findings and answer your questions. For deeper advisory support, our Expert Advisory service takes it from there.",
  },
];

export default function Readiness({ navigate }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [openProduct, setOpenProduct] = useState(null);

  const handleWA = () => {
    window.open(
      `https://wa.me/${WA_NUMBER}?text=Hi%20FinsightOne%2C%20I%20want%20my%20Free%20Eligibility%20Score`,
      "_blank"
    );
  };

  const handleOrder = (product) => {
    window.open(
      `https://wa.me/${WA_NUMBER}?text=Hi%20FinsightOne%2C%20I%20want%20to%20order%20the%20${encodeURIComponent(product.label)}%20(${product.price})`,
      "_blank"
    );
  };

  return (
    <div style={{ fontFamily: "Arial,sans-serif", background: WHITE, color: DARK }}>

      {/* ── HERO ── */}
      <div style={{ background: `linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)`, padding: "clamp(48px,7vw,80px) clamp(20px,5vw,48px)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.4)", color: "#FB923C", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 20, marginBottom: 20, letterSpacing: 1.5, textTransform: "uppercase" }}>
            Know Before You Apply
          </div>
          <h1 style={{ fontSize: "clamp(26px,4.5vw,42px)", fontWeight: 900, color: WHITE, marginBottom: 16, lineHeight: 1.2 }}>
            Know Exactly Where You Stand<br />
            <span style={{ color: "#FB923C" }}>Before You Apply</span>
          </h1>
          <p style={{ fontSize: "clamp(14px,2vw,16px)", color: "#CBD5E1", maxWidth: 640, margin: "0 auto 28px", lineHeight: 1.75 }}>
            Most loans get rejected not because the borrower is ineligible — but because they walked in unprepared. FinsightOne's Loan Readiness Check tells you exactly where you stand, what's weak, and how to fix it — before you approach any lender.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={handleWA} style={{ background: "#25D366", color: WHITE, fontSize: 14, fontWeight: 700, padding: "13px 28px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
              💬 Get Free Score on WhatsApp
            </button>
            <button onClick={() => document.getElementById("products").scrollIntoView({ behavior: "smooth" })}
              style={{ background: "rgba(255,255,255,0.1)", color: WHITE, fontSize: 14, fontWeight: 600, padding: "13px 28px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", fontFamily: "inherit" }}>
              View All Reports →
            </button>
          </div>
        </div>
      </div>

      {/* ── TRUST BAR ── */}
      <div style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", padding: "14px clamp(20px,5vw,48px)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", justifyContent: "center", gap: "clamp(20px,4vw,56px)", flexWrap: "wrap" }}>
          {[["20+", "Years Banking Experience"], ["72 hrs", "Report Delivery"], ["₹0", "Free Score — No Card Needed"], ["Ex-Bankers", "Not Algorithms"]].map(([val, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: DARK }}>{val}</div>
              <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PRODUCTS ── */}
      <div id="products" style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(40px,6vw,72px) clamp(20px,4vw,40px)" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: ORANGE, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 8 }}>Our Reports</div>
          <h2 style={{ fontSize: "clamp(22px,3.5vw,30px)", fontWeight: 800, color: DARK, marginBottom: 10 }}>Pick the Right Level of Clarity</h2>
          <p style={{ fontSize: 14, color: MUTED, maxWidth: 520, margin: "0 auto" }}>Start free. Go deeper when you need to. Every paid report includes a 20-minute expert consultation.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {PRODUCTS.map((p) => (
            <div key={p.id} style={{ background: WHITE, border: `1px solid ${p.border}`, borderLeft: `4px solid ${p.color}`, borderRadius: 12, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr minmax(0,auto)", alignItems: "start", padding: "clamp(14px,3vw,20px) clamp(12px,3vw,24px)", gap: "clamp(8px,2vw,16px)" }}>

                {/* LEFT */}
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ background: p.bg, border: `1px solid ${p.border}`, borderRadius: 8, padding: "4px 10px", flexShrink: 0, marginTop: 2 }}>
                    <div style={{ fontSize: 9, fontWeight: 800, color: p.color, letterSpacing: 1.5, textTransform: "uppercase" }}>{p.step}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: DARK, marginBottom: 4 }}>{p.label}</div>
                    <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.6, marginBottom: 10 }}>{p.desc}</div>
                    {/* Bullets */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {p.bullets.map((b, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, background: p.bg, border: `1px solid ${p.border}`, borderRadius: 20, padding: "3px 10px", fontSize: 11.5, color: p.color, fontWeight: 500 }}>
                          <span style={{ fontSize: 9, color: p.color }}>✓</span> {b}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10, flexShrink: 0, minWidth: 0, width: "clamp(130px,38%,175px)" }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: p.color }}>{p.price}</div>
                    <div style={{ fontSize: 11, color: MUTED }}>{p.priceNote}</div>
                  </div>
                  <button
                    onClick={p.waFlow ? handleWA : () => handleOrder(p)}
                    style={{ background: p.ctaBg, color: p.ctaColor, fontSize: 12, fontWeight: 700, padding: "10px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", width: "100%", textAlign: "center" }}>
                    {p.cta}
                  </button>
                  {p.sample && (
                    <a href={p.sample} target="_blank" rel="noreferrer"
                      style={{ fontSize: 11.5, color: INDIGO, fontWeight: 600, textDecoration: "none", textAlign: "center" }}>
                      View Sample Report →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHO NEEDS THIS ── */}
      <div style={{ background: "#F8FAFC", padding: "clamp(40px,6vw,64px) clamp(20px,4vw,40px)", borderTop: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: ORANGE, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 8 }}>Who Needs This</div>
            <h2 style={{ fontSize: "clamp(20px,3vw,28px)", fontWeight: 800, color: DARK }}>Is a Loan Readiness Check Right for You?</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
            {PERSONAS.map((persona) => (
              <div key={persona.title} style={{ background: WHITE, borderRadius: 12, padding: "24px 20px", border: "1px solid #E2E8F0" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{persona.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: DARK, marginBottom: 8, lineHeight: 1.3 }}>{persona.title}</div>
                <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.7 }}>{persona.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "clamp(40px,6vw,64px) clamp(20px,4vw,40px)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: ORANGE, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 8 }}>FAQ</div>
          <h2 style={{ fontSize: "clamp(20px,3vw,28px)", fontWeight: 800, color: DARK }}>Common Questions</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ border: "1px solid #E2E8F0", borderRadius: 10, overflow: "hidden" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: openFaq === i ? INDIGO_L : WHITE, border: "none", cursor: "pointer", fontFamily: "inherit", gap: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: openFaq === i ? INDIGO : DARK, textAlign: "left", lineHeight: 1.4 }}>{faq.q}</span>
                <span style={{ fontSize: 18, color: INDIGO, flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: "14px 20px 18px", background: WHITE, fontSize: 13.5, color: MUTED, lineHeight: 1.75, borderTop: "1px solid #E2E8F0" }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div style={{ background: `linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)`, padding: "clamp(40px,6vw,64px) clamp(20px,4vw,48px)", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: WHITE, marginBottom: 12, lineHeight: 1.25 }}>
            Start with the Free Score.<br />
            <span style={{ color: "#FB923C" }}>It takes 2 minutes.</span>
          </div>
          <p style={{ fontSize: 14, color: "#CBD5E1", marginBottom: 28, lineHeight: 1.7 }}>
            No documents needed. No credit card. Our expert reviews your profile and sends a personalised eligibility assessment to your WhatsApp — free, within 2 hours.
          </p>
          <button onClick={handleWA}
            style={{ background: "#25D366", color: WHITE, fontSize: 15, fontWeight: 700, padding: "14px 32px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit", marginBottom: 12 }}>
            💬 Get My Free Score on WhatsApp
          </button>
          <div style={{ fontSize: 11, color: "#475569" }}>🔒 100% private · Never shared · No spam</div>
        </div>
      </div>

    </div>
  );
}
