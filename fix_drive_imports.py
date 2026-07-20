with open('src/components/DriveFileManager.tsx', 'r') as f:
    content = f.read()

content = content.replace("import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';",
                          "import { collection, query, where, onSnapshot, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';")

with open('src/components/DriveFileManager.tsx', 'w') as f:
    f.write(content)

with open('src/components/AdminDashboardScreen.tsx', 'r') as f:
    admin_content = f.read()

admin_content = admin_content.replace("import {  MonitorPlay, Bell, BookOpen , FileText} from 'lucide-react';",
                                      "import {  MonitorPlay, Bell, BookOpen } from 'lucide-react';")

with open('src/components/AdminDashboardScreen.tsx', 'w') as f:
    f.write(admin_content)

