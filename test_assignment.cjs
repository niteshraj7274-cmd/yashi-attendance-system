const fs = require('fs');
let code = fs.readFileSync('src/components/ReportAssignmentScreen.tsx', 'utf8');
code = code.replace('const navigate = useNavigate();', 'const navigate = () => {};');
fs.writeFileSync('src/components/ReportAssignmentScreen.tsx', code);
