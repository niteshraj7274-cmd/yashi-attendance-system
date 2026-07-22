const fs = require('fs');
let code = fs.readFileSync('src/components/AttendanceSuccessModal.tsx', 'utf8');

if (!code.includes('buttonText?: string')) {
  code = code.replace(
    '  onOk: () => void;\n}',
    '  onOk: () => void;\n  buttonText?: string;\n}'
  );
  code = code.replace(
    'export default function AttendanceSuccessModal({ isOpen, title, message, details, onOk }: Props) {',
    'export default function AttendanceSuccessModal({ isOpen, title, message, details, onOk, buttonText = "✔ OK" }: Props) {'
  );
  code = code.replace(
    '>\n              ✔ OK\n            </button>',
    '>\n              {buttonText}\n            </button>'
  );
  fs.writeFileSync('src/components/AttendanceSuccessModal.tsx', code);
}
