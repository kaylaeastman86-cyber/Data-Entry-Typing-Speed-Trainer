import { Link } from 'react-router-dom'

export default function Terms() {
  const effectiveDate = 'May 20, 2026'

  return (
    <div className="page" style={{ maxWidth: 760 }}>
      <h1 className="page-title">Terms of Service</h1>
      <div className="card card-lg" style={{ lineHeight: 1.8 }}>
        <p className="text-muted text-sm mb-2">Effective Date: {effectiveDate}</p>

        <p>Please read these Terms of Service (&ldquo;Terms&rdquo;) carefully before using the Data Entry Speed Trainer website. By accessing or using this service, you agree to be bound by these Terms.</p>

        <h2 style={{ color: 'var(--navy)', margin: '1.5rem 0 0.5rem' }}>1. The Service Is Free</h2>
        <p>Data Entry Speed Trainer is provided completely free of charge. You do not need to pay anything to access or use any feature of this application. There are no premium tiers, subscriptions, or in-app purchases.</p>

        <h2 style={{ color: 'var(--navy)', margin: '1.5rem 0 0.5rem' }}>2. Acceptance of Terms</h2>
        <p>By using this website, you confirm that you are at least 13 years of age and agree to these Terms. If you do not agree with any part of these Terms, please do not use the service.</p>

        <h2 style={{ color: 'var(--navy)', margin: '1.5rem 0 0.5rem' }}>3. Permitted Use</h2>
        <p>This service is provided for personal, educational, and professional development purposes. You may use this app to practice typing speed, accuracy, and data entry skills. You agree NOT to:</p>
        <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
          <li>Scrape, crawl, or systematically extract data from this website using automated tools.</li>
          <li>Attempt to reverse-engineer, decompile, or modify the application.</li>
          <li>Use the service in any way that violates applicable local, national, or international laws.</li>
          <li>Abuse or overload the service in ways that could harm its availability for other users.</li>
          <li>Misrepresent practice results or badges as official certifications to employers or third parties.</li>
        </ul>

        <h2 style={{ color: 'var(--navy)', margin: '1.5rem 0 0.5rem' }}>4. LocalStorage Data</h2>
        <p>All practice data, session history, badges, and XP points are stored locally in your browser&apos;s localStorage on your own device. This data is never transmitted to any server. You are responsible for maintaining access to your own device and browser data. We cannot recover lost or deleted localStorage data.</p>

        <h2 style={{ color: 'var(--navy)', margin: '1.5rem 0 0.5rem' }}>5. Third-Party Advertising (Google AdSense)</h2>
        <p>This website displays advertisements served by <strong>Google AdSense</strong>. These ads are provided by Google and its advertising partners. We are not responsible for the content of third-party advertisements. Google&apos;s advertising practices are governed by <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="link">Google&apos;s Privacy Policy</a>. You can manage your ad preferences at <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="link">Google&apos;s Ad Settings</a>.</p>

        <h2 style={{ color: 'var(--navy)', margin: '1.5rem 0 0.5rem' }}>6. No Warranties &mdash; Provided &ldquo;As Is&rdquo;</h2>
        <p>This service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without any warranties of any kind, either express or implied. We do not warrant that:</p>
        <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
          <li>The service will be uninterrupted, error-free, or free of bugs.</li>
          <li>The practice results will be accurate for all devices and browsers.</li>
          <li>The service will be available at all times or in all locations.</li>
        </ul>

        <h2 style={{ color: 'var(--navy)', margin: '1.5rem 0 0.5rem' }}>7. Limitation of Liability</h2>
        <p>To the maximum extent permitted by applicable law, Kayla Eastman and the Data Entry Speed Trainer are not liable for any direct, indirect, incidental, special, or consequential damages arising from your use of or inability to use this service, including but not limited to loss of data, loss of employment opportunities, or technical failures.</p>

        <h2 style={{ color: 'var(--navy)', margin: '1.5rem 0 0.5rem' }}>8. No Employment Guarantee</h2>
        <p>Use of this tool does not guarantee employment. Practice completion reports, badge achievements, and XP scores are for personal reference only. They are not official certifications and should not be represented as such to employers or hiring managers.</p>

        <h2 style={{ color: 'var(--navy)', margin: '1.5rem 0 0.5rem' }}>9. Intellectual Property</h2>
        <p>All content, design, code, and materials on this website are owned by <strong>Kayla Eastman</strong> and are protected by applicable copyright and intellectual property laws. You may not copy, reproduce, or distribute any part of this service without express written permission.</p>

        <h2 style={{ color: 'var(--navy)', margin: '1.5rem 0 0.5rem' }}>10. Governing Law</h2>
        <p>These Terms are governed by the laws of your jurisdiction. Any disputes shall be resolved under the applicable laws of the jurisdiction in which you reside. We both agree to submit to the personal jurisdiction of the applicable courts for the purpose of litigating any such disputes.</p>

        <h2 style={{ color: 'var(--navy)', margin: '1.5rem 0 0.5rem' }}>11. Changes to Terms</h2>
        <p>We reserve the right to update these Terms at any time. Continued use of the service after changes are posted constitutes your acceptance of the updated Terms. We will update the effective date above when changes are made.</p>

        <h2 style={{ color: 'var(--navy)', margin: '1.5rem 0 0.5rem' }}>12. Contact</h2>
        <p>For questions about these Terms, contact us at: <a href="mailto:lushellabrands@gmail.com" className="link">lushellabrands@gmail.com</a></p>

        <hr className="divider" />
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/" className="link">&#8592; Back to Home</Link>
          <Link to="/privacy" className="link">Privacy Policy</Link>
          <Link to="/contact" className="link">Contact</Link>
        </div>
      </div>
    </div>
  )
}
