import { useEffect, useRef } from "react";
import Footer from "../components/Footer";
import { SERVICES, STEPS, TESTIMONIALS } from "../data";

const INDIGO = "#4F46E5";
const ORANGE = "#EA580C";
const DARK   = "#111827";
const GRAY   = "#F9FAFB";
const WHITE  = "#fff";
const MUTED  = "#6B7280";

// ── SERVICE ILLUSTRATIONS ──────────────────────────────────────────────────
const ILLUSTRATIONS = [
  // Step 1 — Eligibility Score Gauge
  <svg key="s1" width="100%" height="120" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="80" r="60" fill="none" stroke="#1E293B" strokeWidth="12"/>
    <circle cx="100" cy="80" r="60" fill="none" stroke={INDIGO} strokeWidth="12"
      strokeDasharray="220 157" strokeLinecap="round"
      transform="rotate(-198 100 80)"/>
    <text x="100" y="72" textAnchor="middle" fontSize="28" fontWeight="700" fill={WHITE} fontFamily="Arial">74</text>
    <text x="100" y="88" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.4)" fontFamily="Arial">/100 ELIGIBLE</text>
    <rect x="30" y="108" width="30" height="5" rx="2.5" fill="#059669" opacity="0.8"/>
    <rect x="68" y="108" width="30" height="5" rx="2.5" fill={INDIGO} opacity="0.8"/>
    <rect x="106" y="108" width="30" height="5" rx="2.5" fill={ORANGE} opacity="0.6"/>
    <rect x="144" y="108" width="30" height="5" rx="2.5" fill="#374151" opacity="0.5"/>
  </svg>,
  // Step 2 — Document stack
  <svg key="s2" width="100%" height="120" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
    <rect x="54" y="18" width="86" height="100" rx="5" fill="#1E3A5F" stroke="#374151" strokeWidth="1"/>
    <rect x="46" y="12" width="86" height="100" rx="5" fill="#162032" stroke="#374151" strokeWidth="1"/>
    <rect x="38" y="6" width="86" height="100" rx="5" fill="#0F172A" stroke={INDIGO} strokeWidth="1.5"/>
    <rect x="54" y="22" width="54" height="5" rx="2" fill={INDIGO} opacity="0.9"/>
    <rect x="54" y="33" width="46" height="3" rx="1.5" fill="rgba(255,255,255,0.2)"/>
    <rect x="54" y="41" width="50" height="3" rx="1.5" fill="rgba(255,255,255,0.2)"/>
    <rect x="54" y="49" width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.2)"/>
    <rect x="54" y="62" width="54" height="5" rx="2" fill={ORANGE} opacity="0.9"/>
    <rect x="54" y="73" width="46" height="3" rx="1.5" fill="rgba(255,255,255,0.2)"/>
    <rect x="54" y="81" width="38" height="3" rx="1.5" fill="rgba(255,255,255,0.2)"/>
    <circle cx="143" cy="95" r="18" fill="#059669"/>
    <text x="143" y="101" textAnchor="middle" fontSize="18" fill={WHITE} fontFamily="Arial">✓</text>
  </svg>,
  // Step 3 — Monthly monitoring chart
  <svg key="s3" width="100%" height="120" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
    <rect x="16" y="76" width="22" height="38" rx="3" fill={INDIGO} opacity="0.6"/>
    <rect x="46" y="58" width="22" height="56" rx="3" fill={INDIGO} opacity="0.75"/>
    <rect x="76" y="44" width="22" height="70" rx="3" fill={INDIGO} opacity="0.9"/>
    <rect x="106" y="30" width="22" height="84" rx="3" fill={ORANGE}/>
    <rect x="136" y="16" width="22" height="98" rx="3" fill="#059669"/>
    <line x1="10" y1="114" x2="190" y2="114" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
    <polyline points="27,74 57,56 87,42 117,28 147,14"
      fill="none" stroke={ORANGE} strokeWidth="2" strokeDasharray="5 3"/>
    {[{cx:27,cy:74},{cx:57,cy:56},{cx:87,cy:42},{cx:117,cy:28},{cx:147,cy:14}].map((p,i)=>(
      <circle key={i} cx={p.cx} cy={p.cy} r="3.5" fill={ORANGE}/>
    ))}
    <rect x="10" y="4" width="80" height="16" rx="4" fill="#1E293B"/>
    <text x="50" y="15" textAnchor="middle" fontSize="8" fill="#059669" fontFamily="Arial" fontWeight="700">Score ↑ 72 → 84 this month</text>
  </svg>,
  // Step 4 — Expert advisor
  <svg key="s4" width="100%" height="120" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
    <circle cx="80" cy="42" r="26" fill="#1E293B" stroke={INDIGO} strokeWidth="2"/>
    <circle cx="80" cy="36" r="12" fill={INDIGO} opacity="0.8"/>
    <path d="M54,68 Q80,56 106,68 L112,110 Q80,118 48,110 Z" fill="#1E293B" stroke={INDIGO} strokeWidth="1.5"/>
    <rect x="62" y="80" width="36" height="4" rx="2" fill="rgba(255,255,255,0.25)"/>
    <rect x="66" y="90" width="28" height="3" rx="1.5" fill="rgba(255,255,255,0.15)"/>
    <circle cx="148" cy="52" r="24" fill={ORANGE} opacity="0.95"/>
    <text x="148" y="48" textAnchor="middle" fontSize="14" fontWeight="700" fill={WHITE} fontFamily="Arial">20</text>
    <text x="148" y="62" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.8)" fontFamily="Arial">years</text>
    <rect x="114" y="84" width="44" height="20" rx="5" fill="#059669" opacity="0.9"/>
    <text x="136" y="97" textAnchor="middle" fontSize="8" fontWeight="700" fill={WHITE} fontFamily="Arial">EXPERT TEAM</text>
  </svg>,
];

const SVCS = [
  { step:"Step 01 · Free",         title:"Free Eligibility Check",     desc:"Know your approval chances in 2 minutes. No documents needed." },
  { step:"Step 02 · From ₹1,499",  title:"Loan File Preparation",      desc:"Loan Appraisal Note, financial analysis statements and project reports — bank-ready in 72 hours." },
  { step:"Step 03 · From ₹499/mo", title:"Monthly Finance Monitoring",  desc:"Business health reports, loan readiness score and alerts every month." },
  { step:"Step 04 · Expert Help",  title:"Expert Loan Advisory",        desc:"20 years of banking expertise working directly on your loan case." },
];

// ── 4 WHATSAPP CONVERSATIONS ───────────────────────────────────────────────
const WA_CONVOS = [
  { label:"LAP · Business Owner",
    msgs:[
      {s:'r',t:'Hi! What kind of loan are you looking for?'},
      {s:'s',t:'LAP loan — ₹80 lakhs'},
      {s:'r',t:'Are you salaried, self-employed, or a business owner?'},
      {s:'s',t:'Business owner'},
      {s:'r',t:'Your annual business turnover?'},
      {s:'s',t:'Around ₹2 Crore'},
      {s:'r',t:'And your annual personal income?'},
      {s:'s',t:'Around ₹18 lakhs'},
      {s:'r',t:'Is the property residential or commercial — and is it in metro, municipal, or gram panchayat limits?'},
      {s:'s',t:'Residential — municipal limits, Pune'},
      {s:'r',t:'Approximate market value?'},
      {s:'s',t:'Around ₹1.5 Crore'},
      {s:'r',t:'Good starting profile. Your property value supports the amount. For a complete picture — takes 2 mins:\nfinsightone.co/check\nI will review and revert in 2 hours.'},
    ]},
  { label:"Equipment Loan · Self-Employed Doctor",
    msgs:[
      {s:'r',t:'Hi! What kind of loan are you looking for?'},
      {s:'s',t:'Equipment loan for my clinic — ₹35 lakhs'},
      {s:'r',t:'Are you salaried, self-employed, or a business owner?'},
      {s:'s',t:'Self-employed — I am a doctor'},
      {s:'r',t:'Your approximate monthly income?'},
      {s:'s',t:'Around ₹3.5 lakhs per month'},
      {s:'r',t:'Do you have an existing clinic loan or any current EMIs?'},
      {s:'s',t:'No existing loans'},
      {s:'r',t:'Interesting — ₹35L for medical equipment may work better as two products: an equipment loan plus an unsecured business loan. Lower blended rate. Let me assess fully:\nfinsightone.co/check'},
    ]},
  { label:"Working Capital · MSME Owner",
    msgs:[
      {s:'r',t:'Hi! What kind of loan are you looking for?'},
      {s:'s',t:'Working capital — around ₹75 lakhs'},
      {s:'r',t:'Are you salaried, self-employed, or a business owner?'},
      {s:'s',t:'Business owner — auto parts manufacturer'},
      {s:'r',t:'Your annual business turnover?'},
      {s:'s',t:'Around ₹4.5 Crore this year'},
      {s:'r',t:'And annual personal income or drawings?'},
      {s:'s',t:'Around ₹24 lakhs'},
      {s:'r',t:'Based on your turnover you may actually qualify for more than ₹75L — typically 20-25% of annual turnover. Full assessment:\nfinsightone.co/check'},
    ]},
  { label:"Unsecured Loan · MSME Pharma",
    msgs:[
      {s:'r',t:'Hi! What kind of loan are you looking for?'},
      {s:'s',t:'Unsecured business loan — ₹25 lakhs, need it fast'},
      {s:'r',t:'Are you salaried, self-employed, or a business owner?'},
      {s:'s',t:'Business owner — pharma distributor'},
      {s:'r',t:'Annual business turnover?'},
      {s:'s',t:'₹1.8 Crore last year'},
      {s:'r',t:'And your annual personal income?'},
      {s:'s',t:'Around ₹14 lakhs'},
      {s:'r',t:'₹25L unsecured is achievable. But with your vintage and turnover a secured option may give you a better rate and higher limit. Worth comparing both:\nfinsightone.co/check'},
    ]},
];

// ── HERO CARD COMPONENT ────────────────────────────────────────────────────
function HeroCard({ navigate }) {
  const svcIdx = useRef(0);
  const convIdx = useRef(0);
  const msgIdx = useRef(0);
  const timers = useRef([]);

  function clearAll() { timers.current.forEach(clearTimeout); timers.current = []; }

  useEffect(() => {
    // Service cycle
    const svcInterval = setInterval(() => {
      svcIdx.current = (svcIdx.current + 1) % 4;
      updateSvc(svcIdx.current);
    }, 6000);

    // Start first conversation
    setTimeout(() => runConv(0), 500);

    return () => { clearInterval(svcInterval); clearAll(); };
  }, []);

  function updateSvc(i) {
    const el = document.getElementById('svc-title-h');
    const step = document.getElementById('svc-step-h');
    const desc = document.getElementById('svc-desc-h');
    const imgWrap = document.getElementById('svc-img-h');
    if (!el) return;
    el.style.opacity = 0;
    setTimeout(() => {
      if (step) step.textContent = SVCS[i].step;
      if (el) { el.textContent = SVCS[i].title; el.style.opacity = 1; }
      if (desc) desc.textContent = SVCS[i].desc;
      // Update dots
      for (let j = 0; j < 4; j++) {
        const d = document.getElementById('sdot-' + j);
        if (d) { d.style.width = j === i ? '16px' : '6px'; d.style.background = j === i ? ORANGE : 'rgba(255,255,255,0.18)'; }
      }
    }, 200);
  }

  function runConv(cIdx) {
    clearAll();
    convIdx.current = cIdx;
    msgIdx.current = 0;
    const container = document.getElementById('wa-msgs-h');
    const label = document.getElementById('wa-label-h');
    if (!container) return;
    container.innerHTML = '';
    if (label) label.textContent = WA_CONVOS[cIdx].label;
    const msgs = WA_CONVOS[cIdx].msgs;
    let delay = 800;
    msgs.forEach((m, i) => {
      const isLast = i === msgs.length - 1;
      if (isLast) {
        timers.current.push(setTimeout(() => {
          const typ = mkTyping();
          container.appendChild(typ);
          container.scrollTop = container.scrollHeight;
        }, delay));
        delay += 2000;
        timers.current.push(setTimeout(() => {
          const typ = container.querySelector('.wa-typ');
          if (typ) typ.remove();
          const el = mkMsg(m.s, m.t);
          container.appendChild(el);
          container.scrollTop = container.scrollHeight;
        }, delay));
      } else {
        timers.current.push(setTimeout(() => {
          const el = mkMsg(m.s, m.t);
          container.appendChild(el);
          container.scrollTop = container.scrollHeight;
        }, delay));
      }
      delay += 1200 + m.t.length * 28;
    });
    delay += 4000;
    timers.current.push(setTimeout(() => runConv((cIdx + 1) % 4), delay));
  }

  function mkMsg(side, text) {
    const wrap = document.createElement('div');
    wrap.style.cssText = `display:flex;justify-content:${side==='s'?'flex-end':'flex-start'};margin-bottom:5px;animation:waIn .3s ease forwards;opacity:0`;
    const bubble = document.createElement('div');
    const lines = text.split('\n');
    bubble.style.cssText = `background:${side==='s'?'#DCF8C6':'#fff'};color:#111;padding:5px 8px 4px;border-radius:${side==='s'?'7px 7px 2px 7px':'7px 7px 7px 2px'};font-size:10px;max-width:75%;line-height:1.55;font-family:Arial`;
    lines.forEach((ln, i) => {
      if (i > 0) bubble.appendChild(document.createElement('br'));
      const span = document.createElement('span');
      span.textContent = ln;
      if (ln.startsWith('finsightone')) { span.style.color = INDIGO; span.style.fontWeight = '700'; }
      bubble.appendChild(span);
    });
    const timeEl = document.createElement('div');
    timeEl.style.cssText = 'font-size:8px;color:rgba(0,0,0,0.38);text-align:right;margin-top:2px';
    timeEl.textContent = side === 's' ? '✓✓' : '';
    bubble.appendChild(timeEl);
    wrap.appendChild(bubble);
    return wrap;
  }

  function mkTyping() {
    const wrap = document.createElement('div');
    wrap.className = 'wa-typ';
    wrap.style.cssText = 'display:flex;margin-bottom:5px';
    wrap.innerHTML = `<div style="background:#fff;padding:7px 10px;border-radius:7px 7px 7px 2px;display:flex;gap:3px;align-items:center">
      <span style="width:5px;height:5px;border-radius:50%;background:#aaa;animation:waTyp 1.2s infinite;display:inline-block"></span>
      <span style="width:5px;height:5px;border-radius:50%;background:#aaa;animation:waTyp 1.2s .2s infinite;display:inline-block"></span>
      <span style="width:5px;height:5px;border-radius:50%;background:#aaa;animation:waTyp 1.2s .4s infinite;display:inline-block"></span>
    </div>`;
    return wrap;
  }

  return (
    <div id="hero-card-wrap" style={{ border: `1px solid #E5E7EB`, borderRadius: 14, overflow: 'hidden', height: 440, minHeight: 440, maxHeight: 440 }}>

      {/* WhatsApp demo — full width */}
      <div style={{ background: '#ECE5DD', display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* WA header */}
        <div style={{ background: '#075E54', padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#128C7E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: WHITE, flexShrink: 0 }}>F1</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: WHITE }}>FinsightOne Expert</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)' }}>online</div>
          </div>
          <div style={{ fontSize: 8, fontWeight: 700, background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)', padding: '2px 6px', borderRadius: 10 }}>DEMO</div>
        </div>
        {/* Case label */}
        <div id="wa-label-h" style={{ fontSize: 8, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', textAlign: 'center', padding: '4px 0', background: 'rgba(0,0,0,0.04)' }}>
          {WA_CONVOS[0].label}
        </div>
        {/* Messages */}
        <div id="wa-msgs-h" style={{ flex: 1, padding: '10px 12px', overflowY: 'hidden', display: 'flex', flexDirection: 'column' }} />
        {/* CTA */}
        <div style={{ padding: '6px 8px 8px', background: '#ECE5DD', flexShrink: 0 }}>
          <button onClick={() => window.open('https://wa.me/919579453635?text=Hi%20FinsightOne', '_blank')}
            style={{ width: '100%', background: '#25D366', color: WHITE, border: 'none', borderRadius: 6, padding: 8, fontSize: 10, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            💬 Start on WhatsApp — Free
          </button>
        </div>
      </div>

      <style>{`
        @keyframes waIn { from{opacity:0;transform:translateY(3px)} to{opacity:1;transform:translateY(0)} }
        @keyframes waTyp { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-4px)} }
      `}</style>
    </div>
  );
}

export default function Home({ navigate }) {
  return (
    <div style={{ fontFamily: "Arial, Helvetica Neue, sans-serif" }}>
      <style>{`
        @media(max-width:768px){
          #hero-grid { grid-template-columns: 1fr !important; }
          #hero-card-wrap { display: none !important; }
          #services-grid { grid-template-columns: 1fr !important; }
          .svc-item-name { font-size: 12px !important; }
          .svc-item-price { font-size: 11px !important; }
          .svc-sample-btn { font-size: 10px !important; padding: 2px 7px !important; }
          .hero-pill { font-size: 11px !important; padding: 5px 11px !important; }
          .hero-cta-btn { width: 100% !important; text-align: center !important; justify-content: center !important; }
          .hero-ctas { flex-direction: column !important; }
          .svc-card-head { padding: 16px 14px 12px !important; }
          .svc-card-body { padding: 8px 14px 4px !important; }
          .svc-card-foot { padding: 10px 14px 14px !important; }
        }
        @media(max-width:480px){
          #services-grid { gap: 12px !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <div style={{ background: WHITE, padding: "clamp(24px,4vw,56px) clamp(16px,4vw,48px)", overflow: "hidden" }}>
        <div id="hero-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 420px", gap: "clamp(28px,4vw,48px)", alignItems: "stretch" }}>

          {/* Left — copy */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {/* Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#EEF2FF", border: "1px solid #C7D2FE", color: INDIGO, fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 20, marginBottom: 18, alignSelf: 'flex-start' }}>
              <span style={{ width: 5, height: 5, background: ORANGE, borderRadius: "50%", display: "inline-block" }} />
              Credit · Advisory · Intelligence — For MSMEs, Individuals & CA Partners
            </div>
            {/* Headline */}
            <h1 style={{ fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 900, color: DARK, lineHeight: 1.1, marginBottom: 14, letterSpacing: "-0.03em" }}>
              <span style={{ color: INDIGO }}>Loan Approved.</span><br />
              Documents Prepared.<br />
              <span style={{ color: ORANGE }}>Finances Monitored.</span>
            </h1>
            {/* Sub-headline */}
            <p style={{ fontSize: "clamp(13px,1.4vw,15px)", color: MUTED, lineHeight: 1.7, marginBottom: 20, maxWidth: 520 }}>
              Loans approved. Documents prepared. Finances monitored — built on 20 years of banking expertise.
            </p>
            {/* Pills */}
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 20 }}>
              {[
                { label: "✓ Free Eligibility Check",     page: "check",    bg: "#EEF2FF", color: INDIGO },
                { label: "✓ Loan File Preparation",      page: "docs",     bg: "#FFF7ED", color: ORANGE },
                { label: "✓ Monthly Finance Monitoring", page: "analytics",bg: "#ECFDF5", color: "#059669" },
                { label: "✓ Expert Loan Advisory",       page: "advisory", bg: "#F5F3FF", color: "#7C3AED" },
              ].map(p => (
                <button key={p.label} onClick={() => navigate(p.page)} style={{ background: p.bg, color: p.color, fontSize: 12, fontWeight: 700, padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                  {p.label}
                </button>
              ))}
            </div>
            {/* CTAs */}
            <div className="hero-ctas" style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
              <button onClick={() => navigate("check")} className="hero-cta-btn" style={{ background: ORANGE, color: WHITE, fontSize: 14, fontWeight: 700, padding: "13px 24px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 12px rgba(234,88,12,0.25)" }}>
                Check If I Qualify — Free
              </button>
              <button onClick={() => navigate("whyus")} className="hero-cta-btn" style={{ background: WHITE, color: DARK, fontSize: 13, fontWeight: 600, padding: "13px 24px", borderRadius: 8, border: "1px solid #E5E7EB", cursor: "pointer", fontFamily: "inherit" }}>
                How It Works →
              </button>
            </div>
            {/* Stats */}
            <div style={{ display: "flex", gap: "clamp(16px,3vw,36px)", flexWrap: "wrap" }}>
              {[["₹0","To Check Eligibility"],["72 hrs","Document Delivery"],["20 yrs","Banking Expertise"],["PAN India","Coverage"]].map(([v,l]) => (
                <div key={l}>
                  <div style={{ fontSize: "clamp(18px,2vw,24px)", fontWeight: 900, color: ORANGE }}>{v}</div>
                  <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Hero Card */}
          <HeroCard navigate={navigate} />
        </div>
      </div>

      {/* ── PROBLEM STRIP ── */}
      <div style={{ background: "#EEF2FF", borderBottom: "1px solid #C7D2FE", padding: "11px clamp(16px,3vw,48px)", display: "flex", gap: "clamp(10px,2vw,24px)", justifyContent: "center", flexWrap: "wrap" }}>
        {["❌ Loan rejected?","📄 Wrong documents?","📉 Don't know why refused?","⏳ Waiting months?"].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: 600, color: INDIGO }}>{t}</div>
        ))}
      </div>

      {/* ── SERVICES ── */}
      <div style={{ padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)", background: WHITE }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", color: ORANGE, marginBottom: 10, textAlign: "center" }}>Our Services</div>
        <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 900, textAlign: "center", marginBottom: 10, color: DARK }}>One Platform for Every Loan Need</h2>
        <p style={{ fontSize: 14, color: MUTED, textAlign: "center", maxWidth: 560, margin: "0 auto 36px", lineHeight: 1.7 }}>Whether you are a business owner or an individual — we have a service that fits your stage and budget.</p>
        <div id="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16, maxWidth: 1200, margin: "0 auto" }}>
          {SERVICES.map(svc => (
            <div key={svc.id} style={{ borderRadius: 14, border: "1px solid #E5E7EB", background: WHITE, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div className="svc-card-head" style={{ padding: "18px 16px 14px", background: svc.headBg }}>
                <div style={{ fontSize: 26, marginBottom: 8 }}>{svc.icon}</div>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4, color: svc.numColor }}>{svc.num}</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: DARK, marginBottom: 5 }}>{svc.title}</div>
                <div style={{ fontSize: 11.5, color: MUTED, lineHeight: 1.5 }}>{svc.pitch}</div>
              </div>
              <div className="svc-card-body" style={{ padding: "10px 16px 4px", borderTop: "1px solid #F3F4F6", flex: 1 }}>
                {svc.items.map(it => (
                  <div key={it.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #F9FAFB" }}>
                    <span className="svc-item-name" style={{ fontSize: 12, color: "#374151", lineHeight: 1.3 }}>{it.name}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0, marginLeft: 6 }}>
                      <span className="svc-item-price" style={{ fontWeight: 700, fontSize: 11, color: svc.priceColor, whiteSpace: "nowrap" }}>{it.price}</span>
                      {it.sample && (<button onClick={() => window.open(it.sample,'_blank')} className="svc-sample-btn" style={{ fontSize: 10, color: svc.btnColor, background: svc.btnBg, border: `1px solid ${svc.btnBorder}`, borderRadius: 4, padding: "2px 6px", cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit" }}>Sample</button>)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="svc-card-foot" style={{ padding: "10px 16px 16px" }}>
                <button onClick={() => navigate(svc.page)} style={{ display: "block", width: "100%", padding: "10px 8px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", background: svc.btnBg, color: svc.btnColor, border: `1px solid ${svc.btnBorder}`, fontFamily: "inherit" }}>
                  {svc.btn}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── *