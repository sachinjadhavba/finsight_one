import { useState } from "react";

const INDIGO = "#4F46E5";
const ORANGE = "#EA580C";
const DARK   = "#111827";
const WHITE  = "#fff";

const DROPDOWNS = {
  services: {
    label: "Services",
    items: [
      { id: "check",     label: "Apply for a Loan",          desc: "Free — we match you with the right lender" },
      { id: "readiness", label: "Loan Readiness Check",     desc: "Detailed credit reports from ₹799" },
      { id: "analytics", label: "Monthly Tracking Plans",   desc: "Business health monitoring from ₹499/mo" },
      { id: "docs",      label: "Document Preparation",     desc: "LAN, CMA, DPR — banker-ready in 72 hours" },
      { id: "advisory",  label: "Expert Advisory",          desc: "One-on-one loan structuring & recovery" },
    ],
  },
  who: {
    label: "Who We Help",
    items: [
      { id: "msme",        label: "MSMEs & SMEs",          desc: "Working capital, LAP, machinery loans" },
      { id: "individuals", label: "Individuals",            desc: "Home loan, personal loan, vehicle" },
      { id: "partners",    label: "CA & DSA Partners",     desc: "Refer clients — earn on every case" },
    ],
  },
  knowledge: {
    label: "Knowledge Hub",
    items: [
      { id: "casestudies", label: "Case Studies",           desc: "Real loan approvals — anonymised" },
      { id: "blog",        label: "Credit Advisory Blog",   desc: "Tips from 20 years of banking" },
      { id: "why",         label: "Why FinsightOne",        desc: "vs DSA vs Bank vs CA — honest comparison" },
    ],
  },
};

function Logo({ navigate }) {
  return (
    <div onClick={() => navigate("home")} style={{ cursor: "pointer", display: "inline-flex", flexDirection: "column", alignItems: "flex-start", userSelect: "none" }}>
      <div style={{ display: "flex", alignItems: "baseline", lineHeight: 1 }}>
        <span style={{ fontFamily: "Arial,'Helvetica Neue',sans-serif", fontSize: 28, fontWeight: 900, color: INDIGO, letterSpacing: "-0.03em" }}>Fin</span>
        <span style={{ fontFamily: "Arial,'Helvetica Neue',sans-serif", fontSize: 28, fontWeight: 900, color: DARK,   letterSpacing: "-0.03em" }}>sight</span>
        <span style={{ fontFamily: "Arial,'Helvetica Neue',sans-serif", fontSize: 28, fontWeight: 200, color: INDIGO, letterSpacing: "-0.02em" }}>&nbsp;One</span>
        <span style={{ display: "inline-block", width: 7, height: 7, background: ORANGE, borderRadius: "50%", marginLeft: 3, marginBottom: 9, flexShrink: 0 }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", marginTop: 2 }}>
        <span style={{ fontSize: 8.5, fontWeight: 800, color: DARK,   letterSpacing: "0.2em", fontFamily: "Arial,sans-serif" }}>CREDIT</span>
        <span style={{ color: "#FED7AA", fontSize: 10, margin: "0 4px", lineHeight: 1 }}>·</span>
        <span style={{ fontSize: 8.5, fontWeight: 800, color: ORANGE, letterSpacing: "0.2em", fontFamily: "Arial,sans-serif" }}>ADVISORY</span>
        <span style={{ color: "#FED7AA", fontSize: 10, margin: "0 4px", lineHeight: 1 }}>·</span>
        <span style={{ fontSize: 8.5, fontWeight: 800, color: DARK,   letterSpacing: "0.2em", fontFamily: "Arial,sans-serif" }}>INTELLIGENCE</span>
      </div>
    </div>
  );
}

export default function Nav({ page, navigate }) {
  const [open, setOpen]         = useState(null);
  const [mobileOpen, setMobile] = useState(false);
  const close = () => setOpen(null);
  const toggle = (k) => setOpen(open === k ? null : k);
  const go = (id) => { navigate(id); close(); setMobile(false); };

  return (
    <>
      {(open || mobileOpen) && (
        <div onClick={() => { close(); setMobile(false); }}
          style={{ position: "fixed", inset: 0, zIndex: 150 }} />
      )}
      <nav style={{ background: "#FAFBFF", borderBottom: "2px solid #E0E7FF", position: "sticky", top: 0, zIndex: 200, boxShadow: "0 2px 16px rgba(79,70,229,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 clamp(16px,3vw,40px)", height: 72, maxWidth: 1400, margin: "0 auto" }}>
          <Logo navigate={navigate} />
          {/* DESKTOP */}
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {Object.entries(DROPDOWNS).map(([key, dd]) => (
              <div key={key} style={{ position: "relative" }}>
                <button onClick={() => toggle(key)} style={{ background: open === key ? "#EEF2FF" : "transparent", border: "none", cursor: "pointer", padding: "8px 14px", borderRadius: 6, display: "flex", alignItems: "center", gap: 4, color: open === key ? INDIGO : "#374151", fontSize: 14, fontWeight: 500, fontFamily: "inherit" }}>
                  {dd.label}
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: open === key ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                    <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
                {open === key && (
                  <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, background: WHITE, borderRadius: 12, minWidth: 260, border: "1px solid #E5E7EB", boxShadow: "0 8px 32px rgba(79,70,229,0.12)", zIndex: 300, overflow: "hidden" }}>
                    {dd.items.map((item, i) => (
                      <div key={i} onClick={() => go(item.id)} style={{ padding: "12px 16px", cursor: "pointer", borderBottom: i < dd.items.length - 1 ? "1px solid #F3F4F6" : "none" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#F9FAFB"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: DARK, marginBottom: 2 }}>{item.label}</div>
                        <div style={{ fontSize: 11.5, color: "#6B7280" }}>{item.desc}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button onClick={() => go("about")} style={{ background: "transparent", border: "none", cursor: "pointer", padding: "8px 14px", borderRadius: 6, color: "#374151", fontSize: 14, fontWeight: 500, fontFamily: "inherit" }}>About Us</button>
          </div>
          {/* RIGHT */}
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <button onClick={() => go("partnerlogin")} style={{ background: INDIGO, border: "none", color: WHITE, fontSize: 13, fontWeight: 600, padding: "9px 18px", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>Partner Login</button>
            <button onClick={() => go("check")} style={{ background: ORANGE, color: WHITE, fontSize: 13, fontWeight: 700, padding: "9px 18px", borderRadius: 6, border: "none", cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", boxShadow: "0 2px 8px rgba(234,88,12,0.3)" }}>Check Eligibility — Free</button>
          </div>
          <button onClick={() => setMobile(!mobileOpen)} className="nav-mobile-btn" style={{ background: "transparent", border: "none", cursor: "pointer", color: DARK, fontSize: 22, padding: 8, display: "none" }}>☰</button>
        </div>
        {mobileOpen && (
          <div style={{ background: WHITE, borderTop: "1px solid #E5E7EB", padding: "16px 20px" }}>
            {Object.entries(DROPDOWNS).map(([key, dd]) => (
              <div key={key} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: ORANGE, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>{dd.label}</div>
                {dd.items.map((item, i) => (
                  <div key={i} onClick={() => go(item.id)} style={{ padding: "10px 0", borderBottom: "1px solid #F3F4F6", fontSize: 14, color: DARK, cursor: "pointer" }}>{item.label}</div>
                ))}
              </div>
            ))}
            <div onClick={() => go("about")} style={{ padding: "10px 0", fontSize: 14, color: DARK, cursor: "pointer", marginBottom: 16 }}>About Us</div>
            <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
              <button onClick={() => go("partnerlogin")} style={{ background: INDIGO, color: WHITE, fontSize: 13, fontWeight: 600, padding: 12, borderRadius: 6, border: "none", cursor: "pointer", fontFamily: "inherit" }}>Partner Login</button>
              <button onClick={() => go("check")} style={{ background: ORANGE, color: WHITE, fontSize: 13, fontWeight: 700, padding: 12, borderRadius: 6, border: "none", cursor: "pointer", fontFamily: "inherit" }}>Check Eligibility — Free</button>
            </div>
          </div>
        )}
      </nav>
      <style>{`
        @media (max-width: 768px) { .nav-desktop { display: none !important; } .nav-mobile-btn { display: flex !important; } }
        @media (min-width: 769px) { .nav-mobile-btn { display: none !important; } .nav-desktop { display: flex !important; } }
      `}</style>
    </>
  );
}

