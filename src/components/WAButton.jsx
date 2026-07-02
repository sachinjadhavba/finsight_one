import { WHATSAPP_NUMBER } from "../config";

export default function WAButton() {
  return (
    <>
      <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20FinSight%20One%2C%20I%27d%20like%20a%20free%20consultation`}
        target="_blank" rel="noopener noreferrer"
        aria-label="Chat with FinsightOne on WhatsApp"
        className="wa-fab"
        style={{ position: "fixed", bottom: 24, right: 24, zIndex: 200, display: "flex", alignItems: "center", textDecoration: "none" }}>
        <span className="wa-fab-label" style={{ background: "#111827", color: "#fff", fontSize: 13, fontWeight: 600, padding: "8px 14px", borderRadius: 8, whiteSpace: "nowrap", marginRight: 10, opacity: 0, transform: "translateX(8px)", transition: "opacity 0.2s ease, transform 0.2s ease" }}>
          Chat with FinsightOne →
        </span>
        <span style={{ position: "relative", width: 54, height: 54, flexShrink: 0 }}>
          <span className="wa-fab-ring" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#25D366", opacity: 0.5 }} />
          <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "linear-gradient(135deg,#25D366,#128C7E)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(37,211,102,0.45)" }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.35a9.87 9.87 0 0 0 4.62 1.14h.01c5.46 0 9.9-4.45 9.9-9.9 0-2.65-1.03-5.13-2.9-7C17.17 3.02 14.69 2 12.04 2Zm0 1.8c2.19 0 4.24.85 5.79 2.39a8.1 8.1 0 0 1 2.4 5.72c0 4.47-3.64 8.1-8.15 8.1a8.1 8.1 0 0 1-4.13-1.13l-.3-.17-3.22.8.86-3.13-.19-.32a8.05 8.05 0 0 1-1.24-4.29c0-4.48 3.65-8.1 8.18-8.1v.13Zm-4.5 4.5c-.17 0-.45.06-.68.32-.23.26-.89.87-.89 2.12 0 1.25.91 2.46 1.04 2.63.13.17 1.78 2.86 4.4 3.9 2.18.87 2.62.7 3.1.65.47-.04 1.51-.61 1.72-1.2.21-.6.21-1.11.15-1.21-.06-.11-.23-.17-.47-.3-.23-.13-1.4-.7-1.61-.78-.22-.08-.37-.11-.53.11-.15.22-.6.77-.74.93-.13.15-.27.17-.5.06-.23-.13-.98-.37-1.86-1.17-.69-.62-1.15-1.38-1.29-1.62-.13-.22-.01-.35.11-.47.11-.11.23-.28.35-.42.11-.14.15-.24.23-.4.08-.16.04-.3-.02-.42-.06-.11-.53-1.35-.74-1.84-.19-.47-.39-.42-.53-.42Z"/>
            </svg>
          </span>
        </span>
      </a>
      <style>{`
        @keyframes waPulse { 0%{transform:scale(1);opacity:0.5} 70%{transform:scale(1.5);opacity:0} 100%{transform:scale(1.5);opacity:0} }
        .wa-fab-ring { animation: waPulse 2.4s ease-out infinite; }
        .wa-fab:hover .wa-fab-label { opacity: 1; transform: translateX(0); }
      `}</style>
    </>
  );
}
