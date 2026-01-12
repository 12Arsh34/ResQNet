"use client"

import React from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import MapPreview from './MapPreview'
import { Button } from '@/components/ui/button'

export default function RouteModal({ incident, place, children }: { incident: { lat: number, lng: number }, place?: { lat: number, lng: number, name?: string }, children: React.ReactNode }) {
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${incident.lat},${incident.lng}&travelmode=driving`;
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Route Info</DialogTitle>
          <DialogDescription>Preview and navigation options for this assignment.</DialogDescription>
        </DialogHeader>
        <div className="mt-2">
          <MapPreview incidentLat={incident.lat} incidentLng={incident.lng} placeLat={place?.lat} placeLng={place?.lng} />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <a href={mapsUrl} target="_blank" rel="noreferrer">
            <Button>Open in Google Maps</Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
