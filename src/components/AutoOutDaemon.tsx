import { useEffect, useRef } from 'react';
import { collection, query, where, getDocs, updateDoc, doc, setDoc, getDoc, getDocsFromCache, getDocFromCache } from 'firebase/firestore';
import { db } from '../firebase';

export default function AutoOutDaemon() {
  const cacheRef = useRef<{
     activeCenters?: any[];
     defaultTimings?: any;
     centerTimings: Record<string, any>;
     lastFetch: number;
  }>({
     centerTimings: {},
     lastFetch: 0
  });

  useEffect(() => {
    const checkInterval = setInterval(async () => {
      try {
        const today = new Date().toLocaleDateString('en-CA');
        const nowMs = Date.now();
        
        let activeCenters = cacheRef.current.activeCenters;
        let defaultTimings = cacheRef.current.defaultTimings;
        
        if (!activeCenters || nowMs - cacheRef.current.lastFetch > 300000) { // 5 minutes cache
           const centersSnap = navigator.onLine ? await getDocs(collection(db, 'centers')) : await getDocsFromCache(collection(db, 'centers')).catch(()=>({docs:[]})) as any;
           activeCenters = centersSnap.docs ? centersSnap.docs.map((d: any) => ({ id: d.id, ...d.data() })) : [];
           cacheRef.current.activeCenters = activeCenters;
           
           const defaultTimingSnap = navigator.onLine ? await getDoc(doc(db, 'center_timings', 'default')) : await getDocFromCache(doc(db, 'center_timings', 'default')).catch(()=>({exists:()=>false})) as any;
           defaultTimings = defaultTimingSnap.exists() ? defaultTimingSnap.data() : { autoOutEnabled: false, autoOutTime: '18:00' };
           cacheRef.current.defaultTimings = defaultTimings;
           cacheRef.current.lastFetch = nowMs;
        }

        if (!activeCenters) return;

        for (const center of activeCenters) {
          // Check if this center has already been auto-out processed today
          const logRef = doc(db, 'system_logs', `autoOut_${today}_${center.id}`);
          let logSnap: any;
          if (!navigator.onLine) {
             try { logSnap = await getDocFromCache(logRef); } catch(e) {}
          }
          if (!logSnap) {
             logSnap = await getDoc(logRef);
          }
          if (logSnap && logSnap.exists()) continue;

          // Get center specific timings or default
          let centerTiming = cacheRef.current.centerTimings[center.id];
          if (!centerTiming || nowMs - cacheRef.current.lastFetch > 300000) {
             let centerTimingSnap: any;
             if (!navigator.onLine) {
                try { centerTimingSnap = await getDocFromCache(doc(db, 'center_timings', center.id)); } catch(e) {}
             }
             if (!centerTimingSnap) {
                centerTimingSnap = await getDoc(doc(db, 'center_timings', center.id));
             }
             cacheRef.current.centerTimings[center.id] = centerTimingSnap && centerTimingSnap.exists() ? centerTimingSnap.data() : null;
             centerTiming = cacheRef.current.centerTimings[center.id];
          }
          
          const timings = centerTiming ? { ...defaultTimings, ...centerTiming } : defaultTimings;

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
              if (navigator.onLine) {
                await setDoc(logRef, { runAt: new Date().toISOString(), status: 'Success', centerId: center.id });
              }
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
