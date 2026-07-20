const fs = require('fs');
function fixExtraDiv(file) {
  let code = fs.readFileSync(file, 'utf8');
  // At the end of the file, we have:
  //        )}
  //      </div>
  //    </div>
  //  );
  // }
  
  // Let's replace it with just one </div>
  code = code.replace(/\)\}\s*<\/div>\s*<\/div>\s*\);\s*\}/g, ')}\n    </div>\n  );\n}');
  fs.writeFileSync(file, code);
}
fixExtraDiv('src/components/CentreLeaveScreen.tsx');
fixExtraDiv('src/components/CentreOfficialDutyScreen.tsx');
