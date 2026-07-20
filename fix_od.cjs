const fs = require('fs');

let code = fs.readFileSync('src/components/CentreOfficialDutyScreen.tsx', 'utf8');

// 1. Add Default Duty Types and state
if (!code.includes('const [dutyTypesList, setDutyTypesList]')) {
  code = code.replace(
    /const \[dutyType, setDutyType\] = useState\('Field Visit'\);/,
    `const [dutyType, setDutyType] = useState('Field Visit');
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
        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none flex justify-between items-center cursor-pointer"
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
              className="p-3 text-sm hover:bg-blue-50 active:bg-blue-100 cursor-pointer border-b border-slate-50 last:border-0 font-medium"
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
  code = code.replace(/export default function CentreOfficialDutyScreen\(\) \{/, customDropdown + '\nexport default function CentreOfficialDutyScreen() {');
}

// 3. Update useEffect to fetch duty types
code = code.replace(
  /\/\/ Get Staff List for this center/,
  `// Fetch Duty Types
      try {
        const dtSnap = await getDocs(collection(db, 'official_duty_types'));
        if (!dtSnap.empty) {
          const types: string[] = [];
          dtSnap.forEach(doc => {
            if (doc.data().name) types.push(doc.data().name);
          });
          if (types.length > 0) {
            if (!types.includes('Other')) types.push('Other');
            setDutyTypesList(types);
            if (!types.includes('Field Visit')) setDutyType(types[0]);
          }
        }
      } catch (e) {
        console.error("Error fetching duty types", e);
      }
      
      // Get Staff List for this center`
);

// 4. Replace Select Staff input with CustomDropdown
code = code.replace(
  /<input\s+type="text"\s+list="staff-list"\s+value=\{selectedStaffId\}[\s\S]*?<\/datalist>/,
  `<CustomDropdown 
    value={selectedStaffId}
    onChange={setSelectedStaffId}
    placeholder="-- Select Staff --"
    options={staffList.map(s => ({ value: s.name + ' (' + s.staffId + ')', label: s.name + ' (' + s.staffId + ')' }))}
  />`
);

// 5. Replace Duty Type select with CustomDropdown
code = code.replace(
  /<input\s+type="text"\s+list="duty-list"\s+value=\{dutyType\}[\s\S]*?<\/datalist>/,
  `<CustomDropdown 
    value={dutyType}
    onChange={setDutyType}
    placeholder="-- Select Duty Type --"
    options={dutyTypesList.map(t => ({ value: t, label: t }))}
  />`
);

// 6. We also deleted 'Other' duty type input before, let's restore it
if (!code.includes('Custom Duty Type')) {
  code = code.replace(
    /<div className="grid grid-cols-2 gap-4">/,
    `{dutyType === 'Other' && (
      <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Custom Duty Type</label>
        <input 
          type="text"
          value={otherDutyType}
          onChange={e => setOtherDutyType(e.target.value)}
          placeholder="Specify duty type..."
          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none mb-4"
          required
        />
      </div>
    )}
    
    <div className="grid grid-cols-2 gap-4">`
  );
  
  // also make sure we submit the other type
  code = code.replace(
    /'Duty Type': dutyType,/,
    `'Duty Type': dutyType === 'Other' ? otherDutyType : dutyType,`
  );
}

fs.writeFileSync('src/components/CentreOfficialDutyScreen.tsx', code);

