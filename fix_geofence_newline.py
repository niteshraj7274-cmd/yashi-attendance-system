import re

with open('src/components/AdminCenterManagementScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    "const GEOFENCE_OPTIONS = ['200', '300', '400', '500', '700'];export default function AdminCenterManagementScreen() {",
    "const GEOFENCE_OPTIONS = ['200', '300', '400', '500', '700'];\n\nexport default function AdminCenterManagementScreen() {"
)

with open('src/components/AdminCenterManagementScreen.tsx', 'w') as f:
    f.write(content)
