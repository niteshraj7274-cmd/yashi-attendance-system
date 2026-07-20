const fs = require('fs');
let content = fs.readFileSync('src/components/AdminStaffManagementScreen.tsx', 'utf8');

const oldFormStart = `              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">`;

const newFormStart = `              <div className="flex gap-2 mb-4 border-b border-slate-200">
                <button 
                  type="button" 
                  onClick={() => setActiveTab('personal')} 
                  className={\`pb-2 px-1 text-sm font-bold \${activeTab === 'personal' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500'}\`}
                >
                  Personal Details
                </button>
                <button 
                  type="button" 
                  onClick={() => setActiveTab('salary')} 
                  className={\`pb-2 px-1 text-sm font-bold \${activeTab === 'salary' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500'}\`}
                >
                  Salary Setup
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {activeTab === 'personal' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">`;

content = content.replace(oldFormStart, newFormStart);

const oldFormEnd = `                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-600 mb-1">Full Address</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none h-16" />
                  </div>
                </div>`;

const newFormEnd = `                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-600 mb-1">Full Address</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none h-16" />
                  </div>
                </div>
                )}
                
                {activeTab === 'salary' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 bg-indigo-50 p-3 rounded-lg border border-indigo-100 mb-2">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-indigo-900 text-sm">Salary Processing</h4>
                        <p className="text-[10px] text-indigo-700">Enable to process monthly salary for this staff</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={formData.salaryProcessing} onChange={(e) => setFormData({...formData, salaryProcessing: e.target.checked})} className="sr-only peer" />
                        <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-indigo-900 text-sm">Late Attendance Deduction</h4>
                        <p className="text-[10px] text-indigo-700">Deduct salary automatically for late attendance</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={formData.lateDeductionEnabled} onChange={(e) => setFormData({...formData, lateDeductionEnabled: e.target.checked})} className="sr-only peer" />
                        <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Basic Salary</label>
                    <input type="number" name="basicSalary" value={formData.basicSalary} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">HRA</label>
                    <input type="number" name="hra" value={formData.hra} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Other Allowance</label>
                    <input type="number" name="otherAllowance" value={formData.otherAllowance} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">PF Deduction</label>
                    <input type="number" name="pf" value={formData.pf} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">ESI Deduction</label>
                    <input type="number" name="esi" value={formData.esi} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none" />
                  </div>
                  <div className="md:col-span-2 bg-slate-100 p-3 rounded-lg flex justify-between items-center border border-slate-200">
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-500">Gross Salary</span>
                      <span className="text-sm font-bold text-slate-800">₹{(Number(formData.basicSalary) + Number(formData.hra) + Number(formData.otherAllowance)).toFixed(2)}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[10px] uppercase font-bold text-emerald-600">Net Salary</span>
                      <span className="text-lg font-black text-emerald-700">₹{((Number(formData.basicSalary) + Number(formData.hra) + Number(formData.otherAllowance)) - (Number(formData.pf) + Number(formData.esi))).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 mt-2">
                    <h4 className="font-bold text-slate-700 text-sm mb-2 border-b border-slate-200 pb-1">Bank Details</h4>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Bank Name</label>
                    <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Account Number</label>
                    <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">IFSC Code</label>
                    <input type="text" name="ifscCode" value={formData.ifscCode} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none uppercase" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Payment Mode</label>
                    <select name="paymentMode" value={formData.paymentMode} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none">
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Cheque">Cheque</option>
                      <option value="Cash">Cash</option>
                    </select>
                  </div>
                </div>
                )}`;

content = content.replace(oldFormEnd, newFormEnd);

fs.writeFileSync('src/components/AdminStaffManagementScreen.tsx', content);
