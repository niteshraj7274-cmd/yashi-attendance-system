with open('src/components/AdminStaffManagementScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace("opacity: y:", "opacity: 0, y:")
content = content.replace("scale: opacity:", "scale: 0.9, opacity:")

with open('src/components/AdminStaffManagementScreen.tsx', 'w') as f:
    f.write(content)
