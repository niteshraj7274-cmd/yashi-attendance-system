const fs = require('fs');

const file = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

const regexIn = /<div className="w-full flex items-center gap-2 mb-1">\s*<div className="h-\[1px\] flex-1 bg-slate-200"><\/div>\s*<span className="text-xs font-bold text-slate-500 uppercase">Mark IN<\/span>\s*<div className="h-\[1px\] flex-1 bg-slate-200"><\/div>\s*<\/div>\s*<div className="w-full">\s*<button\s*onClick=\{\(\) => startAttendanceProcess\('IN'\)\}(?:.|\n)*?<\/button>\s*<\/div>/g;

const matchIn = file.match(regexIn);
console.log("Match IN:", matchIn ? "FOUND" : "NOT FOUND");

const regexOut = /<div className="w-full flex items-center gap-2 mb-1">\s*<div className="h-\[1px\] flex-1 bg-slate-200"><\/div>\s*<span className="text-xs font-bold text-slate-500 uppercase">Mark OUT<\/span>\s*<div className="h-\[1px\] flex-1 bg-slate-200"><\/div>\s*<\/div>\s*<div className="w-full">\s*<button\s*onClick=\{\(\) => startAttendanceProcess\('OUT'\)\}(?:.|\n)*?<\/button>\s*<\/div>/g;

const matchOut = file.match(regexOut);
console.log("Match OUT:", matchOut ? "FOUND" : "NOT FOUND");
