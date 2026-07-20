const fs = require('fs');

let code = fs.readFileSync('src/components/CentreLeaveScreen.tsx', 'utf8');

code = code.replace(/key=\{req\.id\s+className="/g, 'key={req.id}\nclassName="');
code = code.replace(/size=\{16className="/g, 'size={16} className="');
code = code.replace(/setShowForm\(false\)className="/g, 'setShowForm(false)} className="');
code = code.replace(/handleSubmitclassName="/g, 'handleSubmit} className="');
code = code.replace(/<AnimatePresence>/g, '');
code = code.replace(/<\/AnimatePresence>/g, '');

fs.writeFileSync('src/components/CentreLeaveScreen.tsx', code);
