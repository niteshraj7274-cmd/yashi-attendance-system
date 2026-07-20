const fs = require('fs');
function fix(file) {
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(/} } className="/g, '} className="');
  code = code.replace(/}} className="/g, '} className="');
  code = code.replace(/size=\{48\}\s*\}\s*className="/g, 'size={48} className="');
  code = code.replace(/size=\{16\}\s*\}\s*className="/g, 'size={16} className="');
  code = code.replace(/size=\{20\}\s*\}\s*className="/g, 'size={20} className="');
  code = code.replace(/size=\{24\}\s*\}\s*className="/g, 'size={24} className="');
  fs.writeFileSync(file, code);
}
fix('src/components/CentreLeaveScreen.tsx');
fix('src/components/CentreOfficialDutyScreen.tsx');
