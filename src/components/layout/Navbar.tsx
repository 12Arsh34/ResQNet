import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Activity, ShieldAlert, Menu } from "lucide-react"

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-[rgba(6,10,25,0.92)] backdrop-blur supports-backdrop-filter:bg-[rgba(6,10,25,0.72)] shadow-lg">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-foreground">
                    <ShieldAlert className="h-6 w-6 text-primary" />
                    <div className="flex flex-col leading-tight">
                        <span>ResQNet</span>
                        <span className="text-xs text-muted-foreground -mt-0.5">Neighbors helping neighbors</span>
                    </div>
                </Link>
                <nav className="hidden md:flex gap-3 text-sm font-medium items-center">
                    <Link href="/#features" className="px-3 py-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-background/10 transition-colors">
                        Features
                    </Link>

                    <Link href="/citizen/map" className="px-3 py-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-background/10 transition-colors flex items-center gap-2">
                        <Activity className="h-4 w-4 text-primary" />
                        Live Map
                    </Link>

                    <Link href="/resources" className="px-3 py-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-background/10 transition-colors">
                        Resources
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost" size="sm" className="hidden md:inline-flex"> 
                            Log In
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button size="sm" className="rounded-full shadow-sm bg-linear-to-r from-primary to-accent text-white hover:opacity-95">Join the Community</Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </header>
    )
}
