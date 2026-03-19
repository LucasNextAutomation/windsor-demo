"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { leaseExpirations } from "@/data/analytics"

export default function LeaseExpirationChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Lease Expirations</h3>
          <p className="text-xs text-gray-400 mt-0.5">Units expiring by month (next 12 months)</p>
        </div>
        <span className="text-xs font-medium text-red-500">52 units in Jul 26</span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={leaseExpirations} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 9, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }} formatter={(value) => [`${value} units`, "Expiring"]} />
          <Bar dataKey="count" radius={[3, 3, 0, 0]} barSize={18}>
            {leaseExpirations.map((entry, index) => (
              <Cell key={index} fill={entry.count >= 45 ? "#ef4444" : entry.count >= 35 ? "#f59e0b" : "#1a365d"} opacity={index < 3 ? 1 : 0.6} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
