'use client';
import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Nav from '@/components/Nav';

const PROMPTS: Record<string, string[]> = {
  names: [
    'John Smith','Maria Garcia','David Johnson','Sarah Williams','Michael Brown',
    'Jennifer Davis','Robert Miller','Lisa Wilson','James Moore','Patricia Taylor',
    'Christopher Anderson','Linda Thomas','Daniel Jackson','Barbara White','Matthew Harris',
    'Susan Martin','Anthony Thompson','Jessica Garcia','Mark Martinez','Karen Robinson',
    'Donald Lewis','Betty Lee','Steven Walker','Helen Hall','Paul Allen',
    'Sandra Young','Andrew Hernandez','Donna King','Joshua Wright','Carol Lopez'
  ],
  addresses: [
    '123 Main St, Charlotte, NC 28201','456 Oak Ave, Atlanta, GA 30301',
    '789 Pine Rd, Nashville, TN 37201','321 Elm St, Dallas, TX 75201',
    '654 Cedar Blvd, Phoenix, AZ 85001','987 Birch Ln, Denver, CO 80201',
    '111 Maple Dr, Seattle, WA 98101','222 Walnut Way, Boston, MA 02101',
    '333 Spruce Ct, Miami, FL 33101','444 Willow St, Chicago, IL 60601',
    '555 Hickory Ave, Houston, TX 77001','666 Dogwood Rd, San Diego, CA 92101',
    '777 Magnolia Blvd, Portland, OR 97201','888 Chestnut Ln, Austin, TX 78701',
    '999 Sycamore Dr, Columbus, OH 43201','101 River Rd, Memphis, TN 38101',
    '202 Lake View Ct, Louisville, KY 40201','303 Hill Top Dr, Baltimore, MD 21201',
    '404 Valley Rd, Indianapolis, IN 46201','505 Forest Ave, Jacksonville, FL 32201'
  ],
  'phone numbers': [
    '(704) 555-0123','(404) 555-0187','(615) 555-0234','(919) 555-0456',
    '(214) 555-0789','(602) 555-0321','(303) 555-0654','(206) 555-0987',
    '(617) 555-0111','(305) 555-0222','(312) 555-0333','(619) 555-0444',
    '(503) 555-0555','(512) 555-0666','(614) 555-0777','(901) 555-0888',
    '(502) 555-0999','(410) 555-0100','(317) 555-0200','(904) 555-0300'
  ],
  emails: [
    'john.smith@email.com','maria.garcia@company.org','david.johnson@business.net',
    'sarah.williams@corp.com','michael.brown@work.org','jennifer.davis@firm.net',
    'robert.miller@office.com','lisa.wilson@enterprise.org','james.moore@services.net',
    'patricia.taylor@solutions.com','chris.anderson@group.org','linda.thomas@systems.net',
    'daniel.jackson@tech.com','barbara.white@digital.org','matthew.harris@data.net',
    'susan.martin@global.com','anthony.thompson@local.org','jessica.garcia@pro.net',
    'mark.martinez@expert.com','karen.robinson@elite.org'
  ],
  dates: [
    '01/15/2024','03/22/2024','07/04/2024','12/31/2024','09/11/2024',
    '02/14/2025','05/30/2025','08/17/2025','11/28/2025','04/01/2025',
    '06/15/2024','10/31/2024','01/01/2025','03/17/2025','07/20/2025',
    '09/05/2024','12/25/2024','02/28/2025','05/15/2025','08/04/2025'
  ],
  'dollar amounts': [
    '$1,234.56','$89.99','$15,000.00','$247.83','$3,499.00',
    '$12.50','$999.99','$45,678.90','$0.75','$8,250.00',
    '$1,100.25','$350.00','$22,500.75','$4.99','$6,789.12',
    '$500.00','$1,875.50','$99.00','$34,200.00','$725.40'
  ],
  'invoice numbers': [
    'INV-2024-00123','INV-2024-00456','INV-2024-00789','INV-2024-01012',
    'INV-2024-01345','INV-2024-01678','INV-2024-02001','INV-2024-02334',
    'INV-2024-02667','INV-2024-03000','INV-2025-00001','INV-2025-00234',
    'INV-2025-00567','INV-2025-00890','INV-2025-01123','INV-2025-01456',
    'INV-2025-01789','INV-2025-02012','INV-2025-02345','INV-2025-02678'
  ],
  'order numbers': [
    'ORD-78234-A','ORD-91045-B','ORD-33821-C','ORD-56789-D','ORD-12345-E',
    'ORD-67890-F','ORD-24681-G','ORD-13579-H','ORD-98765-I','ORD-43210-J',
    'ORD-11111-K','ORD-22222-L','ORD-33333-M','ORD-44444-N','ORD-55555-O',
    'ORD-66666-P','ORD-77777-Q','ORD-88888-R','ORD-99999-S','ORD-10000-T'
  ],
  'customer ids': [
    'CUST-10045','CUST-20891','CUST-33412','CUST-44567','CUST-55678',
    'CUST-66789','CUST-77890','CUST-88901','CUST-99012','CUST-10123',
    'CUST-21234','CUST-32345','CUST-43456','CUST-54567','CUST-65678',
    'CUST-76789','CUST-87890','CUST-98901','CUST-19012','CUST-20123'
  ],
  'account numbers': [
    'ACCT-001-445892','ACCT-002-331078','ACCT-003-789012','ACCT-004-456123',
    'ACCT-005-234567','ACCT-006-890123','ACCT-007-567890','ACCT-008-123456',
    'ACCT-009-678901','ACCT-010-345678','ACCT-011-901234','ACCT-012-567890',
    'ACCT-013-234567','ACCT-014-890123','ACCT-015-456789','ACCT-016-012345',
    'ACCT-017-678901','ACCT-018-345678','ACCT-019-901234','ACCT-020-567890'
  ],
  'skus / product codes': [
    'SKU-ABC-1234','SKU-XYZ-5678','SKU-DEF-9012','SKU-GHI-3456','SKU-JKL-7890',
    'SKU-MNO-1234','SKU-PQR-5678','SKU-STU-9012','SKU-VWX-3456','SKU-YZA-7890',
    'SKU-BCD-1234','SKU-EFG-5678','SKU-HIJ-9012','SKU-KLM-3456','SKU-NOP-7890',
    'SKU-QRS-1234','SKU-TUV-5678','SKU-WXY-9012','SKU-ZAB-3456','SKU-CDE-7890'
  ],
  'tracking numbers': [
    '1Z999AA10123456784','9400111899223397658642','7489011234560000000',
    '1Z999AA20987654321','9400111899334508769753','1Z888BB30112233445',
    '9261290100129790891234','0307900000001234567890','4201000034202900011135134500',
    '1Z12345E0291980793','9400111899334761012345','1ZA8765F0310021234',
    '1Z999AA31234567890','9400111899445872123456','1Z777CC40223344556',
    '9261290100240901902345','0307900000002345678901','4201000034313011122246245611'
  ],
  'customer notes': [
    'Customer called regarding delayed shipment.',
    'Left voicemail, awaiting callback.',
    'Account updated per customer request.',
    'Dispute resolved, credit issued.',
    'Escalated to billing department.',
    'Customer requested expedited shipping.',
    'Appointment confirmed for Monday at 2pm.',
    'Password reset completed successfully.',
    'Refund processed, allow 3-5 business days.',
    'Customer satisfied with resolution.',
    'Follow up required by end of week.',
    'Account flagged for review.',
    'New shipping address on file.',
    'Promotional discount applied to account.',
    'Technical issue reported, ticket opened.',
    'Warranty claim submitted.',
    'Customer upgraded to premium plan.',
    'Order cancellation processed.',
    'Feedback submitted to product team.',
    'Account notes updated.'
  ],
  'mixed data entry': [
    'John Smith - CUST-10045 - (704) 555-0123','INV-2024-00456 - $1,234.56 - 03/22/2024',
    'ORD-78234-A - SKU-ABC-1234 - Qty: 5','maria.garcia@company.org - ACCT-002-331078',
    'Sarah Williams - 456 Oak Ave, Atlanta, GA 30301','(615) 555-0234 - david.johnson@business.net',
    'INV-2025-00567 - $89.99 - 05/30/2025','CUST-33412 - ORD-91045-B - $3,499.00',
    '9400111899223397658642 - 01/15/2024','Michael Brown - ACCT-005-234567 - Level 2',
    'SKU-XYZ-5678 - Qty: 12 - $15,000.00','jennifer.davis@firm.net - (404) 555-0187'
  ],
  default: [
    'The quick brown fox jumps over the lazy dog.',
    'Data entry requires focus, accuracy, and speed.',
    'Practice every day to improve your typing skills.',
    'Accurate data entry is essential in every office.',
    'Speed and precision make you a valuable employee.',
    'Consistent practice leads to measurable improvement.',
    'Focus on accuracy first, then build your speed.',
    'Review your errors and learn from each mistake.',
    'Keyboard shortcuts can dramatically increase efficiency.',
    'Proper posture and ergonomics reduce fatigue.',
    'Touch typing allows you to work without looking at the keys.',
    'Set daily goals to track your progress over time.',
    'A score of 95% accuracy is considered professional standard.',
    'Data entry clerks typically need 35 to 45 WPM minimum.',
    'Medical data entry requires the highest accuracy standards.',
    '10-key number pad entry is measured in keystrokes per hour.',
    'Billing and invoice clerks often need 8000 KPH or higher.',
    'Proofread your work before submitting any data entry task.',
    'Errors in data entry can cascade into larger business problems.',
    'Regular breaks help maintain accuracy during long sessions.'
  ]
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getPrompts(skill: string): string[] {
  const key = skill.toLowerCase();
  return PROMPTS[key] || PROMPTS.default;
}

function PracticeInner() {
  const params = useSearchParams();
  const mode = params.get('mode') || 'skill';
  const skill = params.get('skill') || 'Standard Typing';
  const job = params.get('job') || '';
  const basePrompts = getPrompts(skill);

  const [promptQueue, setPromptQueue] = useState(() => shuffle(basePrompts));
  const [queueIdx, setQueueIdx] = useState(0);
  const [input, setInput] = useState('');
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [errors, setErrors] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [totalEntries, setTotalEntries] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [score, setScore] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const startTime = useRef<number>(0);
  const correctRef = useRef(0);
  const errorsRef = useRef(0);
  const prevInputRef = useRef('');

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
    const calcWpm = Math.round((correctRef.current / 5) / Math.max(mins, 0.016));
    const totalChars = correctRef.current + errorsRef.current;
    const calcAcc = totalChars > 0 ? Math.round((correctRef.current / totalChars) * 100) : 100;
    const calcScore = Math.round(calcWpm * (calcAcc / 100) * 10);
    setWpm(calcWpm);
    setAccuracy(calcAcc);
    setScore(calcScore);
    try {
      const prev = JSON.parse(localStorage.getItem('practice_sessions') || '[]');
      prev.push({ date: new Date().toISOString(), wpm: calcWpm, accuracy: calcAcc, score: calcScore, skill, errors: errorsRef.current });
      localStorage.setItem('practice_sessions', JSON.stringify(prev.slice(-100)));
    } catch {}
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    const prev = prevInputRef.current;
    const target = promptQueue[queueIdx] ?? promptQueue[0];
    if (val.length > prev.length) {
      const newCharIdx = val.length - 1;
      if (val[newCharIdx] !== target[newCharIdx]) {
        setErrors(er => er + 1);
        errorsRef.current += 1;
      }
    }
    prevInputRef.current = val;
    setInput(val);
    if (val === target) {
      correctRef.current += target.length;
      setCorrect(c => c + target.length);
      setTotalEntries(t => t + 1);
      prevInputRef.current = '';
      setInput('');
      const next = queueIdx + 1;
      if (next >= promptQueue.length) {
        setPromptQueue(shuffle(basePrompts));
        setQueueIdx(0);
      } else {
        setQueueIdx(next);
      }
    }
  }

  const target = promptQueue[queueIdx] ?? '';

  if (finished) return (
    <main className='page'>
      <Nav />
      <div className='card' style={{maxWidth: '500px', margin: '0 auto'}}>
        <h2>Session Complete!</h2>
        <p><strong>WPM:</strong> {wpm}</p>
        <p><strong>Accuracy:</strong> {accuracy}%</p>
        <p><strong>Score:</strong> {score}</p>
        <p><strong>Entries Completed:</strong> {totalEntries}</p>
        <p><strong>Errors:</strong> {errors}</p>
        <div style={{marginTop: '16px', display: 'flex', gap: '8px'}}>
          <a href={`/results?wpm=${wpm}&accuracy=${accuracy}&errors=${errors}&score=${score}&skill=${encodeURIComponent(skill)}`}>
            <button>View Full Results</button>
          </a>
          <a href='/dashboard'><button>Dashboard</button></a>
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
            Entry {totalEntries + 1} â Errors: {errors}
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
