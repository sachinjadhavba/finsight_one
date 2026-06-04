import { useState } from "react";

const SUPABASE_URL = "https://ujblebpqvkbnvxiscluk.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqYmxlYnBxdmtibnZ4aXNjbHVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMTkyMjUsImV4cCI6MjA5Mzc5NTIyNX0.usaa2zaABViXVsVfRvKJme-euj3K61hHfeyjIIItWVY";
const WA = "919579453635";

const sb = async (path, opts = {}) => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...opts,
    headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}`, "Content-Type": "application/json", ...(opts.headers || {}) },
  });
  if (!res.ok) throw new Error(await res.text());
  const text = await res.text();
  return text ? JSON.parse(text) : null;
};

const verifyPassword = async (username, password) => {
  const rows = await sb(`partners?username=eq.${encodeURIComponent(username)}&active=eq.true&select=id,username,password_hash,name,firm,partner_code,city,type`);
  if (!rows || rows.length === 0) return null;
  const partner = rows[0];
  const rpc = await fetch(`${SUPABASE_URL}/rest/v1/rpc/verify_partner_password`, {
    method: "POST",
    headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}`, "Content-Type": "application/json" },
    body: JSON.stringify({ p_password: password, p_hash: partner.password_hash }),
  });
  const match = await rpc.json();
  return match ? partner : null;
};

const fetchDashboard = async (partnerCode) => {
  const [referrals, payouts] = await Promise.all([
    sb(`referrals?partner_code=eq.${encodeURIComponent(partnerCode)}&order=created_at.desc&select=*`),
    sb(`partner_payouts?partner_id=eq.${encodeURIComponent(partnerCode)}&paid=eq.Yes&order=payment_date.desc&select=payout_id,payout_date,payment_date,payout_amount,payment_mode,utr_number,cases_converted`),
  ]);
  return { referrals: referrals || [], payouts: payouts || [] };
};

const C = {
  indigo:"#4F46E5", orange:"#EA580C", dark:"#0F172A", muted:"#64748B",
  white:"#FFFFFF", surface:"#F8FAFC", border:"#E2E8F0", light:"#EEF2FF", green:"#16A34A",
};

const statusBadge = (s) => ({
  Submitted:  { bg:"#EFF6FF", color:"#1D4ED8" },
  Processing: { bg:"#FEF3C7", color:"#92400E" },
  Approved:   { bg:"#DCFCE7", color:"#166534" },
  Disbursed:  { bg:"#DCFCE7", color:"#166534" },
  Rejected:   { bg:"#FEF2F2", color:"#991B1B" },
  Active:     { bg:"#DCFCE7", color:"#166534" },
  Paid:       { bg:"#F0FDF4", color:"#166534" },
}[s] || { bg:C.surface, color:C.muted });

const fmt  = (d) => d ? new Date(d).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}) : "—";
const fmtA = (n) => n ? `₹${Number(n).toLocaleString("en-IN")}` : "—";

const REFERRAL_TYPES = [
  { id:"Loan (Individual)",  icon:"🏠", sub:"Home / Personal / Vehicle" },
  { id:"Loan (MSME)",        icon:"🏭", sub:"WC / Term / Machinery / Unsecured" },
  { id:"Readiness Report",   icon:"📋", sub:"Loan readiness assessment" },
  { id:"Monitoring Report",  icon:"📊", sub:"Monthly credit monitoring" },
];

const Logo = ({ light }) => (
  <div style={{ display:"flex", alignItems:"baseline" }}>
    <span style={{ fontSize:18, fontWeight:900, color:C.indigo }}>Fin</span>
    <span style={{ fontSize:18, fontWeight:900, color:light?C.white:C.dark }}>sight</span>
    <span style={{ fontSize:18, fontWeight:200, color:light?"#94A3B8":C.muted }}>&nbsp;One</span>
    <span style={{ display:"inline-block", width:4, height:4, background:C.orange, borderRadius:"50%", marginLeft:1, marginBottom:6 }} />
  </div>
);

// ── REFER MODAL ────────────────────────────────────────────────────────────
function ReferModal({ partnerCode, onClose }) {
  const [type, setType]       = useState("");
  const [name, setName]       = useState("");
  const [mobile, setMobile]   = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr]         = useState("");

  const submit = async () => {
    if (!type)              { setErr("Please select a service type."); return; }
    if (!name.trim())       { setErr("Please enter client name."); return; }
    if (!/^[6-9]\d{9}$/.test(mobile.trim())) { setErr("Enter valid 10-digit mobile number."); return; }
    setLoading(true); setErr("");
    try {
      await sb("referrals", {
        method: "POST",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({ partner_code: partnerCode, client_name: name.trim(), service: type, referral_type: type, status: "Submitted" }),
      });
      setSubmitted(true);
    } catch(e) { setErr("Failed to submit. Please try again."); }
    setLoading(false);
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(15,23,42,0.75)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ background:C.white, borderRadius:16, padding:"28px 24px", width:"100%", maxWidth:460, boxShadow:"0 24px 64px rgba(0,0,0,0.3)", maxHeight:"90vh", overflowY:"auto" }}>
        {submitted ? (
          <div style={{ textAlign:"center", padding:"20px 0" }}>
            <div style={{ fontSize:44, marginBottom:12 }}>✅</div>
            <div style={{ fontSize:18, fontWeight:800, color:C.dark, marginBottom:8 }}>Referral Submitted!</div>
            <div style={{ fontSize:13, color:C.muted, marginBottom:24 }}>We'll reach out to your client within 24 hours.</div>
            <button onClick={onClose} style={{ background:C.indigo, color:C.white, border:"none", borderRadius:8, padding:"11px 28px", fontWeight:700, fontSize:14, cursor:"pointer" }}>Done</button>
          </div>
        ) : (
          <>
            <div style={{ fontSize:18, fontWeight:800, color:C.dark, marginBottom:3 }}>Refer a Client</div>
            <div style={{ fontSize:13, color:C.muted, marginBottom:20 }}>Select service type and enter client details</div>

            <div style={{ fontSize:11, fontWeight:700, color:"#374151", marginBottom:8, textTransform:"uppercase", letterSpacing:0.6 }}>Service Type</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:18 }}>
              {REFERRAL_TYPES.map(t => (
                <button key={t.id} onClick={() => setType(t.id)}
                  style={{ padding:"12px", borderRadius:8, border:`2px solid ${type===t.id?C.indigo:C.border}`, background:type===t.id?C.light:C.white, cursor:"pointer", textAlign:"left", transition:"all 0.15s" }}>
                  <div style={{ fontSize:18, marginBottom:4 }}>{t.icon}</div>
                  <div style={{ fontSize:12, fontWeight:700, color:type===t.id?C.indigo:C.dark }}>{t.id}</div>
                  <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>{t.sub}</div>
                </button>
              ))}
            </div>

            <div style={{ marginBottom:14 }}>
              <label style={{ fontSize:11, fontWeight:700, color:"#374151", display:"block", marginBottom:5, textTransform:"uppercase", letterSpacing:0.6 }}>Client Name</label>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name"
                style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:8, padding:"10px 14px", fontSize:14, boxSizing:"border-box", fontFamily:"inherit", outline:"none" }} />
            </div>

            <div style={{ marginBottom:20 }}>
              <label style={{ fontSize:11, fontWeight:700, color:"#374151", display:"block", marginBottom:5, textTransform:"uppercase", letterSpacing:0.6 }}>Client Mobile</label>
              <input value={mobile} onChange={e=>setMobile(e.target.value)} placeholder="10-digit mobile" maxLength={10}
                style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:8, padding:"10px 14px", fontSize:14, boxSizing:"border-box", fontFamily:"inherit", outline:"none" }} />
            </div>

            {err && <div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:8, padding:"9px 14px", fontSize:13, color:"#DC2626", marginBottom:14 }}>{err}</div>}

            <div style={{ display:"flex", gap:10 }}>
              <button onClick={onClose} style={{ flex:1, background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, padding:"11px", fontSize:14, fontWeight:600, cursor:"pointer", color:C.muted }}>Cancel</button>
              <button onClick={submit} disabled={loading}
                style={{ flex:2, background:loading?"#A5B4FC":C.indigo, color:C.white, border:"none", borderRadius:8, padding:"11px", fontSize:14, fontWeight:700, cursor:loading?"not-allowed":"pointer" }}>
                {loading ? "Submitting…" : "Submit Referral →"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── HOME ───────────────────────────────────────────────────────────────────
function PortalHome({ partner, onNavigate }) {
  return (
    <div>
      <div style={{ background:`linear-gradient(135deg,${C.dark} 0%,#1E1B4B 100%)`, padding:"48px 24px", textAlign:"center", color:C.white }}>
        <div style={{ fontSize:12, color:"#818CF8", fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:10 }}>Welcome back</div>
        <div style={{ fontSize:26, fontWeight:900, marginBottom:6 }}>{partner.name}</div>
        <div style={{ fontSize:13, color:"#94A3B8", marginBottom:20 }}>{partner.firm} · {partner.city} · <span style={{ color:"#818CF8" }}>{partner.type}</span></div>
        <div style={{ display:"inline-flex", background:"rgba(255,255,255,0.08)", borderRadius:10, padding:"10px 20px", gap:16, alignItems:"center" }}>
          <span style={{ fontSize:11, color:"#94A3B8", textTransform:"uppercase", letterSpacing:1 }}>Partner Code</span>
          <span style={{ fontSize:16, fontWeight:900, color:"#818CF8", letterSpacing:3 }}>{partner.partner_code}</span>
        </div>
      </div>
      <div style={{ maxWidth:700, margin:"0 auto", padding:"28px 20px 60px" }}>
        <div style={{ fontSize:12, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:1, marginBottom:14 }}>Quick Actions</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:12, marginBottom:32 }}>
          {[
            { icon:"📋", label:"Dashboard",       desc:"Referrals & status",    page:"dashboard" },
            { icon:"➕", label:"Refer a Client",  desc:"Submit new referral",   page:"refer" },
            { icon:"💳", label:"Earnings",        desc:"View payout history",   page:"earnings" },
            { icon:"📚", label:"Resources",       desc:"Guides & commission",   page:"resources" },
            { icon:"❓", label:"FAQs",            desc:"Common questions",      page:"faqs" },
            { icon:"💬", label:"Support",         desc:"Contact us",            page:"support" },
          ].map(a => (
            <button key={a.page} onClick={() => onNavigate(a.page)}
              style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:12, padding:"16px", textAlign:"left", cursor:"pointer" }}
              onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 16px rgba(79,70,229,0.12)"}
              onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
              <div style={{ fontSize:22, marginBottom:6 }}>{a.icon}</div>
              <div style={{ fontSize:13, fontWeight:800, color:C.dark, marginBottom:2 }}>{a.label}</div>
              <div style={{ fontSize:11, color:C.muted }}>{a.desc}</div>
            </button>
          ))}
        </div>
        <div style={{ fontSize:12, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:1, marginBottom:14 }}>How It Works</div>
        {[["1","Refer a client","Submit name, mobile, service type — takes 30 seconds"],
          ["2","We reach out","Our team contacts client within 24 hours"],
          ["3","Case converts","Loan sanctioned or report delivered"],
          ["4","You get paid","Payout credited per agreed commission structure"]
        ].map(([n,t,d]) => (
          <div key={n} style={{ display:"flex", gap:14, padding:"13px 0", borderBottom:`1px solid ${C.border}` }}>
            <div style={{ width:26, height:26, background:C.light, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:900, color:C.indigo, flexShrink:0 }}>{n}</div>
            <div><div style={{ fontSize:13, fontWeight:700, color:C.dark, marginBottom:2 }}>{t}</div><div style={{ fontSize:12, color:C.muted }}>{d}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── DASHBOARD ──────────────────────────────────────────────────────────────
function PortalDashboard({ partner, data, onRefer }) {
  const converted = data.referrals.filter(r => ["Approved","Disbursed","Paid","Active"].includes(r.status)).length;
  return (
    <div style={{ maxWidth:950, margin:"0 auto", padding:"28px 20px 60px" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))", gap:12, marginBottom:22 }}>
        {[
          { label:"Total Referrals", value:data.referrals.length,            color:C.dark },
          { label:"Converted",       value:converted,                         color:C.green },
          { label:"In Progress",     value:data.referrals.length - converted, color:C.indigo },
          { label:"Payouts Received",value:data.payouts.length,               color:C.orange },
        ].map(s => (
          <div key={s.label} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:10, padding:"16px 18px" }}>
            <div style={{ fontSize:10, color:C.muted, marginBottom:5, fontWeight:700, textTransform:"uppercase", letterSpacing:0.8 }}>{s.label}</div>
            <div style={{ fontSize:28, fontWeight:900, color:s.color, lineHeight:1 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Referral link */}
      <div style={{ background:C.light, border:"1px solid #C7D2FE", borderRadius:10, padding:"14px 18px", marginBottom:22, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
        <div>
          <div style={{ fontSize:10, color:"#6366F1", fontWeight:700, marginBottom:3, textTransform:"uppercase", letterSpacing:0.8 }}>Your Referral Link</div>
          <div style={{ fontSize:13, fontWeight:600, color:C.indigo }}>finsightone.co/check?ref={partner.partner_code}</div>
        </div>
        <button onClick={() => navigator.clipboard?.writeText(`https://finsightone.co/check?ref=${partner.partner_code}`)}
          style={{ background:C.indigo, color:C.white, fontSize:12, fontWeight:700, padding:"8px 16px", borderRadius:6, border:"none", cursor:"pointer" }}>
          Copy Link
        </button>
      </div>

      {/* Referrals table */}
      <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
        <div style={{ padding:"16px 20px", borderBottom:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ fontSize:15, fontWeight:800, color:C.dark }}>My Referrals</div>
          <button onClick={onRefer} style={{ background:C.orange, color:C.white, fontSize:12, fontWeight:700, padding:"8px 16px", borderRadius:6, border:"none", cursor:"pointer" }}>+ Refer Client</button>
        </div>
        {data.referrals.length === 0 ? (
          <div style={{ padding:"40px 24px", textAlign:"center" }}>
            <div style={{ fontSize:30, marginBottom:10 }}>📋</div>
            <div style={{ fontSize:14, fontWeight:700, color:C.dark, marginBottom:6 }}>No referrals yet</div>
            <div style={{ fontSize:13, color:C.muted, marginBottom:16 }}>Click "Refer Client" to get started</div>
            <button onClick={onRefer} style={{ background:C.orange, color:C.white, fontSize:13, fontWeight:700, padding:"10px 20px", borderRadius:8, border:"none", cursor:"pointer" }}>Refer Your First Client →</button>
          </div>
        ) : (
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
              <thead>
                <tr style={{ background:C.surface }}>
                  {["Sl No","Client Name","Referral Type","Status","Payout"].map(h => (
                    <th key={h} style={{ padding:"10px 16px", textAlign:"left", fontSize:11, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:0.8, borderBottom:`1px solid ${C.border}`, whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.referrals.map((r,i) => {
                  const sc = statusBadge(r.status);
                  return (
                    <tr key={i} style={{ borderBottom:`1px solid ${C.surface}` }}
                      onMouseEnter={e=>e.currentTarget.style.background=C.surface}
                      onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                      <td style={{ padding:"12px 16px", color:C.muted, fontSize:12 }}>{i+1}</td>
                      <td style={{ padding:"12px 16px", fontWeight:600, color:C.dark }}>{r.client_name}</td>
                      <td style={{ padding:"12px 16px" }}>
                        <span style={{ fontSize:12, color:"#6366F1", background:C.light, padding:"3px 10px", borderRadius:20, fontWeight:600, whiteSpace:"nowrap" }}>
                          {r.referral_type || r.service || "—"}
                        </span>
                      </td>
                      <td style={{ padding:"12px 16px" }}>
                        <span style={{ ...sc, fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20, display:"inline-block", whiteSpace:"nowrap" }}>{r.status}</span>
                      </td>
                      <td style={{ padding:"12px 16px", fontWeight:700, color:r.payout_amount?C.green:C.muted }}>{r.payout_amount ? fmtA(r.payout_amount) : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ── EARNINGS ───────────────────────────────────────────────────────────────
function PortalEarnings({ data }) {
  const total = data.payouts.reduce((s,p) => s + (Number(p.payout_amount)||0), 0);
  return (
    <div style={{ maxWidth:950, margin:"0 auto", padding:"28px 20px 60px" }}>
      <div style={{ fontSize:20, fontWeight:900, color:C.dark, marginBottom:4 }}>Earnings Statement</div>
      <div style={{ fontSize:13, color:C.muted, marginBottom:22 }}>All credited payouts — only visible after FinsightOne marks payment as done</div>
      <div style={{ background:`linear-gradient(135deg,${C.dark} 0%,#1E1B4B 100%)`, borderRadius:12, padding:"24px 28px", marginBottom:22, color:C.white }}>
        <div style={{ fontSize:11, color:"#94A3B8", fontWeight:700, textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>Total Earnings Received</div>
        <div style={{ fontSize:36, fontWeight:900, color:"#4ADE80" }}>{fmtA(total)}</div>
        <div style={{ fontSize:12, color:"#64748B", marginTop:4 }}>{data.payouts.length} payout{data.payouts.length!==1?"s":""} credited</div>
      </div>
      <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
        {data.payouts.length === 0 ? (
          <div style={{ padding:"48px 24px", textAlign:"center" }}>
            <div style={{ fontSize:32, marginBottom:10 }}>💳</div>
            <div style={{ fontSize:14, fontWeight:700, color:C.dark, marginBottom:6 }}>No payouts yet</div>
            <div style={{ fontSize:13, color:C.muted }}>Credited payouts will appear here once processed by FinsightOne.</div>
          </div>
        ) : (
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
              <thead>
                <tr style={{ background:C.surface }}>
                  {["Payout ID","Cases","Amount","Requested On","Paid On","Mode","UTR Ref"].map(h => (
                    <th key={h} style={{ padding:"10px 16px", textAlign:"left", fontSize:11, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:0.8, borderBottom:`1px solid ${C.border}`, whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.payouts.map((p,i) => (
                  <tr key={i} style={{ borderBottom:`1px solid ${C.surface}` }}
                    onMouseEnter={e=>e.currentTarget.style.background=C.surface}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <td style={{ padding:"12px 16px", fontWeight:600, color:C.dark, fontSize:12 }}>{p.payout_id||"—"}</td>
                    <td style={{ padding:"12px 16px", color:"#475569" }}>{p.cases_converted??"—"}</td>
                    <td style={{ padding:"12px 16px", fontWeight:800, color:C.green }}>{fmtA(p.payout_amount)}</td>
                    <td style={{ padding:"12px 16px", color:C.muted, fontSize:12 }}>{fmt(p.payout_date)}</td>
                    <td style={{ padding:"12px 16px", color:C.muted, fontSize:12 }}>{fmt(p.payment_date)}</td>
                    <td style={{ padding:"12px 16px", color:"#475569" }}>{p.payment_mode||"—"}</td>
                    <td style={{ padding:"12px 16px", color:C.muted, fontSize:11, fontFamily:"monospace" }}>{p.utr_number||"—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ── RESOURCES ──────────────────────────────────────────────────────────────
function PortalResources() {
  const [activeTab, setActiveTab] = useState("commission");

  const commission = [
    {
      category: "📋 Readiness Reports",
      desc: "Loan Readiness Assessment Report",
      structure: "20% of document fee collected",
      example: "Fee ₹3,999 → Your payout ₹800",
      color: "#EFF6FF", accent: "#1D4ED8",
      note: null,
    },
    {
      category: "📊 Monitoring Reports",
      desc: "Monthly Credit & Business Health Monitoring",
      structure: "25% of monthly plan fee collected",
      example: "Plan ₹2,999/month → Your payout ₹750/month",
      color: "#F0FDF4", accent: "#166534",
      note: null,
    },
    {
      category: "🏦 NBFC / Private Lender Loans",
      desc: "WC, Term, Unsecured, Machinery, Individual Products",
      structure: null,
      color: "#FEF3C7", accent: "#92400E",
      note: "Payout % shared privately after onboarding call.",
      products: [
        { name:"Working Capital (CC / OD)", pct:null },
        { name:"Unsecured Business Loan",   pct:null },
        { name:"Machinery Loan",            pct:null },
        { name:"Individual Products (Home / Personal / Vehicle)", pct:null },
      ],
    },
    {
      category: "🏛️ PSU / Co-operative Bank Loans",
      desc: "SBI, Bank of Maharashtra, Canara, Co-op Banks etc.",
      structure: "FinsightOne charges 0.50% + GST on loan amount to client\nPartner bills client directly and separately\nNo payout from FinsightOne on these cases",
      color: "#F8FAFC", accent: "#475569",
      note: "You retain your client relationship and charge your own fee.",
    },
  ];

  const products = [
    {
      stream: "Stream 1 — Loan Documents",
      icon: "📄",
      color: "#EFF6FF", accent: C.indigo,
      items: [
        { name:"Loan Appraisal Note (LAN)", range:"₹1–2 Cr", fee:"₹3,999" },
        { name:"Loan Appraisal Note (LAN)", range:"₹2–5 Cr", fee:"₹7,999" },
        { name:"Loan Appraisal Note (LAN)", range:"Above ₹5 Cr", fee:"Custom Quote" },
        { name:"Financial Analysis",        range:"₹1–2 Cr", fee:"₹4,999" },
        { name:"Financial Analysis",        range:"₹2–5 Cr", fee:"₹8,999" },
        { name:"Financial Analysis",        range:"Above ₹5 Cr", fee:"Custom Quote" },
        { name:"DPR (Detailed Project Report)", range:"₹2–5 Cr", fee:"₹9,999" },
        { name:"DPR",                       range:"Above ₹5 Cr", fee:"Custom Quote" },
      ],
    },
    {
      stream: "Stream 2 — Readiness Reports (One-time)",
      icon: "📋",
      color: "#F0FDF4", accent: C.green,
      items: [
        { name:"Free Eligibility Check",    range:"All clients", fee:"Free" },
        { name:"Basic Readiness Report",    range:"Individuals", fee:"₹799" },
        { name:"Standard Readiness Report", range:"MSME",        fee:"₹2,999" },
        { name:"Premium Readiness Report",  range:"MSME Complex",fee:"₹9,999" },
        { name:"LAN Preparation (Lite)",    range:"MSME",        fee:"₹4,999" },
      ],
    },
    {
      stream: "Stream 3 — Monthly Monitoring Plans",
      icon: "📊",
      color: "#FEF3C7", accent: "#92400E",
      items: [
        { name:"Credit Watch",              range:"Individual",  fee:"₹499/month" },
        { name:"Business Health Monitor",   range:"MSME Basic",  fee:"₹2,999/month" },
        { name:"Premium Monitor",           range:"MSME Advanced",fee:"₹4,999/month" },
      ],
    },
    {
      stream: "Advisory Services",
      icon: "🎯",
      color: C.light, accent: C.indigo,
      items: [
        { name:"Credit Enhancement Advisory", range:"Existing limit", fee:"₹10,000–₹25,000" },
        { name:"New Limit Setup Advisory",    range:"Fresh case",     fee:"₹10,000–₹20,000" },
        { name:"NPA Prevention Advisory",     range:"Stressed account",fee:"₹20,000–₹50,000" },
      ],
    },
  ];

  const guides = [
    { icon:"💡", title:"How to Pitch FinsightOne", desc:"Scripts and talking points for introducing our services to your clients", tag:"Guide", available:true },
    { icon:"📝", title:"Referral Process Guide",   desc:"Step-by-step guide on how to submit referrals and track them", tag:"Guide", available:true },
    { icon:"🎯", title:"Target Client Profile",    desc:"Who benefits most from FinsightOne — ideal client criteria by product", tag:"Guide", available:true },
    { icon:"📊", title:"Commission Structure",     desc:"Full payout details shared after onboarding call", tag:"Private", available:false },
    { icon:"📄", title:"Partner Agreement",        desc:"Terms and conditions of the partner program", tag:"PDF", available:false },
  ];

  const TabBtn = ({ id, label }) => (
    <button onClick={() => setActiveTab(id)}
      style={{ background:"transparent", border:"none", cursor:"pointer", padding:"10px 16px", fontSize:13, fontWeight:700,
        color:activeTab===id?C.indigo:C.muted, borderBottom:activeTab===id?`2px solid ${C.indigo}`:"2px solid transparent", marginBottom:-2 }}>
      {label}
    </button>
  );

  return (
    <div style={{ maxWidth:950, margin:"0 auto", padding:"28px 20px 60px" }}>
      <div style={{ fontSize:20, fontWeight:900, color:C.dark, marginBottom:4 }}>Resources</div>
      <div style={{ fontSize:13, color:C.muted, marginBottom:20 }}>Commission structure, product pricing and partner guides</div>

      <div style={{ display:"flex", gap:4, marginBottom:20, borderBottom:`2px solid ${C.border}` }}>
        <TabBtn id="commission" label="Commission Structure" />
        <TabBtn id="products"   label="Product & Pricing" />
        <TabBtn id="guides"     label="Partner Guides" />
      </div>

      {/* COMMISSION TAB */}
      {activeTab === "commission" && (
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ background:"#FFFBEB", border:"1px solid #FDE68A", borderRadius:10, padding:"12px 16px", fontSize:13, color:"#92400E" }}>
            ⚡ Payouts are calculated on the <strong>fee actually collected</strong> from the client — not on any estimate. All amounts exclude GST.
          </div>
          {commission.map((c,i) => (
            <div key={i} style={{ background:c.color, border:`1px solid ${C.border}`, borderRadius:12, padding:"20px 22px" }}>
              <div style={{ fontSize:15, fontWeight:800, color:C.dark, marginBottom:4 }}>{c.category}</div>
              <div style={{ fontSize:12, color:C.muted, marginBottom:14 }}>{c.desc}</div>
              {c.structure && (
                <div style={{ background:C.white, borderRadius:8, padding:"12px 16px", marginBottom:c.example?10:0 }}>
                  {c.structure.split('\n').map((line,j) => (
                    <div key={j} style={{ fontSize:13, fontWeight:600, color:c.accent, marginBottom:j<c.structure.split('\n').length-1?4:0 }}>
                      {line}
                    </div>
                  ))}
                </div>
              )}
              {c.example && (
                <div style={{ fontSize:12, color:C.muted, fontStyle:"italic" }}>Example: {c.example}</div>
              )}
              {c.products && (
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {c.products.map((p,j) => (
                    <div key={j} style={{ background:C.white, borderRadius:8, padding:"10px 14px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ fontSize:13, color:C.dark, fontWeight:600 }}>{p.name}</span>
                      <span style={{ fontSize:12, background:"#FEF3C7", color:"#92400E", padding:"3px 10px", borderRadius:20, fontWeight:700 }}>Shared privately</span>
                    </div>
                  ))}
                </div>
              )}
              {c.note && (
                <div style={{ marginTop:12, fontSize:12, color:c.accent, fontStyle:"italic", borderTop:`1px solid ${C.border}`, paddingTop:10 }}>
                  ℹ️ {c.note}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* PRODUCTS TAB */}
      {activeTab === "products" && (
        <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
          <div style={{ background:"#EFF6FF", border:"1px solid #BFDBFE", borderRadius:10, padding:"12px 16px", fontSize:13, color:"#1D4ED8" }}>
            ℹ️ All prices are <strong>exclusive of GST</strong>. Refer clients for any of these products.
          </div>
          {products.map((s,i) => (
            <div key={i} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
              <div style={{ background:s.color, padding:"14px 20px", display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:22 }}>{s.icon}</span>
                <div style={{ fontSize:14, fontWeight:800, color:C.dark }}>{s.stream}</div>
              </div>
              <div style={{ overflowX:"auto" }}>
                <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                  <thead>
                    <tr style={{ background:C.surface }}>
                      {["Product / Service","Loan Range / Type","Fee (excl. GST)"].map(h => (
                        <th key={h} style={{ padding:"9px 16px", textAlign:"left", fontSize:11, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:0.7, borderBottom:`1px solid ${C.border}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {s.items.map((item,j) => (
                      <tr key={j} style={{ borderBottom:`1px solid ${C.surface}` }}
                        onMouseEnter={e=>e.currentTarget.style.background=C.surface}
                        onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                        <td style={{ padding:"11px 16px", fontWeight:600, color:C.dark }}>{item.name}</td>
                        <td style={{ padding:"11px 16px", color:"#475569" }}>{item.range}</td>
                        <td style={{ padding:"11px 16px", fontWeight:700, color:s.accent }}>{item.fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* GUIDES TAB */}
      {activeTab === "guides" && (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:14 }}>
          {guides.map((g,i) => (
            <div key={i} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:12, padding:"20px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                <span style={{ fontSize:26 }}>{g.icon}</span>
                <span style={{ fontSize:10, fontWeight:700, padding:"3px 8px", borderRadius:20,
                  background:g.tag==="Private"?"#FEF2F2":g.tag==="PDF"?"#F0FDF4":C.light,
                  color:g.tag==="Private"?"#DC2626":g.tag==="PDF"?C.green:C.indigo }}>{g.tag}</span>
              </div>
              <div style={{ fontSize:14, fontWeight:700, color:C.dark, marginBottom:4 }}>{g.title}</div>
              <div style={{ fontSize:12, color:C.muted, marginBottom:14 }}>{g.desc}</div>
              {g.available ? (
                <button style={{ fontSize:12, fontWeight:700, color:C.indigo, background:C.light, border:"none", borderRadius:6, padding:"7px 14px", cursor:"pointer" }}>
                  View Guide →
                </button>
              ) : (
                <span style={{ fontSize:12, color:C.muted, fontStyle:"italic" }}>Contact us to access</span>
              )}
            </div>
          ))}
          <div style={{ background:C.light, border:"1px solid #C7D2FE", borderRadius:12, padding:"20px" }}>
            <div style={{ fontSize:22, marginBottom:8 }}>💬</div>
            <div style={{ fontSize:14, fontWeight:700, color:C.dark, marginBottom:4 }}>Need something specific?</div>
            <div style={{ fontSize:12, color:C.muted, marginBottom:14 }}>Training material, custom pitch decks, or market data — reach out to us.</div>
            <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer"
              style={{ fontSize:12, fontWeight:700, color:C.white, background:"#16A34A", border:"none", borderRadius:6, padding:"7px 14px", cursor:"pointer", textDecoration:"none", display:"inline-block" }}>
              WhatsApp Us →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

// ── FAQS ───────────────────────────────────────────────────────────────────
function PortalFAQs() {
  const [open, setOpen] = useState(null);
  const faqs = [
    ["How do I refer a client?","Click '+ Refer' from the top menu or the Refer Client button. Select the service type, enter client's name and 10-digit mobile, and submit. Our team contacts them within 24 hours."],
    ["What services can I refer clients for?","Loan (Individual) — Home, Personal, Vehicle loans. Loan (MSME) — Working Capital, Term, Machinery, Unsecured business loans. Readiness Reports — one-time loan assessment. Monitoring Reports — monthly credit and business health plans."],
    ["When will I receive my payout?","Payouts are processed after case closure — loan disbursement or report delivery. Once marked Paid by FinsightOne, the amount and payment details appear in your Earnings Statement."],
    ["How is my commission calculated?","Readiness Reports: 20% of fee collected. Monitoring Reports: 25% of monthly fee. NBFC/Private Loan payouts: shared privately after onboarding call. PSU/Co-op bank loans: you bill the client directly — no payout from FinsightOne."],
    ["What happens for PSU/Co-op bank loan cases?","FinsightOne charges the client 0.50% + GST on the loan amount as its fee. You charge the client your own fee separately. FinsightOne does not pay any commission to partners on these cases."],
    ["Can I track my referral status?","Yes — your Dashboard shows real-time status: Submitted → Processing → Approved → Disbursed or Rejected."],
    ["How do I update my bank details for payout?","Contact us at info@finsightone.co or WhatsApp +91 95794 53635. We update details after verification."],
    ["My referral link — how do I share it?","Copy it from the Dashboard and share via WhatsApp, email, or social media. It auto-tags all referrals to your partner code."],
  ];
  return (
    <div style={{ maxWidth:750, margin:"0 auto", padding:"28px 20px 60px" }}>
      <div style={{ fontSize:20, fontWeight:900, color:C.dark, marginBottom:4 }}>FAQs</div>
      <div style={{ fontSize:13, color:C.muted, marginBottom:22 }}>Everything you need to know about the partner program</div>
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {faqs.map(([q,a],i) => (
          <div key={i} style={{ background:C.white, border:`1px solid ${open===i?"#C7D2FE":C.border}`, borderRadius:10, overflow:"hidden" }}>
            <button onClick={() => setOpen(open===i?null:i)}
              style={{ width:"100%", padding:"15px 20px", background:"none", border:"none", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", gap:12 }}>
              <span style={{ fontSize:14, fontWeight:700, color:C.dark, textAlign:"left" }}>{q}</span>
              <span style={{ fontSize:18, color:C.indigo, flexShrink:0, transform:open===i?"rotate(45deg)":"none", transition:"transform 0.2s" }}>+</span>
            </button>
            {open===i && <div style={{ padding:"0 20px 16px", fontSize:13, color:"#475569", lineHeight:1.7 }}>{a}</div>}
          </div>
        ))}
      </div>
      <div style={{ marginTop:28, background:C.light, borderRadius:10, padding:"16px 20px" }}>
        <div style={{ fontSize:14, fontWeight:700, color:C.dark, marginBottom:4 }}>Still have questions?</div>
        <div style={{ fontSize:13, color:C.muted }}>
          Email: <a href="mailto:info@finsightone.co" style={{ color:C.indigo, fontWeight:600 }}>info@finsightone.co</a>
          &nbsp;·&nbsp;
          WhatsApp: <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" style={{ color:C.indigo, fontWeight:600 }}>+91 95794 53635</a>
        </div>
      </div>
    </div>
  );
}

// ── SUPPORT ────────────────────────────────────────────────────────────────
function PortalSupport() {
  return (
    <div style={{ maxWidth:600, margin:"0 auto", padding:"28px 20px 60px" }}>
      <div style={{ fontSize:20, fontWeight:900, color:C.dark, marginBottom:4 }}>Support</div>
      <div style={{ fontSize:13, color:C.muted, marginBottom:22 }}>We're here to help — Mon to Sat, 9am to 6pm</div>
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {[
          { icon:"📧", title:"Email", desc:"info@finsightone.co", sub:"Response within 24 hours", href:"mailto:info@finsightone.co" },
          { icon:"💬", title:"WhatsApp", desc:"+91 95794 53635", sub:"Fastest response channel", href:`https://wa.me/${WA}` },
        ].map(s => (
          <a key={s.title} href={s.href} target="_blank" rel="noreferrer"
            style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:12, padding:"20px 24px", display:"flex", gap:16, textDecoration:"none" }}
            onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 16px rgba(79,70,229,0.12)"}
            onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
            <div style={{ fontSize:28 }}>{s.icon}</div>
            <div>
              <div style={{ fontSize:15, fontWeight:700, color:C.dark, marginBottom:2 }}>{s.title}</div>
              <div style={{ fontSize:14, color:C.indigo, fontWeight:600, marginBottom:2 }}>{s.desc}</div>
              <div style={{ fontSize:12, color:C.muted }}>{s.sub}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// ── PROFILE ────────────────────────────────────────────────────────────────
function PortalProfile({ partner }) {
  return (
    <div style={{ maxWidth:560, margin:"0 auto", padding:"28px 20px 60px" }}>
      <div style={{ fontSize:20, fontWeight:900, color:C.dark, marginBottom:22 }}>My Profile</div>
      <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
        <div style={{ background:`linear-gradient(135deg,${C.dark} 0%,#1E1B4B 100%)`, padding:"24px", display:"flex", alignItems:"center", gap:16 }}>
          <div style={{ width:50, height:50, background:C.indigo, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, fontWeight:900, color:C.white }}>
            {partner.name.charAt(0)}
          </div>
          <div>
            <div style={{ fontSize:17, fontWeight:800, color:C.white }}>{partner.name}</div>
            <div style={{ fontSize:13, color:"#94A3B8" }}>{partner.firm}</div>
          </div>
        </div>
        <div style={{ padding:"16px 24px" }}>
          {[["Partner Code",partner.partner_code],["Type",partner.type],["City",partner.city],["Username",partner.username]].map(([l,v]) => (
            <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"11px 0", borderBottom:`1px solid ${C.border}` }}>
              <span style={{ fontSize:13, color:C.muted, fontWeight:600 }}>{l}</span>
              <span style={{ fontSize:13, color:C.dark, fontWeight:700 }}>{v||"—"}</span>
            </div>
          ))}
        </div>
        <div style={{ padding:"14px 24px", background:C.surface, borderTop:`1px solid ${C.border}` }}>
          <div style={{ fontSize:12, color:C.muted }}>To update profile or banking details, contact <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" style={{ color:C.indigo, fontWeight:600 }}>WhatsApp</a> or <a href="mailto:info@finsightone.co" style={{ color:C.indigo, fontWeight:600 }}>info@finsightone.co</a></div>
        </div>
      </div>
    </div>
  );
}

// ── PORTAL SHELL ───────────────────────────────────────────────────────────
function PartnerPortal({ partner, onLogout }) {
  const [page, setPage]         = useState("home");
  const [data, setData]         = useState({ referrals:[], payouts:[] });
  const [loadingData, setLoadingData] = useState(true);
  const [showRefer, setShowRefer] = useState(false);

  useState(() => {
    fetchDashboard(partner.partner_code).then(d => { setData(d); setLoadingData(false); });
  });

  const navItems = [
    { id:"home",      label:"Home" },
    { id:"dashboard", label:"Dashboard" },
    { id:"earnings",  label:"Earnings" },
    { id:"resources", label:"Resources" },
    { id:"faqs",      label:"FAQs" },
    { id:"support",   label:"Support" },
    { id:"profile",   label:"My Profile" },
  ];

  const go = (p) => { if (p==="refer") { setShowRefer(true); } else { setPage(p); } };

  return (
    <div style={{ fontFamily:"'DM Sans',system-ui,sans-serif", minHeight:"100vh", background:C.surface }}>

      {/* Portal nav — completely standalone, no main site nav */}
      <div style={{ background:C.dark, position:"sticky", top:0, zIndex:50, borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 16px", display:"flex", alignItems:"center", height:54, gap:8 }}>
          <Logo light />
          <div style={{ width:1, height:18, background:"rgba(255,255,255,0.15)", margin:"0 6px" }} />
          <span style={{ fontSize:10, color:"#475569", fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", marginRight:8 }}>Partner Portal</span>

          {/* Nav links */}
          <div style={{ display:"flex", gap:1, flex:1, overflow:"hidden" }}>
            {navItems.map(n => (
              <button key={n.id} onClick={() => go(n.id)}
                style={{ background:page===n.id?"rgba(79,70,229,0.2)":"transparent", border:"none", color:page===n.id?"#818CF8":"#94A3B8", fontSize:12, fontWeight:page===n.id?700:500, padding:"6px 9px", borderRadius:6, cursor:"pointer", whiteSpace:"nowrap" }}>
                {n.label}
              </button>
            ))}
          </div>

          {/* Visit Website — opens in new tab, portal stays open */}
          <a href="https://finsightone.co" target="_blank" rel="noreferrer"
            style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)", color:"#94A3B8", fontSize:11, fontWeight:600, padding:"6px 11px", borderRadius:6, textDecoration:"none", whiteSpace:"nowrap" }}>
            🌐 Visit Website ↗
          </a>

          <button onClick={() => go("refer")}
            style={{ background:C.orange, color:C.white, fontSize:12, fontWeight:700, padding:"6px 12px", borderRadius:6, border:"none", cursor:"pointer", whiteSpace:"nowrap" }}>
            + Refer
          </button>
          <button onClick={onLogout}
            style={{ background:"transparent", border:"1px solid rgba(255,255,255,0.15)", color:"#94A3B8", fontSize:11, padding:"6px 10px", borderRadius:6, cursor:"pointer", whiteSpace:"nowrap" }}>
            Sign Out
          </button>
        </div>
      </div>

      {/* Content */}
      {loadingData ? (
        <div style={{ padding:"80px 20px", textAlign:"center", color:C.muted, fontSize:14 }}>Loading your data…</div>
      ) : (
        <>
          {page==="home"      && <PortalHome      partner={partner} onNavigate={go} />}
          {page==="dashboard" && <PortalDashboard partner={partner} data={data} onRefer={() => setShowRefer(true)} />}
          {page==="earnings"  && <PortalEarnings  data={data} />}
          {page==="resources" && <PortalResources />}
          {page==="faqs"      && <PortalFAQs />}
          {page==="support"   && <PortalSupport />}
          {page==="profile"   && <PortalProfile   partner={partner} />}
        </>
      )}

      {showRefer && (
        <ReferModal partnerCode={partner.partner_code} onClose={async () => {
          setShowRefer(false);
          const d = await fetchDashboard(partner.partner_code);
          setData(d);
        }} />
      )}

      <div style={{ background:C.dark, padding:"14px 20px", textAlign:"center" }}>
        <div style={{ fontSize:12, color:"#334155" }}>© 2025 FinsightOne · Partner Portal · <a href="mailto:info@finsightone.co" style={{ color:"#4F46E5", textDecoration:"none" }}>info@finsightone.co</a></div>
      </div>
    </div>
  );
}

// ── LOGIN ──────────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) { setError("Please enter username and password."); return; }
    setError(""); setLoading(true);
    try {
      const p = await verifyPassword(username.trim().toLowerCase(), password);
      if (!p) { setError("Invalid username or password."); setLoading(false); return; }
      onLogin(p);
    } catch { setError("Login failed. Please try again."); }
    setLoading(false);
  };

  return (
    <div style={{ minHeight:"100vh", background:`linear-gradient(135deg,${C.dark} 0%,#1E1B4B 100%)`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px 20px", fontFamily:"'DM Sans',system-ui,sans-serif" }}>
      <div style={{ background:C.white, borderRadius:16, padding:"36px 32px", width:"100%", maxWidth:400, boxShadow:"0 24px 64px rgba(0,0,0,0.3)" }}>
        <div style={{ textAlign:"center", marginBottom:26 }}>
          <Logo />
          <div style={{ marginTop:8, fontSize:15, fontWeight:700, color:C.dark }}>Partner Portal</div>
          <div style={{ fontSize:13, color:C.muted, marginTop:4 }}>Sign in to access your dashboard</div>
        </div>

        {error && <div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:8, padding:"10px 14px", fontSize:13, color:"#DC2626", marginBottom:16, fontWeight:500 }}>{error}</div>}

        <div style={{ marginBottom:14 }}>
          <label style={{ fontSize:11, fontWeight:700, color:"#374151", display:"block", marginBottom:5, textTransform:"uppercase", letterSpacing:0.6 }}>Username</label>
          <input type="text" placeholder="Your username" value={username} onChange={e=>setUsername(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()} autoComplete="username"
            style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:8, padding:"11px 14px", fontSize:14, boxSizing:"border-box", fontFamily:"inherit", outline:"none" }} />
        </div>

        <div style={{ marginBottom:20 }}>
          <label style={{ fontSize:11, fontWeight:700, color:"#374151", display:"block", marginBottom:5, textTransform:"uppercase", letterSpacing:0.6 }}>Password</label>
          <div style={{ position:"relative" }}>
            <input type={showPass?"text":"password"} placeholder="Your password" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()} autoComplete="current-password"
              style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:8, padding:"11px 46px 11px 14px", fontSize:14, boxSizing:"border-box", fontFamily:"inherit", outline:"none" }} />
            <button onClick={()=>setShowPass(!showPass)}
              style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:C.muted, fontSize:12, fontWeight:600 }}>
              {showPass?"Hide":"Show"}
            </button>
          </div>
        </div>

        <button onClick={handleLogin} disabled={loading}
          style={{ width:"100%", background:loading?"#A5B4FC":C.indigo, color:C.white, fontSize:14, fontWeight:700, padding:"13px", borderRadius:8, border:"none", cursor:loading?"not-allowed":"pointer", fontFamily:"inherit", marginBottom:16 }}>
          {loading?"Signing in…":"Sign In →"}
        </button>

        <div style={{ textAlign:"center", fontSize:13, color:C.muted }}>
          Access by invitation only · <a href="mailto:info@finsightone.co" style={{ color:C.indigo, fontWeight:600, textDecoration:"none" }}>Contact us</a>
        </div>
      </div>
      <div style={{ marginTop:16, fontSize:12, color:"rgba(255,255,255,0.2)", textAlign:"center" }}>© 2025 FinsightOne</div>
    </div>
  );
}

// ── ROOT ───────────────────────────────────────────────────────────────────
export default function PartnerLogin() {
  const [partner, setPartner] = useState(null);
  if (!partner) return <LoginPage onLogin={setPartner} />;
  return <PartnerPortal partner={partner} onLogout={() => setPartner(null)} />;
}
