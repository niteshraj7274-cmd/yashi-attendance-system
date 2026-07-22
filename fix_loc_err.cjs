const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

code = code.replace(
  `        getDeviceLocation(
          (position) => {
            clearTimeout(timeoutId);
            onSuccess(position);
          },
          (error) => {
            clearTimeout(timeoutId);
            if (liveLocation) {
              console.warn("Location error, using fallback liveLocation.");
              onSuccess({ coords: { latitude: liveLocation.lat, longitude: liveLocation.lng, accuracy: 10 } });
            } else {
              console.warn("Location error, trying IP fallback...", error);
              fetch('https://ipapi.co/json/')
                .then(res => res.json())
                .then(data => {
                  if (data.latitude && data.longitude) {
                    onSuccess({ coords: { latitude: data.latitude, longitude: data.longitude, accuracy: 1000 } });
                  } else {
                    onError(error);
                  }
                })
                .catch(() => onError(error));
            }
          },
          options || { enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 }
        );`,
  `        getDeviceLocation(
          (position) => {
            clearTimeout(timeoutId);
            onSuccess(position);
          },
          (error) => {
            clearTimeout(timeoutId);
            if (liveLocation) {
              console.warn("Location error, using fallback liveLocation.");
              onSuccess({ coords: { latitude: liveLocation.lat, longitude: liveLocation.lng, accuracy: 10 } });
            } else {
              onError(error);
            }
          },
          options || { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
        );`
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
