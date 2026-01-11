import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, CheckCircle2, CloudLightning, Timer } from "lucide-react"

export default function VolunteerDashboard() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Volunteer Dashboard</h1>
                <div className="flex gap-2">
                    <Button variant="outline">Update Availability</Button>
                    <Button>Check-in</Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Current Status</CardTitle>
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">Active</div>
                        <p className="text-xs text-muted-foreground">
                            Deployment Ready
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Assigned Tasks</CardTitle>
                        <Timer className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2</div>
                        <p className="text-xs text-muted-foreground">
                            Pending completion
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Hours Logged</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12.5</div>
                        <p className="text-xs text-muted-foreground">
                            This week
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Active Assignments</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                    <Card className="border-l-4 border-l-red-500">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle>Food Distribution</CardTitle>
                                    <CardDescription className="mt-1 flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        Northside Shelter, Sector 4
                                    </CardDescription>
                                </div>
                                <Badge variant="destructive">Urgent</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                Assist in distributing emergency ration kits to displaced families. Report to Coordinator Sarah J.
                            </p>
                            <div className="flex gap-2">
                                <Button size="sm" className="w-full">Mark Complete</Button>
                                <Button size="sm" variant="outline" className="w-full">Request Backup</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-blue-500">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle>Medical Supply Run</CardTitle>
                                    <CardDescription className="mt-1 flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        City General Hospital &rarr; Zone B
                                    </CardDescription>
                                </div>
                                <Badge variant="secondary">In Progress</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                Transport insulin and first-aid kits to the mobile clinic setup in Zone B.
                            </p>
                            <div className="flex gap-2">
                                <Button size="sm" className="w-full">Mark Complete</Button>
                                <Button size="sm" variant="outline" className="w-full">Route Info</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
