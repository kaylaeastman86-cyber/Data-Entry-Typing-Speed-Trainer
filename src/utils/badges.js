import { getSessions, getDailyChallenges } from './storage.js'

export const ALL_BADGES = [
  // Starter
  { id: 'first_session',       category: 'Starter',    icon: '\u{1F680}', name: 'First Session',          desc: 'Complete your first practice session' },
  { id: 'first_daily',         category: 'Starter',    icon: '\u{1F4C5}', name: 'First Daily Challenge',   desc: 'Complete your first daily challenge' },
  { id: 'first_job_path',      category: 'Starter',    icon: '\u{1F5FA}\u{FE0F}', name: 'First Job Path Started',  desc: 'Start training for a job category' },
  { id: 'first_perfect',       category: 'Starter',    icon: '\u{2B50}', name: 'First Perfect Entry',     desc: 'Complete a session with 100% accuracy' },
  // Streak
  { id: 'streak_3',            category: 'Streak',     icon: '\u{1F525}', name: '3-Day Streak',            desc: 'Practice 3 days in a row' },
  { id: 'streak_7',            category: 'Streak',     icon: '\u{1F525}', name: '7-Day Streak',            desc: 'Practice 7 days in a row' },
  { id: 'streak_14',           category: 'Streak',     icon: '\u{1F525}', name: '14-Day Streak',           desc: 'Practice 14 days in a row' },
  { id: 'streak_30',           category: 'Streak',     icon: '\u{1F3C6}', name: '30-Day Streak',           desc: 'Practice 30 days in a row' },
  { id: 'comeback',            category: 'Streak',     icon: '\u{1F4AA}', name: 'Comeback Badge',           desc: 'Return after a 7+ day break' },
  // Accuracy
  { id: 'acc_90',              category: 'Accuracy',   icon: '\u{1F3AF}', name: '90% Accuracy',            desc: 'Achieve 90%+ accuracy in a session' },
  { id: 'acc_95',              category: 'Accuracy',   icon: '\u{1F3AF}', name: '95% Accuracy',            desc: 'Achieve 95%+ accuracy in a session' },
  { id: 'acc_98',              category: 'Accuracy',   icon: '\u{1F3AF}', name: '98% Accuracy',            desc: 'Achieve 98%+ accuracy in a session' },
  { id: 'perfect_round',       category: 'Accuracy',   icon: '\u{1F48E}', name: 'Perfect Round',           desc: '100% accuracy in a session' },
  { id: 'clean_data',          category: 'Accuracy',   icon: '\u{2728}', name: 'Clean Data Entry',         desc: '5 sessions with 95%+ accuracy' },
  // Speed
  { id: 'wpm_25',              category: 'Speed',      icon: '\u{26A1}', name: '25 WPM Club',             desc: 'Reach 25 WPM in a session' },
  { id: 'wpm_35',              category: 'Speed',      icon: '\u{26A1}', name: '35 WPM Club',             desc: 'Reach 35 WPM in a session' },
  { id: 'wpm_50',              category: 'Speed',      icon: '\u{26A1}', name: '50 WPM Club',             desc: 'Reach 50 WPM in a session' },
  { id: 'wpm_65',              category: 'Speed',      icon: '\u{26A1}', name: '65 WPM Club',             desc: 'Reach 65 WPM in a session' },
  { id: 'fast_form',           category: 'Speed',      icon: '\u{1F3C3}', name: 'Fast Form Filler',        desc: 'Complete 3 form sessions above 40 WPM' },
  // 10-Key
  { id: 'kph_6000',            category: '10-Key',     icon: '\u{1F522}', name: '6000 KPH Club',           desc: 'Reach 6,000 KPH on number pad' },
  { id: 'kph_8000',            category: '10-Key',     icon: '\u{1F522}', name: '8000 KPH Club',           desc: 'Reach 8,000 KPH on number pad' },
  { id: 'kph_10000',           category: '10-Key',     icon: '\u{1F522}', name: '10000 KPH Club',          desc: 'Reach 10,000 KPH on number pad' },
  { id: 'kph_12000',           category: '10-Key',     icon: '\u{1F522}', name: '12000 KPH Club',          desc: 'Reach 12,000 KPH on number pad' },
  { id: 'numpad_pro',          category: '10-Key',     icon: '\u{1F3C5}', name: 'Number Pad Pro',          desc: 'Reach 12,000+ KPH in 3 sessions' },
  // Job Ready
  { id: 'job_data_entry',      category: 'Job Ready',  icon: '\u{1F4BC}', name: 'Data Entry Clerk Ready',         desc: '35+ WPM and 95%+ accuracy' },
  { id: 'job_admin',           category: 'Job Ready',  icon: '\u{1F4BC}', name: 'Admin Assistant Ready',          desc: '40+ WPM and 94%+ accuracy' },
  { id: 'job_customer_svc',    category: 'Job Ready',  icon: '\u{1F4BC}', name: 'Customer Service Ready',         desc: '40+ WPM and 94%+ accuracy' },
  { id: 'job_receptionist',    category: 'Job Ready',  icon: '\u{1F4BC}', name: 'Receptionist Ready',             desc: '35+ WPM and 95%+ accuracy' },
  { id: 'job_medical',         category: 'Job Ready',  icon: '\u{1F4BC}', name: 'Medical Office Ready',           desc: '35+ WPM and 96%+ accuracy' },
  { id: 'job_billing',         category: 'Job Ready',  icon: '\u{1F4BC}', name: 'Billing Clerk Ready',            desc: '8,000+ KPH and 95%+ accuracy' },
  { id: 'job_accounting',      category: 'Job Ready',  icon: '\u{1F4BC}', name: 'Accounting Assistant Ready',     desc: '9,000+ KPH and 96%+ accuracy' },
  { id: 'job_warehouse',       category: 'Job Ready',  icon: '\u{1F4BC}', name: 'Warehouse Clerk Ready',          desc: '90%+ accuracy in code entry' },
  { id: 'job_ecommerce',       category: 'Job Ready',  icon: '\u{1F4BC}', name: 'Ecommerce Processor Ready',      desc: '35+ WPM and 95%+ accuracy' },
  { id: 'job_virtual_asst',    category: 'Job Ready',  icon: '\u{1F4BC}', name: 'Virtual Assistant Ready',        desc: '40+ WPM and 94%+ accuracy' },
  // Skill Mastery
  { id: 'master_names',        category: 'Skill Mastery', icon: '\u{1F3C5}', name: 'Name Entry Master',       desc: '5 name sessions at 95%+ accuracy' },
  { id: 'master_address',      category: 'Skill Mastery', icon: '\u{1F3C5}', name: 'Address Accuracy Master', desc: '5 address sessions at 95%+ accuracy' },
  { id: 'master_email',        category: 'Skill Mastery', icon: '\u{1F3C5}', name: 'Email Entry Master',      desc: '5 email sessions at 95%+ accuracy' },
  { id: 'master_phone',        category: 'Skill Mastery', icon: '\u{1F3C5}', name: 'Phone Number Master',     desc: '5 phone sessions at 95%+ accuracy' },
  { id: 'master_invoice',      category: 'Skill Mastery', icon: '\u{1F3C5}', name: 'Invoice Number Master',   desc: '5 invoice sessions at 95%+ accuracy' },
  { id: 'master_sku',          category: 'Skill Mastery', icon: '\u{1F3C5}', name: 'SKU Master',              desc: '5 SKU sessions at 95%+ accuracy' },
  { id: 'master_dates',        category: 'Skill Mastery', icon: '\u{1F3C5}', name: 'Date Entry Master',       desc: '5 date sessions at 95%+ accuracy' },
  { id: 'master_notes',        category: 'Skill Mastery', icon: '\u{1F3C5}', name: 'Customer Notes Master',   desc: '5 notes sessions at 95%+ accuracy' },
]

export const getEarnedBadges = (username) => {
  const stored = localStorage.getItem('badges')
  if (!stored) return {}
  const all = JSON.parse(stored)
  return all[username] || {}
}

export const awardBadge = (username, badgeId) => {
  const stored = localStorage.getItem('badges')
  const all = stored ? JSON.parse(stored) : {}
  if (!all[username]) all[username] = {}
  if (!all[username][badgeId]) {
    all[username][badgeId] = new Date().toISOString()
    localStorage.setItem('badges', JSON.stringify(all))
    return true
  }
  return false
}

export const checkAndAwardBadges = (username, sessionResult) => {
  const sessions = getSessions(username)
  const earned = getEarnedBadges(username)
  const newBadges = []

  const award = (id) => {
    if (!earned[id] && awardBadge(username, id)) newBadges.push(id)
  }

  // Starter
  if (sessionResult.accuracy === 100) award('first_perfect')
  if (sessionResult.skill) award('first_job_path')

  // Accuracy
  if (sessionResult.accuracy >= 90) award('acc_90')
  if (sessionResult.accuracy >= 95) award('acc_95')
  if (sessionResult.accuracy >= 98) award('acc_98')
  if (sessionResult.accuracy === 100) award('perfect_round')

  const highAccSessions = sessions.filter(s => s.accuracy >= 95)
  if (highAccSessions.length >= 5) award('clean_data')

  // Speed (WPM)
  if (sessionResult.wpm >= 25) award('wpm_25')
  if (sessionResult.wpm >= 35) award('wpm_35')
  if (sessionResult.wpm >= 50) award('wpm_50')
  if (sessionResult.wpm >= 65) award('wpm_65')

  const fastFormSessions = sessions.filter(s => s.wpm >= 40 && s.skill === 'forms')
  if (fastFormSessions.length >= 3) award('fast_form')

  // 10-Key
  if (sessionResult.kph >= 6000) award('kph_6000')
  if (sessionResult.kph >= 8000) award('kph_8000')
  if (sessionResult.kph >= 10000) award('kph_10000')
  if (sessionResult.kph >= 12000) award('kph_12000')

  const highKPH = sessions.filter(s => (s.kph || 0) >= 12000)
  if (highKPH.length >= 3) award('numpad_pro')

  // Streak check
  const dates = [...new Set(sessions.map(s => s.date?.split('T')[0]))].sort()
  let streak = 1, maxStreak = 1
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1])
    const curr = new Date(dates[i])
    const diff = (curr - prev) / 86400000
    if (diff === 1) { streak++; maxStreak = Math.max(maxStreak, streak) }
    else streak = 1
  }
  if (maxStreak >= 3) award('streak_3')
  if (maxStreak >= 7) award('streak_7')
  if (maxStreak >= 14) award('streak_14')
  if (maxStreak >= 30) award('streak_30')

  // Job ready checks
  const bestWPM = Math.max(...sessions.map(s => s.wpm || 0), 0)
  const bestAcc = Math.max(...sessions.map(s => s.accuracy || 0), 0)
  const bestKPH = Math.max(...sessions.map(s => s.kph || 0), 0)

  if (bestWPM >= 35 && bestAcc >= 95) award('job_data_entry')
  if (bestWPM >= 40 && bestAcc >= 94) award('job_admin')
  if (bestWPM >= 40 && bestAcc >= 94) award('job_customer_svc')
  if (bestWPM >= 35 && bestAcc >= 95) award('job_receptionist')
  if (bestWPM >= 35 && bestAcc >= 96) award('job_medical')
  if (bestKPH >= 8000 && bestAcc >= 95) award('job_billing')
  if (bestKPH >= 9000 && bestAcc >= 96) award('job_accounting')
  if (bestWPM >= 35 && bestAcc >= 95) award('job_ecommerce')
  if (bestWPM >= 40 && bestAcc >= 94) award('job_virtual_asst')
  if (bestAcc >= 90) award('job_warehouse')

  // Skill mastery
  const skillCounts = (skill) => sessions.filter(s => s.skill === skill && s.accuracy >= 95).length
  if (skillCounts('names') >= 5) award('master_names')
  if (skillCounts('addresses') >= 5) award('master_address')
  if (skillCounts('emails') >= 5) award('master_email')
  if (skillCounts('phones') >= 5) award('master_phone')
  if (skillCounts('invoices') >= 5) award('master_invoice')
  if (skillCounts('skus') >= 5) award('master_sku')
  if (skillCounts('dates') >= 5) award('master_dates')
  if (skillCounts('customerNotes') >= 5) award('master_notes')

  // Award first_session last so it gets the newest timestamp and always appears in Dashboard Recent Badges
  if (sessions.length >= 1) award('first_session')

  return newBadges
}

export const getCalcStreak = (username) => {
  const sessions = getSessions(username)
  if (!sessions.length) return 0
  const dates = [...new Set(sessions.map(s => s.date?.split('T')[0]))].sort().reverse()
  const today = new Date().toISOString().split('T')[0]
  if (dates[0] !== today && dates[0] !== new Date(Date.now() - 86400000).toISOString().split('T')[0]) return 0
  let streak = 1
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i])
    const curr = new Date(dates[i - 1])
    if ((curr - prev) / 86400000 === 1) streak++
    else break
  }
  return streak
}
