import re

with open('src/components/AdminCenterManagementScreen.tsx', 'r') as f:
    content = f.read()

old_geofence_ui = """                    <label className="block text-xs font-bold text-slate-600 mb-1">Geofence Radius (Meter) *</label>
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

new_geofence_ui = """                    <label className="block text-xs font-bold text-slate-600 mb-1">Geofence Radius (Meter) *</label>
                    {isCustomRadius ? (
                      <div className="flex gap-2">
                        <input 
                          type="number" 
                          name="geofenceRadius" 
                          required 
                          value={formData.geofenceRadius} 
                          onChange={handleChange} 
                          placeholder="e.g. 250"
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none" 
                        />
                        <button type="button" onClick={() => { setIsCustomRadius(false); setFormData({...formData, geofenceRadius: '200'}); }} className="px-3 py-2 bg-slate-200 text-slate-700 rounded text-xs font-bold">List</button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <select 
                          name="geofenceRadius" 
                          required 
                          value={GEOFENCE_OPTIONS.includes(formData.geofenceRadius?.toString()) ? formData.geofenceRadius : 'Custom'} 
                          onChange={(e) => {
                            if (e.target.value === 'Custom') {
                              setIsCustomRadius(true);
                              setFormData({...formData, geofenceRadius: ''});
                            } else {
                              handleChange(e);
                            }
                          }} 
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none"
                        >
                          {GEOFENCE_OPTIONS.map(opt => (
                            <option key={opt} value={opt}>{opt} Meter</option>
                          ))}
                          <option value="Custom">Custom / Type Manually...</option>
                        </select>
                      </div>
                    )}"""

content = content.replace(old_geofence_ui, new_geofence_ui)

with open('src/components/AdminCenterManagementScreen.tsx', 'w') as f:
    f.write(content)
