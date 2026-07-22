const fs = require('fs');
let code = fs.readFileSync('src/components/ReportAssignmentScreen.tsx', 'utf8');
code = code.replace('const navigate = () => {};', 'const navigate = useNavigate();');
fs.writeFileSync('src/components/ReportAssignmentScreen.tsx', code);
