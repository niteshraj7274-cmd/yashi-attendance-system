import re

with open('src/components/AdminStaffManagementScreen.tsx', 'r') as f:
    content = f.read()

# Add pin to state initialization
content = content.replace("gender: 'Male',", "gender: 'Male',\n    pin: '1234',")

# Also add it to setFormData on open
content = content.replace("joiningDate: new Date().toISOString().split('T')[0],", "joiningDate: new Date().toISOString().split('T')[0], pin: '1234',")

# And handleEdit
content = content.replace("setFormData({\n      basicSalary", "setFormData({\n      pin: s.pin || '1234',\n      basicSalary")

# Add the UI for PIN
pin_ui = """                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Login PIN</label>
                    <input type="text" name="pin" maxLength={4} value={formData.pin} onChange={(e) => setFormData({...formData, pin: e.target.value.replace(/\D/g, '').slice(0, 4)})} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none tracking-widest" placeholder="1234" />
                  </div>"""

# Insert it before the 'Status *'
content = content.replace("""                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Status *</label>""", pin_ui + "\n                  <div>\n                    <label className=\"block text-xs font-bold text-slate-600 mb-1\">Status *</label>")

with open('src/components/AdminStaffManagementScreen.tsx', 'w') as f:
    f.write(content)
