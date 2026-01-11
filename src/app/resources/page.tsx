"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { RequestAidModal } from "@/components/resources/RequestAidModal"
import { ResourceDashboard } from "@/components/resources/ResourceDashboard"
import { Search, MapPin, Phone, Clock, Filter, Home, Pill, Droplet, Zap } from "lucide-react"
import { useState } from "react"

import { MOCK_PLACES } from '@/lib/mockPlaces'

// Map-based resources (centered on Mumbai). We derive distances and present these as the resources list.
const mapCenter = { lat: 19.0760, lng: 72.8777 }

function distanceKm(a: { lat: number, lng: number }, b: { lat: number, lng: number }) {
    const toRad = (v: number) => v * Math.PI / 180
    const R = 6371
    const dLat = toRad(b.lat - a.lat)
    const dLon = toRad(b.lng - a.lng)
    const la = toRad(a.lat)
    const lb = toRad(b.lat)
    const x = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(la) * Math.cos(lb)
    const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1-x))
    return Math.round(R * c * 10) / 10
}

const RESOURCES = MOCK_PLACES.map(p => ({
    id: p.id,
    name: p.name,
    type: p.type,
    status: p.available && p.available > 0 ? 'Available' : p.available === 0 ? 'Full' : 'Limited',
    capacity: p.capacity ? `${p.available ?? '-'} / ${p.capacity}` : 'N/A',
    distance: `${distanceKm({ lat: p.lat, lng: p.lng }, mapCenter)} km`,
    address: p.address ?? '',
    phone: p.phone ?? 'N/A',
    icon: p.type === 'Medical' ? Pill : p.type === 'Supplies' ? Droplet : p.type === 'Power' ? Zap : Home,
    color: 'text-primary'
}))
const CATEGORIES = ["All", "Shelter", "Medical", "Supplies", "Power"]

export default function ResourcesPage() {
    const [filter, setFilter] = useState("All")
    const [search, setSearch] = useState("")

    const filteredResources = RESOURCES.filter(r => {
        const matchesCategory = filter === "All" || r.type === filter
        const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.address.toLowerCase().includes(search.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Community Resources</h1>
                        <p className="text-muted-foreground mt-1">Find shelters, medical aid, and essential supplies near you.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <MapPin className="mr-2 h-4 w-4" />
                            View Map
                        </Button>
                        <RequestAidModal />
                    </div>
                </div>

                {/* Resource Dashboard Visualization */}
                <div className="mb-8">
                    <ResourceDashboard />
                </div>

                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name or location..."
                            className="pl-9"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                        {CATEGORIES.map(cat => (
                            <Button
                                key={cat}
                                variant={filter === cat ? "default" : "outline"}
                                onClick={() => setFilter(cat)}
                                className="whitespace-nowrap"
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map(resource => (
                        <ResourceCard key={resource.id} resource={resource} />
                    ))}

                    {filteredResources.length === 0 && (
                        <div className="col-span-full text-center py-12 text-muted-foreground">
                            <p className="text-lg font-medium">No resources found matching your criteria.</p>
                            <Button variant="link" onClick={() => { setFilter("All"); setSearch("") }}>Clear filters</Button>
                        </div>
                    )}
                </div>
            </main>

            <footer className="border-t py-6 text-center text-sm text-muted-foreground">
                <div className="container px-4">
                    <p>Data updated in real-time by ResQNet Volunteers.</p>
                </div>
            </footer>
        </div>
    )
}

function ResourceCard({ resource }: { resource: any }) {
    const Icon = resource.icon

    return (
        <Card className="hover:border-primary/50 transition-all hover:shadow-md group">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl bg-secondary/50 group-hover:bg-primary/10 transition-all transform-gpu float-anim shadow-sm ${resource.color}`}>
                            <Icon className="h-5 w-5" />
                        </div>
                        <div>
                            <CardTitle className="text-base">{resource.name}</CardTitle>
                            <CardDescription className="flex items-center gap-1 mt-1">
                                <MapPin className="h-3 w-3" /> {resource.address}
                            </CardDescription>
                        </div>
                    </div>
                    <Badge variant={resource.status === 'Available' ? 'success' : resource.status === 'Full' ? 'destructive' : 'warning'}>
                        {resource.status}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
                <div className="flex justify-between py-1 border-b border-dashed">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium">{resource.type}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-dashed">
                    <span className="text-muted-foreground">Capacity</span>
                    <span className="font-medium">{resource.capacity}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-dashed">
                    <span className="text-muted-foreground">Phone</span>
                    <span className="font-medium">{resource.phone}</span>
                </div>
                <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Distance</span>
                    <span className="font-medium flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {resource.distance}
                    </span>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" variant="outline">Get Directions</Button>
            </CardFooter>
        </Card>
    )
}
