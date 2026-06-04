import { useState } from "react";

const SUPABASE_URL = "https://ljwgipoqqeoqcoekmzqg.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxqd2dpcG9xcWVvcWNvZWttenFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1ODIyODgsImV4cCI6MjA5NjE1ODI4OH0.7Tb_FdZsV_BEMbGz5x0FjFnylx11Riil49TeYaHrNUw";
const WA = "919579453635";

const sb = async (path, opts = {}) => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...opts,
    headers: { apikey:SUPABASE_ANON, Authorization:`Bearer ${SUPABASE_ANON}`, "Content-Type":"application/json", ...(opts.headers||{}) },
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
    method:"POST",
    headers:{ apikey:SUPABASE_ANON, Authorization:`Bearer ${SUPABASE_ANON}`, "Content-Type":"application/json" },
    body: JSON.stringify({ p_password:password, p_hash:partner.password_hash }),
  });
  return (await rpc.json()) ? partner : null;
};

const fetchDashboard = async (partnerCode) => {
  const [referrals, payouts] = await Promise.all([
    sb(`referrals?partner_code=eq.${encodeURIComponent(partnerCode)}&order=created_at.desc&select=*`),
    sb(`partner_payouts?partner_id=eq.${encodeURIComponent(partnerCode)}&paid=eq.Yes&order=payment_date.desc&select=payout_id,payout_date,payment_date,payout_amount,payment_mode,utr_number,cases_converted`),
  ]);
  return { referrals:referrals||[], payouts:payouts||[] };
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

// ── Product catalogue per referral type ──────────────────────────────────
const CATALOGUE = {
  "Loan (Individual)": {
    products: ["Home Loan","Personal Loan","Vehicle Loan","Loan Against Property","Balance Transfer"],
    docChecklist: ["PAN Card","Aadhaar Card","Last 3 months salary slip","6 months bank statement","ITR last 2 years","Form 16","Employment letter","Property documents (if applicable)"],
  },
  "Loan (MSME)": {
    products: ["Working Capital (CC/OD)","Term Loan","Unsecured Business Loan","Machinery Loan","Project Loan","CGTMSE Loan"],
    docChecklist: ["PAN Card (Firm + Promoter)","Aadhaar Card (Promoter)","Udyam Registration","GST Returns (24 months)","Bank Statements (12 months)","ITR last 3 years","Audited Financials (2 years)","MoA/Partnership Deed","Loan utilisation plan"],
  },
  "Readiness Report": {
    products: ["Free Eligibility Check","Basic Readiness Report","Standard Readiness Report","Premium Readiness Report","LAN Preparation"],
    docChecklist: ["PAN Card","Aadhaar Card","Bank Statements (6 months)","ITR last 2 years","Business registration (if MSME)"],
  },
  "Monitoring Report": {
    products: ["Credit Watch (₹499/month)","Business Health Monitor (₹2,999/month)","Premium Monitor (₹4,999/month)"],
    docChecklist: ["PAN Card","Aadhaar Card","CIBIL consent form","Latest bank statement","Existing loan statement"],
  },
};

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
  const [refType, setRefType]   = useState("");
  const [product, setProduct]   = useState("");
  const [loanAmt, setLoanAmt]   = useState("");
  const [name, setName]         = useState("");
  const [mobile, setMobile]     = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [err, setErr]           = useState("");

  const catalogue = refType ? CATALOGUE[refType] : null;
  const isLoan    = refType === "Loan (Individual)" || refType === "Loan (MSME)";

  const selectRefType = (t) => { setRefType(t); setProduct(""); setLoanAmt(""); };

  const submit = async () => {
    if (!refType)                              { setErr("Select a referral category."); return; }
    if (!product)                              { setErr("Select a product type."); return; }
    if (isLoan && !loanAmt)                    { setErr("Enter loan amount required."); return; }
    if (!name.trim())                          { setErr("Enter client name."); return; }
    if (!/^[6-9]\d{9}$/.test(mobile.trim()))  { setErr("Enter valid 10-digit mobile number."); return; }
    setLoading(true); setErr("");
    try {
      await sb("referrals", {
        method:"POST",
        headers:{ Prefer:"return=minimal" },
        body: JSON.stringify({
          partner_code: partnerCode,
          client_name:  name.trim(),
          service:      refType,
          referral_type: refType,
          product_type: product,
          loan_amount:  loanAmt || null,
          status:       "Submitted",
          docs_pending: catalogue?.docChecklist || [],
          docs_received: [],
        }),
      });
      setSubmitted(true);
    } catch(e) { setErr("Failed to submit. Please try again."); }
    setLoading(false);
  };

  const CATEGORIES = [
    { id:"Loan (Individual)", icon:"🏠", sub:"Home / Personal / Vehicle / LAP" },
    { id:"Loan (MSME)",       icon:"🏭", sub:"WC / Term / Machinery / Unsecured" },
    { id:"Readiness Report",  icon:"📋", sub:"One-time loan readiness assessment" },
    { id:"Monitoring Report", icon:"📊", sub:"Monthly credit & business monitoring" },
  ];

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(15,23,42,0.75)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div style={{ background:C.white, borderRadius:16, padding:"26px 22px", width:"100%", maxWidth:480, boxShadow:"0 24px 64px rgba(0,0,0,0.3)", maxHeight:"92vh", overflowY:"auto" }}>
        {submitted ? (
          <div style={{ textAlign:"center", padding:"20px 0" }}>
            <div style={{ fontSize:44, marginBottom:12 }}>✅</div>
            <div style={{ fontSize:18, fontWeight:800, color:C.dark, marginBottom:8 }}>Referral Submitted!</div>
            <div style={{ fontSize:13, color:C.muted, marginBottom:8 }}>We'll reach out to <strong>{name}</strong> within 24 hours.</div>
            <div style={{ fontSize:12, color:C.muted, marginBottom:24 }}>{product}{loanAmt ? ` · ${loanAmt}` : ""}</div>
            <button onClick={onClose} style={{ background:C.indigo, color:C.white, border:"none", borderRadius:8, padding:"11px 28px", fontWeight:700, fontSize:14, cursor:"pointer" }}>Done</button>
          </div>
        ) : (
          <>
            <div style={{ fontSize:17, fontWeight:800, color:C.dark, marginBottom:2 }}>Refer a Client</div>
            <div style={{ fontSize:12, color:C.muted, marginBottom:18 }}>Step 1: Select category → Step 2: Select product → Step 3: Client details</div>

            {/* Step 1: Category */}
            <div style={{ fontSize:11, fontWeight:700, color:"#374151", marginBottom:8, textTransform:"uppercase", letterSpacing:0.6 }}>1. Referral Category</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:18 }}>
              {CATEGORIES.map(t => (
                <button key={t.id} onClick={() => selectRefType(t.id)}
                  style={{ padding:"11px 10px", borderRadius:8, border:`2px solid ${refType===t.id?C.indigo:C.border}`, background:refType===t.id?C.light:C.white, cursor:"pointer", textAlign:"left", transition:"all 0.15s" }}>
                  <div style={{ fontSize:18, marginBottom:3 }}>{t.icon}</div>
                  <div style={{ fontSize:12, fontWeight:700, color:refType===t.id?C.indigo:C.dark }}>{t.id}</div>
                  <div style={{ fontSize:10, color:C.muted, marginTop:1 }}>{t.sub}</div>
                </button>
              ))}
            </div>

            {/* Step 2: Product type — only shows after category selected */}
            {catalogue && (
              <>
                <div style={{ fontSize:11, fontWeight:700, color:"#374151", marginBottom:8, textTransform:"uppercase", letterSpacing:0.6 }}>2. Product Type</div>
                <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:18 }}>
                  {catalogue.products.map(p => (
                    <button key={p} onClick={() => setProduct(p)}
                      style={{ padding:"9px 14px", borderRadius:7, border:`2px solid ${product===p?C.indigo:C.border}`, background:product===p?C.light:C.white, cursor:"pointer", textAlign:"left", fontSize:13, fontWeight:product===p?700:500, color:product===p?C.indigo:C.dark, transition:"all 0.15s" }}>
                      {product===p ? "✓ " : ""}{p}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Loan amount — only for loan categories */}
            {isLoan && product && (
              <div style={{ marginBottom:16 }}>
                <label style={{ fontSize:11, fontWeight:700, color:"#374151", display:"block", marginBottom:5, textTransform:"uppercase", letterSpacing:0.6 }}>3. Loan Amount Required</label>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:6, marginBottom:8 }}>
                  {["Upto ₹10L","₹10L–₹25L","₹25L–₹50L","₹50L–₹1Cr","₹1Cr–₹2Cr","₹2Cr–₹5Cr","₹5Cr+","Not sure"].map(a => (
                    <button key={a} onClick={() => setLoanAmt(a)}
                      style={{ padding:"7px 6px", borderRadius:6, border:`2px solid ${loanAmt===a?C.indigo:C.border}`, background:loanAmt===a?C.light:C.white, cursor:"pointer", fontSize:11, fontWeight:loanAmt===a?700:500, color:loanAmt===a?C.indigo:C.dark, textAlign:"center" }}>
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Client details */}
            {product && (
              <>
                <div style={{ fontSize:11, fontWeight:700, color:"#374151", marginBottom:10, textTransform:"uppercase", letterSpacing:0.6 }}>{isLoan ? "4." : "3."} Client Details</div>
                <div style={{ marginBottom:12 }}>
                  <label style={{ fontSize:11, fontWeight:700, color:"#374151", display:"block", marginBottom:4, textTransform:"uppercase", letterSpacing:0.6 }}>Client Name</label>
                  <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name"
                    style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:7, padding:"10px 12px", fontSize:13, boxSizing:"border-box", fontFamily:"inherit", outline:"none" }} />
                </div>
                <div style={{ marginBottom:16 }}>
                  <label style={{ fontSize:11, fontWeight:700, color:"#374151", display:"block", marginBottom:4, textTransform:"uppercase", letterSpacing:0.6 }}>Client Mobile</label>
                  <input value={mobile} onChange={e=>setMobile(e.target.value)} placeholder="10-digit mobile" maxLength={10}
                    style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:7, padding:"10px 12px", fontSize:13, boxSizing:"border-box", fontFamily:"inherit", outline:"none" }} />
                </div>

                {/* Doc checklist preview */}
                {catalogue?.docChecklist && (
                  <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, padding:"12px 14px", marginBottom:16 }}>
                    <div style={{ fontSize:11, fontWeight:700, color:C.muted, marginBottom:8, textTransform:"uppercase", letterSpacing:0.6 }}>Documents Required from Client</div>
                    <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                      {catalogue.docChecklist.map((d,i) => (
                        <div key={i} style={{ fontSize:12, color:"#475569", display:"flex", gap:6 }}>
                          <span style={{ color:C.orange }}>•</span>{d}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {err && <div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:7, padding:"8px 12px", fontSize:12, color:"#DC2626", marginBottom:12 }}>{err}</div>}

            <div style={{ display:"flex", gap:10 }}>
              <button onClick={onClose} style={{ flex:1, background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, padding:"11px", fontSize:13, fontWeight:600, cursor:"pointer", color:C.muted }}>Cancel</button>
              <button onClick={submit} disabled={loading}
                style={{ flex:2, background:loading?"#A5B4FC":C.indigo, color:C.white, border:"none", borderRadius:8, padding:"11px", fontSize:13, fontWeight:700, cursor:loading?"not-allowed":"pointer" }}>
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
      <div style={{ background:`linear-gradient(135deg,${C.dark} 0%,#1E1B4B 100%)`, padding:"44px 24px", textAlign:"center", color:C.white }}>
        <div style={{ fontSize:11, color:"#818CF8", fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:10 }}>Welcome back</div>
        <div style={{ fontSize:24, fontWeight:900, marginBottom:6 }}>{partner.name}</div>
        <div style={{ fontSize:13, color:"#94A3B8", marginBottom:20 }}>{partner.firm} · {partner.city} · <span style={{ color:"#818CF8" }}>{partner.type}</span></div>
        <div style={{ display:"inline-flex", background:"rgba(255,255,255,0.08)", borderRadius:10, padding:"10px 20px", gap:16, alignItems:"center" }}>
          <span style={{ fontSize:11, color:"#94A3B8", textTransform:"uppercase", letterSpacing:1 }}>Partner Code</span>
          <span style={{ fontSize:16, fontWeight:900, color:"#818CF8", letterSpacing:3 }}>{partner.partner_code}</span>
        </div>
      </div>
      <div style={{ maxWidth:700, margin:"0 auto", padding:"28px 20px 60px" }}>
        <div style={{ fontSize:11, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:1, marginBottom:12 }}>Quick Actions</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:10, marginBottom:28 }}>
          {[
            { icon:"📋", label:"Dashboard",      desc:"Referrals & status",  page:"dashboard" },
            { icon:"➕", label:"Refer a Client", desc:"Submit referral",     page:"refer" },
            { icon:"💳", label:"Earnings",       desc:"Payout history",      page:"earnings" },
            { icon:"📚", label:"Resources",      desc:"Guides & commission", page:"resources" },
            { icon:"❓", label:"FAQs",           desc:"Common questions",    page:"faqs" },
            { icon:"💬", label:"Support",        desc:"Contact us",          page:"support" },
          ].map(a => (
            <button key={a.page} onClick={() => onNavigate(a.page)}
              style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:10, padding:"14px", textAlign:"left", cursor:"pointer" }}
              onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 16px rgba(79,70,229,0.12)"}
              onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
              <div style={{ fontSize:20, marginBottom:5 }}>{a.icon}</div>
              <div style={{ fontSize:12, fontWeight:800, color:C.dark, marginBottom:1 }}>{a.label}</div>
              <div style={{ fontSize:11, color:C.muted }}>{a.desc}</div>
            </button>
          ))}
        </div>
        <div style={{ fontSize:11, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:1, marginBottom:12 }}>How It Works</div>
        {[["1","Refer a client","Submit name, mobile, product — 30 seconds"],
          ["2","We reach out","Our team contacts client within 24 hours"],
          ["3","Case converts","Loan sanctioned or report delivered"],
          ["4","You get paid","Payout as per commission structure"]
        ].map(([n,t,d]) => (
          <div key={n} style={{ display:"flex", gap:12, padding:"12px 0", borderBottom:`1px solid ${C.border}` }}>
            <div style={{ width:24, height:24, background:C.light, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:900, color:C.indigo, flexShrink:0 }}>{n}</div>
            <div><div style={{ fontSize:13, fontWeight:700, color:C.dark, marginBottom:1 }}>{t}</div><div style={{ fontSize:12, color:C.muted }}>{d}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── DASHBOARD ──────────────────────────────────────────────────────────────
function PortalDashboard({ partner, data, onRefer }) {
  const [expandedRow, setExpandedRow] = useState(null);
  const converted = data.referrals.filter(r => ["Approved","Disbursed","Paid","Active"].includes(r.status)).length;

  return (
    <div style={{ maxWidth:1100, margin:"0 auto", padding:"28px 20px 60px" }}>
      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))", gap:10, marginBottom:20 }}>
        {[
          { label:"Total Referrals", value:data.referrals.length,             color:C.dark },
          { label:"Converted",       value:converted,                          color:C.green },
          { label:"In Progress",     value:data.referrals.length - converted,  color:C.indigo },
          { label:"Payouts Received",value:data.payouts.length,                color:C.orange },
        ].map(s => (
          <div key={s.label} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:10, padding:"14px 16px" }}>
            <div style={{ fontSize:10, color:C.muted, marginBottom:4, fontWeight:700, textTransform:"uppercase", letterSpacing:0.8 }}>{s.label}</div>
            <div style={{ fontSize:26, fontWeight:900, color:s.color, lineHeight:1 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Referral link */}
      <div style={{ background:C.light, border:"1px solid #C7D2FE", borderRadius:10, padding:"12px 16px", marginBottom:20, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
        <div>
          <div style={{ fontSize:10, color:"#6366F1", fontWeight:700, marginBottom:2, textTransform:"uppercase", letterSpacing:0.8 }}>Your Referral Link</div>
          <div style={{ fontSize:13, fontWeight:600, color:C.indigo }}>finsightone.co/check?ref={partner.partner_code}</div>
        </div>
        <button onClick={() => navigator.clipboard?.writeText(`https://finsightone.co/check?ref=${partner.partner_code}`)}
          style={{ background:C.indigo, color:C.white, fontSize:12, fontWeight:700, padding:"7px 14px", borderRadius:6, border:"none", cursor:"pointer" }}>
          Copy Link
        </button>
      </div>

      {/* Referrals table */}
      <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
        <div style={{ padding:"14px 18px", borderBottom:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ fontSize:15, fontWeight:800, color:C.dark }}>My Referrals</div>
          <button onClick={onRefer} style={{ background:C.orange, color:C.white, fontSize:12, fontWeight:700, padding:"7px 14px", borderRadius:6, border:"none", cursor:"pointer" }}>+ Refer Client</button>
        </div>

        {data.referrals.length === 0 ? (
          <div style={{ padding:"40px 24px", textAlign:"center" }}>
            <div style={{ fontSize:28, marginBottom:8 }}>📋</div>
            <div style={{ fontSize:14, fontWeight:700, color:C.dark, marginBottom:5 }}>No referrals yet</div>
            <div style={{ fontSize:13, color:C.muted, marginBottom:14 }}>Click "Refer Client" to get started</div>
            <button onClick={onRefer} style={{ background:C.orange, color:C.white, fontSize:13, fontWeight:700, padding:"9px 18px", borderRadius:8, border:"none", cursor:"pointer" }}>Refer Your First Client →</button>
          </div>
        ) : (
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
              <thead>
                <tr style={{ background:C.surface }}>
                  {["Sl No","Client Name","Referral Type","Product Type","Loan / Report Amount","Status","Docs Received","Docs Pending","Payout"].map(h => (
                    <th key={h} style={{ padding:"9px 14px", textAlign:"left", fontSize:10, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:0.7, borderBottom:`1px solid ${C.border}`, whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.referrals.map((r,i) => {
                  const sc = statusBadge(r.status);
                  const docsReceived = r.docs_received || [];
                  const docsPending  = r.docs_pending  || [];
                  const expanded = expandedRow === i;
                  return (
                    <>
                      <tr key={`row-${i}`}
                        onClick={() => setExpandedRow(expanded ? null : i)}
                        style={{ borderBottom:`1px solid ${C.surface}`, cursor:"pointer" }}
                        onMouseEnter={e=>e.currentTarget.style.background=C.surface}
                        onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                        <td style={{ padding:"11px 14px", color:C.muted }}>{i+1}</td>
                        <td style={{ padding:"11px 14px", fontWeight:600, color:C.dark, whiteSpace:"nowrap" }}>{r.client_name}</td>
                        <td style={{ padding:"11px 14px" }}>
                          <span style={{ fontSize:11, color:"#6366F1", background:C.light, padding:"3px 8px", borderRadius:20, fontWeight:600, whiteSpace:"nowrap" }}>
                            {r.referral_type || r.service || "—"}
                          </span>
                        </td>
                        <td style={{ padding:"11px 14px", color:"#475569", whiteSpace:"nowrap" }}>{r.product_type || "—"}</td>
                        <td style={{ padding:"11px 14px", fontWeight:600, color:C.dark, whiteSpace:"nowrap" }}>{r.loan_amount || "—"}</td>
                        <td style={{ padding:"11px 14px" }}>
                          <span style={{ ...sc, fontSize:11, fontWeight:700, padding:"3px 8px", borderRadius:20, display:"inline-block", whiteSpace:"nowrap" }}>{r.status}</span>
                        </td>
                        <td style={{ padding:"11px 14px" }}>
                          {docsReceived.length > 0
                            ? <span style={{ fontSize:11, color:C.green, fontWeight:700 }}>✓ {docsReceived.length}</span>
                            : <span style={{ fontSize:11, color:C.muted }}>—</span>}
                        </td>
                        <td style={{ padding:"11px 14px" }}>
                          {docsPending.length > 0
                            ? <span style={{ fontSize:11, color:C.orange, fontWeight:700 }}>⏳ {docsPending.length}</span>
                            : <span style={{ fontSize:11, color:C.green }}>✓ All done</span>}
                        </td>
                        <td style={{ padding:"11px 14px", fontWeight:700, color:r.payout_amount?C.green:C.muted, whiteSpace:"nowrap" }}>
                          {r.payout_amount ? fmtA(r.payout_amount) : "—"}
                        </td>
                      </tr>
                      {/* Expanded doc checklist row */}
                      {expanded && (
                        <tr key={`expand-${i}`}>
                          <td colSpan={9} style={{ padding:"12px 14px 16px", background:"#F0F9FF", borderBottom:`1px solid ${C.border}` }}>
                            <div style={{ fontSize:11, fontWeight:700, color:C.indigo, marginBottom:8, textTransform:"uppercase", letterSpacing:0.7 }}>Document Checklist</div>
                            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                              {(r.docs_received||[]).map((d,j) => (
                                <span key={`r-${j}`} style={{ fontSize:11, background:"#DCFCE7", color:"#166534", padding:"3px 10px", borderRadius:20, fontWeight:600 }}>✓ {d}</span>
                              ))}
                              {(r.docs_pending||[]).map((d,j) => (
                                <span key={`p-${j}`} style={{ fontSize:11, background:"#FEF3C7", color:"#92400E", padding:"3px 10px", borderRadius:20, fontWeight:600 }}>⏳ {d}</span>
                              ))}
                              {(!r.docs_received?.length && !r.docs_pending?.length) && (
                                <span style={{ fontSize:12, color:C.muted }}>No document checklist yet — FinsightOne will update this.</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
            <div style={{ padding:"10px 14px", background:C.surface, borderTop:`1px solid ${C.border}`, fontSize:11, color:C.muted }}>
              💡 Click any row to expand document checklist
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── EARNINGS ───────────────────────────────────────────────────────────────
function PortalEarnings({ data }) {
  const total = data.payouts.reduce((s,p) => s+(Number(p.payout_amount)||0),0);
  return (
    <div style={{ maxWidth:950, margin:"0 auto", padding:"28px 20px 60px" }}>
      <div style={{ fontSize:20, fontWeight:900, color:C.dark, marginBottom:4 }}>Earnings Statement</div>
      <div style={{ fontSize:13, color:C.muted, marginBottom:20 }}>Only credited payouts are shown — appears after FinsightOne marks payment done</div>
      <div style={{ background:`linear-gradient(135deg,${C.dark} 0%,#1E1B4B 100%)`, borderRadius:12, padding:"22px 26px", marginBottom:20, color:C.white }}>
        <div style={{ fontSize:11, color:"#94A3B8", fontWeight:700, textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>Total Earnings Received</div>
        <div style={{ fontSize:34, fontWeight:900, color:"#4ADE80" }}>{fmtA(total)}</div>
        <div style={{ fontSize:12, color:"#64748B", marginTop:4 }}>{data.payouts.length} payout{data.payouts.length!==1?"s":""} credited</div>
      </div>
      <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
        {data.payouts.length === 0 ? (
          <div style={{ padding:"44px 24px", textAlign:"center" }}>
            <div style={{ fontSize:30, marginBottom:8 }}>💳</div>
            <div style={{ fontSize:14, fontWeight:700, color:C.dark, marginBottom:5 }}>No payouts yet</div>
            <div style={{ fontSize:13, color:C.muted }}>Credited payouts appear here once processed by FinsightOne.</div>
          </div>
        ) : (
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
              <thead>
                <tr style={{ background:C.surface }}>
                  {["Payout ID","Cases","Amount","Requested On","Paid On","Mode","UTR Ref"].map(h => (
                    <th key={h} style={{ padding:"9px 14px", textAlign:"left", fontSize:11, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:0.7, borderBottom:`1px solid ${C.border}`, whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.payouts.map((p,i) => (
                  <tr key={i} style={{ borderBottom:`1px solid ${C.surface}` }}
                    onMouseEnter={e=>e.currentTarget.style.background=C.surface}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <td style={{ padding:"11px 14px", fontWeight:600, color:C.dark, fontSize:12 }}>{p.payout_id||"—"}</td>
                    <td style={{ padding:"11px 14px", color:"#475569" }}>{p.cases_converted??"—"}</td>
                    <td style={{ padding:"11px 14px", fontWeight:800, color:C.green }}>{fmtA(p.payout_amount)}</td>
                    <td style={{ padding:"11px 14px", color:C.muted, fontSize:12 }}>{fmt(p.payout_date)}</td>
                    <td style={{ padding:"11px 14px", color:C.muted, fontSize:12 }}>{fmt(p.payment_date)}</td>
                    <td style={{ padding:"11px 14px", color:"#475569" }}>{p.payment_mode||"—"}</td>
                    <td style={{ padding:"11px 14px", color:C.muted, fontSize:11, fontFamily:"monospace" }}>{p.utr_number||"—"}</td>
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
  const [openGuide, setOpenGuide] = useState(null);

  const guides = [
    {
      icon:"💡", title:"How to Pitch FinsightOne", tag:"Guide",
      content: `**Who to pitch:** Business owners with existing loans (CC/OD), those who were rejected by banks, CAs/accountants with MSME clients, property dealers, insurance agents.

**Opening line for MSME clients:**
"Do you know why your CC limit hasn't increased in 2 years? It's usually a documentation or credit score issue. We fix that."

**Opening line for Individuals:**
"Banks rejected you? It's mostly fixable. We give you a free report showing exactly what's wrong and how to correct it."

**Key points to highlight:**
• Free eligibility check — zero risk for the client
• 20 years of banking expertise behind every report
• We don't just give reports — we fix the problem
• No lender bias — we work in the client's interest

**Closing:**
"Let me just take your number — our team will do a free check and call you back within 24 hours. No commitment needed."`,
    },
    {
      icon:"📝", title:"Referral Process — Step by Step", tag:"Guide",
      content: `**Step 1: Qualify the client**
Ask: Does the client need a loan, or want to improve their credit/business health?

**Step 2: Submit the referral**
Click "+ Refer" → Select category → Select product → Enter client name and mobile → Submit.

**Step 3: We take over**
Our team calls the client within 24 hours. You don't need to do anything more.

**Step 4: Track progress**
Your Dashboard shows live status — Submitted → Processing → Approved → Disbursed.

**Step 5: Payout**
Once the case closes, FinsightOne processes your payout. You'll see it in your Earnings Statement with full details.

**Tips:**
• Always take client consent before submitting their number
• Brief the client so they expect our call
• Follow up with us if status hasn't changed in 5 days`,
    },
    {
      icon:"🎯", title:"Ideal Client Profile", tag:"Guide",
      content: `**Best clients for Loan (MSME):**
• Business vintage 3+ years
• Turnover ₹50L–₹10 Cr
• Existing CC/OD limit not increased in 2+ years
• Loan rejected in last 6 months
• CIBIL 650+ (promoter)
• Sectors: Manufacturing, Trading, Food processing, Healthcare, Retail

**Best clients for Loan (Individual):**
• Salaried: 2+ years at current employer
• Self-employed: 3+ years ITR history
• CIBIL 700+ preferred
• Loan requirement: ₹5L–₹50L

**Best clients for Readiness Reports:**
• Planning to apply for a loan in next 3–6 months
• Rejected recently and don't know why
• First-time loan applicants

**Best clients for Monitoring Reports:**
• Existing CC/OD holders wanting to increase limits
• Businesses preparing for big loan in 1 year
• Clients with past NPA/settled accounts rebuilding credit`,
    },
  ];

  const commission = [
    { category:"📋 Readiness Reports", desc:"Loan Readiness Assessment Report", structure:"20% of document fee collected", example:"Fee ₹3,999 → Your payout ₹800", color:"#EFF6FF", accent:"#1D4ED8" },
    { category:"📊 Monitoring Reports", desc:"Monthly Credit & Business Health Monitoring", structure:"25% of monthly plan fee collected", example:"Plan ₹2,999/month → Your payout ₹750/month", color:"#F0FDF4", accent:"#166534" },
    { category:"🏦 NBFC / Private Lender Loans", desc:"WC, Term, Unsecured, Machinery, Individual Products", color:"#FEF3C7", accent:"#92400E", products:["Working Capital (CC/OD)","Unsecured Business Loan","Machinery Loan","Individual Products"], note:"Payout % shared privately after onboarding call." },
    { category:"🏛️ PSU / Co-operative Bank Loans", desc:"SBI, Bank of Maharashtra, Canara, Saraswat, Co-op Banks", structure:"FinsightOne charges 0.50% + GST on loan amount to client\nPartner bills client directly and separately\nNo payout from FinsightOne on these cases", color:C.surface, accent:"#475569", note:"You retain your client relationship and charge your own fee." },
  ];

  const products = [
    { stream:"Stream 1 — Loan Documents", icon:"📄", color:"#EFF6FF", accent:C.indigo,
      items:[["Loan Appraisal Note (LAN)","₹1–2 Cr","₹3,999"],["Loan Appraisal Note (LAN)","₹2–5 Cr","₹7,999"],["Loan Appraisal Note (LAN)","Above ₹5 Cr","Custom Quote"],["Financial Analysis","₹1–2 Cr","₹4,999"],["Financial Analysis","₹2–5 Cr","₹8,999"],["Financial Analysis","Above ₹5 Cr","Custom Quote"],["DPR","₹2–5 Cr","₹9,999"],["DPR","Above ₹5 Cr","Custom Quote"]] },
    { stream:"Stream 2 — Readiness Reports", icon:"📋", color:"#F0FDF4", accent:C.green,
      items:[["Free Eligibility Check","All","Free"],["Basic Readiness Report","Individuals","₹799"],["Standard Readiness Report","MSME","₹2,999"],["Premium Readiness Report","MSME Complex","₹9,999"],["LAN Preparation (Lite)","MSME","₹4,999"]] },
    { stream:"Stream 3 — Monthly Monitoring", icon:"📊", color:"#FEF3C7", accent:"#92400E",
      items:[["Credit Watch","Individual","₹499/month"],["Business Health Monitor","MSME Basic","₹2,999/month"],["Premium Monitor","MSME Advanced","₹4,999/month"]] },
    { stream:"Advisory Services", icon:"🎯", color:C.light, accent:C.indigo,
      items:[["Credit Enhancement Advisory","Existing limit","₹10,000–₹25,000"],["New Limit Setup Advisory","Fresh case","₹10,000–₹20,000"],["NPA Prevention Advisory","Stressed account","₹20,000–₹50,000"]] },
  ];

  const TabBtn = ({ id, label }) => (
    <button onClick={() => setActiveTab(id)}
      style={{ background:"transparent", border:"none", cursor:"pointer", padding:"9px 14px", fontSize:13, fontWeight:700,
        color:activeTab===id?C.indigo:C.muted, borderBottom:activeTab===id?`2px solid ${C.indigo}`:"2px solid transparent", marginBottom:-2 }}>
      {label}
    </button>
  );

  return (
    <div style={{ maxWidth:950, margin:"0 auto", padding:"28px 20px 60px" }}>
      <div style={{ fontSize:20, fontWeight:900, color:C.dark, marginBottom:4 }}>Resources</div>
      <div style={{ fontSize:13, color:C.muted, marginBottom:18 }}>Commission structure, product pricing and partner guides</div>
      <div style={{ display:"flex", gap:2, marginBottom:18, borderBottom:`2px solid ${C.border}` }}>
        <TabBtn id="commission" label="Commission" />
        <TabBtn id="products"   label="Products & Pricing" />
        <TabBtn id="guides"     label="Partner Guides" />
      </div>

      {activeTab === "commission" && (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div style={{ background:"#FFFBEB", border:"1px solid #FDE68A", borderRadius:8, padding:"10px 14px", fontSize:12, color:"#92400E" }}>
            ⚡ Payouts calculated on fee <strong>actually collected</strong> from client. All amounts exclude GST.
          </div>
          {commission.map((c,i) => (
            <div key={i} style={{ background:c.color, border:`1px solid ${C.border}`, borderRadius:10, padding:"18px 20px" }}>
              <div style={{ fontSize:14, fontWeight:800, color:C.dark, marginBottom:3 }}>{c.category}</div>
              <div style={{ fontSize:12, color:C.muted, marginBottom:12 }}>{c.desc}</div>
              {c.structure && (
                <div style={{ background:C.white, borderRadius:7, padding:"10px 14px", marginBottom:c.example?8:0 }}>
                  {c.structure.split('\n').map((line,j) => (
                    <div key={j} style={{ fontSize:13, fontWeight:600, color:c.accent, marginBottom:j<c.structure.split('\n').length-1?3:0 }}>{line}</div>
                  ))}
                </div>
              )}
              {c.example && <div style={{ fontSize:12, color:C.muted, fontStyle:"italic" }}>Example: {c.example}</div>}
              {c.products && (
                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  {c.products.map((p,j) => (
                    <div key={j} style={{ background:C.white, borderRadius:7, padding:"9px 12px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ fontSize:13, color:C.dark, fontWeight:600 }}>{p}</span>
                      <span style={{ fontSize:11, background:"#FEF3C7", color:"#92400E", padding:"3px 8px", borderRadius:20, fontWeight:700 }}>Shared privately</span>
                    </div>
                  ))}
                </div>
              )}
              {c.note && <div style={{ marginTop:10, fontSize:12, color:c.accent, fontStyle:"italic", borderTop:`1px solid ${C.border}`, paddingTop:8 }}>ℹ️ {c.note}</div>}
            </div>
          ))}
        </div>
      )}

      {activeTab === "products" && (
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <div style={{ background:"#EFF6FF", border:"1px solid #BFDBFE", borderRadius:8, padding:"10px 14px", fontSize:12, color:"#1D4ED8" }}>ℹ️ All prices <strong>exclusive of GST</strong>.</div>
          {products.map((s,i) => (
            <div key={i} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:10, overflow:"hidden" }}>
              <div style={{ background:s.color, padding:"12px 18px", display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:20 }}>{s.icon}</span>
                <div style={{ fontSize:13, fontWeight:800, color:C.dark }}>{s.stream}</div>
              </div>
              <div style={{ overflowX:"auto" }}>
                <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
                  <thead>
                    <tr style={{ background:C.surface }}>
                      {["Product","Range / Type","Fee (excl. GST)"].map(h => (
                        <th key={h} style={{ padding:"8px 14px", textAlign:"left", fontSize:10, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:0.7, borderBottom:`1px solid ${C.border}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {s.items.map(([name,range,fee],j) => (
                      <tr key={j} style={{ borderBottom:`1px solid ${C.surface}` }}
                        onMouseEnter={e=>e.currentTarget.style.background=C.surface}
                        onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                        <td style={{ padding:"10px 14px", fontWeight:600, color:C.dark }}>{name}</td>
                        <td style={{ padding:"10px 14px", color:"#475569" }}>{range}</td>
                        <td style={{ padding:"10px 14px", fontWeight:700, color:s.accent }}>{fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "guides" && (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {guides.map((g,i) => (
            <div key={i} style={{ background:C.white, border:`1px solid ${openGuide===i?"#C7D2FE":C.border}`, borderRadius:10, overflow:"hidden" }}>
              <button onClick={() => setOpenGuide(openGuide===i?null:i)}
                style={{ width:"100%", padding:"16px 18px", background:"none", border:"none", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", gap:12 }}>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <span style={{ fontSize:22 }}>{g.icon}</span>
                  <div style={{ textAlign:"left" }}>
                    <div style={{ fontSize:14, fontWeight:700, color:C.dark }}>{g.title}</div>
                    <span style={{ fontSize:10, fontWeight:700, padding:"2px 7px", borderRadius:20, background:C.light, color:C.indigo }}>{g.tag}</span>
                  </div>
                </div>
                <span style={{ fontSize:18, color:C.indigo, flexShrink:0, transform:openGuide===i?"rotate(45deg)":"none", transition:"transform 0.2s" }}>+</span>
              </button>
              {openGuide === i && (
                <div style={{ padding:"0 18px 18px", borderTop:`1px solid ${C.border}` }}>
                  {g.content.split('\n').map((line,j) => {
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return <div key={j} style={{ fontSize:13, fontWeight:800, color:C.dark, marginTop:14, marginBottom:4 }}>{line.replace(/\*\*/g,'')}</div>;
                    } else if (line.startsWith('•')) {
                      return <div key={j} style={{ fontSize:13, color:"#475569", marginLeft:8, marginBottom:3, display:"flex", gap:6 }}><span style={{ color:C.orange }}>•</span>{line.slice(1).trim()}</div>;
                    } else if (line.trim()) {
                      return <div key={j} style={{ fontSize:13, color:"#475569", marginBottom:3 }}>{line}</div>;
                    }
                    return null;
                  })}
                </div>
              )}
            </div>
          ))}
          <div style={{ background:C.light, border:"1px solid #C7D2FE", borderRadius:10, padding:"18px" }}>
            <div style={{ fontSize:13, fontWeight:700, color:C.dark, marginBottom:4 }}>Need custom materials?</div>
            <div style={{ fontSize:12, color:C.muted, marginBottom:12 }}>Pitch decks, market data, or training — reach out.</div>
            <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer"
              style={{ fontSize:12, fontWeight:700, color:C.white, background:"#16A34A", borderRadius:6, padding:"7px 14px", textDecoration:"none", display:"inline-block" }}>
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
    ["How do I refer a client?","Click '+ Refer' in the top menu. Select the referral category, then the specific product type, enter client name and mobile, and submit. We contact them within 24 hours."],
    ["What services can I refer?","Loan (Individual): Home, Personal, Vehicle, LAP. Loan (MSME): WC/OD, Term Loan, Unsecured, Machinery, CGTMSE. Readiness Reports: one-time assessments. Monitoring Reports: monthly plans."],
    ["When will I receive my payout?","After case closure — loan disbursement or report delivery. Once FinsightOne marks it Paid, it appears in your Earnings Statement with full details."],
    ["How is commission calculated?","Readiness Reports: 20% of fee. Monitoring Reports: 25% of monthly fee. NBFC/Private loans: shared privately after onboarding. PSU/Co-op banks: you bill client directly, no payout from us."],
    ["PSU/Co-op bank cases — how does it work?","FinsightOne charges 0.50% + GST on loan amount to the client. You charge the client your own fee directly. FinsightOne pays zero commission on these cases."],
    ["Can I track referral status?","Yes — Dashboard shows live status: Submitted → Processing → Approved → Disbursed. Click any row to see the document checklist status."],
    ["How do I update my banking details?","Contact us via WhatsApp +91 95794 53635 or email info@finsightone.co. We verify and update."],
    ["Can I share my referral link?","Yes — copy it from Dashboard and share via WhatsApp, email, or social media. It auto-tags referrals to your code."],
  ];
  return (
    <div style={{ maxWidth:750, margin:"0 auto", padding:"28px 20px 60px" }}>
      <div style={{ fontSize:20, fontWeight:900, color:C.dark, marginBottom:4 }}>FAQs</div>
      <div style={{ fontSize:13, color:C.muted, marginBottom:20 }}>Everything about the partner program</div>
      <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
        {faqs.map(([q,a],i) => (
          <div key={i} style={{ background:C.white, border:`1px solid ${open===i?"#C7D2FE":C.border}`, borderRadius:9, overflow:"hidden" }}>
            <button onClick={() => setOpen(open===i?null:i)}
              style={{ width:"100%", padding:"14px 18px", background:"none", border:"none", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", gap:12 }}>
              <span style={{ fontSize:13, fontWeight:700, color:C.dark, textAlign:"left" }}>{q}</span>
              <span style={{ fontSize:18, color:C.indigo, flexShrink:0, transform:open===i?"rotate(45deg)":"none", transition:"transform 0.2s" }}>+</span>
            </button>
            {open===i && <div style={{ padding:"0 18px 14px", fontSize:13, color:"#475569", lineHeight:1.7 }}>{a}</div>}
          </div>
        ))}
      </div>
      <div style={{ marginTop:24, background:C.light, borderRadius:9, padding:"14px 18px" }}>
        <div style={{ fontSize:13, fontWeight:700, color:C.dark, marginBottom:3 }}>Still have questions?</div>
        <div style={{ fontSize:13, color:C.muted }}>
          <a href="mailto:info@finsightone.co" style={{ color:C.indigo, fontWeight:600 }}>info@finsightone.co</a>
          &nbsp;·&nbsp;
          <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" style={{ color:C.indigo, fontWeight:600 }}>+91 95794 53635</a>
        </div>
      </div>
    </div>
  );
}

// ── SUPPORT ────────────────────────────────────────────────────────────────
function PortalSupport() {
  return (
    <div style={{ maxWidth:560, margin:"0 auto", padding:"28px 20px 60px" }}>
      <div style={{ fontSize:20, fontWeight:900, color:C.dark, marginBottom:4 }}>Support</div>
      <div style={{ fontSize:13, color:C.muted, marginBottom:20 }}>Mon–Sat, 9am–6pm</div>
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {[
          { icon:"📧", title:"Email", desc:"info@finsightone.co", sub:"Response within 24 hours", href:"mailto:info@finsightone.co" },
          { icon:"💬", title:"WhatsApp", desc:"+91 95794 53635", sub:"Fastest response channel", href:`https://wa.me/${WA}` },
        ].map(s => (
          <a key={s.title} href={s.href} target="_blank" rel="noreferrer"
            style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:10, padding:"18px 22px", display:"flex", gap:14, textDecoration:"none" }}
            onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 16px rgba(79,70,229,0.12)"}
            onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
            <div style={{ fontSize:26 }}>{s.icon}</div>
            <div>
              <div style={{ fontSize:14, fontWeight:700, color:C.dark, marginBottom:2 }}>{s.title}</div>
              <div style={{ fontSize:13, color:C.indigo, fontWeight:600, marginBottom:2 }}>{s.desc}</div>
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
    <div style={{ maxWidth:520, margin:"0 auto", padding:"28px 20px 60px" }}>
      <div style={{ fontSize:20, fontWeight:900, color:C.dark, marginBottom:20 }}>My Profile</div>
      <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
        <div style={{ background:`linear-gradient(135deg,${C.dark} 0%,#1E1B4B 100%)`, padding:"22px", display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ width:48, height:48, background:C.indigo, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, fontWeight:900, color:C.white }}>{partner.name.charAt(0)}</div>
          <div>
            <div style={{ fontSize:16, fontWeight:800, color:C.white }}>{partner.name}</div>
            <div style={{ fontSize:13, color:"#94A3B8" }}>{partner.firm}</div>
          </div>
        </div>
        <div style={{ padding:"14px 22px" }}>
          {[["Partner Code",partner.partner_code],["Type",partner.type],["City",partner.city],["Username",partner.username]].map(([l,v]) => (
            <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:`1px solid ${C.border}` }}>
              <span style={{ fontSize:13, color:C.muted, fontWeight:600 }}>{l}</span>
              <span style={{ fontSize:13, color:C.dark, fontWeight:700 }}>{v||"—"}</span>
            </div>
          ))}
        </div>
        <div style={{ padding:"12px 22px", background:C.surface, borderTop:`1px solid ${C.border}` }}>
          <div style={{ fontSize:12, color:C.muted }}>To update details: <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" style={{ color:C.indigo, fontWeight:600 }}>WhatsApp</a> or <a href="mailto:info@finsightone.co" style={{ color:C.indigo, fontWeight:600 }}>email us</a></div>
        </div>
      </div>
    </div>
  );
}

// ── PORTAL SHELL ───────────────────────────────────────────────────────────
function PartnerPortal({ partner, onLogout }) {
  const [page, setPage]           = useState("home");
  const [data, setData]           = useState({ referrals:[], payouts:[] });
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
      {/* Standalone nav — no main site nav here */}
      <div style={{ background:C.dark, position:"sticky", top:0, zIndex:50, borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 16px", display:"flex", alignItems:"center", height:52, gap:6 }}>
          <Logo light />
          <div style={{ width:1, height:16, background:"rgba(255,255,255,0.15)", margin:"0 6px" }} />
          <span style={{ fontSize:10, color:"#475569", fontWeight:700, letterSpacing:1.4, textTransform:"uppercase", marginRight:6 }}>Partner Portal</span>
          <div style={{ display:"flex", gap:1, flex:1, overflow:"hidden" }}>
            {navItems.map(n => (
              <button key={n.id} onClick={() => go(n.id)}
                style={{ background:page===n.id?"rgba(79,70,229,0.2)":"transparent", border:"none", color:page===n.id?"#818CF8":"#94A3B8", fontSize:12, fontWeight:page===n.id?700:500, padding:"5px 8px", borderRadius:5, cursor:"pointer", whiteSpace:"nowrap" }}>
                {n.label}
              </button>
            ))}
          </div>
          <a href="https://finsightone.co" target="_blank" rel="noreferrer"
            style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:"#94A3B8", fontSize:11, fontWeight:600, padding:"5px 10px", borderRadius:5, textDecoration:"none", whiteSpace:"nowrap" }}>
            🌐 Website ↗
          </a>
          <button onClick={() => go("refer")} style={{ background:C.orange, color:C.white, fontSize:12, fontWeight:700, padding:"5px 11px", borderRadius:5, border:"none", cursor:"pointer", whiteSpace:"nowrap" }}>+ Refer</button>
          <button onClick={onLogout} style={{ background:"transparent", border:"1px solid rgba(255,255,255,0.12)", color:"#94A3B8", fontSize:11, padding:"5px 9px", borderRadius:5, cursor:"pointer", whiteSpace:"nowrap" }}>Sign Out</button>
        </div>
      </div>

      {loadingData ? (
        <div style={{ padding:"80px 20px", textAlign:"center", color:C.muted }}>Loading…</div>
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

      <div style={{ background:C.dark, padding:"12px 20px", textAlign:"center" }}>
        <div style={{ fontSize:11, color:"#334155" }}>© 2025 FinsightOne · <a href="mailto:info@finsightone.co" style={{ color:"#4F46E5", textDecoration:"none" }}>info@finsightone.co</a></div>
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
      <div style={{ background:C.white, borderRadius:16, padding:"34px 30px", width:"100%", maxWidth:400, boxShadow:"0 24px 64px rgba(0,0,0,0.3)" }}>
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <Logo />
          <div style={{ marginTop:8, fontSize:14, fontWeight:700, color:C.dark }}>Partner Portal</div>
          <div style={{ fontSize:13, color:C.muted, marginTop:3 }}>Sign in to access your dashboard</div>
        </div>
        {error && <div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:7, padding:"9px 12px", fontSize:13, color:"#DC2626", marginBottom:14, fontWeight:500 }}>{error}</div>}
        <div style={{ marginBottom:12 }}>
          <label style={{ fontSize:11, fontWeight:700, color:"#374151", display:"block", marginBottom:4, textTransform:"uppercase", letterSpacing:0.6 }}>Username</label>
          <input type="text" placeholder="Your username" value={username} onChange={e=>setUsername(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()} autoComplete="new-password" name="partner-username"
            style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:7, padding:"10px 12px", fontSize:14, boxSizing:"border-box", fontFamily:"inherit", outline:"none" }} />
        </div>
        <div style={{ marginBottom:18 }}>
          <label style={{ fontSize:11, fontWeight:700, color:"#374151", display:"block", marginBottom:4, textTransform:"uppercase", letterSpacing:0.6 }}>Password</label>
          <div style={{ position:"relative" }}>
            <input type={showPass?"text":"password"} placeholder="Your password" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()} autoComplete="new-password" name="partner-password"
              style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:7, padding:"10px 44px 10px 12px", fontSize:14, boxSizing:"border-box", fontFamily:"inherit", outline:"none" }} />
            <button onClick={()=>setShowPass(!showPass)} style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:C.muted, fontSize:12, fontWeight:600 }}>
              {showPass?"Hide":"Show"}
            </button>
          </div>
        </div>
        <button onClick={handleLogin} disabled={loading}
          style={{ width:"100%", background:loading?"#A5B4FC":C.indigo, color:C.white, fontSize:14, fontWeight:700, padding:"12px", borderRadius:7, border:"none", cursor:loading?"not-allowed":"pointer", fontFamily:"inherit", marginBottom:14 }}>
          {loading?"Signing in…":"Sign In →"}
        </button>
        <div style={{ textAlign:"center", fontSize:12, color:C.muted }}>Want to become a partner? <a href="https://finsightone.co/partners#register" target="_blank" rel="noreferrer" style={{ color:C.indigo, fontWeight:600, textDecoration:"none" }}>Apply here ↗</a> &nbsp;·&nbsp; <a href="https://wa.me/919579453635" target="_blank" rel="noreferrer" style={{ color:"#16A34A", fontWeight:600, textDecoration:"none" }}>WhatsApp Us ↗</a></div>
      </div>
      <div style={{ marginTop:14, fontSize:11, color:"rgba(255,255,255,0.2)", textAlign:"center" }}>© 2025 FinsightOne</div>
    </div>
  );
}

export default function PartnerLogin() {
  const [partner, setPartner] = useState(null);
  if (!partner) return <LoginPage onLogin={setPartner} />;
  return <PartnerPortal partner={partner} onLogout={() => setPartner(null)} />;
}
