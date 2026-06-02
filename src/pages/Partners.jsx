import { useState } from "react";
import Footer from "../components/Footer";

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
    icon: "📊", title: "Chartered Accountants",
    desc: "Your MSME clients need loans every year. You prepare their financials but earn nothing from the lending side. FinsightOne lets you add a credit advisory revenue line to your practice — without adding headcount.",
    tags: ["Sub-DSA income", "White-label monitoring", "Document preparation"],
  },
  {
    icon: "🤝", title: "DSA Agents",
    desc: "You're limited to one or two lenders. Every mismatch is a lost referral. FinsightOne gives you access to a wider lender universe — so you place more cases, earn more per case, and stop losing clients to competitors.",
    tags: ["More lenders", "Rejection recovery income", "Higher placement rate"],
  },
  {
    icon: "🛡️", title: "Insurance Agents & IFAs",
    desc: "Your clients already trust you with their finances. A loan advisory channel is a natural extension. Refer, track, and earn — without building any credit expertise yourself.",
    tags: ["Passive referral income", "No credit expertise needed", "Recurring monthly income"],
  },
  {
    icon: "💼", title: "Financial Advisors & Consultants",
    desc: "You advise on investments but your clients still go elsewhere for loans. Keep them in your ecosystem. FinsightOne handles the credit work — you earn the referral income.",
    tags: ["Full-service offering", "Client retention", "Three income streams"],
  },
];

const STREAMS = [
  {
    num: "01", icon: "🏦",
    color: INDIGO, bg: "#EEF2FF", border: "#C7D2FE",
    title: "Sub-DSA Referral Income",
    pitch: "Refer a client for any loan — home loan, business loan, LAP, personal loan. When the loan disburses, you earn a referral payout. Competitive rates across all loan types. Exact structure shared on onboarding call.",
    earn: "On every disbursement",
    when: "Paid within 7 days of disbursement",
    bullets: [
      "All loan types — business, home, LAP, personal",
      "200+ lender network — never lose a referral",
      "We handle all documentation and submission",
      "You track every case on your partner dashboard",
    ],
  },
  {
    num: "02", icon: "📊",
    color: GREEN, bg: "#F0FDF4", border: "#BBF7D0",
    title: "White-Label Monthly Monitoring",
    pitch: "Offer your MSME clients a monthly financial health monitoring service — under your firm name. FinsightOne does all the analysis. You collect the subscription, we do the work, you keep the margin.",
    earn: "Recurring every month",
    when: "Passive — as long as client subscribes",
    bullets: [
      "Your firm name on every report — FinsightOne invisible",
      "Monthly business health reports delivered to your client",
      "CIBIL tracking, banking conduct alerts, WC analysis",
      "Margin structure shared on onboarding call",
    ],
  },
  {
    num: "03", icon: "🔄",
    color: ORANGE, bg: "#FFF7ED", border: "#FED7AA",
    title: "Rejection Recovery Channel",
    pitch: "Your client's loan was rejected. Normally you earn nothing. With FinsightOne, refer the rejected case to us — we analyse, fix, and resubmit. You earn a flat fee per case, regardless of loan amount.",
    earn: "Per rejected case referred",
    when: "Paid on engagement confirmation",
    bullets: [
      "Earn even when the loan doesn't disburse",
      "Flat fee structure — no amount dependency",
      "We handle full recovery — you just refer",
      "Converts dead leads into active income",
    ],
  },
];

const COMPARISON = [
  ["Lender coverage",         "One bank only",          "200+ banks and NBFCs"],
  ["When you earn",           "Only on disbursement",   "Disbursement + monthly + rejection recovery"],
  ["Rejected cases",          "You earn nothing",       "Flat fee per case regardless of amount"],
  ["Monthly passive income",  "Not available",          "White-label monitoring — recurring"],
  ["Document preparation",    "You do it yourself",     "We prepare everything — you just refer"],
  ["Your client sees",        "Bank or your firm",      "Your firm only — FinsightOne invisible"],
  ["Dashboard & tracking",    "No visibility",          "Real-time partner portal — full transparency"],
  ["Payout structure",        "Fixed bank rate",        "Discussed and structured on onboarding call"],
];

const STEPS = [
  { num:"1", title:"Register",      desc:"Fill the form below or WhatsApp us. Free to join. No upfront cost.", badge:"Free" },
  { num:"2", title:"Onboarding Call", desc:"30-minute call with our partner team. We walk you through all three income streams and agree on your payout structure.", badge:"30 mins" },
  { num:"3", title:"Get Your Link", desc:"Your unique partner referral link is ready within 24 hours of onboarding. Share it or use it to track your referrals.", badge:"24 hrs" },
  { num:"4", title:"Refer & Earn",  desc:"Start referring clients. Track every case on your dashboard. Get paid on every disbursement, monthly, and per recovery case.", badge:"Ongoing" },
];

const FAQS = [
  {
    q: "Do my clients know I am using FinsightOne?",
    a: "No — unless you want them to. The white-label monitoring reports carry your firm name. All client communication is routed through you. FinsightOne is your back-office, not your brand on the file.",
  },
  {
    q: "When exactly do I get paid?",
    a: "Sub-DSA payouts are released within 7 working days of loan disbursement confirmation from the lender. White-label monitoring margins are settled monthly. Rejection recovery fees are paid on engagement confirmation. Exact timelines are confirmed in your partner agreement.",
  },
  {
    q: "What if my client gets rejected after I refer them?",
    a: "You still earn — through the Rejection Recovery channel. We analyse the rejection, build a recovery plan, and resubmit to a more suitable lender. You earn a flat referral fee for the recovery case, separate from the original disbursement payout.",
  },
  {
    q: "Is there a minimum number of referrals required?",
    a: "No minimum. You can refer one client or a hundred. The programme is designed to work alongside your existing practice — not replace it. There is no lock-in, no targets, and no penalty for low activity.",
  },
  {
    q: "What is the payout percentage?",
    a: "Payout rates vary by loan type, ticket size, and partnership tier. We share the full structure on your onboarding call — it is competitive with or better than standard bank DSA rates, with the addition of two income streams banks do not offer.",
  },
];

export default function Partners({ navigate }) {
  const [openFaq, setOpenFaq] = useState(null);

  const waLink = (msg) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

  return (
    <div style={{ fontFamily:"Arial,'Helvetica Neue',sans-serif", color:DARK }}>

      {/* HERO */}
      <div style={{ background:`linear-gradient(135deg,#0F172A 0%,#1A3357 100%)`, padding:"clamp(48px,7vw,80px) clamp(20px,5vw,48px)" }}>
        <div style={{ maxWidth:820, margin:"0 auto", textAlign:"center" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(234,88,12,0.2)", border:"1px solid rgba(234,88,12,0.4)", color:"#FB923C", fontSize:11, fontWeight:700, padding:"5px 14px", borderRadius:20, marginBottom:20, letterSpacing:1.5, textTransform:"uppercase" }}>
            CA & DSA Partnership Programme
          </div>
          <h1 style={{ fontSize:"clamp(26px,4.5vw,42px)", fontWeight:900, color:WHITE, marginBottom:16, lineHeight:1.2 }}>
            Three Income Streams<br />
            <span style={{ color:"#FB923C" }}>Your Bank DSA Doesn't Offer</span>
          </h1>
          <p style={{ fontSize:"clamp(14px,2vw,16px)", color:"#CBD5E1", maxWidth:620, margin:"0 auto 28px", lineHeight:1.75 }}>
            Earn from every client referral — including the ones who get rejected. Add a monthly passive income line. White-label our services under your firm name. Payout structure discussed personally on your onboarding call.
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button
              onClick={() => document.getElementById("register").scrollIntoView({ behavior:"smooth" })}
              style={{ background:ORANGE, color:WHITE, fontSize:14, fontWeight:700, padding:"13px 28px", borderRadius:8, border:"none", cursor:"pointer", fontFamily:"inherit" }}>
              Register as Partner — Free →
            </button>
            <button
              onClick={() => window.open(waLink("Hi FinsightOne, I want to know more about the CA/DSA Partner programme"), "_blank")}
              style={{ background:"rgba(255,255,255,0.1)", color:WHITE, fontSize:14, fontWeight:600, padding:"13px 28px", borderRadius:8, border:"1px solid rgba(255,255,255,0.2)", cursor:"pointer", fontFamily:"inherit" }}>
              💬 WhatsApp Us First
            </button>
          </div>
        </div>
      </div>

      {/* TRUST BAR */}
      <div style={{ background:"#F8FAFC", borderBottom:"1px solid #E2E8F0", padding:"14px clamp(20px,5vw,48px)" }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"flex", justifyContent:"center", gap:"clamp(20px,4vw,56px)", flexWrap:"wrap" }}>
          {[["₹0","Cost to Join"],["3","Income Streams"],["200+","Lender Network"],["24 hrs","Partner Link Ready"]].map(([v,l]) => (
            <div key={l} style={{ textAlign:"center" }}>
              <div style={{ fontSize:18, fontWeight:900, color:ORANGE }}>{v}</div>
              <div style={{ fontSize:11, color:MUTED, marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* WHO IS THIS FOR */}
      <div style={{ background:WHITE, padding:"clamp(40px,6vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ maxWidth:1040, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <div style={{ fontSize:11, fontWeight:700, color:ORANGE, letterSpacing:2.5, textTransform:"uppercase", marginBottom:8 }}>Who Is This For</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,28px)", fontWeight:900, color:DARK }}>Built for Professionals Who Already Have Clients</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:18 }}>
            {PERSONAS.map(p => (
              <div key={p.title} style={{ background:GRAY, border:"1px solid #E2E8F0", borderRadius:12, padding:"20px 18px" }}>
                <div style={{ fontSize:28, marginBottom:10 }}>{p.icon}</div>
                <div style={{ fontSize:14, fontWeight:700, color:DARK, marginBottom:7, lineHeight:1.3 }}>{p.title}</div>
                <p style={{ fontSize:12.5, color:MUTED, lineHeight:1.65, marginBottom:14 }}>{p.desc}</p>
                <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ background:WHITE, border:`1px solid ${ORANGE}40`, color:ORANGE, fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:10 }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* THREE INCOME STREAMS */}
      <div style={{ background:GRAY, padding:"clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ maxWidth:1060, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <div style={{ fontSize:11, fontWeight:700, color:ORANGE, letterSpacing:2.5, textTransform:"uppercase", marginBottom:8 }}>Three Ways to Earn</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,28px)", fontWeight:900, color:DARK, marginBottom:10 }}>Your Revenue Model as a FinsightOne Partner</h2>
            <p style={{ fontSize:14, color:MUTED, maxWidth:520, margin:"0 auto" }}>Payout rates for each stream are discussed and agreed personally on your onboarding call.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:20 }}>
            {STREAMS.map(s => (
              <div key={s.num} style={{ border:`1px solid ${s.border}`, borderRadius:14, overflow:"hidden", background:WHITE, borderTop:`4px solid ${s.color}`, display:"flex", flexDirection:"column" }}>
                <div style={{ padding:"22px 22px 16px", flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                    <span style={{ fontSize:26 }}>{s.icon}</span>
                    <div>
                      <div style={{ fontSize:9, fontWeight:800, color:s.color, letterSpacing:1.5, textTransform:"uppercase" }}>Stream {s.num}</div>
                      <div style={{ fontSize:15, fontWeight:800, color:DARK }}>{s.title}</div>
                    </div>
                  </div>
                  <p style={{ fontSize:13, color:MUTED, lineHeight:1.65, marginBottom:16 }}>{s.pitch}</p>
                  {s.bullets.map((b,i) => (
                    <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:8, marginBottom:7 }}>
                      <span style={{ color:s.color, fontWeight:900, fontSize:11, marginTop:2, flexShrink:0 }}>✓</span>
                      <span style={{ fontSize:12.5, color:DARK, lineHeight:1.4 }}>{b}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding:"14px 22px 18px", borderTop:"1px solid #F1F5F9", background:s.bg }}>
                  <div style={{ fontSize:12, fontWeight:700, color:s.color, marginBottom:2 }}>{s.earn}</div>
                  <div style={{ fontSize:11, color:MUTED }}>{s.when}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COMPARISON TABLE */}
      <div style={{ background:WHITE, padding:"clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <div style={{ fontSize:11, fontWeight:700, color:ORANGE, letterSpacing:2.5, textTransform:"uppercase", marginBottom:8 }}>The Honest Comparison</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,28px)", fontWeight:900, color:DARK, marginBottom:10 }}>FinsightOne vs Bank DSA Channel</h2>
            <p style={{ fontSize:14, color:MUTED, maxWidth:500, margin:"0 auto" }}>We are not asking you to leave your bank DSA. We are offering the income your bank DSA cannot give you.</p>
          </div>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
              <thead>
                <tr>
                  <th style={{ background:GRAY, padding:"12px 16px", textAlign:"left", color:MUTED, fontWeight:600, borderBottom:"1px solid #E5E7EB", fontSize:12 }}>Feature</th>
                  <th style={{ background:GRAY, padding:"12px 16px", textAlign:"center", color:MUTED, fontWeight:600, borderBottom:"1px solid #E5E7EB", fontSize:12 }}>Bank DSA Channel</th>
                  <th style={{ background:WHITE, padding:"12px 16px", textAlign:"center", color:ORANGE, fontWeight:700, borderBottom:"1px solid #E5E7EB", fontSize:12 }}>FinsightOne Partner</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map(([feat, bank, fs], i) => (
                  <tr key={feat} style={{ background: i % 2 === 0 ? WHITE : GRAY }}>
                    <td style={{ padding:"11px 16px", color:"#374151", fontWeight:500, borderBottom:"1px solid #F3F4F6" }}>{feat}</td>
                    <td style={{ padding:"11px 16px", color:"#9CA3AF", textAlign:"center", borderBottom:"1px solid #F3F4F6" }}>{bank}</td>
                    <td style={{ padding:"11px 16px", color:GREEN, textAlign:"center", fontWeight:600, borderBottom:"1px solid #F3F4F6", background:"rgba(5,150,105,0.04)" }}>{fs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ background:GRAY, padding:"clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <div style={{ fontSize:11, fontWeight:700, color:ORANGE, letterSpacing:2.5, textTransform:"uppercase", marginBottom:8 }}>How It Works</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,28px)", fontWeight:900, color:DARK }}>Start Earning in 4 Steps</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:24 }}>
            {STEPS.map(s => (
              <div key={s.num} style={{ textAlign:"center" }}>
                <div style={{ position:"relative", display:"inline-block", marginBottom:14 }}>
                  <div style={{ width:48, height:48, borderRadius:"50%", background:INDIGO, color:WHITE, fontSize:18, fontWeight:900, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto" }}>{s.num}</div>
                  <div style={{ position:"absolute", top:-6, right:-28, background:ORANGE, color:WHITE, fontSize:9, fontWeight:700, padding:"2px 6px", borderRadius:10, whiteSpace:"nowrap" }}>{s.badge}</div>
                </div>
                <div style={{ fontSize:13, fontWeight:700, color:DARK, marginBottom:6 }}>{s.title}</div>
                <div style={{ fontSize:12, color:MUTED, lineHeight:1.55 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ background:WHITE, padding:"clamp(40px,6vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ maxWidth:760, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:32 }}>
            <div style={{ fontSize:11, fontWeight:700, color:ORANGE, letterSpacing:2.5, textTransform:"uppercase", marginBottom:8 }}>FAQ</div>
            <h2 style={{ fontSize:"clamp(20px,3vw,28px)", fontWeight:900, color:DARK }}>Common Partner Questions</h2>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {FAQS.map((faq,i) => (
              <div key={i} style={{ border:"1px solid #E2E8F0", borderRadius:10, overflow:"hidden" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 20px", background: openFaq === i ? "#EEF2FF" : WHITE, border:"none", cursor:"pointer", fontFamily:"inherit", gap:12 }}>
                  <span style={{ fontSize:14, fontWeight:700, color: openFaq === i ? INDIGO : DARK, textAlign:"left", lineHeight:1.4 }}>{faq.q}</span>
                  <span style={{ fontSize:20, color:INDIGO, flexShrink:0, transform: openFaq === i ? "rotate(45deg)" : "none", transition:"transform 0.2s" }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding:"14px 20px 18px", background:WHITE, fontSize:13.5, color:MUTED, lineHeight:1.75, borderTop:"1px solid #E2E8F0" }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* REGISTER FORM */}
      <div id="register" style={{ background:GRAY, padding:"clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ maxWidth:580, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:32 }}>
            <div style={{ fontSize:11, fontWeight:700, color:ORANGE, letterSpacing:2.5, textTransform:"uppercase", marginBottom:8 }}>Get Started</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,26px)", fontWeight:900, color:DARK, marginBottom:8 }}>Register as a Partner</h2>
            <p style={{ fontSize:13.5, color:MUTED }}>Free to join. Your onboarding call will be scheduled within 24 hours.</p>
          </div>

          {/* WhatsApp option */}
          <div style={{ background:"#F0FDF4", border:"1px solid #BBF7D0", borderRadius:10, padding:"14px 18px", marginBottom:20, display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, flexWrap:"wrap" }}>
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:GREEN, marginBottom:2 }}>Register via WhatsApp — 2 minutes</div>
              <div style={{ fontSize:12, color:MUTED }}>Send us a message and we'll set up your account on the call.</div>
            </div>
            <button
              onClick={() => window.open(waLink("Hi FinsightOne, I want to register as a CA/DSA Partner"), "_blank")}
              style={{ background:"#25D366", color:WHITE, fontSize:13, fontWeight:700, padding:"10px 18px", borderRadius:8, border:"none", cursor:"pointer", fontFamily:"inherit", flexShrink:0 }}>
              💬 WhatsApp Us
            </button>
          </div>

          <div style={{ textAlign:"center", color:MUTED, fontSize:12, marginBottom:20 }}>— or fill the form below —</div>

          <div style={{ background:WHITE, border:"1px solid #E5E7EB", borderRadius:14, padding:28 }}>
            {[
              { label:"Full Name",      ph:"CA Rajesh Mehta" },
              { label:"Firm Name",      ph:"Mehta & Associates" },
              { label:"Mobile Number",  ph:"98xxxxxxxx" },
              { label:"Email Address",  ph:"rajesh@mehtaassociates.com" },
              { label:"City",           ph:"Pune" },
            ].map(f => (
              <div key={f.label} style={{ marginBottom:14 }}>
                <div style={{ fontSize:12, fontWeight:700, color:"#374151", marginBottom:5 }}>{f.label}</div>
                <input placeholder={f.ph} style={{ width:"100%", border:"1px solid #D1D5DB", borderRadius:6, padding:"10px 12px", fontSize:13, color:"#374151", boxSizing:"border-box", fontFamily:"inherit", outline:"none" }} />
              </div>
            ))}
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:12, fontWeight:700, color:"#374151", marginBottom:5 }}>I am a...</div>
              <select style={{ width:"100%", border:"1px solid #D1D5DB", borderRadius:6, padding:"10px 12px", fontSize:13, color:"#374151", boxSizing:"border-box", background:WHITE, fontFamily:"inherit" }}>
                <option>Chartered Accountant</option>
                <option>Tax Consultant</option>
                <option>DSA Agent</option>
                <option>Financial Advisor</option>
                <option>Insurance Agent</option>
                <option>Other</option>
              </select>
            </div>
            <button
              onClick={() => navigate("partnerlogin")}
              style={{ width:"100%", background:ORANGE, color:WHITE, fontSize:14, fontWeight:700, padding:13, borderRadius:8, border:"none", cursor:"pointer", marginTop:8, fontFamily:"inherit" }}>
              Submit Partner Application →
            </button>
            <div style={{ fontSize:11, color:"#9CA3AF", textAlign:"center", marginTop:10 }}>
              We review all applications within 24 hours. Your onboarding call will be booked on WhatsApp.
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div style={{ background:`linear-gradient(135deg,#0F172A 0%,#1A3357 100%)`, padding:"clamp(40px,5vw,56px) clamp(20px,4vw,48px)", textAlign:"center" }}>
        <div style={{ maxWidth:560, margin:"0 auto" }}>
          <h2 style={{ fontSize:"clamp(22px,3vw,28px)", fontWeight:900, color:WHITE, marginBottom:12 }}>
            Not Sure Yet?<br />
            <span style={{ color:"#FB923C" }}>Talk to Us First.</span>
          </h2>
          <p style={{ fontSize:14, color:"#CBD5E1", marginBottom:24, lineHeight:1.7 }}>
            30 minutes on WhatsApp. We explain the full partner structure, income potential, and what working with us looks like. No commitment needed.
          </p>
          <button
            onClick={() => window.open(waLink("Hi FinsightOne, I want to discuss the CA/DSA Partner programme"), "_blank")}
            style={{ background:"#25D366", color:WHITE, fontSize:14, fontWeight:700, padding:"13px 32px", borderRadius:8, border:"none", cursor:"pointer", fontFamily:"inherit" }}>
            💬 WhatsApp Us — Let's Talk
          </button>
          <div style={{ fontSize:11, color:"#475569", marginTop:14 }}>Free · No obligation · Payout structure shared on call</div>
        </div>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}
