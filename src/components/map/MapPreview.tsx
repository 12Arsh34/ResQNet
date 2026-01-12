"use client"

import React from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const defaultZoom = 13

export default function MapPreview({ incidentLat, incidentLng, placeLat, placeLng, height = 160 }: { incidentLat: number, incidentLng: number, placeLat?: number, placeLng?: number, height?: number }) {
  const center: [number, number] = placeLat && placeLng ? [ (incidentLat + placeLat)/2, (incidentLng + placeLng)/2 ] : [incidentLat, incidentLng]

  return (
    <div className="w-full rounded-md overflow-hidden" style={{ height }}>
      <MapContainer center={center} zoom={defaultZoom} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[incidentLat, incidentLng]} />
        {placeLat && placeLng && <Marker position={[placeLat, placeLng]} />}
      </MapContainer>
    </div>
  )
}
