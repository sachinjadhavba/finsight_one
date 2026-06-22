import { useState } from "react";
import Nav from "./components/Nav";
import WAButton from "./components/WAButton";
import Home from "./pages/Home";
import Check from "./pages/Check";
import Analytics from "./pages/Analytics";
import Advisory from "./pages/Advisory";
import About from "./pages/About";
import ReportViewer from "./pages/ReportViewer";
import PaymentSuccess from "./pages/PaymentSuccess";

// Detect special URL-based routes before rendering the SPA
function detectRoute() {
  const path = window.location.pathname;
  // /report/:case_id/:round  e.g. /report/FO-1782127202668/1
  const reportMatch = path.match(/^\/report\/([^/]+)(?:\/(\d+))?/);
  if (reportMatch) return { route: "report", caseId: reportMatch[1], round: parseInt(reportMatch[2] || "1", 10) };
  // /payment-success
  if (path.startsWith("/payment-success")) return { route: "payment-success" };
  return { route: "app" };
}

const ROUTE = detectRoute();

export default function App() {
  const [page, setPage] = useState("home");

  // Full-page routes — no Nav/Footer wrapper
  if (ROUTE.route === "report") {
    return <ReportViewer caseId={ROUTE.caseId} round={ROUTE.round} />;
  }
  if (ROUTE.route === "payment-success") {
    return <PaymentSuccess />;
  }

  const navigate = (p) => {
    setPage(p);
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',Arial,sans-serif", background: "#fff", color: "#111827", minWidth: 320 }}>
      <Nav page={page} navigate={navigate} />
      {page === "home"     && <Home navigate={navigate} />}
      {page === "check"    && <Check navigate={navigate} />}
      {page === "analytics"&& <Analytics navigate={navigate} />}
      {page === "advisory" && <Advisory navigate={navigate} />}
      {page === "about"    && <About navigate={navigate} />}
      <WAButton />
    </div>
  );
}
