"use client"

import { motion } from "framer-motion"
import { Building2, TrendingUp, Search, MapPin, ArrowUpRight, ArrowDownRight } from "lucide-react"
import dynamic from "next/dynamic"
import { mockDeals, dashboardStats } from "@/data/deals"
import { portfolioStats } from "@/data/portfolio"
import { anomalyAlerts } from "@/data/analytics"
import Link from "next/link"

const OccupancyChart = dynamic(() => import("@/components/charts/OccupancyChart"), { ssr: false })
const LeaseExpirationChart = dynamic(() => import("@/components/charts/LeaseExpirationChart"), { ssr: false })

const stats = [
  { label: "Total Leads", value: dashboardStats.totalDealsFound.toString(), trend: "+8 this week", up: true, color: "#1a365d", icon: Search },
  { label: "Hot Leads (85+)", value: dashboardStats.highScore.toString(), trend: "+3 vs last week", up: true, color: "#dc2626", icon: TrendingUp },
  { label: "Units Managed", value: "700", trend: "95.4% occupancy", up: true, color: "#10b981", icon: Building2 },
  { label: "Markets Active", value: dashboardStats.marketsMonitored.toString(), trend: "6 counties monitored", up: true, color: "#d97706", icon: MapPin },
]

export default function DashboardPage() {
  const recentDeals = mockDeals.filter(d => !d.hidden).slice(0, 5)
  const criticalAlerts = anomalyAlerts.filter(a => a.severity === "critical" || a.severity === "warning")

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">Last updated: 2 minutes ago</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="relative bg-white rounded-2xl border border-gray-200 p-6 hover:border-gray-300 hover:shadow-lg transition-all group"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: `linear-gradient(to right, ${stat.color}, transparent)` }} />
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}10` }}>
                  <Icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3">
                {stat.up ? <ArrowUpRight className="w-3 h-3 text-emerald-500" /> : <ArrowDownRight className="w-3 h-3 text-red-500" />}
                <span className="text-xs text-gray-500">{stat.trend}</span>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Charts -- Left 2 cols */}
        <div className="lg:col-span-2 space-y-4">
          <OccupancyChart />
          <LeaseExpirationChart />
        </div>

        {/* Alerts -- Right col */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Active Alerts</h3>
              <span className="text-[10px] font-bold text-white bg-red-500 rounded-full px-1.5 py-0.5">{criticalAlerts.length}</span>
            </div>
            <div className="space-y-2">
              {criticalAlerts.map(alert => (
                <div key={alert.id} className={`rounded-lg p-3 ${
                  alert.severity === "critical" ? "bg-red-50 border border-red-100" : "bg-amber-50 border border-amber-100"
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                      alert.severity === "critical" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                    }`}>{alert.severity}</span>
                    <span className="text-[10px] text-gray-400">{alert.property}</span>
                  </div>
                  <p className="text-xs font-medium text-gray-900">{alert.title}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{alert.impact}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio Quick Stats */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Portfolio Overview</h3>
            <div className="space-y-3">
              {[
                { label: "Annual NOI", value: `$${(portfolioStats.annualNOI / 1000000).toFixed(1)}M` },
                { label: "Avg Cap Rate", value: `${portfolioStats.avgCapRate}%` },
                { label: "Portfolio Value", value: `$${(portfolioStats.portfolioValue / 1000000).toFixed(0)}M` },
                { label: "Open Maintenance", value: portfolioStats.openMaintenance.toString() },
                { label: "Leases Expiring (90d)", value: portfolioStats.leasesExpiring90.toString() },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between py-1">
                  <span className="text-xs text-gray-500">{item.label}</span>
                  <span className="text-sm font-semibold text-gray-900 font-mono">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Deals Table */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-white rounded-2xl border border-gray-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">Recent Deal Activity</h3>
          <Link href="/deal-flow" className="text-xs font-medium text-[#1a365d] hover:underline">View all deals</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-6 py-2.5 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Score</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Property</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Type</th>
                <th className="text-right px-4 py-2.5 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Est. Value</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">County</th>
                <th className="text-left px-6 py-2.5 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentDeals.map(deal => (
                <tr key={deal.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="px-6 py-3">
                    <span className={`inline-flex items-center justify-center w-10 h-6 rounded-md text-xs font-bold text-white ${
                      deal.aiScore >= 8.5 ? "bg-red-500" : deal.aiScore >= 7.0 ? "bg-amber-500" : "bg-blue-500"
                    }`}>{deal.aiScore}</span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-900">{deal.name}</p>
                    <p className="text-[11px] text-gray-400">{deal.address}, {deal.city}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">{deal.type}</td>
                  <td className="px-4 py-3 text-right text-sm font-medium text-gray-900 font-mono tabular-nums">${(deal.estimatedValue / 1000000).toFixed(1)}M</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{deal.county}</td>
                  <td className="px-6 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      deal.status === "new" ? "bg-blue-50 text-blue-700" :
                      deal.status === "reviewing" ? "bg-gray-100 text-gray-600" :
                      deal.status === "loi" ? "bg-emerald-50 text-emerald-700" :
                      deal.status === "due_diligence" ? "bg-purple-50 text-purple-700" :
                      "bg-gray-100 text-gray-500"
                    }`}>{deal.status === "due_diligence" ? "Due Diligence" : deal.status === "loi" ? "Under LOI" : deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
