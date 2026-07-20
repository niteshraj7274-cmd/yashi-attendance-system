const fs = require('fs');

let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

// 1. Add Default Duty Types and state
if (!code.includes('const [dutyTypesList, setDutyTypesList]')) {
  code = code.replace(
    /const \[odDutyType, setOdDutyType\] = useState\(''\);/,
    `const [odDutyType, setOdDutyType] = useState('');
  const [dutyTypesList, setDutyTypesList] = useState<string[]>([
    'Field Visit',
    'Training',
    'Meeting',
    'Inspection',
    'Mobilization',
    'Government Work',
    'Office Work',
    'Exam Duty',
    'Official Tour',
    'Other'
  ]);`
  );
}

// 2. Add Custom Select Component
if (!code.includes('function CustomDropdown')) {
  const customDropdown = `
function CustomDropdown({ value, onChange, options, placeholder }: any) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="relative">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none flex justify-between items-center cursor-pointer"
      >
        <span className={value ? "text-slate-900" : "text-slate-400"}>
          {value ? options.find((o: any) => o.value === value)?.label || value : placeholder}
        </span>
        <div className="text-slate-400 font-bold ml-2">{isOpen ? '▲' : '▼'}</div>
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-2xl max-h-56 overflow-y-auto">
          {options.map((opt: any) => (
            <div 
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className="p-3 text-sm hover:bg-indigo-50 active:bg-indigo-100 cursor-pointer border-b border-slate-50 last:border-0 font-medium text-slate-800"
            >
              {opt.label}
            </div>
          ))}
          {options.length === 0 && <div className="p-3 text-sm text-slate-500">No options available</div>}
        </div>
      )}
    </div>
  );
}
`;
  code = code.replace(/export default function StaffDashboardScreen\(\) \{/, customDropdown + '\nexport default function StaffDashboardScreen() {');
}

// 3. Update useEffect to fetch duty types
code = code.replace(
  /\/\/ Fetch staff assignments and details/,
  `// Fetch Duty Types
    const fetchDutyTypes = async () => {
      try {
        const { collection, getDocs } = await import('firebase/firestore');
        const dtSnap = await getDocs(collection(db, 'official_duty_types'));
        if (!dtSnap.empty) {
          const types: string[] = [];
          dtSnap.forEach(doc => {
            if (doc.data().name) types.push(doc.data().name);
          });
          if (types.length > 0) {
            if (!types.includes('Other')) types.push('Other');
            setDutyTypesList(types);
          }
        }
      } catch (e) {
        console.error("Error fetching duty types", e);
      }
    };
    fetchDutyTypes();
    
    // Fetch staff assignments and details`
);

// 5. Replace Duty Type select with CustomDropdown
code = code.replace(
  /<input\s+type="text"\s+list="duty-list"\s+value=\{odDutyType\}[\s\S]*?<\/datalist>/,
  `<CustomDropdown 
    value={odDutyType}
    onChange={setOdDutyType}
    placeholder="-- Select Duty Type --"
    options={dutyTypesList.map(t => ({ value: t, label: t }))}
  />`
);

// 6. We also deleted 'Other' duty type input before, let's restore it
if (!code.includes('Custom Duty Type')) {
  code = code.replace(
    /placeholder="Brief reason for official duty"/,
    `placeholder="Brief reason for official duty"` // this is tricky to match
  );
  
  // Just find odReason textarea and insert before it
  code = code.replace(
    /<div className="mt-4">[\s]*<label className="text-\[10px\] font-bold text-slate-500 uppercase tracking-wider ml-1">Reason \/ Purpose \*/,
    `{odDutyType === 'Other' && (
      <div className="mt-4">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Custom Duty Type *</label>
        <input 
          type="text"
          value={otherOdDutyType}
          onChange={e => setOtherOdDutyType(e.target.value)}
          placeholder="Specify duty type..."
          className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>
    )}
    
    <div className="mt-4">
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Reason / Purpose *`
  );
  
  // Update submit validation
  code = code.replace(
    /if \(!odDutyType \|\| !odReason\) \{/,
    `if (!odDutyType || !odReason || (odDutyType === 'Other' && !otherOdDutyType)) {`
  );
  
  // update submit field
  code = code.replace(
    /'Duty Type': odDutyType \|\| '',/,
    `'Duty Type': (odDutyType === 'Other' ? otherOdDutyType : odDutyType) || '',`
  );
}

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);

