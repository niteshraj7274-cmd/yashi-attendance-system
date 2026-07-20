const fs = require('fs');
let content = fs.readFileSync('src/components/AdminDashboardScreen.tsx', 'utf8');

const oldEffect = `  useEffect(() => {
    const todayStr = new Date().toLocaleDateString('en-CA');
    const attQ = query(collection(db, 'attendance'), where('Date', '==', todayStr));
    const fetchData = async () => {`;

const newEffect = `  useEffect(() => {
    const todayStr = new Date().toLocaleDateString('en-CA');
    const attQ = query(collection(db, 'attendance'), where('Date', '==', todayStr));

    const unSubCenters = onSnapshot(collection(db, 'centers'), (cSnap) => {
      let cTotal = 0, cActive = 0, cInactive = 0;
      cSnap.forEach(d => {
        cTotal++;
        if (d.data().status?.toLowerCase() === 'inactive' || d.data().isDeleted) cInactive++;
        else cActive++;
      });
      setCenterStats({ total: cTotal, active: cActive, inactive: cInactive });
    });

    const unSubStaff = onSnapshot(collection(db, 'staff'), (sSnap) => {
      let sTotal = 0, sActive = 0, sInactive = 0;
      sSnap.forEach(d => {
        sTotal++;
        if (d.data().status?.toLowerCase() === 'inactive' || d.data().isDeleted) sInactive++;
        else sActive++;
      });
      setStaffStats({ total: sTotal, active: sActive, inactive: sInactive });
    });

    const fetchData = async () => {`;

content = content.replace(oldEffect, newEffect);
fs.writeFileSync('src/components/AdminDashboardScreen.tsx', content);
