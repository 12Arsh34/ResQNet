"use client"

import React, { useEffect, useState, useRef } from "react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { MOCK_PLACES } from '@/lib/mockPlaces'

type ResourceStat = {
  key: string
  total: number
  available: number
}

function aggregateFromPlaces() {
  const map: Record<string, { total: number, available: number }> = {}
  for (const p of MOCK_PLACES) {
    const key = p.type
    if (!map[key]) map[key] = { total: 0, available: 0 }
    const cap = typeof p.capacity === 'number' ? p.capacity : 1
    const avail = typeof p.available === 'number' ? p.available : cap
    map[key].total += cap
    map[key].available += avail
  }
  return Object.entries(map).map(([k, v]) => ({ key: k, total: v.total, available: v.available }))
}

// Tooltip types from recharts simplified for our usage
type TooltipPayloadItem = { dataKey: string; value: number }
export function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayloadItem[]; label?: string | number }) {
  if (!active || !payload || !payload.length) return null
  return (
    <div style={{ background: 'rgba(6,10,25,0.95)', color: 'var(--foreground)', padding: 12, borderRadius: 8, minWidth: 160 }}>
      <div style={{ fontSize: 13, marginBottom: 8, opacity: 0.9 }}>{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 10, height: 10, borderRadius: 6, display: 'inline-block' }} />
            <div style={{ fontSize: 13, opacity: 0.9 }}>{p.dataKey}</div>
          </div>
          <div style={{ fontWeight: 600 }}>{p.value}</div>
        </div>
      ))}
    </div>
  )
}

export function ResourceDashboard({ initialStats }: { initialStats?: ResourceStat[] } = {}) {
  const starting = initialStats && initialStats.length ? initialStats : aggregateFromPlaces()
  const [data, setData] = useState(() => starting.map(d => ({ ...d })))
  const [running, setRunning] = useState(true)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    // Start interval
    function tick() {
      setData(prev => prev.map(item => {
        const changePct = (Math.random() * 0.1) - 0.05 // -5% .. +5%
        const delta = Math.round(item.total * changePct)
        let next = item.available + delta
        if (next < 0) next = 0
        if (next > item.total) next = item.total
        return { ...item, available: next }
      }))
    }

    if (running) {
      intervalRef.current = window.setInterval(tick, 2000)
    }

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
  }, [running])

  // Derived chart data: available and deployed
  const chartData = data.map(d => ({ name: d.key, Available: d.available, Deployed: d.total - d.available, total: d.total }))

  // Colors: make available clearly visible (green) and deployed in warm orange
  const availableColor = (typeof window !== 'undefined') ? (getComputedStyle(document.documentElement).getPropertyValue('--available') || '#22c55e') : '#22c55e'
  const deployedColor = (typeof window !== 'undefined') ? (getComputedStyle(document.documentElement).getPropertyValue('--deployed') || '#f59e0b') : '#f59e0b'

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Resource Availability</CardTitle>
          <div className="flex items-center gap-2">
            <Button size="sm" variant={running ? 'default' : 'outline'} onClick={() => setRunning(r => !r)}>
              {running ? 'Pause Stream' : 'Resume'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="!p-0">
        <div className="w-full h-64 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 16, right: 24, left: 8, bottom: 8 }}>
              <XAxis dataKey="name" tick={{ fill: 'var(--foreground)' }} />
              <YAxis tick={{ fill: 'var(--foreground)' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend formatter={(value) => <span className="text-sm text-muted-foreground">{value}</span>} />

              {/* Bars set with explicit colors so legend and bars are consistent */}
              <Bar dataKey="Available" stackId="a" radius={[8,8,0,0]} animationDuration={600} fill={availableColor} />
              <Bar dataKey="Deployed" stackId="a" radius={[0,0,8,8]} animationDuration={600} fill={deployedColor} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Small legend to clarify colors */}
        <div className="px-6 py-4 flex items-center gap-4">
          <div className="flex items-center gap-2"><span className="legend-dot" style={{ background: availableColor }}></span><span className="text-sm text-muted-foreground">Available</span></div>
          <div className="flex items-center gap-2"><span className="legend-dot" style={{ background: deployedColor }}></span><span className="text-sm text-muted-foreground">Deployed</span></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {data.map(d => {
            const pct = Math.round((d.available / d.total) * 100)
            const deployed = d.total - d.available
            return (
              <div key={d.key} className="flex flex-col bg-[rgba(255,255,255,0.02)] p-3 rounded-lg border border-[rgba(255,255,255,0.04)]">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="text-sm text-muted-foreground">{d.key}</div>
                    <div className="text-lg font-semibold"><span className="stat-available">{d.available}</span> / {d.total} <span className="text-sm text-muted-foreground">available</span></div>
                    <div className="text-sm mt-1"><span className="stat-deployed">Deployed: {deployed}</span></div>
                  </div>
                  <div className="text-sm text-muted-foreground">{pct}%</div>
                </div>

                <div className="resource-progress w-full mb-1">
                  <div className="fill" style={{ width: `${pct}%`, background: availableColor }} />
                </div>

                <div className="text-xs text-muted-foreground">{d.available} available • {deployed} deployed</div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
