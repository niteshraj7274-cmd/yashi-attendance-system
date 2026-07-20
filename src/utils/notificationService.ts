import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export const sendCenterNotification = async (
  centerId: string, 
  centerCode: string, 
  type: string, 
  staffName: string, 
  staffId: string, 
  designation: string, 
  attendanceStatus: string, 
  reason?: string, 
  distance?: number
) => {
  try {
    if (!centerId) return;
    const now = new Date();
    await addDoc(collection(db, 'center_notifications'), {
      centerId,
      centerCode,
      type,
      staffName,
      staffId,
      designation,
      attendanceStatus,
      date: now.toLocaleDateString('en-CA'),
      time: now.toLocaleTimeString('en-US', { hour12: false }),
      reason: reason || '',
      distance: distance || 0,
      read: false,
      timestamp: serverTimestamp()
    });
  } catch (err) {
    console.error("Failed to send notification:", err);
  }
};
