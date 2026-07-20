const fs = require('fs');
let code = fs.readFileSync('src/components/StaffLeaveScreen.tsx', 'utf8');

// 1. Add otherLeaveType state
code = code.replace("const [leaveType, setLeaveType] = useState('Casual Leave (CL)');", "const [leaveType, setLeaveType] = useState('Casual Leave (CL)');\n  const [otherLeaveType, setOtherLeaveType] = useState('');");

// 2. Update handleSubmit
code = code.replace("leaveType,", "leaveType: leaveType === 'Other' ? otherLeaveType : leaveType,");

// 3. Update the form dropdown options
const oldDropdown = `<option value="Casual Leave (CL)">Casual Leave (CL)</option>
                    <option value="Sick Leave (SL)">Sick Leave (SL)</option>
                    <option value="Emergency Leave">Emergency Leave</option>
                    <option value="Half Day Leave">Half Day Leave</option>
                    <option value="Official Leave">Official Leave</option>`;
                    
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

// 4. Add custom leave type input
const oldReasonHtml = `<div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Reason / Purpose</label>`;
                  
const customLeaveHtml = `{leaveType === 'Other' && (
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Custom Leave Type</label>
                    <input 
                      type="text" 
                      value={otherLeaveType}
                      onChange={e => setOtherLeaveType(e.target.value)}
                      placeholder="Specify leave type..."
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium mb-4"
                      required
                    />
                  </div>
                )}
                
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Reason / Purpose</label>`;
                  
code = code.replace(oldReasonHtml, customLeaveHtml);

// 5. Reset form
code = code.replace("setReason('');", "setReason('');\n      setOtherLeaveType('');");

fs.writeFileSync('src/components/StaffLeaveScreen.tsx', code);
console.log("Patched StaffLeaveScreen");
