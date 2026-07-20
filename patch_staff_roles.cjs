const fs = require('fs');
let content = fs.readFileSync('src/components/AdminStaffManagementScreen.tsx', 'utf8');

const sessionCode = `  const location = useLocation();
  const [staff, setStaff] = useState<any[]>([]);`;

const newSessionCode = `  const location = useLocation();
  const [staff, setStaff] = useState<any[]>([]);
  
  const [currentUserRole, setCurrentUserRole] = useState('admin');
  useEffect(() => {
    const sessionStr = localStorage.getItem('userSession');
    if (sessionStr) {
      try {
        const session = JSON.parse(atob(sessionStr));
        setCurrentUserRole(session.role || 'admin');
      } catch (e) {
        try {
          const session = JSON.parse(sessionStr);
          setCurrentUserRole(session.role || 'admin');
        } catch (err) {}
      }
    }
  }, []);
  
  const canEditSalarySettings = currentUserRole === 'admin' || currentUserRole === 'System Admin' || currentUserRole === 'Center Coordinator';
`;

content = content.replace(sessionCode, newSessionCode);

const checkboxCode = `<label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={formData.salaryProcessing} onChange={(e) => setFormData({...formData, salaryProcessing: e.target.checked})} className="sr-only peer" />`;

const newCheckboxCode = `<label className={\`relative inline-flex items-center \${canEditSalarySettings ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}\`}>
                        <input type="checkbox" disabled={!canEditSalarySettings} checked={formData.salaryProcessing} onChange={(e) => setFormData({...formData, salaryProcessing: e.target.checked})} className="sr-only peer" />`;

content = content.replace(checkboxCode, newCheckboxCode);

const checkboxCode2 = `<label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={formData.lateDeductionEnabled} onChange={(e) => setFormData({...formData, lateDeductionEnabled: e.target.checked})} className="sr-only peer" />`;

const newCheckboxCode2 = `<label className={\`relative inline-flex items-center \${canEditSalarySettings ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}\`}>
                        <input type="checkbox" disabled={!canEditSalarySettings} checked={formData.lateDeductionEnabled} onChange={(e) => setFormData({...formData, lateDeductionEnabled: e.target.checked})} className="sr-only peer" />`;

content = content.replace(checkboxCode2, newCheckboxCode2);

fs.writeFileSync('src/components/AdminStaffManagementScreen.tsx', content);
