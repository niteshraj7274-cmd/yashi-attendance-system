import fs from 'fs';
let content = fs.readFileSync('src/components/HomeScreen.tsx', 'utf8');

content = content.replace(
  `<div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-blue-900 rounded-sm rotate-45 flex items-center justify-center overflow-hidden">
              <span className="text-white text-xs -rotate-45 font-bold">YSP</span>
            </div>
          </div>`,
  `<div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-white">
            <img src="/logo.svg" alt="Yashi Skills Logo" className="w-10 h-10 object-contain" />
          </div>`
);

fs.writeFileSync('src/components/HomeScreen.tsx', content);
