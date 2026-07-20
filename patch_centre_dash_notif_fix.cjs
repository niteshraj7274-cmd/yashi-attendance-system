const fs = require('fs');
let code = fs.readFileSync('src/components/CentreStaffSelectionScreen.tsx', 'utf8');

// Replace the notifQ definition to limit to 30 days if possible, but Firestore requires index for complex queries. 
// We can just filter it in memory to last 30 days.
code = code.replace(
  'const notifQ = query(\n          collection(db, \'center_notifications\'),\n          where(\'centerId\', \'==\', centerId)\n        );',
  `const notifQ = query(
          collection(db, 'center_notifications'),
          where('centerId', '==', centerId)
        );`
);

code = code.replace(
  'snap.forEach(d => list.push({ id: d.id, ...d.data() }));',
  `const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
          snap.forEach(d => {
            const data = d.data();
            if (data.timestamp && data.timestamp.toMillis() > thirtyDaysAgo) {
              list.push({ id: d.id, ...data });
            } else if (!data.timestamp) {
              list.push({ id: d.id, ...data });
            }
          });`
);

code = code.replace(
  '{notif.designation && <div className="col-span-2"><span className="text-[9px] uppercase text-slate-400 block">Designation</span>{notif.designation}</div>}',
  `{notif.designation && <div><span className="text-[9px] uppercase text-slate-400 block">Designation</span>{notif.designation}</div>}
                          {notif.type && <div className="col-span-2"><span className="text-[9px] uppercase text-slate-400 block">Notification Type</span>{notif.type}</div>}`
);

fs.writeFileSync('src/components/CentreStaffSelectionScreen.tsx', code);
