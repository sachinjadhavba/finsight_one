export default function PrivacyPolicy({ navigate }) {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px 80px", color: "#111827", fontFamily: "Arial, sans-serif", lineHeight: 1.7 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Privacy Policy</h1>
      <p style={{ color: "#6b7280", marginBottom: 32 }}>Last updated: June 2026</p>

      <p>FinsightOne ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you use our platform at <strong>finsightone.co</strong> or interact with us via WhatsApp, email, or any other channel.</p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>1. Information We Collect</h2>
      <ul style={{ paddingLeft: 20 }}>
        <li>Business and personal identification details (name, phone number, email, PAN, GST number)</li>
        <li>Financial information (bank statements, loan details, credit score data) provided voluntarily for analysis</li>
        <li>Communication data (WhatsApp messages, emails) when you contact us</li>
        <li>Usage data (pages visited, actions taken on our platform)</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>2. How We Use Your Information</h2>
      <ul style={{ paddingLeft: 20 }}>
        <li>To deliver credit reports, loan readiness assessments, and documentation reports you have subscribed to</li>
        <li>To facilitate loan referrals with partner lenders on your behalf</li>
        <li>To send service updates, report deliveries, and relevant financial information via WhatsApp or email</li>
        <li>To improve our platform and services</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>3. Data Sharing</h2>
      <p>We do not sell your personal data. We may share your information with:</p>
      <ul style={{ paddingLeft: 20 }}>
        <li>Partner lending institutions solely for the purpose of processing your loan application, with your consent</li>
        <li>Service providers who assist in operating our platform (e.g., cloud hosting, communication tools) under strict confidentiality obligations</li>
        <li>Regulatory authorities where required by law</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>4. WhatsApp Communication</h2>
      <p>By opting in to our WhatsApp service, you consent to receive messages from FinsightOne related to your enquiries, reports, and loan facilitation services. You can opt out at any time by replying <strong>STOP</strong>.</p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>5. Data Security</h2>
      <p>We implement industry-standard security measures to protect your data, including encrypted storage and secure transmission protocols. Access to your data is restricted to authorised personnel only.</p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>6. Data Retention</h2>
      <p>We retain your data for as long as necessary to provide our services or as required by applicable law. You may request deletion of your data by contacting us at the details below.</p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>7. Your Rights</h2>
      <ul style={{ paddingLeft: 20 }}>
        <li>Access the personal data we hold about you</li>
        <li>Request correction of inaccurate data</li>
        <li>Request deletion of your data</li>
        <li>Withdraw consent for communications at any time</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>8. Data Deletion</h2>
      <p>To request deletion of your personal data, email us at <strong>support@finsightone.co</strong> with the subject line "Data Deletion Request". We will process your request within 30 days.</p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>9. Contact Us</h2>
      <p>For any privacy-related queries, contact us at:</p>
      <p><strong>Email:</strong> support@finsightone.co<br />
      <strong>Website:</strong> finsightone.co</p>

      <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid #e5e7eb" }}>
        <button onClick={() => navigate("home")} style={{ color: "#2563eb", background: "none", border: "none", cursor: "pointer", fontSize: 14 }}>← Back to Home</button>
      </div>
    </div>
  );
}
