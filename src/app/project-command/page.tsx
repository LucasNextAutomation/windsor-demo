"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Hammer, DollarSign, FileText, AlertTriangle, CheckCircle2,
  Clock, Building2, ChevronRight, X, Shield, TrendingUp,
  Receipt, ClipboardList
} from "lucide-react"
import { projects, recentInvoices, projectStats, type Project, type Invoice } from "@/data/projects"
import Footer from "@/components/Footer"

function fmt(n: number) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`
  return `$${n}`
}

function ProgressBar({ percent, className }: { percent: number; className?: string }) {
  const color = percent >= 80 ? "bg-emerald-500" : percent >= 50 ? "bg-[#1a365d]" : "bg-amber-500"
  return (
    <div className={`w-full h-2 rounded-full bg-gray-100 overflow-hidden ${className || ""}`}>
      <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${percent}%` }} />
    </div>
  )
}

function InvoiceStatusBadge({ status }: { status: Invoice["status"] }) {
  const styles: Record<Invoice["status"], string> = {
    pending_review: "bg-amber-500/10 text-amber-600 border-amber-200",
    approved: "bg-blue-500/10 text-blue-600 border-blue-200",
    paid: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
    flagged: "bg-red-500/10 text-red-600 border-red-200",
  }
  const labels: Record<Invoice["status"], string> = {
    pending_review: "Pending",
    approved: "Approved",
    paid: "Paid",
    flagged: "Flagged",
  }
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${styles[status]}`}>{labels[status]}</span>
}

export default function ProjectCommandPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [view, setView] = useState<"overview" | "invoices">("overview")

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Project Command Center</h1>
            <p className="text-sm text-gray-400 mt-1">Real-time budget tracking, invoice processing, and compliance monitoring.</p>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
            <button onClick={() => setView("overview")} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${view === "overview" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}>Projects</button>
            <button onClick={() => setView("invoices")} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${view === "invoices" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}>Invoices</button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
          {[
            { label: "Active Projects", value: projectStats.activeProjects.toString(), icon: Hammer, color: "text-[#1a365d]" },
            { label: "Total Budget", value: fmt(projectStats.totalBudget), icon: DollarSign, color: "text-emerald-500" },
            { label: "Total Spent", value: fmt(projectStats.totalSpent), icon: TrendingUp, color: "text-blue-500" },
            { label: "Avg Completion", value: `${projectStats.avgCompletion}%`, icon: CheckCircle2, color: "text-purple-500" },
            { label: "Open Invoices", value: projectStats.openInvoices.toString(), icon: Receipt, color: "text-amber-500" },
            { label: "Flagged", value: projectStats.flaggedInvoices.toString(), icon: AlertTriangle, color: "text-red-500" },
          ].map(s => (
            <div key={s.label} className="bg-gray-50/80 border border-gray-100 rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <s.icon className={`w-3.5 h-3.5 ${s.color}`} />
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">{s.label}</span>
              </div>
              <p className="text-xl font-bold text-gray-900">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Projects View */}
        {view === "overview" && (
          <div className="space-y-4">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                onClick={() => setSelectedProject(project)}
                className="bg-white border border-gray-200 rounded-xl p-5 cursor-pointer hover:shadow-md hover:border-gray-300 transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-gray-400">{project.id}</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${
                        project.status === "active" ? "bg-emerald-500/10 text-emerald-600 border-emerald-200"
                        : project.status === "pre-construction" ? "bg-amber-500/10 text-amber-600 border-amber-200"
                        : "bg-blue-500/10 text-blue-600 border-blue-200"
                      }`}>
                        {project.status.replace("-", " ")}
                      </span>
                      <span className="text-[10px] text-gray-400">{project.type}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#1a365d] transition-colors">{project.name}</h3>
                    <p className="text-sm text-gray-500">{project.address}, {project.city} -- {project.units} units</p>

                    {/* Budget Progress */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-500">{fmt(project.spent)} of {fmt(project.totalBudget)}</span>
                        <span className="font-semibold text-[#1a365d]">{project.percentComplete}% complete</span>
                      </div>
                      <ProgressBar percent={project.percentComplete} />
                    </div>
                  </div>

                  <div className="flex-shrink-0 grid grid-cols-3 gap-4 text-right hidden sm:grid">
                    <div><p className="text-[10px] text-gray-400">Budget</p><p className="text-sm font-bold text-gray-900">{fmt(project.totalBudget)}</p></div>
                    <div><p className="text-[10px] text-gray-400">Open Invoices</p><p className="text-sm font-bold text-amber-600">{project.openInvoices}</p></div>
                    <div><p className="text-[10px] text-gray-400">Pending Draws</p><p className="text-sm font-bold text-[#1a365d]">{project.pendingDraws}</p></div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#1a365d] transition-colors mt-2 flex-shrink-0" />
                </div>

                {/* Permit Status */}
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100 flex-wrap">
                  {project.permits.slice(0, 3).map((p, j) => (
                    <span key={j} className={`flex items-center gap-1 text-[10px] ${
                      p.status === "approved" ? "text-emerald-600" : p.status === "pending" ? "text-amber-600" : "text-blue-600"
                    }`}>
                      {p.status === "approved" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {p.type}
                    </span>
                  ))}
                  <span className="text-[10px] text-gray-400 ml-auto">{project.gcContractor}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Invoices View */}
        {view === "invoices" && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  {["Invoice", "Project", "Vendor", "Amount", "Budget Line", "AI Match", "Status"].map(h => (
                    <th key={h} className="px-3 py-2 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentInvoices.map(inv => {
                  const project = projects.find(p => p.id === inv.projectId)
                  return (
                    <tr key={inv.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                      <td className="px-3 py-3 text-sm font-mono text-gray-700">{inv.id}</td>
                      <td className="px-3 py-3 text-sm text-gray-900 font-medium">{project?.name || inv.projectId}</td>
                      <td className="px-3 py-3 text-sm text-gray-500">{inv.vendor}</td>
                      <td className="px-3 py-3 text-sm font-bold text-gray-900 font-mono">{fmt(inv.amount)}</td>
                      <td className="px-3 py-3 text-xs text-gray-500">{inv.budgetLine}</td>
                      <td className="px-3 py-3">
                        <span className={`text-sm font-bold ${inv.aiMatch >= 90 ? "text-emerald-600" : inv.aiMatch >= 80 ? "text-amber-600" : "text-red-600"}`}>
                          {inv.aiMatch}%
                        </span>
                      </td>
                      <td className="px-3 py-3"><InvoiceStatusBadge status={inv.status} /></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {/* Flagged Invoice Details */}
            {recentInvoices.filter(inv => inv.aiNotes).length > 0 && (
              <div className="p-4 bg-red-50/50 border-t border-red-100">
                <h4 className="text-xs font-bold text-red-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5" /> AI Flags
                </h4>
                <div className="space-y-2">
                  {recentInvoices.filter(inv => inv.aiNotes).map(inv => (
                    <div key={inv.id} className="bg-white rounded-lg p-3 border border-red-100">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-gray-400">{inv.id}</span>
                        <span className="text-xs text-gray-500">--</span>
                        <span className="text-xs font-medium text-gray-700">{inv.vendor}</span>
                        <span className="text-xs text-red-600 font-bold ml-auto">{inv.aiMatch}% match</span>
                      </div>
                      <p className="text-sm text-gray-700">{inv.aiNotes}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* How It Works */}
        <div className="mt-16 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 text-center">How Project Command Center Works</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: "1", title: "Track Budgets", desc: "Real-time visibility across all active projects -- Grant-Deneau, Webster Station, Fire Blocks, and Antioch Village. Every line item, every dollar." },
              { step: "2", title: "Process Invoices", desc: "AI reads contractor and consultant invoices, matches them to budget line items, and flags discrepancies before approval." },
              { step: "3", title: "Automate Draws", desc: "G702/G703 pay application packages compiled automatically for lender submissions. One click to generate draw requests." },
              { step: "4", title: "Monitor Compliance", desc: "Track permit status across Columbus, Dayton, and Yellow Springs jurisdictions. Weekly automated project reports for ownership." },
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

      {/* Project Detail Slideout */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
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
                    <span className="text-xs font-mono text-gray-400">{selectedProject.id}</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase border ${
                      selectedProject.status === "active" ? "bg-emerald-500/10 text-emerald-600 border-emerald-200" : "bg-amber-500/10 text-amber-600 border-amber-200"
                    }`}>{selectedProject.status.replace("-", " ")}</span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">{selectedProject.name}</h2>
                  <p className="text-sm text-gray-500">{selectedProject.address}, {selectedProject.city}</p>
                </div>
                <button onClick={() => setSelectedProject(null)} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                {/* Budget Overview */}
                <div className="bg-[#1a365d] rounded-xl p-4 text-white">
                  <h3 className="text-sm font-bold mb-3">Budget Overview</h3>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div><p className="text-[10px] text-blue-200">Total Budget</p><p className="text-lg font-bold">{fmt(selectedProject.totalBudget)}</p></div>
                    <div><p className="text-[10px] text-blue-200">Spent</p><p className="text-lg font-bold">{fmt(selectedProject.spent)}</p></div>
                    <div><p className="text-[10px] text-blue-200">Remaining</p><p className="text-lg font-bold text-[#d69e2e]">{fmt(selectedProject.totalBudget - selectedProject.spent)}</p></div>
                  </div>
                  <ProgressBar percent={selectedProject.percentComplete} />
                  <p className="text-xs text-blue-200 mt-2">{selectedProject.percentComplete}% complete -- Target: {selectedProject.targetCompletion}</p>
                </div>

                {/* Budget Line Items */}
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <ClipboardList className="w-3.5 h-3.5" /> Budget Breakdown
                  </h3>
                  <div className="space-y-3">
                    {selectedProject.budgetLines.map((line, i) => {
                      const pctSpent = Math.round((line.spent / line.budgeted) * 100)
                      return (
                        <div key={i}>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-700">{line.category}</span>
                            <span className="text-xs text-gray-400">{fmt(line.spent)} / {fmt(line.budgeted)}</span>
                          </div>
                          <ProgressBar percent={pctSpent} />
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Permits */}
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5" /> Permits & Compliance
                  </h3>
                  <div className="space-y-2">
                    {selectedProject.permits.map((permit, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {permit.status === "approved" ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          ) : permit.status === "pending" ? (
                            <Clock className="w-4 h-4 text-amber-500" />
                          ) : (
                            <FileText className="w-4 h-4 text-blue-500" />
                          )}
                          <span className="text-sm text-gray-700">{permit.type}</span>
                        </div>
                        <span className="text-xs text-gray-400">{permit.jurisdiction}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" /> Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {selectedProject.recentActivity.map((activity, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                          activity.type === "invoice" ? "bg-amber-500"
                          : activity.type === "draw" ? "bg-[#1a365d]"
                          : activity.type === "permit" ? "bg-blue-500"
                          : "bg-emerald-500"
                        }`} />
                        <div>
                          <p className="text-xs text-gray-700">{activity.text}</p>
                          <p className="text-[10px] text-gray-400">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
                    <p className="text-lg font-bold text-gray-900">{selectedProject.openInvoices}</p>
                    <p className="text-[10px] text-gray-400 uppercase">Open Invoices</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
                    <p className="text-lg font-bold text-gray-900">{selectedProject.pendingDraws}</p>
                    <p className="text-[10px] text-gray-400 uppercase">Pending Draws</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
