const fs = require('fs');
const path = 'src/components/CentreLoginScreen.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  "{fetchingCenters ? 'Loading centers...' : selectedCenterData ? `${selectedCenterData.code} - ${selectedCenterData.name}` : '-- Select Center --'}",
  "{fetchingCenters ? 'Loading centers...' : selectedCenterData ? `${selectedCenterData.code} - ${selectedCenterData.name}` : deviceData?.centerName ? `${deviceData.centerName} (Inactive/Deleted)` : '-- Select Center --'}"
);

fs.writeFileSync(path, content);
