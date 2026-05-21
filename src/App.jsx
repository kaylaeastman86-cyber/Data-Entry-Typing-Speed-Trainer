import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { getCurrentUser } from './utils/storage.js'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import CookieBanner from './components/CookieBanner.jsx'

// Pages
import Landing       from './pages/Landing.jsx'
import CreateAccount from './pages/CreateAccount.jsx'
import Login         from './pages/Login.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import Onboarding    from './pages/Onboarding.jsx'
import Dashboard     from './pages/Dashboard.jsx'
import TrainJob      from './pages/TrainJob.jsx'
import TrainSkill    from './pages/TrainSkill.jsx'
import Practice      from './pages/Practice.jsx'
import Results       from './pages/Results.jsx'
import Progress      from './pages/Progress.jsx'
import JobReadiness  from './pages/JobReadiness.jsx'
import Rewards       from './pages/Rewards.jsx'
import DailyChallenge from './pages/DailyChallenge.jsx'
import Profile       from './pages/Profile.jsx'
import About         from './pages/About.jsx'
import Privacy       from './pages/Privacy.jsx'
import Terms         from './pages/Terms.jsx'
import Contact       from './pages/Contact.jsx'
import Tips          from './pages/Tips.jsx'

function RequireAuth({ children }) {
  const user = getCurrentUser()
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  const location = useLocation()
  const isPublic = ['/', '/login', '/create-account', '/forgot-password', '/about', '/privacy', '/terms', '/contact', '/tips'].includes(location.pathname)

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tips" element={<Tips />} />
        <Route path="/onboarding" element={<RequireAuth><Onboarding /></RequireAuth>} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/train/job" element={<RequireAuth><TrainJob /></RequireAuth>} />
        <Route path="/train/skill" element={<RequireAuth><TrainSkill /></RequireAuth>} />
        <Route path="/practice" element={<RequireAuth><Practice /></RequireAuth>} />
        <Route path="/results" element={<RequireAuth><Results /></RequireAuth>} />
        <Route path="/progress" element={<RequireAuth><Progress /></RequireAuth>} />
        <Route path="/job-readiness" element={<RequireAuth><JobReadiness /></RequireAuth>} />
        <Route path="/rewards" element={<RequireAuth><Rewards /></RequireAuth>} />
        <Route path="/daily-challenge" element={<RequireAuth><DailyChallenge /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <CookieBanner />
    </>
  )
}
