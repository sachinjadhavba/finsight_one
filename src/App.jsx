import { useState } from "react";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Check from "./pages/Check";
import Analytics from "./pages/Analytics";
import Advisory from "./pages/Advisory";
import About from "./pages/About";

export default function App() {
  const [page, setPage] = useState("home");

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
    </div>
  );
}
