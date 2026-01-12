"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Camera, AlertTriangle, Send } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useIncidents } from '@/hooks/useIncidents'

export default function ReportIncidentPage() {
    const router = useRouter()
    const { reportIncident } = useIncidents()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [files, setFiles] = useState<{ file: File; preview: string }[]>([])

    const [selectedType, setSelectedType] = useState<string>('Other')
    const [selectedSeverity, setSelectedSeverity] = useState<'Critical'|'High'|'Medium'|'Low'>('High')
    const [coords, setCoords] = useState<string>('19.0760,72.8777')
    const [description, setDescription] = useState<string>('')

    useEffect(() => {
        return () => {
            // Revoke object URLs on unmount
            files.forEach(f => URL.revokeObjectURL(f.preview))
        }
    }, [files])

    const removeFile = (index: number) => {
        setFiles((prev) => {
            const removed = prev[index]
            if (removed) URL.revokeObjectURL(removed.preview)
            return prev.filter((_, i) => i !== index)
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        const [latStr, lngStr] = coords.split(',').map(s => s.trim())
        const lat = parseFloat(latStr) || 19.0760
        const lng = parseFloat(lngStr) || 72.8777

        try {
            await reportIncident({
                type: selectedType,
                severity: selectedSeverity,
                description: description || 'Reported via Citizen report',
                lat,
                lng
            })
            alert('Report submitted. Thank you.');
            setIsSubmitting(false)
            router.push('/citizen')
        } catch (err) {
            console.error('Failed to submit report', err)
            alert('Failed to submit report')
            setIsSubmitting(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto w-full pb-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Report an Incident</h1>
                <p className="text-muted-foreground">
                    Provide details about the emergency to help responders prioritize and act.
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">1</span>
                                Type & Severity
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                <TypeSelect label="Fire" icon="🔥" selected={selectedType === 'Fire'} onSelect={() => setSelectedType('Fire')} />
                                <TypeSelect label="Flood" icon="💧" selected={selectedType === 'Flood'} onSelect={() => setSelectedType('Flood')} />
                                <TypeSelect label="Medical" icon="🚑" selected={selectedType === 'Medical'} onSelect={() => setSelectedType('Medical')} />
                                <TypeSelect label="Structure" icon="🏚️" selected={selectedType === 'Structure'} onSelect={() => setSelectedType('Structure')} />
                                <TypeSelect label="Violence" icon="⚔️" selected={selectedType === 'Violence'} onSelect={() => setSelectedType('Violence')} />
                                <TypeSelect label="Other" icon="❓" selected={selectedType === 'Other'} onSelect={() => setSelectedType('Other')} />
                            </div>
                            <div className="pt-2">
                                <label className="text-sm font-medium mb-2 block">Severity Assessment</label>
                                <div className="flex gap-4">
                                    <Badge onClick={() => setSelectedSeverity('Low')} className={`cursor-pointer p-2 px-4 ${selectedSeverity === 'Low' ? 'bg-primary/5 ring-1 ring-primary' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>Low</Badge>
                                    <Badge onClick={() => setSelectedSeverity('Medium')} className={`cursor-pointer p-2 px-4 ${selectedSeverity === 'Medium' ? 'bg-amber-500 text-white' : 'bg-amber-200'}`}>Medium</Badge>
                                    <Badge onClick={() => setSelectedSeverity('Critical')} className={`cursor-pointer p-2 px-4 ${selectedSeverity === 'Critical' ? 'bg-red-600 text-white' : ''}`}>Critical</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">2</span>
                                Location & Evidence
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="relative">
                                <div className="absolute left-3 top-3 text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <Input value={coords} onChange={(e) => setCoords(e.target.value)} className="pl-9" placeholder="lat,lng e.g. 19.0760,72.8777" />
                            </div>
                            <div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*,video/*"
                                    multiple
                                    className="hidden"
                                    onChange={(e) => {
                                        const newFiles = Array.from(e.target.files || [])
                                        if (newFiles.length === 0) return
                                        // limit to max 8 files
                                        const allowed = newFiles.slice(0, 8 - files.length)
                                        const mapped = allowed.map((f) => ({ file: f, preview: URL.createObjectURL(f) }))
                                        setFiles((prev) => [...prev, ...mapped])
                                        // reset input so same file can be selected again
                                        e.currentTarget.value = ''
                                    }}
                                />

                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="border-2 border-dashed rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                                >
                                    {files.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center text-center p-6">
                                            <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                                            <span className="text-sm font-medium text-muted-foreground">Upload Photo/Video evidence</span>
                                            <span className="text-xs text-muted-foreground mt-2">You can add up to 8 files (images or videos)</span>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-3 gap-2">
                                            {files.map((f, idx) => (
                                                <div key={idx} className="relative">
                                                    {f.file.type.startsWith('image/') ? (
                                                        <img src={f.preview} className="h-24 w-24 object-cover rounded" />
                                                    ) : (
                                                        <video src={f.preview} className="h-24 w-24 object-cover rounded" />
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={(e) => { e.stopPropagation(); removeFile(idx) }}
                                                        className="absolute -top-2 -right-2 bg-background rounded-full p-1 border"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                            {files.length < 8 && (
                                                <div className="flex items-center justify-center h-24 w-24 rounded border border-dashed text-sm text-muted-foreground">
                                                    + Add
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Description</label>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Describe the situation..." />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex gap-4 sticky bottom-4">
                        <Button type="button" variant="outline" className="w-full" onClick={() => router.back()}>Cancel</Button>
                        <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                            {isSubmitting ? (
                                "Submitting Report..."
                            ) : (
                                <>
                                    Submit Report <Send className="h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

function TypeSelect({ label, icon, selected, onSelect }: { label: string, icon: string, selected?: boolean, onSelect?: () => void }) {
    return (
        <div
            onClick={() => onSelect && onSelect()}
            className={`border rounded-md p-3 flex flex-col items-center gap-2 cursor-pointer transition-all ${selected ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:border-primary/50'}`}
        >
            <span className="text-2xl">{icon}</span>
            <span className="text-sm font-medium">{label}</span>
        </div>
    )
}
