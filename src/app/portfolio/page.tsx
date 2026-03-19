"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import {
  Building2, DollarSign, Users, TrendingUp, Wrench,
  FileText, ChevronRight, X, Home, BarChart3,
  Calendar, CheckCircle2, AlertTriangle, ArrowUpRight
} from "lucide-react"
import { properties, portfolioStats, type Property } from "@/data/portfolio"
import { anomalyAlerts } from "@/data/analytics"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const OccupancyChart = dynamic(() => import("@/components/charts/OccupancyChart"), { ssr: false })
const RentCompChart = dynamic(() => import("@/components/charts/RentCompChart"), { ssr: false })
const LeaseExpirationChart = dynamic(() => import("@/components/charts/LeaseExpirationChart"), { ssr: false })
const NOIWaterfall = dynamic(() => import("@/components/charts/NOIWaterfall"), { ssr: false })

function fmt(n: number) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`
  return `$${n}`
}

function OccupancyBadge({ pct }: { pct: number }) {
  const color = pct >= 95 ? "bg-emerald-500/10 text-emerald-600 border-emerald-200"
    : pct >= 90 ? "bg-amber-500/10 text-amber-600 border-amber-200"
    : "bg-red-500/10 text-red-600 border-red-200"
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${color}`}>{pct}%</span>
}

export default function PortfolioPage() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [view, setView] = useState<"grid" | "table" | "dashboard">("grid")

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Portfolio & Investor Intelligence</h1>
            <p className="text-sm text-gray-400 mt-1">{portfolioStats.totalUnits.toLocaleString()} units across {properties.length} properties -- real-time performance tracking.</p>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
            <button onClick={() => setView("grid")} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${view === "grid" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}>Grid</button>
            <button onClick={() => setView("table")} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${view === "table" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}>Table</button>
            <button onClick={() => setView("dashboard")} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${view === "dashboard" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}><BarChart3 className="w-3.5 h-3.5" />Dashboard</button>
          </div>
        </div>

        {/* Portfolio Summary Bar */}
        <div className="bg-[#1a365d] rounded-xl p-5 mb-6 text-white">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { label: "Total Units", value: portfolioStats.totalUnits.toLocaleString() },
              { label: "Avg Occupancy", value: `${portfolioStats.avgOccupancy}%` },
              { label: "Monthly Revenue", value: fmt(portfolioStats.monthlyRevenue) },
              { label: "Monthly NOI", value: fmt(portfolioStats.monthlyNOI) },
              { label: "Annual NOI", value: fmt(portfolioStats.annualNOI) },
              { label: "Portfolio Value", value: fmt(portfolioStats.portfolioValue) },
              { label: "Avg Cap Rate", value: `${portfolioStats.avgCapRate}%` },
              { label: "Open Maintenance", value: portfolioStats.openMaintenance.toString() },
            ].map(s => (
              <div key={s.label}>
                <p className="text-[10px] text-blue-200 uppercase tracking-wider">{s.label}</p>
                <p className="text-lg font-bold">{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Alert Banners */}
        <div className="grid md:grid-cols-2 gap-3 mb-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <Calendar className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-amber-700">{portfolioStats.leasesExpiring30} Leases Expiring in 30 Days</h4>
              <p className="text-xs text-amber-600 mt-0.5">Renewal campaigns auto-sent. {portfolioStats.leasesExpiring90} expiring within 90 days total.</p>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
            <Wrench className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-blue-700">{portfolioStats.openMaintenance} Open Maintenance Requests</h4>
              <p className="text-xs text-blue-600 mt-0.5">AI auto-routed to preferred vendors. Average resolution: 2.3 days.</p>
            </div>
          </div>
        </div>

        {/* Grid View */}
        {view === "grid" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map((prop, i) => (
              <motion.div
                key={prop.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * i }}
                onClick={() => setSelectedProperty(prop)}
                className="bg-white border border-gray-200 rounded-xl p-5 cursor-pointer hover:shadow-md hover:border-gray-300 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#1a365d] transition-colors">{prop.name}</h3>
                    <p className="text-xs text-gray-500">{prop.city} -- {prop.type}</p>
                  </div>
                  <OccupancyBadge pct={prop.occupancy} />
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div><p className="text-[10px] text-gray-400">Units</p><p className="text-sm font-bold text-gray-900">{prop.units}</p></div>
                  <div><p className="text-[10px] text-gray-400">Monthly NOI</p><p className="text-sm font-bold text-emerald-600">{fmt(prop.noi)}</p></div>
                  <div><p className="text-[10px] text-gray-400">Cap Rate</p><p className="text-sm font-bold text-gray-900">{prop.capRate}%</p></div>
                </div>

                {/* Rent Upside */}
                {prop.marketRent > prop.avgRent && (
                  <div className="flex items-center gap-2 mb-3 bg-emerald-50 rounded-lg px-3 py-1.5">
                    <ArrowUpRight className="w-3 h-3 text-emerald-600" />
                    <span className="text-xs text-emerald-700 font-medium">
                      ${prop.marketRent - prop.avgRent}/unit rent upside to market
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-3 text-[10px] text-gray-400">
                    <span className="flex items-center gap-1"><Wrench className="w-3 h-3" /> {prop.maintenanceRequests}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {prop.leasesExpiring30} expiring</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#1a365d] transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Table View */}
        {view === "table" && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="bg-gray-50">
                  {["Property", "City", "Type", "Units", "Occupancy", "Avg Rent", "Market Rent", "Monthly NOI", "Cap Rate", "Maintenance"].map(h => (
                    <th key={h} className="px-3 py-2 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {properties.map(prop => (
                  <tr
                    key={prop.id}
                    onClick={() => setSelectedProperty(prop)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100"
                  >
                    <td className="px-3 py-3 text-sm font-medium text-gray-900">{prop.name}</td>
                    <td className="px-3 py-3 text-sm text-gray-500">{prop.city}</td>
                    <td className="px-3 py-3 text-xs text-gray-500">{prop.type}</td>
                    <td className="px-3 py-3 text-sm font-bold text-gray-900">{prop.units}</td>
                    <td className="px-3 py-3"><OccupancyBadge pct={prop.occupancy} /></td>
                    <td className="px-3 py-3 text-sm font-mono text-gray-700">${prop.avgRent.toLocaleString()}</td>
                    <td className="px-3 py-3 text-sm font-mono text-gray-400">${prop.marketRent.toLocaleString()}</td>
                    <td className="px-3 py-3 text-sm font-bold text-emerald-600 font-mono">{fmt(prop.noi)}</td>
                    <td className="px-3 py-3 text-sm font-bold text-gray-900">{prop.capRate}%</td>
                    <td className="px-3 py-3 text-sm text-gray-500">{prop.maintenanceRequests}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 font-bold">
                  <td className="px-3 py-2 text-sm text-gray-900">Portfolio Total</td>
                  <td className="px-3 py-2" />
                  <td className="px-3 py-2" />
                  <td className="px-3 py-2 text-sm text-gray-900">{portfolioStats.totalUnits}</td>
                  <td className="px-3 py-2 text-sm text-gray-900">{portfolioStats.avgOccupancy}%</td>
                  <td className="px-3 py-2" />
                  <td className="px-3 py-2" />
                  <td className="px-3 py-2 text-sm text-emerald-600 font-mono">{fmt(portfolioStats.monthlyNOI)}</td>
                  <td className="px-3 py-2 text-sm text-gray-900">{portfolioStats.avgCapRate}%</td>
                  <td className="px-3 py-2 text-sm text-gray-500">{portfolioStats.openMaintenance}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        {/* Dashboard View */}
        {view === "dashboard" && (
          <div className="space-y-6">
            {/* 2x2 Chart Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              <OccupancyChart />
              <NOIWaterfall />
              <RentCompChart />
              <LeaseExpirationChart />
            </div>

            {/* Anomaly Alerts */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-semibold text-gray-900">AI Anomaly Alerts</h3>
                <span className="text-[10px] font-medium text-white bg-red-500 rounded-full px-1.5 py-0.5">{anomalyAlerts.filter(a => a.severity === "critical").length}</span>
              </div>
              <div className="space-y-2">
                {anomalyAlerts.map(alert => (
                  <div key={alert.id} className={`rounded-lg p-3 flex items-start gap-3 ${
                    alert.severity === "critical" ? "bg-red-50 border border-red-100" :
                    alert.severity === "warning" ? "bg-amber-50 border border-amber-100" :
                    "bg-blue-50 border border-blue-100"
                  }`}>
                    <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded mt-0.5 shrink-0 ${
                      alert.severity === "critical" ? "bg-red-100 text-red-700" :
                      alert.severity === "warning" ? "bg-amber-100 text-amber-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>{alert.severity}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-900">{alert.title}</span>
                        <span className="text-[10px] text-gray-400">{alert.property}</span>
                      </div>
                      <p className="text-[11px] text-gray-600 mt-0.5">{alert.description}</p>
                      <p className="text-[10px] text-gray-400 mt-1">Impact: {alert.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* How It Works */}
        <div className="mt-16 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 text-center">How Portfolio Intelligence Works</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: "1", title: "Centralize", desc: "Unified dashboard for 1,000+ units across all properties. Occupancy, rent rolls, NOI, and maintenance -- all in one view." },
              { step: "2", title: "Report", desc: "Automated monthly and quarterly investor reports with construction progress, financials, and market comps -- branded and ready to send." },
              { step: "3", title: "Optimize", desc: "AI routes maintenance requests to preferred vendors, automates lease renewals, and identifies vacancy marketing opportunities." },
              { step: "4", title: "Analyze", desc: "Property-level P&L, cap rate tracking, rent comp analysis, and hold/sell recommendations powered by real-time market data." },
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

      {/* Property Detail Slideout */}
      <AnimatePresence>
        {selectedProperty && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={() => setSelectedProperty(null)}
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
                    <span className="text-xs font-mono text-gray-400">{selectedProperty.id}</span>
                    <OccupancyBadge pct={selectedProperty.occupancy} />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">{selectedProperty.name}</h2>
                  <p className="text-sm text-gray-500">{selectedProperty.address}, {selectedProperty.city}</p>
                </div>
                <button onClick={() => setSelectedProperty(null)} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Units", value: selectedProperty.units.toString(), icon: Building2 },
                    { label: "Occupancy", value: `${selectedProperty.occupancy}%`, icon: Home },
                    { label: "Type", value: selectedProperty.type, icon: BarChart3 },
                    { label: "Avg Rent", value: `$${selectedProperty.avgRent}`, icon: DollarSign },
                    { label: "Market Rent", value: `$${selectedProperty.marketRent}`, icon: TrendingUp },
                    { label: "Cap Rate", value: `${selectedProperty.capRate}%`, icon: BarChart3 },
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

                {/* Financial Summary */}
                <div className="bg-[#1a365d] rounded-xl p-4 text-white">
                  <h3 className="text-xs font-bold text-blue-200 uppercase tracking-wider mb-3">Monthly Financials</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-200">Gross Revenue</span>
                      <span className="font-bold font-mono">{fmt(selectedProperty.monthlyRevenue)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-200">Operating Expenses</span>
                      <span className="font-mono text-red-300">({fmt(selectedProperty.monthlyExpenses)})</span>
                    </div>
                    <div className="border-t border-white/20 pt-2 flex justify-between text-sm">
                      <span className="font-bold">Net Operating Income</span>
                      <span className="font-bold font-mono text-[#d69e2e]">{fmt(selectedProperty.noi)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-blue-200 pt-1">
                      <span>Annualized NOI</span>
                      <span className="font-mono">{fmt(selectedProperty.noi * 12)}</span>
                    </div>
                  </div>
                </div>

                {/* Rent Analysis */}
                {selectedProperty.marketRent > selectedProperty.avgRent && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                    <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <ArrowUpRight className="w-3.5 h-3.5" /> Rent Upside Opportunity
                    </h3>
                    <p className="text-sm text-gray-700">
                      Current avg rent is <span className="font-bold">${selectedProperty.avgRent}/unit</span> vs market at <span className="font-bold">${selectedProperty.marketRent}/unit</span>.
                      That is <span className="font-bold text-emerald-600">${selectedProperty.marketRent - selectedProperty.avgRent}/unit</span> potential upside
                      ({fmt((selectedProperty.marketRent - selectedProperty.avgRent) * selectedProperty.units * 12)}/year across {selectedProperty.units} units).
                    </p>
                  </div>
                )}

                {/* Maintenance */}
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Wrench className="w-3.5 h-3.5" /> Maintenance
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-gray-100 text-center">
                      <p className="text-lg font-bold text-gray-900">{selectedProperty.maintenanceRequests}</p>
                      <p className="text-[10px] text-gray-400 uppercase">Open Requests</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-100 text-center">
                      <p className="text-lg font-bold text-gray-900">2.3d</p>
                      <p className="text-[10px] text-gray-400 uppercase">Avg Resolution</p>
                    </div>
                  </div>
                </div>

                {/* Lease Expirations */}
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" /> Lease Expirations
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className={`bg-white rounded-lg p-3 border text-center ${selectedProperty.leasesExpiring30 > 3 ? "border-amber-200" : "border-gray-100"}`}>
                      <p className={`text-lg font-bold ${selectedProperty.leasesExpiring30 > 3 ? "text-amber-600" : "text-gray-900"}`}>{selectedProperty.leasesExpiring30}</p>
                      <p className="text-[10px] text-gray-400 uppercase">Next 30 Days</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-100 text-center">
                      <p className="text-lg font-bold text-gray-900">{selectedProperty.leasesExpiring90}</p>
                      <p className="text-[10px] text-gray-400 uppercase">Next 90 Days</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  {[
                    { label: "Generate Investor Report", icon: FileText },
                    { label: "View Rent Comp Analysis", icon: BarChart3 },
                    { label: "Run Hold/Sell Analysis", icon: TrendingUp },
                  ].map(action => (
                    <button
                      key={action.label}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
                    >
                      <action.icon className="w-4 h-4 text-[#1a365d]" />
                      {action.label}
                      <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
