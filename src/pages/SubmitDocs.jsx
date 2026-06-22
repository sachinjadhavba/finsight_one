import { useState, useRef } from "react";

const DOCS_REQUIRED = [
  { id: "bank", label: "Bank Statements", detail: "Last 12 months — all accounts", required: true },
  { id: "gst_returns", label: "GST Returns", detail: "Last 2 years (GSTR-1, GSTR-3B)", required: true },
  { id: "itr", label: "Income Tax Returns", detail: "Last 2 years with computation", required: true },
  { id: "balance_sheet", label: "Audited Balance Sheet & P&L", detail: "Last 2 years", required: true },
  { id: "gst_cert", label: "GST Registration Certificate", required: true },
  { id: "pan_business", label: "Business PAN Card", required: true },
  { id: "pan_aadhaar", label: "Promoter PAN & Aadhaar", detail: "All partners/directors", required: true },
  { id: "existing_loans", label: "Existing Loan Sanction Letters", detail: "If any active loans", required: false },
];

const WEBHOOK = "https://n8n-production-ccb2.up.railway.app/webhook/submit-docs";
const WA_NUMBER = "919579453635";

export default function SubmitDocs() {
  const params = new URLSearchParams(window.location.search);
  const caseId = params.get("case") || "";

  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | uploading | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef();

  function addFiles(incoming) {
    const arr = Array.from(incoming);
    setFiles(prev => {
      const existing = new Set(prev.map(f => f.name + f.size));
      return [...prev, ...arr.filter(f => !existing.has(f.name + f.size))];
    });
  }

  function removeFile(idx) {
    setFiles(prev => prev.filter((_, i) => i !== idx));
  }

  function onDrop(e) {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  }

  async function handleSubmit() {
    if (files.length === 0) { setErrorMsg("Please attach at least one document."); return; }
    setErrorMsg("");
    setStatus("uploading");
    try {
      const fd = new FormData();
      if (caseId) fd.append("case_id", caseId);
      fd.append("submitted_at", new Date().toISOString());
      files.forEach(f => fd.append("files", f));
      const res = await fetch(WEBHOOK, { method: "POST", body: fd });
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg("Upload failed. Please use WhatsApp or Email below to send your documents.");
    }
  }

  const fmt = (bytes) => bytes < 1024 * 1024 ? `${(bytes/1024).toFixed(0)} KB` : `${(bytes/1024/1024).toFixed(1)} MB`;

  // ── styles ──
  const S = {
    page: { minHeight:"100vh", background:"#0F172A", fontFamily:"'DM Sans','Segoe UI',Arial,sans-serif", padding:"28px 16px" },
    center: { maxWidth:560, margin:"0 auto" },
    logo: { display:"flex", alignItems:"center", gap:10, marginBottom:28 },
    logoBox: { width:42, height:42, background:"#F97316", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:17, color:"#fff" },
    card: { background:"#1E293B", borderRadius:16, padding:"28px 24px", boxShadow:"0 24px 64px rgba(0,0,0,0.4)", marginBottom:16 },
    h1: { fontSize:20, fontWeight:900, color:"#fff", marginBottom:4 },
    sub: { fontSize:13, color:"#94A3B8", marginBottom:20 },
    caseBox: { background:"#0F172A", borderRadius:8, padding:"10px 14px", marginBottom:20, border:"1px solid #334155", display:"flex", alignItems:"center", justifyContent:"space-between" },
    caseLabel: { fontSize:10, color:"#64748B", textTransform:"uppercase", letterSpacing:1 },
    caseVal: { fontSize:17, fontWeight:800, color:"#F97316", letterSpacing:1 },
    sectionTitle: { fontSize:11, fontWeight:700, color:"#F97316", textTransform:"uppercase", letterSpacing:1, marginBottom:12 },
    checklist: { listStyle:"none", padding:0, margin:"0 0 20px" },
    checkItem: { display:"flex", alignItems:"flex-start", gap:8, marginBottom:8, fontSize:13, color:"#CBD5E1", lineHeight:1.5 },
    checkDot: (req) => ({ width:6, height:6, borderRadius:"50%", background: req ? "#F97316" : "#475569", marginTop:5, flexShrink:0 }),
    dropzone: (drag) => ({ border:`2px dashed ${drag ? "#F97316" : "#334155"}`, borderRadius:12, padding:"28px 20px", textAlign:"center", cursor:"pointer", transition:"border 0.2s", background: drag ? "#F9731608" : "transparent", marginBottom:16 }),
    dropText: { fontSize:14, color:"#94A3B8", marginBottom:8 },
    dropBtn: { background:"#F97316", color:"#fff", border:"none", borderRadius:8, padding:"8px 20px", fontWeight:700, fontSize:13, cursor:"pointer" },
    fileList: { marginBottom:16 },
    fileRow: { display:"flex", alignItems:"center", justifyContent:"space-between", background:"#0F172A", borderRadius:8, padding:"8px 12px", marginBottom:6, fontSize:12 },
    fileName: { color:"#E2E8F0", flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" },
    fileSize: { color:"#64748B", marginLeft:8, flexShrink:0 },
    removeBtn: { background:"none", border:"none", color:"#EF4444", cursor:"pointer", fontSize:16, padding:"0 0 0 8px", flexShrink:0 },
    submitBtn: { width:"100%", background: status==="uploading" ? "#94530a" : "#F97316", color:"#fff", border:"none", borderRadius:10, padding:"14px 20px", fontWeight:800, fontSize:15, cursor: status==="uploading" ? "not-allowed" : "pointer" },
    errorBox: { background:"#EF444420", border:"1px solid #EF4444", borderRadius:8, padding:"10px 14px", fontSize:12, color:"#FCA5A5", marginBottom:12 },
    altTitle: { fontSize:11, fontWeight:700, color:"#64748B", textTransform:"uppercase", letterSpacing:1, marginBottom:10, marginTop:4 },
    altBtn: (bg, color, border) => ({ display:"block", background:bg, color, border:`1px solid ${border}`, borderRadius:10, padding:"12px 20px", fontWeight:700, fontSize:13, textDecoration:"none", textAlign:"center", marginBottom:8 }),
    successCard: { textAlign:"center", padding:"12px 0" },
    tick: { width:64, height:64, background:"#16A34A20", border:"2px solid #16A34A", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px", fontSize:28 },
  };

  if (status === "success") {
    return (
      <div style={S.page}>
        <div style={S.center}>
          <div style={S.logo}>
            <div style={S.logoBox}>F1</div>
            <div>
              <div style={{ fontSize:15, fontWeight:800, color:"#fff" }}>FinsightOne India</div>
              <div style={{ fontSize:10, color:"#64748B", textTransform:"uppercase", letterSpacing:1 }}>MSME Credit Intelligence</div>
            </div>
          </div>
          <div style={S.card}>
            <div style={S.successCard}>
              <div style={S.tick}>✓</div>
              <div style={{ fontSize:20, fontWeight:900, color:"#fff", marginBottom:6 }}>Documents Received!</div>
              <div style={{ fontSize:13, color:"#94A3B8", marginBottom:4 }}>We'll review and process your report within <strong style={{ color:"#fff" }}>48 hours</strong>.</div>
              <div style={{ fontSize:13, color:"#94A3B8" }}>You'll receive it on WhatsApp.</div>
              {caseId && <div style={{ marginTop:16, fontSize:12, color:"#64748B" }}>Case ID: <span style={{ color:"#F97316", fontWeight:700 }}>{caseId}</span></div>}
            </div>
          </div>
          <div style={{ fontSize:11, color:"#334155", textAlign:"center" }}>Questions? <a href="mailto:info@finsightone.co" style={{ color:"#F97316", textDecoration:"none" }}>info@finsightone.co</a></div>
        </div>
      </div>
    );
  }

  return (
    <div style={S.page}>
      <div style={S.center}>
        {/* Header */}
        <div style={S.logo}>
          <div style={S.logoBox}>F1</div>
          <div>
            <div style={{ fontSize:15, fontWeight:800, color:"#fff" }}>FinsightOne India</div>
            <div style={{ fontSize:10, color:"#64748B", textTransform:"uppercase", letterSpacing:1 }}>MSME Credit Intelligence</div>
          </div>
        </div>

        {/* Upload Card */}
        <div style={S.card}>
          <div style={S.h1}>Submit Your Documents</div>
          <div style={S.sub}>Upload all documents so we can prepare your credit report.</div>

          {caseId && (
            <div style={S.caseBox}>
              <div>
                <div style={S.caseLabel}>Case ID</div>
                <div style={S.caseVal}>{caseId}</div>
              </div>
              <div style={{ fontSize:11, color:"#16A34A" }}>✓ Linked</div>
            </div>
          )}

          {/* Checklist */}
          <div style={S.sectionTitle}>Documents Required</div>
          <ul style={S.checklist}>
            {DOCS_REQUIRED.map(d => (
              <li key={d.id} style={S.checkItem}>
                <span style={S.checkDot(d.required)} />
                <span>
                  <strong style={{ color: d.required ? "#E2E8F0" : "#94A3B8" }}>{d.label}</strong>
                  {!d.required && <span style={{ color:"#475569" }}> (if applicable)</span>}
                  {d.detail && <span style={{ color:"#64748B" }}> — {d.detail}</span>}
                </span>
              </li>
            ))}
          </ul>

          {/* Drop zone */}
          <div style={S.sectionTitle}>Attach Files (PDF / JPG / PNG)</div>
          <div
            style={S.dropzone(dragging)}
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
          >
            <div style={S.dropText}>Drag & drop files here, or</div>
            <button style={S.dropBtn} onClick={e => { e.stopPropagation(); inputRef.current?.click(); }}>Browse Files</button>
            <input ref={inputRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png" style={{ display:"none" }} onChange={e => { addFiles(e.target.files); e.target.value = ""; }} />
          </div>

          {/* File list */}
          {files.length > 0 && (
            <div style={S.fileList}>
              {files.map((f, i) => (
                <div key={i} style={S.fileRow}>
                  <span style={{ fontSize:14, marginRight:6 }}>📄</span>
                  <span style={S.fileName}>{f.name}</span>
                  <span style={S.fileSize}>{fmt(f.size)}</span>
                  <button style={S.removeBtn} onClick={() => removeFile(i)}>✕</button>
                </div>
              ))}
              <div style={{ fontSize:11, color:"#475569", marginTop:4 }}>{files.length} file{files.length !== 1 ? "s" : ""} selected</div>
            </div>
          )}

          {errorMsg && <div style={S.errorBox}>⚠️ {errorMsg}</div>}

          <button style={S.submitBtn} disabled={status === "uploading"} onClick={handleSubmit}>
            {status === "uploading" ? "Uploading…" : "📤 Submit Documents"}
          </button>
        </div>

        {/* Alternative methods */}
        <div style={S.card}>
          <div style={S.altTitle}>Prefer another way?</div>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi FinsightOne, sending my documents" + (caseId ? ` for Case ID: ${caseId}` : ""))}`}
            style={S.altBtn("#16A34A20", "#4ADE80", "#16A34A")}
          >💬 WhatsApp: Send files directly</a>
          <a
            href={`mailto:info@finsightone.co?subject=${encodeURIComponent("Documents" + (caseId ? ` - Case ${caseId}` : ""))}`}
            style={S.altBtn("#1E3A5F", "#93C5FD", "#2563EB")}
          >📧 Email: info@finsightone.co</a>
        </div>

        <div style={{ fontSize:11, color:"#334155", textAlign:"center" }}>Questions? <a href="mailto:info@finsightone.co" style={{ color:"#F97316", textDecoration:"none" }}>info@finsightone.co</a></div>
      </div>
    </div>
  );
}
