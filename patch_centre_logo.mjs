import fs from 'fs';
let content = fs.readFileSync('src/components/CentreLoginScreen.tsx', 'utf8');

content = content.replace(
  `<div className="w-16 h-16 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg flex items-center justify-center">
              <Building2 size={32} />
            </div>`,
  `<div className="w-16 h-16 rounded-lg flex items-center justify-center overflow-hidden border border-slate-200">
              <img src="/logo.svg" alt="Yashi Skills Logo" className="w-full h-full object-cover" />
            </div>`
);

fs.writeFileSync('src/components/CentreLoginScreen.tsx', content);
