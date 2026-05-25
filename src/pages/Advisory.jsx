import Footer from "../components/Footer";
import { ADVISORY_PRODUCTS } from "../data";

const INDIGO = "#4F46E5";
const ORANGE = "#EA580C";
const DARK   = "#111827";
const MUTED  = "#6B7280";
const WHITE  = "#fff";
const GRAY   = "#F9FAFB";

export default function Advisory({ navigate }) {
  return (
    <div style={{ fontFamily: "Arial,'Helvetica Neue',sans-serif" }}>

      {/* HERO */}
      <div style={{ background: WHITE, padding: "clamp(44px,6vw,72px) clamp(20px,4vw,48px)", borderBottom: "1px solid #E5E7EB" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#EEF2FF", border: "1px solid #C7D2FE", color: INDIGO, fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 20, marginBottom: 20 }}>
            <span style={{ width: 5, height: 5, background: ORANGE, borderRadius: "50%", display: "inline-block" }} />
            20 Years Banking Expertise · Personally Delivered
          </div>
          <h1 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 900, color: DARK, lineHeight: 1.15, marginBottom: 14, letterSpacing: "-0.03em" }}>
            Expert <span style={{ color: ORANGE }}>Advisory</span> —<br />When You Need More Than Documents
          </h1>
          <p style={{ fontSize: 16, color: MUTED, maxWidth: 560, margin: "0 auto 28px", lineHeight: 1.7 }}>
            Sometimes you need a banker's mind, not just a banker's paperwork. Complex loan structures, rejections, NPA situations, limit enhancements — our expert team works with you one-on-one.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate("check")} style={{ background: ORANGE, color: WHITE, fontSize: 14, fontWeight: 700, padding: "12px 28px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
              Check My Eligibility First — Free
            </button>
            <button onClick={() => window.open("https://calendly.com/finsightone/advisory", "_blank")} style={{ background: WHITE, color: INDIGO, fontSize: 14, fontWeight: 600, padding: "12px 28px", borderRadius: 8, border: `1px solid ${INDIGO}`, cursor: "pointer", fontFamily: "inherit" }}>
              Book a Free Discovery Call
            </button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={{ background: GRAY, borderBottom: "1px solid #E5E7EB", padding: "18px clamp(20px,4vw,48px)", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 16 }}>
        {[["20 yrs","Banking Expertise"],["₹200Cr+","Loans Structured"],["3","Advisory Services"],["48hr","First Response"]].map(([v,l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: ORANGE }}>{v}</div>
            <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* WHO NEEDS ADVISORY */}
      <div style={{ background: WHITE, padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", color: ORANGE, marginBottom: 10, textAlign: "center" }}>Is This For You?</div>
        <h2 style={{ fontSize: "clamp(22px,3vw,28px)", fontWeight: 900, textAlign: "center", marginBottom: 36, color: DARK }}>You Need Advisory If...</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, maxWidth: 900, margin: "0 auto" }}>
          {[
            { icon: "🔄", text: "Your loan was rejected and you need to understand why and fix it before reapplying" },
            { icon: "🏗️", text: "You need a large or complex loan and want to structure it correctly before approaching any bank" },
            { icon: "📈", text: "Your existing loan limit is too low and you want to enhance it with your current lender" },
          ].map(i => (
            <div key={i.text} style={{ background: "#EEF2FF", border: "1px solid #C7D2FE", borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{i.icon}</div>
              <div style={{ fontSize: 13, color: DARK, lineHeight: 1.6 }}>{i.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ADVISORY SERVICES */}
      <div style={{ background: GRAY, padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", color: ORANGE, marginBottom: 10, textAlign: "center" }}>Advisory Services</div>
        <h2 style={{ fontSize: "clamp(22px,3vw,28px)", fontWeight: 900, textAlign: "center", marginBottom: 36, color: DARK }}>Three Ways We Advise</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, maxWidth: 1000, margin: "0 auto" }}>
          {ADVISORY_PRODUCTS.map((a, i) => (
            <div key={a.name} style={{ border: "1px solid #E5E7EB", borderRadius: 14, overflow: "hidden", background: WHITE, borderTop: `3px solid ${[INDIGO, ORANGE, "#059669"][i]}` }}>
              <div style={{ padding: "20px 20px 16px" }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{a.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: DARK, marginBottom: 6 }}>{a.name}</div>
                <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.6, marginBottom: 14 }}>{a.desc}</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: [INDIGO, ORANGE, "#059669"][i] }}>{a.price}</div>
                <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 3, marginBottom: 14 }}>{a.who}</div>
                <button onClick={() => window.open("https://wa.me/919579453635?text=Hi%20FinsightOne%2C%20I%20need%20advisory%20on%20" + encodeURIComponent(a.name), "_blank")} style={{ display: "block", width: "100%", padding: "10px 14px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", background: [INDIGO, ORANGE, "#059669"][i], color: WHITE, border: "none", fontFamily: "inherit" }}>
                  Book a Call →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PROCESS */}
      <div style={{ background: WHITE, padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", color: ORANGE, marginBottom: 10, textAlign: "center" }}>How Advisory Works</div>
        <h2 style={{ fontSize: "clamp(22px,3vw,28px)", fontWeight: 900, textAlign: "center", marginBottom: 36, color: DARK }}>Simple 3-Step Process</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, maxWidth: 720, margin: "0 auto" }}>
          {[
            { num: "1", title: "Free discovery call", desc: "30-minute call to understand your situation. No charge. No obligation." },
            { num: "2", title: "We assess and advise", desc: "Our expert reviews your case and gives you a clear action plan." },
            { num: "3", title: "We execute together", desc: "We work with you to implement the plan — documents, submissions, follow-up." },
          ].map(s => (
            <div key={s.num} style={{ textAlign: "center" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: INDIGO, color: WHITE, fontSize: 17, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>{s.num}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: DARK, marginBottom: 6 }}>{s.title}</div>
              <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.5 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: DARK, padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 900, color: WHITE, marginBottom: 12 }}>Not Sure What You Need?</h2>
        <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 28 }}>Start with a free eligibility check — we will tell you exactly which service fits your situation.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => navigate("check")} style={{ background: ORANGE, color: WHITE, fontSize: 14, fontWeight: 700, padding: "13px 28px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
            Check My Eligibility — Free →
          </button>
          <button onClick={() => navigate("docs")} style={{ background: "transparent", color: WHITE, fontSize: 14, fontWeight: 600, padding: "13px 28px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", fontFamily: "inherit" }}>
            See Document Services →
          </button>
        </div>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}
