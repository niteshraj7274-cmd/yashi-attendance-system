const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

code = code.replace(
  `        let cDoc;
        try {
          cDoc = !navigator.onLine ? await getDocFromCache(doc(db, 'centers', session.centerId)) : await getDoc(doc(db, 'centers', session.centerId));
        } catch(e) {
          if (!navigator.onLine) {
            cDoc = await getDoc(doc(db, 'centers', session.centerId));
          }
        }
        if (cDoc.exists()) {
           setCenterInfo(cDoc.data());
        }`,
  `        let cDoc: any;
        if (!navigator.onLine) {
           try { cDoc = await getDocFromCache(doc(db, 'centers', session.centerId)); } catch(e) {}
           if (!cDoc) {
              try { cDoc = await getDoc(doc(db, 'centers', session.centerId)); } catch(e) {}
           }
        } else {
           try { cDoc = await getDoc(doc(db, 'centers', session.centerId)); } catch(e) {}
           if (!cDoc) {
              try { cDoc = await getDocFromCache(doc(db, 'centers', session.centerId)); } catch(e) {}
           }
        }
        if (cDoc && cDoc.exists && cDoc.exists()) {
           setCenterInfo(cDoc.data());
        }`
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
