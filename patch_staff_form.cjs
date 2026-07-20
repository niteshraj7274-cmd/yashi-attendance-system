const fs = require('fs');
const path = 'src/components/AdminStaffFormScreen.tsx';
let content = fs.readFileSync(path, 'utf8');

// replace centerCode in initial state with centerId
content = content.replace(
  "centerCode: defaultCenterCode,",
  "centerId: location.state?.centerId || '',"
);

// replace in useEffect fetching
content = content.replace(
  "centerCode: data.centerCode || '',",
  "centerId: data.centerId || '',"
);

// replace validation
content = content.replace(
  "if (!formData.name || !formData.code || !formData.mobile || !formData.role || !formData.centerCode) {",
  "if (!formData.name || !formData.code || !formData.mobile || !formData.role || !formData.centerId) {"
);

// replace selectedCenter finding logic
content = content.replace(
  "const selectedCenter = centers.find(c => c.code === formData.centerCode);",
  "const selectedCenter = centers.find(c => c.id === formData.centerId);"
);

// replace select element
content = content.replace(
  '<select name="centerCode" value={formData.centerCode} onChange={handleChange} required className="w-full pl-8 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none  appearance-auto">',
  '<select name="centerId" value={formData.centerId} onChange={handleChange} required className="w-full pl-8 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none  appearance-auto">'
);

content = content.replace(
  '{centers.map(c => <option key={c.id} value={c.code}>{c.name} ({c.code})</option>)}',
  '{centers.map(c => <option key={c.id} value={c.id}>{c.name} ({c.code})</option>)}'
);

// fix staffData payload
content = content.replace(
  "centerId,",
  "centerCode: selectedCenter?.code || '',\n        centerId,"
);

fs.writeFileSync(path, content);
