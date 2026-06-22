import { useState } from "react";
import Nav from "./components/Nav";
import WAButton from "./components/WAButton";
import Home from "./pages/Home";
import Check from "./pages/Check";
import Analytics from "./pages/Analytics";
import Advisory from "./pages/Advisory";
import Docs from "./pages/Docs";
import About from "./pages/About";
import CaseStudies from "./pages/CaseStudies";
import Partners from "./pages/Partners";
import MSME from "./pages/MSME";
import Individuals from "./pages/Individuals";
import WhyUs from "./pages/WhyUs";
import Blog from "./pages/Blog";
import PartnerLogin from "./pages/PartnerLogin";
import SampleReport from "./pages/SampleReport";
import Readiness from "./pages/Readiness";
import AdminDashboard from "./pages/AdminDashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ReportViewer from "./pages/ReportViewer";
import PaymentSuccess from "./pages/PaymentSuccess";

const PATH_MAP = {
  "/partners": "partners",
  "/check": "check",
  "/readiness": "readiness",
  "/analytics": "analytics",
  "/advisory": "advisory",
  "/docs": "docs",
  "/about": "about",
  "/casestudies": "casestudies",
  "/msme": "msme",
  "/individuals": "individuals",
  "/why": "why",
  "/blog": "blog",
  "/partner-login": "partnerlogin",
  "/samplereport": "samplereport",
  "/admin": "admin",
  "/privacy-policy": "privacypolicy",
};

function getInitialPage() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  return PATH_MAP[path] || "home";
}

function detectRoute() {
  const path = window.location.pathname;
  const reportMatch = path.match(/^\/report\/([^/]+)(?:\/(\d+))?/);
  if (reportMatch) return { route: "report", caseId: reportMatch[1], round: parseInt(reportMatch[2] || "1", 10) };
  if (path.startsWith("/payment-success")) return { route: "payment-success" };
  return { route: "app" };
}

const ROUTE = detectRoute();

export default function App() {
  const [page, setPage] = useState(getInitialPage);
  const navigate = (p) => { setPage(p); window.scrollTo(0, 0); };
  const isPortal = page === "partnerlogin" || page === "admin";

  if (ROUTE.route === "report") return <ReportViewer caseId={ROUTE.caseId} round={ROUTE.round} />;
  if (ROUTE.route === "payment-success") return <PaymentSuccess />;

  return (
    <div style={{ fontFamily: "Arial,sans-serif", background: "#fff", color: "#111827", minWidth: 320 }}>
      {!isPortal && <Nav page={page} navigate={navigate} />}
      {page === "home" && <Home navigate={navigate} />}
      {page === "check" && <Check navigate={navigate} />}
      {page === "readiness" && <Readiness navigate={navigate} />}
      {page === "admin" && <AdminDashboard navigate={navigate} />}
      {page === "analytics" && <Analytics navigate={navigate} />}
      {page === "advisory" && <Advisory navigate={navigate} />}
      {page === "docs" && <Docs navigate={navigate} />}
      {page === "about" && <About navigate={navigate} />}
      {page === "casestudies" && <CaseStudies navigate={navigate} />}
      {page === "partners" && <Partners navigate={navigate} />}
      {page === "msme" && <MSME navigate={navigate} />}
      {page === "individuals" && <Individuals navigate={navigate} />}
      {page === "why" && <WhyUs navigate={navigate} />}
      {page === "blog" && <Blog navigate={navigate} />}
      {page === "partnerlogin" && <PartnerLogin navigate={navigate} />}
      {page === "samplereport" && <SampleReport navigate={navigate} />}
      {page === "privacypolicy" && <PrivacyPolicy navigate={navigate} />}
      {!isPortal && <WAButton />}
    </div>
  );
}
