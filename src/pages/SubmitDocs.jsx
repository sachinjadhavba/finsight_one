import { useState, useRef } from "react";

// ── Document checklists per plan ─────────────────────────────────────────────
const CHECKLISTS = {
  DER: {
    label: "Detailed Eligibility Report",
    docs: [
      { label: "PAN Card", detail: "Applicant / all partners / directors", required: true },
      { label: "Aadhaar Card", detail: "Applicant / all partners / directors", required: true },
      { label: "Last 2 Years ITR", detail: "With computation sheet", required: true },
      { label: "Bank Statements", detail: "Last 12 months — primary account", required: true },
      { label: "GSTR-3B", detail: "Last 12 months (if GST registered)", required: true },
      { label: "Existing Loan Statements", detail: "Last 6 months for all active loans (needed for FOIR)", required: true },
      { label: "CIBIL Report", detail: "Self-downloaded from cibil.com within last 30 days (PDF)", required: true },
    ],
  },
  LRP: {
    label: "Loan Readiness Plan",
    docs: [
      { label: "PAN Card", detail: "Company PAN + all directors/partners", required: true },
      { label: "Aadhaar Card", detail: "All directors/partners", required: true },
      { label: "GST Registration Certificate", required: true },
      { label: "UDYAM / Udyog Certificate", required: true },
      { label: "Business Registration Proof", detail: "MOA+AOA+COI (Pvt Ltd/LLP) OR Partnership Deed OR Shop Establishment (Proprietorship)", required: true },
      { label: "Last 3 Years ITR", detail: "With computation sheet", required: true },
      { label: "Last 3 Years Audited Balance Sheet & P&L", detail: "CA certified", required: true },
      { label: "GSTR-3B", detail: "Last 12 months", required: true },
      { label: "Bank Statements", detail: "Last 12 months — all active current accounts", required: true },
      { label: "Provisional P&L", detail: "Current year (April to latest month)", required: true },
      { label: "CIBIL Report", detail: "Self-downloaded from cibil.com within last 30 days (PDF)", required: true },
      { label: "Existing Loan Sanction Letters + Statements", detail: "Last 3 months statements for each active loan", required: false },
      { label: "Office / Factory Lease or Ownership Proof", required: false },
      { label: "Industry-Specific Licence", detail: "Drug licence / FSSAI / Trade licence — as applicable", required: false },
    ],
  },
  BPP: {
    label: "Banker Presentation Pack",
    docs: [
      { label: "PAN Card", detail: "Company PAN + all directors/partners", required: true },
      { label: "Aadhaar Card", detail: "All directors/partners", required: true },
      { label: "GST Registration Certificate", required: true },
      { label: "UDYAM / Udyog Certificate", required: true },
      { label: "Business Registration Proof", detail: "MOA+AOA+COI (Pvt Ltd/LLP) OR Partnership Deed OR Shop Establishment (Proprietorship)", required: true },
      { label: "Last 3 Years ITR", detail: "With computation sheet", required: true },
      { label: "Last 3 Years Audited Balance Sheet & P&L", detail: "CA certified", required: true },
      { label: "GSTR-3B", detail: "Last 12 months", required: true },
      { label: "Bank Statements", detail: "Last 12 months — all active current accounts", required: true },
      { label: "Provisional P&L", detail: "Current year (April to latest month)", required: true },
      { label: "CIBIL Report (Personal)", detail: "All directors — self-downloaded from cibil.com within last 30 days", required: true },
      { label: "CA Net Worth Certificate", detail: "All directors", required: true },
      { label: "Top 5 Customer Invoices + Outstanding Debtors List", required: true },
      { label: "Business Note", detail: "Loan purpose + repayment rationale (FinsightOne assists)", required: true },
      { label: "Existing Loan Sanction Letters + Statements", detail: "Last 3 months for each active loan", required: false },
      { label: "Machine Quotations / Asset Purchase Documents", detail: "If capex loan", required: false },
      { label: "Order Book / Confirmed Purchase Orders", detail: "If available", required: false },
      { label: "Property Documents", detail: "Index 2 + latest electricity bill + property tax receipt (if collateral)", required: false },
    ],
  },
  CMA: {
    label: "CMA / LAN / DPR",
    docs: [
      { label: "Last 3 Years ITR", detail: "With computation sheet", required: true },
      { label: "Last 3 Years Audited Balance Sheet & P&L", required: true },
      { label: "Bank Statements", detail: "Last 12 months — CC + CA (all accounts)", required: true },
      { label: "GSTR-3B", detail: "Last 12 months", required: true },
      { label: "Provisional P&L", detail: "Current year", required: true },
      { label: "Stock Statement", detail: "Latest — for WC/CC loans", required: true },
      { label: "Debtors List with Ageing", detail: "For WC loans", required: true },
      { label: "Creditors List with Ageing", required: true },
      { label: "Existing Loan Statements", detail: "CC, TL, WC — last 6 months", required: true },
      { label: "UDYAM Certificate", required: true },
      { label: "Business Profile + Loan Purpose Note", required: true },
    ],
  },
  RAR: {
    label: "Rejection Analysis Report",
    docs: [
      { label: "Rejection Letter from Lender", detail: "⚠️ Mandatory — report cannot be prepared without this", required: true },
      { label: "Last 2 Years ITR", detail: "With computation", required: true },
      { label: "Bank Statements", detail: "Last 6 months", required: true },
      { label: "All Existing Loan Statements", required: true },
      { label: "CIBIL Report", detail: "Must be latest — within last 30 days (PDF from cibil.com)", required: true },
      { label: "PAN Card", required: true },
      { label: "Aadhaar Card", required: true },
    ],
  },
};

// type param → checklist key mapping
const TYPE_MAP = {
  LRP: "LRP", "loan-readiness-plan": "LRP", "loan readiness plan": "LRP",
  DER: "DER", "detailed-eligibility-report": "DER",
  BPP: "BPP", "banker-presentation-pack": "BPP",
  CMA: "CMA", LAN: "CMA", DPR: "CMA",
  RAR: "RAR", "rejection-analysis-report": "RAR",
};

const WEBHOOK = "https://n8n-production-ccb2.up.railway.app/webhook/submit-docs";
const WA_NUMBER = "919579453635";

export default function SubmitDocs() {
  const params = new URLSearchParams(window.location.search);
  const caseId = params.get("case") || "";
  const typeRaw = params.get("type") || "LRP";
  const planKey = TYPE_MAP[typeRaw] || "LRP";
  const plan = CHECKLISTS[planKey];

  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef();

  function addFiles(incoming) {
    const arr = Array.from(incoming);
    setFiles(prev => {
      const existing = new Set(prev.map(f => f.name + f.size));
      return [...prev, ...arr.filter(f => !existing.has(f.name + f.size))];
    });
  }
  function removeFile(idx) { setFiles(prev => prev.filter((_, i) => i !== idx)); }
  function onDrop(e) { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }

  async function handleSubmit() {
    if (files.length === 0) { setErrorMsg("Please attach at least one document."); return; }
    setErrorMsg("");
    setStatus("uploading");
    try {
      const fd = new FormData();
      if (caseId) fd.append("case_id", caseId);
      fd.append("plan_type", planKey);
      fd.append("submitted_at", new Date().toISOString());
      files.forEach(f => fd.append("files", f));
      const res = await fetch(WEBHOOK, { method: "POST", body: fd });
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Upload failed. Please use WhatsApp or Email below to send your documents.");
    }
  }

  const fmt = b => b < 1048576 ? `${(b/1024).toFixed(0)} KB` : `${(b/1048576).toFixed(1)} MB`;

  const S = {
    page: { minHeight:"100vh", background:"#0F172A", fontFamily:"'DM Sans','Segoe UI',Arial,sans-serif", padding:"28px 16px" },
    center: { maxWidth:560, margin:"0 auto" },
    logo: { display:"flex", alignItems:"center", gap:10, marginBottom:28 },
    logoBox: { width:42, height:42, background:"#F97316", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:17, color:"#fff" },
    card: { background:"#1E293B", borderRadius:16, padding:"28px 24px", boxShadow:"0 24px 64px rgba(0,0,0,0.4)", marginBottom:16 },
    h1: { fontSize:20, fontWeight:900, color:"#fff", marginBottom:4 },
    sub: { fontSize:13, color:"#94A3B8", marginBottom:20 },
    caseBox: { background:"#0F172A", borderRadius:8, padding:"10px 14px", marginBottom:20, border:"1px solid #334155", display:"flex", alignItems:"center", justifyContent:"space-between" },
    sectionTitle: { fontSize:11, fontWeight:700, color:"#F97316", textTransform:"uppercase", letterSpacing:1, marginBottom:12 },
    checklist: { listStyle:"none", padding:0, margin:"0 0 20px" },
    checkItem: { display:"flex", alignItems:"flex-start", gap:8, marginBottom:8, fontSize:13, color:"#CBD5E1", lineHeight:1.5 },
    checkDot: req => ({ width:6, height:6, borderRadius:"50%", background: req ? "#F97316" : "#475569", marginTop:5, flexShrink:0 }),
    dropzone: drag => ({ border:`2px dashed ${drag ? "#F97316" : "#334155"}`, borderRadius:12, padding:"28px 20px", textAlign:"center", cursor:"pointer", transition:"border 0.2s", background: drag ? "#F9731608" : "transparent", marginBottom:16 }),
    dropBtn: { background:"#F97316", color:"#fff", border:"none", borderRadius:8, padding:"8px 20px", fontWeight:700, fontSize:13, cursor:"pointer" },
    fileRow: { display:"flex", alignItems:"center", background:"#0F172A", borderRadius:8, padding:"8px 12px", marginBottom:6, fontSize:12 },
    submitBtn: { width:"100%", background: status==="uploading" ? "#94530a" : "#F97316", color:"#fff", border:"none", borderRadius:10, padding:"14px 20px", fontWeight:800, fontSize:15, cursor: status==="uploading" ? "not-allowed" : "pointer" },
    errorBox: { background:"#EF444420", border:"1px solid #EF4444", borderRadius:8, padding:"10px 14px", fontSize:12, color:"#FCA5A5", marginBottom:12 },
    altBtn: (bg, color, border) => ({ display:"block", background:bg, color, border:`1px solid ${border}`, borderRadius:10, padding:"12px 20px", fontWeight:700, fontSize:13, textDecoration:"none", textAlign:"center", marginBottom:8 }),
  };

  if (status === "success") return (
    <div style={S.page}><div style={S.center}>
      <div style={S.logo}>
        <div style={S.logoBox}>F1</div>
        <div><div style={{ fontSize:15, fontWeight:800, color:"#fff" }}>FinsightOne India</div><div style={{ fontSize:10, color:"#64748B", textTransform:"uppercase", letterSpacing:1 }}>MSME Credit Intelligence</div></div>
      </div>
      <div style={S.card}>
        <div style={{ textAlign:"center", padding:"12px 0" }}>
          <div style={{ width:64, height:64, background:"#16A34A20", border:"2px solid #16A34A", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px", fontSize:28 }}>✓</div>
          <div style={{ fontSize:20, fontWeight:900, color:"#fff", marginBottom:6 }}>Documents Received!</div>
          <div style={{ fontSize:13, color:"#94A3B8" }}>We'll review and prepare your report within <strong style={{ color:"#fff" }}>48 hours</strong>. You'll receive it on WhatsApp.</div>
          {caseId && <div style={{ marginTop:16, fontSize:12, color:"#64748B" }}>Case ID: <span style={{ color:"#F97316", fontWeight:700 }}>{caseId}</span></div>}
        </div>
      </div>
      <div style={{ fontSize:11, color:"#334155", textAlign:"center" }}>Questions? <a href="mailto:info@finsightone.co" style={{ color:"#F97316", textDecoration:"none" }}>info@finsightone.co</a></div>
    </div></div>
  );

  return (
    <div style={S.page}><div style={S.center}>
      <div style={S.logo}>
        <div style={S.logoBox}>F1</div>
        <div><div style={{ fontSize:15, fontWeight:800, color:"#fff" }}>FinsightOne India</div><div style={{ fontSize:10, color:"#64748B", textTransform:"uppercase", letterSpacing:1 }}>MSME Credit Intelligence</div></div>
      </div>

      <div style={S.card}>
        <div style={S.h1}>Submit Your Documents</div>
        <div style={S.sub}>{plan.label} — upload all required documents so we can prepare your report.</div>

        {caseId && (
          <div style={S.caseBox}>
            <div><div style={{ fontSize:10, color:"#64748B", textTransform:"uppercase", letterSpacing:1 }}>Case ID</div><div style={{ fontSize:17, fontWeight:800, color:"#F97316", letterSpacing:1 }}>{caseId}</div></div>
            <div style={{ fontSize:11, color:"#16A34A" }}>✓ Linked</div>
          </div>
        )}

        <div style={S.sectionTitle}>Documents Required</div>
        <ul style={S.checklist}>
          {plan.docs.map((d, i) => (
            <li key={i} style={S.checkItem}>
              <span style={S.checkDot(d.required)} />
              <span>
                <strong style={{ color: d.required ? "#E2E8F0" : "#94A3B8" }}>{d.label}</strong>
                {!d.required && <span style={{ color:"#475569" }}> (if applicable)</span>}
                {d.detail && <span style={{ color:"#64748B" }}> — {d.detail}</span>}
              </span>
            </li>
          ))}
        </ul>

        <div style={S.sectionTitle}>Attach Files (PDF / JPG / PNG)</div>
        <div style={S.dropzone(dragging)} onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={onDrop} onClick={() => inputRef.current?.click()}>
          <div style={{ fontSize:14, color:"#94A3B8", marginBottom:8 }}>Drag & drop files here, or</div>
          <button style={S.dropBtn} onClick={e => { e.stopPropagation(); inputRef.current?.click(); }}>Browse Files</button>
          <input ref={inputRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png" style={{ display:"none" }} onChange={e => { addFiles(e.target.files); e.target.value = ""; }} />
        </div>

        {files.length > 0 && (
          <div style={{ marginBottom:16 }}>
            {files.map((f, i) => (
              <div key={i} style={S.fileRow}>
                <span style={{ fontSize:14, marginRight:6 }}>📄</span>
                <span style={{ color:"#E2E8F0", flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{f.name}</span>
                <span style={{ color:"#64748B", marginLeft:8, flexShrink:0 }}>{fmt(f.size)}</span>
                <button style={{ background:"none", border:"none", color:"#EF4444", cursor:"pointer", fontSize:16, padding:"0 0 0 8px" }} onClick={() => removeFile(i)}>✕</button>
              </div>
            ))}
            <div style={{ fontSize:11, color:"#475569", marginTop:4 }}>{files.length} file{files.length !== 1 ? "s" : ""} selected</div>
          </div>
        )}

        {errorMsg && <div style={S.errorBox}>⚠️ {errorMsg}</div>}
        <button style={S.submitBtn} disabled={status==="uploading"} onClick={handleSubmit}>
          {status==="uploading" ? "Uploading…" : "📤 Submit Documents"}
        </button>
      </div>

      <div style={S.card}>
        <div style={{ fontSize:11, fontWeight:700, color:"#64748B", textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>Prefer another way?</div>
        <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi FinsightOne, sending my documents" + (caseId ? ` for Case ID: ${caseId}` : ""))}`} style={S.altBtn("#16A34A20","#4ADE80","#16A34A")}>💬 WhatsApp: Send files directly</a>
        <a href={`mailto:info@finsightone.co?subject=${encodeURIComponent("Documents" + (caseId ? ` - Case ${caseId}` : ""))}`} style={S.altBtn("#1E3A5F","#93C5FD","#2563EB")}>📧 Email: info@finsightone.co</a>
      </div>

      <div style={{ fontSize:11, color:"#334155", textAlign:"center" }}>Questions? <a href="mailto:info@finsightone.co" style={{ color:"#F97316", textDecoration:"none" }}>info@finsightone.co</a></div>
    </div></div>
  );
}
