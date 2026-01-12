"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { User, Shield, Ambulance } from "lucide-react"

export default function RegisterPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [role, setRole] = useState("citizen")

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setTimeout(async () => {
            setLoading(false)
            // Redirect based on role (with logging + fallback)
            const target = role === 'volunteer' ? '/volunteer' : role === 'admin' ? '/admin' : '/citizen'
            try {
                await router.push(target)
                console.log('[register] navigated to', target)
            } catch (err) {
                console.error('[register] router.push error', err)
                // Fallback to full page navigation in case client routing fails
                window.location.assign(target)
            }
        }, 1500)
    }

    return (
        <Card className="w-full max-w-lg">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                <CardDescription>Join ResQNet to help your community</CardDescription>
            </CardHeader>
            <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <span className="text-sm font-medium">I am joining as a...</span>
                        <div className="grid grid-cols-3 gap-2">
                            <RoleButton
                                active={role === "citizen"}
                                onClick={() => setRole("citizen")}
                                icon={<User className="h-4 w-4" />}
                                label="Citizen"
                            />
                            <RoleButton
                                active={role === "volunteer"}
                                onClick={() => setRole("volunteer")}
                                icon={<Shield className="h-4 w-4" />}
                                label="Volunteer"
                            />
                            <RoleButton
                                active={role === "admin"}
                                onClick={() => setRole("admin")}
                                icon={<Ambulance className="h-4 w-4" />}
                                label="Agency"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="first-name" className="text-sm font-medium leading-none">First name</label>
                            <Input id="first-name" placeholder="John" required />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="last-name" className="text-sm font-medium leading-none">Last name</label>
                            <Input id="last-name" placeholder="Doe" required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium leading-none">Email</label>
                        <Input id="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium leading-none">Password</label>
                        <Input id="password" type="password" required />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button className="w-full" type="submit" disabled={loading}>
                        {loading ? "Creating account..." : "Create account"}
                    </Button>
                    <div className="text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                            Sign in
                        </Link>
                    </div>
                </CardFooter>
            </form>
        </Card>
    )
}

function RoleButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
    return (
        <div
            onClick={onClick}
            className={cn(
                "cursor-pointer rounded-lg border-2 p-4 flex flex-col items-center gap-2 hover:bg-accent hover:text-accent-foreground transition-all",
                active ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-muted bg-transparent"
            )}
        >
            {icon}
            <span className="text-xs font-medium">{label}</span>
        </div>
    )
}
