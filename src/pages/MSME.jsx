import Footer from "../components/Footer";

export default function MSME({ navigate }) {
  return (
    <div>
      <div style={{ background: "#0D1428", padding: "72px 48px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(232,160,32,0.15)", border: "1px solid rgba(232,160,32,0.3)", color: "#E8A020", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "5px 16px", borderRadius: 100, marginBottom: 20 }}>For MSMEs & SMEs</div>
        <h1 style={{ fontSize: "clamp(26px,3.5vw,44px)", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: 16 }}>
          Your Bank Knows Your Balance Sheet.<br /><span style={{ color: "#E8A020" }}>We Know How to Get You Approved.</span>
        </h1>
        <p style={{ fontSize: 16, color: "#94A3B8", maxWidth: 580, margin: "0 auto 32px", lineHeight: 1.7 }}>
          20 years inside banking credit teams. We know exactly what makes a banker approve — and exactly what makes them reject. We fix the second so you get the first.
        </p>
        <button onClick={() => navigate("check")} style={{ background: "#E8A020", color: "#fff", fontSize: 15, fontWeight: 700, padding: "14px 36px", borderRadius: 8, border: "none", cursor: "pointer" }}>
          Check My Business Eligibility — Free →
        </button>
      </div>

      <div style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB", padding: "20px 48px", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 16 }}>
        {[["₹0","To check eligibility"],["₹30L+","Minimum turnover needed"],["275+","Lenders we work with"],["72 hrs","Document delivery"]].map(([v,l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#0D1428" }}>{v}</div>
            <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* PRODUCTS */}
      <div style={{ padding: "64px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, color: "#E8A020", textTransform: "uppercase", marginBottom: 10 }}>Loan Products We Cover</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827" }}>Every MSME Loan Product — One Platform</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16, maxWidth: 1100, margin: "0 auto" }}>
          {[
            { icon: "💰", title: "Working Capital CC / OD", desc: "Drawing power calculation, GST alignment, banking behaviour review. Match to Axis, HDFC, Kotak.", price: "Free to apply · Report from ₹499" },
            { icon: "🏭", title: "Machinery & Equipment Loan", desc: "DSCR calculation, promoter contribution verification, lender matching for manufacturing units.", price: "Free to apply · Report from ₹499" },
            { icon: "🏢", title: "Loan Against Property (LAP)", desc: "Title chain review, LTV maximisation, lender matching — residential, commercial or industrial.", price: "Free to apply · Report from ₹499" },
            { icon: "📄", title: "Unsecured Business Loan", desc: "GST + banking-based assessment. Match to Lendingkart, FlexiLoans, Indifi, NeoGrowth.", price: "Free to apply" },
            { icon: "🏗️", title: "Business Term Loan", desc: "DSCR, fund flow, project report preparation. Structured for capex and expansion.", price: "Free to apply · Report from ₹499" },
            { icon: "🏦", title: "Lease Rental Discounting (LRD)", desc: "Rental yield calculation, lease lock-in assessment, escrow structure, lender matching.", price: "Free to apply" },
          ].map(p => (
            <div key={p.title} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: 22 }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{p.icon}</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{p.title}</h3>
              <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6, marginBottom: 12 }}>{p.desc}</p>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#E8A020" }}>{p.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* REAL COST */}
      <div style={{ background: "#F9FAFB", padding: "64px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, color: "#E8A020", textTransform: "uppercase", marginBottom: 10 }}>The Real Cost of Not Getting Help</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827" }}>What a Rejection Actually Costs You</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16, maxWidth: 900, margin: "0 auto" }}>
          {[
            { problem: "Working capital too low", cost: "You turn down orders you cannot fund" },
            { problem: "Rejected — reapply elsewhere", cost: "CIBIL drops — next approval harder" },
            { problem: "Wrong lender for your type", cost: "2% higher rate on ₹1Cr = ₹2L/yr extra" },
            { problem: "No monthly monitoring", cost: "NPA risk builds silently — hits by surprise" },
          ].map(i => (
            <div key={i.problem} style={{ background: "#fff", border: "1px solid #FEE2E2", borderRadius: 10, padding: 20, borderTop: "3px solid #EF4444" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#DC2626", marginBottom: 6 }}>{i.problem}</div>
              <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>{i.cost}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "#0D1428", padding: "64px 48px", textAlign: "center" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Check Your Business Eligibility — Free</h2>
        <p style={{ fontSize: 15, color: "#94A3B8", marginBottom: 28 }}>2 minutes. No documents. Know your chances before approaching any bank.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => navigate("check")} style={{ background: "#E8A020", color: "#fff", fontSize: 15, fontWeight: 700, padding: "14px 32px", borderRadius: 8, border: "none", cursor: "pointer" }}>
            Check Eligibility — Free →
          </button>
          <button onClick={() => navigate("casestudies")} style={{ background: "transparent", color: "#fff", fontSize: 14, fontWeight: 500, padding: "14px 32px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer" }}>
            See MSME Case Studies
          </button>
        </div>
      </div>
      <Footer navigate={navigate} />
    </div>
  );
}
