import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data Entry Speed Trainer',
  description: 'Job-skill training for typing, data entry, and 10-key speed.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="notice">Best used with a physical keyboard.</div>
        {children}
      </body>
    </html>
  );
}
