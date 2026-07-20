const fs = require('fs');
let code = fs.readFileSync('src/components/CentreOfficialDutyScreen.tsx', 'utf8');

// 1. Add otherDutyType state
code = code.replace("const [dutyType, setDutyType] = useState('Field Work');", "const [dutyType, setDutyType] = useState('Field Visit');\n  const [otherDutyType, setOtherDutyType] = useState('');");

// 2. Filter active staff
code = code.replace("staffSnap.forEach(s => staffData.push({ id: s.id, ...s.data() }));\n      setStaffList(staffData);", `staffSnap.forEach(s => {
        const data = s.data();
        if (data.status !== 'Inactive') {
          staffData.push({ id: s.id, ...data });
        }
      });
      setStaffList(staffData);`);

// 3. Update handleSubmit
code = code.replace("'Duty Type': dutyType,", "'Duty Type': dutyType === 'Other' ? otherDutyType : dutyType,");

// 4. Update the form dropdown options and add input for "Other"
const oldDropdown = `<option value="Field Work">Field Work</option>
                    <option value="Client Meeting">Client Meeting</option>
                    <option value="Training">Training</option>
                    <option value="Other">Other</option>`;
                    
const newDropdown = `<option value="Field Visit">Field Visit</option>
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

// 5. Add custom duty type input
const oldReasonHtml = `<div className="grid grid-cols-2 gap-4">`;
                  
const customDutyHtml = `{dutyType === 'Other' && (
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Custom Duty Type</label>
                    <input 
                      type="text" 
                      value={otherDutyType}
                      onChange={e => setOtherDutyType(e.target.value)}
                      placeholder="Specify duty type..."
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">`;
                  
code = code.replace(oldReasonHtml, customDutyHtml);

// 6. Reset form
code = code.replace("setSelectedStaffId('');", "setSelectedStaffId('');\n      setOtherDutyType('');");

fs.writeFileSync('src/components/CentreOfficialDutyScreen.tsx', code);
console.log("Patched CentreOfficialDutyScreen");
