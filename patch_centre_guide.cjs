const fs = require('fs');
let code = fs.readFileSync('src/components/CentreAttendanceGuideScreen.tsx', 'utf8');

if (code.includes('getDoc')) {
  code = code.replace("import { doc, getDoc } from 'firebase/firestore';", "import { doc, onSnapshot } from 'firebase/firestore';");
  
  const oldEffect = `  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const docRef = doc(db, 'settings', 'attendance_guide');
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setGuideData(snap.data());
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGuide();
  }, []);`;
  
  const newEffect = `  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'attendance_guide'), (snap) => {
      if (snap.exists()) {
        setGuideData(snap.data());
      }
      setLoading(false);
    }, (err) => {
      console.error(err);
      setLoading(false);
    });
    return () => unsub();
  }, []);`;
  
  code = code.replace(oldEffect, newEffect);
  fs.writeFileSync('src/components/CentreAttendanceGuideScreen.tsx', code);
}
