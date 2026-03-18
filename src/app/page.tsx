"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { TrendingUp, Hammer, Building2, ArrowRight, CheckCircle2 } from "lucide-react"

const systems = [
  {
    href: "/deal-flow",
    title: "Deal Flow Intelligence",
    icon: TrendingUp,
    description: "Automated sourcing across CoStar, LoopNet, public records, and broker networks. AI scores every opportunity against Windsor's investment criteria.",
    highlights: ["15+ data sources across Ohio", "AI investment scoring", "Historic tax credit detection", "Pipeline CRM tracking"],
  },
  {
    href: "/project-command",
    title: "Project Command Center",
    icon: Hammer,
    description: "Real-time budget tracking, automated invoice processing, G702/G703 pay applications, and permit monitoring across all active projects.",
    highlights: ["Live budget tracking", "AI invoice matching", "Draw package automation", "Permit & compliance alerts"],
  },
  {
    href: "/portfolio",
    title: "Portfolio & Investor Intelligence",
    icon: Building2,
    description: "Unified dashboard for 1,000+ units with occupancy tracking, automated investor reports, maintenance routing, and asset performance analytics.",
    highlights: ["1,000+ unit dashboard", "Automated investor reports", "Tenant management AI", "Hold/sell analysis"],
  },
]

const stats = [
  { value: "5+", label: "Active Projects" },
  { value: "$100M+", label: "Pipeline" },
  { value: "1,000+", label: "Units Managed" },
  { value: "15+", label: "Data Sources" },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 via-white to-white" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#1a365d]/[0.03] rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="text-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex justify-center mb-10"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[#1a365d] flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-3xl md:text-4xl tracking-tight">W</span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xs md:text-sm uppercase tracking-[0.2em] text-gray-400 font-medium mb-6"
            >
              Windsor Companies
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-3xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6 tracking-tight leading-[1.1]"
            >
              Your AI-Powered<br />
              Development Platform
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-base md:text-lg text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed"
            >
              From deal sourcing to asset management -- one integrated system.
              Three AI-powered platforms built for vertically-integrated construction and development.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex items-center justify-center gap-6 md:gap-10"
            >
              {stats.map(stat => (
                <div key={stat.label} className="text-center">
                  <p className="text-xl md:text-2xl font-bold text-[#1a365d]">{stat.value}</p>
                  <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-24 mx-auto border-t border-gray-200" />

      {/* System Cards */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-xs uppercase tracking-[0.2em] text-gray-400 font-medium mb-14"
          >
            Explore the live demos
          </motion.p>

          <div className="grid md:grid-cols-3 gap-5">
            {systems.map((sys, i) => (
              <motion.div
                key={sys.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + 0.08 * i }}
              >
                <Link href={sys.href} className="block group h-full">
                  <div className="relative h-full bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:border-[#1a365d]/40 hover:shadow-lg hover:-translate-y-0.5">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-5 group-hover:bg-[#1a365d]/5 group-hover:border-[#1a365d]/20 transition-colors">
                      <sys.icon className="w-5 h-5 text-gray-400 group-hover:text-[#1a365d] transition-colors" />
                    </div>

                    <h3 className="text-base font-semibold text-gray-900 mb-2">{sys.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5">{sys.description}</p>

                    <div className="space-y-2 mb-6">
                      {sys.highlights.map((h, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#d69e2e]/80 flex-shrink-0" />
                          <span className="text-gray-600">{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 text-sm font-medium text-[#1a365d] group-hover:gap-2.5 transition-all mt-auto">
                      View Demo <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Windsor-specific context */}
      <section className="py-16 bg-gray-50/50">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-[#1a365d] rounded-2xl p-8 md:p-12 text-white"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-blue-200 font-medium mb-4">Built for Windsor</p>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 tracking-tight">
              Vertically integrated. AI-enhanced.
            </h2>
            <p className="text-blue-100 leading-relaxed mb-6 max-w-2xl">
              Windsor Companies spans construction, development, and property management across Ohio.
              From adaptive reuse projects like Grant-Deneau Tower and Fire Blocks District to ground-up
              development at Antioch Village -- your operations deserve a unified AI platform that connects
              every stage of the lifecycle.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Team Members", value: "29" },
                { label: "Active Markets", value: "5 Ohio" },
                { label: "AUM", value: "$100M+" },
                { label: "Residential Units", value: "1,000+" },
              ].map(item => (
                <div key={item.label} className="bg-white/10 rounded-xl p-3 text-center">
                  <p className="text-lg md:text-xl font-bold text-[#d69e2e]">{item.value}</p>
                  <p className="text-[10px] text-blue-200 uppercase tracking-wider mt-0.5">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">Interactive demo -- data is simulated for demonstration purposes</p>
          <p className="text-xs text-gray-400">
            Built by <span className="text-[#1a365d] font-medium">NextAutomation</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
