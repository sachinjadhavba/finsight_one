import Footer from "../components/Footer";
import { DOC_PRODUCTS } from "../data";

const INDIGO = "#4F46E5";
const ORANGE = "#EA580C";
const DARK   = "#111827";
const MUTED  = "#6B7280";
const WHITE  = "#fff";
const GRAY   = "#F9FAFB";
const GREEN  = "#059669";

const CARD_COLORS = [INDIGO, GREEN, ORANGE];

export default function Docs({ navigate }) {
  return (
    <div style={{ fontFamily: "Arial,sans-serif" }}>

      {/* ── HERO ── */}
      <div style={{ background: WHITE, padding: "clamp(44px,6vw,72px) clamp(20px,4vw,48px)", borderBottom: "1px solid #E5E7EB" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#EEF2FF", border: "1px solid #C7D2FE", color: INDIGO, fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 20, marginBottom: 20 }}>
            <span style={{ width: 5, height: 5, background: ORANGE, borderRadius: "50%", display: "inline-block" }} />
            Expert-Prepared · 72-Hour Delivery · 20 Years Banking Experience
          </div>
          <h1 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 900, color: DARK, lineHeight: 1.15, marginBottom: 14, letterSpacing: "-0.03em" }}>
            Banker-Ready <span style={{ color: INDIGO }}>Loan Documents</span><br />Prepared by Our Expert Team
          </h1>
          <p style={{ fontSize: 16, color: MUTED, maxWidth: 580, margin: "0 auto 28px", lineHeight: 1.7 }}>
            Loan Appraisal Note (LAN), CMA, DPR — every document a bank asks for, prepared correctly in the exact format your lender uses. Banks reject files on technicalities. We make sure that never happens to you.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate("check")} style={{ background: ORANGE, color: WHITE, fontSize: 14, fontWeight: 700, padding: "12px 28px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
              Check My Eligibility First — Free
            </button>
            <button
              onClick={() => window.open("/reports/doc-01-cam-small.html", "_blank")}
              style={{ background: WHITE, color: INDIGO, fontSize: 14, fontWeight: 600, padding: "12px 28px", borderRadius: 8, border: `1px solid ${INDIGO}`, cursor: "pointer", fontFamily: "inherit" }}>
              View Sample LAN →
            </button>
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div style={{ background: GRAY, borderBottom: "1px solid #E5E7EB", padding: "18px clamp(20px,4vw,48px)", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 16 }}>
        {[["72 hrs", "Fastest TAT"], ["3", "Document Types"], ["20 yrs", "Banking Expertise"], ["Ex-Bankers", "Not Algorithms"]].map(([v, l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: ORANGE }}>{v}</div>
            <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* ── PRODUCTS ── */}
      <div style={{ padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)", background: WHITE }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", color: ORANGE, marginBottom: 10, textAlign: "center" }}>Document Services</div>
        <h2 style={{ fontSize: "clamp(22px,3vw,28px)", fontWeight: 900, textAlign: "center", marginBottom: 8, color: DARK }}>Three Documents. Every Loan. One Team.</h2>
        <p style={{ fontSize: 14, color: MUTED, textAlign: "center", maxWidth: 540, margin: "0 auto 36px", lineHeight: 1.7 }}>
          Banks ask for different documents depending on loan type and amount. We prepare all three — correctly, completely, on time.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, maxWidth: 1000, margin: "0 auto" }}>
          {DOC_PRODUCTS.map((d, i) => (
            <div key={d.name} style={{ border: "1px solid #E5E7EB", borderRadius: 14, overflow: "hidden", background: WHITE, borderTop: `3px solid ${CARD_COLORS[i]}`, display: "flex", flexDirection: "column" }}>

              {/* Card Top */}
              <div style={{ padding: "20px 20px 16px", background: CARD_COLORS[i] + "08", flex: 1 }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{d.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: DARK, marginBottom: 6 }}>{d.name}</div>
                <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.6, marginBottom: 14 }}>{d.desc}</div>

                {/* Pricing tiers */}
                <div style={{ background: WHITE, border: `1px solid ${CARD_COLORS[i]}30`, borderRadius: 8, padding: "10px 12px" }}>
                  <div style={{ fontSize: 9, fontWeight: 800, color: CARD_COLORS[i], letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>Pricing</div>
                  {d.priceDetail.split("  |  ").map((tier, ti) => {
                    const isCall = tier.includes("Confirm on Call");
                    const [range, price] = tier.split(": ");
                    return (
                      <div key={ti} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0", borderBottom: ti < d.priceDetail.split("  |  ").length - 1 ? "1px solid #F3F4F6" : "none" }}>
                        <span style={{ fontSize: 11.5, color: MUTED }}>{range}</span>
                        <span style={{ fontSize: 11.5, fontWeight: 700, color: isCall ? ORANGE : DARK }}>{price}</span>
                      </div>
                    );
                  })}
                  <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 6, fontStyle: "italic" }}>All prices excl. GST</div>
                </div>

                <div style={{ fontSize: 11, color: MUTED, marginTop: 8 }}>{d.who}</div>
              </div>

              {/* Card Actions */}
              <div style={{ padding: "14px 20px 18px", borderTop: "1px solid #F3F4F6", display: "flex", flexDirection: "column", gap: 8 }}>
                {/* Sample buttons */}
                {d.samples && d.samples.length > 0 && (
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {d.samples.map((s, si) => (
                      <a key={si} href={s.url} target="_blank" rel="noreferrer"
                        style={{ flex: 1, minWidth: "fit-content", padding: "7px 10px", borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: "pointer", background: WHITE, color: CARD_COLORS[i], border: `1px solid ${CARD_COLORS[i]}50`, textDecoration: "none", textAlign: "center", whiteSpace: "nowrap" }}>
                        {s.label} →
                      </a>
                    ))}
                  </div>
                )}
                {d.samples && d.samples.length === 0 && (
                  <div style={{ fontSize: 11, color: "#9CA3AF", fontStyle: "italic", textAlign: "center", padding: "4px 0" }}>Sample available on request</div>
                )}
                {/* Order button */}
                <button
                  onClick={() => window.open("https://wa.me/919579453635?text=Hi%20FinsightOne%2C%20I%20need%20a%20" + encodeURIComponent(d.name), "_blank")}
                  style={{ padding: "10px 14px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", background: CARD_COLORS[i], color: WHITE, border: "none", width: "100%", fontFamily: "inherit" }}>
                  Enquire on WhatsApp →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div style={{ background: GRAY, padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", color: ORANGE, marginBottom: 10, textAlign: "center" }}>Process</div>
        <h2 style={{ fontSize: "clamp(22px,3vw,28px)", fontWeight: 900, textAlign: "center", marginBottom: 36, color: DARK }}>How Document Preparation Works</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 20, maxWidth: 900, margin: "0 auto" }}>
          {[
            { num: "1", title: "Share your case", desc: "Send us basic details on WhatsApp — loan type, amount, and available financials." },
            { num: "2", title: "We confirm scope", desc: "We confirm which documents are needed and the expected TAT — usually 24–72 hours." },
            { num: "3", title: "You share inputs", desc: "Share remaining documents via Google Drive, email, or WhatsApp as agreed." },
            { num: "4", title: "Draft + Final delivery", desc: "We share a draft for your review. Final PDF delivered after corrections." },
          ].map(s => (
            <div key={s.num} style={{ textAlign: "center" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: INDIGO, color: WHITE, fontSize: 17, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>{s.num}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: DARK, marginBottom: 6 }}>{s.title}</div>
              <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.5 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div style={{ background: DARK, padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 900, color: WHITE, marginBottom: 12 }}>Ready to Get Your Documents Prepared?</h2>
        <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 28 }}>Start with a free eligibility check — we will tell you exactly which documents you need.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => navigate("check")} style={{ background: ORANGE, color: WHITE, fontSize: 14, fontWeight: 700, padding: "13px 28px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
            Check My Eligibility — Free →
          </button>
          <button onClick={() => window.open("https://wa.me/919579453635?text=Hi%20FinsightOne%2C%20I%20need%20loan%20documents%20prepared", "_blank")} style={{ background: "transparent", color: WHITE, fontSize: 14, fontWeight: 600, padding: "13px 28px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", fontFamily: "inherit" }}>
            WhatsApp Us Directly
          </button>
        </div>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}
