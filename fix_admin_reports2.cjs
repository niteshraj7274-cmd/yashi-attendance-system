const fs = require('fs');
let content = fs.readFileSync('src/components/AdminReportsScreen.tsx', 'utf8');

const replacement = `                    {record['OUT Time'] && (
                      <div className="flex items-center gap-2 mt-1">
                        <Clock size={16} className="text-amber-600" />
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">OUT Time</p>
                          <p className="font-medium text-slate-800">{record['OUT Time']}</p>
                        </div>
                      </div>
                    )}
                    {record['IN Time'] && record['OUT Time'] && (
                      <div className="flex items-center gap-2 mt-1">
                        <Clock size={16} className="text-blue-600" />
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Total Working Hrs</p>
                          <p className="font-medium text-slate-800">{calculateWorkingHours(record['IN Time'], record['OUT Time'])}</p>
                        </div>
                      </div>
                    )}`;

content = content.replace(
  "                    {record['OUT Time'] && (\n                      <div className=\"flex items-center gap-2 mt-1\">\n                        <Clock size={16} className=\"text-amber-600\" />\n                        <div>\n                          <p className=\"text-[10px] text-slate-500 uppercase tracking-wider font-bold\">OUT Time</p>\n                          <p className=\"font-medium text-slate-800\">{record['OUT Time']}</p>\n                        </div>\n                      </div>\n                    )}",
  replacement
);

fs.writeFileSync('src/components/AdminReportsScreen.tsx', content);
