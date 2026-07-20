import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const logValidation = async (
  action: 'Submission' | 'Approval',
  requestType: 'Leave' | 'Official Duty',
  staffUid: string,
  fromDate: string,
  toDate: string,
  isValid: boolean,
  reason: string
) => {
  try {
    await addDoc(collection(db, 'validation_logs'), {
      action,
      requestType,
      staffUid,
      fromDate,
      toDate,
      isValid,
      reason,
      timestamp: serverTimestamp()
    });
  } catch (err) {
    console.error("Failed to save validation log", err);
  }
};

export const validateRequestSubmission = async (
  staffUid: string,
  fromDate: string, // YYYY-MM-DD
  toDate: string,   // YYYY-MM-DD
  requestType: 'Leave' | 'Official Duty'
): Promise<{ valid: boolean; message?: string }> => {
  if (!staffUid || !fromDate || !toDate) {
    const msg = "Missing required fields.";
    await logValidation('Submission', requestType, staffUid, fromDate, toDate, false, msg);
    return { valid: false, message: msg };
  }

  const today = new Date();
  
  if (requestType === 'Leave' && today.getHours() < 7) {
    const msg = "Leave requests can only be submitted from 07:00 AM onwards.";
    await logValidation('Submission', requestType, staffUid, fromDate, toDate, false, msg);
    return { valid: false, message: msg };
  }

  today.setHours(0, 0, 0, 0);
  const startDate = new Date(fromDate);
  startDate.setHours(0, 0, 0, 0);

  if (requestType === 'Leave' && startDate < today) {
    const msg = "A Leave Request can only be submitted for today's date or future dates.";
    await logValidation('Submission', requestType, staffUid, fromDate, toDate, false, msg);
    return { valid: false, message: msg };
  }

  const datesToCheck: string[] = [];
  let currentDate = new Date(fromDate);
  const endDate = new Date(toDate);
  
  while (currentDate <= endDate) {
    const yyyy = currentDate.getFullYear();
    const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dd = String(currentDate.getDate()).padStart(2, '0');
    datesToCheck.push(`${yyyy}-${mm}-${dd}`);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  if (datesToCheck.length === 0) {
    const msg = "Invalid date range.";
    await logValidation('Submission', requestType, staffUid, fromDate, toDate, false, msg);
    return { valid: false, message: msg };
  }

  // 6. Do not allow duplicate Leave or Official Duty requests for the same staff on the same date.
  const leavesQ = query(collection(db, 'leaves'), where('staffUid', '==', staffUid));
  const leavesSnap = await getDocs(leavesQ);
  
  for (const doc of leavesSnap.docs) {
    const data = doc.data();
    if (data.status === 'Rejected' || data.status === 'Cancelled') continue;
    
    if (data.fromDate && data.toDate) {
      const existingStart = new Date(data.fromDate);
      const existingEnd = new Date(data.toDate);
      
      for (const dtStr of datesToCheck) {
        const dt = new Date(dtStr);
        dt.setHours(0, 0, 0, 0);
        existingStart.setHours(0, 0, 0, 0);
        existingEnd.setHours(0, 0, 0, 0);
        
        if (dt >= existingStart && dt <= existingEnd) {
           const msg = `Duplicate Leave request found for date ${dtStr}.`;
           await logValidation('Submission', requestType, staffUid, fromDate, toDate, false, msg);
           return { valid: false, message: msg };
        }
      }
    }
  }

  const odQ = query(collection(db, 'official_duty_requests'), where('staffUid', '==', staffUid));
  const odSnap = await getDocs(odQ);
  
  for (const doc of odSnap.docs) {
    const data = doc.data();
    if (data.Status === 'Rejected' || data.Status === 'Cancelled') continue;
    
    const odDateStr = data.Date;
    if (odDateStr) {
      const odDt = new Date(odDateStr);
      odDt.setHours(0,0,0,0);
      
      for (const dtStr of datesToCheck) {
        const dt = new Date(dtStr);
        dt.setHours(0, 0, 0, 0);
        
        if (dt.getTime() === odDt.getTime()) {
           const msg = `Duplicate Official Duty request found for date ${dtStr}.`;
           await logValidation('Submission', requestType, staffUid, fromDate, toDate, false, msg);
           return { valid: false, message: msg };
        }
      }
    }
  }

  await logValidation('Submission', requestType, staffUid, fromDate, toDate, true, "Success");
  return { valid: true };
};

export const validateRequestApproval = async (
  staffUid: string,
  fromDate: string,
  toDate: string,
  requestType: 'Leave' | 'Official Duty',
  currentRequestId: string,
  requestSubmissionDate?: string // added to check original submission time
): Promise<{ valid: boolean; message?: string }> => {
  if (!staffUid || !fromDate || !toDate) {
    return { valid: true };
  }

  if (requestType === 'Leave' && requestSubmissionDate) {
     const subDate = new Date(requestSubmissionDate);
     if (subDate.getHours() < 7) {
       const msg = "Leave requests can only be submitted from 07:00 AM onwards. Cannot approve this request.";
       await logValidation('Approval', requestType, staffUid, fromDate, toDate, false, msg);
       return { valid: false, message: msg };
     }
  }

  const datesToCheck: string[] = [];
  let currentDate = new Date(fromDate);
  const endDate = new Date(toDate);
  
  while (currentDate <= endDate) {
    const yyyy = currentDate.getFullYear();
    const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dd = String(currentDate.getDate()).padStart(2, '0');
    datesToCheck.push(`${yyyy}-${mm}-${dd}`);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  for (const dtStr of datesToCheck) {
    const attQ = query(
      collection(db, 'attendance'),
      where('staffUid', '==', staffUid),
      where('Date', '==', dtStr)
    );
    const attSnap = await getDocs(attQ);
    
    if (!attSnap.empty) {
      let hasRealAttendance = false;
      for (const doc of attSnap.docs) {
         const data = doc.data();
         if (data['IN Time'] || data['OUT Time'] || data['Attendance Status'] === 'Present' || data['Attendance Status'] === 'Half Day') {
           hasRealAttendance = true;
         }
      }
      
      if (hasRealAttendance) {
        let msg = '';
        if (requestType === 'Leave') {
          msg = 'Attendance has already been marked for this date. Leave cannot be approved.';
        } else {
          msg = 'Attendance has already been marked for this date. Official Duty cannot be approved.';
        }
        await logValidation('Approval', requestType, staffUid, fromDate, toDate, false, msg);
        return { valid: false, message: msg };
      }
    }
    
    const leavesQ = query(collection(db, 'leaves'), where('staffUid', '==', staffUid));
    const leavesSnap = await getDocs(leavesQ);
    
    for (const doc of leavesSnap.docs) {
      if (doc.id === currentRequestId) continue;
      const data = doc.data();
      if (data.status === 'Approved') {
        const existingStart = new Date(data.fromDate);
        const existingEnd = new Date(data.toDate);
        existingStart.setHours(0,0,0,0);
        existingEnd.setHours(0,0,0,0);
        
        const currentCheckDt = new Date(dtStr);
        currentCheckDt.setHours(0,0,0,0);
        
        if (currentCheckDt >= existingStart && currentCheckDt <= existingEnd) {
          const msg = `A Leave request is already approved for ${dtStr}.`;
          await logValidation('Approval', requestType, staffUid, fromDate, toDate, false, msg);
          return { valid: false, message: msg };
        }
      }
    }
    
    const odQ = query(collection(db, 'official_duty_requests'), where('staffUid', '==', staffUid));
    const odSnap = await getDocs(odQ);
    
    for (const doc of odSnap.docs) {
      if (doc.id === currentRequestId) continue;
      const data = doc.data();
      if (data.Status === 'Approved') {
        if (data.Date === dtStr) {
          const msg = `An Official Duty request is already approved for ${dtStr}.`;
          await logValidation('Approval', requestType, staffUid, fromDate, toDate, false, msg);
          return { valid: false, message: msg };
        }
      }
    }
  }

  await logValidation('Approval', requestType, staffUid, fromDate, toDate, true, "Success");
  return { valid: true };
};
