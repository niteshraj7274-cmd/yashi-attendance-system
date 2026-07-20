import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export const logAuditActivity = async (adminName, entityType, entityName, action, details) => {
  try {
    await addDoc(collection(db, 'audit_logs'), {
      adminName,
      entityType,
      staffName: entityName,
      action,
      details,
      timestamp: serverTimestamp()
    });
  } catch (err) {
    console.error('Audit Log Error:', err);
  }
};
