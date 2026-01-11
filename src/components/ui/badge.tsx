import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-all transform-gpu shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "bg-primary/10 text-primary border border-primary/10 hover:bg-primary/15",
                secondary:
                    "bg-secondary text-secondary-foreground border border-secondary/50 hover:bg-secondary/90",
                destructive:
                    "bg-destructive/10 text-destructive border border-destructive/10 hover:bg-destructive/15",
                outline: "text-foreground border border-transparent bg-transparent",
                success: "bg-green-100 text-green-700 border border-green-200 hover:bg-green-110",
                warning: "bg-amber-100 text-amber-700 border border-amber-200 hover:bg-amber-110",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }
