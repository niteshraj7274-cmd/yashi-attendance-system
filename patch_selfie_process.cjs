const fs = require('fs');
let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf-8');

const newProcessStr = `  const processSelfieLocationAttendance = async (type: 'IN' | 'OUT', photoDataUrl: string) => {
    setLocationLoading(true);
    setAttendanceType(type);

    const fetchLocationWithTimeoutAndFallback = (onSuccess: any, onError: any, options: any) => {
      let isResolved = false;
      const timeoutId = setTimeout(() => {
        if (!isResolved) {
          isResolved = true;
          onError({ code: 3, message: 'Timeout' });
        }
      }, options.timeout);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (!isResolved) {
            isResolved = true;
            clearTimeout(timeoutId);
            onSuccess(position);
          }
        },
        (error) => {
          if (!isResolved) {
            isResolved = true;
            clearTimeout(timeoutId);
            if (liveLocation) {
              onSuccess({ coords: { latitude: liveLocation.lat, longitude: liveLocation.lng, accuracy: 10 } });
            } else {
              onError(error);
            }
          }
        },
        options
      );
    };

    fetchLocationWithTimeoutAndFallback(
      async (position: any) => {
        const { latitude, longitude, accuracy } = position.coords;
        let address = "Unknown Address";
        try {
          const res = await fetch(\`https://nominatim.openstreetmap.org/reverse?format=json&lat=\$\{latitude\}&lon=\$\{longitude\}\`);
          const data = await res.json();
          if (data.display_name) address = data.display_name;
        } catch (err) {}
        
        const googleMapsLink = \`https://www.google.com/maps?q=\$\{latitude\},\$\{longitude\}\`;
        
        let distance = 0;
        if (centerInfo && centerInfo.latitude && centerInfo.longitude) {
          distance = getDistanceFromLatLonInM(centerInfo.latitude, centerInfo.longitude, latitude, longitude);
        }
        
        const isOutside = distance > (Number(centerInfo?.geofenceRadius) || 300);
        if (isOutside && !isOfficialDuty) {
          alert(\`You are Outside Centre Geofence (\$\{Math.round(distance)\}m). Your attendance will be marked as 'Outside Geofence' and needs admin approval.\`);
        }

        let attendanceStatus = isOutside ? 'Outside Geofence' : 'Present';
        
        if (!isOutside && type === 'IN') {
          try {
            if (centerInfo && centerInfo.workStartTime) {
              const [hours, minutes] = centerInfo.workStartTime.split(':').map(Number);
              const expectedTime = new Date();
              expectedTime.setHours(hours, minutes, 0, 0);
              const gracePeriodMs = (Number(centerInfo.gracePeriodMinutes) || 15) * 60000;
              const allowedTime = new Date(expectedTime.getTime() + gracePeriodMs);
              if (new Date() > allowedTime) {
                attendanceStatus = 'Late';
              }
            }
          } catch(e) {}
        }
        
        const today = new Date();
        const dateStr = today.toLocaleDateString('en-CA');
        const timeStr = today.toLocaleTimeString('en-US', { hour12: false });

        if (type === 'IN') {
          const newRecord = {
            staffUid: staffData.uid || '',
            'Distance from Center': Math.round(distance),
            'Staff ID': staffData.staffId || '',
            'Staff Name': staffData.name || '',
            'Center Code': centerInfo?.code || '',
            'Center Name': centerInfo?.name || '',
            'Date': dateStr,
            date: dateStr,
            'IN Time': timeStr,
            'Latitude': latitude,
            'Longitude': longitude,
            'Accuracy': accuracy,
            'Current Address': address,
            'Google Maps Link': googleMapsLink,
            'Device Information': deviceId || '',
            'Attendance Status': attendanceStatus,
            'Attendance Type': 'Selfie + Location'
          };
          
          const localId = \`local_\$\{Date.now()\}\`;
          saveOfflineRecord({
            id: localId,
            type: 'IN',
            mode: 'Selfie + Location',
            data: newRecord,
            photoDataUrl: photoDataUrl,
            timestamp: Date.now(),
            status: 'Pending Sync',
            isOutside
          });
          
          setAttendanceRecord({ id: localId, ...newRecord });
          alert('Attendance Marked IN (Selfie + Location). Syncing in background.');
        } else {
          // OUT
          if (!attendanceRecord) return;
          const outRecord = {
            'OUT Time': timeStr,
            'OUT Latitude': latitude,
            'OUT Longitude': longitude,
            'Accuracy': accuracy,
            'OUT Current Address': address,
            'Google Maps Link': googleMapsLink,
            'Device Information': deviceId || '',
            'Distance from Center': Math.round(distance),
            'Attendance Status': attendanceStatus,
            'Attendance Type': 'Selfie + Location'
          };
          
          saveOfflineRecord({
            id: \`local_\$\{Date.now()\}\`,
            type: 'OUT',
            mode: 'Selfie + Location',
            data: { ...attendanceRecord, ...outRecord, deviceId },
            photoDataUrl: photoDataUrl,
            timestamp: Date.now(),
            status: 'Pending Sync',
            attendanceDocId: attendanceRecord.id,
            isOutside
          });
          
          setAttendanceRecord({ ...attendanceRecord, ...outRecord });
          alert('Attendance Marked OUT (Selfie + Location). Syncing in background.');
        }
        setLocationLoading(false);
        syncOfflineRecords(); // Trigger background sync immediately
      },
      (error: any) => {
        let msg = 'Failed to get location.';
        if (error.code === 1) msg = 'Location access denied. Please enable GPS and Permissions.';
        if (error.code === 2) msg = 'Location unavailable. Turn on GPS.';
        if (error.code === 3) msg = 'Location request timed out.';
        setLocationError(msg);
        alert(msg);
        setLocationLoading(false);
      },
      { enableHighAccuracy: true, timeout: 7000, maximumAge: 0 }
    );
  };
`;

content = content.replace(/  const processLocationOnlyAttendance = async \(type: 'IN' \| 'OUT'\) => \{/, newProcessStr + '\n  const processLocationOnlyAttendance = async (type: \'IN\' | \'OUT\') => {');

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
console.log("StaffDashboardScreen patched with processSelfie");
