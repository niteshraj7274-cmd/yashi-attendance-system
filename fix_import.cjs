const fs = require('fs');
let content = fs.readFileSync('src/components/AdminAttendanceDashboardScreen.tsx', 'utf8');
content = content.replace("} RefreshCw, ToggleLeft, ToggleRight } from 'lucide-react';", ", RefreshCw, ToggleLeft, ToggleRight } from 'lucide-react';");
fs.writeFileSync('src/components/AdminAttendanceDashboardScreen.tsx', content);
