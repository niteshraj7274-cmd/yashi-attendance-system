const fs = require('fs');
let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf-8');

if (!content.includes('import LiveCamera')) {
  const importStr = `import LiveCamera from './LiveCamera';\n`;
  content = content.replace(/import \{ motion, AnimatePresence \} from 'motion\/react';/, importStr + "import { motion, AnimatePresence } from 'motion/react';");
}

if (!content.includes('const [isCapturingSelfie')) {
  const hookStr = `  const [isCapturingSelfie, setIsCapturingSelfie] = useState(false);\n  const [selfieMode, setSelfieMode] = useState<'IN'|'OUT'>('IN');\n`;
  content = content.replace(/  const \[locationError, setLocationError\] = useState<string \| null>\(null\);/, '  const [locationError, setLocationError] = useState<string | null>(null);\n' + hookStr);
}

// Modify startAttendanceProcess
const processStr = `  const startAttendanceProcess = async (type: 'IN' | 'OUT', mode: 'location_only' | 'selfie_location') => {
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
      processLocationOnlyAttendance(type);
    }
  };`;

content = content.replace(/  const startAttendanceProcess = async \(type: 'IN' \| 'OUT'\) => \{[\s\S]*?processLocationOnlyAttendance\(type\);\n  \};/, processStr);

// Modify JSX for Buttons
content = content.replace(/onClick=\{\(\) => startAttendanceProcess\('IN'\)\}/g, "onClick={() => startAttendanceProcess('IN', 'selfie_location')}");
content = content.replace(/onClick=\{\(\) => startAttendanceProcess\('OUT'\)\}/g, "onClick={() => startAttendanceProcess('OUT', 'selfie_location')}");
// Wait, the "Location Only" buttons should be mode 'location_only'
// We can use a regex to distinguish the text 'Location Only'
content = content.replace(/<button [\s\S]*?onClick=\{\(\) => startAttendanceProcess\('IN', 'selfie_location'\)\}[\s\S]*?<MapPin/g, function(match) {
  return match.replace(/'IN', 'selfie_location'/, "'IN', 'location_only'");
});
content = content.replace(/<button [\s\S]*?onClick=\{\(\) => startAttendanceProcess\('OUT', 'selfie_location'\)\}[\s\S]*?<MapPin/g, function(match) {
  return match.replace(/'OUT', 'selfie_location'/, "'OUT', 'location_only'");
});

// Render LiveCamera
const renderStr = `
  if (isCapturingSelfie) {
    return (
      <LiveCamera 
        onCancel={() => setIsCapturingSelfie(false)} 
        onCapture={(dataUrl) => {
          setIsCapturingSelfie(false);
          processSelfieLocationAttendance(selfieMode, dataUrl);
        }} 
      />
    );
  }
`;
content = content.replace(/  return \(/, renderStr + '  return (');

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
console.log("StaffDashboardScreen patched with LiveCamera");
