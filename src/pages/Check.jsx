import { useState } from "react";

function Footer({ navigate }) {
  return (
    <footer style={{ background: "#111827", padding: "32px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
      <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: 1.5, color: "#fff" }}>FINSIGHT<span style={{ color: "#F59E0B" }}>ONE</span></div>
      <div style={{ display: "flex", gap: 20 }}>
        {[["home","Home"],["advisory","Advisory"],["about","About"]].map(([id,l]) => (
          <span key={id} onClick={() => navigate(id)} style={{ fontSize: 12, color: "#6B7280", cursor: "pointer" }}>{l}</span>
        ))}
      </div>
      <div style={{ fontSize: 11, color: "#4B5563" }}>© 2026 FinsightOne</div>
    </footer>
  );
}

export default function Check({ navigate }) {
  const [form, setForm] = useState({ name: "", mobile: "", type: "", loan: "", amount: "", income: "", rejected: "" });
  const [result, setResult] = useState(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const showScore = () => {
    const { type, loan, amount, income, rejected } = form;
    if (!type || !loan || !amount || !income || !rejected) { alert("Please fill in all fields to see your eligibility score."); return; }
    let score = 70;
    if (income === "Below ₹50,000/month") score -= 15;
    else if (income === "₹2L – ₹10L/month") score += 10;
    else if (income === "Above ₹10L/month") score += 15;
    if (rejected === "Yes, rejected once") score -= 10;
    else if (rejected === "Yes, rejected more than once") score -= 20;
    else score += 5;
    if (amount === "Up to ₹5 Lakh") score += 8;
    else if (amount === "₹5L – ₹25L") score += 5;
    else if (amount === "₹1 Crore – ₹5 Crore") score -= 5;
    else if (amount === "Above ₹5 Crore") score -= 10;
    score = Math.min(95, Math.max(25, score));
    let color, status, barColor, message;
    if (score >= 70) { color = "#059669"; status = "✓ Good — Likely to Qualify"; barColor = "linear-gradient(90deg,#059669,#34D399)"; message = `Based on what you shared, your profile looks strong for a ${loan}. With the right documents prepared correctly, you have a good chance of approval. We recommend getting a full eligibility report to confirm and address any gaps before applying.`; }
    else if (score >= 50) { color = "#D97706"; status = "⚠ Fair — Needs Improvement"; barColor = "linear-gradient(90deg,#D97706,#F59E0B)"; message = `Your profile has some areas that banks typically flag. A ${loan} is possible, but the application needs careful preparation. We recommend our Loan Readiness Improvement Plan to fix the weak points before applying.`; }
    else { color = "#DC2626"; status = "✗ Low — Preparation Needed"; barColor = "linear-gradient(90deg,#DC2626,#EF4444)"; message = `Your current profile may face rejection if applied directly. But this is fixable. Our Rejected Loan Recovery service and expert advisory can help you address the root issues and reapply successfully.`; }
    const factors = [
      { name: "Income / Turnover", val: income, ok: income !== "Below ₹50,000/month" },
      { name: "Prior Rejections", val: rejected, ok: rejected === "No, first time applying" },
      { name: "Loan Amount vs Income", val: amount, ok: score > 55 },
      { name: "Loan Type", val: loan, ok: true },
    ];
    setResult({ score, color, status, barColor, message, factors });
  };

  const inputStyle = { width: "100%", padding: "11px 14px", border: "1px solid #D1D5DB", borderRadius: 8, fontSize: 13, color: "#111827", boxSizing: "border-box", outline: "none" };
  const selectStyle = { ...inputStyle, background: "#fff" };
  const labelStyle = { fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6, display: "block" };

  return (
    <div>
      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg,#1E3A5F,#0F2140)", color: "#fff", padding: "clamp(32px,5vw,56px) clamp(20px,4vw,48px)", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#FCD34D20", border: "1px solid #FCD34D50", color: "#FCD34D", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "5px 16px", borderRadius: 100, marginBottom: 16 }}>
          Free · Takes 2 Minutes · No Documents Needed
        </div>
        <h1 style={{ fontSize: "clamp(24px,3.5vw,34px)", fontWeight: 900, marginBottom: 10 }}>
          Find Out <span style={{ color: "#FCD34D" }}>If You Qualify</span><br />Before Applying Anywhere
        </h1>
        <p style={{ fontSize: 14, color: "#93C5FD", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
          Tell us a few details about yourself and your loan need. We will tell you your chances and what to do next — completely free.
        </p>
      </div>

      {/* FORM / RESULT */}
      <div style={{ padding: "0 48px 64px", background: "#F9FAFB" }}>
        {!result ? (
          <div style={{ maxWidth: 680, margin: "-32px auto 0", background: "#fff", borderRadius: 16, padding: 32, boxShadow: "0 16px 48px rgba(0,0,0,0.12)", position: "relative", zIndex: 10 }}>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>Your Free Eligibility Check</div>
            <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 24 }}>Fill in the details below. We will show your result instantly.</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 16 }}>
              <div><label style={labelStyle}>Your Name</label><input style={inputStyle} placeholder="Ramesh Agarwal" value={form.name} onChange={e => set("name", e.target.value)} /></div>
              <div><label style={labelStyle}>Mobile Number</label><input style={inputStyle} placeholder="98xxxxxxxx" value={form.mobile} onChange={e => set("mobile", e.target.value)} /></div>
              <div>
                <label style={labelStyle}>I am a...</label>
                <select style={selectStyle} value={form.type} onChange={e => set("type", e.target.value)}>
                  <option value="">Select...</option>
                  <option>Business Owner</option><option>Salaried Individual</option>
                  <option>Self-Employed Professional</option><option>Farmer / Agri Business</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Loan Type I Need</label>
                <select style={selectStyle} value={form.loan} onChange={e => set("loan", e.target.value)}>
                  <option value="">Select...</option>
                  <option>Working Capital / Overdraft</option><option>Business Term Loan</option>
                  <option>Home Loan</option><option>Personal Loan</option>
                  <option>Loan Against Property</option><option>Vehicle Loan</option>
                  <option>Machinery / Equipment Loan</option>
                  <option>Lease Rental Discounting (LRD)</option>
                  <option>Unsecured Business Loan</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Loan Amount Needed</label>
                <select style={selectStyle} value={form.amount} onChange={e => set("amount", e.target.value)}>
                  <option value="">Select...</option>
                  <option>Up to ₹5 Lakh</option><option>₹5L – ₹25L</option>
                  <option>₹25L – ₹1 Crore</option><option>₹1 Crore – ₹5 Crore</option><option>Above ₹5 Crore</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>{form.type === "Business Owner" || form.type === "Farmer / Agri Business" ? "Monthly Turnover" : "Monthly Income"}</label>
                <select style={selectStyle} value={form.income} onChange={e => set("income", e.target.value)}>
                  <option value="">Select...</option>
                  <option>Below ₹50,000/month</option><option>₹50K – ₹2L/month</option>
                  <option>₹2L – ₹10L/month</option><option>Above ₹10L/month</option>
                </select>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Have you been rejected by a bank before?</label>
                <select style={selectStyle} value={form.rejected} onChange={e => set("rejected", e.target.value)}>
                  <option value="">Select...</option>
                  <option>No, first time applying</option>
                  <option>Yes, rejected once</option>
                  <option>Yes, rejected more than once</option>
                </select>
              </div>
            </div>
            <button onClick={showScore} style={{ width: "100%", background: "#1E3A5F", color: "#fff", fontSize: 14, fontWeight: 700, padding: 14, borderRadius: 10, border: "none", cursor: "pointer", marginTop: 8 }}>
              Show My Eligibility Score →
            </button>
            <div style={{ fontSize: 11, color: "#9CA3AF", textAlign: "center", marginTop: 10 }}>🔒 Your information is 100% private. We never share it without your permission.</div>
          </div>
        ) : (
          <div style={{ maxWidth: 680, margin: "24px auto 0" }}>
            <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16, padding: 32 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 32, alignItems: "start", marginBottom: 24 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Your Eligibility Score</div>
                  <div style={{ fontSize: 56, fontWeight: 900, lineHeight: 1, marginBottom: 4, color: result.color }}>{result.score}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: result.color }}>{result.status}</div>
                  <div style={{ height: 12, background: "#F3F4F6", borderRadius: 100, marginBottom: 16, overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 100, width: `${result.score}%`, background: result.barColor }} />
                  </div>
                  <div style={{ fontSize: 12, color: "#6B7280" }}>Based on the information you shared</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>What This Means</div>
                  <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.6, background: "#F9FAFB", padding: 14, borderRadius: 10 }}>{result.message}</div>
                </div>
              </div>
              <div style={{ height: 1, background: "#F3F4F6", margin: "0 0 24px" }} />
              <div style={{ fontSize: 12, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Key Factors We Checked</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12, marginBottom: 24 }}>
                {result.factors.map(f => (
                  <div key={f.name} style={{ background: "#F9FAFB", borderRadius: 10, padding: 14 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 4 }}>{f.name}</div>
                    <div style={{ fontSize: 11, color: f.ok ? "#059669" : "#DC2626" }}>{f.ok ? "✓" : "⚠"} {f.val}</div>
                  </div>
                ))}
              </div>
              <div style={{ height: 1, background: "#F3F4F6", margin: "0 0 24px" }} />
              <div style={{ fontSize: 12, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Your Next Steps</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12 }}>
                <button onClick={() => navigate("advisory")} style={{ padding: 12, borderRadius: 10, fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer", background: "#1E3A5F", color: "#fff" }}>Get Your Loan Documents Prepared</button>
                <button onClick={() => navigate("advisory")} style={{ padding: 12, borderRadius: 10, fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer", background: "#B45309", color: "#fff" }}>Speak to Our Expert Team — Book a Call</button>
              </div>
              <button onClick={() => setResult(null)} style={{ marginTop: 14, background: "none", border: "none", color: "#6B7280", fontSize: 12, cursor: "pointer", textDecoration: "underline" }}>← Check Again with Different Details</button>
            </div>
          </div>
        )}
      </div>
      {/* S2 READINESS PRODUCTS */}
      <div style={{ padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)", background: "#fff" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", color: "#7C3AED", marginBottom: 10, textAlign: "center" }}>Loan Readiness Services</div>
          <div style={{ fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 8 }}>Know Exactly Where You Stand</div>
          <div style={{ fontSize: 13, color: "#6B7280", textAlign: "center", maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.7 }}>
            Beyond the free check — our expert team gives you detailed reports, improvement plans, and full banker presentations.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
            {[
              { icon: "🔍", name: "Free Eligibility Check", price: "₹0 — Free", desc: "Instant online check. Know your chances in 2 minutes. No documents needed.", who: "For: Everyone, first step" },
              { icon: "📋", name: "Detailed Eligibility Report", price: "₹499 – ₹999", desc: "A full written report on your loan profile — what is strong, what is weak, and what to fix before applying.", who: "For: Serious applicants" },
              { icon: "🛠️", name: "Loan Readiness Improvement Plan", price: "₹2,499 – ₹4,999", desc: "Step-by-step action plan to improve your profile and maximise your chances of approval in 30–60 days.", who: "For: Applicants needing improvement" },
              { icon: "🗂️", name: "Full Banker Presentation", price: "₹9,999 – ₹14,999", desc: "A complete, professionally prepared file that presents your case to a banker — the way bankers want to see it.", who: "For: Larger loan applicants" },
              { icon: "🔄", name: "Rejected Loan Recovery", price: "₹4,999 – ₹7,999", desc: "Was your loan rejected? We identify why, fix the gaps, and help you reapply with a stronger case.", who: "For: Previously rejected applicants" },
            ].map(p => (
              <div key={p.name} style={{ border: "1px solid #E5E7EB", borderRadius: 12, padding: 20, background: "#FAFAFA" }}>
                <div style={{ fontSize: 22, marginBottom: 10 }}>{p.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 6 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.5, marginBottom: 12 }}>{p.desc}</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#7C3AED" }}>{p.price}</div>
                <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 3, marginBottom: 12 }}>{p.who}</div>
                <button onClick={() => window.open("https://wa.me/919999999999?text=Hi%20FinsightOne%2C%20I%27m%20interested%20in%20" + encodeURIComponent(p.name), "_blank")} style={{ display: "block", width: "100%", padding: 9, borderRadius: 8, fontSize: 12, fontWeight: 700, textAlign: "center", cursor: "pointer", background: "#F5F3FF", color: "#7C3AED", border: "1px solid #DDD6FE" }}>
                  Enquire Now →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}
