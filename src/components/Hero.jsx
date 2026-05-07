import { useEffect, useState } from "react";
import { C, FONT_HEAD, FONT_BODY } from "../tokens";
import { YEARS_EXPERIENCE } from "../config";

export default function Hero() {
  const [nums, setNums] = useState({ a: 0, b: 0, c: 0 });
  useEffect(() => {
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      setNums({
        a: Math.min(Math.floor(frame * (YEARS_EXPERIENCE / 30)), YEARS_EXPERIENCE),
        b: Math.min(frame * 100, 3000),
        c: Math.min(frame * 35, 1000),
      });
      if (frame >= 30) clearInterval(id);
    }, 60);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "100px 24px 60px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>

        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${C.purple}18`, border: `1px solid ${C.purple}40`, borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, boxShadow: `0 0 8px ${C.green}`, animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: 11, color: C.purpleLight, fontWeight: 700, letterSpacing: 1, fontFamily: FONT_BODY }}>PUNE, INDIA · SERVING MSMES NATIONWIDE</span>
        </div>

        <h1 style={{ fontFamily: FONT_HEAD, fontSize: "clamp(30px, 5.5vw, 60px)", fontWeight: 700, color: C.white, lineHeight: 1.12, margin: "0 0 20px", letterSpacing: -1 }}>
          Your Business Deserves
          <br />
          <span style={{ background: `linear-gradient(135deg,${C.gold},${C.purpleLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Smarter Capital
          </span>
          {" "}& Sharper Data
        </h1>

        <p style={{ fontFamily: FONT_BODY, fontSize: 17, color: C.muted, maxWidth: 640, margin: "0 auto 40px", lineHeight: 1.7 }}>
          We help Indian MSMEs get loans sanctioned faster — and use their data to grow smarter. Built on our team's {YEARS_EXPERIENCE}+ years inside Indian banking credit teams.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 56 }}>
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{ background: `linear-gradient(135deg,${C.gold}E0,${C.gold}A0)`, border: "none", borderRadius: 10, padding: "14px 28px", color: "#0A0600", fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: FONT_BODY, boxShadow: `0 8px 32px ${C.gold}40` }}>
            🏦 Book Free Loan Assessment
          </button>
          <button onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            style={{ background: "transparent", border: `1px solid ${C.purpleLight}80`, borderRadius: 10, padding: "14px 28px", color: C.purpleLight, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: FONT_BODY }}>
            📊 Explore Our Services
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: C.border, borderRadius: 12, overflow: "hidden", border: `1px solid ${C.border}` }}>
          {[
            [`${nums.a}+`, "Years in Banking Credit"],
            [`₹${nums.b}Cr+`, "Loan Portfolio Experience"],
            [`${nums.c}+`, "Business Accounts Analysed"],
            ["50+", "Projects Delivered"],
          ].map(([v, l]) => (
            <div key={l} style={{ background: C.bgCard, padding: "20px 10px", textAlign: "center" }}>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 26, fontWeight: 700, color: C.white, marginBottom: 4 }}>{v}</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 10, color: C.muted, lineHeight: 1.3 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
