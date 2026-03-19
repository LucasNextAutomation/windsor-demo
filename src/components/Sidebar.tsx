"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Search, Calculator, Hammer, Building2 } from "lucide-react"

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/deal-flow", label: "Deal Sourcing", icon: Search },
  { href: "/underwriting", label: "Underwriting", icon: Calculator },
  { href: "/project-command", label: "Projects", icon: Hammer },
  { href: "/portfolio", label: "Portfolio", icon: Building2 },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed top-0 left-0 h-screen w-[264px] bg-white border-r border-gray-200 flex flex-col z-50">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-100">
        <Link href="/">
          <Image src="/windsor-logo.svg" alt="Windsor Companies" width={160} height={40} className="h-9 w-auto" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(item => {
          const active = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active
                  ? "bg-[#1a365d]/5 text-[#1a365d] border-l-[3px] border-[#1a365d] -ml-px"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Icon className={`w-[18px] h-[18px] ${active ? "text-[#1a365d]" : "text-gray-400"}`} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-5 py-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[11px] text-gray-400">Interactive Demo</span>
        </div>
        <p className="text-[10px] text-gray-400 mt-2">
          Built by <span className="text-[#1a365d] font-medium">NextAutomation</span>
        </p>
      </div>
    </aside>
  )
}
