"use client"

import { useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  TrendingUp, Building2, MapPin, ChevronRight, Filter, Clock,
  Database, ArrowUpDown, SlidersHorizontal, Radar, Star,
  Landmark, CheckCircle2, X, Award, Target
} from "lucide-react"
import dynamic from "next/dynamic"
import { mockDeals, dashboardStats, type Deal } from "@/data/deals"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const DealMap = dynamic(() => import("@/components/DealMap"), {
  ssr: false,
  loading: () => <div className="rounded-xl border border-gray-200 bg-gray-50 h-[380px] flex items-center justify-center text-sm text-gray-400">Loading map...</div>
})

function fmt(n: number) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`
  return `$${n}`
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 8.5 ? "bg-emerald-500/10 text-emerald-600 border-emerald-200"
    : score >= 7 ? "bg-amber-500/10 text-amber-600 border-amber-200"
    : "bg-gray-500/10 text-gray-500 border-gray-200"
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${color}`}>{score.toFixed(1)}</span>
}

function StatusBadge({ status }: { status: Deal["status"] }) {
  const styles: Record<Deal["status"], string> = {
    new: "bg-blue-500/10 text-blue-600 border-blue-200",
    reviewing: "bg-amber-500/10 text-amber-600 border-amber-200",
    loi: "bg-purple-500/10 text-purple-600 border-purple-200",
    due_diligence: "bg-[#1a365d]/10 text-[#1a365d] border-[#1a365d]/20",
    closed: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
    passed: "bg-gray-500/10 text-gray-500 border-gray-200",
  }
  const labels: Record<Deal["status"], string> = {
    new: "New",
    reviewing: "Reviewing",
    loi: "LOI",
    due_diligence: "Due Diligence",
    closed: "Closed",
    passed: "Passed",
  }
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${styles[status]}`}>{labels[status]}</span>
}

type SortKey = "aiScore" | "proFormaCapRate" | "units" | "estimatedValue"

const scanSteps = [
  { label: "Connecting to 15 data sources...", duration: 1000 },
  { label: "Scanning Ohio county auditors...", duration: 1500 },
  { label: "Querying CoStar & LoopNet APIs...", duration: 1000 },
  { label: "Cross-referencing National Register...", duration: 1000 },
  { label: "AI scoring against Windsor criteria...", duration: 1500 },
]

const initialActivityFeed = [
  { time: "12 min ago", text: "New adaptive reuse candidate in downtown Dayton", type: "new" as const },
  { time: "28 min ago", text: "Historic tax credit pre-qualification confirmed - Third Street", type: "update" as const },
  { time: "1 hr ago", text: "AI scored WC-2026-001 at 9.4 -- HIGH PRIORITY", type: "alert" as const },
  { time: "2 hr ago", text: "Yellow Springs Mill DD documents received", type: "update" as const },
  { time: "3 hr ago", text: "CoStar alert: new mixed-use listing in Columbus", type: "new" as const },
  { time: "5 hr ago", text: "Broker network: off-market 36-unit in Oakwood", type: "new" as const },
]

export default function DealFlowPage() {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
  const [marketFilter, setMarketFilter] = useState("all")
  const [sortBy, setSortBy] = useState<SortKey>("aiScore")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")
  const [showFilters, setShowFilters] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [scanStep, setScanStep] = useState(-1)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanComplete, setScanComplete] = useState(false)
  const [revealedDeals, setRevealedDeals] = useState<string[]>([])
  const [activityFeed, setActivityFeed] = useState(initialActivityFeed)
  const scanningRef = useRef(false)

  const hiddenDeals = mockDeals.filter(d => d.hidden)
  const visibleDeals = mockDeals.filter(d => !d.hidden || revealedDeals.includes(d.id))

  const filteredDeals = visibleDeals
    .filter(d => marketFilter === "all" || d.county === marketFilter)
    .sort((a, b) => {
      const aNew = revealedDeals.includes(a.id) ? 1 : 0
      const bNew = revealedDeals.includes(b.id) ? 1 : 0
      if (aNew !== bNew) return bNew - aNew
      return sortDir === "desc" ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy]
    })

  const counties = [...new Set(mockDeals.filter(d => !d.hidden).map(d => d.county))]

  const runScan = useCallback(async () => {
    if (scanningRef.current) return
    scanningRef.current = true
    setScanning(true)
    setScanStep(0)
    setScanProgress(0)
    setScanComplete(false)

    const totalDuration = scanSteps.reduce((s, st) => s + st.duration, 0) + 500

    let elapsed = 0
    for (let i = 0; i < scanSteps.length; i++) {
      setScanStep(i)

      if (i === 2) {
        setActivityFeed(prev => [{ time: "Just now", text: "Scanning Franklin County for new development sites...", type: "new" as const }, ...prev.slice(0, 5)])
      }
      if (i === 4) {
        setActivityFeed(prev => [{ time: "Just now", text: "AI flagged WC-2026-006 -- tax foreclosure, adaptive reuse potential", type: "alert" as const }, ...prev.slice(0, 5)])
      }

      const startProgress = elapsed / totalDuration * 100
      elapsed += scanSteps[i].duration
      const endProgress = elapsed / totalDuration * 100

      await new Promise<void>(resolve => {
        const startTime = Date.now()
        const animate = () => {
          const fraction = Math.min((Date.now() - startTime) / scanSteps[i].duration, 1)
          setScanProgress(startProgress + (endProgress - startProgress) * fraction)
          if (fraction < 1) requestAnimationFrame(animate)
          else resolve()
        }
        requestAnimationFrame(animate)
      })
    }

    setScanStep(scanSteps.length)
    setScanProgress(100)
    await new Promise(r => setTimeout(r, 500))

    const newDealIds = hiddenDeals.map(d => d.id)
    setRevealedDeals(newDealIds)
    setScanComplete(true)
    setScanning(false)
    scanningRef.current = false

    setActivityFeed(prev => [
      { time: "Just now", text: `Scan complete -- ${hiddenDeals.length} new opportunities discovered!`, type: "alert" as const },
      ...prev.slice(0, 5)
    ])
  }, [hiddenDeals])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Deal Flow Intelligence</h1>
            <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {dashboardStats.sourcesActive} sources active -- {dashboardStats.marketsMonitored} Ohio markets monitored
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={runScan}
              disabled={scanning || scanComplete}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                scanning ? "bg-[#1a365d] text-white animate-pulse cursor-wait"
                : scanComplete ? "bg-emerald-500 text-white cursor-default"
                : "bg-[#1a365d] text-white hover:bg-[#2a4a7f] shadow-lg shadow-[#1a365d]/25"
              }`}
            >
              <Radar className={`w-4 h-4 ${scanning ? "animate-spin" : ""}`} />
              {scanning ? "Scanning..." : scanComplete ? `${hiddenDeals.length} New Found` : "Run Scan"}
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${showFilters ? "bg-gray-900 text-white" : "border border-gray-200 text-gray-500 hover:bg-gray-50"}`}
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
          </div>
        </div>

        {/* Scan Progress Bar */}
        <AnimatePresence>
          {scanning && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-[#1a365d]/5 border border-[#1a365d]/20 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#1a365d]">
                    {scanStep < scanSteps.length ? scanSteps[scanStep].label : `Scan complete -- ${hiddenDeals.length} new opportunities found`}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">{Math.round(scanProgress)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-[#1a365d] rounded-full" style={{ width: `${scanProgress}%` }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter Bar */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-wrap items-center gap-4">
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Market</label>
                  <select value={marketFilter} onChange={e => setMarketFilter(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700">
                    <option value="all">All Markets</option>
                    {counties.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Sort By</label>
                  <select value={sortBy} onChange={e => setSortBy(e.target.value as SortKey)} className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700">
                    <option value="aiScore">AI Score</option>
                    <option value="proFormaCapRate">Pro Forma Cap</option>
                    <option value="units">Units</option>
                    <option value="estimatedValue">Value</option>
                  </select>
                </div>
                <button onClick={() => setSortDir(d => d === "desc" ? "asc" : "desc")} className="flex items-center gap-1 px-3 py-1.5 mt-4 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  {sortDir === "desc" ? "High to Low" : "Low to High"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Pipeline Deals", value: (scanComplete ? dashboardStats.totalDealsFound + hiddenDeals.length : dashboardStats.totalDealsFound).toString(), sub: `${dashboardStats.newThisWeek} new this week`, icon: TrendingUp, color: "text-[#1a365d]" },
            { label: "High Score (8+)", value: dashboardStats.highScore.toString(), sub: "Top opportunities", icon: Star, color: "text-[#d69e2e]" },
            { label: "Total Units", value: dashboardStats.totalUnits.toString(), sub: `${dashboardStats.marketsMonitored} Ohio markets`, icon: Building2, color: "text-purple-500" },
            { label: "HTC Eligible", value: dashboardStats.criteriaBreakdown[0].count.toString(), sub: "Historic tax credits", icon: Landmark, color: "text-emerald-500" },
          ].map(s => (
            <div key={s.label} className="bg-gray-50/80 border border-gray-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <s.icon className={`w-4 h-4 ${s.color}`} />
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">{s.label}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Map View */}
        <div className="mb-6">
          <DealMap
            deals={mockDeals}
            selectedDealId={selectedDeal?.id}
            onDealSelect={(deal) => setSelectedDeal(deal)}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Deal List */}
          <div className="lg:col-span-3 space-y-3">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {filteredDeals.length} {filteredDeals.length === 1 ? "Opportunity" : "Opportunities"}
            </h2>

            {filteredDeals.map((deal, index) => {
              const isNew = revealedDeals.includes(deal.id)
              return (
                <motion.div
                  key={deal.id}
                  initial={isNew ? { opacity: 0, y: -20, scale: 0.95 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={isNew ? { delay: 0.2 * revealedDeals.indexOf(deal.id), type: "spring", stiffness: 200 } : { delay: 0.03 * index }}
                  onClick={() => setSelectedDeal(deal)}
                  className={`group bg-white border rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${
                    isNew ? "border-[#d69e2e] ring-1 ring-[#d69e2e]/20" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-mono text-gray-400">{deal.id}</span>
                        <StatusBadge status={deal.status} />
                        <ScoreBadge score={deal.aiScore} />
                        {deal.historicTaxCredit && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#d69e2e]/10 text-[#d69e2e] border border-[#d69e2e]/20">
                            <Landmark className="w-2.5 h-2.5" /> HTC
                          </span>
                        )}
                        {isNew && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#d69e2e] text-white animate-pulse">
                            NEW
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-[#1a365d] transition-colors">{deal.name}</h3>
                      <p className="text-sm text-gray-500">{deal.address}, {deal.city}, {deal.state} -- {deal.type}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {deal.aiSignals.slice(0, 2).map((s, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-[#1a365d]/5 border border-[#1a365d]/10 text-[10px] text-[#1a365d] truncate max-w-[250px]">
                            {s}
                          </span>
                        ))}
                        {deal.aiSignals.length > 2 && (
                          <span className="px-2 py-0.5 rounded bg-gray-50 text-[10px] text-gray-400">+{deal.aiSignals.length - 2}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex-shrink-0 grid grid-cols-3 gap-3 text-right hidden sm:grid">
                      <div><p className="text-[10px] text-gray-400">Units</p><p className="text-sm font-bold text-gray-900">{deal.units}</p></div>
                      <div><p className="text-[10px] text-gray-400">Value</p><p className="text-sm font-bold text-gray-900">{fmt(deal.estimatedValue)}</p></div>
                      <div><p className="text-[10px] text-gray-400">Pro Forma Cap</p><p className="text-sm font-bold text-emerald-600">{deal.proFormaCapRate}%</p></div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#1a365d] transition-colors mt-2 flex-shrink-0" />
                  </div>
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
                    <span className="text-[10px] text-gray-400 flex items-center gap-1"><MapPin className="w-3 h-3" /> {deal.county} County</span>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> Found {deal.dateFound}</span>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1"><Database className="w-3 h-3" /> {deal.source.length} sources</span>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            {/* Market Breakdown */}
            <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> Deals by Market
              </h3>
              <div className="space-y-2.5">
                {dashboardStats.marketBreakdown.map(c => (
                  <div key={c.market}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-700">{c.market}</span>
                      <span className="text-xs text-gray-400">{c.deals}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full bg-[#1a365d]/50" style={{ width: `${(c.deals / 15) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Investment Criteria */}
            <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Target className="w-3.5 h-3.5" /> Criteria Match
              </h3>
              <div className="space-y-2">
                {dashboardStats.criteriaBreakdown.map(s => (
                  <div key={s.signal} className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 truncate max-w-[140px]">{s.signal}</span>
                    <span className="text-xs font-medium text-gray-400 ml-2">{s.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" /> Source Activity
              </h3>
              <div className="space-y-3">
                {activityFeed.map((a, i) => (
                  <motion.div
                    key={`${a.text}-${i}`}
                    initial={a.time === "Just now" ? { opacity: 0, x: -10 } : false}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-2"
                  >
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                      a.type === "alert" ? "bg-[#d69e2e]" : a.type === "new" ? "bg-blue-500" : "bg-gray-400"
                    }`} />
                    <div>
                      <p className="text-xs text-gray-700">{a.text}</p>
                      <p className="text-[10px] text-gray-400">{a.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-16 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 text-center">How Deal Flow Intelligence Works</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: "1", title: "Aggregate", desc: "Scan CoStar, LoopNet, county auditors, broker networks, and historic registries across 5 Ohio markets continuously." },
              { step: "2", title: "Score", desc: "AI evaluates each opportunity against Windsor's criteria: adaptive reuse potential, HTC eligibility, portfolio proximity, and financial returns." },
              { step: "3", title: "Underwrite", desc: "Auto-extract data from offering memorandums and generate preliminary pro formas with return projections and sensitivity analysis." },
              { step: "4", title: "Track", desc: "Manage your full pipeline from lead through LOI, due diligence, and close -- all in one system." },
            ].map(item => (
              <div key={item.step} className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="w-8 h-8 rounded-lg bg-[#1a365d] text-white flex items-center justify-center text-sm font-bold mb-3">{item.step}</div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />

      {/* Deal Slideout */}
      <AnimatePresence>
        {selectedDeal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={() => setSelectedDeal(null)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full md:max-w-xl bg-white border-l border-gray-200 shadow-2xl overflow-y-auto"
            >
              <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 px-6 py-4 flex items-start justify-between z-10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-gray-400">{selectedDeal.id}</span>
                    <ScoreBadge score={selectedDeal.aiScore} />
                    <StatusBadge status={selectedDeal.status} />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">{selectedDeal.name}</h2>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {selectedDeal.address}, {selectedDeal.city}, {selectedDeal.state}
                  </p>
                </div>
                <button onClick={() => setSelectedDeal(null)} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Units", value: selectedDeal.units.toString(), icon: Building2 },
                    { label: "Type", value: selectedDeal.type, icon: Award },
                    { label: "Est. Value", value: fmt(selectedDeal.estimatedValue), icon: TrendingUp },
                    { label: "Pro Forma Cap", value: selectedDeal.proFormaCapRate > 0 ? `${selectedDeal.proFormaCapRate}%` : "N/A", icon: Target },
                    { label: "Pro Forma NOI", value: fmt(selectedDeal.proFormaNOI), icon: TrendingUp },
                    { label: "$/Unit", value: fmt(selectedDeal.pricePerUnit), icon: Building2 },
                  ].map(m => (
                    <div key={m.label} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <div className="flex items-center gap-1 mb-1">
                        <m.icon className="w-3 h-3 text-gray-400" />
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider">{m.label}</span>
                      </div>
                      <p className="text-base font-bold text-gray-900">{m.value}</p>
                    </div>
                  ))}
                </div>

                {/* AI Signals */}
                <div className="bg-[#1a365d]/5 border border-[#1a365d]/20 rounded-xl p-4">
                  <h3 className="text-xs font-bold text-[#1a365d] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Star className="w-3.5 h-3.5" /> AI Investment Signals -- Score {selectedDeal.aiScore}/10
                  </h3>
                  <div className="space-y-2">
                    {selectedDeal.aiSignals.map((signal, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#d69e2e] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{signal}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Property Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDeal.keyFeatures.map((f, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-xs text-gray-600">{f}</span>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Qualification</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDeal.historicTaxCredit && (
                      <span className="px-2.5 py-1 rounded-lg bg-[#d69e2e]/10 border border-[#d69e2e]/20 text-xs text-[#d69e2e] font-medium flex items-center gap-1">
                        <Landmark className="w-3 h-3" /> Historic Tax Credit
                      </span>
                    )}
                    {selectedDeal.adaptiveReuse && (
                      <span className="px-2.5 py-1 rounded-lg bg-purple-50 border border-purple-200 text-xs text-purple-600 font-medium">Adaptive Reuse</span>
                    )}
                    <span className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-600 font-medium">
                      Proximity: {selectedDeal.proximityScore}/10
                    </span>
                  </div>
                </div>

                {/* Data Sources */}
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Database className="w-3.5 h-3.5" /> Data Sources
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDeal.source.map((s, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-xs text-gray-600">{s}</span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-3 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Found {selectedDeal.dateFound}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
