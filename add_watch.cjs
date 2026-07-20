const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

const useEffectRegex = /  useEffect\(\(\) => \{\n    const sessionStr = localStorage\.getItem\('userSession'\);/;

const newUseEffect = `  useEffect(() => {
    let watchId: number;
    
    if (centerInfo && centerInfo.latitude && centerInfo.longitude && navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const distance = getDistanceFromLatLonInM(centerInfo.latitude, centerInfo.longitude, lat, lng);
          
          setLiveLocation(prev => ({
            ...prev,
            lat,
            lng,
            distance,
            address: prev?.address || 'Fetching address...'
          }));
          
          try {
            const res = await fetch(\`https://nominatim.openstreetmap.org/reverse?format=json&lat=\${lat}&lon=\${lng}\`);
            const data = await res.json();
            if (data.display_name) {
              setLiveLocation(prev => prev ? { ...prev, address: data.display_name } : null);
            }
          } catch (err) {}
        },
        (error) => {
          console.error("Live location error:", error);
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 }
      );
    }
    
    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [centerInfo]);

  useEffect(() => {
    const sessionStr = localStorage.getItem('userSession');`;

code = code.replace(useEffectRegex, newUseEffect);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
