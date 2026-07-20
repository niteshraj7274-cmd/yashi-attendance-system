const fs = require('fs');
let content = fs.readFileSync('src/components/AdminStaffManagementScreen.tsx', 'utf8');

// 1. Add salary fields to formData
const formDataStr = `  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    dob: '',
    gender: 'Male',
    mobile: '',
    email: '',
    staffId: '',
    designation: 'Other Staff',
    joiningDate: new Date().toISOString().split('T')[0],
    qualification: '',
    experience: '',
    address: '',
    status: 'Active',
    centerId: '',
    photoUrl: ''`;

const newFormDataStr = `  const [activeTab, setActiveTab] = useState('personal'); // personal, salary
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    dob: '',
    gender: 'Male',
    mobile: '',
    email: '',
    staffId: '',
    designation: 'Other Staff',
    joiningDate: new Date().toISOString().split('T')[0],
    qualification: '',
    experience: '',
    address: '',
    status: 'Active',
    centerId: '',
    photoUrl: '',
    basicSalary: 0,
    pf: 0,
    esi: 0,
    hra: 0,
    otherAllowance: 0,
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    paymentMode: 'Bank Transfer',
    salaryProcessing: false,
    lateDeductionEnabled: true`;

content = content.replace(formDataStr, newFormDataStr);

// 2. Add calculation for Gross and Net salary
const handleEditStr = `  const handleEdit = (s: any) => {
    setFormData({`;

const newHandleEditStr = `  const handleEdit = (s: any) => {
    setFormData({
      basicSalary: s.basicSalary || 0,
      pf: s.pf || 0,
      esi: s.esi || 0,
      hra: s.hra || 0,
      otherAllowance: s.otherAllowance || 0,
      bankName: s.bankName || '',
      accountNumber: s.accountNumber || '',
      ifscCode: s.ifscCode || '',
      paymentMode: s.paymentMode || 'Bank Transfer',
      salaryProcessing: s.salaryProcessing || false,
      lateDeductionEnabled: s.lateDeductionEnabled ?? true,`;

content = content.replace(handleEditStr, newHandleEditStr);

// 3. Reset form data when clicking 'Plus'
const resetFormStr = `setFormData({
                  name: '', fatherName: '', dob: '', gender: 'Male', mobile: '', email: '',
                  staffId: generateStaffCode(), designation: 'Other Staff', 
                  joiningDate: new Date().toISOString().split('T')[0],
                  qualification: '', experience: '', address: '', status: 'Active', 
                  centerId: '', photoUrl: ''
                });`;

const newResetFormStr = `setFormData({
                  name: '', fatherName: '', dob: '', gender: 'Male', mobile: '', email: '',
                  staffId: generateStaffCode(), designation: 'Other Staff', 
                  joiningDate: new Date().toISOString().split('T')[0],
                  qualification: '', experience: '', address: '', status: 'Active', 
                  centerId: '', photoUrl: '',
                  basicSalary: 0, pf: 0, esi: 0, hra: 0, otherAllowance: 0,
                  bankName: '', accountNumber: '', ifscCode: '', paymentMode: 'Bank Transfer',
                  salaryProcessing: false, lateDeductionEnabled: true
                });
                setActiveTab('personal');`;

content = content.replace(resetFormStr, newResetFormStr);

// 4. Update dataToSave
const dataToSaveStr = `        status: formData.status,
        centerId: formData.centerId,
        centerCode: centerObj?.code || '',
        centerName: centerObj?.name || '',
        photoUrl: finalPhotoUrl,`;

const newDataToSaveStr = `        status: formData.status,
        centerId: formData.centerId,
        centerCode: centerObj?.code || '',
        centerName: centerObj?.name || '',
        photoUrl: finalPhotoUrl,
        basicSalary: Number(formData.basicSalary),
        pf: Number(formData.pf),
        esi: Number(formData.esi),
        hra: Number(formData.hra),
        otherAllowance: Number(formData.otherAllowance),
        grossSalary: Number(formData.basicSalary) + Number(formData.hra) + Number(formData.otherAllowance),
        netSalary: (Number(formData.basicSalary) + Number(formData.hra) + Number(formData.otherAllowance)) - (Number(formData.pf) + Number(formData.esi)),
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        ifscCode: formData.ifscCode,
        paymentMode: formData.paymentMode,
        salaryProcessing: formData.salaryProcessing,
        lateDeductionEnabled: formData.lateDeductionEnabled,`;

content = content.replace(dataToSaveStr, newDataToSaveStr);

fs.writeFileSync('src/components/AdminStaffManagementScreen.tsx', content);
