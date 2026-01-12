import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, MapPin, Activity, ArrowRight } from "lucide-react"

export default function CitizenPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Citizen Overview</h1>
            <Link href="/citizen/report">
              <Button variant="destructive" className="gap-2 shadow-lg hover:shadow-xl transition-all">
                <AlertTriangle className="h-4 w-4" />
                Report Incident
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Local Threat Level</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-500">Moderate</div>
                <p className="text-xs text-muted-foreground">Updated 10 minutes ago</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Nearest Shelter</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.2 km</div>
                <p className="text-xs text-muted-foreground">Community Center, Main St.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">In your 5km radius</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>Emergency notifications in your area.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                      <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-200" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Flash Flood Warning</p>
                      <p className="text-xs text-muted-foreground">Issued 20 mins ago</p>
                    </div>
                  </div>
                  <Badge variant="destructive">Critical</Badge>
                </div>

                <Button variant="ghost" className="w-full justify-between mt-2" size="sm">
                  View All History <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>My Reports</CardTitle>
                <CardDescription>Status of incidents you have reported.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                  No active reports filed.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
