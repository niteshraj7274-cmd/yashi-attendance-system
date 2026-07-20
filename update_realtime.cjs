const fs = require('fs');

// 1. Update AdminCenterManagementScreen.tsx
let centerContent = fs.readFileSync('src/components/AdminCenterManagementScreen.tsx', 'utf8');
centerContent = centerContent.replace(
  /useEffect\(\(\) => \{\s*fetchCenters\(\);\s*\}, \[\]\);\s*const fetchCenters = async \(\) => \{[\s\S]*?finally \{\s*setLoading\(false\);\s*\}\s*\};/m,
  `useEffect(() => {
    setLoading(true);
    const q = query(collection(db, 'centers'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
      setCenters(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching centers:", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);`
);
// Import onSnapshot in AdminCenterManagementScreen
if (!centerContent.includes('onSnapshot')) {
  centerContent = centerContent.replace('getDocs, updateDoc', 'getDocs, updateDoc, onSnapshot');
}
fs.writeFileSync('src/components/AdminCenterManagementScreen.tsx', centerContent);

// 2. Update AdminStaffManagementScreen.tsx
let staffContent = fs.readFileSync('src/components/AdminStaffManagementScreen.tsx', 'utf8');
staffContent = staffContent.replace(
  /const fetchData = async \(\) => \{[\s\S]*?catch \(err\) \{[\s\S]*?finally \{\s*setLoading\(false\);\s*\}\s*\};/m,
  `const fetchData = () => {}; // Replaced with onSnapshot in useEffect`
);
staffContent = staffContent.replace(
  /useEffect\(\(\) => \{\s*fetchData\(\);\s*\}, \[\]\);/m,
  `useEffect(() => {
    setLoading(true);
    const qCenters = query(collection(db, 'centers'));
    const unSubCenters = onSnapshot(qCenters, (snapshot) => {
      const cData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
      setCenters(cData);
    });

    const qStaff = query(collection(db, 'staff'));
    const unSubStaff = onSnapshot(qStaff, (snapshot) => {
      const sData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
      setStaff(sData);
      setLoading(false);
    });

    return () => {
      unSubCenters();
      unSubStaff();
    };
  }, []);`
);
// Import onSnapshot in AdminStaffManagementScreen
if (!staffContent.includes('onSnapshot')) {
  staffContent = staffContent.replace('getDocs, updateDoc', 'getDocs, updateDoc, onSnapshot');
}
fs.writeFileSync('src/components/AdminStaffManagementScreen.tsx', staffContent);

