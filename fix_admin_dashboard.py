import re

with open('src/components/AdminDashboardScreen.tsx', 'r') as f:
    content = f.read()

# Fix duplicate Shield imports
content = content.replace("import { Shield, ", "import { ")
content = content.replace("import { ArrowLeft, UserCircle", "import { Shield, ArrowLeft, UserCircle")

with open('src/components/AdminDashboardScreen.tsx', 'w') as f:
    f.write(content)

