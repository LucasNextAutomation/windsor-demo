"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { noiWaterfall } from "@/data/analytics"

export default function NOIWaterfall() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Monthly NOI Waterfall</h3>
          <p className="text-xs text-gray-400 mt-0.5">Revenue to NOI breakdown (March 2026)</p>
        </div>
        <span className="text-lg font-bold text-[#1a365d]">$443K</span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={noiWaterfall} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} tickLine={false} axisLine={false} tickFormatter={(v: number) => v >= 0 ? `$${(v/1000).toFixed(0)}K` : `-$${(Math.abs(v)/1000).toFixed(0)}K`} />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }} formatter={(value) => [`$${Math.abs(Number(value)).toLocaleString()}`, ""]} />
          <Bar dataKey="value" radius={[3, 3, 0, 0]} barSize={36}>
            {noiWaterfall.map((entry, index) => (
              <Cell key={index} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
