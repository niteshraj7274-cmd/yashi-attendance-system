const fs = require('fs');
const path = 'src/components/CentreLoginScreen.tsx';
let content = fs.readFileSync(path, 'utf8');

const search = `    try {
      const centerDoc = await getDoc(doc(db, 'centers', selectedCenter));
      if (!centerDoc.exists()) {
        setError('Centre not found.');
        return;
      }
      const centerData = centerDoc.data();
      const validPin = centerData.pin || '1234';

      if (String(pin) === String(validPin)) {
        localStorage.setItem('centreSession', JSON.stringify({
          centerId: selectedCenter,
          centerName: centerData.name
        }));
        navigate(\`/centre/\${selectedCenter}/staff\`);
      } else {
        setError('Invalid Centre PIN.');
      }
    } catch (err: any) {`;

const replace = `    try {
      const centerDoc = await getDoc(doc(db, 'centers', selectedCenter));
      if (!centerDoc.exists()) {
        setError('Centre not found.');
        return;
      }
      const centerData = centerDoc.data();
      const validPin = centerData.pin || '1234';

      if (String(pin) === String(validPin)) {
        // Device Registration Logic
        if (!deviceData) {
           const settingsSnap = await getDoc(doc(db, 'settings', 'appSettings'));
           const autoReg = settingsSnap.exists() ? settingsSnap.data().autoDeviceRegistration ?? false : false;
           
           const newStatus = autoReg ? 'Active' : 'Pending';
           
           // I need to use setDoc and serverTimestamp. Let's make sure they are imported. Wait, I will just require them here. But I can't require inside React component directly if it's not imported at the top. Let's assume setDoc and serverTimestamp are imported. Let's check imports first.
           await setDoc(doc(db, 'registered_devices', deviceId), {
             deviceId,
             centerId: selectedCenter,
             centerName: centerData.name,
             name: \`Device \${deviceId}\`,
             status: newStatus,
             registeredAt: serverTimestamp()
           });
           
           if (newStatus === 'Pending') {
               // We don't navigate, we just let the useDeviceRegistration hook update the deviceData which will trigger the 'Pending' screen
               setLoading(false);
               return;
           }
        } else if (deviceData.status !== 'Active') {
            // Already pending or inactive
            setLoading(false);
            return;
        }

        localStorage.setItem('centreSession', JSON.stringify({
          centerId: selectedCenter,
          centerName: centerData.name
        }));
        navigate(\`/centre/\${selectedCenter}/staff\`);
      } else {
        setError('Invalid Centre PIN.');
      }
    } catch (err: any) {`;

content = content.replace(search, replace);
fs.writeFileSync(path, content);
