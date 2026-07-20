import re

with open('src/components/CentreLoginScreen.tsx', 'r') as f:
    content = f.read()

old_logic_start = "} else if (deviceData.status !== 'Active') {"
old_logic_end = "        localStorage.setItem('centreSession', JSON.stringify({"

new_logic = """} else if (deviceData.status !== 'Active' && deviceData.status !== 'Approved') {
            setLoading(false);
            return;
        } else {
            const updates: any = { lastLogin: new Date().toISOString() };
            if (deviceData.centerId !== targetCenterId) {
                updates.centerId = targetCenterId;
                updates.centerName = centerData.name;
                updates.centerCode = centerData.code || '';
            }
            updateDoc(doc(db, 'registered_devices', deviceId), updates).catch(console.error);
        }
        
        localStorage.setItem('centreSession', JSON.stringify({"""

content = content.replace(content[content.find(old_logic_start):content.find(old_logic_end) + len("        localStorage.setItem('centreSession', JSON.stringify({")], new_logic)

with open('src/components/CentreLoginScreen.tsx', 'w') as f:
    f.write(content)

print("Patched CentreLoginScreen.tsx logic 2")
