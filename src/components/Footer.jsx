const NAVY = "#060D1C";
const GOLD = "#E8A020";

export default function Footer({ navigate }) {
  const cols = [
    {
      title: "Services",
      links: [
        ["check",     "Check Eligibility — Free"],
        ["check",     "Loan Readiness Reports"],
        ["analytics", "Monthly Tracking Plans"],
        ["advisory",  "Expert Advisory"],
        ["advisory",  "Document Preparation"],
      ],
    },
    {
      title: "Who We Help",
      links: [
        ["msme",        "MSMEs & SMEs"],
        ["individuals", "Individuals"],
        ["partners",    "CA & DSA Partners"],
      ],
    },
    {
      title: "Company",
      links: [
        ["about",       "About Us"],
        ["why",         "Why FinSight One"],
        ["casestudies", "Case Studies"],
        ["blog",        "Blog"],
      ],
    },
    {
      title: "Contact",
      links: [],
      custom: [
        { icon: "💬", text: "WhatsApp: 9579453635", href: "https://wa.me/919579453635" },
        { icon: "✉️",  text: "info@finsightone.co",  href: "mailto:info@finsightone.co" },
        { icon: "🌐", text: "finsightone.co",         href: "https://finsightone.co" },
        { icon: "📍", text: "Pune, Maharashtra",       href: null },
      ],
    },
  ];

  const linkStyle = {
    fontSize: 13, color: "#64748B", cursor: "pointer",
    marginBottom: 10, display: "block", textDecoration: "none",
  };

  return (
    <footer style={{ background: NAVY, paddingTop: 56 }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: "0 clamp(20px,4vw,48px) 48px",
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr 1.3fr",
        gap: 32,
      }}>
        {/* Brand */}
        <div>
          <div style={{ marginBottom: 14 }}>
            <span style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>FIN</span>
            <span style={{ fontSize: 20, fontWeight: 900, color: GOLD }}>SIGHT</span>
            <span style={{ fontSize: 20, fontWeight: 400, color: "rgba(255,255,255,0.45)" }}> ONE</span>
          </div>
          <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.8, maxWidth: 240, marginBottom: 20 }}>
            Built by bankers. For people who need loans. 20 years inside Indian banking credit teams.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["₹0 to Check", "275+ Lenders", "72hr TAT", "20 Yrs"].map(t => (
              <div key={t} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4, padding: "3px 7px", fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.45)" }}>{t}</div>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {cols.map(col => (
          <div key={col.title}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 16 }}>
              {col.title}
            </div>
            {col.links.map(([pg, label]) => (
              <div key={label} onClick={() => navigate(pg)}
                style={linkStyle}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = "#64748B"}
              >{label}</div>
            ))}
            {col.custom && col.custom.map(item => (
              item.href
                ? <a key={item.text} href={item.href} target="_blank" rel="noopener"
                    style={{ ...linkStyle, display: "flex", alignItems: "center", gap: 8 }}
                    onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                    onMouseLeave={e => e.currentTarget.style.color = "#64748B"}
                  >
                    <span>{item.icon}</span>{item.text}
                  </a>
                : <div key={item.text} style={{ ...linkStyle, display: "flex", alignItems: "center", gap: 8 }}>
                    <span>{item.icon}</span>{item.text}
                  </div>
            ))}
          </div>
        ))}
      </div>

      {/* Mobile responsive override */}
      <style>{`
        @media (max-width: 860px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "18px clamp(20px,4vw,48px)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <div style={{ fontSize: 12, color: "#4B5563" }}>
          © 2025 FinSight One · Sachin Jadhav · Pune, Maharashtra
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {[["Privacy Policy","#"],["Terms of Use","#"],["UDYAM: MH-04-XXXXX","#"]].map(([t,h]) => (
            <a key={t} href={h} style={{ fontSize: 11, color: "#4B5563", textDecoration: "none" }}>{t}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
