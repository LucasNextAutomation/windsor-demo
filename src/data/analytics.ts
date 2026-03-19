// Monthly occupancy data (last 12 months)
export const monthlyOccupancy = [
  { month: "Apr 25", portfolio: 93.2, target: 95 },
  { month: "May 25", portfolio: 93.8, target: 95 },
  { month: "Jun 25", portfolio: 94.1, target: 95 },
  { month: "Jul 25", portfolio: 94.5, target: 95 },
  { month: "Aug 25", portfolio: 95.0, target: 95 },
  { month: "Sep 25", portfolio: 95.2, target: 95 },
  { month: "Oct 25", portfolio: 95.4, target: 95 },
  { month: "Nov 25", portfolio: 95.1, target: 95 },
  { month: "Dec 25", portfolio: 94.8, target: 95 },
  { month: "Jan 26", portfolio: 94.6, target: 95 },
  { month: "Feb 26", portfolio: 95.1, target: 95 },
  { month: "Mar 26", portfolio: 95.4, target: 95 },
]

// Monthly NOI waterfall
export const noiWaterfall = [
  { name: "Gross Revenue", value: 990400, fill: "#22c55e" },
  { name: "Vacancy Loss", value: -49500, fill: "#ef4444" },
  { name: "Effective Revenue", value: 940900, fill: "#22c55e" },
  { name: "Operating Expenses", value: -497000, fill: "#ef4444" },
  { name: "Net Operating Income", value: 443400, fill: "#1a365d" },
]

// Rent comparison by property (avg rent vs market)
export const rentComps = [
  { name: "Fire Blocks", current: 1550, market: 1625 },
  { name: "Oregon District", current: 1700, market: 1750 },
  { name: "Cannery Lofts", current: 1450, market: 1525 },
  { name: "Patterson Place", current: 1360, market: 1400 },
  { name: "YS Village", current: 1500, market: 1550 },
  { name: "Kettering", current: 1300, market: 1375 },
  { name: "Beavercreek", current: 1300, market: 1400 },
  { name: "South Park", current: 1400, market: 1450 },
  { name: "Centerville", current: 1300, market: 1350 },
  { name: "Troy Square", current: 1400, market: 1500 },
]

// Lease expirations by month (next 12 months)
export const leaseExpirations = [
  { month: "Apr 26", count: 31, revenue: 42500 },
  { month: "May 26", count: 28, revenue: 38200 },
  { month: "Jun 26", count: 45, revenue: 61500 },
  { month: "Jul 26", count: 52, revenue: 71000 },
  { month: "Aug 26", count: 38, revenue: 51800 },
  { month: "Sep 26", count: 34, revenue: 46400 },
  { month: "Oct 26", count: 29, revenue: 39600 },
  { month: "Nov 26", count: 22, revenue: 30000 },
  { month: "Dec 26", count: 18, revenue: 24600 },
  { month: "Jan 27", count: 25, revenue: 34100 },
  { month: "Feb 27", count: 30, revenue: 41000 },
  { month: "Mar 27", count: 36, revenue: 49200 },
]

// Anomaly alerts
export interface AnomalyAlert {
  id: string
  property: string
  category: string
  severity: "critical" | "warning" | "info"
  title: string
  description: string
  detectedDate: string
  impact: string
}

export const anomalyAlerts: AnomalyAlert[] = [
  {
    id: "ANM-001",
    property: "Arbors North",
    category: "Expense",
    severity: "critical",
    title: "Maintenance spend 74% below average",
    description: "March maintenance: $2,100 vs 6-month avg of $8,200. Possible missed invoices or deferred maintenance.",
    detectedDate: "2026-03-15",
    impact: "$6,100/mo potential underreporting"
  },
  {
    id: "ANM-002",
    property: "Huffman Lofts",
    category: "Insurance",
    severity: "critical",
    title: "Insurance payment not posted",
    description: "Monthly insurance premium ($4,200) due March 15 has not posted to GL. Previous 11 months were posted by the 17th.",
    detectedDate: "2026-03-18",
    impact: "Coverage gap risk"
  },
  {
    id: "ANM-003",
    property: "Deneau Tower",
    category: "Vendor",
    severity: "warning",
    title: "New vendor: Apex HVAC Systems",
    description: "First invoice from Apex HVAC ($12,400). No prior relationship in Sage. May require W-9 and vendor approval.",
    detectedDate: "2026-03-14",
    impact: "$12,400 pending approval"
  },
  {
    id: "ANM-004",
    property: "Troy Square",
    category: "Revenue",
    severity: "warning",
    title: "Rent collection 8% below forecast",
    description: "March collections at $51,520 vs $56,000 forecast. 3 units with 15+ day late payments.",
    detectedDate: "2026-03-16",
    impact: "$4,480/mo revenue shortfall"
  },
  {
    id: "ANM-005",
    property: "Portfolio-wide",
    category: "Lease",
    severity: "info",
    title: "52 leases expiring in July 2026",
    description: "Highest monthly expiration in next 12 months. Recommend initiating renewal outreach by May 1.",
    detectedDate: "2026-03-19",
    impact: "$71,000/mo revenue at risk"
  }
]
