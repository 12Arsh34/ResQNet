import { Timestamp } from 'firebase/firestore';

export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';

export type MockIncident = {
    id: string;
    lat: number;
    lng: number;
    type: string;
    severity: Severity;
    description: string;
    timestamp: Timestamp;
}

export const MOCK_INCIDENTS: MockIncident[] = [
    { id: 'm1', lat: 19.017614, lng: 72.856164, type: 'Flood', severity: 'Critical', description: 'Severe flooding reported near the railway lines, water entering ground floors', timestamp: Timestamp.fromMillis(Date.now() - 1000 * 60 * 10) },
    { id: 'm2', lat: 19.076091, lng: 72.877426, type: 'Fire', severity: 'High', description: 'Large fire reported at a commercial building', timestamp: Timestamp.fromMillis(Date.now() - 1000 * 60 * 25) },
    { id: 'm3', lat: 19.0330, lng: 72.8300, type: 'Road Accident', severity: 'High', description: 'Multi-vehicle collision blocking two lanes', timestamp: Timestamp.fromMillis(Date.now() - 1000 * 60 * 40) },
    { id: 'm4', lat: 19.0514, lng: 72.8400, type: 'Medical', severity: 'Medium', description: 'Person collapsed, ambulance requested', timestamp: Timestamp.fromMillis(Date.now() - 1000 * 60 * 15) },
    { id: 'm5', lat: 18.9750, lng: 72.8246, type: 'Power Outage', severity: 'Low', description: 'Widespread power outage in the area', timestamp: Timestamp.fromMillis(Date.now() - 1000 * 60 * 60) },
    { id: 'm6', lat: 19.0900, lng: 72.8400, type: 'Gas Leak', severity: 'Critical', description: 'Possible gas leak in a residential complex', timestamp: Timestamp.fromMillis(Date.now() - 1000 * 60 * 5) },
    { id: 'm7', lat: 19.1160, lng: 72.8697, type: 'Flood', severity: 'High', description: 'Waterlogging at low-lying roads', timestamp: Timestamp.fromMillis(Date.now() - 1000 * 60 * 20) },
    { id: 'm8', lat: 19.0400, lng: 72.9000, type: 'Building Collapse', severity: 'Critical', description: 'Partial collapse of older structure, search & rescue in progress', timestamp: Timestamp.fromMillis(Date.now() - 1000 * 60 * 35) },
    { id: 'm9', lat: 19.0567, lng: 72.8800, type: 'Protest', severity: 'Medium', description: 'Crowd gathering and blocking major junction', timestamp: Timestamp.fromMillis(Date.now() - 1000 * 60 * 70) },
    { id: 'm10', lat: 19.1150, lng: 72.8330, type: 'Road Accident', severity: 'High', description: 'Taxi overturned, traffic diverted', timestamp: Timestamp.fromMillis(Date.now() - 1000 * 60 * 50) },
    { id: 'm11', lat: 19.0850, lng: 72.8400, type: 'Missing Person', severity: 'Low', description: 'Report of missing person near the promenade', timestamp: Timestamp.fromMillis(Date.now() - 1000 * 60 * 120) },
    { id: 'm12', lat: 19.1620, lng: 72.8360, type: 'Landslide', severity: 'High', description: 'Small landslide has blocked a service road', timestamp: Timestamp.fromMillis(Date.now() - 1000 * 60 * 30) },
];

// Stripped-down payloads for seeding into Firestore (omit id/timestamp)
export const SEED_PAYLOADS: Omit<MockIncident, 'id'|'timestamp'>[] = MOCK_INCIDENTS.map(({ lat, lng, type, severity, description }) => ({ lat, lng, type, severity, description }));
