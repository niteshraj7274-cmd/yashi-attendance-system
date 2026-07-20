const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

// Modify startAttendanceProcess
const oldStartProcess = `  const startAttendanceProcess = async (type: 'IN' | 'OUT', mode: 'location_only' | 'selfie_location') => {
    if (type === 'IN' && hasMarkedIn) return;
    if (type === 'OUT' && hasMarkedOut) return;
    if (!centerInfo) {
      alert("Center information not loaded yet.");
      return;
    }
    
    setAttendanceType(type);
    setLocationLoading(true);
    
    if (!navigator.geolocation) {
      alert("Location permission is required.");
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPendingLocation(position.coords);
        setLocationLoading(false);
        if (mode === 'selfie_location') {
          setSelfieMode(type);
          setIsCapturingSelfie(true);
        } else {
          processLocationOnlyAttendance(type);
        }
      },
      (error) => {
        alert("Location permission is required.");
        setLocationLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };`;

const newStartProcess = `  const startAttendanceProcess = async (type: 'IN' | 'OUT', mode: 'location_only' | 'selfie_location') => {
    if (type === 'IN' && hasMarkedIn) return;
    if (type === 'OUT' && hasMarkedOut) return;
    if (!centerInfo) {
      alert("Center information not loaded yet.");
      return;
    }
    
    setAttendanceType(type);
    
    if (mode === 'selfie_location') {
      setSelfieMode(type);
      setIsCapturingSelfie(true);
    } else {
      setLocationLoading(true);
      if (!navigator.geolocation) {
        alert("Location permission is required.");
        setLocationLoading(false);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPendingLocation(position.coords);
          setLocationLoading(false);
          processLocationOnlyAttendance(type);
        },
        (error) => {
          alert("Location permission is required.");
          setLocationLoading(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    }
  };`;

code = code.replace(oldStartProcess, newStartProcess);
fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
