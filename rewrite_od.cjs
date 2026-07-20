const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

// replace odReason, odLocation, odRemarks state variables with the new ones
code = code.replace("const [odReason, setOdReason] = useState('');", "const [odDutyType, setOdDutyType] = useState('');\n  const [odReason, setOdReason] = useState('');");
// we can keep odLocation for remarks or remove it. Let's replace the whole state declaration block

