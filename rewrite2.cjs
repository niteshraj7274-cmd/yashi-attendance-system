const fs = require('fs');
const path = 'src/components/CentreLoginScreen.tsx';
let content = fs.readFileSync(path, 'utf8');

const replacement = `
      if (String(pin) === String(validPin)) {
        // Device Registration Logic
        if (!deviceData) {
           const settingsSnap = await getDoc(doc(db, 'settings', 'appSettings'));
           const autoReg = settingsSnap.exists() ? settingsSnap.data().autoDeviceRegistration ?? false : false;
           
           const newStatus = autoReg ? 'Active' : 'Pending';
           
           await setDoc(doc(db, 'registered_devices', deviceId), {
             deviceId,
             centerId: selectedCenter,
             centerName: centerData.name,
             name: \`Device \${deviceId}\`,
             status: newStatus,
             registeredAt: serverTimestamp()
           });
           
           if (newStatus === 'Pending') {
               setLoading(false);
               return;
           }
        } else if (deviceData.status !== 'Active') {
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
`;

content = content.replace(/      if \(String\(pin\) === String\(validPin\)\) \{[\s\S]*?      \} else \{\n        setError\('Invalid Centre PIN\.'\);\n      \}/, replacement.trim());

fs.writeFileSync(path, content);
