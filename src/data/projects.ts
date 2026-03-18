export interface Project {
  id: string
  name: string
  address: string
  city: string
  type: "Adaptive Reuse" | "New Construction" | "Renovation" | "Historic Rehab"
  status: "active" | "pre-construction" | "complete"
  units: number
  totalBudget: number
  spent: number
  percentComplete: number
  startDate: string
  targetCompletion: string
  gcContractor: string
  openInvoices: number
  pendingDraws: number
  permits: { type: string; status: "approved" | "pending" | "under_review"; jurisdiction: string }[]
  budgetLines: { category: string; budgeted: number; spent: number; remaining: number }[]
  recentActivity: { date: string; text: string; type: "invoice" | "permit" | "draw" | "milestone" }[]
}

export const projects: Project[] = [
  {
    id: "PRJ-001",
    name: "Grant-Deneau Tower",
    address: "40 W. Fourth Street",
    city: "Dayton",
    type: "Adaptive Reuse",
    status: "active",
    units: 82,
    totalBudget: 18500000,
    spent: 12840000,
    percentComplete: 68,
    startDate: "2025-04-15",
    targetCompletion: "2026-09-30",
    gcContractor: "Danis Building Construction",
    openInvoices: 14,
    pendingDraws: 2,
    permits: [
      { type: "Building Permit", status: "approved", jurisdiction: "City of Dayton" },
      { type: "Historic Preservation", status: "approved", jurisdiction: "Ohio SHPO" },
      { type: "Fire Suppression", status: "approved", jurisdiction: "City of Dayton" },
      { type: "Certificate of Occupancy", status: "pending", jurisdiction: "City of Dayton" },
    ],
    budgetLines: [
      { category: "Acquisition", budgeted: 3200000, spent: 3200000, remaining: 0 },
      { category: "Hard Costs - Structural", budgeted: 4800000, spent: 3960000, remaining: 840000 },
      { category: "Hard Costs - MEP", budgeted: 3200000, spent: 2240000, remaining: 960000 },
      { category: "Hard Costs - Finishes", budgeted: 2400000, spent: 1200000, remaining: 1200000 },
      { category: "Soft Costs", budgeted: 1850000, spent: 1480000, remaining: 370000 },
      { category: "Contingency (10%)", budgeted: 1850000, spent: 460000, remaining: 1390000 },
      { category: "Developer Fee", budgeted: 1200000, spent: 300000, remaining: 900000 },
    ],
    recentActivity: [
      { date: "2026-03-14", text: "Invoice #4821 from Danis - $284,000 (structural steel Phase 3)", type: "invoice" },
      { date: "2026-03-12", text: "Draw #8 submitted to KeyBank - $1.2M", type: "draw" },
      { date: "2026-03-10", text: "MEP rough-in complete - floors 4-8", type: "milestone" },
      { date: "2026-03-08", text: "CO application pre-submitted to City of Dayton", type: "permit" },
    ]
  },
  {
    id: "PRJ-002",
    name: "Webster Station",
    address: "200 Webster Street",
    city: "Dayton",
    type: "Historic Rehab",
    status: "active",
    units: 44,
    totalBudget: 9200000,
    spent: 4140000,
    percentComplete: 42,
    startDate: "2025-09-01",
    targetCompletion: "2026-12-15",
    gcContractor: "Turner Construction",
    openInvoices: 8,
    pendingDraws: 1,
    permits: [
      { type: "Building Permit", status: "approved", jurisdiction: "City of Dayton" },
      { type: "Historic Preservation", status: "approved", jurisdiction: "Ohio SHPO" },
      { type: "Environmental (Asbestos)", status: "approved", jurisdiction: "Ohio EPA" },
      { type: "Zoning Variance", status: "under_review", jurisdiction: "City of Dayton" },
    ],
    budgetLines: [
      { category: "Acquisition", budgeted: 1800000, spent: 1800000, remaining: 0 },
      { category: "Hard Costs - Structural", budgeted: 2400000, spent: 1200000, remaining: 1200000 },
      { category: "Hard Costs - MEP", budgeted: 1600000, spent: 480000, remaining: 1120000 },
      { category: "Hard Costs - Finishes", budgeted: 1200000, spent: 120000, remaining: 1080000 },
      { category: "Soft Costs", budgeted: 920000, spent: 460000, remaining: 460000 },
      { category: "Contingency", budgeted: 920000, spent: 80000, remaining: 840000 },
      { category: "Developer Fee", budgeted: 360000, spent: 0, remaining: 360000 },
    ],
    recentActivity: [
      { date: "2026-03-13", text: "Asbestos abatement complete - all floors cleared", type: "milestone" },
      { date: "2026-03-11", text: "Invoice #2247 from Turner - $186,000 (demo Phase 2)", type: "invoice" },
      { date: "2026-03-09", text: "Zoning variance hearing scheduled Mar 22", type: "permit" },
      { date: "2026-03-07", text: "Draw #4 approved by Heritage Ohio Capital - $620K", type: "draw" },
    ]
  },
  {
    id: "PRJ-003",
    name: "Fire Blocks District",
    address: "10 N. Main Street",
    city: "Dayton",
    type: "Adaptive Reuse",
    status: "active",
    units: 120,
    totalBudget: 32000000,
    spent: 28480000,
    percentComplete: 88,
    startDate: "2024-06-01",
    targetCompletion: "2026-06-30",
    gcContractor: "Messer Construction",
    openInvoices: 6,
    pendingDraws: 1,
    permits: [
      { type: "Building Permit", status: "approved", jurisdiction: "City of Dayton" },
      { type: "Historic Preservation", status: "approved", jurisdiction: "Ohio SHPO" },
      { type: "Certificate of Occupancy", status: "under_review", jurisdiction: "City of Dayton" },
    ],
    budgetLines: [
      { category: "Acquisition", budgeted: 5200000, spent: 5200000, remaining: 0 },
      { category: "Hard Costs - Structural", budgeted: 8800000, spent: 8800000, remaining: 0 },
      { category: "Hard Costs - MEP", budgeted: 5600000, spent: 5320000, remaining: 280000 },
      { category: "Hard Costs - Finishes", budgeted: 4800000, spent: 4200000, remaining: 600000 },
      { category: "Soft Costs", budgeted: 3200000, spent: 2880000, remaining: 320000 },
      { category: "Contingency", budgeted: 2400000, spent: 880000, remaining: 1520000 },
      { category: "Developer Fee", budgeted: 2000000, spent: 1200000, remaining: 800000 },
    ],
    recentActivity: [
      { date: "2026-03-14", text: "Phase 3 units punch list started - 24 units", type: "milestone" },
      { date: "2026-03-12", text: "First 48 units achieving 92% lease-up", type: "milestone" },
      { date: "2026-03-10", text: "CO inspection scheduled for Phase 3 - Mar 28", type: "permit" },
      { date: "2026-03-08", text: "Draw #18 submitted - $890K (finishes Phase 3)", type: "draw" },
    ]
  },
  {
    id: "PRJ-004",
    name: "Antioch Village",
    address: "795 Livermore Street",
    city: "Yellow Springs",
    type: "New Construction",
    status: "pre-construction",
    units: 32,
    totalBudget: 7800000,
    spent: 780000,
    percentComplete: 8,
    startDate: "2026-05-01",
    targetCompletion: "2027-08-30",
    gcContractor: "TBD - Bidding",
    openInvoices: 3,
    pendingDraws: 0,
    permits: [
      { type: "Site Plan Approval", status: "approved", jurisdiction: "Village of Yellow Springs" },
      { type: "Building Permit", status: "pending", jurisdiction: "Village of Yellow Springs" },
      { type: "Storm Water", status: "under_review", jurisdiction: "Greene County" },
    ],
    budgetLines: [
      { category: "Land", budgeted: 1200000, spent: 600000, remaining: 600000 },
      { category: "Hard Costs", budgeted: 4200000, spent: 0, remaining: 4200000 },
      { category: "Soft Costs", budgeted: 1200000, spent: 180000, remaining: 1020000 },
      { category: "Contingency", budgeted: 780000, spent: 0, remaining: 780000 },
      { category: "Developer Fee", budgeted: 420000, spent: 0, remaining: 420000 },
    ],
    recentActivity: [
      { date: "2026-03-13", text: "GC bid packages sent - 4 contractors invited", type: "milestone" },
      { date: "2026-03-11", text: "Geotech report received - no issues", type: "milestone" },
      { date: "2026-03-09", text: "Building permit application submitted", type: "permit" },
      { date: "2026-03-05", text: "Invoice from BHDP Architecture - $42,000 (CD set)", type: "invoice" },
    ]
  },
]

export interface Invoice {
  id: string
  projectId: string
  vendor: string
  amount: number
  budgetLine: string
  dateReceived: string
  status: "pending_review" | "approved" | "paid" | "flagged"
  aiMatch: number
  aiNotes: string | null
}

export const recentInvoices: Invoice[] = [
  { id: "INV-4821", projectId: "PRJ-001", vendor: "Danis Building Construction", amount: 284000, budgetLine: "Hard Costs - Structural", dateReceived: "2026-03-14", status: "pending_review", aiMatch: 96, aiNotes: null },
  { id: "INV-4819", projectId: "PRJ-001", vendor: "Schaefer Engineering", amount: 42000, budgetLine: "Soft Costs", dateReceived: "2026-03-13", status: "approved", aiMatch: 100, aiNotes: null },
  { id: "INV-2247", projectId: "PRJ-002", vendor: "Turner Construction", amount: 186000, budgetLine: "Hard Costs - Structural", dateReceived: "2026-03-11", status: "approved", aiMatch: 94, aiNotes: null },
  { id: "INV-8901", projectId: "PRJ-003", vendor: "Messer Construction", amount: 312000, budgetLine: "Hard Costs - Finishes", dateReceived: "2026-03-10", status: "paid", aiMatch: 98, aiNotes: null },
  { id: "INV-2244", projectId: "PRJ-002", vendor: "Environmental Solutions Inc", amount: 68000, budgetLine: "Hard Costs - Structural", dateReceived: "2026-03-09", status: "flagged", aiMatch: 72, aiNotes: "Amount exceeds contract allowance by $12,000. Recommend requesting backup documentation." },
  { id: "INV-4815", projectId: "PRJ-001", vendor: "ABC Fire Protection", amount: 156000, budgetLine: "Hard Costs - MEP", dateReceived: "2026-03-08", status: "approved", aiMatch: 91, aiNotes: null },
  { id: "INV-0034", projectId: "PRJ-004", vendor: "BHDP Architecture", amount: 42000, budgetLine: "Soft Costs", dateReceived: "2026-03-05", status: "paid", aiMatch: 100, aiNotes: null },
  { id: "INV-8897", projectId: "PRJ-003", vendor: "Pinnacle Electric", amount: 89000, budgetLine: "Hard Costs - MEP", dateReceived: "2026-03-04", status: "flagged", aiMatch: 78, aiNotes: "Change order #7 not pre-approved. Line item for 'additional circuits floor 6' not in original scope." },
]

export const projectStats = {
  totalProjects: 4,
  activeProjects: 3,
  totalBudget: 67500000,
  totalSpent: 46240000,
  openInvoices: 31,
  pendingDraws: 4,
  avgCompletion: 52,
  flaggedInvoices: 2,
}
