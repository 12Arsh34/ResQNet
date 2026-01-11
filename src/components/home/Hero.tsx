"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Activity, MapPin, Users } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { HeroBackground } from "./HeroBackground"

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-transparent pt-16 md:pt-24 lg:pt-32 pb-32 text-white">
            <HeroBackground />

            <div className="container px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Badge variant="outline" className="mb-4 px-4 py-1.5 text-sm sm:text-base rounded-full border-primary/10 bg-primary/5 backdrop-blur-sm shadow-sm">
                            <span className="flex items-center gap-2 text-primary font-medium">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-60"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                                </span>
                                Community-first emergency support
                            </span>
                        </Badge>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
                    >
                        Community-powered rapid response for <br className="hidden sm:inline" />
                        <span className="font-normal">critical moments</span>
                    </motion.h1>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-3">
                        <div className="h-1 w-16 rounded-full bg-primary/30 mx-auto transform-gpu" />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className="max-w-[800px] text-lg text-white/80 md:text-xl leading-relaxed"
                    >
                        Connect with neighbors, volunteers, and local agencies to get help fast when every second counts. Use simple, clear tools to request or offer aid in your community.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-4"
                    >
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                            <Link href="/register">
                                <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8 shadow-lg transition-all">
                                    Join as Volunteer
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                            <Link href="/citizen">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base h-12 px-8 border-primary/20 hover:bg-primary/5 hover:text-primary transition-all">
                                    Report an Incident
                                    <Activity className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-10"></div>
        </section>
    )
}
