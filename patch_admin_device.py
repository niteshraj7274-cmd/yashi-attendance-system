import re

with open('src/components/AdminDeviceManagementScreen.tsx', 'r') as f:
    content = f.read()

# Make it single tab, no 'center' or 'staff' tabs
content = re.sub(r'const \[activeTab.*?\];', '', content)
content = re.sub(r'const \[staffDevices.*?\];', '', content)
content = re.sub(r'const qStaff = query\(collection.*?setStaffDevices.*?\}\)\)\);', '', content, flags=re.DOTALL)

# Let's just rewrite AdminDeviceManagementScreen.tsx completely because it's easier.
