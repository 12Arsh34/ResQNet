"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Download, Filter } from "lucide-react"

const incidentData = [
  { name: '00:00', incidents: 4 },
  { name: '04:00', incidents: 3 },
  { name: '08:00', incidents: 12 },
  { name: '12:00', incidents: 25 },
  { name: '16:00', incidents: 18 },
  { name: '20:00', incidents: 10 },
]

const resourceData = [
  { name: 'Water', level: 80 },
  { name: 'Food', level: 45 },
  { name: 'Meds', level: 60 },
  { name: 'Tents', level: 30 },
  { name: 'Fuel', level: 90 },
]

export default function AdminPage() {
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
            <StatsCard title="Total Incidents" value="142" change="+12% from yesterday" />
            <StatsCard title="Active Volunteers" value="56" change="34 deployed" />
            <StatsCard title="Critical Alerts" value="8" change="Active now" decoration="text-destructive" />
            <StatsCard title="People Safe" value="1,204" change="+54 last hour" decoration="text-green-600" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Incident Trend (24h)</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={incidentData}>
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
