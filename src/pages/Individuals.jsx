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

const RAG = {
  g: { bg: "#F0FDF4", border: "#BBF7D0", text: GREEN },
  a: { bg: "#FFFBEB", border: "#FDE68A", text: "#92400E" },
  r: { bg: "#FEF2F2", border: "#FECACA", text: RED },
};

function IndRow({ label, value, note, rag }) {
  const c = RAG[rag];
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"5px 0", borderBottom:"1px solid #F3F4F6", gap:8 }}>
      <span style={{ fontSize:11, color:"#CBD5E1", fontWeight:600, minWidth:90 }}>{label}</span>
      <div style={{ display:"flex", alignItems:"center", gap:6, flex:1, justifyContent:"flex-end" }}>
        <span style={{ fontSize:11.5, fontWeight:700, color:DARK }}>{value}</span>
        <span style={{ fontSize:10, color:c.text, background:c.bg, border:`1px solid ${c.border}`, borderRadius:10, padding:"1px 7px", whiteSpace:"nowrap" }}>{note}</span>
      </div>
    </div>
  );
}

const LOANS = [
  {
    icon: "🏠", title: "Home Loan",
    desc: "We match you to the right lender based on your employment type, income structure, and property location. Salaried and self-employed are assessed differently — we know which lender suits which profile.",
    indicators: [
      { label:"CIBIL",   value:"650+",       note:"Best rates 750+",         rag:"g" },
      { label:"FOIR",    value:"Up to 85%",  note:"Incl. proposed EMI",      rag:"g" },
      { label:"LTV",     value:"Up to 90%",  note:"Of property value",       rag:"g" },
      { label:"Vintage", value:"2 yrs+",     note:"ITR / Form 16 required",  rag:"a" },
    ],
  },
  {
    icon: "💳", title: "Personal Loan",
    desc: "We check your active EMI burden, CIBIL, and employer type before advising on amount and lender — so your application is not rejected and your CIBIL does not drop from unnecessary enquiries.",
    indicators: [
      { label:"CIBIL",   value:"680+",       note:"Best rates 750+",         rag:"g" },
      { label:"FOIR",    value:"Up to 80%",  note:"Incl. proposed EMI",      rag:"g" },
      { label:"Collateral", value:"None",    note:"Fully unsecured",         rag:"g" },
      { label:"Income",  value:"Steady",     note:"Salary / business income",rag:"a" },
    ],
  },
  {
    icon: "🏢", title: "Loan Against Property (LAP)",
    desc: "Residential, commercial or industrial property. We review title chain, property age, valuation methodology, and applicable LTV before matching you to the right lender.",
    indicators: [
      { label:"CIBIL",   value:"650+",       note:"Best rates 720+",         rag:"g" },
      { label:"FOIR",    value:"Up to 90%",  note:"Incl. proposed EMI",      rag:"g" },
      { label:"LTV — Residential", value:"Up to 90%", note:"Clear title",   rag:"g" },
      { label:"LTV — Commercial",  value:"Up to 70%", note:"Leased preferred", rag:"a" },
      { label:"LTV — Industrial",  value:"Up to 60%", note:"NA plot / factory", rag:"a" },
    ],
  },
  {
    icon: "🚗", title: "Vehicle Loan",
    desc: "New or used commercial and personal vehicles. We assess your EMI capacity and match you to the lender with the best rate and LTV for your profile and vehicle type.",
    indicators: [
      { label:"CIBIL",   value:"650+",       note:"Best rates 720+",         rag:"g" },
      { label:"FOIR",    value:"Up to 70%",  note:"Incl. proposed EMI",      rag:"a" },
      { label:"LTV",     value:"Up to 85%",  note:"Of on-road price",        rag:"g" },
      { label:"Vintage", value:"1 yr+",      note:"Salaried or business",    rag:"g" },
    ],
  },
];

const PERSONAS = [
  {
    icon: "👔", title: "Salaried",
    desc: "Form 16, salary slips, employer type — PSU, private, or MNC — all affect your lender options and rate. We tell you which lender gives you the best rate for your employer category.",
    tags: ["Home Loan", "Personal Loan", "Vehicle Loan"],
  },
  {
    icon: "🏪", title: "Self-Employed",
    desc: "ITR consistency, GST returns, banking conduct — these drive your eligibility, not just your CIBIL. We identify gaps in your income documentation before you apply.",
    tags: ["LAP", "Home Loan", "Business Loan"],
  },
  {
    icon: "🌍", title: "NRI",
    desc: "FEMA compliance, power of attorney, co-applicant requirements, and repatriation rules — NRI home and LAP loans have specific lender policies. We navigate them for you.",
    tags: ["NRI Home Loan", "NRI LAP"],
  },
];

const REJECTIONS = [
  { icon:"📉", title:"Low CIBIL Score", desc:"Below 650 closes most lenders. Even 650–700 narrows your options. We identify what's pulling it down and build a fix-first plan before you apply." },
  { icon:"💸", title:"FOIR Too High", desc:"Too many existing EMIs. Your eligible amount drops or you get rejected entirely. We restructure the ask — amount, tenure, or facility type — to fit within your FOIR." },
  { icon:"📁", title:"Incomplete Documents", desc:"Missing ITR year, wrong property docs, outdated valuation. Banks reject on technicalities. We catch every gap before submission." },
  { icon:"🏦", title:"Wrong Lender", desc:"Every lender has specific appetite — employment type, property location, income source. A mismatch is a guaranteed rejection. We match first." },
  { icon:"🔄", title:"Multiple Enquiries", desc:"Every failed application leaves a hard enquiry that drops your CIBIL further. Stop applying blindly. One right application beats five wrong ones." },
  { icon:"🏠", title:"Property Issues", desc:"Title disputes, old construction, gram panchayat jurisdiction, unapproved plans — many lenders reject specific property types. We check the property before you apply." },
];

export default function Individuals({ navigate }) {
  return (
    <div style={{ fontFamily:"Arial,sans-serif", color:DARK }}>

      {/* HERO */}
      <div style={{ background:"linear-gradient(135deg,#0F172A 0%,#1E1B4B 100%)", padding:"clamp(44px,6vw,72px) clamp(20px,4vw,48px)", textAlign:"center" }}>
        <div style={{ maxWidth:780, margin:"0 auto" }}>
          <div style={{ display:"inline-block", background:"rgba(234,88,12,0.2)", border:"1px solid rgba(234,88,12,0.4)", color:"#FB923C", fontSize:11, fontWeight:700, letterSpacing:2, textTransform:"uppercase", padding:"5px 16px", borderRadius:100, marginBottom:20 }}>
            For Salaried & Self-Employed Individuals
          </div>
          <h1 style={{ fontSize:"clamp(26px,3.5vw,42px)", fontWeight:900, color:WHITE, lineHeight:1.2, marginBottom:16 }}>
            Know <span style={{ color:ORANGE }}>Exactly What You Qualify For</span><br />Before Applying Anywhere
          </h1>
          <p style={{ fontSize:15, color:"#CBD5E1", maxWidth:560, margin:"0 auto 32px", lineHeight:1.75 }}>
            Most loan rejections are not credit rejections — they are preparation rejections. We tell you what to fix, which lender to approach, and what amount you actually qualify for.
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={() => navigate("check")} style={{ background:ORANGE, color:WHITE, fontSize:14, fontWeight:700, padding:"13px 32px", borderRadius:8, border:"none", cursor:"pointer", fontFamily:"inherit" }}>
              Check My Eligibility — Free →
            </button>
            <button onClick={() => window.open(`https://wa.me/${WA}?text=${encodeURIComponent("Hi FinsightOne, I need help with my personal loan")}`, "_blank")}
              style={{ background:"rgba(255,255,255,0.1)", color:WHITE, fontSize:14, fontWeight:600, padding:"13px 28px", borderRadius:8, border:"1px solid rgba(255,255,255,0.2)", cursor:"pointer", fontFamily:"inherit" }}>
              💬 Talk to an Expert
            </button>
          </div>
        </div>
      </div>

      {/* TRUST BAR */}
      <div style={{ background:GRAY, borderBottom:"1px solid #E5E7EB", padding:"16px clamp(20px,4vw,48px)", display:"flex", justifyContent:"space-around", flexWrap:"wrap", gap:16 }}>
        {[["₹0","To Check Eligibility"],["72 hrs","Report Delivery"],["20 yrs","Banking Expertise"],["PAN India","Coverage"]].map(([v,l]) => (
          <div key={l} style={{ textAlign:"center" }}>
            <div style={{ fontSize:20, fontWeight:900, color:ORANGE }}>{v}</div>
            <div style={{ fontSize:11, color:MUTED, marginTop:2 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* PERSONAS */}
      <div style={{ background:WHITE, padding:"clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:2.5, color:ORANGE, textTransform:"uppercase", marginBottom:10 }}>Who We Help</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,28px)", fontWeight:900, color:DARK }}>Salaried, Self-Employed or NRI — We Cover All</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:18 }}>
            {PERSONAS.map(p => (
              <div key={p.title} style={{ background:"#EEF2FF", border:"1px solid #C7D2FE", borderRadius:12, padding:"22px 20px" }}>
                <div style={{ fontSize:30, marginBottom:10 }}>{p.icon}</div>
                <div style={{ fontSize:16, fontWeight:800, color:DARK, marginBottom:8 }}>{p.title}</div>
                <p style={{ fontSize:13, color:MUTED, lineHeight:1.65, marginBottom:14 }}>{p.desc}</p>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ background:WHITE, border:"1px solid #C7D2FE", color:INDIGO, fontSize:10.5, fontWeight:700, padding:"2px 8px", borderRadius:10 }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LOAN PRODUCTS WITH INDICATORS */}
      <div style={{ background:GRAY, padding:"clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:12 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:2.5, color:ORANGE, textTransform:"uppercase", marginBottom:10 }}>Loan Products</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,28px)", fontWeight:900, color:DARK, marginBottom:10 }}>All Individual Loan Products Covered</h2>
            <p style={{ fontSize:13.5, color:MUTED, maxWidth:560, margin:"0 auto 12px", lineHeight:1.6 }}>
              Each card shows what lenders typically look for — not our cutoffs. Borderline on any indicator? We know which lenders have higher appetite.
            </p>
            {/* RAG legend */}
            <div style={{ display:"inline-flex", alignItems:"center", gap:14, background:WHITE, border:"1px solid #E5E7EB", borderRadius:20, padding:"6px 16px", marginBottom:36 }}>
              {[["g","Strong fit"],["a","Depends on lender"]].map(([rag,label]) => (
                <div key={rag} style={{ display:"flex", alignItems:"center", gap:5 }}>
                  <span style={{ width:8, height:8, borderRadius:"50%", background:RAG[rag].text, display:"inline-block" }} />
                  <span style={{ fontSize:11, color:MUTED, fontWeight:500 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:18 }}>
            {LOANS.map(loan => (
              <div key={loan.title} style={{ background:WHITE, border:"1px solid #E5E7EB", borderRadius:12, overflow:"hidden", display:"flex", flexDirection:"column" }}>
                <div style={{ padding:"20px 20px 14px", flex:1 }}>
                  <div style={{ fontSize:26, marginBottom:10 }}>{loan.icon}</div>
                  <h3 style={{ fontSize:15, fontWeight:700, color:DARK, marginBottom:8 }}>{loan.title}</h3>
                  <p style={{ fontSize:12.5, color:MUTED, lineHeight:1.6, marginBottom:14 }}>{loan.desc}</p>
                  {/* Indicators */}
                  <div style={{ background:GRAY, borderRadius:8, padding:"10px 12px" }}>
                    <div style={{ fontSize:9.5, fontWeight:800, color:MUTED, letterSpacing:1.5, textTransform:"uppercase", marginBottom:8 }}>
                      What lenders typically look for
                    </div>
                    {loan.indicators.map(ind => <IndRow key={ind.label} {...ind} />)}
                    <div style={{ marginTop:8, paddingTop:6, borderTop:"1px dashed #E5E7EB" }}>
                      <span onClick={() => navigate("check")} style={{ fontSize:11, color:INDIGO, fontWeight:700, cursor:"pointer", textDecoration:"underline" }}>
                        Not sure where you stand? Free check →
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ padding:"12px 20px 16px", borderTop:"1px solid #F3F4F6" }}>
                  <button onClick={() => navigate("check")} style={{ width:"100%", padding:"9px 0", borderRadius:8, fontSize:12.5, fontWeight:700, cursor:"pointer", background:ORANGE, color:WHITE, border:"none", fontFamily:"inherit" }}>
                    Check My Eligibility — Free →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* REJECTION REASONS */}
      <div style={{ background:WHITE, padding:"clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:2.5, color:ORANGE, textTransform:"uppercase", marginBottom:10 }}>Why Loans Get Rejected</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,28px)", fontWeight:900, color:DARK, marginBottom:10 }}>6 Most Common Individual Rejection Reasons</h2>
            <p style={{ fontSize:14, color:MUTED, maxWidth:500, margin:"0 auto" }}>Every one is fixable. We identify which apply to your profile and fix them before submission.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:16 }}>
            {REJECTIONS.map(r => (
              <div key={r.title} style={{ background:GRAY, border:"1px solid #E5E7EB", borderRadius:10, padding:"18px 18px", borderLeft:`3px solid ${RED}` }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                  <span style={{ fontSize:22 }}>{r.icon}</span>
                  <span style={{ fontSize:14, fontWeight:700, color:DARK }}>{r.title}</span>
                </div>
                <p style={{ fontSize:12.5, color:MUTED, lineHeight:1.65, margin:0 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WHY PAY — kept, upgraded */}
      <div style={{ background:GRAY, padding:"clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:2.5, color:ORANGE, textTransform:"uppercase", marginBottom:10 }}>The Honest Answer</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,28px)", fontWeight:900, color:DARK }}>Why Pay When Banks and DSAs Are Free?</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:20, marginBottom:24 }}>
            {[
              { who:"Banks", icon:"🏦", color:RED, bg:"#FEF2F2", text:"Work for themselves. Their job is to reject risky files. They will not tell you what to fix — they simply reject and move on." },
              { who:"DSAs / Agents", icon:"🧾", color:"#D97706", bg:"#FFFBEB", text:"Work for lender commission — not for you. They submit your file to whoever pays them most, not whoever is most likely to approve you." },
              { who:"FinsightOne", icon:"✅", color:GREEN, bg:"#F0FDF4", text:"We work for you. We tell you the truth — even if it means telling you not to apply yet. That saves your CIBIL from unnecessary rejections." },
            ].map(o => (
              <div key={o.who} style={{ background:o.bg, borderRadius:12, padding:24, border:`1px solid ${o.color}20` }}>
                <div style={{ fontSize:24, marginBottom:10 }}>{o.icon}</div>
                <div style={{ fontSize:15, fontWeight:700, color:o.color, marginBottom:8 }}>{o.who}</div>
                <p style={{ fontSize:13, color:"#374151", lineHeight:1.65, margin:0 }}>{o.text}</p>
              </div>
            ))}
          </div>
          <div style={{ background:WHITE, border:"1px solid #FDE68A", borderRadius:10, padding:"18px 22px", textAlign:"center" }}>
            <div style={{ fontSize:14, color:"#92400E", lineHeight:1.75 }}>
              <strong>The numbers:</strong> A home loan of ₹60L at 8.5% vs 9.5% over 20 years = difference of <strong>₹8,40,000</strong> in total interest paid. Getting matched to the right lender saves you far more than our fee.
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div style={{ background:`linear-gradient(135deg,#0F172A 0%,#1E1B4B 100%)`, padding:"clamp(40px,5vw,64px) clamp(20px,4vw,48px)", textAlign:"center" }}>
        <div style={{ maxWidth:560, margin:"0 auto" }}>
          <h2 style={{ fontSize:"clamp(22px,3vw,30px)", fontWeight:900, color:WHITE, marginBottom:12 }}>
            Start with a Free Eligibility Check
          </h2>
          <p style={{ fontSize:14, color:"#CBD5E1", marginBottom:28, lineHeight:1.7 }}>
            2 minutes. No documents. Know your chances before approaching any bank.
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={() => navigate("check")} style={{ background:ORANGE, color:WHITE, fontSize:14, fontWeight:700, padding:"13px 32px", borderRadius:8, border:"none", cursor:"pointer", fontFamily:"inherit" }}>
              Check My Eligibility — Free →
            </button>
            <button onClick={() => window.open(`https://wa.me/${WA}?text=${encodeURIComponent("Hi FinsightOne, I need help with my personal loan")}`, "_blank")}
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
