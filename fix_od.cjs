const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

code = code.replace(
  `      let snapshot;
      try {
        snapshot = !navigator.onLine ? await getDocsFromCache(q) : await getDocs(q);
      } catch (e) {
        if (!navigator.onLine) {
           snapshot = await getDocs(q);
        } else {
           throw e;
        }
      }
      const requests: any[] = [];
      snapshot.forEach(doc => {`,
  `      let snapshot: any;
      if (!navigator.onLine) {
         try { snapshot = await getDocsFromCache(q); } catch(e) {}
         if (!snapshot) try { snapshot = await getDocs(q); } catch(e) {}
      } else {
         try { snapshot = await getDocs(q); } catch(e) {}
         if (!snapshot) try { snapshot = await getDocsFromCache(q); } catch(e) {}
      }
      
      const requests: any[] = [];
      if (snapshot) {
        snapshot.forEach((doc: any) => {`
);

// We need to close the bracket for if(snapshot)
code = code.replace(
  `      requests.sort((a, b) => {`,
  `      });
      }
      requests.sort((a, b) => {`
);

// Wait, the original code had:
/*
      snapshot.forEach(doc => {
        requests.push({ id: doc.id, ...doc.data() });
      });
*/
fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
