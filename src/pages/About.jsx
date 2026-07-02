import { useState } from "react";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { VALUES, CREDENTIALS } from "../data";

const ORANGE = "#EA580C";
const DARK   = "#111827";
const MUTED  = "#6B7280";
const WHITE  = "#fff";
const GRAY   = "#F9FAFB";
const GREEN  = "#059669";
const INDIGO = "#4F46E5";
const WA     = "919579453635";

const STORY_PARAS = [
  "FinsightOne was built from one observation: most Indians get rejected for loans not because they do not qualify — but because their application is not strong enough to survive a credit committee. We watched this happen from the inside. For 20 years, our team sat on the other side of the table — reviewing files, stress-testing projections, and making the calls that decided whether a business got funded or not.",
  "We declined files where the DSCR was below threshold because the projections were built incorrectly. We rejected proposals where security coverage was thin because nobody had structured the collateral properly. We turned down MSME term loans where the promoter contribution had not been established upfront. In most of these cases, the underlying business was sound — the file was not. A better-prepared submission would have changed the outcome.",
  "In 2025, we switched sides. FinsightOne combines 20 years of banking expertise with AI-powered analysis to give every borrower the same credit intelligence that was previously only available to those who knew someone inside a bank.",
];

const WHAT_WE_DONT = [
  { title: "We do not cold call", desc: "We never call you unsolicited. Every conversation starts when you reach out." },
  { title: "We do not spam lenders", desc: "We never submit your file to multiple lenders simultaneously. One right lender, first time." },
  { title: "We do not hide fees", desc: "Our fee is agreed upfront before we start. No surprises at disbursement." },
  { title: "We do not take commission from banks", desc: "For paid advisory, we earn from you — not from the lender. That keeps our incentive aligned with yours." },
];

const VALUE_ICONS = [
  <><circle cx="8.5" cy="8.5" r="5.5"/><path d="M13 13l4 4"/></>,
  <><path d="M2 8l8-5 8 5"/><rect x="4" y="8" width="12" height="8"/><path d="M8 16v-4h4v4"/></>,
  <><rect x="4" y="9" width="12" height="8" rx="1.5"/><path d="M6.5 9V6a3.5 3.5 0 0 1 7 0v3"/></>,
];
function ValueIcon({ i }) {
  return (
    <svg width="26" height="26" viewBox="0 0 20 20" fill="none" stroke={ORANGE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {VALUE_ICONS[i]}
    </svg>
  );
}
function NoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke={ORANGE} strokeWidth="1.8" strokeLinecap="round">
      <circle cx="10" cy="10" r="7.5"/><path d="M5.5 14.5l9-9"/>
    </svg>
  );
}

export default function About({ navigate }) {
  return (
    <div style={{ fontFamily:"Arial,sans-serif", color:DARK }}>

      <style>{`
        @keyframes orbDriftA { 0%,100%{transform:translate(0,0)} 50%{transform:translate(26px,20px)} }
        @keyframes orbDriftB { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-22px,-14px)} }
      `}</style>

      {/* HERO */}
      <div style={{ background:"linear-gradient(135deg,#0F172A 0%,#1E1B4B 100%)", color:WHITE, padding:"clamp(56px,8vw,88px) clamp(20px,4vw,48px)", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", width:260, height:260, borderRadius:"50%", background:INDIGO, filter:"blur(80px)", opacity:0.28, top:-80, left:-60, pointerEvents:"none", animation:"orbDriftA 11s ease-in-out infinite" }} />
        <div style={{ position:"absolute", width:200, height:200, borderRadius:"50%", background:ORANGE, filter:"blur(80px)", opacity:0.2, bottom:-50, right:20, pointerEvents:"none", animation:"orbDriftB 13s ease-in-out infinite" }} />
        <div style={{ maxWidth:720, margin:"0 auto", position:"relative" }}>
          <div style={{ display:"inline-block", background:"rgba(234,88,12,0.2)", border:"1px solid rgba(234,88,12,0.4)", color:"#FB923C", fontSize:11, fontWeight:700, letterSpacing:2, textTransform:"uppercase", padding:"5px 16px", borderRadius:100, marginBottom:20 }}>
            Our Story
          </div>
          <h1 style={{ fontSize:"clamp(26px,3.5vw,42px)", fontWeight:900, lineHeight:1.15, marginBottom:16 }}>
            Built by Bankers.<br />
            <span style={{ color:"#FB923C" }}>For People Who Need Loans.</span>
          </h1>
          <p style={{ fontSize:16, fontWeight:600, color:"#CBD5E1", maxWidth:580, margin:"0 auto 14px", lineHeight:1.7 }}>
            We spent 20 years inside banks rejecting loan applications that should have been approved. In 2025 we switched sides.
          </p>
          <p style={{ fontSize:13, color:"rgba(255,255,255,0.4)", letterSpacing:1 }}>
            FinsightOne · Credit · Advisory · Intelligence
          </p>
        </div>
      </div>

      {/* TEAM CARD */}
      <div style={{ padding:"0 clamp(20px,4vw,48px) 0", background:GRAY }}>
        <Reveal style={{ maxWidth:900, margin:"-40px auto 0", background:WHITE, borderRadius:16, padding:"32px 36px", boxShadow:"0 16px 48px rgba(0,0,0,0.10)", position:"relative", zIndex:10, display:"grid", gridTemplateColumns:"auto 1fr", gap:28, alignItems:"start" }}>
          <div style={{ width:100, height:100, borderRadius:"50%", background:`linear-gradient(135deg,${INDIGO},#0F172A)`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <span style={{ fontSize:36, fontWeight:900, color:WHITE }}>FO</span>
          </div>
          <div>
            <div style={{ fontSize:10, fontWeight:800, letterSpacing:2, textTransform:"uppercase", color:ORANGE, marginBottom:6 }}>Expert Credit Advisory Team</div>
            <div style={{ fontSize:22, fontWeight:900, color:DARK, marginBottom:4 }}>FinsightOne Expert Team</div>
            <div style={{ fontSize:13, color:MUTED, marginBottom:14 }}>20+ Years Combined · MSME & Retail Banking · Former Senior Bankers</div>
            <div style={{ fontSize:13, color:"#374151", lineHeight:1.7, marginBottom:16 }}>
              Our team spent 20+ years inside banks — reviewing loan applications, rejecting files, and watching good businesses fail because their paperwork was wrong. We started FinsightOne to fix that. Every client we work with gets the same quality of guidance that bank insiders give to their own families.
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {["20 Yrs Banking","MSME Credit","Retail Lending","Project Finance","NPA Recovery"].map(b => (
                <div key={b} style={{ background:GRAY, borderRadius:6, padding:"5px 11px", fontSize:11, fontWeight:700, color:"#374151" }}>{b}</div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* OUR STORY */}
      <div style={{ background:GRAY, padding:"clamp(56px,6vw,72px) clamp(20px,4vw,48px)" }}>
        <div style={{ maxWidth:760, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <div style={{ fontSize:11, fontWeight:700, color:ORANGE, letterSpacing:2.5, textTransform:"uppercase", marginBottom:10 }}>Why We Exist</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,28px)", fontWeight:900, color:DARK, marginBottom:0 }}>
              We Switched Sides in 2025
            </h2>
          </div>
          {STORY_PARAS.map((p, i) => (
            <p key={i} style={{ fontSize:14.5, color:"#374151", lineHeight:1.85, marginBottom:20, borderLeft: i === 1 ? `3px solid ${ORANGE}` : "none", paddingLeft: i === 1 ? 16 : 0, fontStyle: i === 1 ? "italic" : "normal" }}>
              {p}
            </p>
          ))}
          {/* Mission statement */}
          <div style={{ background:DARK, borderRadius:12, padding:"20px 24px", marginTop:28, textAlign:"center" }}>
            <div style={{ fontSize:11, fontWeight:700, color:ORANGE, letterSpacing:2, textTransform:"uppercase", marginBottom:8 }}>Our Mission</div>
            <div style={{ fontSize:16, fontWeight:700, color:WHITE, lineHeight:1.6 }}>
              To give every Indian borrower the same credit intelligence that bank insiders keep to themselves.
            </div>
          </div>
        </div>
      </div>

      {/* VALUES */}
      <div style={{ background:WHITE, padding:"clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ maxWidth:960, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <div style={{ fontSize:11, fontWeight:700, color:ORANGE, letterSpacing:2.5, textTransform:"uppercase", marginBottom:10 }}>Why We Are Different</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,28px)", fontWeight:900, color:DARK }}>No Agent Commissions. No Hidden Fees.<br />Just Expert Help.</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:16 }}>
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 100} style={{ textAlign:"center", padding:"24px 16px", background:GRAY, border:"1px solid #E5E7EB", borderRadius:12 }}>
                <div style={{ marginBottom:10, display:"flex", justifyContent:"center" }}><ValueIcon i={i} /></div>
                <div style={{ fontSize:13, fontWeight:800, color:DARK, marginBottom:6 }}>{v.title}</div>
                <div style={{ fontSize:12, color:MUTED, lineHeight:1.6 }}>{v.desc}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* CREDENTIALS TIMELINE */}
      <div style={{ background:GRAY, padding:"clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ maxWidth:720, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <div style={{ fontSize:11, fontWeight:700, color:ORANGE, letterSpacing:2.5, textTransform:"uppercase", marginBottom:10 }}>Experience</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,28px)", fontWeight:900, color:DARK }}>20 Years of Banking Expertise</h2>
          </div>
          <div style={{ position:"relative" }}>
            {/* Vertical line */}
            <div style={{ position:"absolute", left:18, top:8, bottom:8, width:2, background:"#E5E7EB", zIndex:0 }} />
            {CREDENTIALS.map((c, i) => (
              <Reveal key={c.period} delay={i * 120} style={{ display:"flex", gap:20, marginBottom: i < CREDENTIALS.length - 1 ? 24 : 0, position:"relative", zIndex:1 }}>
                {/* Dot */}
                <div style={{ width:38, height:38, borderRadius:"50%", background: i === CREDENTIALS.length - 1 ? ORANGE : WHITE, border:`2px solid ${i === CREDENTIALS.length - 1 ? ORANGE : "#E5E7EB"}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2 }}>
                  <div style={{ width:10, height:10, borderRadius:"50%", background: i === CREDENTIALS.length - 1 ? WHITE : ORANGE }} />
                </div>
                {/* Content */}
                <div style={{ background:WHITE, borderRadius:10, padding:"14px 18px", flex:1, borderLeft:`3px solid ${i === CREDENTIALS.length - 1 ? ORANGE : "#E5E7EB"}` }}>
                  <div style={{ fontSize:11, fontWeight:800, color:ORANGE, letterSpacing:1, marginBottom:4 }}>{c.period}</div>
                  <div style={{ fontSize:14, fontWeight:700, color:DARK, marginBottom:3 }}>{c.title}</div>
                  <div style={{ fontSize:12.5, color:MUTED }}>{c.org}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* WHAT WE DON'T DO */}
      <div style={{ background:WHITE, padding:"clamp(40px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ maxWidth:960, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <div style={{ fontSize:11, fontWeight:700, color:ORANGE, letterSpacing:2.5, textTransform:"uppercase", marginBottom:10 }}>Honest Expectations</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,28px)", fontWeight:900, color:DARK }}>What We Don't Do</h2>
            <p style={{ fontSize:14, color:MUTED, maxWidth:480, margin:"10px auto 0", lineHeight:1.6 }}>We think you should know this before you engage us.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:16 }}>
            {WHAT_WE_DONT.map((w, i) => (
              <Reveal key={w.title} delay={i * 90} style={{ background:GRAY, border:"1px solid #E5E7EB", borderRadius:12, padding:"18px 18px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                  <NoIcon />
                  <span style={{ fontSize:13.5, fontWeight:700, color:DARK }}>{w.title}</span>
                </div>
                <p style={{ fontSize:12.5, color:MUTED, lineHeight:1.65, margin:0 }}>{w.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div style={{ background:`linear-gradient(135deg,#0F172A 0%,#1E1B4B 100%)`, padding:"clamp(40px,5vw,56px) clamp(20px,4vw,48px)", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", width:220, height:220, borderRadius:"50%", background:INDIGO, filter:"blur(80px)", opacity:0.25, top:-60, right:-50, pointerEvents:"none", animation:"orbDriftB 12s ease-in-out infinite" }} />
        <div style={{ maxWidth:540, margin:"0 auto", position:"relative" }}>
          <h2 style={{ fontSize:"clamp(22px,3vw,28px)", fontWeight:900, color:WHITE, marginBottom:12 }}>
            Ready to Work With Us?
          </h2>
          <p style={{ fontSize:14, color:"#CBD5E1", marginBottom:28, lineHeight:1.7 }}>
            Start with a free eligibility check — no commitment, no documents needed.
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={() => navigate("check")} style={{ background:ORANGE, color:WHITE, fontSize:14, fontWeight:700, padding:"13px 28px", borderRadius:8, border:"none", cursor:"pointer", fontFamily:"inherit" }}>
              Check My Eligibility — Free →
            </button>
            <button
              onClick={() => window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent("Hi FinsightOne, I want to know more about your team and how you work"), "_blank")}
              style={{ background:"rgba(255,255,255,0.1)", color:WHITE, fontSize:14, fontWeight:600, padding:"13px 28px", borderRadius:8, border:"1px solid rgba(255,255,255,0.2)", cursor:"pointer", fontFamily:"inherit" }}>
              💬 Talk to the Team
            </button>
          </div>
          <div style={{ fontSize:11, color:"#475569", marginTop:16 }}>🔒 Free · No documents needed · No spam</div>
        </div>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}
