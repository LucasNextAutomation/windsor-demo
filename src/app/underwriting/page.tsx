"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator, AlertTriangle, TrendingUp, FileText, ChevronDown, CheckCircle2, Building2, DollarSign, Shield, BarChart3 } from "lucide-react"
import { sampleDeal } from "@/data/underwriting"

export default function UnderwritingPage() {
  const [selectedStructure, setSelectedStructure] = useState(2) // HTC default (best for Windsor)
  const deal = sampleDeal

  const fmt = (n: number) => n.toLocaleString("en-US")
  const fmtM = (n: number) => `$${(n / 1000000).toFixed(1)}M`
  const fmtK = (n: number) => `$${(n / 1000).toFixed(0)}K`
  const fmtPct = (n: number) => `${n.toFixed(1)}%`

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#1a365d]/10 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-[#1a365d]" />
            </div>
            <div>
              <p className="text-xs font-medium text-[#1a365d] uppercase tracking-wider">Underwriting Engine</p>
              <h1 className="text-2xl font-bold text-gray-900">Quick Deal Analysis</h1>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1">AI-generated pro forma with 4 financing structures — review any deal in minutes</p>
        </motion.div>

        {/* Property Overview Card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="w-4 h-4 text-[#d69e2e]" />
                <span className="text-xs font-medium text-[#d69e2e] uppercase tracking-wider">{deal.type}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">{deal.name}</h2>
              <p className="text-sm text-gray-500">{deal.address}, {deal.city}, OH {deal.county} County</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {[
                { label: "Units", value: deal.units.toString() },
                { label: "Year Built", value: deal.yearBuilt.toString() },
                { label: "Size", value: `${fmt(deal.sqft)} SF` },
                { label: "Total Cost", value: fmtM(deal.totalProjectCost) },
              ].map(s => (
                <div key={s.label} className="min-w-[80px]">
                  <p className="text-lg font-bold text-[#1a365d]">{s.value}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Cost Breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-5 pt-5 border-t border-gray-100">
            {[
              { label: "Acquisition", value: fmtM(deal.acquisitionCost) },
              { label: "Hard Costs", value: fmtM(deal.hardCosts) },
              { label: "Soft Costs", value: fmtM(deal.softCosts) },
              { label: "HTC Credits", value: fmtM(deal.historicTaxCredits.total), color: "text-emerald-600" },
              { label: "Net Equity Need", value: fmtM(deal.totalProjectCost - deal.historicTaxCredits.total - deal.financingStructures[selectedStructure].loanAmount), color: "text-[#d69e2e]" },
            ].map(item => (
              <div key={item.label} className="text-center">
                <p className={`text-sm font-bold ${item.color || "text-gray-900"}`}>{item.value}</p>
                <p className="text-[10px] text-gray-400 uppercase">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Financing Structure Comparison */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 className="w-4 h-4 text-[#1a365d]" />
            <h3 className="text-sm font-semibold text-gray-900">Financing Structure Comparison</h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {deal.financingStructures.map((fs, i) => (
              <button
                key={i}
                onClick={() => setSelectedStructure(i)}
                className={`rounded-xl border-2 p-4 text-left transition-all ${
                  i === selectedStructure
                    ? "border-[#1a365d] bg-[#1a365d]/5 shadow-sm"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-900">{fs.name}</span>
                  {i === 2 && <span className="text-[9px] font-bold text-[#d69e2e] bg-[#d69e2e]/10 px-1.5 py-0.5 rounded">BEST</span>}
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-2xl font-bold text-[#1a365d]">{fmtPct(fs.irr5yr)}</p>
                    <p className="text-[10px] text-gray-400">5-Year IRR</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                    <div>
                      <p className="text-xs font-semibold text-gray-700">{fmtPct(fs.cashOnCash)}</p>
                      <p className="text-[9px] text-gray-400">Cash-on-Cash</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-700">{fs.equityMultiple.toFixed(1)}x</p>
                      <p className="text-[9px] text-gray-400">Equity Multiple</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-700">{fs.dscr.toFixed(2)}x</p>
                      <p className="text-[9px] text-gray-400">DSCR</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-700">{fmtPct(fs.rate)}</p>
                      <p className="text-[9px] text-gray-400">Rate</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-xs font-semibold text-gray-700">{fmtM(fs.equityRequired)}</p>
                    <p className="text-[9px] text-gray-400">Equity Required</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Pro Forma Table */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-4 h-4 text-[#1a365d]" />
              <h3 className="text-sm font-semibold text-gray-900">10-Year Pro Forma</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-3 font-medium text-gray-500 sticky left-0 bg-white">Year</th>
                    {deal.proForma.slice(0, 5).map(y => (
                      <th key={y.year} className="text-right py-2 px-2 font-medium text-gray-500 min-w-[70px]">{y.year}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="font-mono">
                  {[
                    { label: "Gross Revenue", key: "grossRevenue" as const },
                    { label: "Vacancy", key: "vacancy" as const, negative: true },
                    { label: "Effective Revenue", key: "effectiveRevenue" as const, bold: true },
                    { label: "Operating Exp.", key: "opex" as const, negative: true },
                    { label: "NOI", key: "noi" as const, bold: true, highlight: true },
                  ].map(row => (
                    <tr key={row.label} className={`border-b border-gray-50 ${row.highlight ? "bg-[#1a365d]/[0.03]" : ""}`}>
                      <td className={`py-1.5 pr-3 sticky left-0 bg-white ${row.bold ? "font-semibold text-gray-900" : "text-gray-600"} ${row.highlight ? "bg-[#1a365d]/[0.03]" : ""}`}>{row.label}</td>
                      {deal.proForma.slice(0, 5).map(y => (
                        <td key={y.year} className={`text-right py-1.5 px-2 ${row.bold ? "font-semibold text-gray-900" : "text-gray-600"} ${row.negative ? "text-red-500" : ""}`}>
                          {row.negative ? `-${fmtK(y[row.key])}` : fmtK(y[row.key])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Sensitivity */}
            <div className="mt-5 pt-4 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-900 mb-3">IRR Sensitivity (5-Year, {deal.financingStructures[selectedStructure].name} Structure)</p>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="text-[10px] text-gray-400 font-medium">Scenario</div>
                <div className="text-[10px] text-red-400 font-medium">Downside</div>
                <div className="text-[10px] text-gray-900 font-medium">Base</div>
                <div className="text-[10px] text-emerald-500 font-medium">Upside</div>
                {deal.sensitivity.map(s => (
                  <div key={s.label} className="contents">
                    <div className="text-[10px] text-gray-500 text-left">{s.label}</div>
                    <div className="text-xs font-mono text-red-500">{fmtPct(s.downside)}</div>
                    <div className="text-xs font-mono font-semibold text-gray-900">{fmtPct(s.baseCase)}</div>
                    <div className="text-xs font-mono text-emerald-600">{fmtPct(s.upside)}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Risk Flags + Comps */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
            {/* Risk Flags */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-[#1a365d]" />
                <h3 className="text-sm font-semibold text-gray-900">AI Risk Assessment</h3>
              </div>
              <div className="space-y-3">
                {deal.riskFlags.map(rf => (
                  <div key={rf.id} className={`rounded-lg p-3 ${
                    rf.severity === "high" ? "bg-red-50 border border-red-100" :
                    rf.severity === "medium" ? "bg-amber-50 border border-amber-100" :
                    "bg-blue-50 border border-blue-100"
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                        rf.severity === "high" ? "bg-red-100 text-red-700" :
                        rf.severity === "medium" ? "bg-amber-100 text-amber-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>{rf.severity}</span>
                      <span className="text-xs font-semibold text-gray-900">{rf.title}</span>
                    </div>
                    <p className="text-[11px] text-gray-600 leading-relaxed">{rf.description}</p>
                    <p className="text-[10px] text-gray-400 mt-1 italic">{rf.mitigation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparable Deals */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-[#1a365d]" />
                <h3 className="text-sm font-semibold text-gray-900">Windsor Portfolio Comps</h3>
              </div>
              <div className="space-y-2">
                {deal.comparableDeals.map(comp => (
                  <div key={comp.name} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-xs font-semibold text-gray-900">{comp.name}</p>
                      <p className="text-[10px] text-gray-400">{comp.units} units - {comp.year}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-mono font-semibold text-[#1a365d]">{fmtK(comp.costPerUnit)}/unit</p>
                      <p className="text-[10px] text-gray-400">{comp.capRate}% cap</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* IC Recommendation Bar */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mt-6 bg-gradient-to-r from-[#1a365d] to-[#1a365d]/90 rounded-xl p-5 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            <div>
              <p className="text-sm font-bold text-white">AI Recommendation: PROCEED</p>
              <p className="text-xs text-blue-200">Structure B (HTC + Conv.) — 18.7% IRR, 2.8x equity multiple, 1.67x DSCR</p>
            </div>
          </div>
          <button className="px-5 py-2 bg-white text-[#1a365d] rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Export IC Summary
          </button>
        </motion.div>
      </div>
    </div>
  )
}
