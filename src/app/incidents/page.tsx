"use client"

import { Navbar } from "@/components/layout/Navbar"
import LeafletMap from "@/components/map/MapboxMap"
import { useIncidents } from "@/hooks/useIncidents"
import { SEED_PAYLOADS } from '@/lib/mockIncidents';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Flame, Droplet, Users, Filter, RefreshCw } from "lucide-react"
import { useState } from 'react'

export default function IncidentsPage() {
    const { incidents, loading, reportIncident } = useIncidents();
    const [seeding, setSeeding] = useState(false);

    const criticalCount = incidents.filter(i => i.severity === 'Critical').length;
    const highCount = incidents.filter(i => i.severity === 'High').length;
    const incidentsByType = incidents.reduce((acc, i) => {
        acc[i.type] = (acc[i.type] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 relative">
                {/* Stats Overlay */}
                <div className="absolute top-4 left-4 right-4 z-10 pointer-events-none">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pointer-events-auto">
                            <Card className="bg-background/95 backdrop-blur border-red-500/20">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xs text-muted-foreground flex items-center gap-1">
                                        <AlertTriangle className="h-3 w-3" /> Critical
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-red-500">{criticalCount}</div>
                                </CardContent>
                            </Card>

                            <Card className="bg-background/95 backdrop-blur border-orange-500/20">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Flame className="h-3 w-3" /> High Priority
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-orange-500">{highCount}</div>
                                </CardContent>
                            </Card>

                            <Card className="bg-background/95 backdrop-blur">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Droplet className="h-3 w-3" /> Active
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{incidents.length}</div>
                                </CardContent>
                            </Card>

                            <Card className="bg-background/95 backdrop-blur">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Users className="h-3 w-3" /> Responding
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{Math.floor(incidents.length * 1.5)}</div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Map */}
                <div className="w-full h-[calc(100vh-4rem)]">
                    <LeafletMap />
                </div>

                {/* Incident List Overlay (Bottom) */}
                <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
                    <div className="container mx-auto p-4">
                        <Card className="bg-background/95 backdrop-blur pointer-events-auto max-h-48 overflow-y-auto">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-sm">Recent Incidents</CardTitle>
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="sm" className="h-7">
                                            <Filter className="h-3 w-3 mr-1" /> Filter
                                        </Button>

                                        {process.env.NODE_ENV === 'development' && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-7"
                                                onClick={async () => {
                                                    if (!reportIncident) return;
                                                    if (!confirm('Seed demo incidents to Firestore? This will add multiple demo entries.')) return;
                                                    setSeeding(true);
                                                    try {
                                                        for (const p of SEED_PAYLOADS) {
                                                            // spread to avoid accidental references
                                                            // add small delay to simulate streaming
                                                            await reportIncident({ ...p });
                                                            await new Promise(res => setTimeout(res, 250));
                                                        }
                                                        alert('Seed complete');
                                                    } catch (err) {
                                                        console.error(err);
                                                        alert('Seeding failed. Check console.');
                                                    } finally {
                                                        setSeeding(false);
                                                    }
                                                }}
                                            >
                                                <RefreshCw className="h-3 w-3 mr-1" /> {seeding ? 'Seeding...' : 'Seed Demo'}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {incidents.slice(0, 5).map((incident) => (
                                    <div key={incident.id} className="flex items-center justify-between py-2 border-b last:border-0">
                                        <div className="flex items-center gap-3">
                                            <Badge variant={incident.severity === 'Critical' ? 'destructive' : incident.severity === 'High' ? 'warning' : 'secondary'}>
                                                {incident.severity}
                                            </Badge>
                                            <div>
                                                <p className="text-sm font-medium">{incident.type}</p>
                                                <p className="text-xs text-muted-foreground">{incident.description}</p>
                                            </div>
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {incident.timestamp?.seconds
                                                ? new Date(incident.timestamp.seconds * 1000).toLocaleTimeString()
                                                : 'Now'}
                                        </div>
                                    </div>
                                ))}
                                {incidents.length === 0 && (
                                    <p className="text-sm text-muted-foreground text-center py-4">No active incidents</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}
