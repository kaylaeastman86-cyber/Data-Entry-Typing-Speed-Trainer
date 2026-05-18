// LocalStorage helpers
export const getUsers = () => JSON.parse(localStorage.getItem('users') || '[]')
export const saveUsers = (users) => localStorage.setItem('users', JSON.stringify(users))
export const getCurrentUser = () => localStorage.getItem('current_user')
export const setCurrentUser = (username) => localStorage.setItem('current_user', username)
export const clearCurrentUser = () => localStorage.removeItem('current_user')

export const getUserProfile = (username) => {
  const profiles = JSON.parse(localStorage.getItem('user_profiles') || '{}')
  return profiles[username] || null
}
export const saveUserProfile = (username, profile) => {
  const profiles = JSON.parse(localStorage.getItem('user_profiles') || '{}')
  profiles[username] = { ...profiles[username], ...profile }
  localStorage.setItem('user_profiles', JSON.stringify(profiles))
}

export const getSessions = (username) => {
  const all = JSON.parse(localStorage.getItem('sessions') || '{}')
  return all[username] || []
}
export const saveSessions = (username, sessions) => {
  const all = JSON.parse(localStorage.getItem('sessions') || '{}')
  all[username] = sessions
  localStorage.setItem('sessions', JSON.stringify(all))
}
export const addSession = (username, session) => {
  const sessions = getSessions(username)
  sessions.push({ ...session, id: Date.now(), date: new Date().toISOString() })
  saveSessions(username, sessions)
  return sessions
}

export const getActiveSession = () => JSON.parse(localStorage.getItem('active_session') || 'null')
export const saveActiveSession = (s) => localStorage.setItem('active_session', JSON.stringify(s))
export const clearActiveSession = () => localStorage.removeItem('active_session')

export const getDailyChallenges = (username) => {
  const all = JSON.parse(localStorage.getItem('daily_challenges') || '{}')
  return all[username] || {}
}
export const saveDailyChallenge = (username, date, data) => {
  const all = JSON.parse(localStorage.getItem('daily_challenges') || '{}')
  if (!all[username]) all[username] = {}
  all[username][date] = data
  localStorage.setItem('daily_challenges', JSON.stringify(all))
}
