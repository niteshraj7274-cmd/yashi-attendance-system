import re

with open('src/components/AdminCenterManagementScreen.tsx', 'r') as f:
    content = f.read()

# Fix handleEdit
content = content.replace(
    "geofenceRadius: GEOFENCE_OPTIONS.includes(center.geofenceRadius?.toString()) ? center.geofenceRadius?.toString() : '200',",
    "geofenceRadius: center.geofenceRadius?.toString() || '200',"
)

# Fix handleSubmit
content = content.replace(
    "geofenceRadius: GEOFENCE_OPTIONS.includes(formData.geofenceRadius) ? parseInt(formData.geofenceRadius) : 200,",
    "geofenceRadius: parseInt(formData.geofenceRadius) || 200,"
)

with open('src/components/AdminCenterManagementScreen.tsx', 'w') as f:
    f.write(content)
