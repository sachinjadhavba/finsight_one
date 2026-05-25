import { useState } from "react";
import Footer from "../components/Footer";

export default function PartnerLogin({ navigate }) {
  const [step, setStep] = useState("login"); // login | otp | dashboard
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  // Demo data — replace with Supabase auth in production
  const DEMO_PARTNER = {
    name: "CA Rajesh Mehta",
    firm: "Mehta & Associates",
    code: "RMEHTA01",
    city: "Pune",
    totalReferrals: 7,
    converted: 3,
    earned: 42500,
    paid: 25000,
    pending: 17500,
    referrals: [
      { client: "Ramesh Patil", service: "WC Loan ₹50L", status: "Disbursed", commission: "₹16,875", date: "12 May 2025" },
      { client: "Priya Shah",   service: "Banker Pack",   status: "Paid",     commission: "₹2,500",  date: "08 May 2025" },
      { client: "Amit Joshi",   service: "Home Loan ₹55L",status: "In Process",commission: "₹12,375", date: "02 May 2025" },
      { client: "Sunita More",  service: "LAP ₹80L",      status: "Submitted", commission: "₹18,000", date: "28 Apr 2025" },
      { client: "Vijay Kulkarni",service: "Monthly Plan", status: "Active",   commission: "₹1,000/mo", date: "20 Apr 2025" },
    ],
  };

  const handleSendOTP = () => {
    if (!mobile || mobile.replace(/\D/g, "").length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    setStep("otp");
  };

  const handleVerifyOTP = () => {
    if (otp.length < 4) { setError("Please enter the OTP."); return; }
    setError("");
    setStep("dashboard");
  };

  const statusColor = (s) => {
    if (s === "Disbursed" || s === "Paid" || s === "Active") return { bg: "#DCFCE7", color: "#166534" };
    if (s === "In Process") return { bg: "#EFF6FF", color: "#1D4ED8" };
    return { bg: "#F3F4F6", color: "#374151" };
  };

  if (step === "dashboard") {
    return (
      <div>
        {/* HEADER */}
        <div style={{ background: "#ffffff", padding: "24px clamp(20px,4vw,48px)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 4, letterSpacing: 1 }}>PARTNER DASHBOARD</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{DEMO_PARTNER.name}</div>
            <div style={{ fontSize: 12, color: "#64748B" }}>{DEMO_PARTNER.firm} · Code: <span style={{ color: "#E8A020", fontWeight: 700 }}>{DEMO_PARTNER.code}</span></div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => navigate("check")} style={{ background: "#E8A020", color: "#fff", fontSize: 12, fontWeight: 700, padding: "8px 16px", borderRadius: 6, border: "none", cursor: "pointer" }}>
              Check Client Eligibility
            </button>
            <button onClick={() => setStep("login")} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: 12, padding: "8px 16px", borderRadius: 6, cursor: "pointer" }}>
              Sign Out
            </button>
          </div>
        </div>

        <div style={{ padding: "clamp(24px,4vw,40px) clamp(20px,4vw,48px)", maxWidth: 1100, margin: "0 auto" }}>

          {/* STAT CARDS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 16, marginBottom: 32 }}>
            {[
              { label: "Total Referrals", val: DEMO_PARTNER.totalReferrals, color: "#0D1428" },
              { label: "Converted",       val: DEMO_PARTNER.converted,      color: "#166534" },
              { label: "Total Earned",    val: `₹${(DEMO_PARTNER.earned/1000).toFixed(1)}K`, color: "#E8A020" },
              { label: "Paid Out",        val: `₹${(DEMO_PARTNER.paid/1000).toFixed(1)}K`,   color: "#1D4ED8" },
              { label: "Pending",         val: `₹${(DEMO_PARTNER.pending/1000).toFixed(1)}K`,color: "#DC2626" },
            ].map(s => (
              <div key={s.label} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "16px 20px" }}>
                <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.val}</div>
              </div>
            ))}
          </div>

          {/* REFERRAL LINK */}
          <div style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 10, padding: "16px 20px", marginBottom: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 4 }}>Your Unique Referral Link</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#0D1428" }}>finsightone.co/check?ref={DEMO_PARTNER.code}</div>
            </div>
            <button onClick={() => navigator.clipboard?.writeText(`https://finsightone.co/check?ref=${DEMO_PARTNER.code}`)}
              style={{ background: "#ffffff", color: "#fff", fontSize: 12, fontWeight: 600, padding: "8px 16px", borderRadius: 6, border: "none", cursor: "pointer" }}>
              Copy Link
            </button>
          </div>

          {/* REFERRALS TABLE */}
          <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, overflow: "hidden", marginBottom: 32 }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #F3F4F6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>My Referrals</div>
              <button onClick={() => navigate("check")} style={{ background: "#F3F4F6", color: "#374151", fontSize: 12, fontWeight: 600, padding: "6px 14px", borderRadius: 6, border: "none", cursor: "pointer" }}>
                + Refer New Client
              </button>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#F9FAFB" }}>
                    {["Client", "Service", "Date", "Status", "Commission"].map(h => (
                      <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: 1, borderBottom: "1px solid #E5E7EB" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DEMO_PARTNER.referrals.map((r, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #F9FAFB" }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600, color: "#111827" }}>{r.client}</td>
                      <td style={{ padding: "12px 16px", color: "#374151" }}>{r.service}</td>
                      <td style={{ padding: "12px 16px", color: "#9CA3AF", fontSize: 12 }}>{r.date}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ ...statusColor(r.status), fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, display: "inline-block" }}>
                          {r.status}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px", fontWeight: 700, color: "#166534" }}>{r.commission}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* PAYOUT REQUEST */}
          <div style={{ background: "#FEF3C7", border: "1px solid #FDE68A", borderRadius: 10, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#92400E", marginBottom: 4 }}>Pending Payout: ₹17,500</div>
              <div style={{ fontSize: 12, color: "#B45309" }}>Payouts are processed every Friday. Add your bank account to receive payments.</div>
            </div>
            <button style={{ background: "#B45309", color: "#fff", fontSize: 13, fontWeight: 700, padding: "10px 20px", borderRadius: 6, border: "none", cursor: "pointer" }}>
              Request Payout →
            </button>
          </div>
        </div>
        <Footer navigate={navigate} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "80vh", background: "#F9FAFB", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: "40px 36px", width: "100%", maxWidth: 420, border: "1px solid #E5E7EB" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ marginBottom: 8 }}>
            <span style={{ fontSize: 22, fontWeight: 900, color: "#0D1428" }}>FIN</span>
            <span style={{ fontSize: 22, fontWeight: 900, color: "#E8A020" }}>SIGHT</span>
            <span style={{ fontSize: 22, fontWeight: 400, color: "rgba(0,0,0,0.3)" }}> ONE</span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 4 }}>Partner Portal</div>
          <div style={{ fontSize: 13, color: "#6B7280" }}>
            {step === "login" ? "Enter your registered mobile number" : "Enter the OTP sent to your mobile"}
          </div>
        </div>

        {error && (
          <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#DC2626", marginBottom: 16 }}>
            {error}
          </div>
        )}

        {step === "login" ? (
          <>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>Mobile Number</label>
              <input
                type="tel" placeholder="98xxxxxxxx" maxLength={10}
                value={mobile} onChange={e => setMobile(e.target.value)}
                style={{ width: "100%", border: "1px solid #D1D5DB", borderRadius: 8, padding: "11px 14px", fontSize: 14, boxSizing: "border-box", fontFamily: "inherit" }}
              />
            </div>
            <button onClick={handleSendOTP} style={{ width: "100%", background: "#ffffff", color: "#fff", fontSize: 14, fontWeight: 700, padding: 13, borderRadius: 8, border: "none", cursor: "pointer", marginBottom: 16 }}>
              Send OTP →
            </button>
            <div style={{ textAlign: "center", fontSize: 13, color: "#6B7280" }}>
              Not a partner yet?{" "}
              <span onClick={() => navigate("partners")} style={{ color: "#E8A020", fontWeight: 600, cursor: "pointer" }}>Register here</span>
            </div>
          </>
        ) : (
          <>
            <div style={{ background: "#F9FAFB", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#374151", marginBottom: 16 }}>
              OTP sent to +91 {mobile}
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>Enter OTP</label>
              <input
                type="text" placeholder="4-digit OTP" maxLength={6}
                value={otp} onChange={e => setOtp(e.target.value)}
                style={{ width: "100%", border: "1px solid #D1D5DB", borderRadius: 8, padding: "11px 14px", fontSize: 18, letterSpacing: 8, textAlign: "center", boxSizing: "border-box", fontFamily: "inherit" }}
              />
            </div>
            <button onClick={handleVerifyOTP} style={{ width: "100%", background: "#ffffff", color: "#fff", fontSize: 14, fontWeight: 700, padding: 13, borderRadius: 8, border: "none", cursor: "pointer", marginBottom: 12 }}>
              Verify & Login →
            </button>
            <button onClick={() => setStep("login")} style={{ width: "100%", background: "transparent", border: "1px solid #E5E7EB", color: "#6B7280", fontSize: 13, padding: 10, borderRadius: 8, cursor: "pointer" }}>
              ← Back
            </button>
            <div style={{ textAlign: "center", marginTop: 12, fontSize: 12, color: "#9CA3AF" }}>
              Demo: Enter any 4+ digit OTP to access dashboard
            </div>
          </>
        )}
      </div>
    </div>
  );
}
