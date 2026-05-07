import { WHATSAPP_NUMBER } from "../config";

export default function WAButton() {
  return (
    <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20FinSight%20One%2C%20I%27d%20like%20a%20free%20consultation`}
      target="_blank" rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{ position: "fixed", bottom: 24, right: 24, zIndex: 200, width: 54, height: 54, borderRadius: "50%", background: "linear-gradient(135deg,#25D366,#128C7E)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 30px #25D36660", textDecoration: "none", fontSize: 26 }}>
      💬
    </a>
  );
}
