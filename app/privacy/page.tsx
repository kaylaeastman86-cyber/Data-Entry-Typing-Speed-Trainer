import Nav from '@/components/Nav';

export default function Privacy() {
  return (
    <main className='page'>
      <Nav />
      <div className='card' style={{maxWidth: '800px', margin: '0 auto'}}>
        <h2>Privacy Policy</h2>
        <p style={{color: '#888', marginBottom: '24px'}}>Last updated: May 2025</p>

        <h3>1. Information We Collect</h3>
        <p>
          Data Entry Speed Trainer collects only the data necessary to provide and improve the service.
          This includes typing session data (WPM, accuracy, errors, session duration) used solely to
          track your practice progress. We do not collect your name, address, or payment information.
          No personal information is sold, rented, or shared with third parties for marketing purposes.
        </p>

        <h3 style={{marginTop: '20px'}}>2. How We Use Your Data</h3>
        <p>
          Session and progress data is used to display your dashboard statistics, calculate job readiness
          scores, and personalize skill recommendations. This data is stored locally in your browser where
          applicable and is not transmitted to external servers beyond what is necessary to serve the app.
        </p>

        <h3 style={{marginTop: '20px'}}>3. Cookies</h3>
        <p>
          This app uses cookies and similar technologies to maintain your session, remember preferences,
          and support advertising functionality. By using this site, you consent to the use of cookies
          as described in this policy. You may disable cookies in your browser settings, though some
          features of the app may not function correctly as a result.
        </p>

        <h3 style={{marginTop: '20px'}}>4. Google AdSense Advertising</h3>
        <p>
          This app uses <strong>Google AdSense</strong> to display advertisements. Google AdSense is a
          third-party advertising service provided by Google LLC. Google may use cookies (including the
          DoubleClick cookie) to serve ads based on your prior visits to this website or other websites
          on the internet.
        </p>
        <p style={{marginTop: '10px'}}>
          Google's use of advertising cookies enables it and its partners to serve ads based on your
          visit to this site and/or other sites on the internet. You may opt out of personalized
          advertising by visiting{' '}
          <a href='https://www.google.com/settings/ads' target='_blank' rel='noopener noreferrer'
             style={{color: '#4f8ef7'}}>
            Google Ad Settings
          </a>.
          You can also opt out of third-party vendor use of cookies for personalized advertising by
          visiting{' '}
          <a href='https://www.aboutads.info/choices/' target='_blank' rel='noopener noreferrer'
             style={{color: '#4f8ef7'}}>
            www.aboutads.info
          </a>.
        </p>

        <h3 style={{marginTop: '20px'}}>5. GDPR — European Users</h3>
        <p>
          If you are located in the European Economic Area (EEA), you have certain rights under the
          General Data Protection Regulation (GDPR), including the right to access, correct, or delete
          your personal data. To exercise these rights or for questions about your data, contact us at
          the email below. You may also opt out of personalized ads served through Google by visiting
          Google's Ad Settings page linked above.
        </p>

        <h3 style={{marginTop: '20px'}}>6. CCPA — California Users</h3>
        <p>
          California residents have the right to know what personal data is collected, the right to
          request deletion of personal data, and the right to opt out of the sale of personal data.
          We do not sell personal data. To opt out of personalized advertising from Google, use the
          Google Ad Settings link above.
        </p>

        <h3 style={{marginTop: '20px'}}>7. Data Security</h3>
        <p>
          We take reasonable measures to protect information about you from loss, theft, misuse,
          and unauthorized access. Passwords (if applicable) are stored as bcrypt hashes and are
          never stored in plain text. Recovery codes are hashed and never stored in plain text.
        </p>

        <h3 style={{marginTop: '20px'}}>8. Disclaimer</h3>
        <p>
          <strong>This app is for practice purposes only.</strong> Completion of drills, challenges,
          or practice sessions on this platform does not constitute official job training, certification,
          or employment qualification. Results and readiness scores are estimates based on your practice
          performance and are not endorsed by any employer or staffing agency.
        </p>

        <h3 style={{marginTop: '20px'}}>9. Children's Privacy</h3>
        <p>
          This service is not directed to children under the age of 13. We do not knowingly collect
          personal information from children under 13. If you believe we have collected information
          from a child under 13, please contact us immediately.
        </p>

        <h3 style={{marginTop: '20px'}}>10. Changes to This Policy</h3>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this page
          with an updated date. Continued use of the app after changes are posted constitutes your
          acceptance of the revised policy.
        </p>

        <h3 style={{marginTop: '20px'}}>11. Contact</h3>
        <p>
          For privacy questions or data requests, contact us at:{' '}
          <a href='mailto:privacy@dataentryspeedtrainer.com' style={{color: '#4f8ef7'}}>
            privacy@dataentryspeedtrainer.com
          </a>
        </p>
      </div>
    </main>
  );
}
