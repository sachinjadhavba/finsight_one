import { useState } from "react";
import { C, FONT_HEAD, FONT_BODY } from "../tokens";
import { WHATSAPP_NUMBER, EMAIL, CALENDLY_LINK } from "../config";

const TABS = [
  { id: "loan", label: "🏦 Loan Advisory", col: C.gold },
  { id: "readiness", label: "📋 Loan Readiness", col: C.green },
  { id: "analytics", label: "📊 Analytics & Retainers", col: C.purpleLight },
  { id: "advisory", label: "📑 Documents & Advisory", col: C.digital },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", business: "", loanSize: "", bank: "", timeline: "", message: "" });
  const [tab, setTab] = useState("loan");
  const [sent, setSent] = useState(false);

  const tabObj = TABS.find(t => t.id === tab);

  const submit = () => {
    if (!form.name || !form.phone) return;
    const serviceLabel = {
      loan: "Loan Advisory",
      readiness: "Loan Readiness Check",
      analytics: "Analytics & Retainers",
      advisory: "Loan Documents & Advisory",
    }[tab];
    const msg = `Hi FinSight One!%0A%0AService: ${serviceLabel}%0AName: ${form.name}%0APhone: ${form.phone}%0ABusiness: ${form.business}%0ALoan Size: ${form.loanSize}%0ACurrent Bank: ${form.bank}%0ATimeline: ${form.timeline}%0AMessage: ${form.message}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setSent(true);
  };

  const digitalFields = tab === "advisory" || tab === "loan";

  return (
    <section id="contact" style={{ padding: "80px 24px 40px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.purple, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Get Started</div>
          <h2 style={{ fontFamily: FONT_HEAD, fontSize: "clamp(22px, 4vw, 36px)", color: C.white, margin: "0 0 12px" }}>Book Your Free 20-Minute Consultation</h2>
          <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: C.muted, margin: 0 }}>No commitment. Honest assessment. We reply within 2 business hours.</p>
        </div>

        {!sent ? (
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 20, padding: "32px 28px" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
              {TABS.map((t) => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  style={{ flex: "1 1 140px", padding: "10px", borderRadius: 10, cursor: "pointer", fontFamily: FONT_BODY, border: `1px solid ${tab === t.id ? t.col : C.border}`, background: tab === t.id ? `${t.col}15` : "transparent", color: tab === t.id ? t.col : C.muted, fontSize: 12, fontWeight: 700, transition: "all 0.2s" }}>
                  {t.label}
                </button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              {[["Your Name *", "name"], ["WhatsApp Number *", "phone"]].map(([label, field]) => (
                <div key={field}>
                  <label style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.muted, display: "block", marginBottom: 6 }}>{label}</label>
                  <input value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                    style={{ width: "100%", background: C.bgMid, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", color: C.white, fontSize: 13, fontFamily: FONT_BODY, boxSizing: "border-box" }} />
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.muted, display: "block", marginBottom: 6 }}>Business name & sector</label>
              <input value={form.business} onChange={e => setForm(f => ({ ...f, business: e.target.value }))}
                placeholder="e.g. Sharma Sugar Mills Pvt Ltd · Sugar / Co-Gen"
                style={{ width: "100%", background: C.bgMid, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", color: C.white, fontSize: 13, fontFamily: FONT_BODY, boxSizing: "border-box" }} />
            </div>

            {digitalFields && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.muted, display: "block", marginBottom: 6 }}>Loan size</label>
                  <input value={form.loanSize} onChange={e => setForm(f => ({ ...f, loanSize: e.target.value }))}
                    placeholder="e.g. ₹60 Cr"
                    style={{ width: "100%", background: C.bgMid, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", color: C.white, fontSize: 13, fontFamily: FONT_BODY, boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.muted, display: "block", marginBottom: 6 }}>Current bank</label>
                  <input value={form.bank} onChange={e => setForm(f => ({ ...f, bank: e.target.value }))}
                    placeholder="e.g. SBI / HDFC"
                    style={{ width: "100%", background: C.bgMid, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", color: C.white, fontSize: 13, fontFamily: FONT_BODY, boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.muted, display: "block", marginBottom: 6 }}>Timeline</label>
                  <input value={form.timeline} onChange={e => setForm(f => ({ ...f, timeline: e.target.value }))}
                    placeholder="e.g. 30 days"
                    style={{ width: "100%", background: C.bgMid, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", color: C.white, fontSize: 13, fontFamily: FONT_BODY, boxSizing: "border-box" }} />
                </div>
              </div>
            )}

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.muted, display: "block", marginBottom: 6 }}>
                What would you like to discuss?
              </label>
              <textarea rows={3} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder="Brief context. Anything else we should know?"
                style={{ width: "100%", background: C.bgMid, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", color: C.white, fontSize: 13, fontFamily: FONT_BODY, resize: "none", boxSizing: "border-box" }} />
            </div>

            <button onClick={submit}
              style={{ width: "100%", padding: 14, background: `linear-gradient(135deg,${tabObj.col},${tabObj.col}90)`, border: "none", borderRadius: 10, color: tab === "loan" ? "#0A0600" : "white", fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: FONT_BODY, boxShadow: `0 8px 30px ${tabObj.col}40` }}>
              📲 Send via WhatsApp &amp; Book Call
            </button>

            <div style={{ textAlign: "center", marginTop: 16, fontFamily: FONT_BODY, fontSize: 12, color: C.muted }}>
              Or email us directly: <a href={`mailto:${EMAIL}`} style={{ color: C.purpleLight }}>{EMAIL}</a>
              &nbsp;·&nbsp;
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" style={{ color: C.green }}>Book via Calendly</a>
            </div>
          </div>
        ) : (
          <div style={{ background: C.bgCard, border: `1px solid ${C.green}40`, borderRadius: 20, padding: "48px 28px", textAlign: "center" }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
            <h3 style={{ fontFamily: FONT_HEAD, fontSize: 24, color: C.white, margin: "0 0 10px" }}>Message Sent!</h3>
            <p style={{ fontFamily: FONT_BODY, color: C.muted, fontSize: 14 }}>We'll respond within 2 business hours. Check your WhatsApp for our confirmation.</p>
            <button onClick={() => setSent(false)} style={{ marginTop: 20, background: "transparent", border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 20px", color: C.muted, fontSize: 12, cursor: "pointer", fontFamily: FONT_BODY }}>Send Another Enquiry →</button>
          </div>
        )}
      </div>
    </section>
  );
}
