import Footer from "../components/Footer";

const POSTS = [
  {
    id: 1,
    tag: "Working Capital",
    date: "May 2025",
    title: "Why Your GST Turnover and Bank Statement Must Match Within 15%",
    excerpt: "One of the most common reasons banks reject working capital loans is a mismatch between GST-declared turnover and bank statement deposits. Here is what bankers look for and how to fix it before you apply.",
    readTime: "4 min read",
    color: "#0D1428",
  },
  {
    id: 2,
    tag: "Home Loan",
    date: "May 2025",
    title: "FOIR Explained: Why Your CIBIL is Fine But Loan Was Still Rejected",
    excerpt: "Your CIBIL score is 740. Your income is stable. But your home loan was rejected. The reason is almost certainly FOIR — Fixed Obligation to Income Ratio. Here is exactly how banks calculate it and what you can do.",
    readTime: "5 min read",
    color: "#1E3A5F",
  },
  {
    id: 3,
    tag: "MSME Loans",
    date: "April 2025",
    title: "Drawing Power Calculation: What Every Business Owner Must Know Before Applying for CC",
    excerpt: "Banks do not just look at your turnover when sanctioning a Cash Credit limit. They calculate Drawing Power from your stock, debtors, and creditors. Most business owners are surprised by how different the number is.",
    readTime: "6 min read",
    color: "#166534",
  },
  {
    id: 4,
    tag: "Credit Score",
    date: "April 2025",
    title: "How Many Loan Enquiries Are Too Many? The CIBIL Impact Nobody Talks About",
    excerpt: "Every time a lender checks your CIBIL score to process a loan application, it creates a hard enquiry. Too many hard enquiries in a short period signal credit hunger — and banks penalise you for it. Here is how to protect your score.",
    readTime: "3 min read",
    color: "#7C3AED",
  },
  {
    id: 5,
    tag: "LAP",
    date: "March 2025",
    title: "Title Chain: The Single Biggest Reason LAP Applications Get Stuck",
    excerpt: "Loan Against Property applications get stuck not because of income issues — but because of property documentation gaps. A clean title chain going back 13 years minimum is what every bank requires. Here is what to check before applying.",
    readTime: "5 min read",
    color: "#B45309",
  },
  {
    id: 6,
    tag: "NPA Prevention",
    date: "March 2025",
    title: "Early Warning Signs Your Business Loan May Be Heading Towards NPA",
    excerpt: "Banks watch 8 specific signals before classifying a loan account as stressed. Most business owners do not know what these signals are — and miss the window to act proactively. Here are all 8 warning signs explained.",
    readTime: "7 min read",
    color: "#DC2626",
  },
];

export default function Blog({ navigate }) {
  return (
    <div>
      {/* HERO */}
      <div style={{ background: "#0D1428", padding: "clamp(44px,6vw,72px) clamp(20px,4vw,48px)", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(232,160,32,0.15)", border: "1px solid rgba(232,160,32,0.3)", color: "#E8A020", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "5px 16px", borderRadius: 100, marginBottom: 20 }}>
          Credit Advisory Blog
        </div>
        <h1 style={{ fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: 14 }}>
          20 Years of Banking Knowledge.<br /><span style={{ color: "#E8A020" }}>Now Free to Read.</span>
        </h1>
        <p style={{ fontSize: 16, color: "#94A3B8", maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
          Credit tips, loan guides, and insider knowledge from former senior bankers. No jargon. No sales pitch. Just useful information.
        </p>
      </div>

      {/* POSTS GRID */}
      <div style={{ padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)", background: "#F9FAFB" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
          {POSTS.map(post => (
            <div key={post.id} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, overflow: "hidden", cursor: "pointer" }}
              onClick={() => navigate("check")}>
              {/* Color header */}
              <div style={{ background: post.color, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", padding: "3px 10px", borderRadius: 20 }}>
                  {post.tag}
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{post.date}</div>
              </div>
              {/* Content */}
              <div style={{ padding: "20px 24px" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", lineHeight: 1.5, marginBottom: 12 }}>{post.title}</h3>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.7, marginBottom: 16 }}>{post.excerpt}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: "#9CA3AF" }}>{post.readTime}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#0D1428" }}>Read article →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "#0D1428", padding: "clamp(40px,5vw,64px) clamp(20px,4vw,48px)", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 800, color: "#fff", marginBottom: 12 }}>
          Ready to Check Your Eligibility?
        </h2>
        <p style={{ fontSize: 15, color: "#94A3B8", marginBottom: 28 }}>Free — 2 minutes — no documents needed.</p>
        <button onClick={() => navigate("check")} style={{ background: "#E8A020", color: "#fff", fontSize: 15, fontWeight: 700, padding: "14px 36px", borderRadius: 8, border: "none", cursor: "pointer" }}>
          Check My Eligibility — Free →
        </button>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}
