"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Download, Filter } from "lucide-react"
import { useIncidents } from '@/hooks/useIncidents'
import { useState } from 'react'

const resourceData = [
  { name: 'Water', level: 80 },
  { name: 'Food', level: 45 },
  { name: 'Meds', level: 60 },
  { name: 'Tents', level: 30 },
  { name: 'Fuel', level: 90 },
]

export default function AdminPage() {
  const { incidents, resolveIncident } = useIncidents();

  // computed stats
  const total = incidents.length;
  const critical = incidents.filter(i => i.severity === 'Critical').length;
  const activeVolunteers = 56; // placeholder until volunteer system is added

  // Compute 'now' once during initial render (lazy initializer)
  const [now] = useState<number>(() => Date.now());

  // Naive grouping into 6 buckets (every 4 hours)
  const trend = [0, 0, 0, 0, 0, 0];
  if (now > 0) {
    for (const inc of incidents) {
      const when = inc.timestamp?.seconds ? inc.timestamp.seconds * 1000 : now;
      const hoursAgo = (now - when) / (1000 * 60 * 60);
      if (hoursAgo <= 24) {
        const bucket = Math.min(5, Math.floor((24 - hoursAgo) / 4));
        trend[bucket]++;
      }
    }
  }
  const incidentTrend = [0, 4, 8, 12, 16, 20].map((h, i) => ({ name: `${h}:00`, incidents: trend[i] }));

  // resourceData left unchanged (demo)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Coordination Center</h1>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter View
              </Button>
              <Button size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard title="Total Incidents" value={String(total)} change="Realtime" />
            <StatsCard title="Active Volunteers" value={String(activeVolunteers)} change="deployed now" />
            <StatsCard title="Critical Alerts" value={String(critical)} change="Active now" decoration="text-destructive" />
            <StatsCard title="People Safe" value="1,204" change="+54 last hour" decoration="text-green-600" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Incident Trend (24h)</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={incidentTrend}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Line type="monotone" dataKey="incidents" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, strokeWidth: 0, fill: '#ef4444' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Resource Levels</CardTitle>
                <CardDescription>Critical supply inventory status</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={resourceData} layout="vertical" margin={{ top: 0, right: 0, left: 40, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} strokeOpacity={0.1} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" fontSize={12} tickLine={false} axisLine={false} width={50} />
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px' }} />
                    <Bar dataKey="level" fill="#f97316" radius={[0, 4, 4, 0]} barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Recent Incidents</h2>
            <div className="grid gap-4 mt-4 md:grid-cols-2">
              {incidents.map(inc => (
                <Card key={inc.id} className="border">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>{inc.type} · {inc.severity}</CardTitle>
                        <CardDescription className="text-xs">{inc.description}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" onClick={async () => {
                          if (!confirm('Mark incident as resolved?')) return;
                          try {
                            await resolveIncident(inc.id);
                            alert('Incident resolved')
                          } catch (err) {
                            console.error(err);
                            alert('Failed to resolve incident')
                          }
                        }}>Mark Resolved</Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

function StatsCard({ title, value, change, decoration }: { title: string, value: string, change: string, decoration?: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${decoration}`}>{value}</div>
        <p className="text-xs text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  )
}
