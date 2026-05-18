import { Link } from 'react-router-dom'

const SKILLS = [
  { key:'typing',       icon:'⌨️',  name:'Standard Typing',     desc:'Office sentences & paragraphs' },
  { key:'names',        icon:'👤',  name:'Names',               desc:'First and last name entry' },
  { key:'addresses',    icon:'📍',  name:'Addresses',           desc:'Full US street addresses' },
  { key:'phones',       icon:'📞',  name:'Phone Numbers',       desc:'Formatted phone number entry' },
  { key:'emails',       icon:'📧',  name:'Emails',              desc:'Email address accuracy' },
  { key:'dates',        icon:'📅',  name:'Dates',               desc:'Various date formats' },
  { key:'invoices',     icon:'🧾',  name:'Invoice Numbers',     desc:'INV-XXXX-XXXXXX format' },
  { key:'orderNumbers', icon:'📦',  name:'Order Numbers',       desc:'ORD-XXXX-XXXXXX format' },
  { key:'customerIds',  icon:'🪪',  name:'Customer IDs',        desc:'CUST-XXXXX format' },
  { key:'accountNumbers',icon:'🏦', name:'Account Numbers',    desc:'ACC-XXXXXXXXX format' },
  { key:'skus',         icon:'🏷️',  name:'SKUs / Product Codes',desc:'Product SKU entry' },
  { key:'tracking',     icon:'🚚',  name:'Tracking Numbers',    desc:'Carrier tracking numbers' },
  { key:'amounts',      icon:'💲',  name:'Dollar Amounts',      desc:'Currency with cents' },
  { key:'tenKey',       icon:'🔢',  name:'10-Key Number Pad',   desc:'Numeric keypad speed drills' },
  { key:'customerNotes',icon:'📝',  name:'Customer Notes',      desc:'Short note entry practice' },
  { key:'mixed',        icon:'🔀',  name:'Mixed Data Entry',    desc:'Combined field entries' },
  { key:'forms',        icon:'📋',  name:'Office Forms',        desc:'Multi-field form simulation' },
  { key:'weak',         icon:'💪',  name:'Weak Skill Practice', desc:'Focus on your lowest scores' },
]

export default function TrainSkill() {
  return (
    <div className="page">
      <div className="keyboard-banner">⌨️ Best used with a physical keyboard</div>
      <div style={{height:'1rem'}}/>
      <h1 className="page-title">Train by Skill</h1>
      <p className="page-subtitle">Pick a specific data type to drill. Each session sharpens a targeted skill.</p>
      <div className="grid grid-4" style={{gap:'1rem'}}>
        {SKILLS.map(s => (
          <div key={s.key} className="skill-card">
            <div className="skill-card-icon">{s.icon}</div>
            <div className="skill-card-name">{s.name}</div>
            <div style={{fontSize:'0.75rem',color:'var(--grey-500)',marginBottom:'0.75rem'}}>{s.desc}</div>
            <Link to={`/practice?mode=skill&skill=${s.key}`} className="btn btn-primary btn-sm btn-full">Start Drill</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
