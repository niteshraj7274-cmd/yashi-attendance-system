const fs = require('fs');

function fixDisaster(file) {
  let code = fs.readFileSync(file, 'utf8');
  
  // Fix forEach not closed
  code = code.replace(/staffData\.push\(\{ id: s\.id, \.\.\.data \}\);\n\s*\}\n\s*setStaffList\(staffData\);\n\s*\};/g, 'staffData.push({ id: s.id, ...data });\n        }\n      });\n      setStaffList(staffData);\n    };');
  
  // Fix onChange
  code = code.replace(/onChange=\{(.*?)className="/g, 'onChange={$1} className="');
  // Fix value
  code = code.replace(/value=\{(.*?)className="/g, 'value={$1} className="');
  // Fix disabled
  code = code.replace(/disabled=\{(.*?)className="/g, 'disabled={$1} className="');

  // Fix button onClick
  code = code.replace(/onClick=\{(.*?)className="/g, 'onClick={$1} className="');
  
  // Fix Icon size
  code = code.replace(/size=\{(.*?)className="/g, 'size={$1} className="');

  // Fix closing divs and buttons at the end of the file.
  // Actually, wait, at the end of CentreLeaveScreen.tsx, we have:
  //               </form>
  //             </div>
  //           </div>
  //         )}
  //           </div>
  //   );
  // }
  
  // Let's replace the whole footer to make sure it's correct.
  const footerRegex = /<\/form>\s*<\/div>\s*<\/div>\s*\)\}\s*<\/div>\s*\);\s*\}/g;
  code = code.replace(footerRegex, '</form>\n            </div>\n          </div>\n        )}\n      </div>\n    </div>\n  );\n}');
  
  // Also the first modal div
  code = code.replace(/<div\s+className="bg-white w-full/g, '<div className="bg-white w-full');

  fs.writeFileSync(file, code);
}

fixDisaster('src/components/CentreLeaveScreen.tsx');
fixDisaster('src/components/CentreOfficialDutyScreen.tsx');

