import re

with open('src/components/CentreStaffSelectionScreen.tsx', 'r') as f:
    content = f.read()

# Replace device binding logic
old_logic_start = "      // Check device binding"
old_logic_end = "      // Store session"

new_logic = """
      // Check device binding in registered_devices
      const currentDeviceId = getOrCreateDeviceId();
      const userAgent = navigator.userAgent;
      let browserName = "Unknown Browser";
      if (userAgent.indexOf("Chrome") > -1) browserName = "Chrome";
      else if (userAgent.indexOf("Safari") > -1) browserName = "Safari";
      else if (userAgent.indexOf("Firefox") > -1) browserName = "Firefox";
      
      let osName = "Unknown OS";
      if (userAgent.indexOf("Win") > -1) osName = "Windows";
      else if (userAgent.indexOf("Mac") > -1) osName = "MacOS";
      else if (userAgent.indexOf("Android") > -1) osName = "Android";
      else if (userAgent.indexOf("Linux") > -1) osName = "Linux";
      else if (userAgent.indexOf("iPhone") > -1) osName = "iOS";
      else if (userAgent.indexOf("iPad") > -1) osName = "iPadOS";

      const deviceRef = doc(db, 'registered_devices', currentDeviceId);
      const deviceSnap = await getDoc(deviceRef);

      if (deviceSnap.exists()) {
        const deviceData = deviceSnap.data();
        if (deviceData.staffUid && deviceData.staffUid !== selectedStaff.id) {
          setPinError('This device is already registered to another staff member.');
          setPinLoading(false);
          return;
        }
        if (deviceData.status === 'Pending') {
          setPinError('Device registration is pending admin approval.');
          setPinLoading(false);
          return;
        }
        if (deviceData.status === 'Blocked') {
          setPinError('Your device has been blocked. Please contact the Administrator.');
          setPinLoading(false);
          return;
        }
        // Update last login
        await updateDoc(deviceRef, {
          lastLogin: new Date().toISOString()
        });
      } else {
        // Create new device registration
        const settingsSnap = await getDoc(doc(db, 'settings', 'appSettings'));
        const autoReg = settingsSnap.exists() ? settingsSnap.data().autoDeviceRegistration ?? false : false;
        const newStatus = autoReg ? 'Approved' : 'Pending';
        
        await setDoc(deviceRef, {
          deviceId: currentDeviceId,
          centerId: centerId,
          centerName: center?.name || '',
          centerCode: center?.code || '',
          staffUid: selectedStaff.id,
          staffId: selectedStaff.staffId || '',
          staffName: selectedStaff.name || '',
          role: 'Staff',
          deviceName: `${osName} - ${browserName}`,
          status: newStatus,
          registeredAt: new Date(),
          lastLogin: new Date().toISOString()
        });

        if (newStatus === 'Pending') {
          setPinError('Device registration submitted. Waiting for Admin approval.');
          setPinLoading(false);
          return;
        }
      }

"""

# Use string replace
content = content.replace(content[content.find(old_logic_start):content.find(old_logic_end)], new_logic)

with open('src/components/CentreStaffSelectionScreen.tsx', 'w') as f:
    f.write(content)

print("Patched successfully")
