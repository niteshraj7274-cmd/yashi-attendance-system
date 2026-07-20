import re
import sys

def fix_imports(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Remove all "FileText, " except the one for lucide-react if it exists
    # Or easier: remove all "FileText, ", then add it to lucide-react import
    content = content.replace("FileText, ", "")
    
    if "from 'lucide-react';" in content:
        content = re.sub(r'(import \{.*?)(\} from .lucide-react.;)', r'\1, FileText\2', content)
    
    with open(file_path, 'w') as f:
        f.write(content)

fix_imports('src/components/AdminDashboardScreen.tsx')
fix_imports('src/components/CentreAttendanceDashboardScreen.tsx')
fix_imports('src/components/StaffDashboardScreen.tsx')

