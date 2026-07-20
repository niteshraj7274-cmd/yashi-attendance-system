import fs from 'fs';
let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

if (!content.includes('getDocFromCache')) {
  content = content.replace(
    /import { collection, query, where, getDocs, addDoc, serverTimestamp, getDoc, doc, updateDoc, onSnapshot } from 'firebase\/firestore';/,
    "import { collection, query, where, getDocs, addDoc, serverTimestamp, getDoc, doc, updateDoc, onSnapshot, getDocsFromCache, getDocFromCache } from 'firebase/firestore';"
  );
}

content = content.replace(
  /const cDoc = await getDoc\(doc\(db, 'centers', session\.centerId\)\);/,
  `let cDoc;
        try {
          cDoc = !navigator.onLine ? await getDocFromCache(doc(db, 'centers', session.centerId)) : await getDoc(doc(db, 'centers', session.centerId));
        } catch(e) {
          if (!navigator.onLine) {
            cDoc = await getDoc(doc(db, 'centers', session.centerId));
          }
        }`
);

content = content.replace(
  /const snapshot = await getDocs\(q\);/,
  `let snapshot;
      try {
        snapshot = !navigator.onLine ? await getDocsFromCache(q) : await getDocs(q);
      } catch (e) {
        if (!navigator.onLine) {
           snapshot = await getDocs(q);
        } else {
           throw e;
        }
      }`
);

content = content.replace(
  /const querySnapshot = await getDocs\(q\);/,
  `let querySnapshot;
      try {
        querySnapshot = !navigator.onLine ? await getDocsFromCache(q) : await getDocs(q);
      } catch (e) {
        if (!navigator.onLine) {
           querySnapshot = await getDocs(q);
        } else {
           throw e;
        }
      }`
);

content = content.replace(
  /const settingsSnap = await getDoc\(doc\(db, 'settings', 'appSettings'\)\);/g,
  `let settingsSnap;
              try {
                settingsSnap = !navigator.onLine ? await getDocFromCache(doc(db, 'settings', 'appSettings')) : await getDoc(doc(db, 'settings', 'appSettings'));
              } catch (e) {
                if (!navigator.onLine) settingsSnap = await getDoc(doc(db, 'settings', 'appSettings'));
              }`
);


fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
