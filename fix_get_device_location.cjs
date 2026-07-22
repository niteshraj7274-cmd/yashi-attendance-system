const fs = require('fs');

function injectHelper(filepath) {
  let code = fs.readFileSync(filepath, 'utf8');
  
  const helper = `

export const getDeviceLocation = (onSuccess: any, onError: any, options?: any) => {
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
};
`;

  // inject before `export default function` or `function getDistanceFromLatLonInM`
  if (!code.includes('export const getDeviceLocation =')) {
    if (code.includes('function getDistanceFromLatLonInM')) {
      code = code.replace('function getDistanceFromLatLonInM', helper + '\nfunction getDistanceFromLatLonInM');
    } else if (code.includes('export default function')) {
      code = code.replace('export default function', helper + '\nexport default function');
    }
  }

  fs.writeFileSync(filepath, code);
}

injectHelper('/app/applet/src/components/StaffDashboardScreen.tsx');
