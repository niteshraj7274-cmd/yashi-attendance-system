const fs = require('fs');
let content = fs.readFileSync('src/components/AdminCenterManagementScreen.tsx', 'utf8');

// Add loading state
content = content.replace(
  'const [loading, setLoading] = useState(false);',
  'const [loading, setLoading] = useState(false);\n  const [locationLoading, setLocationLoading] = useState(false);'
);

const replacement = `  const handleAutoLocation = () => {
    if (navigator.geolocation) {
      setLocationLoading(true);
      setError(null);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          }));
          setLocationLoading(false);
          alert("Location detected successfully!");
        },
        (error) => {
          console.error("Geolocation Error:", error);
          let errorMsg = "Failed to get location. ";
          if (error.code === error.PERMISSION_DENIED) errorMsg += "Permission denied by browser.";
          else if (error.code === error.POSITION_UNAVAILABLE) errorMsg += "Position unavailable.";
          else if (error.code === error.TIMEOUT) errorMsg += "Request timed out.";
          setError(errorMsg);
          setLocationLoading(false);
          alert(errorMsg);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };`;

content = content.replace(/  const handleAutoLocation = \(\) => \{[\s\S]*?  \};\n/, replacement + '\n');

// Update button
content = content.replace(
  '<button type="button" onClick={handleAutoLocation} className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-full font-bold uppercase hover:bg-blue-700">Auto Detect</button>',
  '<button type="button" onClick={handleAutoLocation} disabled={locationLoading} className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-full font-bold uppercase hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1">{locationLoading ? <><RefreshCw className="animate-spin" size={12} /> Detecting...</> : "Auto Detect"}</button>'
);

// We need to import RefreshCw if it's not imported
if (!content.includes('RefreshCw')) {
  content = content.replace(
    'import { ArrowLeft, Plus, Edit2, Trash2, MapPin, Search } from \'lucide-react\';',
    'import { ArrowLeft, Plus, Edit2, Trash2, MapPin, Search, RefreshCw } from \'lucide-react\';'
  );
}

fs.writeFileSync('src/components/AdminCenterManagementScreen.tsx', content);
