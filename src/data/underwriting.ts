export interface FinancingStructure {
  name: string
  type: string
  loanAmount: number
  rate: number
  term: number
  amortization: number
  annualDebtService: number
  equityRequired: number
  dscr: number
  cashOnCash: number
  irr5yr: number
  irr10yr: number
  equityMultiple: number
}

export interface ProFormaYear {
  year: number
  grossRevenue: number
  vacancy: number
  effectiveRevenue: number
  opex: number
  noi: number
  debtService: number
  cashFlow: number
  cashOnCash: number
}

export interface RiskFlag {
  id: string
  severity: "high" | "medium" | "low"
  category: string
  title: string
  description: string
  mitigation: string
}

export interface UnderwritingDeal {
  id: string
  name: string
  address: string
  city: string
  county: string
  type: string
  units: number
  sqft: number
  yearBuilt: number
  acquisitionCost: number
  hardCosts: number
  softCosts: number
  totalProjectCost: number
  costPerUnit: number
  costPerSF: number
  historicTaxCredits: { federal: number; state: number; total: number }
  stabilizedNOI: number
  stabilizedCapRate: number
  proForma: ProFormaYear[]
  financingStructures: FinancingStructure[]
  riskFlags: RiskFlag[]
  comparableDeals: { name: string; units: number; costPerUnit: number; capRate: number; year: number }[]
  sensitivity: { label: string; baseCase: number; downside: number; upside: number }[]
}

// Sample deal: Former office building → 48 luxury apartments (Deneau Tower-style)
export const sampleDeal: UnderwritingDeal = {
  id: "UW-001",
  name: "Former Delco Building",
  address: "401 E. Monument Ave",
  city: "Dayton",
  county: "Montgomery",
  type: "Adaptive Reuse",
  units: 48,
  sqft: 62000,
  yearBuilt: 1928,
  acquisitionCost: 4200000,
  hardCosts: 8400000,  // $175K/unit rehab
  softCosts: 2520000,  // 30% of hard costs
  totalProjectCost: 15120000, // acq + hard + soft
  costPerUnit: 315000,
  costPerSF: 243,
  historicTaxCredits: {
    federal: 2520000,  // 20% of qualified rehab ($12.6M hard+soft * 0.20)
    state: 3150000,    // 25% of qualified rehab
    total: 5670000
  },
  stabilizedNOI: 1056000,  // 48 units × $1,550 avg rent × 12 × 0.95 occupancy - 45% opex
  stabilizedCapRate: 7.0,
  proForma: [
    { year: 1, grossRevenue: 892800, vacancy: 133920, effectiveRevenue: 758880, opex: 357600, noi: 401280, debtService: 0, cashFlow: 401280, cashOnCash: 0 }, // lease-up year
    { year: 2, grossRevenue: 982080, vacancy: 49104, effectiveRevenue: 932976, opex: 393360, noi: 539616, debtService: 0, cashFlow: 539616, cashOnCash: 0 },
    { year: 3, grossRevenue: 1011342, vacancy: 50567, effectiveRevenue: 960775, opex: 405161, noi: 555614, debtService: 0, cashFlow: 555614, cashOnCash: 0 },
    { year: 4, grossRevenue: 1041682, vacancy: 52084, effectiveRevenue: 989598, opex: 417316, noi: 572282, debtService: 0, cashFlow: 572282, cashOnCash: 0 },
    { year: 5, grossRevenue: 1072933, vacancy: 53647, effectiveRevenue: 1019286, opex: 429835, noi: 589451, debtService: 0, cashFlow: 589451, cashOnCash: 0 },
    { year: 6, grossRevenue: 1105121, vacancy: 55256, effectiveRevenue: 1049865, opex: 442730, noi: 607135, debtService: 0, cashFlow: 607135, cashOnCash: 0 },
    { year: 7, grossRevenue: 1138274, vacancy: 56914, effectiveRevenue: 1081360, opex: 456012, noi: 625348, debtService: 0, cashFlow: 625348, cashOnCash: 0 },
    { year: 8, grossRevenue: 1172422, vacancy: 58621, effectiveRevenue: 1113801, opex: 469692, noi: 644109, debtService: 0, cashFlow: 644109, cashOnCash: 0 },
    { year: 9, grossRevenue: 1207595, vacancy: 60380, effectiveRevenue: 1147215, opex: 483783, noi: 663432, debtService: 0, cashFlow: 663432, cashOnCash: 0 },
    { year: 10, grossRevenue: 1243823, vacancy: 62191, effectiveRevenue: 1181632, opex: 498296, noi: 683336, debtService: 0, cashFlow: 683336, cashOnCash: 0 }
  ],
  financingStructures: [
    {
      name: "Conventional",
      type: "Senior Debt",
      loanAmount: 9828000,  // 65% LTV on $15.12M
      rate: 7.25,
      term: 10,
      amortization: 25,
      annualDebtService: 854000,
      equityRequired: 5292000,
      dscr: 1.24,
      cashOnCash: 5.8,
      irr5yr: 14.2,
      irr10yr: 16.8,
      equityMultiple: 2.1
    },
    {
      name: "Bridge + Perm",
      type: "Bridge to Agency",
      loanAmount: 12096000,  // 80% LTC
      rate: 9.5,
      term: 3,
      amortization: 30,
      annualDebtService: 1020000,
      equityRequired: 3024000,
      dscr: 1.04,
      cashOnCash: 3.2,
      irr5yr: 16.8,
      irr10yr: 19.4,
      equityMultiple: 2.4
    },
    {
      name: "HTC + Conv.",
      type: "Historic Tax Credits",
      loanAmount: 7560000,  // 50% LTV
      rate: 6.75,
      term: 10,
      amortization: 25,
      annualDebtService: 632000,
      equityRequired: 1890000,  // After HTC equity ($5.67M)
      dscr: 1.67,
      cashOnCash: 11.3,
      irr5yr: 18.7,
      irr10yr: 21.2,
      equityMultiple: 2.8
    },
    {
      name: "HTC + LIHTC",
      type: "Layered Credits",
      loanAmount: 6048000,  // 40% LTV
      rate: 5.5,
      term: 15,
      amortization: 30,
      annualDebtService: 468000,
      equityRequired: 1260000,  // After HTC + LIHTC equity
      dscr: 2.13,
      cashOnCash: 15.8,
      irr5yr: 22.1,
      irr10yr: 24.6,
      equityMultiple: 3.2
    }
  ],
  riskFlags: [
    {
      id: "RF-001",
      severity: "high",
      category: "Environmental",
      title: "Phase I ESA recommended",
      description: "Former industrial use (Delco electrical manufacturing). Potential soil contamination requires Phase I Environmental Site Assessment before acquisition.",
      mitigation: "Budget $15,000-25,000 for Phase I. If contamination found, negotiate remediation credit or walkaway clause."
    },
    {
      id: "RF-002",
      severity: "medium",
      category: "Historic Compliance",
      title: "SHPO facade review required",
      description: "National Register listing requires Ohio SHPO approval for exterior modifications. Art Deco facade elements must be preserved per Secretary of Interior Standards.",
      mitigation: "Engage preservation architect early. Budget 10-15% premium on exterior work. Plan 60-90 day SHPO review timeline."
    },
    {
      id: "RF-003",
      severity: "medium",
      category: "Market",
      title: "Lease-up absorption risk",
      description: "48 units entering a submarket with 5.2% vacancy. Pro forma assumes 85% Year 1 occupancy. Downtown Dayton absorption rate is ~15 units/quarter.",
      mitigation: "Phase delivery (24 units per release). Pre-lease marketing 90 days before completion. Consider concessions for first 6 months."
    },
    {
      id: "RF-004",
      severity: "low",
      category: "Construction",
      title: "VRF HVAC system lead times",
      description: "Variable Refrigerant Flow systems have 12-16 week lead times. Required for adaptive reuse of office building without existing ductwork.",
      mitigation: "Order equipment in first 30 days of construction. Source from 2+ suppliers to mitigate delay risk."
    }
  ],
  comparableDeals: [
    { name: "Grant-Deneau Tower", units: 147, costPerUnit: 340000, capRate: 6.5, year: 2024 },
    { name: "Huffman Lofts", units: 84, costPerUnit: 195000, capRate: 7.2, year: 2019 },
    { name: "Graphic Arts Lofts", units: 20, costPerUnit: 225000, capRate: 7.8, year: 2020 },
    { name: "Home Telephone Lofts", units: 19, costPerUnit: 210000, capRate: 8.1, year: 2023 }
  ],
  sensitivity: [
    { label: "Exit Cap Rate", baseCase: 18.7, downside: 14.2, upside: 22.4 },
    { label: "Rent Growth", baseCase: 18.7, downside: 15.1, upside: 21.8 },
    { label: "Construction Cost", baseCase: 18.7, downside: 16.3, upside: 20.1 },
    { label: "Occupancy", baseCase: 18.7, downside: 13.8, upside: 19.9 }
  ]
}
