import { C, FONT_HEAD, FONT_BODY } from "../tokens";
import { HOW } from "../data";

export default function Process() {
  return (
    <section id="process" style={{ padding: "80px 24px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.purple, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>How We Work</div>
          <h2 style={{ fontFamily: FONT_HEAD, fontSize: "clamp(24px, 4vw, 38px)", color: C.white, margin: 0 }}>Simple. Transparent. Results First.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {HOW.map((s) => (
            <div key={s.step} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24, textAlign: "center" }}>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 11, color: C.purple, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>{s.step}</div>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{s.icon}</div>
              <h3 style={{ fontFamily: FONT_HEAD, fontSize: 17, color: C.white, margin: "0 0 10px" }}>{s.title}</h3>
              <p style={{ fontFamily: FONT_BODY, fontSize: 12, color: C.muted, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
