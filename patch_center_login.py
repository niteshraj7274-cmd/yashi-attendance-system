import re

with open('src/components/CentreLoginScreen.tsx', 'r') as f:
    content = f.read()

old_logic_start = "          const newStatus = autoReg ? 'Active' : 'Pending';"
old_logic_end = "          if (newStatus === 'Pending') {"

new_logic = """          const newStatus = autoReg ? 'Active' : 'Pending';
          
          await setDoc(doc(db, 'registered_devices', deviceId), {
            deviceId,
            centerId: targetCenterId,
            centerName: centerData.name,
            centerCode: centerData.code || '',
            role: 'Center',
            name: `Device ${deviceId}`,
            deviceName: navigator.userAgent.includes('Mobile') ? 'Mobile Device' : 'Desktop Device',
            status: newStatus,
            registeredAt: serverTimestamp(),
            lastLogin: new Date().toISOString()
          });
          
          if (newStatus === 'Pending') {"""

content = content.replace(content[content.find(old_logic_start):content.find(old_logic_end)], new_logic)

with open('src/components/CentreLoginScreen.tsx', 'w') as f:
    f.write(content)

print("Patched CentreLoginScreen.tsx")
