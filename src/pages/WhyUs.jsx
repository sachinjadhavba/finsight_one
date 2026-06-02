import Footer from "../components/Footer";

const ORANGE = "#EA580C";
const INDIGO = "#4F46E5";
const DARK   = "#111827";
const MUTED  = "#6B7280";
const WHITE  = "#fff";
const GRAY   = "#F9FAFB";
const GREEN  = "#059669";
const RED    = "#DC2626";
const WA     = "919579453635";

const ROWS = [
  ["Tell you honestly if you will be approved",       "—", "—",       "—",       "✅"],
  ["Identify rejection risk before you apply",        "—", "—",       "—",       "✅"],
  ["Match you to the right lender for your profile",  "—", "Partial", "—",       "✅"],
  ["Prepare banker-ready documents (LAN/CMA/DPR)",    "—", "—",       "Partial", "✅"],
  ["Access to 200+ lenders",                          "—", "1 bank",  "—",       "✅"],
  ["Follow up till disbursement",                     "—", "Partial", "—",       "✅"],
  ["Monthly financial health monitoring",             "—", "—",       "Partial", "✅"],
  ["Handle rejected loan recovery",                   "—", "—",       "—",       "✅"],
  ["Work in your interest — not the bank's",          "—", "—",       "✅",      "✅"],
];

const COST_SCENARIOS = [
  {
    icon: "🏦",
    who: "Going Direct to Bank",
    color: RED,
    bg: "#FEF2F2",
    border: "#FECACA",
    points: [
      "Bank assesses your file in their interest — not yours",
      "Rejected without explanation — CIBIL takes the hit",
      "No guidance on what to fix before reapplying",
      "Each new application adds a hard enquiry",
    ],
    cost: "A 30-point CIBIL drop from 2 hard enquiries + 6-month delay = ₹40,000+ in higher interest over loan tenure",
  },
  {
    icon: "🤝",
    who: "Using a Random DSA",
    color: "#D97706",
    bg: "#FFFBEB",
    border: "#FDE68A",
    points: [
      "DSA earns from lender — incentive is to submit, not to get you the best deal",
      "Limited to 1–2 lenders — you may not get the best rate",
      "No document preparation — file quality depends on you",
      "Rejected cases earn them nothing — they move on",
    ],
    cost: "0.5% higher rate on ₹50L home loan over 20 years = ₹3,50,000 extra interest paid",
  },
  {
    icon: "✅",
    who: "Using FinsightOne",
    color: GREEN,
    bg: "#F0FDF4",
    border: "#BBF7D0",
    points: [
      "Honest assessment — we tell you not to apply if the time is not right",
      "Matched to the right lender for your exact profile",
      "All documents prepared correctly before submission",
      "Rejected cases handled — you still get a path forward",
    ],
    cost: "FinsightOne fee pays for itself in the first month of better interest rate",
  },
];

export default function WhyUs({ navigate }) {
  return (
    <div style={{ fontFamily:"Arial,sans-serif", color:DARK }}>

      {/* HERO */}
      <div style={{ background:"linear-gradient(135deg,#0F172A 0%,#1E1B4B 100%)", padding:"clamp(44px,6vw,72px) clamp(20px,4vw,48px)", textAlign:"center" }}>
        <div style={{ maxWidth:700, margin:"0 auto" }}>
          <div style={{ display:"inline-block", background:"rgba(234,88,12,0.1)", border:"1px solid rgba(234,88,12,0.3)", color:ORANGE, fontSize:11, fontWeight:700, letterSpacing:2, textTransform:"uppercase", padding:"5px 16px", borderRadius:100, marginBottom:20 }}>
            The Honest Comparison
          </div>
          <h1 style={{ fontSize:"clamp(26px,3.5vw,42px)", fontWeight:900, color:WHITE, lineHeight:1.15, marginBottom:16 }}>
            Why FinsightOne?<br />
            <span style={{ color:ORANGE }}>Not a Bank. Not a DSA. Not Your CA.</span>
          </h1>
          <p style={{ fontSize:15, color:"#CBD5E1", maxWidth:560, margin:"0 auto", lineHeight:1.7 }}>
            Each of these serves a different purpose. Here is an honest breakdown of what each one does — and does not do — for you.
          </p>
        </div>
      </div>

      {/* COMPARISON TABLE */}
      <div style={{ padding:"clamp(40px,5vw,56px) clamp(20px,4vw,48px)", maxWidth:1100, margin:"0 auto" }}>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
            <thead>
              <tr>
                <th style={{ background:GRAY, padding:"14px 16px", textAlign:"left", color:MUTED, fontWeight:600, borderBottom:"2px solid #E5E7EB", fontSize:12, minWidth:200 }}>
                  What You Need
                </th>
                {[
                  { label:"Your Bank",     color:RED,     highlight:false },
                  { label:"A DSA",         color:"#D97706", highlight:false },
                  { label:"Your CA",       color:INDIGO,  highlight:false },
                  { label:"FinsightOne",   color:GREEN,   highlight:true  },
                ].map(h => (
                  <th key={h.label} style={{ background:h.highlight ? DARK : GRAY, padding:"14px 16px", textAlign:"center", color:h.highlight ? ORANGE : "#374151", fontWeight:700, borderBottom:"2px solid #E5E7EB", fontSize:h.highlight ? 14 : 12, minWidth:130 }}>
                    {h.label}
                    {h.highlight && <div style={{ fontSize:10, color:"#94A3B8", fontWeight:400, marginTop:2 }}>Recommended</div>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([feat, bank, dsa, ca, fs], i) => (
                <tr key={feat} style={{ background: i % 2 === 0 ? WHITE : GRAY }}>
                  <td style={{ padding:"12px 16px", color:"#374151", fontWeight:500, borderBottom:"1px solid #F3F4F6" }}>{feat}</td>
                  {[bank, dsa, ca, fs].map((v, ci) => (
                    <td key={ci} style={{ padding:"12px 16px", textAlign:"center", borderBottom:"1px solid #F3F4F6", background: ci === 3 ? "rgba(5,150,105,0.05)" : "transparent" }}>
                      {v === "✅"
                        ? <span style={{ color:GREEN, fontSize:16 }}>✅</span>
                        : v === "—"
                        ? <span style={{ color:"#D1D5DB", fontSize:18 }}>—</span>
                        : <span style={{ fontSize:11, color:MUTED, fontWeight:500 }}>{v}</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ fontSize:12, color:"#9CA3AF", textAlign:"right", marginTop:8, fontStyle:"italic" }}>
          Partial = limited capability. — = not available.
        </div>
      </div>

      {/* REAL COST SECTION */}
      <div style={{ background:GRAY, padding:"clamp(40px,5vw,56px) clamp(20px,4vw,48px)", borderTop:"1px solid #E5E7EB" }}>
        <div style={{ maxWidth:1060, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <div style={{ fontSize:11, fontWeight:700, color:ORANGE, letterSpacing:2, textTransform:"uppercase", marginBottom:8 }}>The Real Cost</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,28px)", fontWeight:900, color:DARK, marginBottom:10 }}>
              What Each Path Actually Costs You
            </h2>
            <p style={{ fontSize:14, color:MUTED, maxWidth:500, margin:"0 auto" }}>
              The cheapest option upfront is rarely the cheapest option over the life of the loan.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:20 }}>
            {COST_SCENARIOS.map(s => (
              <div key={s.who} style={{ background:WHITE, border:`1px solid ${s.border}`, borderRadius:12, padding:"22px 20px", borderTop:`3px solid ${s.color}` }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                  <span style={{ fontSize:26 }}>{s.icon}</span>
                  <span style={{ fontSize:15, fontWeight:800, color:DARK }}>{s.who}</span>
                </div>
                {s.points.map((p,i) => (
                  <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:8, marginBottom:8 }}>
                    <span style={{ color:s.color, fontWeight:900, fontSize:11, marginTop:2, flexShrink:0 }}>
                      {s.color === GREEN ? "✓" : "✗"}
                    </span>
                    <span style={{ fontSize:12.5, color:"#374151", lineHeight:1.5 }}>{p}</span>
                  </div>
                ))}
                <div style={{ background:s.bg, borderRadius:8, padding:"10px 12px", marginTop:14 }}>
                  <div style={{ fontSize:12, color:s.color, fontWeight:600, lineHeight:1.5 }}>{s.cost}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TRUST SIGNALS */}
      <div style={{ background:WHITE, padding:"clamp(40px,5vw,56px) clamp(20px,4vw,48px)", borderTop:"1px solid #E5E7EB" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <div style={{ fontSize:11, fontWeight:700, color:ORANGE, letterSpacing:2, textTransform:"uppercase", marginBottom:8 }}>Who We Are</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,28px)", fontWeight:900, color:DARK }}>
              20 Years Inside Banks — Now Working for Borrowers
            </h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:20 }}>
            {[
              { icon:"🏦", title:"Ex-Senior Bankers", desc:"Our team spent 20+ years inside credit departments — reviewing, approving, and rejecting loan applications." },
              { icon:"📋", title:"Credit Committee Experience", desc:"We know exactly what credit committees look for — because we sat on them." },
              { icon:"🎯", title:"Borrower's Advisor", desc:"We work for you — not for the bank, not for commission. Our incentive is your approval." },
              { icon:"🔒", title:"No Blind Applications", desc:"We never submit a file we are not confident about. Your CIBIL is too valuable to waste." },
            ].map(t => (
              <div key={t.title} style={{ textAlign:"center", padding:"20px 16px", background:GRAY, borderRadius:12, border:"1px solid #E5E7EB" }}>
                <div style={{ fontSize:30, marginBottom:10 }}>{t.icon}</div>
                <div style={{ fontSize:14, fontWeight:700, color:DARK, marginBottom:8 }}>{t.title}</div>
                <div style={{ fontSize:12.5, color:MUTED, lineHeight:1.65 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div style={{ background:`linear-gradient(135deg,#0F172A 0%,#1E1B4B 100%)`, padding:"clamp(40px,5vw,56px) clamp(20px,4vw,48px)", textAlign:"center" }}>
        <div style={{ maxWidth:540, margin:"0 auto" }}>
          <h2 style={{ fontSize:"clamp(22px,3vw,28px)", fontWeight:900, color:WHITE, marginBottom:12 }}>
            Ready to Experience the Difference?
          </h2>
          <p style={{ fontSize:14, color:"#CBD5E1", marginBottom:28, lineHeight:1.7 }}>
            Free eligibility check — 2 minutes — no documents needed.
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={() => navigate("check")} style={{ background:ORANGE, color:WHITE, fontSize:14, fontWeight:700, padding:"13px 28px", borderRadius:8, border:"none", cursor:"pointer", fontFamily:"inherit" }}>
              Check My Eligibility — Free →
            </button>
            <button
              onClick={() => window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent("Hi FinsightOne, I want to understand how you can help me"), "_blank")}
              style={{ background:"rgba(255,255,255,0.1)", color:WHITE, fontSize:14, fontWeight:600, padding:"13px 28px", borderRadius:8, border:"1px solid rgba(255,255,255,0.2)", cursor:"pointer", fontFamily:"inherit" }}>
              💬 Talk to an Expert
            </button>
          </div>
          <div style={{ fontSize:11, color:"#475569", marginTop:16 }}>🔒 Free · No documents needed · No spam</div>
        </div>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}
