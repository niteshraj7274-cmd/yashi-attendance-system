import fs from 'fs';

let content = fs.readFileSync('src/components/CentreStaffSelectionScreen.tsx', 'utf8');

// Add salaryEnabled state
content = content.replace("const [loading, setLoading] = useState(true);", "const [loading, setLoading] = useState(true);\n  const [salaryEnabled, setSalaryEnabled] = useState(false);");

// Add listener for appSettings
const settingsListener = `
        const settingsRef = doc(db, 'settings', 'appSettings');
        const unSubSettings = onSnapshot(settingsRef, (docSnap) => {
          if (docSnap.exists()) {
            setSalaryEnabled(docSnap.data().salaryModuleEnabled === true);
          }
        });
`;
content = content.replace("const q = query(", settingsListener + "\n        const q = query(");

// Add cleanup for settings listener
content = content.replace("if (unSubStaff) unSubStaff();", "if (unSubStaff) unSubStaff();\n      if (typeof unSubSettings !== 'undefined') unSubSettings();");

// Add button UI
const salaryBtn = `
        {salaryEnabled && (
          <button 
            onClick={() => navigate(\`/centre/\${centerId}/salary\`)}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg shadow-sm transition-all text-sm uppercase tracking-wider mb-6 flex justify-center items-center gap-2"
          >
            <Users size={18} /> Salary Module
          </button>
        )}
`;

content = content.replace('          <Calendar size={18} /> Leave Requests\n        </button>', '          <Calendar size={18} /> Leave Requests\n        </button>\n' + salaryBtn);

fs.writeFileSync('src/components/CentreStaffSelectionScreen.tsx', content);
