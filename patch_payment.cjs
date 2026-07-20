const fs = require('fs');
let code = fs.readFileSync('src/components/AdminStaffManagementScreen.tsx', 'utf8');

const oldPayment = `<select name="paymentMode" value={formData.paymentMode} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none">
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Cash">Cash</option>
                      <option value="UPI">UPI</option>
                    </select>`;

const newPayment = `<select name="paymentMode" value={formData.paymentMode} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none">
                      <option value="Center Coordinator Payment">Center Coordinator Payment</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Yashi Skills UPI Payment">Yashi Skills UPI Payment</option>
                    </select>`;

code = code.replace(oldPayment, newPayment);
fs.writeFileSync('src/components/AdminStaffManagementScreen.tsx', code);
