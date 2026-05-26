import { useState } from "react";
import Footer from "../components/Footer";

const INDIGO = "#4F46E5";
const ORANGE = "#EA580C";
const DARK   = "#111827";
const MUTED  = "#6B7280";
const WHITE  = "#fff";
const GRAY   = "#F9FAFB";

export default function PartnerLogin({ navigate }) {
  const [step, setStep]     = useState("login");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp]       = useState("");
  const [error, setError]   = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const DEMO = {
    name: "CA Rajesh Mehta", firm: "Mehta & Associates",
    code: "RMEHTA01", city: "Pune",
    totalReferrals: 7, converted: 3,
    earned: 42500, paid: 25000, pending: 17500,
    referrals: [
      { client: "Ramesh Patil",   service: "WC Loan ₹50L",    status: "Disbursed",   commission: "₹16,875", date: "12 May 2025" },
      { client: "Priya Shah",     service: "Banker Pack",      status: "Paid",        commission: "₹2,500",  date: "08 May 2025" },
      { client: "Amit Joshi",     service: "Home Loan ₹55L",   status: "In Process",  commission: "₹12,375", date: "02 May 2025" },
      { client: "Sunita More",    service: "LAP ₹80L",         status: "Submitted",   commission: "₹18,000", date: "28 Apr 2025" },
      { client: "Vijay Kulkarni", service: "Monthly Plan",     status: "Active",      commission: "₹1,000/mo",date:"20 Apr 2025"},
    ],
  };

  const handleSendOTP = () => {
    const digits = mobile.replace(/\D/g, "");
    if (digits.length !== 10) { setError("Please enter a valid 10-digit mobile number."); return; }
    setError("");
    setOtpSent(true);
    setStep("otp");
  };

  const handleVerifyOTP = () => {
    if (otp.length < 4) { setError("Please enter the OTP sent to your mobile."); return; }
    setError("");
    setStep("dashboard");
  };

  const statusStyle = (s) => {
    if (s === "Disbursed" || s === "Paid" || s === "Active") return { bg: "#DCFCE7", color: "#166534" };
    if (s === "In Process") return { bg: "#EEF2FF", color: INDIGO };
    return { bg: GRAY, color: "#374151" };
  };

  // ── DASHBOARD ───────────────────────────────────────────────────────────────
  if (step === "dashboard") return (
    <div style={{ fontFamily: "Arial,sans-serif" }}>
      <div style={{ background: DARK, padding: "20px clamp(20px,4vw,48px)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 3, letterSpacing: 1 }}>PARTNER DASHBOARD</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: WHITE }}>{DEMO.name}</div>
          <div style={{ fontSize: 12, color: "#6B7280" }}>{DEMO.firm} · Code: <span style={{ color: ORANGE, fontWeight: 700 }}>{DEMO.code}</span></div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => navigate("check")} style={{ background: ORANGE, color: WHITE, fontSize: 12, fontWeight: 700, padding: "8px 16px", borderRadius: 6, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
            Check Client Eligibility
          </button>
          <button onClick={() => setStep("login")} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: WHITE, fontSize: 12, padding: "8px 16px", borderRadius: 6, cursor: "pointer", fontFamily: "inherit" }}>
            Sign Out
          </button>
        </div>
      </div>

      <div style={{ padding: "clamp(20px,4vw,36px) clamp(20px,4vw,48px)", maxWidth: 1100, margin: "0 auto" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14, marginBottom: 28 }}>
          {[
            { label: "Total Referrals", val: DEMO.totalReferrals, color: DARK },
            { label: "Converted",       val: DEMO.converted,      color: "#166534" },
            { label: "Total Earned",    val: `₹${(DEMO.earned/1000).toFixed(1)}K`, color: ORANGE },
            { label: "Paid Out",        val: `₹${(DEMO.paid/1000).toFixed(1)}K`,   color: INDIGO },
            { label: "Pending",         val: `₹${(DEMO.pending/1000).toFixed(1)}K`,color: "#DC2626" },
          ].map(s => (
            <div key={s.label} style={{ background: WHITE, border: "1px solid #E5E7EB", borderRadius: 10, padding: "14px 18px" }}>
              <div style={{ fontSize: 11, color: MUTED, marginBottom: 5 }}>{s.label}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* Referral link */}
        <div style={{ background: "#EEF2FF", border: "1px solid #C7D2FE", borderRadius: 10, padding: "14px 18px", marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div>
            <div style={{ fontSize: 11, color: MUTED, marginBottom: 3 }}>Your Unique Referral Link</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: INDIGO }}>finsightone.co/check?ref={DEMO.code}</div>
          </div>
          <button onClick={() => navigator.clipboard?.writeText(`https://finsightone.co/check?ref=${DEMO.code}`)}
            style={{ background: INDIGO, color: WHITE, fontSize: 12, fontWeight: 600, padding: "8px 16px", borderRadius: 6, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
            Copy Link
          </button>
        </div>

        {/* Referrals table */}
        <div style={{ background: WHITE, border: "1px solid #E5E7EB", borderRadius: 12, overflow: "hidden", marginBottom: 24 }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid #F3F4F6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: DARK }}>My Referrals</div>
            <button onClick={() => navigate("check")} style={{ background: GRAY, color: "#374151", fontSize: 12, fontWeight: 600, padding: "6px 14px", borderRadius: 6, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
              + Refer New Client
            </button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: GRAY }}>
                  {["Client","Service","Date","Status","Commission"].map(h => (
                    <th key={h} style={{ padding: "9px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, borderBottom: "1px solid #E5E7EB" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DEMO.referrals.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #F9FAFB" }}>
                    <td style={{ padding: "11px 14px", fontWeight: 600, color: DARK }}>{r.client}</td>
                    <td style={{ padding: "11px 14px", color: "#374151" }}>{r.service}</td>
                    <td style={{ padding: "11px 14px", color: "#9CA3AF", fontSize: 12 }}>{r.date}</td>
                    <td style={{ padding: "11px 14px" }}>
                      <span style={{ ...statusStyle(r.status), fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, display: "inline-block" }}>{r.status}</span>
                    </td>
                    <td style={{ padding: "11px 14px", fontWeight: 700, color: "#166534" }}>{r.commission}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payout */}
        <div style={{ background: "#FEF3C7", border: "1px solid #FDE68A", borderRadius: 10, padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#92400E", marginBottom: 3 }}>Pending Payout: ₹17,500</div>
            <div style={{ fontSize: 12, color: "#B45309" }}>Payouts processed every Friday. Add your bank account to receive payments.</div>
          </div>
          <button style={{ background: ORANGE, color: WHITE, fontSize: 13, fontWeight: 700, padding: "10px 20px", borderRadius: 6, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
            Request Payout →
          </button>
        </div>
      </div>
      <Footer navigate={navigate} />
    </div>
  );

  // ── LOGIN / OTP ──────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "80vh", background: GRAY, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px", fontFamily: "Arial,sans-serif" }}>
      <div style={{ background: WHITE, borderRadius: 16, padding: "36px 32px", width: "100%", maxWidth: 400, border: "1px solid #E5E7EB", boxShadow: "0 4px 24px rgba(79,70,229,0.08)" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ display: "inline-flex", alignItems: "baseline", marginBottom: 4 }}>
            <span style={{ fontFamily: "Arial,sans-serif", fontSize: 22, fontWeight: 900, color: INDIGO }}>Fin</span>
            <span style={{ fontFamily: "Arial,sans-serif", fontSize: 22, fontWeight: 900, color: DARK }}>sight</span>
            <span style={{ fontFamily: "Arial,sans-serif", fontSize: 22, fontWeight: 200, color: INDIGO }}>&nbsp;One</span>
            <span style={{ display: "inline-block", width: 5, height: 5, background: ORANGE, borderRadius: "50%", marginLeft: 2, marginBottom: 7 }} />
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: DARK, marginBottom: 4 }}>Partner Portal</div>
          <div style={{ fontSize: 13, color: MUTED }}>
            {step === "login" ? "Enter your registered mobile number" : `OTP sent to +91 ${mobile}`}
          </div>
        </div>

        {error && (
          <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "9px 12px", fontSize: 13, color: "#DC2626", marginBottom: 14 }}>{error}</div>
        )}

        {step === "login" ? (
          <>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 5 }}>Mobile Number</label>
              <input type="tel" placeholder="10-digit mobile number" maxLength={10}
                value={mobile} onChange={e => setMobile(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSendOTP()}
                style={{ width: "100%", border: "1px solid #D1D5DB", borderRadius: 8, padding: "11px 14px", fontSize: 14, boxSizing: "border-box", fontFamily: "inherit" }}
              />
            </div>
            <button onClick={handleSendOTP} style={{ width: "100%", background: INDIGO, color: WHITE, fontSize: 14, fontWeight: 700, padding: 13, borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit", marginBottom: 12 }}>
              Send OTP →
            </button>
            <div style={{ textAlign: "center", fontSize: 13, color: MUTED }}>
              Not a partner yet?{" "}
              <span onClick={() => navigate("partners")} style={{ color: INDIGO, fontWeight: 600, cursor: "pointer" }}>Register here</span>
            </div>
          </>
        ) : (
          <>
            <div style={{ background: "#EEF2FF", borderRadius: 8, padding: "9px 12px", fontSize: 13, color: INDIGO, fontWeight: 500, marginBottom: 14 }}>
              OTP sent to +91 {mobile} — check your SMS
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 5 }}>Enter OTP</label>
              <input type="text" placeholder="Enter OTP" maxLength={6}
                value={otp} onChange={e => setOtp(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleVerifyOTP()}
                style={{ width: "100%", border: "1px solid #D1D5DB", borderRadius: 8, padding: "11px 14px", fontSize: 22, letterSpacing: 10, textAlign: "center", boxSizing: "border-box", fontFamily: "inherit" }}
              />
            </div>
            <button onClick={handleVerifyOTP} style={{ width: "100%", background: INDIGO, color: WHITE, fontSize: 14, fontWeight: 700, padding: 13, borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit", marginBottom: 10 }}>
              Verify & Login →
            </button>
            <button onClick={() => { setStep("login"); setOtp(""); setError(""); }} style={{ width: "100%", background: "transparent", border: "1px solid #E5E7EB", color: MUTED, fontSize: 13, padding: 10, borderRadius: 8, cursor: "pointer", fontFamily: "inherit", marginBottom: 12 }}>
              ← Back
            </button>
            <div style={{ textAlign: "center", fontSize: 11, color: "#9CA3AF" }}>
              Demo: enter any 4+ digit code to access dashboard
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
              <button onClick={handleSendOTP} style={{ background: "transparent", border: "none", color: INDIGO, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                Resend OTP
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
