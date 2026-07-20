const fs = require('fs');

let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

// 1. Add watchPosition useEffect
const useEffectRegex = /  useEffect\(\(\) => \{\s*const sessionStr = localStorage\.getItem\('userSession'\);/;

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

// 2. Add state if missing (it might be there)
if (!code.includes('const [liveLocation')) {
  code = code.replace("const [attendanceType", "const [liveLocation, setLiveLocation] = useState<{lat: number, lng: number, distance: number | null, address: string} | null>(null);\n  const [attendanceType");
}

// 3. Update Map UI
const oldLiveMapRegex = /<h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Live Map & Distance<\/h3>[\s\S]*?(?=<\/div>\s*<\/div>\s*\{\/\* Official Duty Modal \*\/\})/g;

const newLiveMap = `<h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Live Map & Distance</h3>
             {liveLocation?.distance !== null && liveLocation?.distance !== undefined && (
               <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-bold uppercase">{Math.round(liveLocation.distance)} meters away</span>
             )}
          </div>
          
          <div className="w-full h-40 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 relative">
             {liveLocation && centerInfo?.latitude ? (
               <iframe
                 width="100%"
                 height="100%"
                 style={{ border: 0 }}
                 loading="lazy"
                 src={\`https://maps.google.com/maps?saddr=\${centerInfo.latitude},\${centerInfo.longitude}&daddr=\${liveLocation.lat},\${liveLocation.lng}&output=embed\`}
               ></iframe>
             ) : (
               <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                 <div className="w-6 h-6 border-2 border-slate-400 border-t-transparent rounded-full animate-spin mb-1"></div>
                 <span className="text-xs font-medium">Fetching Live Location...</span>
               </div>
             )}
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
            <div className={\`p-2 rounded-lg border shrink-0 \${liveLocation?.address ? 'bg-green-50 text-green-600 border-green-100' : 'bg-blue-50 text-blue-600 border-blue-100'}\`}>
              <MapPin size={16} />
            </div>
            <span className="flex-1 line-clamp-3">
              {liveLocation?.address 
                  ? \`Location: \${liveLocation.address}\` 
                  : 'Location detection is required for live attendance. Please ensure GPS is enabled.'}
            </span>
          </div>
        </div>
      </div>
      `;

code = code.replace(oldLiveMapRegex, newLiveMap);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
