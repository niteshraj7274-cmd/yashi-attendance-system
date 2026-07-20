const fs = require('fs');
let code = fs.readFileSync('src/components/AdminOfficialDutyScreen.tsx', 'utf8');

// replace useEffect query
const qRegex = /const q = query\([\s\S]*?\n    \);/;
code = code.replace(qRegex, 
`const q = query(
      collection(db, 'official_duty_requests'),
      where('Status', '==', 'Pending Approval')
    );`);

// replace handleAction
const actionRegex = /const handleAction = async \([^)]*\) => \{[\s\S]*?\};\n/;
const newAction = `const handleAction = async (req: any, action: 'Approved' | 'Rejected') => {
    try {
      // 1. Update the request status
      await updateDoc(doc(db, 'official_duty_requests', req.id), {
        Status: action,
        'Approved By': 'Admin',
        'Approval Time': new Date().toISOString()
      });

      // 2. Create an Attendance record
      const attendanceStatus = action === 'Approved' ? 'Present (Official Duty)' : 'Rejected';
      const newAttendance = {
        staffUid: req.staffUid,
        'Staff ID': req['Staff ID'],
        'Staff Name': req['Staff Name'],
        'Center ID': req['Center ID'] || '',
        'Center Code': req['Center Code'],
        'Center Name': req['Center Name'],
        'Date': req['Date'],
        date: req['Date'],
        'IN Time': req['Time'],
        'Attendance Status': attendanceStatus,
        'Duty Type': req['Duty Type'],
        'Reason': req['Reason'],
        'Latitude': req['GPS Latitude'],
        'Longitude': req['GPS Longitude'],
        'Google Maps Link': req['Google Maps Link'],
        'Selfie URL': req['Photo'] || '',
        timestamp: req.timestamp || new Date()
      };
      await addDoc(collection(db, 'attendance'), newAttendance);

    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    }
  };
`;
code = code.replace(actionRegex, newAction);

fs.writeFileSync('src/components/AdminOfficialDutyScreen.tsx', code);
