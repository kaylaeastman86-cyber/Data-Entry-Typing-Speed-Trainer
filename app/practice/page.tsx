'use client';
import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Nav from '@/components/Nav';

const PROMPTS: Record<string, string[]> = {
  names: ['John Smith', 'Maria Garcia', 'David Johnson', 'Sarah Williams', 'Michael Brown'],
  addresses: ['123 Main St, Charlotte, NC 28201', '456 Oak Ave, Atlanta, GA 30301', '789 Pine Rd, Nashville, TN 37201'],
  'phone numbers': ['(704) 555-0123', '(404) 555-0187', '(615) 555-0234', '(919) 555-0456'],
  emails: ['john.smith@email.com', 'maria.garcia@company.org', 'david.johnson@business.net'],
  dates: ['01/15/2024', '03/22/2024', '07/04/2024', '12/31/2024', '09/11/2024'],
  'dollar amounts': ['$1,234.56', '$89.99', '$15,000.00', '$247.83', '$3,499.00'],
  'invoice numbers': ['INV-2024-00123', 'INV-2024-00456', 'INV-2024-00789'],
  'order numbers': ['ORD-78234-A', 'ORD-91045-B', 'ORD-33821-C'],
  'customer ids': ['CUST-10045', 'CUST-20891', 'CUST-33412'],
  'tracking numbers': ['1Z999AA10123456784', '9400111899223397658642', '7489011234560000000'],
  'skus / product codes': ['SKU-ABC-1234', 'SKU-XYZ-5678', 'SKU-DEF-9012'],
  'mixed data entry': ['John Smith — (704) 555-0123', 'INV-2024-00123 — $1,234.56', 'CUST-10045 — Atlanta, GA 30301', 'ORD-78234-A — SKU-ABC-1234', 'maria.garcia@company.org — 03/22/2024'],
  default: [
    'The quick brown fox jumps over the lazy dog.',
    'Data entry requires focus, accuracy, and speed.',
    'Practice every day to improve your typing skills.',
    'Accurate data entry is essential in every office.',
    'Speed and precision make you a valuable employee.'
  ]
};

function getPrompts(skill: string): string[] {
  const key = skill.toLowerCase();
  return PROMPTS[key] || PROMPTS.default;
}

function PracticeInner() {
  const params = useSearchParams();
  const mode = params.get('mode') || 'skill';
  const skill = params.get('skill') || 'Standard Typing';
  const job = params.get('job') || '';
  const prompts = getPrompts(skill);

  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [errors, setErrors] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const inputRef = useRef<HTMLInputElement>(null);
  const startTime = useRef<number>(0);

  useEffect(() => {
    if (!started || finished) return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timer); endSession(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [started, finished]);

  function start() {
    setStarted(true);
    startTime.current = Date.now();
    inputRef.current?.focus();
  }

  function endSession() {
    setFinished(true);
    const mins = (Date.now() - startTime.current) / 60000;
    const words = correct / 5;
    const calcWpm = Math.round(words / Math.max(mins, 0.016));
    const calcAcc = correct + errors > 0 ? Math.round((correct / (correct + errors)) * 100) : 100;
    setWpm(calcWpm);
    setAccuracy(calcAcc);
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    const target = prompts[idx % prompts.length];
    setInput(val);
    if (val === target) {
      setCorrect(c => c + target.length);
      setInput('');
      setIdx(i => i + 1);
    } else if (val.length > 0 && !target.startsWith(val)) {
      setErrors(er => er + 1);
    }
  }

  const target = prompts[idx % prompts.length];

  if (finished) return (
    <main className='page'>
      <Nav />
      <div className='card' style={{maxWidth: '500px', margin: '0 auto'}}>
        <h2>Session Complete!</h2>
        <p><strong>WPM:</strong> {wpm}</p>
        <p><strong>Accuracy:</strong> {accuracy}%</p>
        <p><strong>Entries Completed:</strong> {idx}</p>
        <p><strong>Errors:</strong> {errors}</p>
        <div style={{marginTop: '16px', display: 'flex', gap: '8px'}}>
          <a href={`/results?wpm=${wpm}&accuracy=${accuracy}&errors=${errors}&skill=${encodeURIComponent(skill)}`}>
            <button>View Full Results</button>
          </a>
          <a href='/dashboard'>
            <button>Dashboard</button>
          </a>
        </div>
      </div>
    </main>
  );

  return (
    <main className='page'>
      <Nav />
      <div className='card' style={{maxWidth: '700px', margin: '0 auto'}}>
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:'16px', alignItems:'center'}}>
          <h2 style={{margin:0}}>{mode === 'job' ? `Training: ${job}` : `Skill: ${skill}`}</h2>
          <span style={{fontSize:'28px', fontWeight:'bold', color: timeLeft < 10 ? '#e53e3e' : '#4f8ef7'}}>{timeLeft}s</span>
        </div>
        <div style={{background:'#f0f4ff', borderRadius:'10px', padding:'16px', fontSize:'18px', fontFamily:'monospace', marginBottom:'16px', minHeight:'60px', letterSpacing:'0.05em', lineHeight:'1.6'}}>
          {target.split('').map((ch, i) => {
            const typedCh = input[i];
            let color = '#555';
            if (typedCh === undefined) color = '#555';
            else if (typedCh === ch) color = '#22863a';
            else color = '#e53e3e';
            const isCurrent = i === input.length;
            return (
              <span key={i} style={{color, background: isCurrent && started ? 'rgba(79,142,247,0.2)' : 'transparent'}}>
                {ch}
              </span>
            );
          })}
        </div>
        <input
          ref={inputRef}
          value={input}
          onChange={handleInput}
          disabled={!started || finished}
          placeholder={started ? 'Type here...' : 'Click Start Drill to begin'}
          style={{width:'100%', fontSize:'18px', fontFamily:'monospace', padding:'10px', borderRadius:'6px', border:'2px solid #d0d7e6', outline:'none', boxSizing:'border-box'}}
        />
        {!started && (
          <button onClick={start} style={{marginTop:'14px', width:'100%', padding:'14px', fontSize:'16px', cursor:'pointer'}}>
            Start Drill
          </button>
        )}
        {started && (
          <p style={{marginTop:'8px', color:'#888', fontSize:'14px'}}>
            Entry {idx + 1} — {prompts.length} prompts total (cycling)
          </p>
        )}
      </div>
    </main>
  );
}

export default function Practice() {
  return (
    <Suspense fallback={<main className='page card'><p>Loading...</p></main>}>
      <PracticeInner />
    </Suspense>
  );
}
