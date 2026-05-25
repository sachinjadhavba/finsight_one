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
    pitch: "We match you with the right lender from 275+ banks and NBFCs. You pay nothing — we earn our fee from the lender only after your loan is disbursed.",
    items: [
      { name: "Working Capital / Overdraft", price: "Free" },
      { name: "Business Term Loan", price: "Free" },
      { name: "Loan Against Property", price: "Free" },
      { name: "Home Loan", price: "Free" },
      { name: "Personal / Vehicle Loan", price: "Free" },
    ],
    btn: "Check My Eligibility →", page: "check",
    numColor: "#2563EB", priceColor: "#2563EB",
    headBg: "#EFF6FF",
    btnBg: "#EFF6FF", btnColor: "#2563EB", btnBorder: "#BFDBFE",
  },
  {
    id: "s2", icon: "🔍",
    num: "Step 02 · Know Before You Apply",
    title: "Loan Readiness Check",
    pitch: "Find out exactly where you stand before walking into a bank. We tell you your chances, what is weak, and exactly how to fix it.",
    items: [
      { name: "Free Eligibility Check", price: "Free" },
      { name: "Detailed Eligibility Report", price: "₹499–999", sample: "samplereport" },
      { name: "Loan Readiness Plan", price: "₹2,499–4,999", sample: "samplereport" },
      { name: "Full Banker Presentation", price: "₹9,999–14,999", sample: "samplereport" },
      { name: "Rejected Loan Recovery", price: "₹4,999–7,999", sample: "samplereport" },
    ],
    btn: "Get My Free Check →", page: "check",
    numColor: "#7C3AED", priceColor: "#7C3AED",
    headBg: "#F5F3FF",
    btnBg: "#F5F3FF", btnColor: "#7C3AED", btnBorder: "#DDD6FE",
  },
  {
    id: "s3", icon: "📊",
    num: "Step 03 · Monthly Plans",
    title: "Keep Your Finances Always Ready",
    pitch: "Monthly reports and alerts so your business finances are always in order — not just when you need a loan.",
    items: [
      { name: "Monthly Business Health Report", price: "₹2,999/mo", sample: "samplereport" },
      { name: "Working Capital Alerts", price: "₹1,999/mo", sample: "samplereport" },
      { name: "Custom MIS Dashboard", price: "₹4,999/mo", sample: "samplereport" },
      { name: "Credit Score Tracking", price: "₹499/mo", sample: "samplereport" },
      { name: "Yearly Financial Health Audit", price: "₹14,999/yr", sample: "samplereport" },
    ],
    btn: "View Monthly Plans →", page: "analytics",
    numColor: "#059669", priceColor: "#059669",
    headBg: "#ECFDF5",
    btnBg: "#ECFDF5", btnColor: "#059669", btnBorder: "#A7F3D0",
  },
  {
    id: "s4", icon: "🎯",
    num: "Step 04 · Expert Help",
    title: "One-on-One Expert Advisory",
    pitch: "Work directly with our expert team — 20+ years of banking experience. We prepare every document the bank needs and advise you personally.",
    items: [
      { name: "Loan Application Documents", price: "₹3,999+" },
      { name: "Loan Structuring Advice", price: "₹15K–50K" },
      { name: "Loan Recovery & Restructuring", price: "₹25K–75K" },
      { name: "Increase Your Loan Limit", price: "₹10K–25K" },
    ],
    btn: "Book a Consultation →", page: "advisory",
    numColor: "#B45309", priceColor: "#B45309",
    headBg: "#FFFBEB",
    btnBg: "#FFFBEB", btnColor: "#B45309", btnBorder: "#FDE68A",
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
    name: "Starter", price: "₹499", per: "/ month", featured: false,
    desc: "For individuals and small businesses who want to track their credit score regularly.",
    features: ["Monthly credit score update", "Score change alerts via WhatsApp", "Simple 1-page summary report", "Tips to improve your score"],
  },
  {
    name: "Business", price: "₹2,999", per: "/ month", featured: true, badge: "Most Popular",
    desc: "For MSME owners who want to stay on top of their business finances and stay loan-ready.",
    features: ["Monthly business health report", "Working capital position tracking", "Loan eligibility status update", "WhatsApp alerts on key changes", "Quarterly expert review call"],
  },
  {
    name: "Premium", price: "₹4,999", per: "/ month", featured: false,
    desc: "For growing businesses that need a live dashboard and dedicated monthly advisory support.",
    features: ["Everything in Business plan", "Custom MIS Dashboard (live)", "Loan portfolio tracker", "Monthly expert advisory call", "Priority document turnaround"],
  },
];

export const WHAT_INCLUDED = [
  { icon: "📋", title: "Business Health Report", desc: "A plain-language summary of how your business finances looked this month — profit, cash, and loan readiness." },
  { icon: "📱", title: "WhatsApp Alerts", desc: "Instant alert if your working capital drops, your credit score changes, or a loan renewal is coming up." },
  { icon: "📈", title: "Loan Readiness Score", desc: "Every month we tell you: if you applied for a loan today, here is your chance of approval. No surprises." },
  { icon: "🗓️", title: "Expert Review Call", desc: "A 20-minute call with our advisor to go over the report and answer your questions. Every quarter in Business plan." },
  { icon: "📊", title: "Custom Dashboard", desc: "Premium plan clients get a live dashboard with all key numbers in one place — updated monthly. (Premium only)" },
  { icon: "🔄", title: "Renewal Reminders", desc: "We track your loan renewal dates and alert you 90 days in advance so you are never caught off guard." },
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

// REMOVED: Stop loan going bad, New business setup, Personal financial planning
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
