import { C, FONT_HEAD, FONT_BODY } from "../tokens";
import { TRUST } from "../data";

export default function WhyUs() {
  return (
    <section style={{ padding: "60px 24px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ background: `linear-gradient(135deg,${C.bgCard},${C.bgMid})`, border: `1px solid ${C.border}`, borderRadius: 20, padding: "48px 36px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 40, alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.gold, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Why FinSight One</div>
            <h2 style={{ fontFamily: FONT_HEAD, fontSize: "clamp(20px, 3vw, 30px)", color: C.white, margin: "0 0 16px", lineHeight: 1.2 }}>We've been inside the machine. We know what works.</h2>
            <p style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.muted, lineHeight: 1.8, margin: 0 }}>Most consultants read about banking. We worked inside it — evaluating credit files, building risk frameworks, making loan decisions. That inside knowledge now works for your side of the table.</p>
          </div>
          <div>
            {TRUST.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: `${C.gold}20`, border: `1px solid ${C.gold}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.gold }} />
                </div>
                <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: "#94A3B8", lineHeight: 1.6 }}>{item}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
