const DARK   = "#111827";
const INDIGO = "#4F46E5";
const ORANGE = "#EA580C";

export default function Footer({ navigate }) {
  const cols = [
    { title: "Services", links: [["check","Check Eligibility — Free"],["check","Loan Readiness Reports"],["analytics","Monthly Tracking Plans"],["advisory","Expert Advisory"],["advisory","Document Preparation"]] },
    { title: "Who We Help", links: [["msme","MSMEs & SMEs"],["individuals","Individuals"],["partners","CA & DSA Partners"]] },
    { title: "Company", links: [["about","About Us"],["why","Why FinSight One"],["casestudies","Case Studies"],["blog","Blog"]] },
    { title: "Contact", links: [], custom: [
      { icon: "💬", text: "WhatsApp: 9579453635", href: "https://wa.me/919579453635" },
      { icon: "✉️",  text: "info@finsightone.co",  href: "mailto:info@finsightone.co" },
      { icon: "🌐", text: "finsightone.co",         href: "https://finsightone.co" },
      { icon: "📍", text: "Pune, Maharashtra",       href: null },
    ]},
  ];

  const lStyle = { fontSize: 13, color: "#6B7280", cursor: "pointer", marginBottom: 10, display: "block", textDecoration: "none" };

  return (
    <footer style={{ background: DARK, paddingTop: 56 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,4vw,48px) 48px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.3fr", gap: 32 }}>
        {/* Brand */}
        <div>
          {/* Logo on dark */}
          <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "flex-start", marginBottom: 16, cursor: "pointer" }} onClick={() => navigate("home")}>
            <div style={{ display: "flex", alignItems: "baseline", lineHeight: 1 }}>
              <span style={{ fontFamily: "Arial,sans-serif", fontSize: 20, fontWeight: 900, color: "#818CF8", letterSpacing: "-0.03em" }}>Fin</span>
              <span style={{ fontFamily: "Arial,sans-serif", fontSize: 20, fontWeight: 900, color: "#fff",    letterSpacing: "-0.03em" }}>sight</span>
              <span style={{ fontFamily: "Arial,sans-serif", fontSize: 20, fontWeight: 200, color: "#818CF8", letterSpacing: "-0.02em" }}>&nbsp;One</span>
              <span style={{ display: "inline-block", width: 5, height: 5, background: ORANGE, borderRadius: "50%", marginLeft: 3, marginBottom: 7, flexShrink: 0 }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", marginTop: 2 }}>
              <span style={{ fontSize: 7, fontWeight: 800, color: "rgba(255,255,255,0.5)", letterSpacing: "0.2em", fontFamily: "Arial,sans-serif" }}>CREDIT</span>
              <span style={{ color: ORANGE, fontSize: 9, margin: "0 3px" }}>·</span>
              <span style={{ fontSize: 7, fontWeight: 800, color: ORANGE, letterSpacing: "0.2em", fontFamily: "Arial,sans-serif" }}>ADVISORY</span>
              <span style={{ color: ORANGE, fontSize: 9, margin: "0 3px" }}>·</span>
              <span style={{ fontSize: 7, fontWeight: 800, color: "rgba(255,255,255,0.5)", letterSpacing: "0.2em", fontFamily: "Arial,sans-serif" }}>INTELLIGENCE</span>
            </div>
          </div>
          <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.8, maxWidth: 240, marginBottom: 20 }}>
            Built by bankers. For people who need loans. 20 years inside Indian banking credit teams.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["₹0 to Check", "PAN India", "72hr TAT", "20 Yrs"].map(t => (
              <div key={t} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, padding: "3px 8px", fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.4)" }}>{t}</div>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {cols.map(col => (
          <div key={col.title}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 16 }}>{col.title}</div>
            {col.links.map(([pg, label]) => (
              <div key={label} onClick={() => navigate(pg)} style={lStyle}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = "#6B7280"}
              >{label}</div>
            ))}
            {col.custom && col.custom.map(item => (
              item.href
                ? <a key={item.text} href={item.href} target="_blank" rel="noopener"
                    style={{ ...lStyle, display: "flex", alignItems: "center", gap: 8 }}
                    onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                    onMouseLeave={e => e.currentTarget.style.color = "#6B7280"}
                  ><span>{item.icon}</span>{item.text}</a>
                : <div key={item.text} style={{ ...lStyle, display: "flex", alignItems: "center", gap: 8 }}><span>{item.icon}</span>{item.text}</div>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "18px clamp(20px,4vw,48px)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <div style={{ fontSize: 12, color: "#4B5563" }}>© 2025 FinsightOne · Pune, Maharashtra</div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <span onClick={() => navigate("privacypolicy")} style={{ fontSize: 11, color: "#4B5563", textDecoration: "none", cursor: "pointer" }}>Privacy Policy</span>
          <span onClick={() => navigate("termsofuse")} style={{ fontSize: 11, color: "#4B5563", textDecoration: "none", cursor: "pointer" }}>Terms of Use</span>
          <span onClick={() => navigate("refundpolicy")} style={{ fontSize: 11, color: "#4B5563", textDecoration: "none", cursor: "pointer" }}>Refund Policy</span>
          <span style={{ fontSize: 11, color: "#4B5563" }}>UDYAM: MH-04-XXXXX</span>
        </div>
      </div>
    </footer>
  );
}
