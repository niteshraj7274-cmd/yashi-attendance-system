const fs = require('fs');
let code = fs.readFileSync('src/components/DmrFillScreen.tsx', 'utf8');

code = code.replace(
  `        centerId: centerInfo.id,
        centerName: centerInfo.name,
        centerCode: centerInfo.code || '',
        district: centerInfo.district || '',
        block: centerInfo.block || '',
        staffDocId: staffData.id,
        staffName: staffData.name,
        staffEmpId: staffData.staffId,
        staffRole: staffData.role,`,
  `        centerId: centerInfo?.id || staffData?.centerId || '',
        centerName: centerInfo?.name || '',
        centerCode: centerInfo?.code || '',
        district: centerInfo?.district || '',
        block: centerInfo?.block || '',
        staffDocId: staffData?.id || staffData?.uid || '',
        staffName: staffData?.name || '',
        staffEmpId: staffData?.staffId || '',
        staffRole: staffData?.role || staffData?.designation || '',`
);

fs.writeFileSync('src/components/DmrFillScreen.tsx', code);
