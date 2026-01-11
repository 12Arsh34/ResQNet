"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    ShieldAlert,
    LayoutDashboard,
    Map as MapIcon,
    Bell,
    Settings,
    LogOut,
    ClipboardList,
    Users,
    BarChart3
} from "lucide-react"

export function Sidebar() {
    const pathname = usePathname()

    // Determine role based on path (simple check for demo)
    const isCitizen = pathname.includes('/citizen')
    const isVolunteer = pathname.includes('/volunteer')
    const isAdmin = pathname.includes('/admin')

    return (
        <div className="hidden border-r bg-muted/20 md:block w-64 flex-col h-screen sticky top-0">
            <div className="flex h-16 items-center border-b px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
                    <ShieldAlert className="h-6 w-6" />
                    <span>ResQNet</span>
                </Link>
            </div>
            <div className="flex-1 overflow-auto py-2">
                <nav className="grid items-start px-4 text-sm font-medium">
                    {isCitizen && (
                        <>
                            <SidebarLink href="/citizen" icon={<LayoutDashboard />} label="Overview" active={pathname === '/citizen'} />
                            <SidebarLink href="/citizen/map" icon={<MapIcon />} label="Live Map" active={pathname === '/citizen/map'} />
                            <SidebarLink href="/citizen/report" icon={<ShieldAlert />} label="Report Incident" active={pathname === '/citizen/report'} />
                        </>
                    )}
                    {isVolunteer && (
                        <>
                            <SidebarLink href="/volunteer" icon={<LayoutDashboard />} label="Dashboard" active={pathname === '/volunteer'} />
                            <SidebarLink href="/volunteer/tasks" icon={<ClipboardList />} label="My Assignments" active={pathname === '/volunteer/tasks'} />
                            <SidebarLink href="/volunteer/map" icon={<MapIcon />} label="Resource Map" active={pathname === '/volunteer/map'} />
                        </>
                    )}
                    {isAdmin && (
                        <>
                            <SidebarLink href="/admin" icon={<BarChart3 />} label="Coordination Center" active={pathname === '/admin'} />
                            <SidebarLink href="/admin/incidents" icon={<ShieldAlert />} label="Incidents" active={pathname === '/admin/incidents'} />
                            <SidebarLink href="/admin/resources" icon={<Users />} label="Resources" active={pathname === '/admin/resources'} />
                        </>
                    )}
                </nav>
            </div>
            <div className="border-t p-4">
                <nav className="grid gap-2">
                    <Link href="/#features">
                        <Button variant="ghost" className="w-full justify-start gap-3 px-3 text-muted-foreground hover:text-primary">
                            <LayoutDashboard className="h-4 w-4" />
                            Features
                        </Button>
                    </Link>
                    <Link href="/resources">
                        <Button variant="ghost" className="w-full justify-start gap-3 px-3 text-muted-foreground hover:text-primary">
                            <ClipboardList className="h-4 w-4" />
                            Resources
                        </Button>
                    </Link>
                    <Link href="/login">
                        <Button variant="ghost" className="w-full justify-start gap-3 px-3 text-muted-foreground hover:text-destructive">
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </Button>
                    </Link>
                </nav>
            </div>
        </div>
    )
}

function SidebarLink({ href, icon, label, active }: { href: string, icon: React.ReactNode, label: string, active: boolean }) {
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                active ? "bg-muted text-primary" : "text-muted-foreground"
            )}
        >
            {/* Clone element to enforce size if needed, but flex gap usually handles it */}
            <span className="h-4 w-4 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>
            {label}
        </Link>
    )
}
