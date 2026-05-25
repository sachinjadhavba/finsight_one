import Footer from "../components/Footer";

export default function Individuals({ navigate }) {
  return (
    <div>
      <div style={{ background: "#0D1428", padding: "clamp(44px,6vw,72px) clamp(20px,4vw,48px)", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(232,160,32,0.15)", border: "1px solid rgba(232,160,32,0.3)", color: "#E8A020", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "5px 16px", borderRadius: 100, marginBottom: 20 }}>For Salaried & Self-Employed Individuals</div>
        <h1 style={{ fontSize: "clamp(26px,3.5vw,44px)", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: 16 }}>
          Know <span style={{ color: "#E8A020" }}>Exactly What You Qualify For</span><br />Before Applying Anywhere
        </h1>
        <p style={{ fontSize: 16, color: "#94A3B8", maxWidth: 560, margin: "0 auto 32px", lineHeight: 1.7 }}>
          Most loan rejections are not credit rejections — they are preparation rejections. We tell you what to fix, which lender to approach, and what amount you actually qualify for.
        </p>
        <button onClick={() => navigate("check")} style={{ background: "#E8A020", color: "#fff", fontSize: 15, fontWeight: 700, padding: "14px 36px", borderRadius: 8, border: "none", cursor: "pointer" }}>
          Check My Eligibility — Free →
        </button>
      </div>

      <div style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB", padding: "20px 48px", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 16 }}>
        {[["CIBIL 700+","Minimum for home loan"],["FOIR 50%","Maximum EMI-to-income ratio"],["275+","Lender network"],["₹0","To check eligibility"]].map(([v,l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#0D1428" }}>{v}</div>
            <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* LOAN TYPES */}
      <div style={{ padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, color: "#E8A020", textTransform: "uppercase", marginBottom: 10 }}>What We Help With</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827" }}>All Individual Loan Products Covered</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16, maxWidth: 1000, margin: "0 auto" }}>
          {[
            { icon: "🏠", title: "Home Loan", foir: "Max FOIR 50%", cibil: "CIBIL min 700", desc: "We match you to the right lender based on your employment type, income structure, and property location. Salaried vs self-employed — different lenders, different rules.", lenders: "SBI, HDFC, ICICI, Bajaj Housing" },
            { icon: "💳", title: "Personal Loan", foir: "Max FOIR 45%", cibil: "CIBIL min 720", desc: "We check your active EMI burden, CIBIL, and employer type before advising you on amount and lender — so you are not rejected and your CIBIL does not drop.", lenders: "HDFC, ICICI, Fullerton, Tata Capital" },
            { icon: "🏢", title: "Loan Against Property", foir: "LTV max 65%", cibil: "CIBIL min 680", desc: "Residential, commercial or industrial property. We review title chain, property age, valuation, and LTV before matching you to the right lender.", lenders: "Bajaj Finserv, HDFC, Tata Capital" },
            { icon: "🚗", title: "Vehicle Loan", foir: "LTV max 85%", cibil: "CIBIL min 680", desc: "New or used commercial / personal vehicle. We assess your EMI capacity and match you to the lender with the best rate for your profile.", lenders: "HDFC, ICICI, Axis Bank" },
          ].map(l => (
            <div key={l.title} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{l.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{l.title}</h3>
              <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                <span style={{ background: "#F3F4F6", color: "#374151", fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 4 }}>{l.foir}</span>
                <span style={{ background: "#F3F4F6", color: "#374151", fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 4 }}>{l.cibil}</span>
              </div>
              <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6, marginBottom: 12 }}>{l.desc}</p>
              <div style={{ fontSize: 11, color: "#9CA3AF" }}>Best lenders: {l.lenders}</div>
            </div>
          ))}
        </div>
      </div>

      {/* OBJECTION HANDLING */}
      <div style={{ background: "#F9FAFB", padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, color: "#E8A020", textTransform: "uppercase", marginBottom: 10 }}>The Honest Answer</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827" }}>Why Pay When Banks and DSAs Are Free?</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20, maxWidth: 900, margin: "0 auto" }}>
          {[
            { who: "Banks", icon: "🏦", color: "#DC2626", bg: "#FEF2F2", text: "Work for themselves. Their job is to reject risky files. They will not tell you what to fix — they simply reject and move on." },
            { who: "DSAs", icon: "🧾", color: "#D97706", bg: "#FFFBEB", text: "Work for commission from the bank — not from you. They submit your file to whoever pays them most — not whoever is most likely to approve you." },
            { who: "FinSight One", icon: "✅", color: "#166534", bg: "#DCFCE7", text: "Paid by you — so loyal to you. We tell you the truth even if it means telling you not to apply yet. That saves your CIBIL from unnecessary rejections." },
          ].map(o => (
            <div key={o.who} style={{ background: o.bg, borderRadius: 12, padding: 24, border: `1px solid ${o.color}20` }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{o.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: o.color, marginBottom: 8 }}>{o.who}</div>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.6 }}>{o.text}</p>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 700, margin: "28px auto 0", background: "#fff", border: "1px solid #FDE68A", borderRadius: 10, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 14, color: "#92400E", lineHeight: 1.7 }}>
            <strong>The numbers:</strong> A home loan of ₹60L at 8.5% vs 9.5% over 20 years = difference of <strong>₹8,40,000</strong> in total interest. Getting matched to the right lender saves you far more than our fee.
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "#0D1428", padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)", textAlign: "center" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Start with a Free Eligibility Check</h2>
        <p style={{ fontSize: 15, color: "#94A3B8", marginBottom: 28 }}>2 minutes. No documents. Know your chances before approaching any bank.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => navigate("check")} style={{ background: "#E8A020", color: "#fff", fontSize: 15, fontWeight: 700, padding: "14px 32px", borderRadius: 8, border: "none", cursor: "pointer" }}>
            Check My Eligibility — Free →
          </button>
          <button onClick={() => navigate("casestudies")} style={{ background: "transparent", color: "#fff", fontSize: 14, fontWeight: 500, padding: "14px 32px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer" }}>
            See Home Loan Case Study
          </button>
        </div>
      </div>
      <Footer navigate={navigate} />
    </div>
  );
}
