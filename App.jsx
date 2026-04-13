import { useState, useEffect } from "react";

// ─── DESIGN TOKENS ───
const C = {
  bg: "#060B14", bgMid: "#0A1020", bgCard: "#0D1528",
  border: "#1A2540", purple: "#6C3FC5", purpleLight: "#9B6FE8",
  gold: "#E8A020", green: "#00C98B", white: "#F0F4FF",
  muted: "#6B7FA3", dimmed: "#2A3655",
};

// ─── REPLACE THESE BEFORE DEPLOYING ───
const WHATSAPP_NUMBER = "919579453635";
const EMAIL = "shweta@finsightone.co";
const CALENDLY_LINK = "https://calendly.com/finsightone"; // Update this once Calendly is set up

const SERVICES = [
  {
    id: "credit", icon: "🏦", tag: "FinSight Credit",
    title: "MSME Loan Advisory",
    desc: "We've sat on the other side of the credit desk — evaluating loans, reading between the financials, knowing exactly what gets approved and what doesn't. That knowledge now works for you.",
    points: ["Working capital & term loan structuring", "Credit profile building & banker preparation", "Agri / KCC / NABARD scheme advisory", "Loan rejection reversal — diagnosed & fixed"],
    fee: "Success-fee model. You pay only when sanctioned.",
    cta: "Book Free Credit Assessment", color: C.gold, target: "₹50L – ₹200Cr businesses",
  },
  {
    id: "analytics", icon: "📊", tag: "FinSight Analytics",
    title: "Business Data Intelligence",
    desc: "Raw data sits in every business — in spreadsheets, in bank statements, in sales registers. We turn it into dashboards, models, and insights that drive actual decisions.",
    points: ["MIS dashboards & management reporting", "Farmer & distributor analytics platforms", "Credit scoring & portfolio analytics for NBFCs", "Financial models, projections & valuations"],
    fee: "Project-based. Delivered in days, not months.",
    cta: "Discuss Your Project", color: C.purpleLight, target: "₹10Cr+ companies",
  },
  {
    id: "freelance", icon: "🌐", tag: "FinSight Freelance",
    title: "Global Analytics Delivery",
    desc: "Finance professionals and businesses worldwide need Excel, Power BI, SQL and Python work done right — by someone who understands the numbers, not just the tools.",
    points: ["Excel dashboards, models & automation", "Power BI & Google Looker Studio reports", "Financial analysis & credit appraisal reports", "Python data analysis & SQL reporting"],
    fee: "Fixed-price packages. Delivered in 24–72 hours.",
    cta: "View on Upwork / Fiverr", color: C.green, target: "Global clients",
  },
  {
    id: "digital", icon: "💡", tag: "FinSight Digital",
    title: "Financial Templates & Tools",
    desc: "Professional credit frameworks, financial models, loan readiness checklists and analytics templates — built by a banker, usable by anyone.",
    points: ["Credit appraisal template packs", "MSME financial model bundles", "Loan readiness assessment tools", "Agri finance project report formats"],
    fee: "One-time purchase. Instant download.",
    cta: "Browse Templates", color: "#8B7CF6", target: "MSMEs, CAs, Consultants",
  },
];

const HOW = [
  { step: "01", icon: "📞", title: "Free Assessment Call", desc: "20 minutes. We review your situation honestly. You get a clear picture of what's possible and what it costs — before committing to anything." },
  { step: "02", icon: "⚙️", title: "We Build Your Case", desc: "For loans: a banker-ready credit profile. For analytics: a delivery plan with templates and timeline. Everything prepared before you approach anyone." },
  { step: "03", icon: "✅", title: "You Get Results", desc: "Loan sanctioned — we collect our fee. Project delivered — you review and pay. No hidden charges. No retainer before results." },
];

const TRUST = [
  "Former Regional Credit & Risk Analyst — evaluated hundreds of credit files",
  "Deep agri-finance expertise — KCC, NABARD, Agri-input lending",
  "Hands-on ML analytics — deployed on real portfolios of 1,000+ accounts",
  "Based in Pune — serving MSMEs across Maharashtra and India",
  "Success-fee model on loan advisory — we earn when you succeed",
];

const OUTCOMES = [
  { metric: "1,000+", label: "Farmer accounts scored with ML" },
  { metric: "₹3,000Cr+", label: "Client company turnover" },
  { metric: "Real-time", label: "Field manager dashboard delivered" },
  { metric: "30%", label: "Portfolio quality improvement" },
];

// ─── GRID BACKGROUND ───
function GridBG() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(${C.border}40 1px, transparent 1px), linear-gradient(90deg, ${C.border}40 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
      }} />
      <div style={{ position: "absolute", top: 0, left: "15%", width: "70%", height: "500px", background: `radial-gradient(ellipse, ${C.purple}18 0%, transparent 70%)`, filter: "blur(50px)" }} />
      <div style={{ position: "absolute", top: "40%", right: "-5%", width: "350px", height: "350px", background: `radial-gradient(ellipse, ${C.gold}08 0%, transparent 70%)`, filter: "blur(60px)" }} />
    </div>
  );
}

// ─── NAV ───
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? `${C.bg}F0` : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "none",
      transition: "all 0.3s", padding: "0 24px",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg,${C.purple},${C.purpleLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, color: "white", boxShadow: `0 0 20px ${C.purple}60` }}>F1</div>
          <div>
            <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 17, fontWeight: 700, color: C.white, letterSpacing: -0.5 }}>
              FinSight <span style={{ color: C.purpleLight }}>One</span>
            </div>
            <div style={{ fontSize: 9, color: C.muted, letterSpacing: 1.5, textTransform: "uppercase", marginTop: -2 }}>Analytics · Credit · Advisory</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {[["Services", "services"], ["Case Study", "case"], ["Process", "process"]].map(([l, id]) => (
            <button key={id} onClick={() => scrollTo(id)}
              style={{ background: "none", border: "none", color: C.muted, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>{l}</button>
          ))}
        </div>

        <button onClick={() => scrollTo("contact")}
          style={{ background: `linear-gradient(135deg,${C.purple},${C.purpleLight})`, border: "none", borderRadius: 8, padding: "9px 20px", color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", boxShadow: `0 4px 20px ${C.purple}50`, whiteSpace: "nowrap" }}>
          Free Assessment
        </button>
      </div>
    </nav>
  );
}

// ─── HERO ───
function Hero() {
  const [nums, setNums] = useState({ a: 0, b: 0, c: 0 });
  useEffect(() => {
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      setNums({ a: Math.min(Math.floor(frame * 0.27), 8), b: Math.min(frame * 3, 200), c: Math.min(frame * 2, 50) });
      if (frame >= 30) clearInterval(id);
    }, 60);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "100px 24px 60px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>

        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${C.purple}18`, border: `1px solid ${C.purple}40`, borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, boxShadow: `0 0 8px ${C.green}`, animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: 11, color: C.purpleLight, fontWeight: 700, letterSpacing: 1, fontFamily: "'DM Sans', sans-serif" }}>PUNE, INDIA · SERVING MSMES NATIONWIDE</span>
        </div>

        <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(30px, 5.5vw, 60px)", fontWeight: 700, color: C.white, lineHeight: 1.12, margin: "0 0 20px", letterSpacing: -1 }}>
          Your Business Deserves
          <br />
          <span style={{ background: `linear-gradient(135deg,${C.gold},${C.purpleLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Smarter Capital
          </span>
          {" "}& Sharper Data
        </h1>

        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: C.muted, maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.7 }}>
          We help Indian MSMEs get loans sanctioned faster — and use their data to grow smarter. Built on 8+ years inside Indian banking credit teams.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 56 }}>
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{ background: `linear-gradient(135deg,${C.gold}E0,${C.gold}A0)`, border: "none", borderRadius: 10, padding: "14px 28px", color: "#0A0600", fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", boxShadow: `0 8px 32px ${C.gold}40` }}>
            🏦 Book Free Loan Assessment
          </button>
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{ background: "transparent", border: `1px solid ${C.purple}80`, borderRadius: 10, padding: "14px 28px", color: C.purpleLight, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
            📊 Discuss Analytics Project
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: C.border, borderRadius: 12, overflow: "hidden", border: `1px solid ${C.border}` }}>
          {[[`${nums.a}+`, "Years in Banking Credit"], [`₹${nums.b}Cr+`, "Loan Portfolio Experience"], [`${nums.c}+`, "Projects Delivered"], ["1000+", "Farmer Accounts Analysed"]].map(([v, l]) => (
            <div key={l} style={{ background: C.bgCard, padding: "20px 10px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 26, fontWeight: 700, color: C.white, marginBottom: 4 }}>{v}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: C.muted, lineHeight: 1.3 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES ───
function Services() {
  const [hov, setHov] = useState(null);
  return (
    <section id="services" style={{ padding: "80px 24px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.purple, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>What We Do</div>
          <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(26px, 4vw, 40px)", color: C.white, margin: 0 }}>Four Ways We Create Value</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
          {SERVICES.map((svc, i) => (
            <div key={svc.id} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{ background: C.bgCard, border: `1px solid ${hov === i ? svc.color + "60" : C.border}`, borderRadius: 16, padding: 24, transition: "all 0.3s", transform: hov === i ? "translateY(-4px)" : "none", boxShadow: hov === i ? `0 20px 60px ${svc.color}15` : "none", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: hov === i ? `linear-gradient(90deg,transparent,${svc.color}80,transparent)` : "transparent", transition: "all 0.3s" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 28 }}>{svc.icon}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 800, color: svc.color, letterSpacing: 1.5, textTransform: "uppercase" }}>{svc.tag}</span>
              </div>
              <h3 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 20, color: C.white, margin: "0 0 10px" }}>{svc.title}</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, lineHeight: 1.7, margin: "0 0 16px" }}>{svc.desc}</p>
              {svc.points.map((pt, j) => (
                <div key={j} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: svc.color, flexShrink: 0, marginTop: 6 }} />
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#94A3B8", lineHeight: 1.5 }}>{pt}</div>
                </div>
              ))}
              <div style={{ marginTop: 16, padding: "8px 12px", background: `${svc.color}12`, border: `1px solid ${svc.color}25`, borderRadius: 8 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: svc.color, fontWeight: 700 }}>{svc.fee}</div>
              </div>
              <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: C.dimmed }}>For: {svc.target}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: svc.color, fontWeight: 700, cursor: "pointer" }} onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>{svc.cta} →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CASE STUDY ───
function CaseStudy() {
  return (
    <section id="case" style={{ padding: "80px 24px", position: "relative", zIndex: 1, background: `linear-gradient(180deg,transparent,${C.bgMid}60,transparent)` }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.green, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Case Study</div>
          <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(22px, 4vw, 36px)", color: C.white, margin: 0, lineHeight: 1.2 }}>ML Analytics Platform for a ₹3,000Cr Agri Company</h2>
        </div>
        <div style={{ background: C.bgCard, border: `1px solid ${C.green}30`, borderRadius: 20, overflow: "hidden" }}>
          <div style={{ background: `linear-gradient(135deg,${C.green}15,${C.purple}15)`, borderBottom: `1px solid ${C.border}`, padding: "18px 28px", display: "flex", gap: 24, flexWrap: "wrap" }}>
            {[["Client", "Leading Agri-Input Company"], ["Scale", "₹3,000Cr+ Annual Turnover"], ["Sector", "Agri Inputs & Crop Nutrition"]].map(([k, v]) => (
              <div key={k}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: C.muted, marginBottom: 2 }}>{k}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.white, fontWeight: 700 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: 28 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#ef4444", fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>The Problem</div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.8, margin: 0 }}>Field teams making credit decisions for 1,000+ farmer accounts on gut feel. No repayment risk data. No early warning system. No visibility on cross-sell opportunity.</p>
              </div>
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: C.green, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Our Solution</div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.8, margin: 0 }}>Full Farmer Analytics Platform with ML-based credit scoring. Integrated field sales data, repayment history, and crop patterns into a real-time dashboard for branch managers.</p>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 18 }}>
              {OUTCOMES.map((o) => (
                <div key={o.metric} style={{ background: `${C.green}10`, border: `1px solid ${C.green}25`, borderRadius: 12, padding: "14px 8px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 20, color: C.green, marginBottom: 4 }}>{o.metric}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: C.muted, lineHeight: 1.3 }}>{o.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: C.muted }}>Built with:</span>
              {["Python (Pandas, Scikit-learn)", "SQLite", "Power BI", "GradientBoosting ML"].map(t => (
                <div key={t} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, background: C.dimmed, color: "#94A3B8", padding: "3px 10px", borderRadius: 20 }}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PROCESS ───
function Process() {
  return (
    <section id="process" style={{ padding: "80px 24px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.purple, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>How We Work</div>
          <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(24px, 4vw, 38px)", color: C.white, margin: 0 }}>Simple. Transparent. Results First.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {HOW.map((s) => (
            <div key={s.step} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24, textAlign: "center" }}>
              <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 11, color: C.purple, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>{s.step}</div>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{s.icon}</div>
              <h3 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 17, color: C.white, margin: "0 0 10px" }}>{s.title}</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WHY US ───
function WhyUs() {
  return (
    <section style={{ padding: "60px 24px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ background: `linear-gradient(135deg,${C.bgCard},${C.bgMid})`, border: `1px solid ${C.border}`, borderRadius: 20, padding: "48px 36px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.gold, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Why FinSight One</div>
            <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(20px, 3vw, 30px)", color: C.white, margin: "0 0 16px", lineHeight: 1.2 }}>We've been inside the machine. We know what works.</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.8, margin: 0 }}>Most consultants read about banking. We worked inside it — evaluating credit files, building risk frameworks, making loan decisions. That inside knowledge now works for your side of the table.</p>
          </div>
          <div>
            {TRUST.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: `${C.gold}20`, border: `1px solid ${C.gold}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.gold }} />
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#94A3B8", lineHeight: 1.6 }}>{item}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ───
function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", business: "", message: "" });
  const [tab, setTab] = useState("loan");
  const [sent, setSent] = useState(false);

  const submit = () => {
    if (!form.name || !form.phone) return;
    const msg = `Hi FinSight One!%0A%0AService: ${tab === "loan" ? "Loan Advisory" : "Analytics Project"}%0AName: ${form.name}%0APhone: ${form.phone}%0ABusiness: ${form.business}%0AMessage: ${form.message}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setSent(true);
  };

  return (
    <section id="contact" style={{ padding: "80px 24px 40px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.purple, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Get Started</div>
          <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(22px, 4vw, 36px)", color: C.white, margin: "0 0 12px" }}>Book Your Free 20-Minute Consultation</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.muted, margin: 0 }}>No commitment. Honest assessment. We'll tell you exactly what's possible.</p>
        </div>

        {!sent ? (
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 20, padding: "32px 28px" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              {[["loan", "🏦 Loan Advisory", C.gold], ["analytics", "📊 Analytics", C.purpleLight]].map(([id, label, col]) => (
                <button key={id} onClick={() => setTab(id)}
                  style={{ flex: 1, padding: "10px", borderRadius: 10, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", border: `1px solid ${tab === id ? col : C.border}`, background: tab === id ? `${col}15` : "transparent", color: tab === id ? col : C.muted, fontSize: 13, fontWeight: 700, transition: "all 0.2s" }}>
                  {label}
                </button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              {[["Your Name *", "name"], ["WhatsApp Number *", "phone"]].map(([label, field]) => (
                <div key={field}>
                  <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted, display: "block", marginBottom: 6 }}>{label}</label>
                  <input value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                    style={{ width: "100%", background: C.bgMid, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", color: C.white, fontSize: 13, fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box" }} />
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted, display: "block", marginBottom: 6 }}>
                {tab === "loan" ? "Business name & approximate turnover" : "Company & project description"}
              </label>
              <input value={form.business} onChange={e => setForm(f => ({ ...f, business: e.target.value }))}
                placeholder={tab === "loan" ? "e.g. Sharma Traders, ₹2Cr turnover" : "e.g. NBFC needing portfolio dashboard"}
                style={{ width: "100%", background: C.bgMid, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", color: C.white, fontSize: 13, fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box" }} />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted, display: "block", marginBottom: 6 }}>
                {tab === "loan" ? "Loan requirement & current banking situation" : "What would you like built?"}
              </label>
              <textarea rows={3} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder={tab === "loan" ? "e.g. Need ₹50L working capital. Applied once and was rejected..." : "e.g. Sales dashboard for 3 branches in Power BI, connected to our ERP..."}
                style={{ width: "100%", background: C.bgMid, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", color: C.white, fontSize: 13, fontFamily: "'DM Sans', sans-serif", resize: "none", boxSizing: "border-box" }} />
            </div>

            <button onClick={submit}
              style={{ width: "100%", padding: 14, background: tab === "loan" ? `linear-gradient(135deg,${C.gold},${C.gold}90)` : `linear-gradient(135deg,${C.purple},${C.purpleLight})`, border: "none", borderRadius: 10, color: tab === "loan" ? "#0A0600" : "white", fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", boxShadow: tab === "loan" ? `0 8px 30px ${C.gold}40` : `0 8px 30px ${C.purple}40` }}>
              {tab === "loan" ? "📲 Send via WhatsApp & Book Call" : "📧 Send Project Brief via WhatsApp"}
            </button>

            <div style={{ textAlign: "center", marginTop: 16, fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted }}>
              Or email us directly: <a href={`mailto:${EMAIL}`} style={{ color: C.purpleLight }}>{EMAIL}</a>
              &nbsp;·&nbsp;
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" style={{ color: C.green }}>Book via Calendly</a>
            </div>
          </div>
        ) : (
          <div style={{ background: C.bgCard, border: `1px solid ${C.green}40`, borderRadius: 20, padding: "48px 28px", textAlign: "center" }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
            <h3 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 24, color: C.white, margin: "0 0 10px" }}>Message Sent!</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: C.muted, fontSize: 14 }}>We'll respond within 2 hours. Check your WhatsApp for confirmation.</p>
            <button onClick={() => setSent(false)} style={{ marginTop: 20, background: "transparent", border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 20px", color: C.muted, fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Send Another Enquiry →</button>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── FOOTER ───
function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.border}`, padding: "28px 24px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: `linear-gradient(135deg,${C.purple},${C.purpleLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: "white" }}>F1</div>
          <div>
            <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 14, color: C.white }}>FinSight <span style={{ color: C.purpleLight }}>One</span></div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: C.muted }}>Shweta Sachin Jadhav · Proprietor · Pune, India</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {[["Services", "#services"], ["Case Study", "#case"], ["Process", "#process"], ["Contact", "#contact"]].map(([l, h]) => (
            <a key={l} href={h} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted }}>{l}</a>
          ))}
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: C.dimmed }}>© 2026 FinSight One. All rights reserved.</div>
      </div>
    </footer>
  );
}

// ─── FLOATING WHATSAPP ───
function WAButton() {
  return (
    <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20FinSight%20One%2C%20I%27d%20like%20a%20free%20consultation`}
      target="_blank" rel="noopener noreferrer"
      style={{ position: "fixed", bottom: 24, right: 24, zIndex: 200, width: 54, height: 54, borderRadius: "50%", background: "linear-gradient(135deg,#25D366,#128C7E)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 30px #25D36660", textDecoration: "none", fontSize: 26 }}>
      💬
    </a>
  );
}

// ─── APP ───
export default function App() {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", overflowX: "hidden" }}>
      <GridBG />
      <Nav />
      <Hero />
      <Services />
      <CaseStudy />
      <Process />
      <WhyUs />
      <Contact />
      <Footer />
      <WAButton />
    </div>
  );
}
