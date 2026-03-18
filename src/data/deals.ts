export interface Deal {
  id: string
  address: string
  city: string
  state: string
  county: string
  units: number
  class: "C" | "B-" | "B" | "C+"
  yearBuilt: number
  sqft: number
  lotSize: string
  askingPrice: number | null
  estimatedValue: number
  pricePerUnit: number
  currentNOI: number
  proFormaNOI: number
  capRate: number
  proFormaCapRate: number
  cashOnCash: number
  irr5yr: number
  equityMultiple: number
  dscr: number
  rentPerUnit: number
  fairMarketRent: number
  valueAddUpside: number
  distressScore: number
  distressSignals: string[]
  ownerName: string
  ownerType: "LLC" | "Individual" | "Trust" | "Estate"
  ownerAddress: string
  ownershipYears: number
  phone: string | null
  email: string | null
  taxStatus: string
  mortgageBalance: number | null
  assessedValue: number
  lastSaleDate: string
  lastSalePrice: number
  lienHistory: string[]
  source: string[]
  dateFound: string
  status: "new" | "contacted" | "underwriting" | "passed"
  unitMix: { type: string; count: number; rent: number }[]
  expenses: { category: string; annual: number }[]
  hidden?: boolean
}

export const mockDeals: Deal[] = [
  {
    id: "DEAL-001",
    address: "47 Elm Street",
    city: "Nashua",
    state: "NH",
    county: "Hillsborough",
    units: 18,
    class: "C",
    yearBuilt: 1962,
    sqft: 14400,
    lotSize: "0.45 acres",
    askingPrice: null,
    estimatedValue: 1850000,
    pricePerUnit: 102778,
    currentNOI: 142000,
    proFormaNOI: 198000,
    capRate: 7.68,
    proFormaCapRate: 10.7,
    cashOnCash: 9.2,
    irr5yr: 22.4,
    equityMultiple: 2.3,
    dscr: 1.42,
    rentPerUnit: 1150,
    fairMarketRent: 1420,
    valueAddUpside: 35,
    distressScore: 8.5,
    distressSignals: [
      "Tax delinquent — 18 months",
      "LLC dissolved (Heritage Properties LLC — MA SOS 12/2025)",
      "Mechanic's lien filed ($47,200 — Suffolk Registry 01/2026)",
      "Absentee owner — mailing address FL"
    ],
    ownerName: "Heritage Properties LLC",
    ownerType: "LLC",
    ownerAddress: "2847 Palm Beach Blvd, Fort Lauderdale, FL 33306",
    ownershipYears: 17,
    phone: "(603) 555-0184",
    email: null,
    taxStatus: "Delinquent — $34,200 owed (FY24 + FY25)",
    mortgageBalance: 620000,
    assessedValue: 1420000,
    lastSaleDate: "2008-03-15",
    lastSalePrice: 890000,
    lienHistory: [
      "Mechanic's lien — $47,200 (01/2026)",
      "Water/sewer lien — $8,400 (09/2025)"
    ],
    source: ["NH Registry of Deeds", "MA Secretary of State", "Town Assessor (Nashua)"],
    dateFound: "2026-03-01",
    status: "new",
    unitMix: [
      { type: "1BR", count: 10, rent: 1050 },
      { type: "2BR", count: 6, rent: 1280 },
      { type: "3BR", count: 2, rent: 1450 }
    ],
    expenses: [
      { category: "Property Tax", annual: 28400 },
      { category: "Insurance", annual: 14200 },
      { category: "Maintenance & Repairs", annual: 21600 },
      { category: "Property Management (8%)", annual: 19872 },
      { category: "Utilities (common areas)", annual: 9600 },
      { category: "Water/Sewer", annual: 12800 },
      { category: "Trash Removal", annual: 4800 },
      { category: "Vacancy Reserve (5%)", annual: 12420 }
    ]
  },
  {
    id: "DEAL-002",
    address: "312 Commonwealth Ave",
    city: "Lowell",
    state: "MA",
    county: "Middlesex",
    units: 32,
    class: "C+",
    yearBuilt: 1958,
    sqft: 25600,
    lotSize: "0.62 acres",
    askingPrice: null,
    estimatedValue: 3200000,
    pricePerUnit: 100000,
    currentNOI: 233606,
    proFormaNOI: 336000,
    capRate: 7.3,
    proFormaCapRate: 10.5,
    cashOnCash: 8.8,
    irr5yr: 19.6,
    equityMultiple: 2.1,
    dscr: 1.35,
    rentPerUnit: 1180,
    fairMarketRent: 1520,
    valueAddUpside: 29,
    distressScore: 9.2,
    distressSignals: [
      "Executor deed filed — estate of Robert Callahan (Middlesex Registry 02/2026)",
      "Probate case active — Middlesex Probate Court",
      "Tax delinquent — 24 months ($52,800 owed)",
      "Code violations — 3 open (fire escape, boiler, egress windows)",
      "High equity — no mortgage on record"
    ],
    ownerName: "Estate of Robert J. Callahan",
    ownerType: "Estate",
    ownerAddress: "312 Commonwealth Ave, Lowell, MA 01852",
    ownershipYears: 31,
    phone: "(978) 555-0247",
    email: "mcallahan.executor@gmail.com",
    taxStatus: "Delinquent — $52,800 owed (FY23 + FY24 + FY25)",
    mortgageBalance: null,
    assessedValue: 2520000,
    lastSaleDate: "1995-06-22",
    lastSalePrice: 340000,
    lienHistory: [
      "Tax lien — City of Lowell ($52,800)",
      "Water/sewer lien — $6,200 (07/2025)"
    ],
    source: ["MA Registry of Deeds", "MA Land Court", "Town Assessor (Lowell)", "MassGIS"],
    dateFound: "2026-03-01",
    status: "new",
    unitMix: [
      { type: "Studio", count: 6, rent: 850 },
      { type: "1BR", count: 14, rent: 1100 },
      { type: "2BR", count: 8, rent: 1380 },
      { type: "3BR", count: 4, rent: 1550 }
    ],
    expenses: [
      { category: "Property Tax", annual: 48000 },
      { category: "Insurance", annual: 24000 },
      { category: "Maintenance & Repairs", annual: 38400 },
      { category: "Property Management (8%)", annual: 36230 },
      { category: "Utilities (common areas)", annual: 19200 },
      { category: "Water/Sewer", annual: 22400 },
      { category: "Trash Removal", annual: 8400 },
      { category: "Vacancy Reserve (5%)", annual: 22644 }
    ]
  },
  {
    id: "DEAL-003",
    address: "89 Hanover Street",
    city: "Manchester",
    state: "NH",
    county: "Hillsborough",
    units: 12,
    class: "B-",
    yearBuilt: 1974,
    sqft: 10800,
    lotSize: "0.38 acres",
    askingPrice: null,
    estimatedValue: 1350000,
    pricePerUnit: 112500,
    currentNOI: 104000,
    proFormaNOI: 138000,
    capRate: 7.7,
    proFormaCapRate: 10.2,
    cashOnCash: 8.4,
    irr5yr: 18.2,
    equityMultiple: 1.95,
    dscr: 1.28,
    rentPerUnit: 1220,
    fairMarketRent: 1480,
    valueAddUpside: 21,
    distressScore: 7.1,
    distressSignals: [
      "Quitclaim deed filed — divorce transfer (Hillsborough Registry 01/2026)",
      "Owner listed property with broker — withdrawn after 14 days",
      "Absentee owner — mailing address MA"
    ],
    ownerName: "Patricia A. Morin",
    ownerType: "Individual",
    ownerAddress: "1204 Beacon St, Apt 3, Brookline, MA 02446",
    ownershipYears: 8,
    phone: "(603) 555-0312",
    email: "p.morin74@yahoo.com",
    taxStatus: "Current",
    mortgageBalance: 480000,
    assessedValue: 1180000,
    lastSaleDate: "2018-09-10",
    lastSalePrice: 720000,
    lienHistory: [],
    source: ["NH Registry of Deeds", "Town Assessor (Manchester)"],
    dateFound: "2026-02-28",
    status: "contacted",
    unitMix: [
      { type: "1BR", count: 4, rent: 1100 },
      { type: "2BR", count: 6, rent: 1280 },
      { type: "3BR", count: 2, rent: 1420 }
    ],
    expenses: [
      { category: "Property Tax", annual: 21200 },
      { category: "Insurance", annual: 10800 },
      { category: "Maintenance & Repairs", annual: 16200 },
      { category: "Property Management (8%)", annual: 14054 },
      { category: "Utilities (common areas)", annual: 7200 },
      { category: "Water/Sewer", annual: 9600 },
      { category: "Trash Removal", annual: 3600 },
      { category: "Vacancy Reserve (5%)", annual: 8784 }
    ]
  },
  {
    id: "DEAL-004",
    address: "1456 Dorchester Ave",
    city: "Dorchester",
    state: "MA",
    county: "Suffolk",
    units: 32,
    class: "C",
    yearBuilt: 1952,
    sqft: 28800,
    lotSize: "0.85 acres",
    askingPrice: null,
    estimatedValue: 3200000,
    pricePerUnit: 100000,
    currentNOI: 225436,
    proFormaNOI: 336000,
    capRate: 7.04,
    proFormaCapRate: 10.5,
    cashOnCash: 7.6,
    irr5yr: 21.8,
    equityMultiple: 2.25,
    dscr: 1.18,
    rentPerUnit: 1280,
    fairMarketRent: 1750,
    valueAddUpside: 37,
    distressScore: 8.8,
    distressSignals: [
      "Tax lien foreclosure filed — MA Land Court (02/2026)",
      "Bankruptcy Ch. 13 — owner (PACER, filed 11/2025)",
      "Lis pendens — Suffolk Registry (12/2025)",
      "5 code violations — open (electrical, fire safety, structural)",
      "Vacancy rate: ~25% (8 units vacant per USPS)"
    ],
    ownerName: "Dorchester Holdings Group LLC",
    ownerType: "LLC",
    ownerAddress: "PO Box 4412, Boston, MA 02118",
    ownershipYears: 11,
    phone: "(617) 555-0489",
    email: null,
    taxStatus: "Tax lien foreclosure — $89,400 owed",
    mortgageBalance: 1850000,
    assessedValue: 2640000,
    lastSaleDate: "2015-04-18",
    lastSalePrice: 1920000,
    lienHistory: [
      "Tax lien — City of Boston ($89,400)",
      "Mechanic's lien — $28,600 (08/2025)",
      "Lis pendens — mortgagee (12/2025)"
    ],
    source: ["MA Land Court", "MA Registry of Deeds", "PACER", "MassGIS", "Town Assessor (Boston)"],
    dateFound: "2026-02-27",
    status: "underwriting",
    unitMix: [
      { type: "Studio", count: 8, rent: 1050 },
      { type: "1BR", count: 14, rent: 1200 },
      { type: "2BR", count: 8, rent: 1480 },
      { type: "3BR", count: 2, rent: 1650 }
    ],
    expenses: [
      { category: "Property Tax", annual: 52800 },
      { category: "Insurance", annual: 28800 },
      { category: "Maintenance & Repairs", annual: 43200 },
      { category: "Property Management (8%)", annual: 39322 },
      { category: "Utilities (common areas)", annual: 21600 },
      { category: "Water/Sewer", annual: 24000 },
      { category: "Trash Removal", annual: 9600 },
      { category: "Vacancy Reserve (8%)", annual: 39322 }
    ]
  },
  {
    id: "DEAL-005",
    address: "22 Market Street",
    city: "Salem",
    state: "NH",
    county: "Rockingham",
    units: 8,
    class: "B-",
    yearBuilt: 1968,
    sqft: 6400,
    lotSize: "0.28 acres",
    askingPrice: null,
    estimatedValue: 920000,
    pricePerUnit: 115000,
    currentNOI: 72000,
    proFormaNOI: 94000,
    capRate: 7.83,
    proFormaCapRate: 10.2,
    cashOnCash: 9.1,
    irr5yr: 17.4,
    equityMultiple: 1.85,
    dscr: 1.32,
    rentPerUnit: 1180,
    fairMarketRent: 1390,
    valueAddUpside: 18,
    distressScore: 6.4,
    distressSignals: [
      "Long-term ownership — 22 years (potential retirement sale)",
      "Free & clear — no mortgage on record",
      "Owner age 74 — public records"
    ],
    ownerName: "Gerald T. Sullivan",
    ownerType: "Individual",
    ownerAddress: "22 Market Street, Unit 1, Salem, NH 03079",
    ownershipYears: 22,
    phone: "(603) 555-0156",
    email: null,
    taxStatus: "Current",
    mortgageBalance: null,
    assessedValue: 780000,
    lastSaleDate: "2004-08-12",
    lastSalePrice: 385000,
    lienHistory: [],
    source: ["NH GRANIT", "Town Assessor (Salem)", "NH Registry of Deeds"],
    dateFound: "2026-02-26",
    status: "contacted",
    unitMix: [
      { type: "1BR", count: 4, rent: 1080 },
      { type: "2BR", count: 4, rent: 1280 }
    ],
    expenses: [
      { category: "Property Tax", annual: 14400 },
      { category: "Insurance", annual: 7200 },
      { category: "Maintenance & Repairs", annual: 9600 },
      { category: "Property Management (8%)", annual: 9062 },
      { category: "Utilities (common areas)", annual: 4800 },
      { category: "Water/Sewer", annual: 6400 },
      { category: "Trash Removal", annual: 2400 },
      { category: "Vacancy Reserve (5%)", annual: 5664 }
    ]
  },
  {
    id: "DEAL-006",
    address: "785 Essex Street",
    city: "Lawrence",
    state: "MA",
    county: "Essex",
    units: 42,
    class: "C",
    yearBuilt: 1948,
    sqft: 37800,
    lotSize: "1.1 acres",
    askingPrice: null,
    estimatedValue: 3780000,
    pricePerUnit: 90000,
    currentNOI: 267905,
    proFormaNOI: 402000,
    capRate: 7.09,
    proFormaCapRate: 10.6,
    cashOnCash: 7.2,
    irr5yr: 24.1,
    equityMultiple: 2.45,
    dscr: 1.22,
    rentPerUnit: 1080,
    fairMarketRent: 1480,
    valueAddUpside: 42,
    distressScore: 9.5,
    distressSignals: [
      "Administrator deed filed — estate sale (Essex Registry 01/2026)",
      "Tax delinquent — 30 months ($94,200 owed)",
      "LLC revoked — MA Secretary of State (08/2025)",
      "9 code violations — 4 critical (structural, fire, lead paint)",
      "Vacancy rate: ~33% (14 units vacant)",
      "Water/sewer lien — $18,400"
    ],
    ownerName: "Lawrence Gateway Apartments LLC (Revoked)",
    ownerType: "LLC",
    ownerAddress: "c/o James Fernandez, 44 Prospect Hill, Lawrence, MA 01841",
    ownershipYears: 19,
    phone: "(978) 555-0721",
    email: "jfernandez.estate@outlook.com",
    taxStatus: "Delinquent — $94,200 owed (FY23-FY25)",
    mortgageBalance: 1200000,
    assessedValue: 2880000,
    lastSaleDate: "2007-11-05",
    lastSalePrice: 2100000,
    lienHistory: [
      "Tax lien — City of Lawrence ($94,200)",
      "Water/sewer lien — $18,400 (06/2025)",
      "Mechanic's lien — $62,000 (03/2025)"
    ],
    source: ["MA Registry of Deeds", "MA Secretary of State", "MA Land Court", "MassGIS", "Town Assessor (Lawrence)"],
    dateFound: "2026-02-25",
    status: "new",
    unitMix: [
      { type: "Studio", count: 8, rent: 850 },
      { type: "1BR", count: 20, rent: 1020 },
      { type: "2BR", count: 10, rent: 1220 },
      { type: "3BR", count: 4, rent: 1380 }
    ],
    expenses: [
      { category: "Property Tax", annual: 54600 },
      { category: "Insurance", annual: 31500 },
      { category: "Maintenance & Repairs", annual: 45360 },
      { category: "Property Management (8%)", annual: 43123 },
      { category: "Utilities (common areas)", annual: 25800 },
      { category: "Water/Sewer", annual: 31200 },
      { category: "Trash Removal", annual: 12600 },
      { category: "Vacancy Reserve (5%)", annual: 26952 }
    ]
  },
  // Hidden deals — revealed by "Run Scan"
  {
    id: "DEAL-007",
    address: "144 Bridge Street",
    city: "Lowell",
    state: "MA",
    county: "Middlesex",
    units: 24,
    class: "C",
    yearBuilt: 1955,
    sqft: 19200,
    lotSize: "0.52 acres",
    askingPrice: null,
    estimatedValue: 2100000,
    pricePerUnit: 87500,
    currentNOI: 168000,
    proFormaNOI: 240000,
    capRate: 8.0,
    proFormaCapRate: 11.4,
    cashOnCash: 9.8,
    irr5yr: 23.6,
    equityMultiple: 2.4,
    dscr: 1.45,
    rentPerUnit: 1050,
    fairMarketRent: 1380,
    valueAddUpside: 31,
    distressScore: 9.1,
    distressSignals: [
      "Foreclosure auction scheduled — 04/15/2026",
      "Tax delinquent — 36 months ($68,400 owed)",
      "Owner LLC dissolved — MA SOS (06/2025)",
      "7 code violations — 3 critical (structural, plumbing, fire)"
    ],
    ownerName: "Bridge Street Realty LLC (Dissolved)",
    ownerType: "LLC",
    ownerAddress: "PO Box 882, Worcester, MA 01602",
    ownershipYears: 14,
    phone: null,
    email: null,
    taxStatus: "Foreclosure — $68,400 owed (FY22-FY25)",
    mortgageBalance: 890000,
    assessedValue: 1680000,
    lastSaleDate: "2012-03-22",
    lastSalePrice: 1050000,
    lienHistory: [
      "Tax lien — City of Lowell ($68,400)",
      "Mechanic's lien — $34,200 (11/2025)",
      "Water/sewer lien — $12,600 (08/2025)"
    ],
    source: ["MA Land Court", "MA Registry of Deeds", "Town Assessor (Lowell)"],
    dateFound: "2026-03-02",
    status: "new",
    unitMix: [
      { type: "Studio", count: 4, rent: 825 },
      { type: "1BR", count: 12, rent: 1020 },
      { type: "2BR", count: 6, rent: 1250 },
      { type: "3BR", count: 2, rent: 1400 }
    ],
    expenses: [
      { category: "Property Tax", annual: 36000 },
      { category: "Insurance", annual: 18000 },
      { category: "Maintenance & Repairs", annual: 28800 },
      { category: "Property Management (8%)", annual: 24192 },
      { category: "Utilities", annual: 14400 },
      { category: "Water/Sewer", annual: 16800 },
      { category: "Trash Removal", annual: 7200 },
      { category: "Vacancy Reserve (5%)", annual: 15120 }
    ],
    hidden: true,
  },
  {
    id: "DEAL-008",
    address: "67 Tremont Avenue",
    city: "Brockton",
    state: "MA",
    county: "Norfolk",
    units: 16,
    class: "C",
    yearBuilt: 1961,
    sqft: 12800,
    lotSize: "0.41 acres",
    askingPrice: null,
    estimatedValue: 1480000,
    pricePerUnit: 92500,
    currentNOI: 118000,
    proFormaNOI: 172000,
    capRate: 7.97,
    proFormaCapRate: 11.6,
    cashOnCash: 10.2,
    irr5yr: 21.8,
    equityMultiple: 2.2,
    dscr: 1.38,
    rentPerUnit: 1120,
    fairMarketRent: 1450,
    valueAddUpside: 29,
    distressScore: 8.4,
    distressSignals: [
      "Estate sale — owner deceased 10/2025",
      "Probate filed — Norfolk Probate Court (12/2025)",
      "Tax delinquent — 12 months ($22,400 owed)",
      "Deferred maintenance — roof, HVAC per inspection"
    ],
    ownerName: "Estate of Margaret Chen",
    ownerType: "Estate",
    ownerAddress: "67 Tremont Ave, Unit 1, Brockton, MA 02301",
    ownershipYears: 28,
    phone: "(508) 555-0193",
    email: "d.chen.executor@gmail.com",
    taxStatus: "Delinquent — $22,400 owed (FY25)",
    mortgageBalance: null,
    assessedValue: 1220000,
    lastSaleDate: "1998-05-14",
    lastSalePrice: 280000,
    lienHistory: [
      "Tax lien — City of Brockton ($22,400)"
    ],
    source: ["MA Registry of Deeds", "Norfolk Probate Court", "Town Assessor (Brockton)"],
    dateFound: "2026-03-02",
    status: "new",
    unitMix: [
      { type: "1BR", count: 8, rent: 1020 },
      { type: "2BR", count: 6, rent: 1220 },
      { type: "3BR", count: 2, rent: 1380 }
    ],
    expenses: [
      { category: "Property Tax", annual: 24800 },
      { category: "Insurance", annual: 12000 },
      { category: "Maintenance & Repairs", annual: 19200 },
      { category: "Property Management (8%)", annual: 17152 },
      { category: "Utilities", annual: 9600 },
      { category: "Water/Sewer", annual: 11200 },
      { category: "Trash Removal", annual: 4800 },
      { category: "Vacancy Reserve (5%)", annual: 10720 }
    ],
    hidden: true,
  },
  {
    id: "DEAL-009",
    address: "201 Canal Street",
    city: "Lawrence",
    state: "MA",
    county: "Essex",
    units: 20,
    class: "C+",
    yearBuilt: 1964,
    sqft: 16000,
    lotSize: "0.48 acres",
    askingPrice: null,
    estimatedValue: 1850000,
    pricePerUnit: 92500,
    currentNOI: 142000,
    proFormaNOI: 204000,
    capRate: 7.68,
    proFormaCapRate: 11.0,
    cashOnCash: 9.4,
    irr5yr: 20.2,
    equityMultiple: 2.15,
    dscr: 1.40,
    rentPerUnit: 1100,
    fairMarketRent: 1420,
    valueAddUpside: 29,
    distressScore: 7.8,
    distressSignals: [
      "Quitclaim deed — partnership dissolution (Essex Registry 01/2026)",
      "Insurance lapse — reported by carrier (02/2026)",
      "Absentee owner — mailing address FL",
      "Long-term ownership — 18 years"
    ],
    ownerName: "Canal Properties Partnership",
    ownerType: "LLC",
    ownerAddress: "1842 Ocean Dr, Fort Lauderdale, FL 33305",
    ownershipYears: 18,
    phone: "(978) 555-0447",
    email: null,
    taxStatus: "Current",
    mortgageBalance: 620000,
    assessedValue: 1540000,
    lastSaleDate: "2008-09-30",
    lastSalePrice: 820000,
    lienHistory: [],
    source: ["MA Registry of Deeds", "Town Assessor (Lawrence)", "Insurance carrier report"],
    dateFound: "2026-03-02",
    status: "new",
    unitMix: [
      { type: "1BR", count: 10, rent: 1000 },
      { type: "2BR", count: 8, rent: 1200 },
      { type: "3BR", count: 2, rent: 1350 }
    ],
    expenses: [
      { category: "Property Tax", annual: 30000 },
      { category: "Insurance", annual: 15000 },
      { category: "Maintenance & Repairs", annual: 24000 },
      { category: "Property Management (8%)", annual: 19200 },
      { category: "Utilities", annual: 12000 },
      { category: "Water/Sewer", annual: 14000 },
      { category: "Trash Removal", annual: 6000 },
      { category: "Vacancy Reserve (5%)", annual: 13200 }
    ],
    hidden: true,
  }
]

export const dashboardStats = {
  totalDealsFound: 47,
  newThisWeek: 12,
  highDistress: 8,
  avgCapRate: 7.45,
  totalUnits: 284,
  avgDistressScore: 7.2,
  countiesMonitored: 6,
  sourcesActive: 15,
  lastScanTime: "2026-03-01T14:32:00",
  countyBreakdown: [
    { county: "Suffolk, MA", deals: 11, units: 142 },
    { county: "Middlesex, MA", deals: 9, units: 87 },
    { county: "Essex, MA", deals: 8, units: 96 },
    { county: "Norfolk, MA", deals: 5, units: 38 },
    { county: "Hillsborough, NH", deals: 9, units: 72 },
    { county: "Rockingham, NH", deals: 5, units: 34 },
  ],
  signalBreakdown: [
    { signal: "Tax Delinquency", count: 18 },
    { signal: "Estate / Probate", count: 9 },
    { signal: "LLC Dissolved / Revoked", count: 7 },
    { signal: "Lis Pendens / Foreclosure", count: 6 },
    { signal: "Quitclaim (Divorce)", count: 4 },
    { signal: "Long-Term Owner (15+ yrs)", count: 14 },
    { signal: "Absentee / Out-of-State", count: 12 },
    { signal: "Free & Clear", count: 8 },
    { signal: "Code Violations", count: 11 },
  ]
}
