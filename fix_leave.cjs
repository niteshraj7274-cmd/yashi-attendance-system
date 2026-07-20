const fs = require('fs');

let code = fs.readFileSync('src/components/CentreLeaveScreen.tsx', 'utf8');

// 1. Add Default Leave Types and state
if (!code.includes('const [leaveTypesList, setLeaveTypesList]')) {
  code = code.replace(
    /const \[leaveType, setLeaveType\] = useState\('Casual Leave \(CL\)'\);/,
    `const [leaveType, setLeaveType] = useState('Casual Leave (CL)');
  const [leaveTypesList, setLeaveTypesList] = useState<string[]>([
    'Casual Leave (CL)',
    'Sick Leave (SL)',
    'Earned Leave (EL)',
    'Half Day Leave',
    'Emergency Leave',
    'Maternity Leave',
    'Paternity Leave',
    'Leave Without Pay (LWP)',
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
  code = code.replace(/export default function CentreLeaveScreen\(\) \{/, customDropdown + '\nexport default function CentreLeaveScreen() {');
}

// 3. Update useEffect to fetch leave types
code = code.replace(
  /\/\/ Get Staff List for this center/,
  `// Fetch Leave Types
      try {
        const ltSnap = await getDocs(collection(db, 'leave_types'));
        if (!ltSnap.empty) {
          const types: string[] = [];
          ltSnap.forEach(doc => {
            if (doc.data().name) types.push(doc.data().name);
          });
          if (types.length > 0) {
            if (!types.includes('Other')) types.push('Other');
            setLeaveTypesList(types);
            if (!types.includes('Casual Leave (CL)')) setLeaveType(types[0]);
          }
        }
      } catch (e) {
        console.error("Error fetching leave types", e);
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

// 5. Replace Leave Type select with CustomDropdown
code = code.replace(
  /<select\s+value=\{leaveType\}\s+onChange=\{e => setLeaveType\(e\.target\.value\)\}[\s\S]*?<\/select>/,
  `<CustomDropdown 
    value={leaveType}
    onChange={setLeaveType}
    placeholder="-- Select Leave Type --"
    options={leaveTypesList.map(t => ({ value: t, label: t }))}
  />`
);

// We need to fix the submit handler to ensure it checks if values are selected correctly (as they aren't native required fields anymore)
// Wait, handleSubmit already has `if (!selectedStaffId || !fromDate || !toDate || !reason) return alert('Please fill all fields');`

fs.writeFileSync('src/components/CentreLeaveScreen.tsx', code);

