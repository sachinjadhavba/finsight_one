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

export default function App() {
  const [page, setPage] = useState("home");
  const navigate = (p) => { setPage(p); window.scrollTo(0, 0); };

  return (
    <div style={{ fontFamily: "Arial,'Helvetica Neue',sans-serif", background: "#fff", color: "#111827", minWidth: 320 }}>
      <Nav page={page} navigate={navigate} />
      {page === "home"         && <Home navigate={navigate} />}
      {page === "check"        && <Check navigate={navigate} />}
      {page === "readiness"    && <Readiness navigate={navigate} />}
      {page === "analytics"    && <Analytics navigate={navigate} />}
      {page === "advisory"     && <Advisory navigate={navigate} />}
      {page === "docs"         && <Docs navigate={navigate} />}
      {page === "about"        && <About navigate={navigate} />}
      {page === "casestudies"  && <CaseStudies navigate={navigate} />}
      {page === "partners"     && <Partners navigate={navigate} />}
      {page === "msme"         && <MSME navigate={navigate} />}
      {page === "individuals"  && <Individuals navigate={navigate} />}
      {page === "why"          && <WhyUs navigate={navigate} />}
      {page === "blog"         && <Blog navigate={navigate} />}
      {page === "partnerlogin" && <PartnerLogin navigate={navigate} />}
      {page === "samplereport" && <SampleReport navigate={navigate} />}
      <WAButton />
    </div>
  );
}

