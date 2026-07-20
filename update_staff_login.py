import re

with open('src/components/CentreStaffSelectionScreen.tsx', 'r') as f:
    content = f.read()

# Make sure getOrCreateDeviceId is imported
if 'getOrCreateDeviceId' not in content:
    content = content.replace("import { Staff } from '../types';", "import { Staff } from '../types';\nimport { getOrCreateDeviceId } from '../utils/deviceUtils';")

handle_pin_submit_old = """      const validPin = selectedStaff.pin || '1234';
      if (pin === validPin) {
        localStorage.setItem('userSession', JSON.stringify({
          uid: selectedStaff.id,
          role: 'staff',
          centerId: centerId,
          centerCode: centerCode || '',
          centerName: centerName || '',
          designation: selectedStaff.designation || selectedStaff.role || 'Staff',
          staffId: selectedStaff.staffId,
          name: selectedStaff.name
        }));
        navigate('/staff-dashboard');
      } else {
        setPinError('Invalid Staff PIN.');
      }"""

handle_pin_submit_new = """      const validPin = selectedStaff.pin || '1234';
      if (pin !== validPin) {
        setPinError('Invalid Staff PIN.');
        setPinLoading(false);
        return;
      }

      // Check device binding
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

      // Query staff_devices
      const qDevices = query(collection(db, 'staff_devices'), where('staffUid', '==', selectedStaff.id));
      const deviceDocs = await getDocs(qDevices);
      
      if (!deviceDocs.empty) {
        const existingBinding = deviceDocs.docs[0].data();
        if (existingBinding.deviceId !== currentDeviceId) {
          setPinError('This Staff ID is already registered on another device.');
          setPinLoading(false);
          return;
        }
      } else {
        // Bind the device
        await setDoc(doc(db, 'staff_devices', selectedStaff.id), {
          staffUid: selectedStaff.id,
          staffId: selectedStaff.staffId || '',
          staffName: selectedStaff.name || '',
          deviceId: currentDeviceId,
          deviceName: browserName,
          osVersion: osName,
          browserVersion: userAgent,
          bindDate: new Date().toLocaleDateString('en-CA'),
          bindTime: new Date().toLocaleTimeString('en-IN'),
          status: 'Active'
        });
      }

      // Record Login History
      await setDoc(doc(collection(db, 'login_history')), {
        staffName: selectedStaff.name || '',
        staffId: selectedStaff.staffId || '',
        centerName: centerName || '',
        centerCode: centerCode || '',
        deviceName: osName + ' - ' + browserName,
        loginDate: new Date().toLocaleDateString('en-CA'),
        loginTime: new Date().toLocaleTimeString('en-IN'),
        timestamp: serverTimestamp(),
        deviceId: currentDeviceId
      });

      localStorage.setItem('userSession', JSON.stringify({
        uid: selectedStaff.id,
        role: 'staff',
        centerId: centerId,
        centerCode: centerCode || '',
        centerName: centerName || '',
        designation: selectedStaff.designation || selectedStaff.role || 'Staff',
        staffId: selectedStaff.staffId,
        name: selectedStaff.name
      }));
      navigate('/staff-dashboard');"""

content = content.replace(handle_pin_submit_old, handle_pin_submit_new)

with open('src/components/CentreStaffSelectionScreen.tsx', 'w') as f:
    f.write(content)

