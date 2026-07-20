const fs = require('fs');
let content = fs.readFileSync('src/components/AdminCenterManagementScreen.tsx', 'utf8');

const replacement = `  const handleAutoLocation = () => {
    if (navigator.geolocation) {
      alert("Fetching location... Please wait.");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          }));
          alert("Location detected successfully!");
        },
        (error) => {
          console.error("Geolocation Error:", error);
          let errorMsg = "Failed to get location. ";
          if (error.code === error.PERMISSION_DENIED) errorMsg += "Permission denied.";
          else if (error.code === error.POSITION_UNAVAILABLE) errorMsg += "Position unavailable.";
          else if (error.code === error.TIMEOUT) errorMsg += "Request timed out.";
          alert(errorMsg);
          setError(errorMsg);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
      setError('Geolocation is not supported by this browser.');
    }
  };`;

content = content.replace(/  const handleAutoLocation = \(\) => \{[\s\S]*?  \};\n/, replacement + '\n');
fs.writeFileSync('src/components/AdminCenterManagementScreen.tsx', content);
