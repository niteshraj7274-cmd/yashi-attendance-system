const fs = require('fs');
const path = 'src/components/StaffDashboardScreen.tsx';
let content = fs.readFileSync(path, 'utf8');

// Remove from OD Submit
content = content.replace(
`      checkODRequests(staffData.uid);
      
      const unsubSettings = onSnapshot(doc(db, 'settings', 'appSettings'), (docSnap) => {
          if (docSnap.exists()) {
             setAppSettings(prev => ({ ...prev, ...docSnap.data() }));
          }
        });`,
`      checkODRequests(staffData.uid);`
);

// Add to useEffect (where checkTodayAttendance is called)
content = content.replace(
`    checkTodayAttendance(session.uid);
    checkODRequests(session.uid);
  }, [navigate]);`,
`    checkTodayAttendance(session.uid);
    checkODRequests(session.uid);
    
    const unsubSettings = onSnapshot(doc(db, 'settings', 'appSettings'), (docSnap) => {
      if (docSnap.exists()) {
         setAppSettings(prev => ({ ...prev, ...docSnap.data() }));
      }
    });
    return () => unsubSettings();
  }, [navigate]);`
);

fs.writeFileSync(path, content);
