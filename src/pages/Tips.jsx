import { Link } from 'react-router-dom'

const articles = [
  {
    id: 1,
    title: 'How to Improve Your Typing Speed: 7 Proven Techniques',
    content: (
      <>
        <p style={{ marginBottom: '0.75rem' }}>Improving your typing speed does not happen overnight, but with the right techniques you can make meaningful progress in just a few weeks. Here are seven proven strategies that actually work.</p>
        <p style={{ marginBottom: '0.75rem' }}><strong>1. Learn proper touch typing.</strong> The single biggest factor in typing speed is whether you use all ten fingers correctly. Touch typing &mdash; placing each finger on the home row keys (ASDF JKL;) and never looking at the keyboard &mdash; is the foundation of fast, accurate typing. If you are a two-finger typist, switching will feel slower at first, but your speed ceiling becomes dramatically higher.</p>
        <p style={{ marginBottom: '0.75rem' }}><strong>2. Focus on accuracy before speed.</strong> Many beginners go as fast as possible and reinforce bad habits. Instead, practice at a speed where you can hit 98&ndash;99% accuracy. Speed follows naturally as your muscle memory develops. Think of it like learning an instrument &mdash; slow, clean practice builds faster, cleaner performance.</p>
        <p style={{ marginBottom: '0.75rem' }}><strong>3. Practice consistently, not in long bursts.</strong> Fifteen minutes of focused practice every day will improve your speed faster than a two-hour session once a week. Daily repetition builds neural pathways. Even 10 minutes a day is enough to see real progress.</p>
        <p style={{ marginBottom: '0.75rem' }}><strong>4. Use job-specific content.</strong> Generic text passages are not what employers use in typing tests. Practice with the kind of content you will actually type on the job &mdash; numbers, alphanumeric codes, addresses, medical terms, or legal documents. Job-specific practice builds relevant speed.</p>
        <p style={{ marginBottom: '0.75rem' }}><strong>5. Track your progress.</strong> Seeing your WPM increase from 35 to 45 to 55 over a few weeks is motivating. Use a tool that records your session history so you can track improvement. Without tracking, it is easy to feel like you are not making progress even when you are.</p>
        <p style={{ marginBottom: '0.75rem' }}><strong>6. Drill your problem keys.</strong> If you consistently stumble on certain letter combinations &mdash; &ldquo;th&rdquo;, &ldquo;ing&rdquo;, &ldquo;tion&rdquo; &mdash; make them the focus of dedicated drills. Targeted practice on weak spots is more effective than general practice.</p>
        <p><strong>7. Reduce physical tension.</strong> Keep your wrists flat and relaxed, fingers curved over the keys, shoulders down. Tension slows you down and causes mistakes. Take breaks every 20&ndash;30 minutes to shake out your hands and reset your posture.</p>
      </>
    )
  },
  {
    id: 2,
    title: 'What Is a Good Typing Speed for Data Entry Jobs?',
    content: (
      <>
        <p style={{ marginBottom: '0.75rem' }}>One of the most common questions from people entering the data entry field is: how fast do I need to type to get hired? The answer depends on the role and employer, but there are clear benchmarks to aim for.</p>
        <p style={{ marginBottom: '0.75rem' }}><strong>The baseline: 40 WPM.</strong> Most entry-level data entry positions require a minimum of 40 words per minute with at least 90% accuracy. This is considered the floor for professional data entry work. If you are below 40 WPM, dedicate time to practice before applying.</p>
        <p style={{ marginBottom: '0.75rem' }}><strong>The sweet spot: 60&ndash;75 WPM.</strong> For competitive candidates, 60&ndash;75 WPM puts you in a strong position for most data entry, administrative assistant, and clerical roles. At this speed you are efficient enough to meet output quotas without sacrificing accuracy.</p>
        <p style={{ marginBottom: '0.75rem' }}><strong>The high end: 80+ WPM.</strong> High-volume roles &mdash; medical transcriptionists, court reporters, experienced executive assistants &mdash; often require 80 WPM or more. Some roles use KPH (keystrokes per hour) instead of WPM. A KPH of 10,000 or higher is generally considered professional-grade for numeric data entry.</p>
        <p style={{ marginBottom: '0.75rem' }}><strong>Accuracy matters as much as speed.</strong> Employers consistently report that accuracy is weighted as heavily as speed, sometimes more. A candidate who types 70 WPM with 99% accuracy is far more valuable than one who types 80 WPM with 85% accuracy. Every error in data entry has downstream consequences &mdash; incorrect records, billing mistakes, contract errors. Aim for 95%+ accuracy at your target speed.</p>
        <p><strong>Know the format of your test.</strong> Different employers test differently &mdash; some use 1-minute tests, others 3 or 5 minutes. Some test pure text typing; others use forms, numbers, or copying from a document. Practice in the format you will actually be tested in. The bottom line: aim for 60 WPM with 95%+ accuracy as your target.</p>
      </>
    )
  },
  {
    id: 3,
    title: 'Data Entry Clerk vs Medical Transcriptionist: Which Career Is Right for You?',
    content: (
      <>
        <p style={{ marginBottom: '0.75rem' }}>Both data entry clerks and medical transcriptionists sit at computers and enter information into systems &mdash; but the two careers have very different skill requirements, salary ranges, and growth paths.</p>
        <p style={{ marginBottom: '0.75rem' }}><strong>Data Entry Clerk.</strong> Data entry clerks input information from various sources &mdash; invoices, forms, orders, databases &mdash; into computer systems. The role is common across industries including retail, logistics, finance, healthcare administration, and government. Entry-level positions typically require 40&ndash;60 WPM, proficiency with spreadsheets, and attention to detail. Pros: low barrier to entry, widely available, remote-friendly, good starting point for office careers. Cons: can be repetitive, wages are modest (median $35,000&ndash;$42,000/year in the U.S.), and automation is gradually reducing some roles.</p>
        <p style={{ marginBottom: '0.75rem' }}><strong>Medical Transcriptionist.</strong> Medical transcriptionists listen to audio recordings from physicians and transcribe them into written reports, discharge summaries, and medical records. The role requires familiarity with medical terminology, anatomy, pharmacology, and healthcare documentation standards. Pros: higher pay than general data entry (median $37,000&ndash;$55,000/year with experience), growing demand for remote positions, interesting and challenging work. Cons: requires specialized training (typically a 1&ndash;2 year certificate program), high accuracy requirements (99%+), and fast typing speed (often 60&ndash;70 WPM or higher).</p>
        <p><strong>Which should you choose?</strong> If you are starting from scratch and need income quickly, data entry offers the fastest path to employment &mdash; you can be job-ready in weeks with practice. If you are willing to invest 6&ndash;12 months in training and want a more specialized career in healthcare with stronger long-term earnings potential, medical transcription is worth pursuing. Either way, the foundation is the same: fast, accurate typing. Start building that skill now and you will be ahead of the competition.</p>
      </>
    )
  },
  {
    id: 4,
    title: 'How to Practice Typing for Free (And Actually Get Better)',
    content: (
      <>
        <p style={{ marginBottom: '0.75rem' }}>You do not need to spend money on expensive software or courses to dramatically improve your typing speed. Everything you need is available for free online &mdash; you just need to use it strategically.</p>
        <p style={{ marginBottom: '0.75rem' }}><strong>Start with structured drills, not random text.</strong> Random paragraph typing helps somewhat, but structured drills that focus on specific letter combinations, hand alternation, or number entry develop your muscle memory more efficiently. Look for practice tools that offer progressive difficulty &mdash; starting easy and gradually introducing more complex patterns.</p>
        <p style={{ marginBottom: '0.75rem' }}><strong>Practice in 15-minute focused sessions.</strong> Research on skill acquisition consistently shows that focused, intentional practice produces faster improvement than passive repetition. During your sessions, pay active attention to where you are making errors and slow down deliberately on those sections. Mindless typing produces minimal gains.</p>
        <p style={{ marginBottom: '0.75rem' }}><strong>Use a free trainer that tracks your results.</strong> Tools like Data Entry Speed Trainer record your WPM, accuracy, and session history over time. Progress is often invisible without tracking. You might go from 42 WPM to 48 WPM over three weeks and not realize it without a record.</p>
        <p style={{ marginBottom: '0.75rem' }}><strong>Practice typing real-world content.</strong> After structured drills, practice typing emails, articles, or documents that match the content you will type on the job. If you are targeting data entry roles, practice typing numbers, addresses, and form fields. If targeting medical transcription, practice medical terminology.</p>
        <p style={{ marginBottom: '0.75rem' }}><strong>Simulate test conditions.</strong> Most employer typing tests are timed and stressful. Practice under timed conditions regularly so the experience feels familiar rather than anxiety-inducing. Try 1-minute, 3-minute, and 5-minute timed tests to build consistency across formats.</p>
        <p><strong>Stay consistent &mdash; the compound effect is real.</strong> Even 15 minutes per day practiced consistently for 30 days will produce a noticeably higher WPM. The key is not to miss days. Set a daily reminder, link it to an existing habit, and treat it like any other professional development activity.</p>
      </>
    )
  },
  {
    id: 5,
    title: 'Understanding WPM, KPH, and Accuracy — What They Mean for Your Career',
    content: (
      <>
        <p style={{ marginBottom: '0.75rem' }}>When you apply for data entry or administrative jobs, you will often see requirements listed in WPM, KPH, or accuracy percentage. These metrics seem straightforward, but there are nuances worth understanding.</p>
        <p style={{ marginBottom: '0.75rem' }}><strong>WPM (Words Per Minute).</strong> The most commonly used typing metric. A &ldquo;word&rdquo; in typing tests is standardized as five keystrokes, including spaces and punctuation &mdash; so &ldquo;cat&rdquo; counts as one word, but &ldquo;discombobulate&rdquo; counts as nearly three. This standardization makes WPM comparable across different texts. Most tests measure &ldquo;net WPM&rdquo; &mdash; meaning errors subtract from your raw speed. If you type 65 words in a minute but make 5 errors, your net WPM might be 60. Always prioritize accuracy to protect your WPM score.</p>
        <p style={{ marginBottom: '0.75rem' }}><strong>KPH (Keystrokes Per Hour).</strong> KPH is commonly used for numeric and alphanumeric data entry roles where you are entering structured information &mdash; forms, invoices, spreadsheet data &mdash; rather than prose. KPH measures raw keystrokes, not words, making it better suited to actual data entry output. As a rough conversion: 60 WPM is approximately 18,000 KPH. Employers who specify KPH often set thresholds around 8,000&ndash;12,000 KPH for entry-level positions, and 14,000&ndash;18,000+ for experienced roles.</p>
        <p style={{ marginBottom: '0.75rem' }}><strong>Accuracy Percentage.</strong> Accuracy measures what percentage of your keystrokes were correct. For data entry roles, 95% accuracy is typically the minimum acceptable standard. Many roles &mdash; especially in healthcare, finance, and legal &mdash; require 98&ndash;99% accuracy.</p>
        <p><strong>The takeaway:</strong> Know which metric your target employer uses, practice in that format, and always prioritize accuracy over raw speed. In data entry, every error has to be found and corrected &mdash; often by someone else, later, at greater cost than entering it correctly the first time.</p>
      </>
    )
  },
  {
    id: 6,
    title: 'Top 10 Data Entry Tips for Beginners',
    content: (
      <>
        <p style={{ marginBottom: '0.75rem' }}>Just starting out in data entry? Here are ten practical tips that will help you improve faster, avoid common mistakes, and present yourself as a strong candidate.</p>
        <p style={{ marginBottom: '0.5rem' }}><strong>1. Learn the number row and numeric keypad separately.</strong> Number entry is a distinct skill from alphabetic typing. Many employers specifically test numeric data entry with the keypad. Practice both &mdash; they use different muscle groups.</p>
        <p style={{ marginBottom: '0.5rem' }}><strong>2. Use all ten fingers.</strong> If you are still hunting and pecking or using only six fingers, you are leaving speed on the table. Learn touch typing with all ten fingers. It is slower at first but pays dividends quickly.</p>
        <p style={{ marginBottom: '0.5rem' }}><strong>3. Keep your eyes on the source document, not your screen.</strong> When transcribing from a document, look at the source, not your fingers. Switching your gaze back and forth adds up over hours of work and increases errors.</p>
        <p style={{ marginBottom: '0.5rem' }}><strong>4. Develop a rhythm.</strong> Data entry is fastest when you develop a consistent typing rhythm rather than varying your speed erratically. Practice with audio exercises or a metronome to develop evenness.</p>
        <p style={{ marginBottom: '0.5rem' }}><strong>5. Use keyboard shortcuts.</strong> Tab between fields, Ctrl+C/V for copy-paste, Alt+Tab to switch windows. The fewer mouse clicks you need, the faster you work.</p>
        <p style={{ marginBottom: '0.5rem' }}><strong>6. Double-check critical fields.</strong> In high-stakes data entry, verify amounts, dates, ID numbers, and names before moving on. One wrong digit in an account number creates significant downstream problems.</p>
        <p style={{ marginBottom: '0.5rem' }}><strong>7. Set up your workspace for efficiency.</strong> Minimize scrolling by positioning your source document and input window side by side. Reduce glare on your screen. Use a comfortable keyboard.</p>
        <p style={{ marginBottom: '0.5rem' }}><strong>8. Take breaks to maintain accuracy.</strong> Data entry accuracy tends to drop after 45&ndash;60 minutes of continuous work. Short breaks of 5&ndash;10 minutes help reset your focus and maintain quality.</p>
        <p style={{ marginBottom: '0.5rem' }}><strong>9. Know your common errors.</strong> Everyone makes the same mistakes repeatedly. Identify your personal error patterns and target them in practice.</p>
        <p><strong>10. Practice daily &mdash; even on days you do not feel like it.</strong> Consistency beats intensity. The professionals with the highest accuracy and speed are those who practice regularly, not those who practice heroically once a week.</p>
      </>
    )
  },
  {
    id: 7,
    title: 'How Typing Speed Affects Your Earnings as a Freelancer',
    content: (
      <>
        <p style={{ marginBottom: '0.75rem' }}>If you are considering freelancing as a data entry specialist, virtual assistant, or transcriptionist, your typing speed is one of the most direct levers you have on your hourly earnings.</p>
        <p style={{ marginBottom: '0.75rem' }}><strong>Freelance data entry is often paid per piece, not per hour.</strong> Many platforms pay per audio minute transcribed, per 1,000 words entered, or per document processed. This means your effective hourly rate is directly tied to your speed. A transcriptionist who types 70 WPM earns roughly 75% more per hour than one who types 40 WPM on the same project, even at identical per-minute rates.</p>
        <p style={{ marginBottom: '0.75rem' }}><strong>The speed-earnings math.</strong> Consider a transcription project paying $1.00 per audio minute. A professional who transcribes at a 1:4 ratio (one minute of audio equals four minutes of transcription time) earns $15/hour. A faster typist at a 1:2.5 ratio earns $24/hour on the same project &mdash; a 60% pay increase purely from speed improvement.</p>
        <p style={{ marginBottom: '0.75rem' }}><strong>Speed also increases volume capacity.</strong> Faster typists can take on more concurrent projects without working more hours. At 70 WPM you can realistically complete more client projects in a day than at 45 WPM, directly scaling your income.</p>
        <p style={{ marginBottom: '0.75rem' }}><strong>Accuracy is just as important for client retention.</strong> Clients who hire freelancers for data entry or transcription review output quality carefully. High accuracy builds your reputation, generates repeat business, and earns positive reviews &mdash; all of which let you charge higher rates over time.</p>
        <p><strong>The investment pays off quickly.</strong> Spending 30 days improving from 45 WPM to 60 WPM with solid accuracy could translate to thousands of dollars in additional annual income if you freelance regularly. That is one of the highest-ROI skill investments available to non-technical freelancers.</p>
      </>
    )
  },
  {
    id: 8,
    title: 'The Best Keyboard Shortcuts Every Data Entry Professional Should Know',
    content: (
      <>
        <p style={{ marginBottom: '0.75rem' }}>Keyboard shortcuts are one of the most underrated productivity tools for data entry workers. Every time you move your hand to the mouse and back, you lose 1&ndash;3 seconds. Across hundreds of repetitions in a workday, this adds up to meaningful lost time. Master these shortcuts and watch your output climb.</p>
        <p style={{ marginBottom: '0.5rem' }}><strong>Universal navigation shortcuts</strong></p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '0.75rem' }}>
          <li><strong>Tab</strong> &mdash; Move to the next field in a form (the single most important data entry shortcut)</li>
          <li><strong>Shift+Tab</strong> &mdash; Move to the previous field</li>
          <li><strong>Enter</strong> &mdash; Confirm/submit in many form contexts</li>
          <li><strong>Ctrl+Home / Ctrl+End</strong> &mdash; Jump to the beginning or end of a document</li>
        </ul>
        <p style={{ marginBottom: '0.5rem' }}><strong>Text editing shortcuts</strong></p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '0.75rem' }}>
          <li><strong>Ctrl+A</strong> &mdash; Select all text</li>
          <li><strong>Ctrl+C / Ctrl+V</strong> &mdash; Copy / Paste</li>
          <li><strong>Ctrl+Z</strong> &mdash; Undo (your best friend after a mistake)</li>
          <li><strong>Ctrl+Backspace</strong> &mdash; Delete the previous whole word (faster than holding Backspace)</li>
          <li><strong>Home / End</strong> &mdash; Jump to the start or end of a line</li>
        </ul>
        <p style={{ marginBottom: '0.5rem' }}><strong>Window management shortcuts</strong></p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '0.75rem' }}>
          <li><strong>Alt+Tab</strong> &mdash; Switch between open windows (essential for dual-source data entry)</li>
          <li><strong>Ctrl+Tab</strong> &mdash; Switch between browser tabs</li>
          <li><strong>Windows key + Arrow keys</strong> &mdash; Snap windows to half-screen for side-by-side work</li>
        </ul>
        <p style={{ marginBottom: '0.5rem' }}><strong>Spreadsheet shortcuts (Excel/Google Sheets)</strong></p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '0.75rem' }}>
          <li><strong>Ctrl+D</strong> &mdash; Fill down (copy the cell above)</li>
          <li><strong>Ctrl+; (semicolon)</strong> &mdash; Insert today&apos;s date</li>
          <li><strong>F2</strong> &mdash; Edit cell contents without the mouse</li>
          <li><strong>Ctrl+Shift+End</strong> &mdash; Select to the last used cell</li>
        </ul>
        <p>The goal is to keep your hands on the keyboard at all times. Practice these shortcuts deliberately until they become automatic, and your data entry speed will increase noticeably within a week.</p>
      </>
    )
  }
]

export default function Tips() {
  return (
    <div className="page" style={{ maxWidth: 800 }}>
      <h1 className="page-title">Tips &amp; Articles</h1>
      <p style={{ color: 'var(--grey-600, #888)', marginBottom: '2rem' }}>
        Free guides on typing speed, data entry careers, and professional skills &mdash; written for real job seekers.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {articles.map(article => (
          <article
            key={article.id}
            id={`article-${article.id}`}
            className="card card-lg"
            style={{ lineHeight: 1.8 }}
          >
            <h2 style={{ color: 'var(--navy)', marginBottom: '1rem', fontSize: '1.15rem' }}>
              {article.id}. {article.title}
            </h2>
            <div style={{ fontSize: '0.95rem' }}>
              {article.content}
            </div>
          </article>
        ))}
      </div>

      <div className="card" style={{ marginTop: '2rem', textAlign: 'center', padding: '1.5rem' }}>
        <p style={{ marginBottom: '1rem' }}>Ready to put these tips into practice?</p>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            padding: '0.6rem 1.5rem',
            background: 'var(--primary, #4f46e5)',
            color: '#fff',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontWeight: 600
          }}
        >
          Start Practicing Now &#8594;
        </Link>
      </div>

      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link to="/" className="link">&#8592; Home</Link>
        <Link to="/about" className="link">About</Link>
        <Link to="/contact" className="link">Contact</Link>
      </div>
    </div>
  )
}
