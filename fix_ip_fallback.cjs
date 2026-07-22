const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

// First, fix getDeviceLocation
code = code.replace(
  `export const getDeviceLocation = (onSuccess: any, onError: any, options?: any) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      onSuccess,
      (err) => {
        console.warn("HTML5 Geolocation failed, trying IP fallback...", err);
        fetch('https://ipapi.co/json/')
          .then(res => res.json())
          .then(data => {
            if (data.latitude && data.longitude) {
              onSuccess({ coords: { latitude: data.latitude, longitude: data.longitude, accuracy: 1000 } });
            } else {
              onError(err);
            }
          })
          .catch(() => onError(err));
      },
      options || { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  } else {
    onError({ code: 1, message: "Geolocation not supported" });
  }
};`,
  `export const getDeviceLocation = (onSuccess: any, onError: any, options?: any) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      onSuccess,
      (err) => {
        console.warn("HTML5 Geolocation failed, trying IP fallback...", err);
        fetch('https://ipapi.co/json/')
          .then(res => res.json())
          .then(data => {
            if (data.latitude && data.longitude) {
              onSuccess({ coords: { latitude: data.latitude, longitude: data.longitude, accuracy: 1000 } });
            } else {
              onError(err);
            }
          })
          .catch(() => onError(err));
      },
      options || { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
    );
  } else {
    onError({ code: 1, message: "Geolocation not supported" });
  }
};`
);

// We will keep getDeviceLocation fallback, but remove it from the error handler of getDeviceLocation in the callers!
fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
