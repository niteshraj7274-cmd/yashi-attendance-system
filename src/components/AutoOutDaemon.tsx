import { useEffect } from 'react';
import { collection, query, where, getDocs, updateDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function AutoOutDaemon() {
  useEffect(() => {
    const checkInterval = setInterval(async () => {
      try {
        const today = new Date().toLocaleDateString('en-CA');
        
        // Fetch all centers to know their timing configurations
        const centersSnap = await getDocs(collection(db, 'centers'));
        const activeCenters = centersSnap.docs.map(d => ({ id: d.id, ...d.data() }));

        const defaultTimingSnap = await getDoc(doc(db, 'center_timings', 'default'));
        const defaultTimings = defaultTimingSnap.exists() ? defaultTimingSnap.data() : { autoOutEnabled: false, autoOutTime: '18:00' };

        for (const center of activeCenters) {
          // Check if this center has already been auto-out processed today
          const logRef = doc(db, 'system_logs', `autoOut_${today}_${center.id}`);
          const logSnap = await getDoc(logRef);
          if (logSnap.exists()) continue;

          // Get center specific timings or default
          const centerTimingSnap = await getDoc(doc(db, 'center_timings', center.id));
          const timings = centerTimingSnap.exists() ? { ...defaultTimings, ...centerTimingSnap.data() } : defaultTimings;

          if (timings.autoOutEnabled) {
            const autoOutTime = timings.autoOutTime || '18:00';
            const [outHour, outMinute] = autoOutTime.split(':').map(Number);
            const now = new Date();
            const currentHour = now.getHours();
            const currentMinute = now.getMinutes();

            if (currentHour > outHour || (currentHour === outHour && currentMinute >= outMinute)) {
              // Time has passed for this center, let's run the auto out
              await processAutoOutForCenter(today, center, autoOutTime, timings.autoOutReason || 'Auto Attendance OUT by Admin Settings');
              // Mark as run
              await setDoc(logRef, { runAt: new Date().toISOString(), status: 'Success', centerId: center.id });
            }
          }
        }
      } catch (err) {
        console.error("AutoOutDaemon Error:", err);
      }
    }, 60000); // Check every minute

    return () => clearInterval(checkInterval);
  }, []);

  const processAutoOutForCenter = async (dateStr: string, center: any, timeStr: string, reason: string) => {
    const q = query(collection(db, 'attendance'), where('Date', '==', dateStr)); // Note: querying all and filtering by centerId to avoid composite index requirement if missing
    const querySnapshot = await getDocs(q);
    
    // We can also query by Center Code if it's stored.
    // Let's check how centerId is mapped. The attendance record has 'centerId' or 'Center Code'.
    
    const updates = [];
    querySnapshot.forEach((documentSnapshot) => {
      const data = documentSnapshot.data();
      if (!data['OUT Time'] && (data['Center Code'] === center.code || data.centerId === center.id)) {
        updates.push(updateDoc(doc(db, 'attendance', documentSnapshot.id), {
          'OUT Time': timeStr,
          'OUT Date': dateStr,
          'OUT Attendance': 'Success',
          'OUT Status': 'Auto Generated',
          'OUT Latitude': data['Latitude'] || 0,
          'OUT Longitude': data['Longitude'] || 0,
          'OUT Location Code': data['Center Code'] || center.code,
          'Attendance Status': 'Auto Generated',
          'OUT Reason': reason,
          'OUT Type': 'System Auto OUT'
        }));
      }
    });
    await Promise.all(updates);
  };

  return null;
}
