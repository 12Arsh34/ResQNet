"use client"

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import L from 'leaflet';
import { useIncidents, type Incident } from '@/hooks/useIncidents';
import { Skeleton } from '@/components/ui/skeleton';
import { MOCK_PLACES } from '@/lib/mockPlaces'

// Marker cluster plugin and styles
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
// plugin augments L globally; TypeScript doesn't always have types, expect an error if not available
// @ts-expect-error - leaflet.markercluster has no types
import 'leaflet.markercluster';

// Fix for default marker icon in Next.js and provide colored icons per severity
const base = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img';

const ICONS: Record<string, L.Icon> = {
    Critical: L.icon({
        iconUrl: `${base}/marker-icon-2x-red.png`,
        shadowUrl: `${base}/marker-shadow.png`,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
    }),
    High: L.icon({
        iconUrl: `${base}/marker-icon-2x-orange.png`,
        shadowUrl: `${base}/marker-shadow.png`,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
    }),
    Medium: L.icon({
        iconUrl: `${base}/marker-icon-2x-yellow.png`,
        shadowUrl: `${base}/marker-shadow.png`,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
    }),
    Low: L.icon({
        iconUrl: `${base}/marker-icon-2x-green.png`,
        shadowUrl: `${base}/marker-shadow.png`,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
    }),
};

function ClusterMarkers({ incidents }: { incidents: Incident[] }) {
    const map = useMap();

    React.useEffect(() => {
        if (!map) return;

        const _mcl = (L as unknown as { markerClusterGroup?: (opts?: { showCoverageOnHover?: boolean, maxClusterRadius?: number }) => unknown }).markerClusterGroup;
        const clusterGroup = _mcl ? _mcl({ showCoverageOnHover: false, maxClusterRadius: 50 }) : _mcl && _mcl({ showCoverageOnHover: false, maxClusterRadius: 50 });

        incidents.forEach(incident => {
            const icon = incident.severity === 'Critical'
                ? L.divIcon({ html: `<span class="marker-pulse"></span><span class="marker-dot"></span>`, className: 'critical-marker', iconSize: [20, 20], iconAnchor: [10, 10] })
                : ICONS[incident.severity || 'Medium'];

            const severityColor = incident.severity === 'Critical' ? '#ef4444' : incident.severity === 'High' ? '#f97316' : incident.severity === 'Medium' ? '#f59e0b' : '#10b981';

            const popupHtml = `
                <div style="max-width:220px;padding:6px;font-size:12px;color:#06202a">
                    <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
                        <span style="width:8px;height:8px;border-radius:9999px;display:inline-block;background:${severityColor};"></span>
                        <strong style="font-size:13px">${incident.type}</strong>
                    </div>
                    <div style="font-size:12px;color:#64748b">${incident.description}</div>
                    <div style="font-size:11px;color:#94a3b8;margin-top:6px">${incident.timestamp?.seconds ? new Date(incident.timestamp.seconds * 1000).toLocaleString() : 'Just now'}</div>
                </div>
            `;

            const m = L.marker([incident.lat, incident.lng], { icon }).bindPopup(popupHtml);
            clusterGroup.addLayer(m);
        });

        map.addLayer(clusterGroup);

        return () => {
            try { map.removeLayer(clusterGroup); } catch { /* ignore */ }
        };
    }, [map, incidents]);

    return null;
}

function PlacesMarkers() {
    const map = useMap()

    React.useEffect(() => {
        if (!map) return
        const group = L.layerGroup()
        for (const p of MOCK_PLACES) {
            const color = p.type === 'Shelter' ? '#22c55e' : p.type === 'Medical' ? '#00cccc' : p.type === 'Supplies' ? '#ff55b4' : '#f59e0b'
            const icon = L.divIcon({ html: `<span style="display:inline-block;width:12px;height:12px;border-radius:12px;background:${color};box-shadow:0 6px 18px rgba(0,0,0,0.4)"></span>`, className: '', iconSize: [12, 12], iconAnchor: [6, 6] })
            const popupHtml = `
                <div style="max-width:240px;padding:8px;color:var(--foreground)">
                    <strong style="font-size:13px">${p.name}</strong>
                    <div style="font-size:12px;color:#94a3b8;margin-top:6px">${p.type} • ${p.address ?? ''}</div>
                    <div style="font-size:12px;color:#94a3b8;margin-top:6px">Capacity: ${p.available ?? '-'} / ${p.capacity ?? '-'}</div>
                </div>
            `
            const m = L.marker([p.lat, p.lng], { icon }).bindPopup(popupHtml)
            group.addLayer(m)
        }
        map.addLayer(group)
        return () => { try { map.removeLayer(group) } catch { } }
    }, [map])

    return null
}

export default function LeafletMapInner() {
    const { incidents, loading } = useIncidents();

    if (loading) {
        return <Skeleton className="w-full h-full bg-slate-100 dark:bg-slate-800 animate-pulse" />
    }

    return (
        <MapContainer
            center={[19.0760, 72.8777]}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <div className="leaflet-legend pointer-events-auto">
                <div className="item"><span className="dot red" /> Critical</div>
                <div className="item"><span className="dot orange" /> High</div>
                <div className="item"><span className="dot yellow" /> Medium</div>
                <div className="item"><span className="dot green" /> Low</div>
            </div>

            {/* Markers are added to a marker-cluster group for performance and UX */}
            <ClusterMarkers incidents={incidents} />
            <PlacesMarkers />
        </MapContainer>
    );
}
