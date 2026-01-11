"use client"

import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { SEED_PAYLOADS } from '@/lib/mockIncidents';

export interface Incident {
    id: string;
    type: string;
    severity: 'Critical' | 'High' | 'Medium' | 'Low';
    description: string;
    lat: number;
    lng: number;
    timestamp: Timestamp;
}

import { MOCK_INCIDENTS } from '@/lib/mockIncidents';

const DEFAULT_INCIDENTS: Incident[] = MOCK_INCIDENTS;

export function useIncidents() {
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // If Firebase env vars are missing, fall back to mock data
        if (!db) {
            console.warn("Firebase not configured, utilizing mock data.");
            setIncidents(DEFAULT_INCIDENTS);
            setLoading(false);
            return;
        }

        try {
            const q = query(collection(db, 'incidents'), orderBy('timestamp', 'desc'));

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const newIncidents = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Incident[];

                // If the collection is empty in development, auto-seed demo incidents once per browser session
                if (snapshot.empty && process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
                    try {
                        const seededFlag = localStorage.getItem('resqnet:seeded');
                        if (!seededFlag) {
                            // Fire and forget, let onSnapshot pick up inserted docs
                            (async () => {
                                console.log('Auto-seeding demo incidents...');
                                try {
                                    const fireDb = db;
                                    if (!fireDb) throw new Error('No Firestore instance');
                                    for (const p of SEED_PAYLOADS) {
                                        await addDoc(collection(fireDb, 'incidents'), {
                                            ...p,
                                            timestamp: serverTimestamp()
                                        });
                                        // small delay to simulate streaming activity
                                        await new Promise(res => setTimeout(res, 200));
                                    }
                                    localStorage.setItem('resqnet:seeded', '1');
                                    console.log('Auto-seed completed.');
                                } catch (err) {
                                    console.error('Auto-seed failed', err);
                                }
                            })();
                        }
                    } catch (err) {
                        // Ignore localStorage errors in some browsers
                        console.warn('Auto-seed check failed', err);
                    }

                    // Show fallback data immediately while seeding completes
                    setIncidents(DEFAULT_INCIDENTS);
                    setLoading(false);
                    return;
                }

                setIncidents(newIncidents.length > 0 ? newIncidents : DEFAULT_INCIDENTS); // Fallback if DB empty for demo
                setLoading(false);
            }, (err) => {
                console.error("Firebase Snapshot Error:", err);
                setIncidents(DEFAULT_INCIDENTS);
                setLoading(false);
            });

            return () => unsubscribe();
        } catch (err) {
            console.error("Firebase Init Error:", err);
            setIncidents(DEFAULT_INCIDENTS);
            setLoading(false);
        }
    }, []);

    const reportIncident = async (incident: Omit<Incident, 'id' | 'timestamp'>) => {
        if (!db) {
            // Mock addition
            const newIncident = { ...incident, id: Math.random().toString(), timestamp: Timestamp.now() };
            setIncidents(prev => [newIncident, ...prev]);
            return;
        }

        await addDoc(collection(db, 'incidents'), {
            ...incident,
            timestamp: serverTimestamp()
        });
    };

    return { incidents, loading, reportIncident };
}
