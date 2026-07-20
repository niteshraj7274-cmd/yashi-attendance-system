import re

with open('src/components/AdminCenterManagementScreen.tsx', 'r') as f:
    content = f.read()

# Add isCustomRadius state
if 'const [isCustomRadius, setIsCustomRadius]' not in content:
    content = content.replace(
        "const [saving, setSaving] = useState(false);",
        "const [saving, setSaving] = useState(false);\n  const [isCustomRadius, setIsCustomRadius] = useState(false);"
    )

# Fix handleEdit to check if custom radius is needed
content = content.replace(
    "setEditingId(center.id);\n    setShowForm(true);",
    "setEditingId(center.id);\n    setIsCustomRadius(!GEOFENCE_OPTIONS.includes(center.geofenceRadius?.toString() || '200'));\n    setShowForm(true);"
)

# Fix Plus button to reset isCustomRadius
content = content.replace(
    "setEditingId(null);\n                setShowForm(true);",
    "setEditingId(null);\n                setIsCustomRadius(false);\n                setShowForm(true);"
)

# Replace the Geofence Radius select UI
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

# Wait, if the current code still has the select (because my previous datalist replacement might have been partially overwritten or it was reverted). Let's check what the current Geofence UI looks like in the file.
