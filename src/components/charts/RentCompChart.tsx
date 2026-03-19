"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { rentComps } from "@/data/analytics"

export default function RentCompChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Rent vs Market</h3>
          <p className="text-xs text-gray-400 mt-0.5">Current avg rent vs market comps</p>
        </div>
        <span className="text-xs font-medium text-[#d69e2e]">+$67/unit avg upside</span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={rentComps} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barGap={2}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#9ca3af" }} tickLine={false} axisLine={false} angle={-35} textAnchor="end" height={50} />
          <YAxis domain={[1200, 1800]} tick={{ fontSize: 10, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }} />
          <Bar dataKey="current" fill="#1a365d" radius={[3, 3, 0, 0]} barSize={12} name="Current Rent" />
          <Bar dataKey="market" fill="#d69e2e" radius={[3, 3, 0, 0]} barSize={12} name="Market Rent" opacity={0.6} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
