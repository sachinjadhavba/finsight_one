import { useState, useEffect } from "react";

const SUPABASE_URL = "https://ljwgipoqqeoqcoekmzqg.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxqd2dpcG9xcWVvcWNvZWttenFnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDU4MjI4OCwiZXhwIjoyMDk2MTU4Mjg4fQ.7BVPtPjxW0VxNJc59gGsyl9P6G0au9AGujgDrMHhC7k";

// ── COLORS ──────────────────────────────────────────
const C = {
  bg:      "#0F172A",
  card:    "#1E293B",
  border:  "#334155",
  orange:  "#F97316",
  indigo:  "#6366F1",
  green:   "#10B981",
  red:     "#EF4444",
  yellow:  "#F59E0B",
  muted:   "#94A3B8",
  text:    "#E2E8F0",
  white:   "#FFFFFF",
};

const ADMIN_PASS = "FO@Admin2026";

const STREAMS = [
  { key: "individual", label: "Individual Loans",   color: C.indigo,  icon: "👤" },
  { key: "msme",       label: "MSME Loans",         color: C.orange,  icon: "🏭" },
  { key: "readiness",  label: "Readiness Reports",  color: C.green,   icon: "📋" },
  { key: "docs",       label: "Documentation",      color: C.yellow,  icon: "📄" },
  { key: "monthly",    label: "Monthly Plans",       color: "#A78BFA", icon: "📊" },
  { key: "partner",    label: "CA / DSA Partners",  color: "#34D399",  icon: "🤝" },
];

// ── DEMO DATA (mirrors real table structure) ──────────
const DEMO = {
  leads: [
    { id:1, name:"Ramesh Patil",    mobile:"9876543210", category:"msme",       stage:"scored",    created_at:"2026-06-01", source:"whatsapp" },
    { id:2, name:"Priya Shah",      mobile:"9876543211", category:"individual", stage:"generated", created_at:"2026-06-02", source:"website" },
    { id:3, name:"Amit Joshi",      mobile:"9876543212", category:"docs",       stage:"converted", created_at:"2026-06-01", source:"partner" },
    { id:4, name:"Sunita More",     mobile:"9876543213", category:"monthly",    stage:"generated", created_at:"2026-06-03", source:"website" },
    { id:5, name:"Vikram Singh",    mobile:"9876543214", category:"msme",       stage:"converted", created_at:"2026-06-02", source:"whatsapp" },
    { id:6, name:"CA Rajesh Mehta", mobile:"9876543215", category:"partner",    stage:"scored",    created_at:"2026-06-01", source:"website" },
    { id:7, name:"Neha Kulkarni",   mobile:"9876543216", category:"readiness",  stage:"generated", created_at:"2026-06-03", source:"website" },
    { id:8, name:"Suresh Yadav",    mobile:"9876543217", category:"msme",       stage:"scored",    created_at:"2026-06-02", source:"whatsapp" },
    { id:9, name:"Meena Desai",     mobile:"9876543218", category:"individual", stage:"converted", created_at:"2026-06-01", source:"partner" },
    { id:10,name:"Ravi Kumar",      mobile:"9876543219", category:"docs",       stage:"generated", created_at:"2026-06-03", source:"website" },
  ],
  active_cases: [
    { id:1, client_name:"Ramesh Patil",  loan_type:"CC",  amount:5000000,  service:"LAN",      stage:"In Progress",  partner:"RMEHTA01", fee:7999,  payment_status:"Paid",    updated_at:"2026-06-03" },
    { id:2, client_name:"Vikram Singh",  loan_type:"TL",  amount:12000000, service:"LAN+CMA",  stage:"Submitted",    partner:null,       fee:15999, payment_status:"Pending", updated_at:"2026-06-02" },
    { id:3, client_name:"Meena Desai",   loan_type:"HL",  amount:6800000,  service:"Advisory", stage:"Disbursed",    partner:"PJAIN01",  fee:15000, payment_status:"Paid",    updated_at:"2026-06-01" },
    { id:4, client_name:"Suresh Yadav",  loan_type:"LAP", amount:9000000,  service:"LAN",      stage:"Under Review", partner:"RMEHTA01", fee:7999,  payment_status:"Paid",    updated_at:"2026-06-03" },
    { id:5, client_name:"Anita Sharma",  loan_type:"BL",  amount:2000000,  service:"Readiness",stage:"New",          partner:null,       fee:2999,  payment_status:"Pending", updated_at:"2026-06-03" },
  ],
  revenue_tracker: [
    { month:"Jan 2026", stream:"docs",       amount:47994 },
    { month:"Feb 2026", stream:"msme",       amount:89000 },
    { month:"Mar 2026", stream:"monthly",    amount:29970 },
    { month:"Apr 2026", stream:"advisory",   amount:45000 },
    { month:"May 2026", stream:"docs",       amount:63992 },
    { month:"May 2026", stream:"msme",       amount:95000 },
    { month:"Jun 2026", stream:"docs",       amount:23997 },
    { month:"Jun 2026", stream:"monthly",    amount:14985 },
  ],
  partners: [
    { id:1, name:"CA Rajesh Mehta",  firm:"Mehta & Associates",  city:"Pune",    code:"RMEHTA01", status:"Active",  referrals:7, converted:3, joined:"2026-01-15" },
    { id:2, name:"DSA Pradeep Jain", firm:"Jain Finance",        city:"Mumbai",  code:"PJAIN01",  status:"Active",  referrals:5, converted:2, joined:"2026-02-10" },
    { id:3, name:"CA Sunita Verma",  firm:"Verma & Co",          city:"Nagpur",  code:"SVERMA01", status:"Pending", referrals:0, converted:0, joined:"2026-06-01" },
  ],
  retainer_clients: [
    { id:1, name:"Vikram Enterprises", plan:"Business Health", start:"2026-01-01", next_billing:"2026-07-01", status:"Active",  months:6 },
    { id:2, name:"Priya Textiles",     plan:"Premium",         start:"2026-03-01", next_billing:"2026-07-01", status:"Active",  months:4 },
    { id:3, name:"Ramesh Foods",       plan:"Credit Watch",    start:"2026-02-01", next_billing:"2026-07-01", status:"Active",  months:5 },
    { id:4, name:"Anita Pharma",       plan:"Business Health", start:"2026-04-01", next_billing:"2026-07-01", status:"Paused",  months:2 },
  ],
  submission_tracker: [
    { id:1, client:"Ramesh Patil",  submitted_to:"HDFC Bank",      type:"Lender",  date:"2026-06-01", status:"Under Review" },
    { id:2, client:"Vikram Singh",  submitted_to:"Bajaj Finance",  type:"Lender",  date:"2026-06-02", status:"Approved" },
    { id:3, client:"Meena Desai",   submitted_to:"RMEHTA01",       type:"Partner", date:"2026-05-30", status:"Disbursed" },
    { id:4, client:"Suresh Yadav",  submitted_to:"Tata Capital",   type:"Lender",  date:"2026-06-03", status:"Submitted" },
  ],
  daily_actions: [
    { id:1, type:"payment_overdue",  message:"Vikram Singh — ₹15,999 overdue 5 days",           priority:"high",   created_at:"2026-06-03" },
    { id:2, type:"new_lead",         message:"2 new leads uncontacted — Neha K, Ravi Kumar",    priority:"medium", created_at:"2026-06-03" },
    { id:3, type:"billing_due",      message:"3 monthly plan clients billing in 3 days",         priority:"medium", created_at:"2026-06-03" },
    { id:4, type:"file_stale",       message:"Suresh Yadav LAP file — no update in 10 days",    priority:"low",    created_at:"2026-06-02" },
    { id:5, type:"payout_pending",   message:"Rajesh Mehta — payout pending since May 2026",    priority:"medium", created_at:"2026-06-01" },
  ],
};

// ── HELPERS ──────────────────────────────────────────
function fmt(n) {
  if (n >= 100000) return "₹" + (n/100000).toFixed(1) + "L";
  if (n >= 1000)   return "₹" + (n/1000).toFixed(1) + "K";
  return "₹" + n;
}

function Card({ children, style = {} }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px", ...style }}>
      {children}
    </div>
  );
}

function SectionTitle({ icon, title, sub }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: C.orange, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
        {icon} {title}
      </div>
      {sub && <div style={{ fontSize: 12, color: C.muted }}>{sub}</div>}
    </div>
  );
}

function Badge({ label, color }) {
  const colors = {
    "Active":       { bg: "#064E3B", text: "#34D399" },
    "Paid":         { bg: "#064E3B", text: "#34D399" },
    "Disbursed":    { bg: "#064E3B", text: "#34D399" },
    "Approved":     { bg: "#064E3B", text: "#34D399" },
    "Converted":    { bg: "#064E3B", text: "#34D399" },
    "In Progress":  { bg: "#1E3A5F", text: "#60A5FA" },
    "Submitted":    { bg: "#1E3A5F", text: "#60A5FA" },
    "Under Review": { bg: "#1E3A5F", text: "#60A5FA" },
    "Scored":       { bg: "#1E3A5F", text: "#60A5FA" },
    "Pending":      { bg: "#451A03", text: "#FCD34D" },
    "New":          { bg: "#312E81", text: "#A5B4FC" },
    "Generated":    { bg: "#312E81", text: "#A5B4FC" },
    "Paused":       { bg: "#3F3F46", text: "#A1A1AA" },
    "Rejected":     { bg: "#450A0A", text: "#FCA5A5" },
    "high":         { bg: "#450A0A", text: "#FCA5A5" },
    "medium":       { bg: "#451A03", text: "#FCD34D" },
    "low":          { bg: "#1C3553", text: "#93C5FD" },
  };
  const c = colors[label] || { bg: "#1E293B", text: "#94A3B8" };
  return (
    <span style={{ background: c.bg, color: c.text, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20, whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
}

// ── LOGIN SCREEN ──────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [pass, setPass] = useState("");
  const [err, setErr]   = useState("");

  const handleLogin = () => {
    if (pass === ADMIN_PASS) { onLogin(); }
    else { setErr("Incorrect password"); }
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Arial,sans-serif" }}>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "40px 48px", width: 340, textAlign: "center" }}>
        <div style={{ fontSize: 28, fontWeight: 900, color: C.white, marginBottom: 4 }}>
          Finsight<span style={{ color: C.orange }}>One</span>
        </div>
        <div style={{ fontSize: 12, color: C.muted, marginBottom: 32, letterSpacing: 1 }}>ADMIN DASHBOARD</div>
        <input
          type="password"
          placeholder="Enter admin password"
          value={pass}
          onChange={e => { setPass(e.target.value); setErr(""); }}
          onKeyDown={e => e.key === "Enter" && handleLogin()}
          style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "11px 14px", fontSize: 14, color: C.text, boxSizing: "border-box", fontFamily: "inherit", outline: "none", marginBottom: 10 }}
        />
        {err && <div style={{ fontSize: 12, color: C.red, marginBottom: 8 }}>{err}</div>}
        <button
          onClick={handleLogin}
          style={{ width: "100%", background: C.orange, color: C.white, fontSize: 14, fontWeight: 700, padding: "12px 0", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
          Login →
        </button>
        <div style={{ fontSize: 11, color: C.muted, marginTop: 20 }}>FinsightOne Internal · Restricted Access</div>
      </div>
    </div>
  );
}

// ── MAIN DASHBOARD ────────────────────────────────────
export default function AdminDashboard({ navigate }) {
  const [authed, setAuthed]   = useState(false);
  const [section, setSection] = useState("overview");
  const [data, setData]       = useState(DEMO);
  const [loading, setLoading] = useState(false);

  // Try to load from Supabase — fallback to demo
  const loadFromSupabase = async (table) => {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?limit=100`, {
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
          "Accept": "application/json"
        }
      });
      if (res.ok) {
        const rows = await res.json();
        if (rows.length > 0) return rows;
      }
    } catch(e) {}
    return null;
  };

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    // Try Supabase, fall back to demo silently
    Promise.all([
      loadFromSupabase("leads"),
      loadFromSupabase("active_cases"),
      loadFromSupabase("revenue_tracker"),
      loadFromSupabase("partners"),
      loadFromSupabase("retainer_clients"),
      loadFromSupabase("submission_tracker"),
      loadFromSupabase("daily_actions"),
    ]).then(([leads, cases, revenue, partners, retainers, submissions, actions]) => {
      setData({
        leads:              leads       || DEMO.leads,
        active_cases:       cases       || DEMO.active_cases,
        revenue_tracker:    revenue     || DEMO.revenue_tracker,
        partners:           partners    || DEMO.partners,
        retainer_clients:   retainers   || DEMO.retainer_clients,
        submission_tracker: submissions || DEMO.submission_tracker,
        daily_actions:      actions     || DEMO.daily_actions,
      });
      setLoading(false);
    });
  }, [authed]);

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  // ── COMPUTED METRICS ──
  const thisMonth = new Date().toISOString().slice(0,7);
  const monthLeads = data.leads.filter(l => l.created_at?.startsWith(thisMonth));

  const leadsByStream = STREAMS.map(s => ({
    ...s,
    generated: data.leads.filter(l => l.category === s.key).length,
    scored:    data.leads.filter(l => l.category === s.key && ["scored","converted"].includes(l.stage)).length,
    converted: data.leads.filter(l => l.category === s.key && l.stage === "converted").length,
  }));

  const totalRevenue = data.revenue_tracker.reduce((s,r) => s + (r.amount||0), 0);
  const monthRevenue = data.revenue_tracker.filter(r => r.month?.includes("Jun 2026")).reduce((s,r) => s + (r.amount||0), 0);
  const pendingPayments = data.active_cases.filter(c => c.payment_status === "Pending").reduce((s,c) => s + (c.fee||0), 0);
  const activePlans = data.retainer_clients.filter(c => c.status === "Active").length;
  const partnerReferrals = data.leads.filter(l => l.source === "partner" && l.created_at?.startsWith(thisMonth)).length;

  const NAV = [
    { id: "overview",    label: "Overview",       icon: "📊" },
    { id: "pipeline",    label: "Pipeline",        icon: "🔄" },
    { id: "revenue",     label: "Revenue",         icon: "💰" },
    { id: "partners",    label: "Partners",        icon: "🤝" },
    { id: "plans",       label: "Monthly Plans",   icon: "📋" },
    { id: "submissions", label: "Submissions",     icon: "📤" },
    { id: "alerts",      label: "Alerts",          icon: "🔔" },
  ];

  const s = { fontFamily: "Arial,sans-serif", background: C.bg, minHeight: "100vh", color: C.text };

  return (
    <div style={s}>
      {/* ── TOP BAR ── */}
      <div style={{ background: C.card, borderBottom: `1px solid ${C.border}`, padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ fontSize: 18, fontWeight: 900, color: C.white }}>
            Finsight<span style={{ color: C.orange }}>One</span>
            <span style={{ fontSize: 10, color: C.muted, fontWeight: 400, marginLeft: 8, letterSpacing: 1 }}>ADMIN</span>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {NAV.map(n => (
              <button key={n.id} onClick={() => setSection(n.id)}
                style={{ background: section===n.id ? C.orange+"20" : "transparent", color: section===n.id ? C.orange : C.muted, border: section===n.id ? `1px solid ${C.orange}40` : "1px solid transparent", borderRadius: 6, padding: "5px 12px", fontSize: 12, fontWeight: section===n.id ? 700 : 400, cursor: "pointer", fontFamily: "inherit" }}>
                {n.icon} {n.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {loading && <span style={{ fontSize: 11, color: C.muted }}>Loading live data...</span>}
          <div style={{ fontSize: 11, color: C.muted }}>{new Date().toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}</div>
          <button onClick={() => navigate("home")} style={{ background: "transparent", color: C.muted, border: `1px solid ${C.border}`, borderRadius: 6, padding: "5px 12px", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>← Site</button>
          <button onClick={() => setAuthed(false)} style={{ background: "transparent", color: C.red, border: `1px solid ${C.red}40`, borderRadius: 6, padding: "5px 12px", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>Sign Out</button>
        </div>
      </div>

      <div style={{ padding: "24px" }}>

        {/* ── SECTION: OVERVIEW ── */}
        {section === "overview" && (
          <div>
            {/* Top KPI Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14, marginBottom: 24 }}>
              {[
                { label: "Revenue This Month", value: fmt(monthRevenue), color: C.green,  sub: "Jun 2026" },
                { label: "Total Revenue",       value: fmt(totalRevenue), color: C.orange, sub: "All time" },
                { label: "Pending Payments",    value: fmt(pendingPayments), color: C.red, sub: "Unpaid fees" },
                { label: "Active Plans",        value: activePlans,       color: "#A78BFA", sub: "Monthly subscribers" },
                { label: "Partner Referrals",   value: partnerReferrals,  color: C.indigo, sub: "This month" },
                { label: "Open Cases",          value: data.active_cases.filter(c=>c.stage!=="Disbursed").length, color: C.yellow, sub: "Active pipeline" },
              ].map(k => (
                <Card key={k.label}>
                  <div style={{ fontSize: 11, color: C.muted, marginBottom: 8 }}>{k.label}</div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: k.color }}>{k.value}</div>
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>{k.sub}</div>
                </Card>
              ))}
            </div>

            {/* Lead Funnel by Stream */}
            <Card style={{ marginBottom: 24 }}>
              <SectionTitle icon="📥" title="Lead Funnel by Stream" sub="Generated → Scored → Converted · All time" />
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr>
                      {["Stream", "Generated", "Scored", "Converted", "Conv. Rate", "This Month"].map(h => (
                        <th key={h} style={{ textAlign: h==="Stream"?"left":"center", padding: "8px 12px", fontSize: 11, fontWeight: 700, color: C.muted, borderBottom: `1px solid ${C.border}`, textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {leadsByStream.map(s => (
                      <tr key={s.key} style={{ borderBottom: `1px solid ${C.border}30` }}>
                        <td style={{ padding: "10px 12px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 16 }}>{s.icon}</span>
                            <span style={{ fontWeight: 600, color: C.white }}>{s.label}</span>
                          </div>
                        </td>
                        <td style={{ textAlign: "center", padding: "10px 12px", color: C.muted }}>{s.generated}</td>
                        <td style={{ textAlign: "center", padding: "10px 12px", color: C.yellow }}>{s.scored}</td>
                        <td style={{ textAlign: "center", padding: "10px 12px", color: C.green, fontWeight: 700 }}>{s.converted}</td>
                        <td style={{ textAlign: "center", padding: "10px 12px" }}>
                          <span style={{ color: s.generated > 0 ? C.green : C.muted, fontWeight: 700 }}>
                            {s.generated > 0 ? Math.round((s.converted/s.generated)*100) + "%" : "—"}
                          </span>
                        </td>
                        <td style={{ textAlign: "center", padding: "10px 12px", color: C.muted }}>
                          {data.leads.filter(l => l.category===s.key && l.created_at?.startsWith(thisMonth)).length}
                        </td>
                      </tr>
                    ))}
                    {/* Totals row */}
                    <tr style={{ borderTop: `2px solid ${C.border}`, background: C.bg }}>
                      <td style={{ padding: "10px 12px", fontWeight: 800, color: C.white }}>TOTAL</td>
                      <td style={{ textAlign:"center", padding:"10px 12px", fontWeight:800, color:C.white }}>{data.leads.length}</td>
                      <td style={{ textAlign:"center", padding:"10px 12px", fontWeight:800, color:C.yellow }}>{data.leads.filter(l=>["scored","converted"].includes(l.stage)).length}</td>
                      <td style={{ textAlign:"center", padding:"10px 12px", fontWeight:800, color:C.green }}>{data.leads.filter(l=>l.stage==="converted").length}</td>
                      <td style={{ textAlign:"center", padding:"10px 12px", fontWeight:800, color:C.green }}>{data.leads.length > 0 ? Math.round((data.leads.filter(l=>l.stage==="converted").length/data.leads.length)*100)+"%" : "—"}</td>
                      <td style={{ textAlign:"center", padding:"10px 12px", fontWeight:800, color:C.white }}>{monthLeads.length}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Alerts preview */}
            <Card>
              <SectionTitle icon="🔔" title="Active Alerts" sub="Items needing attention" />
              {data.daily_actions.slice(0,3).map(a => (
                <div key={a.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:`1px solid ${C.border}30` }}>
                  <Badge label={a.priority} />
                  <span style={{ fontSize:13, color:C.text }}>{a.message}</span>
                </div>
              ))}
              <button onClick={() => setSection("alerts")} style={{ marginTop:12, background:"transparent", color:C.orange, border:`1px solid ${C.orange}40`, borderRadius:6, padding:"6px 14px", fontSize:12, cursor:"pointer", fontFamily:"inherit" }}>
                View All Alerts →
              </button>
            </Card>
          </div>
        )}

        {/* ── SECTION: PIPELINE ── */}
        {section === "pipeline" && (
          <Card>
            <SectionTitle icon="🔄" title="Active Pipeline" sub="All cases — across all services and stages" />
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                <thead>
                  <tr>
                    {["Client","Loan Type","Amount","Service","Stage","Partner","Fee","Payment","Updated"].map(h => (
                      <th key={h} style={{ textAlign:"left", padding:"8px 12px", fontSize:11, fontWeight:700, color:C.muted, borderBottom:`1px solid ${C.border}`, textTransform:"uppercase", letterSpacing:1, whiteSpace:"nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.active_cases.map(c => (
                    <tr key={c.id} style={{ borderBottom:`1px solid ${C.border}30` }}>
                      <td style={{ padding:"10px 12px", fontWeight:600, color:C.white }}>{c.client_name}</td>
                      <td style={{ padding:"10px 12px", color:C.muted }}>{c.loan_type}</td>
                      <td style={{ padding:"10px 12px", color:C.orange, fontWeight:700 }}>{fmt(c.amount)}</td>
                      <td style={{ padding:"10px 12px", color:C.text }}>{c.service}</td>
                      <td style={{ padding:"10px 12px" }}><Badge label={c.stage} /></td>
                      <td style={{ padding:"10px 12px", color:C.muted, fontSize:11 }}>{c.partner || "Direct"}</td>
                      <td style={{ padding:"10px 12px", color:C.green, fontWeight:700 }}>{fmt(c.fee)}</td>
                      <td style={{ padding:"10px 12px" }}><Badge label={c.payment_status} /></td>
                      <td style={{ padding:"10px 12px", color:C.muted, fontSize:11 }}>{c.updated_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* ── SECTION: REVENUE ── */}
        {section === "revenue" && (
          <div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:14, marginBottom:24 }}>
              {[
                { label:"Total Revenue", value: fmt(totalRevenue), color:C.green },
                { label:"This Month",    value: fmt(monthRevenue),  color:C.orange },
                { label:"Pending",       value: fmt(pendingPayments), color:C.red },
              ].map(k => (
                <Card key={k.label}>
                  <div style={{ fontSize:11, color:C.muted, marginBottom:8 }}>{k.label}</div>
                  <div style={{ fontSize:28, fontWeight:900, color:k.color }}>{k.value}</div>
                </Card>
              ))}
            </div>
            <Card>
              <SectionTitle icon="💰" title="Revenue Log" sub="By stream and month" />
              <div style={{ overflowX:"auto" }}>
                <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                  <thead>
                    <tr>
                      {["Month","Stream","Amount"].map(h => (
                        <th key={h} style={{ textAlign:"left", padding:"8px 12px", fontSize:11, fontWeight:700, color:C.muted, borderBottom:`1px solid ${C.border}`, textTransform:"uppercase", letterSpacing:1 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.revenue_tracker.map((r,i) => (
                      <tr key={i} style={{ borderBottom:`1px solid ${C.border}30` }}>
                        <td style={{ padding:"10px 12px", color:C.muted }}>{r.month}</td>
                        <td style={{ padding:"10px 12px" }}>
                          <span style={{ background:C.orange+"20", color:C.orange, fontSize:11, fontWeight:700, padding:"3px 8px", borderRadius:10 }}>
                            {r.stream}
                          </span>
                        </td>
                        <td style={{ padding:"10px 12px", color:C.green, fontWeight:700 }}>{fmt(r.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* ── SECTION: PARTNERS ── */}
        {section === "partners" && (
          <Card>
            <SectionTitle icon="🤝" title="Partner Performance" sub="All registered CA/DSA partners" />
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                <thead>
                  <tr>
                    {["Name","Firm","City","Code","Status","Referrals","Converted","Conv %","Joined"].map(h => (
                      <th key={h} style={{ textAlign:"left", padding:"8px 12px", fontSize:11, fontWeight:700, color:C.muted, borderBottom:`1px solid ${C.border}`, textTransform:"uppercase", letterSpacing:1, whiteSpace:"nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.partners.map(p => (
                    <tr key={p.id} style={{ borderBottom:`1px solid ${C.border}30` }}>
                      <td style={{ padding:"10px 12px", fontWeight:600, color:C.white }}>{p.name}</td>
                      <td style={{ padding:"10px 12px", color:C.muted }}>{p.firm}</td>
                      <td style={{ padding:"10px 12px", color:C.muted }}>{p.city}</td>
                      <td style={{ padding:"10px 12px", fontSize:11, color:C.orange, fontWeight:700 }}>{p.code}</td>
                      <td style={{ padding:"10px 12px" }}><Badge label={p.status} /></td>
                      <td style={{ padding:"10px 12px", textAlign:"center", color:C.text }}>{p.referrals}</td>
                      <td style={{ padding:"10px 12px", textAlign:"center", color:C.green, fontWeight:700 }}>{p.converted}</td>
                      <td style={{ padding:"10px 12px", textAlign:"center", color:C.green, fontWeight:700 }}>
                        {p.referrals > 0 ? Math.round((p.converted/p.referrals)*100)+"%" : "—"}
                      </td>
                      <td style={{ padding:"10px 12px", color:C.muted, fontSize:11 }}>{p.joined}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* ── SECTION: MONTHLY PLANS ── */}
        {section === "plans" && (
          <Card>
            <SectionTitle icon="📋" title="Monthly Plan Clients" sub="Retainer clients — all active subscriptions" />
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                <thead>
                  <tr>
                    {["Client","Plan","Start Date","Next Billing","Status","Months Active"].map(h => (
                      <th key={h} style={{ textAlign:"left", padding:"8px 12px", fontSize:11, fontWeight:700, color:C.muted, borderBottom:`1px solid ${C.border}`, textTransform:"uppercase", letterSpacing:1, whiteSpace:"nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.retainer_clients.map(c => (
                    <tr key={c.id} style={{ borderBottom:`1px solid ${C.border}30` }}>
                      <td style={{ padding:"10px 12px", fontWeight:600, color:C.white }}>{c.name}</td>
                      <td style={{ padding:"10px 12px" }}>
                        <span style={{ background:"#A78BFA20", color:"#A78BFA", fontSize:11, fontWeight:700, padding:"3px 8px", borderRadius:10 }}>{c.plan}</span>
                      </td>
                      <td style={{ padding:"10px 12px", color:C.muted }}>{c.start}</td>
                      <td style={{ padding:"10px 12px", color:C.yellow, fontWeight:600 }}>{c.next_billing}</td>
                      <td style={{ padding:"10px 12px" }}><Badge label={c.status} /></td>
                      <td style={{ padding:"10px 12px", textAlign:"center", color:C.text }}>{c.months}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* ── SECTION: SUBMISSIONS ── */}
        {section === "submissions" && (
          <Card>
            <SectionTitle icon="📤" title="Submission Tracker" sub="Files submitted to lenders, partners, and clients" />
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                <thead>
                  <tr>
                    {["Client","Submitted To","Type","Date","Status"].map(h => (
                      <th key={h} style={{ textAlign:"left", padding:"8px 12px", fontSize:11, fontWeight:700, color:C.muted, borderBottom:`1px solid ${C.border}`, textTransform:"uppercase", letterSpacing:1 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.submission_tracker.map(s => (
                    <tr key={s.id} style={{ borderBottom:`1px solid ${C.border}30` }}>
                      <td style={{ padding:"10px 12px", fontWeight:600, color:C.white }}>{s.client}</td>
                      <td style={{ padding:"10px 12px", color:C.text }}>{s.submitted_to}</td>
                      <td style={{ padding:"10px 12px" }}>
                        <span style={{ background: s.type==="Lender" ? C.orange+"20" : C.indigo+"20", color: s.type==="Lender" ? C.orange : C.indigo, fontSize:11, fontWeight:700, padding:"3px 8px", borderRadius:10 }}>{s.type}</span>
                      </td>
                      <td style={{ padding:"10px 12px", color:C.muted }}>{s.date}</td>
                      <td style={{ padding:"10px 12px" }}><Badge label={s.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* ── SECTION: ALERTS ── */}
        {section === "alerts" && (
          <Card>
            <SectionTitle icon="🔔" title="Alerts & Daily Actions" sub="Items requiring immediate attention" />
            {data.daily_actions.map(a => (
              <div key={a.id} style={{ display:"flex", alignItems:"flex-start", gap:14, padding:"14px 0", borderBottom:`1px solid ${C.border}30` }}>
                <Badge label={a.priority} />
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, color:C.text, marginBottom:4 }}>{a.message}</div>
                  <div style={{ fontSize:11, color:C.muted }}>{a.created_at}</div>
                </div>
              </div>
            ))}
          </Card>
        )}

      </div>
    </div>
  );
}
