import { useState } from "react";
import Footer from "../components/Footer";

const ORANGE = "#EA580C";
const INDIGO = "#4F46E5";
const DARK   = "#111827";
const MUTED  = "#6B7280";
const WHITE  = "#fff";
const GRAY   = "#F9FAFB";
const WA     = "919579453635";

const POSTS = [
  {
    id: 1,
    tag: "Documentation",
    filter: "documentation",
    date: "May 2025",
    title: "What Documents Do Banks Actually Ask For in 2025?",
    excerpt: "Most loan applications get delayed or rejected because of documentation gaps — not credit issues. This guide covers every document a bank requires for home loans, business loans, and LAP — and what happens when one is missing.",
    readTime: "5 min read",
    color: "#0D1428",
    url: "/reports/guides/guide_01_documents_checklist.html",
    badge: "Most Read",
    waText: "Hi FinsightOne, I need help with loan documentation",
  },
  {
    id: 2,
    tag: "Credit Score",
    filter: "credit",
    date: "May 2025",
    title: "How to Improve Your CIBIL Score Before Applying for a Loan",
    excerpt: "A low CIBIL score is fixable — but only if you know what is pulling it down and in what order to fix it. This guide walks you through the 6 most common CIBIL issues and how to resolve each one before you approach any lender.",
    readTime: "5 min read",
    color: "#7C3AED",
    url: "/reports/guides/guide_02_cibil_improvement.html",
    badge: null,
    waText: "Hi FinsightOne, I need help improving my CIBIL score",
  },
  {
    id: 3,
    tag: "Working Capital",
    filter: "working-capital",
    date: "April 2025",
    title: "CC Limit vs OD Limit: Which Is Right for Your Business?",
    excerpt: "Cash Credit and Overdraft are both working capital facilities — but they work very differently. Choosing the wrong one costs you money and creates operational complications. Here is how to decide which one your business actually needs.",
    readTime: "6 min read",
    color: "#166534",
    url: "/reports/guides/guide_03_cc_vs_od.html",
    badge: null,
    waText: "Hi FinsightOne, I need help choosing between CC and OD for my business",
  },
  {
    id: 4,
    tag: "Loan Rejection",
    filter: "rejection",
    date: "April 2025",
    title: "Why Banks Reject Loan Applications — And How to Fix Each Reason",
    excerpt: "Banks reject loans for 7 specific, documented reasons. Most rejections are preventable if you know what to fix before you apply. This guide covers every reason with the exact fix for each one.",
    readTime: "6 min read",
    color: "#DC2626",
    url: "/reports/guides/guide_04_loan_rejection_reasons.html",
    badge: "Most Read",
    waText: "Hi FinsightOne, my loan was rejected and I need help",
  },
  {
    id: 5,
    tag: "Home Loan",
    filter: "home-loan",
    date: "March 2025",
    title: "Home Loan Balance Transfer: When It Makes Sense (With Numbers)",
    excerpt: "A balance transfer can save you lakhs — or cost you money in fees and reset costs. This guide shows you the exact calculation to run before deciding, including the break-even point and what most people miss about processing fees.",
    readTime: "5 min read",
    color: "#0369A1",
    url: "/reports/guides/guide_05_home_loan_balance_transfer.html",
    badge: null,
    waText: "Hi FinsightOne, I want to evaluate a home loan balance transfer",
  },
  {
    id: 6,
    tag: "Project Finance",
    filter: "project-finance",
    date: "March 2025",
    title: "RBI's 2025 Project Finance Directions: What Borrowers Need to Know",
    excerpt: "RBI's 2025 Project Finance Directions changed the rules for large project loans — DPR format, escrow structure, stress testing requirements, and lender consortium obligations. If you are applying for project finance above ₹25 Crore, this is essential reading.",
    readTime: "7 min read",
    color: "#B45309",
    url: "/reports/guides/guide_06_project_finance_rbi_2025.html",
    badge: null,
    waText: "Hi FinsightOne, I need help with project finance documentation",
  },
];

const FILTERS = [
  { id:"all",            label:"All Articles" },
  { id:"documentation",  label:"Documentation" },
  { id:"credit",         label:"Credit Score" },
  { id:"working-capital",label:"Working Capital" },
  { id:"rejection",      label:"Loan Rejection" },
  { id:"home-loan",      label:"Home Loan" },
  { id:"project-finance",label:"Project Finance" },
];

// Related articles map — id → related ids
const RELATED = {
  1: [4, 2],
  2: [4, 1],
  3: [4, 1],
  4: [2, 1],
  5: [2, 4],
  6: [4, 3],
};

export default function Blog({ navigate }) {
  const [active, setActive] = useState("all");
  const filtered = active === "all" ? POSTS : POSTS.filter(p => p.filter === active);

  return (
    <div style={{ fontFamily:"Arial,sans-serif", color:DARK }}>

      {/* HERO */}
      <div style={{ background:`linear-gradient(135deg,#0F172A 0%,#1E1B4B 100%)`, padding:"clamp(48px,7vw,72px) clamp(20px,5vw,48px)", textAlign:"center" }}>
        <div style={{ maxWidth:700, margin:"0 auto" }}>
          <div style={{ display:"inline-block", background:"rgba(234,88,12,0.2)", border:"1px solid rgba(234,88,12,0.4)", color:"#FB923C", fontSize:11, fontWeight:700, letterSpacing:2, textTransform:"uppercase", padding:"5px 16px", borderRadius:100, marginBottom:20 }}>
            Credit Advisory Blog
          </div>
          <h1 style={{ fontSize:"clamp(26px,3.5vw,42px)", fontWeight:900, color:WHITE, lineHeight:1.15, marginBottom:14 }}>
            20 Years of Banking Knowledge.<br />
            <span style={{ color:"#FB923C" }}>Now Free to Read.</span>
          </h1>
          <p style={{ fontSize:16, color:"#CBD5E1", maxWidth:520, margin:"0 auto", lineHeight:1.75 }}>
            Credit tips, loan guides, and insider knowledge from former senior bankers. No jargon. No sales pitch. Just useful information that saves you money and rejection.
          </p>
        </div>
      </div>

      {/* STATS BAR */}
      <div style={{ background:GRAY, borderBottom:"1px solid #E5E7EB", padding:"14px clamp(20px,4vw,48px)", display:"flex", justifyContent:"space-around", flexWrap:"wrap", gap:16 }}>
        {[["6","Articles Published"],["20 yrs","Banking Expertise"],["Free","Always"],["No Jargon","Plain Language"]].map(([v,l]) => (
          <div key={l} style={{ textAlign:"center" }}>
            <div style={{ fontSize:18, fontWeight:900, color:ORANGE }}>{v}</div>
            <div style={{ fontSize:11, color:MUTED, marginTop:2 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* FILTER BAR */}
      <div style={{ background:WHITE, borderBottom:"1px solid #E5E7EB", padding:"14px clamp(20px,4vw,48px)", display:"flex", justifyContent:"center", gap:8, flexWrap:"wrap" }}>
        {FILTERS.map(f => (
          <button key={f.id}
            onClick={() => setActive(f.id)}
            style={{ padding:"6px 16px", borderRadius:20, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"inherit", border: active===f.id ? `1px solid ${ORANGE}` : "1px solid #E5E7EB", background: active===f.id ? `${ORANGE}10` : WHITE, color: active===f.id ? ORANGE : MUTED, transition:"all 0.15s" }}>
            {f.label}
          </button>
        ))}
      </div>

      {/* POSTS GRID */}
      <div style={{ padding:"clamp(32px,5vw,56px) clamp(20px,4vw,48px)", background:GRAY }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:24 }}>
          {filtered.map(post => {
            const related = RELATED[post.id]
              .map(rid => POSTS.find(p => p.id === rid))
              .filter(Boolean);
            return (
              <div key={post.id} style={{ background:WHITE, border:"1px solid #E5E7EB", borderRadius:14, overflow:"hidden", display:"flex", flexDirection:"column" }}>

                {/* Color header */}
                <div style={{ background:post.color, padding:"18px 24px", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div>
                    <div style={{ display:"inline-block", background:"rgba(255,255,255,0.15)", color:WHITE, fontSize:10, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", padding:"3px 10px", borderRadius:20, marginBottom:6 }}>
                      {post.tag}
                    </div>
                    {post.badge && (
                      <div style={{ display:"inline-block", background:ORANGE, color:WHITE, fontSize:9, fontWeight:800, letterSpacing:1px, textTransform:"uppercase", padding:"2px 8px", borderRadius:10, marginLeft:6 }}>
                        ★ {post.badge}
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)", flexShrink:0 }}>{post.date}</div>
                </div>

                {/* Content */}
                <div style={{ padding:"20px 24px", flex:1, display:"flex", flexDirection:"column" }}>
                  <h3 style={{ fontSize:15, fontWeight:700, color:DARK, lineHeight:1.45, marginBottom:10 }}>{post.title}</h3>
                  <p style={{ fontSize:13, color:MUTED, lineHeight:1.7, marginBottom:14, flex:1 }}>{post.excerpt}</p>

                  {/* Read time */}
                  <div style={{ fontSize:11, color:"#9CA3AF", marginBottom:14 }}>⏱ {post.readTime}</div>

                  {/* Related articles */}
                  <div style={{ background:GRAY, borderRadius:8, padding:"10px 12px", marginBottom:14 }}>
                    <div style={{ fontSize:10, fontWeight:700, color:MUTED, letterSpacing:1px, textTransform:"uppercase", marginBottom:7 }}>Related Articles</div>
                    {related.map(r => (
                      <div key={r.id}
                        onClick={(e) => { e.stopPropagation(); window.open(r.url, "_blank"); }}
                        style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5, cursor:"pointer" }}>
                        <span style={{ fontSize:9, color:ORANGE, flexShrink:0 }}>→</span>
                        <span style={{ fontSize:11.5, color:INDIGO, fontWeight:500, lineHeight:1.35 }}>{r.title}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div style={{ display:"flex", gap:8 }}>
                    <button
                      onClick={() => window.open(post.url, "_blank")}
                      style={{ flex:1, padding:"9px 0", borderRadius:8, fontSize:12.5, fontWeight:700, cursor:"pointer", background:DARK, color:WHITE, border:"none", fontFamily:"inherit" }}>
                      Read Article →
                    </button>
                    <button
                      onClick={() => window.open(`https://wa.me/${WA}?text=${encodeURIComponent(post.waText)}`, "_blank")}
                      style={{ padding:"9px 14px", borderRadius:8, fontSize:12.5, fontWeight:600, cursor:"pointer", background:"#25D366", color:WHITE, border:"none", fontFamily:"inherit", flexShrink:0 }}
                      title="Have this problem? Talk to us">
                      💬
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign:"center", padding:"48px", color:MUTED, fontSize:14 }}>No articles in this category yet.</div>
        )}
      </div>

      {/* NEWSLETTER / CTA STRIP */}
      <div style={{ background:WHITE, padding:"clamp(32px,4vw,48px) clamp(20px,4vw,48px)", borderTop:"1px solid #E5E7EB", borderBottom:"1px solid #E5E7EB" }}>
        <div style={{ maxWidth:700, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", gap:20, flexWrap:"wrap" }}>
          <div>
            <div style={{ fontSize:16, fontWeight:800, color:DARK, marginBottom:5 }}>Read enough? Check if you qualify.</div>
            <div style={{ fontSize:13, color:MUTED }}>Free eligibility check — 2 minutes, no documents needed.</div>
          </div>
          <div style={{ display:"flex", gap:10, flexShrink:0 }}>
            <button onClick={() => navigate("check")} style={{ background:ORANGE, color:WHITE, fontSize:13, fontWeight:700, padding:"10px 22px", borderRadius:8, border:"none", cursor:"pointer", fontFamily:"inherit" }}>
              Check Eligibility — Free →
            </button>
            <button
              onClick={() => window.open(`https://wa.me/${WA}?text=${encodeURIComponent("Hi FinsightOne, I read your blog and have a question")}`, "_blank")}
              style={{ background:"#25D366", color:WHITE, fontSize:13, fontWeight:700, padding:"10px 18px", borderRadius:8, border:"none", cursor:"pointer", fontFamily:"inherit" }}>
              💬 Ask a Question
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div style={{ background:`linear-gradient(135deg,#0F172A 0%,#1E1B4B 100%)`, padding:"clamp(40px,5vw,56px) clamp(20px,4vw,48px)", textAlign:"center" }}>
        <div style={{ maxWidth:560, margin:"0 auto" }}>
          <h2 style={{ fontSize:"clamp(22px,3vw,28px)", fontWeight:900, color:WHITE, marginBottom:12 }}>
            Ready to Apply What You've Read?
          </h2>
          <p style={{ fontSize:14, color:"#CBD5E1", marginBottom:28, lineHeight:1.7 }}>
            Free eligibility check — 2 minutes, no documents. Know exactly where you stand before approaching any bank.
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={() => navigate("check")} style={{ background:ORANGE, color:WHITE, fontSize:14, fontWeight:700, padding:"13px 28px", borderRadius:8, border:"none", cursor:"pointer", fontFamily:"inherit" }}>
              Check My Eligibility — Free →
            </button>
            <button onClick={() => navigate("readiness")} style={{ background:"rgba(255,255,255,0.1)", color:WHITE, fontSize:14, fontWeight:600, padding:"13px 28px", borderRadius:8, border:"1px solid rgba(255,255,255,0.2)", cursor:"pointer", fontFamily:"inherit" }}>
              See Loan Readiness Reports →
            </button>
          </div>
          <div style={{ fontSize:11, color:"#475569", marginTop:16 }}>🔒 Free · No documents needed · No spam</div>
        </div>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}
