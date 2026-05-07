import { useState } from "react";
import { C, FONT_HEAD, FONT_BODY } from "../tokens";
import { SERVICES } from "../data";

export default function Services() {
  const [hov, setHov] = useState(null);
  return (
    <section id="services" style={{ padding: "80px 24px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.purple, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>What We Do</div>
          <h2 style={{ fontFamily: FONT_HEAD, fontSize: "clamp(26px, 4vw, 40px)", color: C.white, margin: 0 }}>How We Help You</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
          {SERVICES.map((svc, i) => (
            <div key={svc.id} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{ background: C.bgCard, border: `1px solid ${hov === i ? svc.color + "60" : C.border}`, borderRadius: 16, padding: 24, transition: "all 0.3s", transform: hov === i ? "translateY(-4px)" : "none", boxShadow: hov === i ? `0 20px 60px ${svc.color}15` : "none", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: hov === i ? `linear-gradient(90deg,transparent,${svc.color}80,transparent)` : "transparent", transition: "all 0.3s" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 28 }}>{svc.icon}</span>
                <span style={{ fontFamily: FONT_BODY, fontSize: 9, fontWeight: 800, color: svc.color, letterSpacing: 1.5, textTransform: "uppercase" }}>{svc.tag}</span>
              </div>
              <h3 style={{ fontFamily: FONT_HEAD, fontSize: 20, color: C.white, margin: "0 0 10px" }}>{svc.title}</h3>
              <p style={{ fontFamily: FONT_BODY, fontSize: 12, color: C.muted, lineHeight: 1.7, margin: "0 0 16px" }}>{svc.desc}</p>
              {svc.points.map((pt, j) => (
                <div key={j} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: svc.color, flexShrink: 0, marginTop: 6 }} />
                  <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: "#94A3B8", lineHeight: 1.5 }}>{pt}</div>
                </div>
              ))}
              <div style={{ marginTop: 16, padding: "8px 12px", background: `${svc.color}12`, border: `1px solid ${svc.color}25`, borderRadius: 8 }}>
                <div style={{ fontFamily: FONT_BODY, fontSize: 10, color: svc.color, fontWeight: 700 }}>{svc.fee}</div>
              </div>
              <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: FONT_BODY, fontSize: 10, color: C.dimmed }}>For: {svc.target}</span>
                <span style={{ fontFamily: FONT_BODY, fontSize: 10, color: svc.color, fontWeight: 700, cursor: "pointer" }} onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>{svc.cta} →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
