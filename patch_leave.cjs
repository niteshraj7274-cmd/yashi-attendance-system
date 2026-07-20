const fs = require('fs');
let code = fs.readFileSync('src/components/CentreLeaveScreen.tsx', 'utf8');

// 1. Add otherLeaveType state
code = code.replace("const [leaveType, setLeaveType] = useState('Casual Leave (CL)');", "const [leaveType, setLeaveType] = useState('Casual Leave (CL)');\n  const [otherLeaveType, setOtherLeaveType] = useState('');");

// 2. Filter active staff
code = code.replace("staffSnap.forEach(s => staffData.push({ id: s.id, ...s.data() }));\n      setStaffList(staffData);", `staffSnap.forEach(s => {
        const data = s.data();
        if (data.status !== 'Inactive') {
          staffData.push({ id: s.id, ...data });
        }
      });
      setStaffList(staffData);`);

// 3. Update handleSubmit
code = code.replace("leaveType,", "leaveType: leaveType === 'Other' ? otherLeaveType : leaveType,");

// 4. Update the form dropdown options and add input for "Other"
const oldDropdown = `<option value="Casual Leave (CL)">Casual Leave (CL)</option>
                    <option value="Sick Leave (SL)">Sick Leave (SL)</option>
                    <option value="Earned Leave (EL)">Earned Leave (EL)</option>
                    <option value="Half Day">Half Day</option>
                    <option value="Leave Without Pay (LWP)">Leave Without Pay (LWP)</option>`;
                    
const newDropdown = `<option value="Casual Leave (CL)">Casual Leave (CL)</option>
                    <option value="Sick Leave (SL)">Sick Leave (SL)</option>
                    <option value="Earned Leave (EL)">Earned Leave (EL)</option>
                    <option value="Half Day Leave">Half Day Leave</option>
                    <option value="Emergency Leave">Emergency Leave</option>
                    <option value="Maternity Leave">Maternity Leave</option>
                    <option value="Paternity Leave">Paternity Leave</option>
                    <option value="Leave Without Pay (LWP)">Leave Without Pay (LWP)</option>
                    <option value="Other">Other</option>`;
                    
code = code.replace(oldDropdown, newDropdown);

// 5. Add custom leave type input
const oldReasonHtml = `<div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Reason / Purpose</label>`;
                  
const customLeaveHtml = `{leaveType === 'Other' && (
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Custom Leave Type</label>
                    <input 
                      type="text" 
                      value={otherLeaveType}
                      onChange={e => setOtherLeaveType(e.target.value)}
                      placeholder="Specify leave type..."
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none mb-4"
                      required
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Reason / Purpose</label>`;
                  
code = code.replace(oldReasonHtml, customLeaveHtml);

// 6. Reset form
code = code.replace("setSelectedStaffId('');", "setSelectedStaffId('');\n      setOtherLeaveType('');");

fs.writeFileSync('src/components/CentreLeaveScreen.tsx', code);
console.log("Patched CentreLeaveScreen");
