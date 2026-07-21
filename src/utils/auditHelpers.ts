import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export interface AuditLogParams {
  userName?: string;
  staffId?: string;
  role?: string;
  centerName?: string;
  centerCode?: string;
  deviceId?: string;
  loginDateTime?: string;
  logoutDateTime?: string;
  sessionDuration?: string;
  ipAddress?: string;
  latitude?: string | number;
  longitude?: string | number;
  action?: string;
  moduleName?: string;
  previousValue?: string;
  newValue?: string;
  status?: string;
  reason?: string;
}

export const logAuditActivity = async (
  adminName: string | any, 
  entityType?: string, 
  entityName?: string, 
  action?: string, 
  details?: string,
  extraParams?: AuditLogParams
) => {
  try {
    // Determine the IP if possible
    let ip = extraParams?.ipAddress || '';
    if (!ip) {
       try {
         const res = await fetch('https://api.ipify.org?format=json');
         const data = await res.json();
         ip = data.ip;
       } catch(e) {}
    }

    const payload: any = {
      userName: adminName || extraParams?.userName || '',
      staffId: extraParams?.staffId || '',
      role: extraParams?.role || 'Admin',
      centerName: extraParams?.centerName || '',
      centerCode: extraParams?.centerCode || '',
      deviceId: extraParams?.deviceId || localStorage.getItem('deviceId') || '',
      loginDateTime: extraParams?.loginDateTime || '',
      logoutDateTime: extraParams?.logoutDateTime || '',
      sessionDuration: extraParams?.sessionDuration || '',
      ipAddress: ip,
      latitude: extraParams?.latitude || '',
      longitude: extraParams?.longitude || '',
      action: action || extraParams?.action || '',
      moduleName: entityType || extraParams?.moduleName || '',
      previousValue: extraParams?.previousValue || '',
      newValue: details || extraParams?.newValue || '',
      status: extraParams?.status || 'Success',
      reason: extraParams?.reason || '',
      timestamp: serverTimestamp(),
      
      // Legacy fields for backward compatibility
      adminName: adminName || extraParams?.userName || '',
      entityType: entityType || extraParams?.moduleName || '',
      staffName: entityName || '',
      details: details || extraParams?.newValue || ''
    };

    await addDoc(collection(db, 'audit_logs'), payload);
  } catch (err) {
    console.error('Audit Log Error:', err);
  }
};
