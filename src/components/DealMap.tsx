"use client"

import { useEffect, useRef } from "react"
import type { Deal } from "@/data/deals"

// Import leaflet dynamically to avoid SSR
let L: typeof import("leaflet") | null = null

interface DealMapProps {
  deals: Deal[]
  selectedDealId?: string
  onDealSelect: (deal: Deal) => void
}

export default function DealMap({ deals, selectedDealId, onDealSelect }: DealMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current) return

    // Dynamic import leaflet
    import("leaflet").then((leaflet) => {
      L = leaflet

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
      }

      const map = leaflet.map(mapRef.current!, {
        center: [39.78, -83.8],
        zoom: 9,
        zoomControl: true,
        attributionControl: false,
      })

      leaflet.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
      }).addTo(map)

      // Add markers for each deal
      deals.filter(d => !d.hidden).forEach(deal => {
        const color = deal.aiScore >= 8.5 ? "#22c55e" : deal.aiScore >= 7.0 ? "#f59e0b" : "#ef4444"
        const isSelected = deal.id === selectedDealId

        const icon = leaflet.divIcon({
          className: "custom-marker",
          html: `<div style="
            width: ${isSelected ? "32px" : "24px"};
            height: ${isSelected ? "32px" : "24px"};
            border-radius: 50%;
            background: ${color};
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            font-weight: 700;
            color: white;
            transition: all 0.2s;
          ">${deal.aiScore.toFixed(1)}</div>`,
          iconSize: [isSelected ? 32 : 24, isSelected ? 32 : 24],
          iconAnchor: [isSelected ? 16 : 12, isSelected ? 16 : 12],
        })

        const marker = leaflet.marker([deal.lat, deal.lng], { icon }).addTo(map)

        marker.bindPopup(`
          <div style="font-family: system-ui; min-width: 180px;">
            <div style="font-weight: 700; font-size: 13px; margin-bottom: 4px;">${deal.name}</div>
            <div style="font-size: 11px; color: #6b7280;">${deal.address}, ${deal.city}</div>
            <div style="display: flex; gap: 8px; margin-top: 8px;">
              <span style="font-size: 11px; color: ${color}; font-weight: 600;">Score: ${deal.aiScore}</span>
              <span style="font-size: 11px; color: #6b7280;">${deal.units} units</span>
            </div>
            <div style="font-size: 11px; color: #6b7280; margin-top: 4px;">${deal.type}</div>
          </div>
        `, { closeButton: false })

        marker.on("click", () => onDealSelect(deal))
      })

      mapInstanceRef.current = map

      // Cleanup
      setTimeout(() => map.invalidateSize(), 100)
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [deals, selectedDealId, onDealSelect])

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
      <div ref={mapRef} style={{ height: "380px", width: "100%" }} />
    </div>
  )
}
