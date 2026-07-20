import re

with open("src/components/StaffDashboardScreen.tsx", "r") as f:
    code = f.read()

# I will write a function that wraps getCurrentPosition with timeout and liveLocation fallback
wrapper = """
      const fetchLocationWithTimeoutAndFallback = (onSuccess, onError) => {
        if (liveLocation && Date.now() - (JSON.parse(sessionStorage.getItem('lastLocation') || '{}').timestamp || 0) < 300000) {
           console.log("Using cached liveLocation");
           onSuccess({ coords: { latitude: liveLocation.lat, longitude: liveLocation.lng, accuracy: 10 } });
           return;
        }

        const timeoutId = setTimeout(() => {
          if (liveLocation) {
            console.warn("Location fetching timed out. Using fallback liveLocation.");
            onSuccess({ coords: { latitude: liveLocation.lat, longitude: liveLocation.lng, accuracy: 10 } });
          } else {
            onError({ code: 3, message: "Timeout" });
          }
        }, 6000);

        navigator.geolocation.getCurrentPosition(
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
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 }
        );
      };

      fetchLocationWithTimeoutAndFallback(
"""

code = code.replace("navigator.geolocation.getCurrentPosition(", wrapper)

# Now fix the ending parenthesis for `{ enableHighAccuracy: true }`
code = code.replace("{ enableHighAccuracy: true }", "")
code = code.replace("},\n        \n      );", "}\n      );")
code = code.replace(",\n        \n      );", "\n      );")

with open("src/components/StaffDashboardScreen.tsx", "w") as f:
    f.write(code)

