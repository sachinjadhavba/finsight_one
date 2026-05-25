import { useState } from "react";

const NAVY = "#0D1428";
const GOLD = "#E8A020";
const WHITE = "#fff";

const DROPDOWNS = {
  services: {
    label: "Services",
    items: [
      { id: "check",     label: "Check Loan Eligibility",   desc: "Free AI-powered eligibility check" },
      { id: "check",     label: "Loan Readiness Reports",   desc: "Detailed credit reports from ₹499" },
      { id: "analytics", label: "Monthly Tracking Plans",   desc: "Business health monitoring" },
      { id: "advisory",  label: "Expert Advisory",          desc: "One-on-one with 20-year bankers" },
      { id: "advisory",  label: "Document Preparation",     desc: "CAM, CMA, DPR bank-ready files" },
    ],
  },
  who: {
    label: "Who We Help",
    items: [
      { id: "msme",        label: "MSMEs & SMEs",          desc: "Working capital, LAP, machinery loans" },
      { id: "individuals", label: "Individuals",            desc: "Home loan, personal loan, vehicle" },
      { id: "partners",    label: "CA & DSA Partners",     desc: "Earn up to 45% DSA payout" },
    ],
  },
  knowledge: {
    label: "Knowledge Hub",
    items: [
      { id: "casestudies", label: "Case Studies",           desc: "Real loan approvals — anonymised" },
      { id: "blog",        label: "Credit Advisory Blog",   desc: "Tips from 20 years of banking" },
      { id: "why",         label: "Why FinSight One",       desc: "vs DSA vs Bank vs CA" },
    ],
  },
};

export default function Nav({ page, navigate }) {
  const [open, setOpen] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const close = () => setOpen(null);
  const toggle = (key) => setOpen(open === key ? null : key);

  const go = (id) => { navigate(id); close(); setMobileOpen(false); };

  return (
    <>
      {/* Overlay for dropdowns */}
      {(open || mobileOpen) && (
        <div onClick={() => { close(); setMobileOpen(false); }}
          style={{ position: "fixed", inset: 0, zIndex: 150 }} />
      )}

      <nav style={{
        background: NAVY,
        position: "sticky", top: 0, zIndex: 200,
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}>
        {/* MAIN BAR */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 clamp(16px, 3vw, 40px)", height: 64, maxWidth: 1400, margin: "0 auto",
        }}>
          {/* LOGO */}
          <div onClick={() => go("home")} style={{ cursor: "pointer", flexShrink: 0 }}>
            <svg width="180" height="36" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="20" r="12" fill="none" stroke="#E8A020" strokeWidth="1" opacity="0.4"/>
              <polygon points="18,8 21,15 18,13 15,15" fill="#E8A020"/>
              <circle cx="18" cy="20" r="2.5" fill="#E8A020"/>
              <line x1="34" y1="8" x2="34" y2="32" stroke="#E8A020" strokeWidth="0.6" opacity="0.3"/>
              <text x="40" y="26" fontFamily="Georgia,serif" fontSize="16" fontWeight="700">
                <tspan fill="#fff">FIN</tspan><tspan fill="#E8A020">SIGHT</tspan>
                <tspan fill="#fff" fontSize="14" opacity="0.6"> ONE</tspan>
              </text>
            </svg>
          </div>

          {/* DESKTOP LINKS */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, "@media(max-width:768px)": { display: "none" } }}
            className="nav-desktop">
            {Object.entries(DROPDOWNS).map(([key, dd]) => (
              <div key={key} style={{ position: "relative" }}>
                <button onClick={() => toggle(key)} style={{
                  background: open === key ? "rgba(255,255,255,0.07)" : "transparent",
                  border: "none", cursor: "pointer",
                  padding: "8px 12px", borderRadius: 6,
                  display: "flex", alignItems: "center", gap: 4,
                  color: open === key ? GOLD : "rgba(255,255,255,0.75)",
                  fontSize: 13, fontWeight: 500, fontFamily: "inherit",
                }}>
                  {dd.label}
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                    style={{ transform: open === key ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                    <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>

                {open === key && (
                  <div style={{
                    position: "absolute", top: "calc(100% + 8px)", left: 0,
                    background: WHITE, borderRadius: 10, minWidth: 240,
                    border: "1px solid #E5E7EB",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    zIndex: 300, overflow: "hidden",
                  }}>
                    {dd.items.map((item, i) => (
                      <div key={i} onClick={() => go(item.id)} style={{
                        padding: "12px 16px", cursor: "pointer",
                        borderBottom: i < dd.items.length - 1 ? "1px solid #F3F4F6" : "none",
                        transition: "background 0.15s",
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = "#F9FAFB"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#111827", marginBottom: 2 }}>{item.label}</div>
                        <div style={{ fontSize: 11.5, color: "#6B7280" }}>{item.desc}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button onClick={() => go("about")} style={{
              background: "transparent", border: "none", cursor: "pointer",
              padding: "8px 12px", borderRadius: 6,
              color: "rgba(255,255,255,0.75)", fontSize: 13, fontWeight: 500, fontFamily: "inherit",
            }}>About Us</button>
          </div>

          {/* DESKTOP RIGHT */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }} className="nav-desktop">
            <button onClick={() => go("partners")} style={{
              background: "transparent", border: "1px solid rgba(255,255,255,0.2)",
              color: WHITE, fontSize: 12, fontWeight: 500, padding: "7px 14px",
              borderRadius: 6, cursor: "pointer", fontFamily: "inherit",
              whiteSpace: "nowrap",
            }}>Partner Login</button>
            <button onClick={() => go("check")} style={{
              background: GOLD, color: WHITE, fontSize: 12, fontWeight: 700,
              padding: "8px 16px", borderRadius: 6, border: "none",
              cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap",
            }}>Check Eligibility — Free</button>
          </div>

          {/* MOBILE HAMBURGER */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="nav-mobile-btn" style={{
            background: "transparent", border: "none", cursor: "pointer",
            color: WHITE, fontSize: 22, padding: "8px", display: "none",
          }}>☰</button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div style={{
            background: "#111828", borderTop: "1px solid rgba(255,255,255,0.07)",
            padding: "16px 20px", zIndex: 250,
          }}>
            {Object.entries(DROPDOWNS).map(([key, dd]) => (
              <div key={key} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: 1.5,
                  textTransform: "uppercase", marginBottom: 8 }}>{dd.label}</div>
                {dd.items.map((item, i) => (
                  <div key={i} onClick={() => go(item.id)} style={{
                    padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)",
                    fontSize: 14, color: "rgba(255,255,255,0.8)", cursor: "pointer",
                  }}>{item.label}</div>
                ))}
              </div>
            ))}
            <div onClick={() => go("about")} style={{ padding: "10px 0", fontSize: 14, color: "rgba(255,255,255,0.8)", cursor: "pointer", marginBottom: 16 }}>About Us</div>
            <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
              <button onClick={() => go("partners")} style={{
                background: "transparent", border: "1px solid rgba(255,255,255,0.2)",
                color: WHITE, fontSize: 13, fontWeight: 500, padding: "12px",
                borderRadius: 6, cursor: "pointer", fontFamily: "inherit",
              }}>Partner Login</button>
              <button onClick={() => go("check")} style={{
                background: GOLD, color: WHITE, fontSize: 13, fontWeight: 700,
                padding: "12px", borderRadius: 6, border: "none",
                cursor: "pointer", fontFamily: "inherit",
              }}>Check Eligibility — Free</button>
            </div>
          </div>
        )}
      </nav>

      {/* CSS for desktop/mobile toggle */}
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-btn { display: none !important; }
          .nav-desktop { display: flex !important; }
        }
      `}</style>
    </>
  );
}
