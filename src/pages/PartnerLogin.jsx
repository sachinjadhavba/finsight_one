import { useState } from "react";

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

const verifyPassword = async (username, password) => {
  const rows = await sb(
    `partners?username=eq.${encodeURIComponent(username)}&active=eq.true&select=id,username,password_hash,name,firm,partner_code,city,type`
  );
  if (!rows || rows.length === 0) return null;
  const partner = rows[0];
  const rpc = await fetch(`${SUPABASE_URL}/rest/v1/rpc/verify_partner_password`, {
    method: "POST",
    headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}`, "Content-Type": "application/json" },
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

// ── Design tokens ─────────────────────────────────────────────────────────
const C = {
  indigo: "#4F46E5", orange: "#EA580C", dark: "#0F172A", muted: "#64748B",
  white: "#FFFFFF", surface: "#F8FAFC", border: "#E2E8F0", light: "#EEF2FF",
};

const statusBadge = (s) => {
  const map = {
    Submitted:  { bg: "#EFF6FF", color: "#1D4ED8" },
    Processing: { bg: "#FEF3C7", color: "#92400E" },
    Approved:   { bg: "#DCFCE7", color: "#166534" },
    Disbursed:  { bg: "#DCFCE7", color: "#166534" },
    Rejected:   { bg: "#FEF2F2", color: "#991B1B" },
    Active:     { bg: "#DCFCE7", color: "#166534" },
    Paid:       { bg: "#F0FDF4", color: "#166534" },
  };
  return map[s] || { bg: C.surface, color: C.muted };
};

const fmt = (d) => d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";
const fmtAmt = (n) => n ? `₹${Number(n).toLocaleString("en-IN")}` : "—";

const REFERRAL_TYPES = ["Loan (Individual)", "Loan (MSME)", "Readiness Report", "Monitoring Report"];

const Logo = ({ light }) => (
  <div style={{ display: "flex", alignItems: "baseline", gap: 0 }}>
    <span style={{ fontSize: 18, fontWeight: 900, color: C.indigo }}>Fin</span>
    <span style={{ fontSize: 18, fontWeight: 900, color: light ? C.white : C.dark }}>sight</span>
    <span style={{ fontSize: 18, fontWeight: 200, color: light ? "#94A3B8" : C.muted }}>&nbsp;One</span>
    <span style={{ display: "inline-block", width: 4, height: 4, background: C.orange, borderRadius: "50%", marginLeft: 1, marginBottom: 6 }} />
  </div>
);

// ── REFER MODAL ────────────────────────────────────────────────────────────
function ReferModal({ partnerCode, onClose }) {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const submit = async () => {
    if (!type || !name.trim() || !mobile.trim()) { setErr("All fields required."); return; }
    if (!/^[6-9]\d{9}$/.test(mobile.trim())) { setErr("Enter valid 10-digit mobile number."); return; }
    setLoading(true); setErr("");
    try {
      await sb("referrals", {
        method: "POST",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({
          partner_code: partnerCode,
          client_name: name.trim(),
          service: type,
          referral_type: type,
          status: "Submitted",
        }),
      });
      setSubmitted(true);
    } catch (e) { setErr("Failed to submit. Try again."); }
    setLoading(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.7)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: C.white, borderRadius: 16, padding: "32px 28px", width: "100%", maxWidth: 440, boxShadow: "0 24px 64px rgba(0,0,0,0.25)" }}>
        {submitted ? (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.dark, marginBottom: 8 }}>Referral Submitted!</div>
            <div style={{ fontSize: 14, color: C.muted, marginBottom: 24 }}>We'll reach out to your client within 24 hours.</div>
            <button onClick={onClose} style={{ background: C.indigo, color: C.white, border: "none", borderRadius: 8, padding: "11px 28px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Done</button>
          </div>
        ) : (
          <>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.dark, marginBottom: 4 }}>Refer a Client</div>
            <div style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>Select the service type and enter client details</div>

            {/* Service type */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.6 }}>Service Type</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {REFERRAL_TYPES.map(t => (
                  <button key={t} onClick={() => setType(t)}
                    style={{ padding: "10px 12px", borderRadius: 8, border: `2px solid ${type === t ? C.indigo : C.border}`, background: type === t ? C.light : C.white, color: type === t ? C.indigo : C.muted, fontSize: 13, fontWeight: type === t ? 700 : 500, cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
                    {t === "Loan (Individual)" && "🏠 "}
                    {t === "Loan (MSME)" && "🏭 "}
                    {t === "Readiness Report" && "📋 "}
                    {t === "Monitoring Report" && "📊 "}
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Client name */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.6 }}>Client Name</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name"
                style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 14, boxSizing: "border-box", fontFamily: "inherit" }} />
            </div>

            {/* Mobile */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.6 }}>Client Mobile</label>
              <input value={mobile} onChange={e => setMobile(e.target.value)} placeholder="10-digit mobile number" maxLength={10}
                style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 14, boxSizing: "border-box", fontFamily: "inherit" }} />
            </div>

            {err && <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "9px 14px", fontSize: 13, color: "#DC2626", marginBottom: 14 }}>{err}</div>}

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={onClose} style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "11px", fontSize: 14, fontWeight: 600, cursor: "pointer", color: C.muted }}>Cancel</button>
              <button onClick={submit} disabled={loading}
                style={{ flex: 2, background: loading ? "#A5B4FC" : C.indigo, color: C.white, border: "none", borderRadius: 8, padding: "11px", fontSize: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}>
                {loading ? "Submitting…" : "Submit Referral →"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── PORTAL PAGES ───────────────────────────────────────────────────────────
function PortalHome({ partner, onNavigate }) {
  return (
    <div>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${C.dark} 0%, #1E1B4B 100%)`, padding: "48px 32px", textAlign: "center", color: C.white }}>
        <div style={{ fontSize: 13, color: "#818CF8", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Welcome back</div>
        <div style={{ fontSize: 28, fontWeight: 900, marginBottom: 6 }}>{partner.name}</div>
        <div style={{ fontSize: 14, color: "#94A3B8", marginBottom: 20 }}>{partner.firm} · {partner.city} · <span style={{ color: "#818CF8" }}>{partner.type}</span></div>
        <div style={{ display: "inline-flex", background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 20px", gap: 16 }}>
          <span style={{ fontSize: 11, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 1 }}>Partner Code</span>
          <span style={{ fontSize: 16, fontWeight: 900, color: "#818CF8", letterSpacing: 3 }}>{partner.partner_code}</span>
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 20px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>Quick Actions</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14 }}>
          {[
            { icon: "📋", label: "My Dashboard", desc: "Referrals & payouts", page: "dashboard" },
            { icon: "➕", label: "Refer a Client", desc: "Submit new referral", page: "refer" },
            { icon: "💳", label: "Earnings", desc: "View payout history", page: "earnings" },
            { icon: "❓", label: "FAQs", desc: "Common questions", page: "faqs" },
          ].map(a => (
            <button key={a.page} onClick={() => onNavigate(a.page)}
              style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 16px", textAlign: "left", cursor: "pointer", transition: "box-shadow 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(79,70,229,0.12)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{a.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: C.dark, marginBottom: 3 }}>{a.label}</div>
              <div style={{ fontSize: 12, color: C.muted }}>{a.desc}</div>
            </button>
          ))}
        </div>

        {/* How it works */}
        <div style={{ marginTop: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>How It Works</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              ["1", "Refer a client", "Submit their name, mobile, and service type"],
              ["2", "We reach out", "Our team contacts them within 24 hours"],
              ["3", "Case converts", "Loan sanctioned or report delivered"],
              ["4", "You get paid", "Payout credited after case closure"],
            ].map(([n, title, desc]) => (
              <div key={n} style={{ display: "flex", gap: 16, padding: "14px 0", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ width: 28, height: 28, background: C.light, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: C.indigo, flexShrink: 0, marginTop: 2 }}>{n}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.dark, marginBottom: 2 }}>{title}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PortalDashboard({ partner, data, onRefer }) {
  const converted = data.referrals.filter(r => ["Approved","Disbursed","Paid","Active"].includes(r.status)).length;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 20px 60px" }}>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Total Referrals", value: data.referrals.length, color: C.dark },
          { label: "Converted",       value: converted,             color: "#16A34A" },
          { label: "In Progress",     value: data.referrals.length - converted, color: C.indigo },
          { label: "Payouts Received",value: data.payouts.length,   color: C.orange },
        ].map(s => (
          <div key={s.label} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 18px" }}>
            <div style={{ fontSize: 10, color: C.muted, marginBottom: 6, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8 }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Referral link */}
      <div style={{ background: C.light, border: `1px solid #C7D2FE`, borderRadius: 10, padding: "14px 18px", marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <div>
          <div style={{ fontSize: 10, color: "#6366F1", fontWeight: 700, marginBottom: 3, textTransform: "uppercase", letterSpacing: 0.8 }}>Your Referral Link</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.indigo }}>finsightone.co/check?ref={partner.partner_code}</div>
        </div>
        <button onClick={() => navigator.clipboard?.writeText(`https://finsightone.co/check?ref=${partner.partner_code}`)}
          style={{ background: C.indigo, color: C.white, fontSize: 12, fontWeight: 700, padding: "8px 16px", borderRadius: 6, border: "none", cursor: "pointer" }}>
          Copy Link
        </button>
      </div>

      {/* Referrals table */}
      <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden", marginBottom: 24 }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: C.dark }}>My Referrals</div>
          <button onClick={onRefer}
            style={{ background: C.orange, color: C.white, fontSize: 12, fontWeight: 700, padding: "8px 16px", borderRadius: 6, border: "none", cursor: "pointer" }}>
            + Refer Client
          </button>
        </div>

        {data.referrals.length === 0 ? (
          <div style={{ padding: "40px 24px", textAlign: "center" }}>
            <div style={{ fontSize: 30, marginBottom: 10 }}>📋</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.dark, marginBottom: 6 }}>No referrals yet</div>
            <div style={{ fontSize: 13, color: C.muted }}>Click "Refer Client" to submit your first referral</div>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: C.surface }}>
                  {["Sl No", "Client Name", "Referral Type", "Status", "Payout"].map(h => (
                    <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 0.8, borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.referrals.map((r, i) => {
                  const sc = statusBadge(r.status);
                  return (
                    <tr key={i} style={{ borderBottom: `1px solid ${C.surface}` }}
                      onMouseEnter={e => e.currentTarget.style.background = C.surface}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <td style={{ padding: "12px 16px", color: C.muted, fontSize: 12 }}>{i + 1}</td>
                      <td style={{ padding: "12px 16px", fontWeight: 600, color: C.dark }}>{r.client_name}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ fontSize: 12, color: "#6366F1", background: C.light, padding: "3px 10px", borderRadius: 20, fontWeight: 600, whiteSpace: "nowrap" }}>
                          {r.referral_type || r.service || "—"}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ ...sc, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, display: "inline-block", whiteSpace: "nowrap" }}>{r.status}</span>
                      </td>
                      <td style={{ padding: "12px 16px", fontWeight: 700, color: r.payout_amount ? "#16A34A" : C.muted }}>
                        {r.payout_amount ? fmtAmt(r.payout_amount) : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function PortalEarnings({ data }) {
  const total = data.payouts.reduce((s, p) => s + (Number(p.payout_amount) || 0), 0);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 20px 60px" }}>
      <div style={{ fontSize: 20, fontWeight: 900, color: C.dark, marginBottom: 4 }}>Earnings Statement</div>
      <div style={{ fontSize: 13, color: C.muted, marginBottom: 24 }}>All credited payouts are shown below</div>

      {/* Total card */}
      <div style={{ background: `linear-gradient(135deg, ${C.dark} 0%, #1E1B4B 100%)`, borderRadius: 12, padding: "24px 28px", marginBottom: 24, color: C.white }}>
        <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Total Earnings Received</div>
        <div style={{ fontSize: 36, fontWeight: 900, color: "#4ADE80" }}>{fmtAmt(total)}</div>
        <div style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>{data.payouts.length} payout{data.payouts.length !== 1 ? "s" : ""} credited</div>
      </div>

      <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
        {data.payouts.length === 0 ? (
          <div style={{ padding: "48px 24px", textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>💳</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.dark, marginBottom: 6 }}>No payouts yet</div>
            <div style={{ fontSize: 13, color: C.muted }}>Credited payouts will appear here once processed by FinsightOne.</div>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: C.surface }}>
                  {["Payout ID", "Cases", "Amount", "Requested On", "Paid On", "Mode", "UTR Ref"].map(h => (
                    <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 0.8, borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.payouts.map((p, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${C.surface}` }}
                    onMouseEnter={e => e.currentTarget.style.background = C.surface}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <td style={{ padding: "12px 16px", fontWeight: 600, color: C.dark, fontSize: 12 }}>{p.payout_id || "—"}</td>
                    <td style={{ padding: "12px 16px", color: "#475569" }}>{p.cases_converted ?? "—"}</td>
                    <td style={{ padding: "12px 16px", fontWeight: 800, color: "#16A34A" }}>{fmtAmt(p.payout_amount)}</td>
                    <td style={{ padding: "12px 16px", color: C.muted, fontSize: 12 }}>{fmt(p.payout_date)}</td>
                    <td style={{ padding: "12px 16px", color: C.muted, fontSize: 12 }}>{fmt(p.payment_date)}</td>
                    <td style={{ padding: "12px 16px", color: "#475569" }}>{p.payment_mode || "—"}</td>
                    <td style={{ padding: "12px 16px", color: C.muted, fontSize: 11, fontFamily: "monospace" }}>{p.utr_number || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function PortalFAQs() {
  const [open, setOpen] = useState(null);
  const faqs = [
    ["How do I refer a client?", "Click 'Refer a Client' from the menu or dashboard. Select the service type, enter the client's name and mobile number, and submit. Our team will contact them within 24 hours."],
    ["What services can I refer clients for?", "You can refer clients for: Loan (Individual), Loan (MSME), Loan Readiness Reports, and Monthly Monitoring Reports."],
    ["When will I receive my payout?", "Payouts are processed after case closure — loan disbursement or report delivery. Once processed by FinsightOne, the amount and payment details will appear in your Earnings Statement."],
    ["How is the payout calculated?", "Payout rates are shared privately during your onboarding call and vary by service type. Rates are not displayed on the portal."],
    ["Can I track the status of my referrals?", "Yes. Your Dashboard shows the current status of every referral — Submitted, Processing, Approved, Disbursed, or Rejected."],
    ["What does each referral status mean?", "Submitted — received by us. Processing — under review. Approved — loan/report approved. Disbursed — loan released or report delivered. Rejected — case did not qualify."],
    ["How do I update my profile or banking details?", "Contact us at info@finsightone.co or WhatsApp us directly. We will update your details after verification."],
    ["My referral link — can I share it?", "Yes. Your unique referral link auto-tags referrals to your partner code. Share it freely via WhatsApp, email, or social media."],
  ];

  return (
    <div style={{ maxWidth: 750, margin: "0 auto", padding: "28px 20px 60px" }}>
      <div style={{ fontSize: 20, fontWeight: 900, color: C.dark, marginBottom: 4 }}>Frequently Asked Questions</div>
      <div style={{ fontSize: 13, color: C.muted, marginBottom: 24 }}>Everything you need to know about the partner program</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {faqs.map(([q, a], i) => (
          <div key={i} style={{ background: C.white, border: `1px solid ${open === i ? "#C7D2FE" : C.border}`, borderRadius: 10, overflow: "hidden", transition: "border-color 0.2s" }}>
            <button onClick={() => setOpen(open === i ? null : i)}
              style={{ width: "100%", padding: "16px 20px", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.dark, textAlign: "left" }}>{q}</span>
              <span style={{ fontSize: 18, color: C.indigo, flexShrink: 0, transform: open === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
            </button>
            {open === i && (
              <div style={{ padding: "0 20px 16px", fontSize: 13, color: "#475569", lineHeight: 1.7 }}>{a}</div>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 32, background: C.light, borderRadius: 10, padding: "18px 20px" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.dark, marginBottom: 4 }}>Still have questions?</div>
        <div style={{ fontSize: 13, color: C.muted }}>Reach us at <a href="mailto:info@finsightone.co" style={{ color: C.indigo, fontWeight: 600 }}>info@finsightone.co</a> or WhatsApp <a href="https://wa.me/919999999999" style={{ color: C.indigo, fontWeight: 600 }}>+91 99999 99999</a></div>
      </div>
    </div>
  );
}

function PortalProfile({ partner }) {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "28px 20px 60px" }}>
      <div style={{ fontSize: 20, fontWeight: 900, color: C.dark, marginBottom: 24 }}>My Profile</div>
      <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: `linear-gradient(135deg, ${C.dark} 0%, #1E1B4B 100%)`, padding: "24px", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 52, height: 52, background: C.indigo, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900, color: C.white }}>
            {partner.name.charAt(0)}
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.white }}>{partner.name}</div>
            <div style={{ fontSize: 13, color: "#94A3B8" }}>{partner.firm}</div>
          </div>
        </div>
        <div style={{ padding: "20px 24px" }}>
          {[
            ["Partner Code", partner.partner_code],
            ["Type", partner.type],
            ["City", partner.city],
            ["Username", partner.username],
          ].map(([label, value]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 13, color: C.muted, fontWeight: 600 }}>{label}</span>
              <span style={{ fontSize: 13, color: C.dark, fontWeight: 700 }}>{value || "—"}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: "16px 24px", background: C.surface, borderTop: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 12, color: C.muted }}>To update profile details or banking information, contact <a href="mailto:info@finsightone.co" style={{ color: C.indigo, fontWeight: 600 }}>info@finsightone.co</a></div>
        </div>
      </div>
    </div>
  );
}

function PortalSupport() {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "28px 20px 60px" }}>
      <div style={{ fontSize: 20, fontWeight: 900, color: C.dark, marginBottom: 4 }}>Support</div>
      <div style={{ fontSize: 13, color: C.muted, marginBottom: 24 }}>We're here to help</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {[
          { icon: "📧", title: "Email Us", desc: "info@finsightone.co", sub: "Response within 24 hours", href: "mailto:info@finsightone.co" },
          { icon: "💬", title: "WhatsApp", desc: "+91 99999 99999", sub: "Mon–Sat, 9am–6pm", href: "https://wa.me/919999999999" },
        ].map(s => (
          <a key={s.title} href={s.href} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px", display: "flex", gap: 16, textDecoration: "none", transition: "box-shadow 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(79,70,229,0.12)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
            <div style={{ fontSize: 28 }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.dark, marginBottom: 2 }}>{s.title}</div>
              <div style={{ fontSize: 14, color: C.indigo, fontWeight: 600, marginBottom: 2 }}>{s.desc}</div>
              <div style={{ fontSize: 12, color: C.muted }}>{s.sub}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function PortalResources() {
  const resources = [
    { icon: "📄", title: "Partner Agreement", desc: "Terms and conditions of the partner program", tag: "PDF" },
    { icon: "💡", title: "Product Guide", desc: "Overview of all FinsightOne services you can refer", tag: "Guide" },
    { icon: "📊", title: "Commission Structure", desc: "Shared privately — contact us to access", tag: "Private" },
    { icon: "🎯", title: "Pitch Scripts", desc: "How to introduce FinsightOne to your clients", tag: "Guide" },
  ];
  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "28px 20px 60px" }}>
      <div style={{ fontSize: 20, fontWeight: 900, color: C.dark, marginBottom: 4 }}>Resources</div>
      <div style={{ fontSize: 13, color: C.muted, marginBottom: 24 }}>Guides and materials to help you refer better</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14 }}>
        {resources.map(r => (
          <div key={r.title} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <span style={{ fontSize: 28 }}>{r.icon}</span>
              <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20, background: r.tag === "Private" ? "#FEF2F2" : C.light, color: r.tag === "Private" ? "#DC2626" : C.indigo }}>{r.tag}</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.dark, marginBottom: 4 }}>{r.title}</div>
            <div style={{ fontSize: 12, color: C.muted }}>{r.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── MAIN PORTAL SHELL ──────────────────────────────────────────────────────
function PartnerPortal({ partner, onLogout }) {
  const [page, setPage] = useState("home");
  const [data, setData] = useState({ referrals: [], payouts: [] });
  const [loadingData, setLoadingData] = useState(true);
  const [showRefer, setShowRefer] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useState(() => {
    fetchDashboard(partner.partner_code).then(d => { setData(d); setLoadingData(false); });
  });

  const navItems = [
    { id: "home",      label: "Home",             icon: "🏠" },
    { id: "dashboard", label: "Dashboard",         icon: "📋" },
    { id: "earnings",  label: "Earnings",          icon: "💳" },
    { id: "resources", label: "Resources",         icon: "📚" },
    { id: "faqs",      label: "FAQs",              icon: "❓" },
    { id: "support",   label: "Support",           icon: "💬" },
    { id: "profile",   label: "My Profile",        icon: "👤" },
  ];

  const navigate = (p) => { setPage(p); setMobileMenu(false); if (p === "refer") { setShowRefer(true); setPage("dashboard"); } };

  return (
    <div style={{ fontFamily: "'DM Sans',system-ui,sans-serif", minHeight: "100vh", background: C.surface }}>

      {/* Top nav */}
      <div style={{ background: C.dark, position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", height: 56, gap: 12 }}>
          <Logo light />
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)", margin: "0 4px" }} />
          <span style={{ fontSize: 10, color: "#64748B", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>Partner Portal</span>

          {/* Desktop nav */}
          <div style={{ display: "flex", gap: 2, marginLeft: 16, flex: 1, flexWrap: "nowrap", overflow: "hidden" }}>
            {navItems.map(n => (
              <button key={n.id} onClick={() => navigate(n.id)}
                style={{ background: page === n.id ? "rgba(79,70,229,0.2)" : "transparent", border: "none", color: page === n.id ? "#818CF8" : "#94A3B8", fontSize: 12, fontWeight: page === n.id ? 700 : 500, padding: "6px 10px", borderRadius: 6, cursor: "pointer", whiteSpace: "nowrap" }}>
                {n.label}
              </button>
            ))}
          </div>

          <button onClick={() => setShowRefer(true)}
            style={{ background: C.orange, color: C.white, fontSize: 12, fontWeight: 700, padding: "7px 14px", borderRadius: 6, border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>
            + Refer
          </button>
          <button onClick={onLogout}
            style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "#94A3B8", fontSize: 12, padding: "7px 12px", borderRadius: 6, cursor: "pointer", whiteSpace: "nowrap" }}>
            Sign Out
          </button>
        </div>
      </div>

      {/* Page content */}
      {loadingData ? (
        <div style={{ padding: "80px 20px", textAlign: "center", color: C.muted }}>Loading your data…</div>
      ) : (
        <>
          {page === "home"      && <PortalHome partner={partner} onNavigate={navigate} />}
          {page === "dashboard" && <PortalDashboard partner={partner} data={data} onRefer={() => setShowRefer(true)} />}
          {page === "earnings"  && <PortalEarnings data={data} />}
          {page === "faqs"      && <PortalFAQs />}
          {page === "support"   && <PortalSupport />}
          {page === "profile"   && <PortalProfile partner={partner} />}
          {page === "resources" && <PortalResources />}
        </>
      )}

      {/* Refer modal */}
      {showRefer && (
        <ReferModal partnerCode={partner.partner_code} onClose={async () => {
          setShowRefer(false);
          const d = await fetchDashboard(partner.partner_code);
          setData(d);
        }} />
      )}

      {/* Footer */}
      <div style={{ background: C.dark, padding: "16px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 12, color: "#475569" }}>© 2025 FinsightOne · Partner Portal · <a href="mailto:info@finsightone.co" style={{ color: "#6366F1", textDecoration: "none" }}>info@finsightone.co</a></div>
      </div>
    </div>
  );
}

// ── LOGIN PAGE ─────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) { setError("Please enter your username and password."); return; }
    setError(""); setLoading(true);
    try {
      const p = await verifyPassword(username.trim().toLowerCase(), password);
      if (!p) { setError("Invalid username or password."); setLoading(false); return; }
      onLogin(p);
    } catch (e) {
      setError("Login failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.dark} 0%, #1E1B4B 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px", fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <div style={{ background: C.white, borderRadius: 16, padding: "36px 32px", width: "100%", maxWidth: 400, boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <Logo />
          <div style={{ marginTop: 8, fontSize: 15, fontWeight: 700, color: C.dark }}>Partner Portal</div>
          <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>Sign in to view your referrals and payouts</div>
        </div>

        {error && (
          <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#DC2626", marginBottom: 16, fontWeight: 500 }}>{error}</div>
        )}

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.6 }}>Username</label>
          <input type="text" placeholder="Your username" value={username} onChange={e => setUsername(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} autoComplete="username"
            style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "11px 14px", fontSize: 14, boxSizing: "border-box", fontFamily: "inherit", outline: "none" }} />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.6 }}>Password</label>
          <div style={{ position: "relative" }}>
            <input type={showPass ? "text" : "password"} placeholder="Your password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} autoComplete="current-password"
              style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "11px 48px 11px 14px", fontSize: 14, boxSizing: "border-box", fontFamily: "inherit", outline: "none" }} />
            <button onClick={() => setShowPass(!showPass)}
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: C.muted, fontSize: 12, fontWeight: 600 }}>
              {showPass ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button onClick={handleLogin} disabled={loading}
          style={{ width: "100%", background: loading ? "#A5B4FC" : C.indigo, color: C.white, fontSize: 14, fontWeight: 700, padding: "13px", borderRadius: 8, border: "none", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", marginBottom: 16 }}>
          {loading ? "Signing in…" : "Sign In →"}
        </button>

        <div style={{ textAlign: "center", fontSize: 13, color: C.muted }}>
          Access is by invitation only · <a href="mailto:info@finsightone.co" style={{ color: C.indigo, fontWeight: 600, textDecoration: "none" }}>Contact us</a>
        </div>
      </div>
      <div style={{ marginTop: 16, fontSize: 12, color: "rgba(255,255,255,0.25)", textAlign: "center" }}>© 2025 FinsightOne</div>
    </div>
  );
}

// ── ROOT ───────────────────────────────────────────────────────────────────
export default function PartnerLogin() {
  const [partner, setPartner] = useState(null);

  if (!partner) return <LoginPage onLogin={setPartner} />;
  return <PartnerPortal partner={partner} onLogout={() => setPartner(null)} />;
}
