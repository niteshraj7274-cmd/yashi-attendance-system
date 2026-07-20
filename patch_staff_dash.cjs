const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

// 1. Add otherOdDutyType state
code = code.replace("const [odDutyType, setOdDutyType] = useState('');", "const [odDutyType, setOdDutyType] = useState('');\n  const [otherOdDutyType, setOtherOdDutyType] = useState('');");

// 2. Update submitOfficialDuty
code = code.replace("'Duty Type': odDutyType || '',", "'Duty Type': (odDutyType === 'Other' ? otherOdDutyType : odDutyType) || '',");
code = code.replace("!odDutyType || !odReason", "(!odDutyType || !odReason || (odDutyType === 'Other' && !otherOdDutyType))");

// 3. Update dropdown options
const oldDropdown = `<option value="">Select Duty Type</option>
                    <option value="Field Visit">Field Visit</option>
                    <option value="Admission Campaign">Admission Campaign</option>
                    <option value="Mobilization">Mobilization</option>
                    <option value="Government Meeting">Government Meeting</option>
                    <option value="Training">Training</option>
                    <option value="School Visit">School Visit</option>
                    <option value="Other">Other</option>`;

const newDropdown = `<option value="">Select Duty Type</option>
                    <option value="Field Visit">Field Visit</option>
                    <option value="Training">Training</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Inspection">Inspection</option>
                    <option value="Mobilization">Mobilization</option>
                    <option value="Government Work">Government Work</option>
                    <option value="Office Work">Office Work</option>
                    <option value="Exam Duty">Exam Duty</option>
                    <option value="Official Tour">Official Tour</option>
                    <option value="Other">Other</option>`;

code = code.replace(oldDropdown, newDropdown);

// 4. Add custom duty type input
const oldReasonHtml = `<div className="flex flex-col gap-1">
                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Reason / Purpose *</label>`;

const customDutyHtml = `{odDutyType === 'Other' && (
                   <div className="flex flex-col gap-1 mb-3">
                     <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Custom Duty Type *</label>
                     <input 
                       type="text"
                       value={otherOdDutyType}
                       onChange={(e) => setOtherOdDutyType(e.target.value)}
                       placeholder="Specify duty type"
                       className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500"
                     />
                   </div>
                 )}
                 <div className="flex flex-col gap-1">
                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Reason / Purpose *</label>`;

code = code.replace(oldReasonHtml, customDutyHtml);

// 5. Reset form
code = code.replace("setOdDutyType('');", "setOdDutyType('');\n      setOtherOdDutyType('');");

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
console.log("Patched StaffDashboardScreen");
