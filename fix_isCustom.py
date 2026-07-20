import re

with open('src/components/AdminCenterManagementScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace("const [isCustomRadius, setIsCustomRadius] = useState(false);", "")
content = content.replace("setIsCustomRadius(!GEOFENCE_OPTIONS.includes(center.geofenceRadius?.toString() || '200'));", "")
content = content.replace("setIsCustomRadius(false);", "")

with open('src/components/AdminCenterManagementScreen.tsx', 'w') as f:
    f.write(content)
