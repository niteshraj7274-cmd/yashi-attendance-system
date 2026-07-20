import fs from 'fs';
let content = fs.readFileSync('src/components/CentreStaffSelectionScreen.tsx', 'utf8');

const fetchSettingsRegex = /unSubSettings = onSnapshot\(settingsRef, \(docSnap\) => \{[\s\S]*?\}\);/;
content = content.replace(fetchSettingsRegex, `unSubSettings = onSnapshot(settingsRef, (docSnap) => {
          if (docSnap.exists()) {
            setSalaryEnabled(docSnap.data().salaryModuleEnabled !== false);
            setAppSettings(prev => ({ ...prev, ...docSnap.data() }));
          }
        });`);

const stateRegex = /const \[salaryEnabled, setSalaryEnabled\] = useState\(false\);/;
content = content.replace(stateRegex, `const [salaryEnabled, setSalaryEnabled] = useState(false);
  const [appSettings, setAppSettings] = useState<any>({
    odModuleEnabled: true,
    leaveModuleEnabled: true,
    supportModuleEnabled: true
  });`);

const odButtonRegex = /<button[\s\S]*?onClick=\{\(\) => navigate\('\/admin\/official-duty', \{ state: \{ centerCode: centerCode \} \}\)\}[\s\S]*?Official Duty Requests[\s\S]*?<\/button>/;
content = content.replace(odButtonRegex, `{appSettings.odModuleEnabled !== false && (<button 
          onClick={() => navigate('/admin/official-duty', { state: { centerCode: centerCode } })}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg shadow-sm transition-all text-sm uppercase tracking-wider mb-6 flex justify-center items-center gap-2"
        >
          <MapPin size={18} /> Official Duty Requests
        </button>)}`);

const leaveButtonRegex = /<button[\s\S]*?onClick=\{\(\) => navigate\(\`\/centre\/\$\{centerId\}\/leave\`\)\}[\s\S]*?Leave Requests[\s\S]*?<\/button>/;
content = content.replace(leaveButtonRegex, `{appSettings.leaveModuleEnabled !== false && (<button 
          onClick={() => navigate(\`/centre/\${centerId}/leave\`)}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-sm transition-all text-sm uppercase tracking-wider mb-6 flex justify-center items-center gap-2"
        >
          <Calendar size={18} /> Leave Requests
        </button>)}`);

const supportButtonRegex = /<button onClick=\{\(\) => navigate\('\/support'\)\} className="p-2 bg-blue-800 rounded-lg hover:bg-blue-700 transition-colors border border-blue-600">[\s\S]*?<Headset size=\{20\} \/>[\s\S]*?<\/button>/;
content = content.replace(supportButtonRegex, `{appSettings.supportModuleEnabled !== false && (<button onClick={() => navigate('/support')} className="p-2 bg-blue-800 rounded-lg hover:bg-blue-700 transition-colors border border-blue-600">
          <Headset size={20} />
        </button>)}`);
        
fs.writeFileSync('src/components/CentreStaffSelectionScreen.tsx', content);
