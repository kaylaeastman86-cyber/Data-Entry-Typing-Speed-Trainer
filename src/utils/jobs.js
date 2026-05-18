export const JOBS = [
  {
    id: 'data_entry_clerk',
    title: 'Data Entry Clerk',
    icon: '⌨️',
    skills: ['Typing', 'Accuracy', 'Forms'],
    wpmGoal: 35, accGoal: 95, kphGoal: null,
    desc: 'Enter data into spreadsheets and databases with speed and precision.',
    skillKeys: ['typing', 'mixed', 'forms'],
  },
  {
    id: 'admin_assistant',
    title: 'Administrative Assistant',
    icon: '📋',
    skills: ['Typing', 'Emails', 'Scheduling'],
    wpmGoal: 40, accGoal: 94, kphGoal: null,
    desc: 'Handle correspondence, scheduling, and office documentation.',
    skillKeys: ['typing', 'emails', 'customerNotes'],
  },
  {
    id: 'customer_service',
    title: 'Customer Service Rep',
    icon: '🎧',
    skills: ['Typing', 'Customer Notes', 'Speed'],
    wpmGoal: 40, accGoal: 94, kphGoal: null,
    desc: 'Log customer interactions and resolve issues in real time.',
    skillKeys: ['customerNotes', 'typing', 'mixed'],
  },
  {
    id: 'receptionist',
    title: 'Receptionist / Front Desk',
    icon: '🏢',
    skills: ['Typing', 'Names', 'Phones'],
    wpmGoal: 35, accGoal: 95, kphGoal: null,
    desc: 'Greet visitors, manage calls, and maintain appointment records.',
    skillKeys: ['names', 'phones', 'typing'],
  },
  {
    id: 'medical_office',
    title: 'Medical Office Assistant',
    icon: '🏥',
    skills: ['Patient Data', 'Codes', 'Accuracy'],
    wpmGoal: 35, accGoal: 96, kphGoal: null,
    desc: 'Enter patient information and medical codes with high accuracy.',
    skillKeys: ['names', 'dates', 'mixed'],
  },
  {
    id: 'billing_clerk',
    title: 'Billing / Invoice Clerk',
    icon: '🧾',
    skills: ['10-Key', 'Invoices', 'Amounts'],
    wpmGoal: null, accGoal: 95, kphGoal: 8000,
    desc: 'Process invoices and billing data at high keystrokes per hour.',
    skillKeys: ['tenKey', 'invoices', 'amounts'],
  },
  {
    id: 'accounting_assistant',
    title: 'Accounting / Bookkeeping',
    icon: '💰',
    skills: ['10-Key', 'Numbers', 'Accuracy'],
    wpmGoal: null, accGoal: 96, kphGoal: 9000,
    desc: 'Enter financial data and reconcile accounts accurately.',
    skillKeys: ['tenKey', 'amounts', 'accountNumbers'],
  },
  {
    id: 'warehouse_clerk',
    title: 'Warehouse / Inventory Clerk',
    icon: '📦',
    skills: ['SKUs', 'Tracking', 'Codes'],
    wpmGoal: null, accGoal: 90, kphGoal: null,
    desc: 'Scan and enter product codes, SKUs, and tracking numbers.',
    skillKeys: ['skus', 'tracking', 'orderNumbers'],
  },
  {
    id: 'ecommerce_processor',
    title: 'Ecommerce Order Processor',
    icon: '🛒',
    skills: ['Orders', 'Addresses', 'Speed'],
    wpmGoal: 35, accGoal: 95, kphGoal: null,
    desc: 'Process online orders, shipping addresses, and customer data.',
    skillKeys: ['orderNumbers', 'addresses', 'names'],
  },
  {
    id: 'virtual_assistant',
    title: 'Remote Virtual Assistant',
    icon: '💻',
    skills: ['Typing', 'Emails', 'Mixed'],
    wpmGoal: 40, accGoal: 94, kphGoal: null,
    desc: 'Provide remote support with fast typing and organized data entry.',
    skillKeys: ['typing', 'emails', 'mixed'],
  },
]

export const calcJobReadiness = (sessions, job) => {
  if (!sessions.length) return 0
  const relevant = sessions.filter(s => job.skillKeys.includes(s.skill))
  if (!relevant.length) return 0
  const bestWPM = Math.max(...relevant.map(s => s.wpm || 0))
  const bestAcc = Math.max(...relevant.map(s => s.accuracy || 0))
  const bestKPH = Math.max(...relevant.map(s => s.kph || 0))

  let scores = []
  if (job.wpmGoal) scores.push(Math.min(100, (bestWPM / job.wpmGoal) * 100))
  if (job.kphGoal) scores.push(Math.min(100, (bestKPH / job.kphGoal) * 100))
  scores.push(Math.min(100, (bestAcc / job.accGoal) * 100))

  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
}
