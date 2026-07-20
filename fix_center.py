import re
with open('src/components/CentreStaffSelectionScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace("center?.name || ''", "centerName")
content = content.replace("center?.code || ''", "centerCode")
# Let's clean up any weirdness from my sed if it went wrong
content = content.replace("centerName", "centerName") 

with open('src/components/CentreStaffSelectionScreen.tsx', 'w') as f:
    f.write(content)

print("Fixed")
