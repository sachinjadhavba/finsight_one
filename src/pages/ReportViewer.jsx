import { useState, useEffect } from "react";

const SUPABASE_URL = "https://ljwgipoqqeoqcoekmzqg.supabase.co";

export default function ReportViewer({ caseId, round }) {
  const [html, setHtml] = useState("");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!caseId) { setStatus("error"); return; }
    async function load() {
      try {
        const r = round || 1;
        const storageUrl = `${SUPABASE_URL}/storage/v1/object/public/reports/${caseId}/report_v${r}.html`;
        const resp = await fetch(storageUrl);
        if (!resp.ok) throw new Error("Not found");
        const text = await resp.text();
        if (!text || text.trim().length < 100) throw new Error("Empty report");
        setHtml(text);
        setStatus("ready");
      } catch (e) {
        setStatus("error");
      }
    }
    load();
  }, [caseId, round]);

  if (status === "loading") {
    return (
      <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh",background:"#0F172A",fontFamily:"'DM Sans','Segoe UI',Arial,sans-serif",gap:16 }}>
        <div style={{ width:48,height:48,background:"#F97316",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:20,color:"#fff" }}>F1</div>
        <div style={{ color:"#94A3B8",fontSize:14 }}>Loading your report…</div>
        <div style={{ width:200,height:3,background:"#1E293B",borderRadius:4,overflow:"hidden" }}>
          <div style={{ height:"100%",background:"#F97316",borderRadius:4,animation:"slide 1.4s ease-in-out infinite" }} />
        </div>
        <style>{`@keyframes slide { 0%{width:0%;margin-left:0} 50%{width:70%;margin-left:0} 100%{width:0%;margin-left:200px} }`}</style>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh",background:"#0F172A",fontFamily:"'DM Sans','Segoe UI',Arial,sans-serif",gap:12,padding:24 }}>
        <div style={{ width:48,height:48,background:"#F97316",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:20,color:"#fff" }}>F1</div>
        <div style={{ color:"#fff",fontSize:18,fontWeight:700,marginTop:8 }}>Report Not Found</div>
        <div style={{ color:"#94A3B8",fontSize:13,textAlign:"center",maxWidth:340,lineHeight:1.7 }}>This report link may have expired or the Case ID is incorrect. Please contact us if you need assistance.</div>
        <a href="https://wa.me/919579453635" style={{ marginTop:8,background:"#25D366",color:"#fff",padding:"10px 24px",borderRadius:8,fontWeight:700,fontSize:13,textDecoration:"none" }}>WhatsApp Us</a>
        <a href="mailto:info@finsightone.co" style={{ color:"#F97316",fontSize:12,textDecoration:"none" }}>info@finsightone.co</a>
      </div>
    );
  }

  return (
    <iframe srcdoc={html} title="FinsightOne Report" style={{ width:"100%",height:"100vh",border:"none",display:"block" }} sandbox="allow-same-origin" />
  );
      }
