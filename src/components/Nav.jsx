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
      <div onClick={() => navigate("home")} style={{ fontSize: 20, fontWeight: 900, letterSpacing: 1.5, cursor: "pointer" }}>
        FINSIGHT<span style={{ color: "#B45309" }}>ONE</span>
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
