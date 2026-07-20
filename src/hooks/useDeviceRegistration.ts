import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { getOrCreateDeviceId } from '../utils/deviceUtils';

export function useDeviceRegistration() {
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [deviceData, setDeviceData] = useState<any>(null);
  const deviceId = getOrCreateDeviceId();

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'registered_devices', deviceId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setIsRegistered(data.status === 'Active' || data.status === 'Approved');
        setDeviceData(data);
      } else {
        setIsRegistered(false);
        setDeviceData(null);
      }
    }, (error) => {
      console.error("Error fetching device status:", error);
      setIsRegistered(false);
    });

    return () => unsubscribe();
  }, [deviceId]);

  return { isRegistered, deviceId, deviceData };
}
