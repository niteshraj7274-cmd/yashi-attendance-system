import re
with open('src/components/CentreLoginScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace("if (newStatus === 'Pending') {          if (newStatus === 'Pending') {", "if (newStatus === 'Pending') {")

with open('src/components/CentreLoginScreen.tsx', 'w') as f:
    f.write(content)
