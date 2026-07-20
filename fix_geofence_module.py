import re

with open('src/components/AdminCenterManagementScreen.tsx', 'r') as f:
    content = f.read()

# Add fixed array at the top
if 'const GEOFENCE_OPTIONS' not in content:
    content = content.replace(
        'export default function AdminCenterManagementScreen() {',
        "const GEOFENCE_OPTIONS = ['200', '300', '400', '500', '700'];\n\nexport default function AdminCenterManagementScreen() {"
    )

# Fix handleEdit
old_edit = "geofenceRadius: ['200', '300', '400', '500', '700'].includes(center.geofenceRadius?.toString()) ? center.geofenceRadius?.toString() : '200',"
new_edit = "geofenceRadius: GEOFENCE_OPTIONS.includes(center.geofenceRadius?.toString()) ? center.geofenceRadius?.toString() : '200',"
content = content.replace(old_edit, new_edit)

# Fix dropdown UI
old_dropdown = """                                            <option value="200">200 Meter</option>
                      <option value="300">300 Meter</option>
                      <option value="400">400 Meter</option>
                      <option value="500">500 Meter</option>
                      <option value="700">700 Meter</option>"""

new_dropdown = """                      {GEOFENCE_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>{opt} Meter</option>
                      ))}"""
content = content.replace(old_dropdown, new_dropdown)

# Before saving, ensure it falls back if somehow empty
content = content.replace(
    'geofenceRadius: parseInt(formData.geofenceRadius) || 200,',
    "geofenceRadius: GEOFENCE_OPTIONS.includes(formData.geofenceRadius) ? parseInt(formData.geofenceRadius) : 200,"
)

with open('src/components/AdminCenterManagementScreen.tsx', 'w') as f:
    f.write(content)
