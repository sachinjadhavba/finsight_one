import { C, FONT_HEAD, FONT_BODY } from "../tokens";
import { PROPRIETOR, CITY, EMAIL, DOMAIN } from "../config";

const LINKS = [
  ["Services", "#services"],
  ["Digital", "#digital"],
  ["Case Study", "#case"],
  ["Process", "#process"],
  ["Contact", "#contact"],
];

export default function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.border}`, padding: "28px 24px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: `linear-gradient(135deg,${C.purple},${C.purpleLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: "white" }}>F1</div>
          <div>
            <div style={{ fontFamily: FONT_HEAD, fontSize: 14, color: C.white }}>FinSight <span style={{ color: C.purpleLight }}>One</span></div>
            <div style={{ fontFamily: FONT_BODY, fontSize: 9, color: C.muted }}>{PROPRIETOR} · Proprietor · {CITY}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
          {LINKS.map(([l, h]) => (
            <a key={l} href={h} style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.muted, textDecoration: "none" }}>{l}</a>
          ))}
        </div>
        <div style={{ fontFamily: FONT_BODY, fontSize: 10, color: C.dimmed, textAlign: "right" }}>
          <div>© 2026 FinSight One · {DOMAIN}</div>
          <div>{EMAIL} · +91 95794 53635</div>
        </div>
      </div>
    </footer>
  );
}
