export const LEVELS = [
  { level: 1, name: 'Beginner',      xpRequired: 0 },
  { level: 2, name: 'Novice',        xpRequired: 100 },
  { level: 3, name: 'Developing',    xpRequired: 200 },
  { level: 4, name: 'Intermediate',  xpRequired: 300 },
  { level: 5, name: 'Advanced',      xpRequired: 400 },
  { level: 6, name: 'Pro',           xpRequired: 500 },
]

export const getTotalXP = (username) => {
  const stored = localStorage.getItem('user_xp')
  if (!stored) return 0
  const all = JSON.parse(stored)
  return all[username] || 0
}
export const addXP = (username, amount) => {
  const stored = localStorage.getItem('user_xp')
  const all = stored ? JSON.parse(stored) : {}
  all[username] = (all[username] || 0) + amount
  localStorage.setItem('user_xp', JSON.stringify(all))
  return all[username]
}

export const getLevelInfo = (totalXP) => {
  let current = LEVELS[0]
  let next = LEVELS[1]
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalXP >= LEVELS[i].xpRequired) {
      current = LEVELS[i]
      next = LEVELS[i + 1] || null
      break
    }
  }
  const xpIntoLevel = next ? totalXP - current.xpRequired : 100
  const xpNeeded = next ? next.xpRequired - current.xpRequired : 100
  const pct = Math.min(100, Math.round((xpIntoLevel / xpNeeded) * 100))
  return { current, next, xpIntoLevel, xpNeeded, pct, totalXP }
}

export const calcSessionXP = (wpm, accuracy, beatBest) => {
  let xp = 10
  if (accuracy >= 95) xp += 20
  else if (accuracy >= 90) xp += 10
  if (beatBest) xp += 25
  return xp
}
