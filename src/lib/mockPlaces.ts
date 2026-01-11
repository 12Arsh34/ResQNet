export type Place = {
  id: string
  name: string
  lat: number
  lng: number
  type: 'Shelter' | 'Medical' | 'Supplies' | 'Power' | 'Other'
  capacity?: number // numeric overall capacity where applicable
  available?: number // current available number (optional)
  address?: string
  phone?: string
}

// Realistic Mumbai coords, small sample
export const MOCK_PLACES: Place[] = [
  { id: 'p1', name: 'Central Community Center', lat: 19.017614, lng: 72.856164, type: 'Shelter', capacity: 100, available: 45, address: '123 Main St, Downtown', phone: '(555) 123-4567' },
  { id: 'p2', name: "St. Mary's Hospital", lat: 19.076091, lng: 72.877426, type: 'Medical', capacity: 80, available: 10, address: '456 Healer Ave', phone: '(555) 987-6543' },
  { id: 'p3', name: 'Northside Water Station', lat: 19.0330, lng: 72.8300, type: 'Supplies', capacity: 500, available: 300, address: '789 Spring Rd' },
  { id: 'p4', name: 'Emergency Power Hub', lat: 19.0514, lng: 72.8400, type: 'Power', capacity: 50, available: 20, address: '321 Electric Blvd', phone: '(555) 555-0000' },
  { id: 'p5', name: 'West High School Gym', lat: 19.1150, lng: 72.8330, type: 'Shelter', capacity: 200, available: 0, address: 'Schools District 4', phone: '(555) 222-3333' },
  { id: 'p6', name: 'Zone B Medical Camp', lat: 19.0850, lng: 72.8400, type: 'Medical', capacity: 60, available: 20, address: 'Zone B' },
  { id: 'p7', name: 'Supply Depot A', lat: 19.0900, lng: 72.8400, type: 'Supplies', capacity: 300, available: 120, address: 'Depot Road' },
]
