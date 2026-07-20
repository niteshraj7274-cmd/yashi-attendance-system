const fs = require('fs');
let content = fs.readFileSync('src/components/AdminReportsScreen.tsx', 'utf-8');

content = content.replace(
  /<img loading="lazy" src=\{record\['Selfie Image URL'\]\} alt="Selfie IN" className="w-20 h-20 object-cover rounded-lg border border-slate-200" \/>/,
  '<a href={record[\'Selfie Image URL\']} target="_blank" rel="noopener noreferrer"><img loading="lazy" src={record[\'Selfie Image URL\']} alt="Selfie IN" className="w-20 h-20 object-cover rounded-lg border border-slate-200 hover:opacity-80 transition-opacity cursor-pointer" /></a>'
);

content = content.replace(
  /<img loading="lazy" src=\{record\['OUT Selfie Image URL'\]\} alt="Selfie OUT" className="w-20 h-20 object-cover rounded-lg border border-slate-200" \/>/,
  '<a href={record[\'OUT Selfie Image URL\']} target="_blank" rel="noopener noreferrer"><img loading="lazy" src={record[\'OUT Selfie Image URL\']} alt="Selfie OUT" className="w-20 h-20 object-cover rounded-lg border border-slate-200 hover:opacity-80 transition-opacity cursor-pointer" /></a>'
);

fs.writeFileSync('src/components/AdminReportsScreen.tsx', content);
console.log("AdminReportsScreen patched");
