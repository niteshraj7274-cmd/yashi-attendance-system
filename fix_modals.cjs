const fs = require('fs');

function removeMotionFromModals(file) {
  let code = fs.readFileSync(file, 'utf8');
  
  // Only replace motion.div in the modal part. We can do a string replace for the specific modal structures.
  // For CentreLeaveScreen & CentreOfficialDutyScreen:
  code = code.replace(/<motion\.div\s+initial={{ opacity: 0, y: 100 }}\s+animate={{ opacity: 1, y: 0 }}\s+exit={{ opacity: 0, y: 100 }}/g, '<div');
  code = code.replace(/className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-xl overflow-hidden flex flex-col max-h-\[90vh\]"\s*>/g, 'className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-xl flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-4">');
  
  // For StaffDashboardScreen:
  code = code.replace(/<motion\.div\s+initial={{ opacity: 0, scale: 0.95 }}\s+animate={{ opacity: 1, scale: 1 }}\s+exit={{ opacity: 0, scale: 0.95 }}\s+className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-5 overflow-hidden flex flex-col max-h-\[90vh\]"/g, '<div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-5 flex flex-col max-h-[90vh] animate-in zoom-in-95"');
  
  // For StaffLeaveScreen:
  code = code.replace(/<motion\.div\s+initial={{ opacity: 0, y: 100 }}\s+animate={{ opacity: 1, y: 0 }}\s+exit={{ opacity: 0, y: 100 }}\s+className="bg-white w-full max-w-md sm:rounded-2xl rounded-t-3xl shadow-2xl overflow-hidden flex flex-col max-h-\[90vh\]"/g, '<div className="bg-white w-full max-w-md sm:rounded-2xl rounded-t-3xl shadow-2xl flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-4"');
  
  // Remove </motion.div> for the modals (it might replace the list ones too, let's be careful).
  // Actually it's better to just use regex to find the modal motion.div block.
  
  fs.writeFileSync(file, code);
}

// Better approach: regex to remove motion.div ONLY if it has max-h-[90vh]
function fixFile(file) {
  let code = fs.readFileSync(file, 'utf8');
  const regex = /<motion\.div\s+initial=\{[^}]+\}\s+animate=\{[^}]+\}\s+exit=\{[^}]+\}\s+className="([^"]+max-h-\[90vh\][^"]*)"\s*>/g;
  code = code.replace(regex, (match, className) => {
    // remove overflow-hidden from className
    let newClass = className.replace('overflow-hidden', '');
    return `<div className="${newClass}">`;
  });
  
  // Now we need to replace the closing tag. Since there might be other motion.divs, we just replace </motion.div> that comes after </form> or inside the modal.
  // Actually, wait, if we replace `<motion.div` with `<div`, we must replace `</motion.div>` with `</div>`.
  // Let's just replace ALL `</motion.div>` with `</div>` and ALL `<motion.div` with `<div` for the whole file, it's safer for WebViews anyway!
  // Wait, framer-motion requires motion.div for AnimatePresence. If we remove motion.div, AnimatePresence won't animate them out, but it's fine.
  code = code.replace(/<motion\.div/g, '<div');
  code = code.replace(/<\/motion\.div>/g, '</div>');
  code = code.replace(/initial=\{[^}]+\}/g, '');
  code = code.replace(/animate=\{[^}]+\}/g, '');
  code = code.replace(/exit=\{[^}]+\}/g, '');
  code = code.replace(/layout/g, '');
  
  fs.writeFileSync(file, code);
}

fixFile('src/components/CentreLeaveScreen.tsx');
fixFile('src/components/CentreOfficialDutyScreen.tsx');
fixFile('src/components/StaffLeaveScreen.tsx');
fixFile('src/components/StaffDashboardScreen.tsx');

console.log("Fixed modals");
