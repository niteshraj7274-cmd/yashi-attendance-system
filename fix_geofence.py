import re

with open('src/components/AdminCenterManagementScreen.tsx', 'r') as f:
    content = f.read()

# Replace geofenceRadius select with input and datalist
old_geofence = """                    <label className="block text-xs font-bold text-slate-600 mb-1">Geofence Radius *</label>
                    <select name="geofenceRadius" required value={formData.geofenceRadius} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none cursor-pointer">
                      {GEOFENCE_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>{opt} Meter</option>
                      ))}
                    </select>"""

new_geofence = """                    <label className="block text-xs font-bold text-slate-600 mb-1">Geofence Radius (Meter) *</label>
                    <input 
                      type="number" 
                      name="geofenceRadius" 
                      required 
                      value={formData.geofenceRadius} 
                      onChange={handleChange} 
                      list="geofenceOptions"
                      placeholder="Select or type radius (e.g. 200)"
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none" 
                    />
                    <datalist id="geofenceOptions">
                      <option value="200">200 Meter</option>
                      <option value="300">300 Meter</option>
                      <option value="400">400 Meter</option>
                      <option value="500">500 Meter</option>
                      <option value="700">700 Meter</option>
                    </datalist>"""

content = content.replace(old_geofence, new_geofence)

with open('src/components/AdminCenterManagementScreen.tsx', 'w') as f:
    f.write(content)
