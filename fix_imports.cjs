const fs = require('fs');

function addImport(file) {
  let code = fs.readFileSync(file, 'utf8');
  if (!code.includes('import { validateRequestApproval }')) {
    code = code.replace(
      /import \{ db \} from '\.\.\/firebase';/,
      "import { db } from '../firebase';\nimport { validateRequestApproval } from '../utils/validationHelpers';"
    );
    fs.writeFileSync(file, code);
  }
}

addImport('src/components/AdminOfficialDutyScreen.tsx');
addImport('src/components/AdminRequestManagementScreen.tsx');
