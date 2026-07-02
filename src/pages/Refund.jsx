export default function Refund({ navigate }) {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px 80px", color: "#111827", fontFamily: "Arial, sans-serif", lineHeight: 1.7 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Refund and Cancellation Policy</h1>
      <p style={{ color: "#6b7280", marginBottom: 32 }}>Last updated: June 2026</p>

      <p>This policy outlines the terms for refunds and cancellations for services purchased on the FinsightOne platform at <strong>finsightone.co</strong>. Please read this policy carefully before placing an order.</p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>1. Digital Reports (One-Time Purchase)</h2>
      <p>FinsightOne delivers credit analysis reports, loan readiness assessments, and documentation reports as digital products. Due to the nature of these deliverables:</p>
      <ul style={{ paddingLeft: 20 }}>
        <li><strong>No refund</strong> will be issued once the report has been delivered to you via WhatsApp, email, or the client portal.</li>
        <li>If the report is not delivered within the committed turnaround time (72 hours from receipt of all required documents), you are entitled to a <strong>full refund</strong>.</li>
        <li>If you have not submitted all required documents within 7 days of payment, the order may be closed and the payment will be forfeited.</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>2. Monthly Subscription Plans</h2>
      <ul style={{ paddingLeft: 20 }}>
        <li>Subscriptions are billed monthly. You may cancel at any time before the next billing date to avoid future charges.</li>
        <li>No refund is issued for the current month once the billing cycle has started and the first report for that cycle has been delivered.</li>
        <li>If no report has been delivered in the current cycle, a pro-rated refund may be considered at our discretion — contact us within 7 days of billing.</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>3. Advisory and Consultation Services</h2>
      <ul style={{ paddingLeft: 20 }}>
        <li>If you cancel an advisory session at least 24 hours before the scheduled time, a full refund will be issued.</li>
        <li>Cancellations within 24 hours of the session are non-refundable.</li>
        <li>If FinsightOne cancels or reschedules a session, a full refund will be offered or the session will be rescheduled at your convenience.</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>4. Loan Referral Services</h2>
      <p>Loan facilitation and referral services do not carry a separate fee charged to the client. Any advisory fees paid for supporting services are covered under the relevant service category above. Loan approval is at the sole discretion of the lending institution and is not guaranteed by FinsightOne.</p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>5. Incorrect or Inaccurate Information</h2>
      <p>If a report is prepared based on incorrect information provided by you, FinsightOne is not liable for the output. In such cases, a revised report may be offered at a discounted rate, but no refund will be issued for the original order.</p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>6. How to Request a Refund</h2>
      <p>To initiate a refund request, contact us within 7 days of the issue arising:</p>
      <p>
        <strong>Email:</strong> support@finsightone.co<br />
        <strong>WhatsApp:</strong> +91 95794 53635
      </p>
      <p>Please include your order/case ID, payment reference number, and a brief description of your concern. We will respond within 2 business days. Approved refunds will be processed to your original payment method within 5–7 business days.</p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>7. Contact Us</h2>
      <p>For any refund or cancellation queries, reach us at:</p>
      <p>
        <strong>Email:</strong> support@finsightone.co<br />
        <strong>WhatsApp:</strong> +91 95794 53635<br />
        <strong>Website:</strong> finsightone.co<br />
        <strong>Address:</strong> Pune, Maharashtra, India
      </p>

      <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid #e5e7eb" }}>
        <button onClick={() => navigate("home")} style={{ color: "#2563eb", background: "none", border: "none", cursor: "pointer", fontSize: 14 }}>← Back to Home</button>
      </div>
    </div>
  );
}
