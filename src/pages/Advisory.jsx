import { useState } from "react";
import Footer from "../components/Footer";
import { ADVISORY_PRODUCTS } from "../data";

const INDIGO  = "#4F46E5";
const ORANGE  = "#EA580C";
const DARK    = "#111827";
const MUTED   = "#6B7280";
const WHITE   = "#fff";
const GRAY    = "#F9FAFB";
const GREEN   = "#059669";
const PURPLE  = "#7C3AED";
const WA      = "919579453635";

const PERSONAS = [
  { icon: "📈", title: "You need a higher CC or TL limit", desc: "Your business has grown but your bank hasn't kept up. Your existing limit is too tight and you're constantly running out of working capital headroom. We build the case for enhancement the way your lender's credit committee wants to see it." },
  { icon: "🏢", title: "You're applying for the first time", desc: "Your business is good but you've never taken a bank loan. You don't know which bank, what structure, or which documents to prepare. We assess your bankability, fix the gaps, and guide you to the right lender with a fully prepared file." },
  { icon: "⚠️", title: "Your repayments are under stress", desc: "EMIs are being delayed, your CC is overutilised, or a TL is slipping. Every missed payment damages your CIBIL and inches your account toward NPA. We step in early — negotiate with the bank, restructure the facility, and protect your credit record." },
  { icon: "🔄", title: "Your loan was rejected", desc: "You applied, got rejected, and don't know why. We do a forensic analysis of what went wrong — CIBIL, income gaps, property issues, lender policy mismatch — and rebuild a clean approach to the right lender with a corrected file." },
];

const FAQS = [
  {
    q: "What does 'advisory' actually mean — what do you do?",
    a: "Advisory means our expert works with you one-on-one on your specific case — not a generic report. We assess your exact situation, identify what is blocking or limiting your loan, build a structured action plan, prepare every document the lender needs, and work with you through the submission and negotiation process until the case is resolved.",
  },
  {
    q: "How long does advisory engagement typically take?",
    a: "Loan Enhancement and New Setup engagements typically take 6–12 weeks from start to sanction, depending on how complete your documentation is and how quickly the lender moves. NPA Prevention engagements vary — some restructurings are completed in 30 days, others take 90 days if bank negotiation is involved.",
  },
  {
    q: "What if my loan doesn't get approved after advisory?",
    a: "We do not guarantee sanction — no honest advisor can. What we guarantee is that your file will be structurally correct, presented to the right lender, and given the best possible chance of approval. If the first lender declines, we analyse the reason and approach an alternate lender at no additional charge.",
  },
  {
    q: "Is the free first consultation really free?",
    a: "Yes — completely. We spend 30 minutes understanding your situation. If we believe we can help, we tell you what engagement would look like and what it would cost. If we don't think we can add value, we tell you that too. No pressure, no commitment.",
  },
];

export default function Advisory({ navigate }) {
  const [openFaq, setOpenFaq] = useState(null);

  const waLink = (msg) =>
    `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

  return (
    <div style={{ fontFamily: "Arial,'Helvetica Neue',sans-serif", color: DARK }}>

      {/* ── HERO ── */}
      <div style={{ background: `linear-gradient(135deg,#0F172A 0%,#1E1B4B 100%)`, padding: "clamp(48px,7vw,80px) clamp(20px,5vw,48px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)", color: "#C4B5FD", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 20, marginBottom: 20, letterSpacing: 1.5, textTransform: "uppercase" }}>
            One-on-One · 20 Years Banking Experience · Personally Delivered
          </div>
          <h1 style={{ fontSize: "clamp(26px,4.5vw,42px)", fontWeight: 900, color: WHITE, marginBottom: 16, lineHeight: 1.2 }}>
            Expert Advisory —<br />
            <span style={{ color: "#FB923C" }}>When You Need More Than Documents</span>
          </h1>
          <p style={{ fontSize: "clamp(14px,2vw,16px)", color: "#CBD5E1", maxWidth: 620, margin: "0 auto 28px", lineHeight: 1.75 }}>
            Complex loan structures, rejections, NPA situations, limit enhancements — our expert team works with you one-on-one. We spent 20+ years inside banks reviewing and rejecting loan applications. Now we work for borrowers.
          </p>
          {/* FREE CONSULT CALLOUT */}
          <div style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.4)", borderRadius: 10, padding: "14px 20px", maxWidth: 480, margin: "0 auto 28px", textAlign: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#FB923C", marginBottom: 4 }}>Free First Consultation</div>
            <div style={{ fontSize: 13, color: "#FED7AA", lineHeight: 1.6 }}>We assess your case at no charge — 30 minutes on WhatsApp. You pay only if we take it on.</div>
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => window.open(waLink("Hi FinsightOne, I want to book a free advisory consultation"), "_blank")}
              style={{ background: "#25D366", color: WHITE, fontSize: 14, fontWeight: 700, padding: "13px 28px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
              💬 Book Free Consultation on WhatsApp
            </button>
            <button
              onClick={() => navigate("check")}
              style={{ background: "rgba(255,255,255,0.1)", color: WHITE, fontSize: 14, fontWeight: 600, padding: "13px 28px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", fontFamily: "inherit" }}>
              Check Eligibility First — Free
            </button>
          </div>
        </div>
      </div>

      {/* ── TRUST BAR ── */}
      <div style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", padding: "14px clamp(20px,5vw,48px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "center", gap: "clamp(20px,4vw,56px)", flexWrap: "wrap" }}>
          {[["20+", "Years Banking Experience"], ["₹0", "Free First Consultation"], ["3", "Advisory Services"], ["48 hrs", "First Response SLA"]].map(([val, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: ORANGE }}>{val}</div>
              <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHO NEEDS THIS ── */}
      <div style={{ background: WHITE, padding: "clamp(40px,6vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: ORANGE, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 8 }}>Is This For You?</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,28px)", fontWeight: 900, color: DARK }}>You Need Advisory If...</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
            {PERSONAS.map((p) => (
              <div key={p.title} style={{ background: "#EEF2FF", border: "1px solid #C7D2FE", borderRadius: 12, padding: "20px 18px" }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{p.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: DARK, marginBottom: 7, lineHeight: 1.3 }}>{p.title}</div>
                <div style={{ fontSize: 12.5, color: MUTED, lineHeight: 1.65 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ADVISORY SERVICES ── */}
      <div style={{ background: GRAY, padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: ORANGE, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 8 }}>Advisory Services</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,28px)", fontWeight: 900, color: DARK, marginBottom: 10 }}>Three Ways We Advise</h2>
            <p style={{ fontSize: 14, color: MUTED, maxWidth: 480, margin: "0 auto" }}>Each engagement is one-on-one with an ex-banker. Pricing is based on loan size and complexity.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
            {ADVISORY_PRODUCTS.map((a) => (
              <div key={a.name} style={{ border: "1px solid #E2E8F0", borderRadius: 14, overflow: "hidden", background: WHITE, borderTop: `4px solid ${a.color}`, display: "flex", flexDirection: "column" }}>

                <div style={{ padding: "22px 22px 16px", flex: 1 }}>
                  <div style={{ fontSize: 30, marginBottom: 10 }}>{a.icon}</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: DARK, marginBottom: 6 }}>{a.name}</div>
                  <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.65, marginBottom: 16 }}>{a.desc}</div>

                  {/* Bullets */}
                  <div style={{ marginBottom: 16 }}>
                    {a.bullets.map((b, bi) => (
                      <div key={bi} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                        <span style={{ color: a.color, fontWeight: 900, fontSize: 11, marginTop: 2, flexShrink: 0 }}>✓</span>
                        <span style={{ fontSize: 12.5, color: DARK, lineHeight: 1.4 }}>{b}</span>
                      </div>
                    ))}
                  </div>

                  {/* Outcome */}
                  <div style={{ background: a.color + "10", border: `1px solid ${a.color}30`, borderRadius: 8, padding: "9px 12px", marginBottom: 14 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: a.color, marginBottom: 2, letterSpacing: 0.5 }}>TYPICAL OUTCOME</div>
                    <div style={{ fontSize: 12, color: DARK, lineHeight: 1.5 }}>{a.outcome}</div>
                  </div>

                  {/* Who */}
                  <div style={{ fontSize: 11, color: MUTED, fontStyle: "italic" }}>{a.who}</div>
                </div>

                {/* Pricing + CTA */}
                <div style={{ padding: "14px 22px 20px", borderTop: "1px solid #F1F5F9" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 900, color: a.color }}>{a.price}</div>
                      <div style={{ fontSize: 10.5, color: "#9CA3AF", marginTop: 2 }}>{a.priceNote}</div>
                    </div>
                    <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 6, padding: "4px 10px", fontSize: 10.5, fontWeight: 700, color: GREEN }}>
                      Free Discovery Call
                    </div>
                  </div>
                  <button
                    onClick={() => window.open(`https://wa.me/${WA}?text=${encodeURIComponent("Hi FinsightOne, I want to discuss " + a.name)}`, "_blank")}
                    style={{ width: "100%", padding: "11px 0", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", background: a.color, color: WHITE, border: "none", fontFamily: "inherit" }}>
                    Book Free Consultation →
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div style={{ background: WHITE, padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: ORANGE, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 8 }}>How It Works</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,28px)", fontWeight: 900, color: DARK }}>Simple 4-Step Process</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 24 }}>
            {[
              { num: "1", title: "Free Discovery Call", desc: "30 minutes on WhatsApp. We understand your situation — loan type, amount, current status, blockers. No charge. No commitment.", badge: "Free" },
              { num: "2", title: "Expert Assessment", desc: "We review your financials, banking conduct, CIBIL, and documentation. We tell you exactly what the issue is and what it will take to resolve it.", badge: "48 hrs" },
              { num: "3", title: "Action Plan Delivery", desc: "A clear, written plan — what to do, in what order, with what documents, approaching which lender. No vague advice.", badge: "Written" },
              { num: "4", title: "Execute Together", desc: "We work with you through every step — document preparation, lender submission, follow-up, and negotiation until the case is resolved.", badge: "End-to-End" },
            ].map((s) => (
              <div key={s.num} style={{ textAlign: "center" }}>
                <div style={{ position: "relative", display: "inline-block", marginBottom: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: INDIGO, color: WHITE, fontSize: 18, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>{s.num}</div>
                  <div style={{ position: "absolute", top: -6, right: -24, background: ORANGE, color: WHITE, fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 10, whiteSpace: "nowrap" }}>{s.badge}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: DARK, marginBottom: 6 }}>{s.title}</div>
                <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.55 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div style={{ background: GRAY, padding: "clamp(40px,6vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: ORANGE, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 8 }}>FAQ</div>
            <h2 style={{ fontSize: "clamp(20px,3vw,28px)", fontWeight: 900, color: DARK }}>Common Questions</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ border: "1px solid #E2E8F0", borderRadius: 10, overflow: "hidden" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: openFaq === i ? "#EEF2FF" : WHITE, border: "none", cursor: "pointer", fontFamily: "inherit", gap: 12 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: openFaq === i ? INDIGO : DARK, textAlign: "left", lineHeight: 1.4 }}>{faq.q}</span>
                  <span style={{ fontSize: 20, color: INDIGO, flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
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
      </div>

      {/* ── BOTTOM CTA ── */}
      <div style={{ background: `linear-gradient(135deg,#0F172A 0%,#1E1B4B 100%)`, padding: "clamp(40px,6vw,64px) clamp(20px,4vw,48px)", textAlign: "center" }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: WHITE, marginBottom: 12, lineHeight: 1.25 }}>
            Not Sure What You Need?<br />
            <span style={{ color: "#FB923C" }}>Start with a Free Call.</span>
          </div>
          <p style={{ fontSize: 14, color: "#CBD5E1", marginBottom: 28, lineHeight: 1.7 }}>
            30 minutes on WhatsApp. We assess your situation and tell you exactly which service fits — or whether you need advisory at all. No charge. No obligation.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => window.open(waLink("Hi FinsightOne, I want a free advisory consultation"), "_blank")}
              style={{ background: "#25D366", color: WHITE, fontSize: 14, fontWeight: 700, padding: "13px 28px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
              💬 Book Free Consultation
            </button>
            <button
              onClick={() => navigate("docs")}
              style={{ background: "rgba(255,255,255,0.1)", color: WHITE, fontSize: 14, fontWeight: 600, padding: "13px 28px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", fontFamily: "inherit" }}>
              See Document Services →
            </button>
          </div>
          <div style={{ fontSize: 11, color: "#475569", marginTop: 16 }}>🔒 100% confidential · No obligation · Pay only if we take it on</div>
        </div>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}
