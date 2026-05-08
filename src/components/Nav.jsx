export default function Nav({ page, navigate }) {
  const links = [
    { id: "home", label: "Home" },
    { id: "check", label: "Check Loan Eligibility" },
    { id: "analytics", label: "Monthly Tracking" },
    { id: "advisory", label: "Advisory & Documents" },
    { id: "about", label: "About Us" },
  ];
  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 48px", height: 64, background: "#fff",
      borderBottom: "1px solid #E5E7EB", position: "sticky", top: 0, zIndex: 200,
    }}>
      <div onClick={() => navigate("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
        <svg width="300" height="64" viewBox="0 0 260 56" xmlns="http://www.w3.org/2000/svg">
          <circle cx="26" cy="28" r="18" fill="none" stroke="#B45309" strokeWidth="1.2" opacity="0.35"/>
          <polygon points="26,11 29,20 26,18 23,20" fill="#B45309"/>
          <polygon points="26,45 29,36 26,38 23,36" fill="#D1D5DB"/>
          <polygon points="43,28 34,25 36,28 34,31" fill="#D1D5DB"/>
          <polygon points="9,28 18,25 16,28 18,31" fill="#D1D5DB"/>
          <circle cx="26" cy="28" r="3" fill="#B45309"/>
          <circle cx="26" cy="28" r="1.2" fill="#fff"/>
          <line x1="52" y1="10" x2="52" y2="46" stroke="#B45309" strokeWidth="0.8" opacity="0.3"/>
          <text x="60" y="34" fontFamily="Georgia,serif" fontSize="22" fontWeight="700" letterSpacing="0.5">
            <tspan fill="#1E3A5F">FIN</tspan><tspan fill="#B45309">SIGHT</tspan><tspan fill="#1E3A5F" fontWeight="400" opacity="0.5" fontSize="20"> ONE</tspan>
          </text>
        </svg>
      </div>
      <div style={{ display: "flex", gap: 24 }}>
        {links.map(l => (
          <span key={l.id} onClick={() => navigate(l.id)} style={{
            fontSize: 13, color: page === l.id ? "#111827" : "#6B7280",
            fontWeight: page === l.id ? 700 : 500, cursor: "pointer",
            borderBottom: page === l.id ? "2px solid #B45309" : "2px solid transparent",
            paddingBottom: 2, transition: "color 0.2s",
          }}>{l.label}</span>
        ))}
      </div>
      <button onClick={() => navigate("check")} style={{
        background: "#B45309", color: "#fff", fontSize: 12, fontWeight: 700,
        padding: "9px 20px", borderRadius: 8, border: "none", cursor: "pointer",
      }}>
        Check My Eligibility — Free
      </button>
    </nav>
  );
}
