import Nav from '@/components/Nav';
import Link from 'next/link';

export default function DailyChallenge() {
  return (
    <main className='page'>
      <Nav />
      <div className='card' style={{ maxWidth: 600, margin: '2rem auto', textAlign: 'center' }}>
        <h2>Daily Challenge</h2>
        <p style={{ margin: '1rem 0' }}>
          Today's challenge includes mixed data entry — names, invoices, dollar amounts, and tracking numbers.
          Complete it to earn <strong>+25 XP</strong> and keep your daily streak alive.
        </p>
        <p style={{ marginBottom: '1.5rem', color: '#888', fontSize: '0.9rem' }}>
          Includes mixed typing, data-entry forms, email snippet, and 10-key round.
        </p>
        <Link href='/practice?mode=challenge&skill=Mixed%20Data%20Entry'>
          <button style={{ fontSize: '1.1rem', padding: '0.75rem 2rem' }}>
            Start Today's Challenge
          </button>
        </Link>
      </div>
    </main>
  );
}
