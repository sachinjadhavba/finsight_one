// ─── FINSIGHTONE LOGO COMPONENT ───
// G1.1 design + G1.4 split + Option 6 tagline
// White background only

export default function Logo({ size = "nav", onClick }) {
  const sizes = {
    nav:   { name: 20, tag: 7,  dot: 5,  gap: 6,  dotBot: 7  },
    med:   { name: 26, tag: 8.5,dot: 7,  gap: 8,  dotBot: 9  },
    large: { name: 38, tag: 10, dot: 9,  gap: 10, dotBot: 12 },
    hero:  { name: 48, tag: 11, dot: 11, gap: 12, dotBot: 14 },
  };
  const s = sizes[size] || sizes.nav;

  return (
    <div onClick={onClick} style={{ cursor: onClick ? "pointer" : "default", display: "inline-flex", flexDirection: "column", alignItems: "flex-start", userSelect: "none" }}>
      {/* WORDMARK ROW */}
      <div style={{ display: "flex", alignItems: "baseline", lineHeight: 1 }}>
        <span style={{ fontFamily: "Arial,'Helvetica Neue',sans-serif", fontSize: s.name, fontWeight: 900, color: "#4F46E5", letterSpacing: "-0.03em" }}>
          Fin
        </span>
        <span style={{ fontFamily: "Arial,'Helvetica Neue',sans-serif", fontSize: s.name, fontWeight: 900, color: "#111827", letterSpacing: "-0.03em" }}>
          sight
        </span>
        <span style={{ fontFamily: "Arial,'Helvetica Neue',sans-serif", fontSize: s.name, fontWeight: 200, color: "#4F46E5", letterSpacing: "-0.02em" }}>
          &nbsp;One
        </span>
        <span style={{ display: "inline-block", width: s.dot, height: s.dot, background: "#EA580C", borderRadius: "50%", marginLeft: 3, marginBottom: s.dotBot, flexShrink: 0 }} />
      </div>
      {/* TAGLINE ROW */}
      <div style={{ display: "flex", alignItems: "center", marginTop: 2 }}>
        <span style={{ fontFamily: "Arial,'Helvetica Neue',sans-serif", fontSize: s.tag, fontWeight: 800, color: "#111827", letterSpacing: "0.2em" }}>CREDIT</span>
        <span style={{ color: "#FED7AA", fontSize: s.tag + 1, margin: "0 4px", lineHeight: 1 }}>·</span>
        <span style={{ fontFamily: "Arial,'Helvetica Neue',sans-serif", fontSize: s.tag, fontWeight: 800, color: "#EA580C", letterSpacing: "0.2em" }}>ADVISORY</span>
        <span style={{ color: "#FED7AA", fontSize: s.tag + 1, margin: "0 4px", lineHeight: 1 }}>·</span>
        <span style={{ fontFamily: "Arial,'Helvetica Neue',sans-serif", fontSize: s.tag, fontWeight: 800, color: "#111827", letterSpacing: "0.2em" }}>INTELLIGENCE</span>
      </div>
    </div>
  );
}
