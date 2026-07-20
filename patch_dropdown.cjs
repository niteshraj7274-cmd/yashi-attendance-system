const fs = require('fs');
let content = fs.readFileSync('src/components/CentreLoginScreen.tsx', 'utf-8');

content = content.replace(/onClick=\{\(\) => !fetchingCenters && setIsDropdownOpen\(!isDropdownOpen\)\}/, 'onClick={() => (!deviceData?.centerId && !fetchingCenters) && setIsDropdownOpen(!isDropdownOpen)}');
content = content.replace(/className=\{\`w-full p-3 pr-10 bg-slate-50 border \$\{isDropdownOpen \? 'border-blue-500 ring-2 ring-blue-500' : 'border-slate-200'\} rounded-lg outline-none transition-all text-sm font-medium cursor-pointer flex items-center justify-between \$\{fetchingCenters \? 'opacity-70 cursor-not-allowed' : ''\}\`\}/, 'className={`w-full p-3 pr-10 ${deviceData?.centerId ? "bg-slate-100 opacity-80" : "bg-slate-50"} border ${isDropdownOpen ? "border-blue-500 ring-2 ring-blue-500" : "border-slate-200"} rounded-lg outline-none transition-all text-sm font-medium ${deviceData?.centerId ? "cursor-not-allowed" : "cursor-pointer"} flex items-center justify-between ${fetchingCenters ? "opacity-70 cursor-not-allowed" : ""}`}');

fs.writeFileSync('src/components/CentreLoginScreen.tsx', content);
