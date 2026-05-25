import Footer from "../components/Footer";

export default function Partners({ navigate }) {
  const [refs, setRefs] = [0, () => {}]; // placeholder state

  const earnings = [
    { service: "WC Loan ₹75L disbursed @ 1.5%", our: "₹1,12,500", yours: "₹50,625", note: "On disbursement" },
    { service: "Home Loan ₹60L @ 0.5%",         our: "₹30,000",  yours: "₹13,500",  note: "On disbursement" },
    { service: "White-label monitoring × 30 clients", our: "₹59,970/mo", yours: "₹30,000/mo", note: "Passive monthly" },
    { service: "Rejection recovery case",         our: "₹4,999",   yours: "₹1,500",   note: "Flat fee" },
    { service: "Banker Presentation Pack",        our: "₹9,999",   yours: "₹2,500",   note: "On payment" },
  ];

  return (
    <div>
      {/* HERO */}
      <div style={{ background: "#0D1428", padding: "72px 48px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(22,101,52,0.25)", border: "1px solid rgba(22,101,52,0.4)", color: "#86EFAC", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "5px 16px", borderRadius: 100, marginBottom: 20 }}>
          CA & DSA Partnership Programme
        </div>
        <h1 style={{ fontSize: "clamp(26px,3.5vw,44px)", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: 16 }}>
          Earn More From <span style={{ color: "#E8A020" }}>Every Client</span><br />You Already Have
        </h1>
        <p style={{ fontSize: 16, color: "#94A3B8", maxWidth: 580, margin: "0 auto 32px", lineHeight: 1.7 }}>
          Sub-DSA payout of 45% on disbursement. Passive monthly income. Rejection recovery channel. Three income streams your bank DSA does not offer.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => navigate("partnerlogin")} style={{ background: "#E8A020", color: "#fff", fontSize: 14, fontWeight: 700, padding: "14px 32px", borderRadius: 8, border: "none", cursor: "pointer" }}>
            Register as Partner →
          </button>
          <button onClick={() => navigate("check")} style={{ background: "transparent", color: "#fff", fontSize: 14, fontWeight: 500, padding: "14px 32px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer" }}>
            See Earnings Calculator
          </button>
        </div>
      </div>

      {/* STAT ROW */}
      <div style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB", padding: "20px 48px", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 16 }}>
        {[["45%","Of DSA payout on disbursement"],["₹30K+","Monthly passive income possible"],["275+","Lenders — never lose a referral"],["3","Income streams vs 1 from bank DSA"]].map(([v,l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#0D1428" }}>{v}</div>
            <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* WHY DIFFERENT FROM BANK DSA */}
      <div style={{ padding: "64px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, color: "#E8A020", textTransform: "uppercase", marginBottom: 10 }}>The Honest Comparison</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 12 }}>Why CAs Choose FinSight One Over Bank DSA</h2>
          <p style={{ fontSize: 15, color: "#6B7280", maxWidth: 520, margin: "0 auto" }}>We are not asking you to leave your bank DSA channel. We are offering you the income your bank DSA cannot give you.</p>
        </div>
        <div style={{ maxWidth: 900, margin: "0 auto", overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr>
                <th style={{ background: "#F9FAFB", padding: "12px 16px", textAlign: "left", color: "#6B7280", fontWeight: 600, borderBottom: "1px solid #E5E7EB", fontSize: 12 }}>Feature</th>
                <th style={{ background: "#F9FAFB", padding: "12px 16px", textAlign: "center", color: "#6B7280", fontWeight: 600, borderBottom: "1px solid #E5E7EB", fontSize: 12 }}>Bank DSA Channel</th>
                <th style={{ background: "#0D1428", padding: "12px 16px", textAlign: "center", color: "#E8A020", fontWeight: 700, borderBottom: "1px solid #E5E7EB", fontSize: 12 }}>FinSight One</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Lender coverage",          "One bank only",              "275+ banks and NBFCs"],
                ["When you earn",             "Only on disbursement",       "Disbursement + rejection recovery + monthly"],
                ["Rejected cases",            "You earn nothing",           "₹1,500 flat per case regardless of amount"],
                ["Monthly passive income",    "Not available",              "₹1,000/client/month white-label monitoring"],
                ["Document preparation",      "You do it yourself",         "We prepare everything — you just refer"],
                ["Your client sees",          "Bank or your firm",          "Your firm only — we are invisible"],
                ["Dashboard & tracking",      "No visibility",              "Full partner portal — real-time commissions"],
              ].map(([feat, bank, fs], i) => (
                <tr key={feat} style={{ background: i % 2 === 0 ? "#fff" : "#F9FAFB" }}>
                  <td style={{ padding: "11px 16px", color: "#374151", fontWeight: 500, borderBottom: "1px solid #F3F4F6" }}>{feat}</td>
                  <td style={{ padding: "11px 16px", color: "#9CA3AF", textAlign: "center", borderBottom: "1px solid #F3F4F6" }}>{bank}</td>
                  <td style={{ padding: "11px 16px", color: "#166534", textAlign: "center", fontWeight: 600, borderBottom: "1px solid #F3F4F6", background: "rgba(22,101,52,0.04)" }}>{fs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* THREE MODELS */}
      <div style={{ background: "#F9FAFB", padding: "64px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, color: "#E8A020", textTransform: "uppercase", marginBottom: 10 }}>Three Ways to Earn</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827" }}>Your Revenue Model as a FinSight One Partner</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20, maxWidth: 1000, margin: "0 auto" }}>
          {[
            { num: "01", color: "#1D4ED8", bg: "#EFF6FF", border: "#BFDBFE",
              title: "Sub-DSA Payout",
              pitch: "When your client's loan disburses — you earn 45% of our DSA payout. Same as your bank DSA channel but with 275+ lenders so you never lose a referral.",
              earn: "₹13,500 – ₹50,625 per disbursement",
              when: "Paid on disbursement",
            },
            { num: "02", color: "#166534", bg: "#DCFCE7", border: "#BBF7D0",
              title: "White-Label Monitoring",
              pitch: "Sell our monthly financial health monitoring to your MSME clients under your own firm name. You collect ₹2,999/month, pay us ₹1,999, keep ₹1,000 passively.",
              earn: "₹1,000/client/month passive",
              when: "Recurring every month",
            },
            { num: "03", color: "#B45309", bg: "#FEF3C7", border: "#FDE68A",
              title: "Rejection Recovery",
              pitch: "Your client's loan was rejected? Refer them to us. We recover the case. You earn ₹1,500 flat — regardless of loan amount. Banks never pay for this. We do.",
              earn: "₹1,500 flat per case",
              when: "Paid on engagement",
            },
          ].map(m => (
            <div key={m.num} style={{ background: "#fff", border: `1px solid ${m.border}`, borderRadius: 12, padding: 24, borderTop: `3px solid ${m.color}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: m.color, letterSpacing: 1.5, marginBottom: 8 }}>MODEL {m.num}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 10 }}>{m.title}</h3>
              <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6, marginBottom: 14 }}>{m.pitch}</p>
              <div style={{ background: m.bg, borderRadius: 6, padding: "8px 12px", marginBottom: 6 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: m.color }}>{m.earn}</div>
              </div>
              <div style={{ fontSize: 11, color: "#9CA3AF" }}>{m.when}</div>
            </div>
          ))}
        </div>
      </div>

      {/* EARNINGS TABLE */}
      <div style={{ padding: "64px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, color: "#E8A020", textTransform: "uppercase", marginBottom: 10 }}>Earnings Calculator</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827" }}>What You Could Earn This Month</h2>
        </div>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#0D1428" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", color: "#fff", fontWeight: 600 }}>Activity</th>
                <th style={{ padding: "12px 16px", textAlign: "right", color: "#94A3B8", fontWeight: 600 }}>FinSight Earns</th>
                <th style={{ padding: "12px 16px", textAlign: "right", color: "#E8A020", fontWeight: 700 }}>Your Earning</th>
                <th style={{ padding: "12px 16px", textAlign: "right", color: "#94A3B8", fontWeight: 600 }}>When</th>
              </tr>
            </thead>
            <tbody>
              {earnings.map((e, i) => (
                <tr key={e.service} style={{ background: i % 2 === 0 ? "#fff" : "#F9FAFB", borderBottom: "1px solid #F3F4F6" }}>
                  <td style={{ padding: "12px 16px", color: "#374151" }}>{e.service}</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", color: "#6B7280" }}>{e.our}</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: 700, color: "#166534" }}>{e.yours}</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", color: "#9CA3AF", fontSize: 11 }}>{e.note}</td>
                </tr>
              ))}
              <tr style={{ background: "#0D1428" }}>
                <td colSpan={2} style={{ padding: "12px 16px", color: "#94A3B8", fontWeight: 600, fontSize: 13 }}>Estimated monthly — 5 DSA files + 30 monitoring clients + 3 recovery cases</td>
                <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: 800, color: "#E8A020", fontSize: 16 }}>₹2,03,000+</td>
                <td style={{ padding: "12px 16px", textAlign: "right", color: "#64748B", fontSize: 11 }}>Per month</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* SIGN UP FORM */}
      <div style={{ background: "#F9FAFB", padding: "64px 48px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, color: "#E8A020", textTransform: "uppercase", marginBottom: 10 }}>Get Started</div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 10 }}>Register as a Partner</h2>
            <p style={{ fontSize: 14, color: "#6B7280" }}>Free to join. Your unique referral link will be ready in 24 hours.</p>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: 32 }}>
            {[
              { label: "Full Name", ph: "CA Rajesh Mehta" },
              { label: "Firm Name", ph: "Mehta & Associates" },
              { label: "Mobile Number", ph: "98xxxxxxxx" },
              { label: "Email Address", ph: "rajesh@mehtaassociates.com" },
              { label: "City", ph: "Pune" },
            ].map(f => (
              <div key={f.label} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 5 }}>{f.label}</div>
                <input placeholder={f.ph} style={{ width: "100%", border: "1px solid #D1D5DB", borderRadius: 6, padding: "10px 12px", fontSize: 13, color: "#374151", boxSizing: "border-box", fontFamily: "inherit" }} />
              </div>
            ))}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 5 }}>I am a...</div>
              <select style={{ width: "100%", border: "1px solid #D1D5DB", borderRadius: 6, padding: "10px 12px", fontSize: 13, color: "#374151", boxSizing: "border-box", background: "#fff", fontFamily: "inherit" }}>
                <option>Chartered Accountant</option>
                <option>Tax Consultant</option>
                <option>DSA Agent</option>
                <option>Financial Advisor</option>
                <option>Insurance Agent</option>
                <option>Other</option>
              </select>
            </div>
            <button onClick={() => navigate("partnerlogin")} style={{ width: "100%", background: "#0D1428", color: "#fff", fontSize: 14, fontWeight: 700, padding: 13, borderRadius: 8, border: "none", cursor: "pointer", marginTop: 8 }}>
              Submit Partner Application →
            </button>
            <div style={{ fontSize: 11, color: "#9CA3AF", textAlign: "center", marginTop: 10 }}>
              We review all applications within 24 hours. Your referral link will be sent on WhatsApp.
            </div>
          </div>
        </div>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}
