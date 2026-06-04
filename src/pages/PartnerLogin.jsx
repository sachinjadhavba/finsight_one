import { useState } from "react";
import Footer from "../components/Footer";

// ── Supabase config ──────────────────────────────────────────────────────────
const SUPABASE_URL = "https://ujblebpqvkbnvxiscluk.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqYmxlYnBxdmtibnZ4aXNjbHVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMTkyMjUsImV4cCI6MjA5Mzc5NTIyNX0.usaa2zaABViXVsVfRvKJme-euj3K61hHfeyjIIItWVY";

const sb = async (path, opts = {}) => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...opts,
    headers: {
      apikey: SUPABASE_ANON,
      Authorization: `Bearer ${SUPABASE_ANON}`,
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
  });
  if (!res.ok) throw new Error(await res.text());
  const text = await res.text();
  return text ? JSON.parse(text) : null;
};

// Simple bcrypt-compatible check via Supabase RPC (or plain compare for MVP)
// We use Supabase's pgcrypto: SELECT crypt(input, stored_hash) = stored_hash
const verifyPassword = async (username, password) => {
  const rows = await sb(
    `partners?username=eq.${encodeURIComponent(username)}&active=eq.true&select=id,username,password_hash,name,firm,partner_code,city,type`
  );
  if (!rows || rows.length === 0) return null;
  const partner = rows[0];

  // Verify via Supabase RPC using pgcrypto crypt()
  const rpc = await fetch(`${SUPABASE_URL}/rest/v1/rpc/verify_partner_password`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON,
      Authorization: `Bearer ${SUPABASE_ANON}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ p_password: password, p_hash: partner.password_hash }),
  });
  const match = await rpc.json();
  if (!match) return null;
  return partner;
};

const fetchDashboard = async (partnerCode) => {
  const [referrals, payouts] = await Promise.all([
    sb(`referrals?partner_code=eq.${encodeURIComponent(partnerCode)}&order=created_at.desc&select=*`),
    sb(`partner_payouts?partner_id=eq.${encodeURIComponent(partnerCode)}&paid=eq.Yes&order=payment_date.desc&select=payout_id,payout_date,payment_date,payout_amount,payment_mode,utr_number,cases_converted`),
  ]);
  return { referrals: referrals || [], payouts: payouts || [] };
};

// ── Tokens ───────────────────────────────────────────────────────────────────
const INDIGO = "#4F46E5";
const ORANGE = "#EA580C";
const DARK   = "#0F172A";
const MUTED  = "#64748B";
const WHITE  = "#FFFFFF";
const SURFACE = "#F8FAFC";
const BORDER = "#E2E8F0";

const statusColors = {
  Submitted:  { bg: "#EFF6FF", color: "#1D4ED8" },
  Processing: { bg: "#FEF3C7", color: "#92400E" },
  Approved:   { bg: "#DCFCE7", color: "#166534" },
  Disbursed:  { bg: "#DCFCE7", color: "#166534" },
  Rejected:   { bg: "#FEF2F2", color: "#991B1B" },
  Active:     { bg: "#DCFCE7", color: "#166534" },
  Paid:       { bg: "#F0FDF4", color: "#166534" },
};
const getStatus = (s) => statusColors[s] || { bg: SURFACE, color: MUTED };

const fmt = (d) => {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};
const fmtAmount = (n) => {
  if (!n) return "—";
  return `₹${Number(n).toLocaleString("en-IN")}`;
};

// ── Component ────────────────────────────────────────────────────────────────
export default function PartnerLogin({ navigate }) {
  const [step, setStep]         = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [partner, setPartner]   = useState(null);
  const [data, setData]         = useState({ referrals: [], payouts: [] });
  const [activeTab, setActiveTab] = useState("referrals");

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError("Please enter your username and password.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const p = await verifyPassword(username.trim().toLowerCase(), password);
      if (!p) { setError("Invalid username or password."); setLoading(false); return; }
      const dash = await fetchDashboard(p.partner_code);
      setPartner(p);
      setData(dash);
      setStep("dashboard");
    } catch (e) {
      setError("Login failed. Please try again.");
      console.error(e);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    setStep("login");
    setPartner(null);
    setData({ referrals: [], payouts: [] });
    setUsername("");
    setPassword("");
    setError("");
  };

  // ── DASHBOARD ──────────────────────────────────────────────────────────────
  if (step === "dashboard" && partner) {
    const totalReferrals = data.referrals.length;
    const converted = data.referrals.filter(r =>
      ["Approved","Disbursed","Paid","Active"].includes(r.status)
    ).length;

    return (
      <div style={{ fontFamily: "'DM Sans',system-ui,sans-serif", background: SURFACE, minHeight: "100vh" }}>

        {/* Top bar */}
        <div style={{ background: DARK, padding: "0 clamp(16px,4vw,48px)", display: "flex", justifyContent: "space-between", alignItems: "center", height: 60, position: "sticky", top: 0, zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <span style={{ fontSize: 16, fontWeight: 900, color: INDIGO }}>Fin</span>
              <span style={{ fontSize: 16, fontWeight: 900, color: WHITE }}>sight</span>
              <span style={{ fontSize: 16, fontWeight: 200, color: "#94A3B8" }}>&nbsp;One</span>
              <span style={{ display: "inline-block", width: 4, height: 4, background: ORANGE, borderRadius: "50%", marginLeft: 1, marginBottom: 6 }} />
            </div>
            <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)" }} />
            <span style={{ fontSize: 11, color: "#64748B", fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" }}>Partner Portal</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => navigate("check")}
              style={{ background: ORANGE, color: WHITE, fontSize: 12, fontWeight: 700, padding: "7px 14px", borderRadius: 6, border: "none", cursor: "pointer" }}>
              + Refer Client
            </button>
            <button
              onClick={handleLogout}
              style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "#94A3B8", fontSize: 12, padding: "7px 14px", borderRadius: 6, cursor: "pointer" }}>
              Sign Out
            </button>
          </div>
        </div>

        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "28px clamp(16px,4vw,32px) 60px" }}>

          {/* Partner header */}
          <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "20px 24px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: DARK, marginBottom: 2 }}>{partner.name}</div>
              <div style={{ fontSize: 13, color: MUTED }}>{partner.firm} &nbsp;·&nbsp; {partner.city} &nbsp;·&nbsp; <span style={{ color: INDIGO, fontWeight: 700 }}>{partner.type}</span></div>
            </div>
            <div style={{ background: "#EEF2FF", border: "1px solid #C7D2FE", borderRadius: 8, padding: "10px 16px", textAlign: "right" }}>
              <div style={{ fontSize: 10, color: "#6366F1", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>Partner Code</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: INDIGO, letterSpacing: 2 }}>{partner.partner_code}</div>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 12, marginBottom: 20 }}>
            {[
              { label: "Total Referrals", value: totalReferrals, accent: DARK },
              { label: "Converted",       value: converted,      accent: "#16A34A" },
              { label: "In Progress",     value: totalReferrals - converted, accent: INDIGO },
              { label: "Payouts Received",value: data.payouts.length,        accent: ORANGE },
            ].map(s => (
              <div key={s.label} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "16px 18px" }}>
                <div style={{ fontSize: 11, color: MUTED, marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8 }}>{s.label}</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: s.accent, lineHeight: 1 }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Referral link */}
          <div style={{ background: "#EEF2FF", border: "1px solid #C7D2FE", borderRadius: 10, padding: "14px 18px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <div>
              <div style={{ fontSize: 11, color: "#6366F1", fontWeight: 700, marginBottom: 3, textTransform: "uppercase", letterSpacing: 0.8 }}>Your Referral Link</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: INDIGO }}>finsightone.co/check?ref={partner.partner_code}</div>
            </div>
            <button
              onClick={() => navigator.clipboard?.writeText(`https://finsightone.co/check?ref=${partner.partner_code}`)}
              style={{ background: INDIGO, color: WHITE, fontSize: 12, fontWeight: 700, padding: "8px 16px", borderRadius: 6, border: "none", cursor: "pointer" }}>
              Copy Link
            </button>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 4, marginBottom: 16, borderBottom: `2px solid ${BORDER}` }}>
            {[
              { id: "referrals", label: `Referrals (${totalReferrals})` },
              { id: "payouts",   label: `Payouts (${data.payouts.length})` },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: "transparent", border: "none", cursor: "pointer",
                  padding: "10px 16px", fontSize: 13, fontWeight: 700,
                  color: activeTab === tab.id ? INDIGO : MUTED,
                  borderBottom: activeTab === tab.id ? `2px solid ${INDIGO}` : "2px solid transparent",
                  marginBottom: -2,
                }}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Referrals tab */}
          {activeTab === "referrals" && (
            <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden" }}>
              {data.referrals.length === 0 ? (
                <div style={{ padding: "48px 24px", textAlign: "center" }}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>📋</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: DARK, marginBottom: 6 }}>No referrals yet</div>
                  <div style={{ fontSize: 13, color: MUTED, marginBottom: 16 }}>Share your referral link to get started</div>
                  <button onClick={() => navigate("check")} style={{ background: ORANGE, color: WHITE, fontSize: 13, fontWeight: 700, padding: "10px 20px", borderRadius: 8, border: "none", cursor: "pointer" }}>
                    Refer Your First Client →
                  </button>
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                    <thead>
                      <tr style={{ background: SURFACE }}>
                        {["Client Name", "Service", "Date", "Status"].map(h => (
                          <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, borderBottom: `1px solid ${BORDER}` }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.referrals.map((r, i) => {
                        const sc = getStatus(r.status);
                        return (
                          <tr key={i} style={{ borderBottom: `1px solid ${SURFACE}` }}>
                            <td style={{ padding: "12px 16px", fontWeight: 600, color: DARK }}>{r.client_name}</td>
                            <td style={{ padding: "12px 16px", color: "#475569" }}>{r.service || "—"}</td>
                            <td style={{ padding: "12px 16px", color: MUTED, fontSize: 12 }}>{fmt(r.created_at)}</td>
                            <td style={{ padding: "12px 16px" }}>
                              <span style={{ ...sc, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, display: "inline-block" }}>{r.status}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Payouts tab — only paid rows */}
          {activeTab === "payouts" && (
            <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden" }}>
              {data.payouts.length === 0 ? (
                <div style={{ padding: "48px 24px", textAlign: "center" }}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>💳</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: DARK, marginBottom: 6 }}>No payouts yet</div>
                  <div style={{ fontSize: 13, color: MUTED }}>Completed payouts will appear here once processed.</div>
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                    <thead>
                      <tr style={{ background: SURFACE }}>
                        {["Payout ID", "Cases", "Amount", "Requested", "Paid On", "Mode", "UTR"].map(h => (
                          <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, borderBottom: `1px solid ${BORDER}` }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.payouts.map((p, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${SURFACE}` }}>
                          <td style={{ padding: "12px 16px", fontWeight: 600, color: DARK, fontSize: 12 }}>{p.payout_id || "—"}</td>
                          <td style={{ padding: "12px 16px", color: "#475569" }}>{p.cases_converted ?? "—"}</td>
                          <td style={{ padding: "12px 16px", fontWeight: 800, color: "#16A34A" }}>{fmtAmount(p.payout_amount)}</td>
                          <td style={{ padding: "12px 16px", color: MUTED, fontSize: 12 }}>{fmt(p.payout_date)}</td>
                          <td style={{ padding: "12px 16px", color: MUTED, fontSize: 12 }}>{fmt(p.payment_date)}</td>
                          <td style={{ padding: "12px 16px", color: "#475569" }}>{p.payment_mode || "—"}</td>
                          <td style={{ padding: "12px 16px", color: MUTED, fontSize: 11, fontFamily: "monospace" }}>{p.utr_number || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Footer note */}
          <div style={{ marginTop: 20, textAlign: "center", fontSize: 12, color: "#94A3B8" }}>
            For any queries contact <a href="mailto:info@finsightone.co" style={{ color: INDIGO, textDecoration: "none", fontWeight: 600 }}>info@finsightone.co</a>
          </div>
        </div>

        <Footer navigate={navigate} />
      </div>
    );
  }

  // ── LOGIN ───────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${DARK} 0%, #1E1B4B 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px", fontFamily: "'DM Sans',system-ui,sans-serif" }}>

      <div style={{ background: WHITE, borderRadius: 16, padding: "36px 32px", width: "100%", maxWidth: 400, boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ display: "inline-flex", alignItems: "baseline", marginBottom: 6 }}>
            <span style={{ fontSize: 24, fontWeight: 900, color: INDIGO }}>Fin</span>
            <span style={{ fontSize: 24, fontWeight: 900, color: DARK }}>sight</span>
            <span style={{ fontSize: 24, fontWeight: 200, color: INDIGO }}>&nbsp;One</span>
            <span style={{ display: "inline-block", width: 5, height: 5, background: ORANGE, borderRadius: "50%", marginLeft: 2, marginBottom: 8 }} />
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: DARK, marginBottom: 3 }}>Partner Portal</div>
          <div style={{ fontSize: 13, color: MUTED }}>Sign in to view your referrals and payouts</div>
        </div>

        {error && (
          <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#DC2626", marginBottom: 16, fontWeight: 500 }}>
            {error}
          </div>
        )}

        {/* Username */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.6 }}>Username</label>
          <input
            type="text"
            placeholder="Your username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            autoComplete="username"
            style={{ width: "100%", border: `1.5px solid ${BORDER}`, borderRadius: 8, padding: "11px 14px", fontSize: 14, boxSizing: "border-box", fontFamily: "inherit", outline: "none", transition: "border-color 0.2s" }}
            onFocus={e => e.target.style.borderColor = INDIGO}
            onBlur={e => e.target.style.borderColor = BORDER}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.6 }}>Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              autoComplete="current-password"
              style={{ width: "100%", border: `1.5px solid ${BORDER}`, borderRadius: 8, padding: "11px 42px 11px 14px", fontSize: 14, boxSizing: "border-box", fontFamily: "inherit", outline: "none", transition: "border-color 0.2s" }}
              onFocus={e => e.target.style.borderColor = INDIGO}
              onBlur={e => e.target.style.borderColor = BORDER}
            />
            <button
              onClick={() => setShowPass(!showPass)}
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: MUTED, fontSize: 13, padding: 0 }}>
              {showPass ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{ width: "100%", background: loading ? "#A5B4FC" : INDIGO, color: WHITE, fontSize: 14, fontWeight: 700, padding: "13px", borderRadius: 8, border: "none", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", marginBottom: 16, transition: "background 0.2s" }}>
          {loading ? "Signing in…" : "Sign In →"}
        </button>

        <div style={{ textAlign: "center", fontSize: 13, color: MUTED }}>
          Not a partner yet?{" "}
          <span onClick={() => navigate("partners")} style={{ color: INDIGO, fontWeight: 700, cursor: "pointer" }}>
            Register here
          </span>
        </div>
      </div>

      <div style={{ marginTop: 20, fontSize: 12, color: "rgba(255,255,255,0.3)", textAlign: "center" }}>
        Access is by invitation only · <a href="mailto:info@finsightone.co" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>info@finsightone.co</a>
      </div>
    </div>
  );
}
