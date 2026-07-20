import re

with open('src/components/CentreStaffSelectionScreen.tsx', 'r') as f:
    content = f.read()

old_logic_start = """        if (deviceData.status === 'Blocked') {
          setPinError('Your device has been blocked. Please contact the Administrator.');
          setPinLoading(false);
          return;
        }
        // Update last login
        await updateDoc(deviceRef, {"""
old_logic_end = """        });
      } else {"""

new_logic = """        if (deviceData.status === 'Blocked') {
          setPinError('Your device has been blocked. Please contact the Administrator.');
          setPinLoading(false);
          return;
        }
        
        const updates: any = {
          lastLogin: new Date().toISOString()
        };
        
        if (!deviceData.staffUid) {
           updates.staffUid = selectedStaff.id;
           updates.staffId = selectedStaff.staffId || '';
           updates.staffName = selectedStaff.name || '';
           updates.role = 'Staff';
        }
        
        // Update last login and possibly bind staff
        await updateDoc(deviceRef, updates);
      } else {"""

content = content.replace(content[content.find(old_logic_start):content.find(old_logic_end) + len("        });\n      } else {")], new_logic)

with open('src/components/CentreStaffSelectionScreen.tsx', 'w') as f:
    f.write(content)

print("Patched CentreStaffSelectionScreen.tsx logic 2")
