export const HERO_STATS = [
  { val: "72 hrs", label: "Document Delivery" },
  { val: "275+", label: "Lender Network" },
  { val: "20 Yrs", label: "Banking Experience" },
  { val: "₹0", label: "To Check Eligibility" },
];

export const SERVICES = [
  {
    id: "s1", icon: "🏦",
    num: "Step 01 · No Charges",
    title: "Apply for a Loan",
    pitch: "We match you with the right lender from 200+ banks and NBFCs. You pay nothing — we earn our fee from the lender only after your loan is disbursed.",
    items: [
      { name: "Working Capital / Overdraft", price: "Free" },
      { name: "Business Term Loan",          price: "Free" },
      { name: "Loan Against Property",       price: "Free" },
      { name: "Home Loan",                   price: "Free" },
      { name: "Personal Loan",               price: "Free" },
      { name: "Unsecured Business Loan",     price: "Free" },
    ],
    btn: "Check If I Qualify — Free", page: "check",
    numColor: "#EA580C", priceColor: "#16A34A",
    headBg: "#FFF7ED",
    btnBg: "#EA580C", btnColor: "#FFFFFF", btnBorder: "#EA580C",
  },
  {
    id: "s2", icon: "🔍",
    num: "Step 02 · Know Before You Apply",
    title: "Loan Readiness Check",
    pitch: "Find out exactly where you stand before walking into a bank. We tell you your chances, what is weak, and exactly how to fix it.",
    items: [
      { name: "Free Eligibility Score",      price: "Free" },
      { name: "Detailed Eligibility Report", price: "₹799",   sample: "/reports/s2-02-detailed-eligibility.html" },
      { name: "Loan Readiness Plan",         price: "₹2,999", sample: "/reports/s2-03-loan-readiness-plan.html" },
      { name: "Banker Presentation Pack",    price: "₹9,999", sample: "/reports/s2-04-banker-presentation-pack.html" },
      { name: "Rejection Analysis Report",   price: "₹4,999", sample: "/reports/s2-05-rejection-analysis.html" },
    ],
    btn: "Check My Loan Score — Free", page: "check",
    numColor: "#2563EB", priceColor: "#0A1929",
    headBg: "#EFF6FF",
    btnBg: "#0A1929", btnColor: "#FFFFFF", btnBorder: "#0A1929",
  },
  {
    id: "s3", icon: "📄",
    num: "Step 03 · Loan Documents",
    title: "Loan Appraisal & CMA Documents",
    pitch: "Bank-ready LAN, CMA and DPR prepared by ex-bankers — exactly the way lenders read a file.",
    items: [
      { name: "Loan Appraisal Note 1–2 Cr",   price: "₹3,999", sample: "/reports/doc-01-cam-small.html" },
      { name: "Loan Appraisal Note 2–5 Cr",   price: "₹7,999", sample: "/reports/doc-02-cam-large.html" },
      { name: "Loan Appraisal Note Above 5 Cr", price: "On Call", sample: "/reports/doc-03-lan-5to10cr.html" },
      { name: "CMA Financial Analysis 1–2 Cr", price: "₹4,999", sample: "/reports/cma-01-interpretation-1to2cr.html" },
      { name: "CMA Financial Analysis 2–5 Cr", price: "₹8,999", sample: "/reports/cma-02-interpretation-2to5cr.html" },
      { name: "CMA Above 5 Cr",                price: "On Call", sample: "/reports/cma-03-interpretation-5to10cr.html" },
      { name: "Project Report (DPR) 2–5 Cr",   price: "₹9,999" },
      { name: "DPR Above 5 Cr",                price: "On Call" },
    ],
    btn: "Get My Documents →", page: "docs",
    numColor: "#0A1929", priceColor: "#0A1929",
    headBg: "#F8FAFC",
    btnBg: "#1E293B", btnColor: "#FFFFFF", btnBorder: "#1E293B",
  },
  {
    id: "s4", icon: "📊",
    num: "Step 04 · Monthly Plans",
    title: "Keep Your Limits Growing",
    pitch: "Your finances, banker-ready every single month.",
    items: [
      { name: "Credit Watch",    price: "₹499/mo",   tagline: "Know what your banker sees that you don't — before it becomes a problem." },
      { name: "Business Health", price: "₹2,999/mo", tagline: "Stay enhancement-ready all year and grow your banking limits.", sample: "/reports/s2-03-loan-readiness-plan.html", popular: true },
      { name: "Premium",         price: "₹4,999/mo", tagline: "Active guidance through every banker conversation and enhancement." },
    ],
    btn: "View Plans →", page: "analytics",
    numColor: "#16A34A", priceColor: "#16A34A",
    headBg: "#F0FDF4",
    btnBg: "#16A34A", btnColor: "#FFFFFF", btnBorder: "#16A34A",
  },
  {
    id: "s5", icon: "🎯",
    num: "Step 05 · Expert Help",
    title: "One-on-One Expert Advisory",
    pitch: "Work directly with our expert team — 20+ years of banking experience. We advise you personally on every document and decision.",
    items: [
      { name: "Business Loan Enhancement", price: "₹10K–25K" },
      { name: "New Business Loan Setup",   price: "₹10K–20K" },
      { name: "NPA Prevention Advisory",   price: "₹20K–50K" },
    ],
    btn: "Book Free Consultation →", page: "advisory",
    numColor: "#7C3AED", priceColor: "#0A1929",
    headBg: "#FAF5FF",
    btnBg: "#7C3AED", btnColor: "#FFFFFF", btnBorder: "#7C3AED",
  },
];

export const STEPS = [
  { num: 1, title: "Free Eligibility Check", desc: "Know your chances in 2 minutes. No documents needed." },
  { num: 2, title: "We Prepare Your File", desc: "Our experts prepare every document the bank asks for — in 72 hours." },
  { num: 3, title: "We Submit to Lenders", desc: "We send your application to the best-fit lenders and follow up for you." },
  { num: 4, title: "Loan in Your Account", desc: "We track until disbursement. Then help you stay loan-ready for next time." },
];

export const JOURNEY = [
  { tag: "Free", name: "Eligibility Check", price: "₹0", tagColor: "#93C5FD" },
  { tag: "Report", name: "Detailed Report", price: "₹799", tagColor: "#C4B5FD" },
  { tag: "Documents", name: "Loan Documents", price: "₹15,000+", tagColor: "#FDE68A" },
  { tag: "Loan", name: "Disbursement", price: "You keep 100%", tagColor: "#6EE7B7" },
  { tag: "Monthly", name: "Stay Loan-Ready", price: "₹2,999/mo", tagColor: "#6EE7B7" },
];

export const TESTIMONIALS = [
  { quote: "My loan was rejected twice. FinsightOne fixed my file and I got approved in 3 weeks.", author: "Ramesh Agarwal", role: "Textile Manufacturer, Surat · ₹45L Term Loan" },
  { quote: "The documents they prepared were better than what my own CA had made. Bank approved on the first visit.", author: "Priya Menon", role: "Food Processing Unit, Pune · ₹28L Working Capital" },
  { quote: "I took the monthly plan. Now I renew my loan every year without any fresh paperwork stress.", author: "Suresh Nair", role: "Engineering SME, Chennai · Monthly Plan Client" },
];

export const PLANS = [
  {
    name: "Credit Watch", price: "₹499", per: "/ month", featured: false, sampleReport: "/reports/credit-watch-monthly-report.html",
    desc: "Know what your banker sees that you don't — before it becomes a problem.",
    features: [
      "Monthly bureau score tracking — promoter + business",
      "CC utilisation pattern alert — flags stress before banker notices",
      "Cheque return frequency tracker",
      "GST filing status check — catch gaps before your bank does",
      "ROC / MCA compliance alert",
      "Monthly one-page summary report",
    ],
  },
  {
    name: "Business Health", price: "₹2,999", per: "/ month", featured: true, badge: "Most Popular", sampleReport: "/reports/monthly-business-health-report.html",
    desc: "For MSME owners who want to stay enhancement-ready all year and grow their banking limits.",
    features: [
      "Everything in Credit Watch",
      "Monthly review of 8 key banking ratios — DSCR, debtor days, creditor days, drawing power, turnover vs GST",
      "Traffic light dashboard — Green / Amber / Red vs your bank's actual benchmarks",
      "One specific fix-it action every month with a clear deadline",
      "Quarterly enhancement readiness score — know your chances before you ask",
      "12-month enhancement calendar — when to prepare, when to approach, what to say",
    ],
  },
  {
    name: "Premium", price: "₹4,999", per: "/ month", featured: false, sampleReport: "/reports/premium-monthly-report.html",
    desc: "For growing businesses that want active guidance through every banker conversation and enhancement.",
    features: [
      "Everything in Business Health",
      "Dedicated relationship manager — monthly review call on your numbers",
      "Bank-specific enhancement strategy — what your banker looks for, what narrative wins",
      "Enhancement application preparation — amount, justification, supporting data",
      "Banker meeting script — exactly what to say, what not to volunteer",
      "Pre-meeting mock Q&A — 10 likely credit manager questions with your answers",
      "Post-meeting debrief — we decode what the banker's signals mean and what to do next",
      "Rate negotiation brief — market comparable rates to use as leverage",
    ],
  },
];

export const WHAT_INCLUDED = [
  { icon: "👁️", title: "Bank-View Monitoring", desc: "We track the signals your banker watches — utilisation patterns, cheque returns, GST gaps, and bureau enquiries — before they quietly damage your creditworthiness." },
  { icon: "📈", title: "Enhancement Readiness Score", desc: "Every quarter we tell you: if you walked into your bank today and asked for a higher limit, here is your actual chance of success." },
  { icon: "🚦", title: "Traffic Light Dashboard", desc: "Eight key banking ratios rated Green, Amber, or Red against your bank's actual benchmarks — not generic industry averages." },
  { icon: "🎯", title: "Monthly Fix-It Action", desc: "One specific, precise instruction every month based on your exact numbers — not generic advice but a clear action with a deadline." },
  { icon: "📅", title: "12-Month Enhancement Calendar", desc: "A full-year roadmap showing when to prepare your financials, when to approach the bank, and what supporting data to bring." },
  { icon: "🤝", title: "Banker Meeting Prep", desc: "Meeting script, mock Q&A based on your live financials, and post-meeting debrief — so every banker conversation moves you closer to a higher limit. (Premium)" },
];

export const DOC_PRODUCTS = [
  {
    icon: "📑", name: "Loan Application Report (CAM)",
    desc: "The main document banks use to decide on your loan. We prepare it in the exact format your bank uses — covering your business, income, assets, and repayment ability.",
    price: "₹1,499 – ₹2,00,000", who: "For: All loan applicants",
  },
  {
    icon: "📊", name: "Financial Analysis Report (CMA)",
    desc: "A detailed 3 to 5 year analysis of your business finances — required by most banks for loans above ₹10 lakh. We prepare all 7 mandatory statements as per RBI guidelines.",
    price: "₹3,999 – ₹50,000+", who: "For: Business loan applicants",
  },
  {
    icon: "📘", name: "Full Project Report (DPR)",
    desc: "For larger loans above ₹25 crore — a complete project report covering viability, projections, risk analysis, and compliance. Prepared as per RBI 2025 Project Finance Directions.",
    price: "₹40,000 – ₹3,50,000", who: "For: Large project / infrastructure loans",
  },
];

export const ADVISORY_PRODUCTS = [
  {
    icon: "🏗️", name: "How to Structure Your Loan",
    desc: "Advice on the best loan type, amount, tenure, and lender for your specific situation — so you get maximum approval at minimum cost.",
    price: "₹15,000 – ₹50,000", who: "For: First-time or large loan borrowers",
  },
  {
    icon: "🔄", name: "Loan Recovery & Restructuring",
    desc: "If you are struggling with loan repayments — we advise on how to restructure, negotiate with the bank, and avoid your loan going bad.",
    price: "₹25,000 – ₹75,000", who: "For: Businesses under financial stress",
  },
  {
    icon: "📈", name: "Increase Your Loan Limit",
    desc: "Already have a loan but need more? We advise on how to enhance your existing credit limit with your current bank or move to a better lender.",
    price: "₹10,000 – ₹25,000", who: "For: Existing loan holders",
  },
];

export const VALUES = [
  { icon: "🔍", title: "We Tell You the Truth", desc: "If your application is weak, we tell you — and fix it before submitting." },
  { icon: "🏦", title: "We Know Banks From Inside", desc: "Our expert team spent 20+ years reviewing loan files. We know exactly what bankers look for." },
  { icon: "⚡", title: "72-Hour Turnaround", desc: "Bank-ready documents prepared and delivered in 72 hours — not weeks." },
  { icon: "🔒", title: "Your Data Is Safe", desc: "We never share your financial information without your written consent." },
];

export const CREDENTIALS = [
  { period: "2005 – 2010", title: "Retail Lending Officer", org: "Leading Public Sector Bank · Home & Personal Loans" },
  { period: "2010 – 2018", title: "MSME Credit Manager", org: "Mid-Size Private Bank · Working Capital & Term Loans" },
  { period: "2018 – 2023", title: "Senior Credit Analyst", org: "Large NBFC · Project Finance & Structured Lending" },
  { period: "2023 – 2024", title: "Independent Consultant", org: "MSME Advisory · Helped 100+ businesses get approved" },
  { period: "2025 – Present", title: "Founder, FinsightOne", org: "India's Credit & Loan Advisory Platform" },
];
