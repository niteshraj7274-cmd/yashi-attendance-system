const fs = require('fs');

function fixSyntax(file) {
  let code = fs.readFileSync(file, 'utf8');
  
  // Fix line 50 `);` -> `}` in staffSnap.forEach
  code = code.replace(/staffData\.push\(\{ id: s\.id, \.\.\.data \}\);\n\s*\);/g, 'staffData.push({ id: s.id, ...data });\n        }');
  
  // Fix missing braces in event handlers and props
  code = code.replace(/navigate\(-1\)className=/g, 'navigate(-1)} className=');
  code = code.replace(/setShowForm\(true\)className=/g, 'setShowForm(true)} className=');
  code = code.replace(/size=\{48className=/g, 'size={48} className=');
  code = code.replace(/size=\{16className=/g, 'size={16} className=');
  
  // handleSubmit
  code = code.replace(/onSubmit=\{handleSubmitclassName=/g, 'onSubmit={handleSubmit} className=');
  
  // Fix `key={req.id` missing `}` (handled previously but just in case)
  code = code.replace(/key=\{req\.id\s+className="/g, 'key={req.id}\nclassName="');
  code = code.replace(/key=\{req\.id\n\s*className="/g, 'key={req.id}\nclassName="');

  // Any other missing tags? 
  // src/components/CentreLeaveScreen.tsx(227,16): error TS17008: JSX element 'form' has no corresponding closing tag.
  // Because `<form onSubmit={handleSubmitclassName="...` became `<form onSubmit={handleSubmit} className="...` which is good.
  
  fs.writeFileSync(file, code);
}

fixSyntax('src/components/CentreLeaveScreen.tsx');
fixSyntax('src/components/CentreOfficialDutyScreen.tsx');

