import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-transform transform-gpu will-change-transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 shadow-sm",
    {
        variants: {
            variant: {
                default: "bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:scale-[1.03]",
                destructive: "bg-red-500 text-white hover:scale-[1.02] shadow-md",
                outline: "border border-slate-200 bg-white/6 hover:bg-white/10",
                secondary: "bg-secondary text-secondary-foreground hover:shadow-sm",
                ghost: "bg-transparent hover:bg-white/6",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-11 px-5",
                sm: "h-9 rounded-lg px-3",
                lg: "h-12 rounded-2xl px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
