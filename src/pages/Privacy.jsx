import { Link } from 'react-router-dom'

export default function Privacy() {
  const effectiveDate = 'May 20, 2026'

  return (
    <div className="page" style={{ maxWidth: 760 }}>
      <h1 className="page-title">Privacy Policy</h1>
      <div className="card card-lg" style={{ lineHeight: 1.8 }}>
        <p className="text-muted text-sm mb-2">Effective Date: {effectiveDate}</p>

        <p>Data Entry Speed Trainer (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we handle information when you use our website.</p>

        <h2 style={{ color: 'var(--navy)', margin: '1.5rem 0 0.5rem' }}>1. Information We Collect</h2>
        <p>We do not operate any servers or databases. We do not require account registration, collect your name, email address, or any personally identifiable information. All user data &mdash; including practice sessions, badges, XP points, and settings &mdash; is stored exclusively in your browser&apos;s <strong>localStorage</strong> on your own device. This data never leaves your device and is not accessible to us.</p>

        <h2 style={{ color: 'var(--navy)', margin: '1.5rem 0 0.5rem' }}>2. Cookies &amp; Third-Party Advertising (Google AdSense)</h2>
        <p>This website uses <strong>Google AdSense</strong> to display advertisements. Google AdSense uses cookies, including the <strong>DoubleClick cookie</strong>, to serve ads based on your prior visits to this website and other sites on the Internet.</p>
        <p>Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the Internet. These cookies allow Google to make a record of your activity and provide relevant advertising.</p>
        <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
          <li>Google may use cookies to personalize the ads you see.</li>
          <li>DoubleClick cookies track impressions and clicks for ad measurement.</li>
          <li>Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites.</li>
        </ul>
        <p>You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="link">Google&apos;s Ad Settings</a>. You can also opt out of a third-party vendor&apos;s use of cookies by visiting the <a href="https://www.networkadvertising.org/choices/" target="_blank" rel="noopener noreferrer" className="link">Network Advertising Initiative opt-out page</a>.</p>
        <p>For more information on how Google uses data when you use our site, please visit: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="link">https://policies.google.com/privacy</a>.</p>

        <h2 style={{ color: 'var(--navy)', margin: '1.5rem 0 0.5rem' }}>3. LocalStorage Data</h2>
        <p>We use your browser&apos;s localStorage to save your practice session history, badges earned, XP points, and preferences. This data is stored locally on your device only. We have no access to this data. You can delete it at any time by clearing your browser&apos;s site data for this website.</p>

        <h2 style={{ color: 'var(--navy)', margin: '1.5rem 0 0.5rem' }}>4. No Server-Side Data Collection</h2>
        <p>This website does not transmit any user data to external servers. There is no login system, no account creation, and no backend infrastructure. Your practice data belongs entirely to you and stays on your device.</p>

        <h2 style={{ color: 'var(--navy)', margin: '1.5rem 0 0.5rem' }}>5. Analytics</h2>
        <p>We may use anonymized, aggregated analytics data (provided by advertising networks) to understand general traffic patterns. This data does not identify individual users.</p>

        <h2 style={{ color: 'var(--navy)', margin: '1.5rem 0 0.5rem' }}>6. GDPR Rights (European Users)</h2>
        <p>If you are located in the European Economic Area (EEA), you have the following rights under the General Data Protection Regulation (GDPR):</p>
        <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
          <li><strong>Right of Access</strong> &mdash; You have the right to request information about the data we hold about you (we hold none on our servers).</li>
          <li><strong>Right to Erasure</strong> &mdash; You can delete all locally stored data by clearing your browser&apos;s localStorage for this site.</li>
          <li><strong>Right to Object</strong> &mdash; You can opt out of personalized advertising via <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="link">Google&apos;s Ad Settings</a>.</li>
          <li><strong>Right to Portability</strong> &mdash; Your localStorage data can be exported via your browser&apos;s developer tools.</li>
        </ul>
        <p>For questions about your GDPR rights regarding Google&apos;s ad cookies, please refer to <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="link">Google&apos;s Privacy Policy</a>.</p>

        <h2 style={{ color: 'var(--navy)', margin: '1.5rem 0 0.5rem' }}>7. CCPA Rights (California Residents)</h2>
        <p>If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA):</p>
        <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
          <li><strong>Right to Know</strong> &mdash; You have the right to know what personal information is collected. We collect none on our servers.</li>
          <li><strong>Right to Delete</strong> &mdash; You can delete locally stored data by clearing your browser&apos;s site data.</li>
          <li><strong>Right to Opt-Out of Sale</strong> &mdash; We do not sell personal data. Google AdSense may use cookie data for ad targeting; you can opt out via <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="link">Google&apos;s Ad Settings</a>.</li>
        </ul>

        <h2 style={{ color: 'var(--navy)', margin: '1.5rem 0 0.5rem' }}>8. Children&apos;s Privacy</h2>
        <p>This service is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided personal information through this site, please contact us and we will take steps to address it.</p>

        <h2 style={{ color: 'var(--navy)', margin: '1.5rem 0 0.5rem' }}>9. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. Continued use of the service after changes constitutes your acceptance of the updated policy.</p>

        <h2 style={{ color: 'var(--navy)', margin: '1.5rem 0 0.5rem' }}>10. Contact Us</h2>
        <p>If you have questions about this Privacy Policy, please contact us at: <a href="mailto:lushellabrands@gmail.com" className="link">lushellabrands@gmail.com</a></p>

        <hr className="divider" />
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/" className="link">&#8592; Back to Home</Link>
          <Link to="/contact" className="link">Contact</Link>
        </div>
      </div>
    </div>
  )
}
