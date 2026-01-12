"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, CheckCircle2, Timer } from "lucide-react"
import { useIncidents } from '@/hooks/useIncidents'
import { MOCK_PLACES } from '@/lib/mockPlaces'
import { findNearestPlace } from '@/lib/utils'
import RouteModal from '@/components/map/RouteModal'
import MapPreview from '@/components/map/MapPreview'

function severityWeight(s: string) {
  switch (s) {
    case 'Critical': return 4
    case 'High': return 3
    case 'Medium': return 2
    default: return 1
  }
}

export default function VolunteerPage() {
  const { incidents, resolveIncident } = useIncidents()
  const [available, setAvailable] = React.useState<boolean>(true)
  const [lastCheckIn, setLastCheckIn] = React.useState<number | null>(null)
  const [hoursLogged, setHoursLogged] = React.useState<number>(12.5)

  const assignments = incidents
    .slice()
    .sort((a, b) => (severityWeight(b.severity) - severityWeight(a.severity)) || ((b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0)))
    .slice(0, 4)
    .map((inc) => {
      const { place, distanceKm } = findNearestPlace(inc.lat, inc.lng, MOCK_PLACES)
      return { incident: inc, place: place, distanceKm }
    })

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Volunteer Dashboard</h1>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => { setAvailable(!available); alert(`Availability set to ${!available ? 'Active' : 'Unavailable'}`) }}>Update Availability</Button>
              <Button onClick={() => { setLastCheckIn(Date.now()); setHoursLogged(h => h + 0.5); alert('Checked in — stay safe!') }}>Check-in</Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Status</CardTitle>
                <div className={`h-2 w-2 rounded-full ${available ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${available ? 'text-green-600' : 'text-muted-foreground'}`}>{available ? 'Active' : 'Unavailable'}</div>
                <p className="text-xs text-muted-foreground">{available ? 'Deployment Ready' : 'Not available'}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Assigned Tasks</CardTitle>
                <Timer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{assignments.length}</div>
                <p className="text-xs text-muted-foreground">Pending completion</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hours Logged</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{hoursLogged.toFixed(1)}</div>                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Active Assignments</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              {/* Dynamic assignments derived from active incidents */}
              {(!available || assignments.length === 0) && (
                <Card>
                  <CardContent className="text-sm text-muted-foreground">{!available ? 'You are marked unavailable. Toggle availability to accept assignments.' : 'No active assignments right now.'}</CardContent>
                </Card>
              )}

              {available && assignments.map((a) => (
                <Card key={a.incident.id} className={`border-l-4 ${a.incident.severity === 'Critical' ? 'border-l-red-500' : 'border-l-blue-500'}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{a.incident.type} · {a.incident.severity}</CardTitle>
                        <CardDescription className="mt-1 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {a.place ? `${a.place.name} (${a.place.type})` : `${a.incident.lat.toFixed(3)}, ${a.incident.lng.toFixed(3)}`} 
                          <span className="text-xs text-muted-foreground ml-2">{a.distanceKm.toFixed(1)} km</span>
                        </CardDescription>
                      </div>
                      <Badge variant={a.incident.severity === 'Critical' ? 'destructive' : 'secondary'}>{a.incident.severity}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{a.incident.description}</p>

                    {/* mini-map preview */}
                    <div className="mb-3">
                      <MapPreview incidentLat={a.incident.lat} incidentLng={a.incident.lng} placeLat={a.place?.lat} placeLng={a.place?.lng} height={120} />
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="w-full" onClick={async () => {
                        if (!confirm('Mark this assignment as complete?')) return;
                        try {
                          await resolveIncident(a.incident.id)
                          // simple feedback; we can replace with a nicer toast later
                          alert('Marked complete')
                        } catch (err) {
                          console.error(err);
                          alert('Failed to mark complete')
                        }
                      }}>Mark Complete</Button>

                      <RouteModal incident={{ lat: a.incident.lat, lng: a.incident.lng }} place={a.place}>
                        <Button size="sm" variant="outline" className="w-full">Route Info</Button>
                      </RouteModal>
                    </div>
                  </CardContent>
                </Card>
              ))}

            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
