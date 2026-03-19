export interface Deal {
  id: string
  name: string
  address: string
  city: string
  state: string
  county: string
  lat: number
  lng: number
  type: "Multifamily" | "Mixed-Use" | "Adaptive Reuse" | "Historic" | "Development Site"
  units: number
  sqft: number
  askingPrice: number | null
  estimatedValue: number
  pricePerUnit: number
  currentNOI: number
  proFormaNOI: number
  capRate: number
  proFormaCapRate: number
  historicTaxCredit: boolean
  adaptiveReuse: boolean
  proximityScore: number
  aiScore: number
  aiSignals: string[]
  source: string[]
  dateFound: string
  status: "new" | "reviewing" | "loi" | "due_diligence" | "closed" | "passed"
  keyFeatures: string[]
  hidden?: boolean
}

export const mockDeals: Deal[] = [
  {
    id: "WC-2026-001",
    name: "Former Delco Building",
    address: "401 E. Monument Ave",
    city: "Dayton",
    state: "OH",
    county: "Montgomery",
    lat: 39.7631,
    lng: -84.1818,
    type: "Adaptive Reuse",
    units: 48,
    sqft: 62000,
    askingPrice: null,
    estimatedValue: 4200000,
    pricePerUnit: 87500,
    currentNOI: 0,
    proFormaNOI: 528000,
    capRate: 0,
    proFormaCapRate: 8.2,
    historicTaxCredit: true,
    adaptiveReuse: true,
    proximityScore: 9.2,
    aiScore: 9.4,
    aiSignals: [
      "Historic tax credit eligible (National Register listed)",
      "Within 0.5mi of existing Webster Station project",
      "Opportunity Zone -- additional tax benefits",
      "Seller distressed -- tax delinquent 14 months"
    ],
    source: ["CoStar", "Montgomery County Auditor", "National Register of Historic Places"],
    dateFound: "2026-03-12",
    status: "reviewing",
    keyFeatures: ["Art Deco facade", "Open floor plans", "Freight elevator", "Adjacent parking lot"]
  },
  {
    id: "WC-2026-002",
    name: "Oakwood Arms Apartments",
    address: "1220 Far Hills Ave",
    city: "Oakwood",
    state: "OH",
    county: "Montgomery",
    lat: 39.7250,
    lng: -84.1745,
    type: "Multifamily",
    units: 36,
    sqft: 42000,
    askingPrice: 3800000,
    estimatedValue: 3600000,
    pricePerUnit: 105556,
    currentNOI: 264000,
    proFormaNOI: 360000,
    capRate: 6.9,
    proFormaCapRate: 9.4,
    historicTaxCredit: false,
    adaptiveReuse: false,
    proximityScore: 6.8,
    aiScore: 7.8,
    aiSignals: [
      "Below market rents -- $200/unit upside potential",
      "Deferred maintenance creates value-add opportunity",
      "Strong school district -- Oakwood City Schools",
      "Owner retiring -- long-term hold (22 years)"
    ],
    source: ["LoopNet", "Broker Network", "Montgomery County Auditor"],
    dateFound: "2026-03-10",
    status: "new",
    keyFeatures: ["Garden-style", "In-unit laundry hookups", "Updated HVAC", "Gated parking"]
  },
  {
    id: "WC-2026-003",
    name: "Third Street Lofts",
    address: "33 W. Third Street",
    city: "Dayton",
    state: "OH",
    county: "Montgomery",
    lat: 39.7580,
    lng: -84.1916,
    type: "Adaptive Reuse",
    units: 24,
    sqft: 35000,
    askingPrice: null,
    estimatedValue: 1800000,
    pricePerUnit: 75000,
    currentNOI: 0,
    proFormaNOI: 312000,
    capRate: 0,
    proFormaCapRate: 9.8,
    historicTaxCredit: true,
    adaptiveReuse: true,
    proximityScore: 8.5,
    aiScore: 8.7,
    aiSignals: [
      "Adjacent to Fire Blocks District -- synergy with existing project",
      "Historic tax credit pre-qualified",
      "City offering TIF incentives for downtown redevelopment",
      "Estate sale -- heirs motivated to liquidate"
    ],
    source: ["Montgomery County Auditor", "Public Records", "National Register"],
    dateFound: "2026-03-08",
    status: "loi",
    keyFeatures: ["Exposed brick", "12ft ceilings", "Rooftop potential", "Ground floor retail"]
  },
  {
    id: "WC-2026-004",
    name: "Riverside Commons",
    address: "800 Riverside Dr",
    city: "Columbus",
    state: "OH",
    county: "Franklin",
    lat: 39.9750,
    lng: -83.0100,
    type: "Mixed-Use",
    units: 64,
    sqft: 85000,
    askingPrice: 8500000,
    estimatedValue: 8200000,
    pricePerUnit: 132813,
    currentNOI: 580000,
    proFormaNOI: 768000,
    capRate: 6.8,
    proFormaCapRate: 9.0,
    historicTaxCredit: false,
    adaptiveReuse: false,
    proximityScore: 4.2,
    aiScore: 7.2,
    aiSignals: [
      "Columbus market expansion opportunity",
      "Mixed-use with 8,000 SF ground floor retail",
      "Value-add through unit upgrades -- 30% rent upside",
      "Near Short North arts district"
    ],
    source: ["CoStar", "LoopNet", "Franklin County Auditor"],
    dateFound: "2026-03-05",
    status: "new",
    keyFeatures: ["Ground floor retail", "Rooftop deck", "EV charging", "Bike storage"]
  },
  {
    id: "WC-2026-005",
    name: "Yellow Springs Mill",
    address: "225 Xenia Ave",
    city: "Yellow Springs",
    state: "OH",
    county: "Greene",
    lat: 39.8032,
    lng: -83.8870,
    type: "Historic",
    units: 18,
    sqft: 22000,
    askingPrice: null,
    estimatedValue: 1400000,
    pricePerUnit: 77778,
    currentNOI: 0,
    proFormaNOI: 216000,
    capRate: 0,
    proFormaCapRate: 9.6,
    historicTaxCredit: true,
    adaptiveReuse: true,
    proximityScore: 7.5,
    aiScore: 8.9,
    aiSignals: [
      "Federal + State historic tax credits -- up to 45% of rehab costs",
      "Near Antioch College campus -- synergy with existing project",
      "Village overlay district supports adaptive reuse",
      "Strong rental demand -- Antioch + remote workers"
    ],
    source: ["Greene County Auditor", "Ohio Preservation Alliance", "Public Records"],
    dateFound: "2026-03-01",
    status: "due_diligence",
    keyFeatures: ["Stone construction", "Mill race feature", "Village zoning", "Walk to downtown"]
  },
  {
    id: "WC-2026-006",
    name: "Grant Avenue Warehouse",
    address: "550 Grant Ave",
    city: "Columbus",
    state: "OH",
    county: "Franklin",
    lat: 39.9680,
    lng: -82.9950,
    type: "Development Site",
    units: 72,
    sqft: 95000,
    askingPrice: null,
    estimatedValue: 5800000,
    pricePerUnit: 80556,
    currentNOI: 0,
    proFormaNOI: 864000,
    capRate: 0,
    proFormaCapRate: 9.2,
    historicTaxCredit: false,
    adaptiveReuse: true,
    proximityScore: 3.8,
    aiScore: 8.1,
    aiSignals: [
      "Zoned for mixed-use redevelopment",
      "City incentives available -- Enterprise Zone",
      "Tax foreclosure pending -- aggressive timeline",
      "Adjacent to new transit corridor"
    ],
    source: ["Franklin County Auditor", "City of Columbus Planning", "CoStar"],
    dateFound: "2026-03-14",
    status: "new",
    keyFeatures: ["Clear span structure", "Loading docks", "2.1 acre lot", "Rail adjacent"],
    hidden: true
  },
  {
    id: "WC-2026-007",
    name: "Springfield Motor Works",
    address: "100 N. Limestone St",
    city: "Springfield",
    state: "OH",
    county: "Clark",
    lat: 39.9242,
    lng: -83.8088,
    type: "Adaptive Reuse",
    units: 30,
    sqft: 40000,
    askingPrice: null,
    estimatedValue: 2100000,
    pricePerUnit: 70000,
    currentNOI: 0,
    proFormaNOI: 378000,
    capRate: 0,
    proFormaCapRate: 10.1,
    historicTaxCredit: true,
    adaptiveReuse: true,
    proximityScore: 5.2,
    aiScore: 8.5,
    aiSignals: [
      "National Register eligible -- Art Deco industrial",
      "Springfield CRA offers 100% property tax abatement 15yr",
      "Bank-owned -- REO sale, below market pricing expected",
      "Strong LIHTC scoring potential"
    ],
    source: ["Clark County Auditor", "HUD REO Listings", "Ohio SHPO"],
    dateFound: "2026-03-14",
    status: "new",
    keyFeatures: ["Sawtooth roof", "Natural light", "High ceilings", "Corner lot"],
    hidden: true
  }
]

export const dashboardStats = {
  totalDealsFound: 42,
  newThisWeek: 8,
  highScore: 12,
  avgCapRate: 8.4,
  totalUnits: 198,
  avgAiScore: 7.8,
  marketsMonitored: 5,
  sourcesActive: 15,
  lastScanTime: "2026-03-14T09:15:00",
  marketBreakdown: [
    { market: "Dayton, OH", deals: 14, units: 86 },
    { market: "Columbus, OH", deals: 11, units: 72 },
    { market: "Springfield, OH", deals: 6, units: 38 },
    { market: "Yellow Springs, OH", deals: 4, units: 22 },
    { market: "Cincinnati, OH", deals: 7, units: 45 },
  ],
  criteriaBreakdown: [
    { signal: "Historic Tax Credit Eligible", count: 14 },
    { signal: "Adaptive Reuse Potential", count: 11 },
    { signal: "Opportunity Zone", count: 8 },
    { signal: "Near Existing Portfolio", count: 9 },
    { signal: "Below Market Rents", count: 16 },
    { signal: "Distressed Seller", count: 7 },
    { signal: "TIF / Abatement Available", count: 6 },
    { signal: "Mixed-Use Potential", count: 5 },
  ]
}
