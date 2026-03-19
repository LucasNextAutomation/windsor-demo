"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { monthlyOccupancy } from "@/data/analytics"

export default function OccupancyChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Portfolio Occupancy</h3>
          <p className="text-xs text-gray-400 mt-0.5">12-month trend vs 95% target</p>
        </div>
        <span className="text-lg font-bold text-[#1a365d]">95.4%</span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={monthlyOccupancy} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="occupancyFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1a365d" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#1a365d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
          <YAxis domain={[92, 97]} tick={{ fontSize: 10, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }} />
          <ReferenceLine y={95} stroke="#d69e2e" strokeDasharray="4 4" strokeWidth={1.5} />
          <Area type="monotone" dataKey="portfolio" stroke="#1a365d" strokeWidth={2} fill="url(#occupancyFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
