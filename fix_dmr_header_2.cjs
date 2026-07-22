const fs = require('fs');
let code = fs.readFileSync('src/components/DmrFillScreen.tsx', 'utf8');

code = code.replace(
  `<div><span className="font-bold text-slate-600">BSDC Name:</span> {centerInfo?.name}</div>`,
  `<div><span className="font-bold text-slate-600">BSDC Name:</span> {centerInfo?.name}</div>
              <div><span className="font-bold text-slate-600">Center Name:</span> {centerInfo?.name}</div>`
);

fs.writeFileSync('src/components/DmrFillScreen.tsx', code);
