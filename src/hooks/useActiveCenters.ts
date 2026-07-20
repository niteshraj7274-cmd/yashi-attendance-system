import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Center } from '../types';

export function useActiveCenters() {
  const [centers, setCenters] = useState<{ id: string, name: string, code: string, latitude?: number, longitude?: number, geofenceRadius?: number, district?: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'centers'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      
      if (querySnapshot.empty) {
        // Create default center if none exists
        const defaultCenter = {
          name: 'Main Center',
          code: 'C001',
          pin: '1234',
          status: 'Active',
          district: 'Headquarters',
          latitude: 0,
          longitude: 0,
          geofenceRadius: 500,
          createdAt: new Date().toISOString()
        };
        const newRef = doc(collection(db, 'centers'));
        setDoc(newRef, defaultCenter).catch(console.error);
        return; // onSnapshot will trigger again
      }
      const centerList: { id: string, name: string, code: string, latitude?: number, longitude?: number, geofenceRadius?: number, district?: string }[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if ((data.status === 'Active' || !data.status) && data.isDeleted !== true) {
          centerList.push({ id: docSnap.id, name: data.name, code: data.code || '', latitude: data.latitude, longitude: data.longitude, geofenceRadius: data.geofenceRadius, district: data.district });
        }
      });
      // Optional: Sort by code or name
      centerList.sort((a, b) => a.code.localeCompare(b.code));
      setCenters(centerList);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching active centers:", err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { centers, loading };
}
