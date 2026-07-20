import re

with open('src/components/AdminSalaryDashboardScreen.tsx', 'r') as f:
    content = f.read()

# Add import for AdminSalaryRulesModal and Settings icon
content = content.replace("import { ArrowLeft, Download, FileSpreadsheet, Building2, Users, IndianRupee, FileText, Filter } from 'lucide-react';",
"import { ArrowLeft, Download, FileSpreadsheet, Building2, Users, IndianRupee, FileText, Filter, Settings } from 'lucide-react';\nimport AdminSalaryRulesModal from './AdminSalaryRulesModal';\nimport { doc } from 'firebase/firestore';")

# Add state for rules and modal
state_injection = """
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [salaryRules, setSalaryRules] = useState({
    lateDeductionType: 'percentage',
    lateDeductionValue: 50,
    halfDayDeductionType: 'percentage',
    halfDayDeductionValue: 50,
    absentDeductionType: 'percentage',
    absentDeductionValue: 100,
    leaveDeductionType: 'paid',
    odCountAsPresent: true,
    holidayWorkedCountAsPaid: true,
    weeklyOffWorkedCountAsPaid: true,
    overtimeRatePerHour: 0
  });
"""
content = content.replace("const [loading, setLoading] = useState(true);", "const [loading, setLoading] = useState(true);\n" + state_injection)

# Add listener for rules
rules_listener = """
    const unsubRules = onSnapshot(doc(db, 'settings', 'salary_rules'), (docSnap) => {
      if (docSnap.exists()) {
        setSalaryRules(docSnap.data() as any);
      }
    });
"""
content = content.replace("const unsubOD = onSnapshot(collection(db, 'official_duty_requests'), (snap) => {", rules_listener + "\n    const unsubOD = onSnapshot(collection(db, 'official_duty_requests'), (snap) => {")

# Add unsubRules to cleanup
content = content.replace("if (unsubOD) unsubOD();", "if (unsubOD) unsubOD();\n      if (unsubRules) unsubRules();")

with open('src/components/AdminSalaryDashboardScreen.tsx', 'w') as f:
    f.write(content)
