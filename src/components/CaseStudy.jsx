import { C, FONT_HEAD, FONT_BODY } from "../tokens";
import { OUTCOMES } from "../data";

export default function CaseStudy() {
  return (
    <section id="case" style={{ padding: "80px 24px", position: "relative", zIndex: 1, background: `linear-gradient(180deg,transparent,${C.bgMid}60,transparent)` }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.green, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Case Study</div>
          <h2 style={{ fontFamily: FONT_HEAD, fontSize: "clamp(22px, 4vw, 36px)", color: C.white, margin: 0, lineHeight: 1.2 }}>ML Analytics Platform for a ₹3,000Cr Agri Company</h2>
        </div>
        <div style={{ background: C.bgCard, border: `1px solid ${C.green}30`, borderRadius: 20, overflow: "hidden" }}>
          <div style={{ background: `linear-gradient(135deg,${C.green}15,${C.purple}15)`, borderBottom: `1px solid ${C.border}`, padding: "18px 28px", display: "flex", gap: 24, flexWrap: "wrap" }}>
            {[["Client", "Leading Agri-Input Company"], ["Scale", "₹3,000Cr+ Annual Turnover"], ["Sector", "Agri Inputs & Crop Nutrition"]].map(([k, v]) => (
              <div key={k}>
                <div style={{ fontFamily: FONT_BODY, fontSize: 10, color: C.muted, marginBottom: 2 }}>{k}</div>
                <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.white, fontWeight: 700 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: 28 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, marginBottom: 24 }}>
              <div>
                <div style={{ fontFamily: FONT_BODY, fontSize: 10, color: "#ef4444", fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>The Problem</div>
                <p style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.muted, lineHeight: 1.8, margin: 0 }}>Field teams making credit decisions for 1,000+ farmer accounts on gut feel. No repayment risk data. No early warning system. No visibility on cross-sell opportunity.</p>
              </div>
              <div>
                <div style={{ fontFamily: FONT_BODY, fontSize: 10, color: C.green, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Our Solution</div>
                <p style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.muted, lineHeight: 1.8, margin: 0 }}>Full Farmer Analytics Platform with ML-based credit scoring. Integrated field sales data, repayment history, and crop patterns into a real-time dashboard for branch managers.</p>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginBottom: 18 }}>
              {OUTCOMES.map((o) => (
                <div key={o.metric} style={{ background: `${C.green}10`, border: `1px solid ${C.green}25`, borderRadius: 12, padding: "14px 8px", textAlign: "center" }}>
                  <div style={{ fontFamily: FONT_HEAD, fontSize: 20, color: C.green, marginBottom: 4 }}>{o.metric}</div>
                  <div style={{ fontFamily: FONT_BODY, fontSize: 10, color: C.muted, lineHeight: 1.3 }}>{o.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontFamily: FONT_BODY, fontSize: 10, color: C.muted }}>Built with:</span>
              {["Python (Pandas, Scikit-learn)", "SQLite", "Power BI", "GradientBoosting ML"].map(t => (
                <div key={t} style={{ fontFamily: FONT_BODY, fontSize: 10, background: C.dimmed, color: "#94A3B8", padding: "3px 10px", borderRadius: 20 }}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
