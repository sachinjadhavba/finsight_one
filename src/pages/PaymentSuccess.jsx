export default function PaymentSuccess() {
  const params = new URLSearchParams(window.location.search);
  const caseId = params.get("case") || "";
  const uploadUrl = caseId ? `https://finsightone.co/submit-docs?case=${caseId}` : "https://finsightone.co/submit-docs";
  const emailSubject = caseId ? `Docs - FinsightOne Case ${caseId}` : "Documents - FinsightOne";

  return (
    <div style={{ minHeight:"100vh",background:"#0F172A",fontFamily:"'DM Sans','Segoe UI',Arial,sans-serif",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px 16px" }}>
      <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:32 }}>
        <div style={{ width:44,height:44,background:"#F97316",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:18,color:"#fff" }}>F1</div>
        <div>
          <div style={{ fontSize:16,fontWeight:800,color:"#fff",letterSpacing:0.5 }}>FinsightOne India</div>
          <div style={{ fontSize:10,color:"#64748B",textTransform:"uppercase",letterSpacing:1 }}>MSME Credit Intelligence</div>
        </div>
      </div>
      <div style={{ background:"#1E293B",borderRadius:16,padding:"32px 28px",maxWidth:480,width:"100%",boxShadow:"0 24px 64px rgba(0,0,0,0.4)" }}>
        <div style={{ textAlign:"center",marginBottom:20 }}>
          <div style={{ width:64,height:64,background:"#16A34A20",border:"2px solid #16A34A",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px",fontSize:28 }}>✓</div>
          <div style={{ fontSize:22,fontWeight:900,color:"#fff" }}>Payment Confirmed!</div>
          <div style={{ fontSize:13,color:"#94A3B8",marginTop:6 }}>Thank you for choosing FinsightOne</div>
        </div>
        {caseId && (
          <div style={{ background:"#0F172A",borderRadius:8,padding:"12px 16px",marginBottom:20,border:"1px solid #334155" }}>
            <div style={{ fontSize:10,color:"#64748B",textTransform:"uppercase",letterSpacing:1,marginBottom:4 }}>Your Case ID</div>
            <div style={{ fontSize:18,fontWeight:800,color:"#F97316",letterSpacing:1 }}>{caseId}</div>
            <div style={{ fontSize:11,color:"#64748B",marginTop:4 }}>Save this for your records</div>
          </div>
        )}
        <div style={{ fontSize:13,fontWeight:700,color:"#F97316",textTransform:"uppercase",letterSpacing:1,marginBottom:14 }}>Next Step — Submit Your Documents</div>
        <div style={{ fontSize:13,color:"#CBD5E1",lineHeight:1.8,marginBottom:20 }}>Your report will be ready within <strong style={{ color:"#fff" }}>48 hours</strong> of document submission. You will receive it on WhatsApp.</div>
        <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
          <a href={uploadUrl} style={{ background:"#F97316",color:"#fff",padding:"13px 20px",borderRadius:10,fontWeight:700,fontSize:14,textDecoration:"none",textAlign:"center",display:"block" }}>📤 Upload Documents Online</a>
          <a href={`mailto:info@finsightone.co?subject=${encodeURIComponent(emailSubject)}`} style={{ background:"#1E3A5F",color:"#93C5FD",padding:"13px 20px",borderRadius:10,fontWeight:700,fontSize:13,textDecoration:"none",textAlign:"center",display:"block",border:"1px solid #2563EB" }}>📧 Email: info@finsightone.co</a>
          <a href="https://wa.me/919579453635" style={{ background:"#16A34A20",color:"#4ADE80",padding:"13px 20px",borderRadius:10,fontWeight:700,fontSize:13,textDecoration:"none",textAlign:"center",display:"block",border:"1px solid #16A34A" }}>💬 WhatsApp: Send files directly</a>
        </div>
        <div style={{ marginTop:20,padding:"12px 14px",background:"#0F172A",borderRadius:8,border:"1px dashed #334155" }}>
          <div style={{ fontSize:11,color:"#64748B",lineHeight:1.7 }}>⚠️ Also check your WhatsApp for a confirmation message. If you don't receive it within 5 minutes, use the options above to submit documents directly.</div>
        </div>
      </div>
      <div style={{ marginTop:24,fontSize:11,color:"#334155",textAlign:"center" }}>Questions? <a href="mailto:info@finsightone.co" style={{ color:"#F97316",textDecoration:"none" }}>info@finsightone.co</a></div>
    </div>
  );
      }
