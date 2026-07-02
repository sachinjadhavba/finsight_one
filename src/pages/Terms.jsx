export default function Terms({ navigate }) {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px 80px", color: "#111827", fontFamily: "Arial, sans-serif", lineHeight: 1.7 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Terms of Use</h1>
      <p style={{ color: "#6b7280", marginBottom: 32 }}>Last updated: June 2026</p>

      <p>These Terms of Use ("Terms") govern your access to and use of the FinsightOne platform at <strong>finsightone.co</strong> and any related services offered by us. By using our platform, you agree to these Terms in full. If you do not agree, please do not use our services.</p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>1. About FinsightOne</h2>
      <p>FinsightOne is a financial advisory and credit intelligence platform that provides credit analysis reports, loan readiness assessments, documentation support, and loan referral facilitation services. We are not a bank, non-banking financial company (NBFC), or regulated lender. We do not disburse loans or accept deposits.</p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>2. Services Offered</h2>
      <p>Our services include, but are not limited to:</p>
      <ul style={{ paddingLeft: 20 }}>
        <li>Free credit eligibility check</li>
        <li>Detailed credit and financial analysis reports (one-time and monthly subscription)</li>
        <li>Loan readiness and documentation preparation reports</li>
        <li>Expert advisory and consultation sessions</li>
        <li>Loan referral facilitation to partner lenders</li>
      </ul>
      <p>All reports are digital deliverables. Delivery timelines are specified at the time of purchase (typically within 72 hours of receiving all required documents).</p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>3. User Obligations</h2>
      <ul style={{ paddingLeft: 20 }}>
        <li>You must provide accurate and complete information. Providing false or misleading information may result in cancellation of your order without refund.</li>
        <li>You must be at least 18 years of age and legally capable of entering into a contract.</li>
        <li>You are responsible for maintaining the confidentiality of any login credentials.</li>
        <li>You may not use our platform for any unlawful purpose or in violation of any applicable regulations.</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>4. Payments</h2>
      <p>All fees are quoted exclusive of GST. Applicable GST will be added at checkout. Payments are processed securely through third-party payment gateways. FinsightOne does not store your payment card details.</p>
      <p>Subscription plans are billed on a monthly basis unless stated otherwise. You may cancel a subscription before the next billing cycle to avoid further charges.</p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>5. Disclaimer of Advice</h2>
      <p>Reports and analysis provided by FinsightOne are for informational purposes only and do not constitute financial, legal, or investment advice. The information in our reports is based on data provided by you and publicly available sources. FinsightOne does not guarantee loan approval from any lender. Lending decisions rest entirely with the lender.</p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>6. Intellectual Property</h2>
      <p>All content on this platform — including reports, tools, branding, and text — is the intellectual property of FinsightOne. Reports delivered to you are for your personal or business use only and may not be redistributed, resold, or reproduced without our written consent.</p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>7. Limitation of Liability</h2>
      <p>FinsightOne shall not be liable for any indirect, incidental, or consequential loss arising from the use of our services or any decision made based on our reports. Our total liability in any case shall not exceed the amount paid by you for the specific service in question.</p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>8. Termination</h2>
      <p>We reserve the right to suspend or terminate access to our services if these Terms are violated, without prior notice and without liability.</p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>9. Governing Law</h2>
      <p>These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Pune, Maharashtra.</p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>10. Contact Us</h2>
      <p>For any queries related to these Terms, contact us at:</p>
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
