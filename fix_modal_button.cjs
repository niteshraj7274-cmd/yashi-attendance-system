const fs = require('fs');
let code = fs.readFileSync('src/components/AttendanceSuccessModal.tsx', 'utf8');

code = code.replace(
  '>\n              OK\n            </button>',
  '>\n              ✔ OK\n            </button>'
);

fs.writeFileSync('src/components/AttendanceSuccessModal.tsx', code);
