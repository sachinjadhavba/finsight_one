import { useState } from "react";
import Footer from "../components/Footer";
import { PLANS, WHAT_INCLUDED } from "../data";

const ORANGE = "#EA580C";
const INDIGO = "#4F46E5";
const DARK   = "#111827";
const MUTED  = "#6B7280";
const WHITE  = "#fff";
const GRAY   = "#F9FAFB";
const GREEN  = "#059669";
const WA     = "919579453635";

const PERSONAS = [
  {
    icon: "📋",
    title: "Taking a Loan Soon",
    desc: "You want to approach your bank for a new facility or enhancement in the next 3–6 months. Monthly monitoring ensures your numbers are in the right shape before you ask.",
    plan: "Business Health",
  },
  {
    icon: "🏦",
    title: "Already Have a Loan",
    desc: "Your CC or TL is running. You want to track whether your account is drifting toward a stress classification — and stay ahead of it before your banker notices.",
    plan: "Credit Watch",
  },
  {
    icon: "🔄",
    title: "Rebuilding After a Rejection",
    desc: "You were rejected or your limit was reduced. You need a systematic 6–12 month plan to rebuild your banking profile and approach again with confidence.",
    plan: "Premium",
  },
];

const FAQS = [
  {
    q: "What documents do I need to share each month?",
    a: "For Credit Watch: just your CIBIL consent link — we pull the report. For Business Health and Premium: your latest CC statement, GST filing status, and bank statement for the month. Typically 3 files, shared on WhatsApp. We never ask for passwords or OTPs.",
  },
  {
    q: "When is the monthly report delivered?",
    a: "By the 10th of every month, based on the previous month's data. Premium clients get a review call scheduled between the 8th and 12th. If you have an urgent query between reports, Premium clients can message their dedicated RM directly.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes — no lock-in, no cancellation fee. Cancel before your next billing date and you will not be charged. Your reports and data remain accessible for 90 days after cancellation.",
  },
  {
    q: "What is the difference between this and just checking my CIBIL score?",
    a: "CIBIL is one of eight signals your banker watches. FinsightOne's monthly monitoring tracks all eight — CIBIL, CC utilisation pattern, cheque return frequency, GST compliance, banking turnover vs ITR, drawing power adequacy, debtor days, and key financial ratios. A clean CIBIL with a stressed CC utilisation pattern is still a red flag for a banker.",
  },
];

export default function Analytics({ navigate }) {
  const [openFaq, setOpenFaq] = useState(null);

  const waOrder = (planName) => {
    const keywords = { "Credit Watch": "WATCH", "Business Health": "HEALTH", "Premium": "PREMIUM" };
    const keyword = keywords[planName] || "WATCH";
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(keyword)}`, "_blank");
  };

  return (
    <div style={{ fontFamily:"Arial,sans-serif", color:DARK }}>

      {/* HERO */}
      <div style={{ background:"linear-gradient(135deg,#0F172A 0%,#1E1B4B 100%)", padding:"clamp(48px,7vw,80px) clamp(20px,5vw,48px)" }}>
        <div style={{ maxWidth:820, margin:"0 auto", textAlign:"center" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(234,88,12,0.2)", border:"1px solid rgba(234,88,12,0.4)", color:"#FB923C", fontSize:11, fontWeight:700, padding:"5px 14px", borderRadius:20, marginBottom:20, letterSpacing:1.5, textTransform:"uppercase" }}>
            Monthly Plans · Cancel Anytime
          </div>
          <h1 style={{ fontSize:"clamp(26px,4.5vw,42px)", fontWeight:900, color:WHITE, marginBottom:16, lineHeight:1.2 }}>
            Your Finances,<br />
            <span style={{ color:"#FB923C" }}>Banker-Ready Every Month</span>
          </h1>
          <p style={{ fontSize:"clamp(14px,2vw,16px)", color:"#CBD5E1", maxWidth:600, margin:"0 auto 28px", lineHeight:1.75 }}>
            Monthly monitoring and expert guidance — so your next enhancement conversation always goes your way. No lock-in. Cancel any month.
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button
              onClick={() => document.getElementById("plans").scrollIntoView({ behavior:"smooth" })}
              style={{ background:ORANGE, color:WHITE, fontSize:14, fontWeight:700, padding:"13px 28px", borderRadius:8, border:"none", cursor:"pointer", fontFamily:"inherit" }}>
              See Plans & Pricing →
            </button>
            <button
              onClick={() => window.open(`https://wa.me/${WA}?text=${encodeURIComponent("Hi FinsightOne, I want to know more about the monthly monitoring plans")}`, "_blank")}
              style={{ background:"rgba(255,255,255,0.1)", color:WHITE, fontSize:14, fontWeight:600, padding:"13px 28px", borderRadius:8, border:"1px solid rgba(255,255,255,0.2)", cursor:"pointer", fontFamily:"inherit" }}>
              💬 Talk to Us First
            </button>
          </div>
        </div>
      </div>

      {/* TRUST BAR */}
      <div style={{ background:GRAY, borderBottom:"1px solid #E5E7EB", padding:"14px clamp(20px,4vw,48px)", display:"flex", justifyContent:"space-around", flexWrap:"wrap", gap:16 }}>
        {[["₹0","Cancel anytime"],["10th","Report delivered by"],["8","Ratios tracked monthly"],["20 yrs","Banking expertise"]].map(([v,l]) => (
          <div key={l} style={{ textAlign:"center" }}>
            <div style={{ fontSize:18, fontWeight:900, color:ORANGE }}>{v}</div>
            <div style={{ fontSize:11, color:MUTED, marginTop:2 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* WHO NEEDS THIS */}
      <div style={{ background:WHITE, padding:"clamp(40px,5vw,56px) clamp(20px,4vw,48px)" }}>
        <div style={{ maxWidth:960, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:32 }}>
            <div style={{ fontSize:11, fontWeight:700, color:ORANGE, letterSpacing:2.5, textTransform:"uppercase", marginBottom:8 }}>Who Needs This</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,28px)", fontWeight:900, color:DARK }}>Is Monthly Monitoring Right for You?</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:18 }}>
            {PERSONAS.map(p => (
              <div key={p.title} style={{ background:GRAY, border:"1px solid #E5E7EB", borderRadius:12, padding:"20px 18px" }}>
                <div style={{ fontSize:28, marginBottom:10 }}>{p.icon}</div>
                <div style={{ fontSize:14, fontWeight:700, color:DARK, marginBottom:6 }}>{p.title}</div>
                <p style={{ fontSize:12.5, color:MUTED, lineHeight:1.65, marginBottom:12 }}>{p.desc}</p>
                <div style={{ fontSize:11, fontWeight:700, color:GREEN, background:"#F0FDF4", border:"1px solid #BBF7D0", borderRadius:6, padding:"4px 10px", display:"inline-block" }}>
                  Recommended: {p.plan}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PLANS */}
      <div id="plans" style={{ background:GRAY, padding:"clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:10 }}>
            <div style={{ fontSize:11, fontWeight:700, color:ORANGE, letterSpacing:2.5, textTransform:"uppercase", marginBottom:8 }}>Monthly Plans</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,28px)", fontWeight:900, color:DARK, marginBottom:8 }}>Pick the Plan That Fits Your Business</h2>
            <p style={{ fontSize:14, color:MUTED, maxWidth:520, margin:"0 auto 36px", lineHeight:1.7 }}>No lock-in. No hidden fees. Cancel any month. Submit your documents by WhatsApp — we handle the rest.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
            {PLANS.map(plan => (
              <div key={plan.name} style={{ border:`1px solid ${plan.featured ? GREEN : "#E5E7EB"}`, borderRadius:14, padding:"24px 22px", background:WHITE, position:"relative", boxShadow: plan.featured ? "0 0 0 2px #059669" : "none", display:"flex", flexDirection:"column" }}>
                {plan.featured && plan.badge && (
                  <div style={{ position:"absolute", top:-12, left:"50%", transform:"translateX(-50%)", background:GREEN, color:WHITE, fontSize:10, fontWeight:800, letterSpacing:1, textTransform:"uppercase", padding:"4px 14px", borderRadius:100, whiteSpace:"nowrap" }}>{plan.badge}</div>
                )}
                <div style={{ fontSize:12, fontWeight:800, color:GREEN, textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>{plan.name}</div>
                <div style={{ marginBottom:4 }}>
                  <span style={{ fontSize:32, fontWeight:900, color:DARK }}>{plan.price}</span>
                  <span style={{ fontSize:14, fontWeight:500, color:MUTED }}> {plan.per}</span>
                </div>
                <div style={{ fontSize:11, color:MUTED, marginBottom:4, fontStyle:"italic" }}>Excl. GST</div>
                <div style={{ fontSize:12.5, color:MUTED, marginBottom:18, lineHeight:1.55 }}>{plan.desc}</div>
                <ul style={{ listStyle:"none", marginBottom:20, padding:0, flex:1 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ fontSize:12.5, color:"#374151", padding:"6px 0", borderBottom:"1px solid #F3F4F6", display:"flex", alignItems:"flex-start", gap:8, lineHeight:1.4 }}>
                      <span style={{ color:GREEN, fontWeight:800, flexShrink:0, marginTop:1 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                {plan.sample && (
                  <a href={plan.sample} target="_blank" rel="noreferrer"
                    style={{ display:"block", textAlign:"center", fontSize:12, color:"#059669", fontWeight:700, marginBottom:10, textDecoration:"none" }}>
                    View Sample Report →
                  </a>
                )}
                {!plan.sample && (
                  <div style={{ fontSize:11, color:"#94A3B8", textAlign:"center", marginBottom:10, fontStyle:"italic" }}>
                    Sample report coming soon
                  </div>
                )}
                <button
                  onClick={() => waOrder(plan.name)}
                  style={{ width:"100%", padding:"11px 0", borderRadius:8, fontSize:13, fontWeight:700, border: plan.featured ? "none" : `1px solid ${GREEN}`, cursor:"pointer", background: plan.featured ? GREEN : WHITE, color: plan.featured ? WHITE : GREEN, fontFamily:"inherit" }}>
                  Subscribe on WhatsApp →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WHAT'S INCLUDED */}
      <div style={{ background:WHITE, padding:"clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ maxWidth:960, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <div style={{ fontSize:11, fontWeight:700, color:ORANGE, letterSpacing:2.5, textTransform:"uppercase", marginBottom:8 }}>What You Get Every Month</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,28px)", fontWeight:900, color:DARK, marginBottom:8 }}>Built to Get You More From Your Bank</h2>
            <p style={{ fontSize:14, color:MUTED, maxWidth:500, margin:"0 auto", lineHeight:1.7 }}>Every feature is designed around one goal — helping you walk into your next enhancement meeting and win.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:16 }}>
            {WHAT_INCLUDED.map(w => (
              <div key={w.title} style={{ background:GRAY, border:"1px solid #E5E7EB", borderRadius:12, padding:"20px 18px" }}>
                <div style={{ fontSize:26, marginBottom:10 }}>{w.icon}</div>
                <div style={{ fontSize:13, fontWeight:800, color:DARK, marginBottom:6 }}>{w.title}</div>
                <div style={{ fontSize:12.5, color:MUTED, lineHeight:1.6 }}>{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COMPARISON */}
      <div style={{ background:GRAY, padding:"clamp(40px,5vw,56px) clamp(20px,4vw,48px)" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:32 }}>
            <div style={{ fontSize:11, fontWeight:700, color:ORANGE, letterSpacing:2.5, textTransform:"uppercase", marginBottom:8 }}>Why Monitor Monthly</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,28px)", fontWeight:900, color:DARK }}>What Happens Without Monthly Monitoring</h2>
          </div>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
              <thead>
                <tr>
                  <th style={{ background:DARK, padding:"12px 16px", textAlign:"left", color:MUTED, fontWeight:600, fontSize:12, borderBottom:"1px solid #374151" }}>What Bankers Track</th>
                  <th style={{ background:DARK, padding:"12px 16px", textAlign:"center", color:"#EF4444", fontWeight:700, fontSize:12, borderBottom:"1px solid #374151" }}>Without FinsightOne</th>
                  <th style={{ background:DARK, padding:"12px 16px", textAlign:"center", color:GREEN, fontWeight:700, fontSize:13, borderBottom:"1px solid #374151" }}>With FinsightOne</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["CC utilisation creeping above 80%",          "You find out at renewal — when it's too late",   "Flagged in month 2 — fixed before banker sees it"],
                  ["Peak utilisation spike mid-month",           "Bank records it silently — you never know",      "Flagged with date, context, and fix before your RM sees it"],
                  ["CIBIL hard enquiries from other applications","You don't know — banker notices",                "Tracked monthly — we advise when to pause applications"],
                  ["GST filing gap",                             "Banker spots it during annual review",           "Flagged same month — resolved before annual review"],
                  ["Banking turnover diverging from ITR",        "Rejected at renewal — no explanation given",     "Reconciliation note prepared proactively"],
                  ["Rate reduction eligibility",                 "You never know you qualify — pay full rate",     "We identify when your ratios qualify and prepare the ask"],
                  ["Enhancement readiness",                      "You ask, get rejected, CIBIL takes the hit",     "We tell you your chance before you ask — and when to wait"],
                ].map(([what, without, with_fo], i) => (
                  <tr key={what} style={{ background: i%2===0 ? WHITE : GRAY }}>
                    <td style={{ padding:"11px 16px", color:"#374151", fontWeight:500, borderBottom:"1px solid #F3F4F6", fontSize:12.5 }}>{what}</td>
                    <td style={{ padding:"11px 16px", textAlign:"center", borderBottom:"1px solid #F3F4F6", fontSize:12, color:"#9CA3AF" }}>{without}</td>
                    <td style={{ padding:"11px 16px", textAlign:"center", borderBottom:"1px solid #F3F4F6", fontSize:12, color:GREEN, fontWeight:500, background:"rgba(5,150,105,0.04)" }}>{with_fo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ background:WHITE, padding:"clamp(40px,6vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ maxWidth:760, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:32 }}>
            <div style={{ fontSize:11, fontWeight:700, color:ORANGE, letterSpacing:2.5, textTransform:"uppercase", marginBottom:8 }}>FAQ</div>
            <h2 style={{ fontSize:"clamp(20px,3vw,28px)", fontWeight:900, color:DARK }}>Common Questions</h2>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {FAQS.map((faq,i) => (
              <div key={i} style={{ border:"1px solid #E2E8F0", borderRadius:10, overflow:"hidden" }}>
                <button onClick={() => setOpenFaq(openFaq===i ? null : i)}
                  style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 20px", background: openFaq===i ? "#EEF2FF" : WHITE, border:"none", cursor:"pointer", fontFamily:"inherit", gap:12 }}>
                  <span style={{ fontSize:14, fontWeight:700, color: openFaq===i ? INDIGO : DARK, textAlign:"left", lineHeight:1.4 }}>{faq.q}</span>
                  <span style={{ fontSize:20, color:INDIGO, flexShrink:0, transform: openFaq===i ? "rotate(45deg)" : "none", transition:"transform 0.2s" }}>+</span>
                </button>
                {openFaq===i && (
                  <div style={{ padding:"14px 20px 18px", background:WHITE, fontSize:13.5, color:MUTED, lineHeight:1.75, borderTop:"1px solid #E2E8F0" }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div style={{ background:"linear-gradient(135deg,#0F172A 0%,#1E1B4B 100%)", padding:"clamp(40px,5vw,56px) clamp(20px,4vw,48px)", textAlign:"center" }}>
        <div style={{ maxWidth:540, margin:"0 auto" }}>
          <h2 style={{ fontSize:"clamp(22px,3vw,28px)", fontWeight:900, color:WHITE, marginBottom:12 }}>
            Never Walk Into an Enhancement Meeting Unprepared
          </h2>
          <p style={{ fontSize:14, color:"#CBD5E1", marginBottom:28, lineHeight:1.7 }}>
            Start with the free eligibility check, then pick the plan that suits your stage.
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={() => navigate("check")} style={{ background:ORANGE, color:WHITE, fontSize:14, fontWeight:700, padding:"13px 28px", borderRadius:8, border:"none", cursor:"pointer", fontFamily:"inherit" }}>
              Check My Eligibility First →
            </button>
            <button
              onClick={() => window.open(`https://wa.me/${WA}?text=${encodeURIComponent("Hi FinsightOne, I want to discuss the monthly monitoring plans")}`, "_blank")}
              style={{ background:"rgba(255,255,255,0.1)", color:WHITE, fontSize:14, fontWeight:600, padding:"13px 28px", borderRadius:8, border:"1px solid rgba(255,255,255,0.2)", cursor:"pointer", fontFamily:"inherit" }}>
              💬 Talk to Us
            </button>
          </div>
          <div style={{ fontSize:11, color:"#475569", marginTop:16 }}>🔒 No lock-in · Cancel anytime · excl. GST</div>
        </div>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}
