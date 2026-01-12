"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function HeroBackground() {
    const [reduceMotion, setReduceMotion] = useState(() => {
        if (typeof window === 'undefined') return false
        try {
            return window.matchMedia('(prefers-reduced-motion: reduce)').matches
        } catch (e) {
            return false
        }
    })

    useEffect(() => {
        try {
            const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
            const listener = (e: MediaQueryListEvent) => setReduceMotion(e.matches)
            mq.addEventListener?.('change', listener)
            return () => mq.removeEventListener?.('change', listener)
        } catch {
            // ignore (server or unsupported)
        }
    }, [])

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            {/* High-contrast RGB shapes */}
            <motion.div
                initial={{ opacity: 0.18, scale: 1, x: -40 }}
                animate={reduceMotion ? undefined : { x: [-40, 20, -40], opacity: [0.18, 0.36, 0.18] }}
                transition={reduceMotion ? undefined : { duration: 36, repeat: Infinity, ease: 'linear' }}
                className="absolute -left-28 -top-20 w-[80%] h-[70%] transform -rotate-12 bg-gradient-to-tr from-primary to-accent opacity-30 blur-3xl mix-blend-screen"
            />

            <motion.div
                initial={{ opacity: 0.12 }}
                animate={reduceMotion ? undefined : { x: [0, -30, 0], opacity: [0.12, 0.28, 0.12] }}
                transition={reduceMotion ? undefined : { duration: 44, repeat: Infinity, ease: 'linear' }}
                className="absolute right-[-20%] bottom-[-10%] w-[60%] h-[60%] transform rotate-6 bg-gradient-to-br from-accent to-primary opacity-26 blur-3xl mix-blend-overlay"
            />

            {/* Subtle diagonal pattern for interest */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.01)_0px,rgba(255,255,255,0.01)_1px,transparent_1px,transparent_28px)] pointer-events-none" />

            {/* Low-contrast community scene (tinted) */}
            <motion.img
                src="/community-scene.svg"
                alt="Community skyline and activity (decorative)"
                aria-hidden
                initial={{ x: 0, opacity: 0.12 }}
                animate={reduceMotion ? undefined : { x: [0, -10, 0], opacity: [0.12, 0.24, 0.12] }}
                transition={reduceMotion ? undefined : { duration: 48, repeat: Infinity, ease: 'linear' }}
                className="absolute left-1/2 top-36 -translate-x-1/2 w-[120%] max-w-none pointer-events-none opacity-18 blur-sm mix-blend-screen" 
            />

            {/* Animated activity markers to add life */}
            <div aria-hidden className="absolute inset-0 pointer-events-none">
                {/* Marker 1 */}
                <motion.div
                    initial={{ y: 0, opacity: 0 }}
                    animate={reduceMotion ? undefined : { y: [0, -12, 0], opacity: [0.9, 1, 0.9] }}
                    transition={reduceMotion ? undefined : { duration: 4, repeat: Infinity, delay: 0 }}
                    className="absolute left-[18%] top-[48%] flex items-center justify-center"
                >
                    <div className="relative">
                        <div className="h-3.5 w-3.5 rounded-full bg-gradient-to-r from-primary to-accent shadow-[0_6px_18px_rgba(0,204,204,0.18)]" />
                        <span className="absolute inset-0 rounded-full animate-ping-slow bg-gradient-to-r from-primary to-accent opacity-30 blur-sm" />
                    </div>
                </motion.div>

                {/* Marker 2 */}
                <motion.div
                    initial={{ y: 0, opacity: 0 }}
                    animate={reduceMotion ? undefined : { y: [0, -8, 0], opacity: [0.9, 1, 0.9] }}
                    transition={reduceMotion ? undefined : { duration: 5, repeat: Infinity, delay: 0.8 }}
                    className="absolute left-[42%] top-[52%] flex items-center justify-center"
                >
                    <div className="relative">
                        <div className="h-4 w-4 rounded-full bg-gradient-to-r from-accent to-primary shadow-[0_6px_18px_rgba(255,85,180,0.14)]" />
                        <span className="absolute inset-0 rounded-full animate-ping-slow bg-accent/20 blur-sm" />
                    </div>
                </motion.div>

                {/* Marker 3 */}
                <motion.div
                    initial={{ y: 0, opacity: 0 }}
                    animate={reduceMotion ? undefined : { y: [0, -10, 0], opacity: [0.9, 1, 0.9] }}
                    transition={reduceMotion ? undefined : { duration: 4.6, repeat: Infinity, delay: 1.6 }}
                    className="absolute left-[65%] top-[46%] flex items-center justify-center"
                >
                    <div className="relative">
                        <div className="h-3.5 w-3.5 rounded-full bg-primary shadow-[0_6px_18px_rgba(0,204,204,0.14)]" />
                        <span className="absolute inset-0 rounded-full animate-ping-slow bg-primary/20 blur-sm" />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
